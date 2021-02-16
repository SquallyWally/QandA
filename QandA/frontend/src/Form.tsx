import { FC, useState, createContext, FormEvent } from 'react';
import { PrimaireKnop, gray5, gray6 } from './Styles';
/**@jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from '@emotion/react';

type Validator = (value: any, args?: any) => string;

export interface Waardes {
  [key: string]: any; //Indexable type
}
export interface Errors {
  [key: string]: string[];
}

//validaton anneer het text veld werd aangeraakt
export interface Touched {
  [key: string]: boolean;
}

interface FormContextProps {
  waardes: Waardes;
  setWaarde?: (fieldName: string, waarde: any) => void;
  errors: Errors;
  validatie?: (fieldName: string) => void;
  touched: Touched;
  setTouched?: (fieldName: string) => void;
}

interface Validation {
  validator: Validator;
  arg?: any;
}

interface ValidationProp {
  [key: string]: Validation | Validation[];
}

export interface SubmitResult {
  success: boolean;
  errors?: Errors;
}

interface Props {
  submitCaption?: string;
  validationRules?: ValidationProp;
  onSubmit: (waardes: Waardes) => Promise<SubmitResult>;
  successMessage?: string;
  failureMessage?: string;
}

//doorsturen van een initiele waarde is een verreiste voor deze context, sans waarom setWaarde optioneel is
export const FormContext = createContext<FormContextProps>({
  waardes: {},
  errors: {},
  touched: {},
});

export const minLength: Validator = (value: any, length: number): string =>
  value && value.length < length
    ? `Dit moet tenminste ${length} karakters lang zijn`
    : '';

export const required: Validator = (value: any): string =>
  value === undefined || value === null || value === ''
    ? 'Dit moet worden ingevuld'
    : '';

export const Form: FC<Props> = ({
  submitCaption,
  children,
  validationRules,
  onSubmit,
  successMessage = 'Success!',
  failureMessage = 'Something went wrong, what a failure',
}) => {
  const [waardes, setWaardes] = useState<Waardes>({});

  const [errors, setErrors] = useState<Errors>({});

  const [touched, setTouched] = useState<Touched>({});

  const [submitting, setSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [submitError, setSubmitError] = useState(false);

  const validatie = (fieldName: string): string[] => {
    //Single validation object OF een array met validation objecten
    if (!validationRules) {
      return [];
    }
    if (!validationRules[fieldName]) {
      return [];
    }

    //Uniforme situatie door altijd te werken met een reeks regels
    const regels = Array.isArray(validationRules[fieldName])
      ? (validationRules[fieldName] as Validation[])
      : ([validationRules[fieldName]] as Validation[]);

    //Doorploopt de regels, waardoor de validator kan worden aangroepen en eventueel errors verzamelen in fieldErrors
    const fieldErrors: string[] = [];
    regels.forEach((regel) => {
      const error = regel.validator(waardes[fieldName], regel.arg);
      if (error) {
        fieldErrors.push(error);
      }
    });
    //Update deze functie met nieuwe errors
    const newErrors = { ...errors, [fieldName]: fieldErrors };
    setErrors(newErrors);
    return fieldErrors;
  };

  //Async want de handler function doorgestuurd om een web service op te roepen, wat async is
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // set state to indicate submission is in progress
      setSubmitting(true);

      // call the consumer submit functiom
      setSubmitError(false);
      const result = await onSubmit(waardes);
      setErrors(result.errors || {});
      setSubmitError(!result.success);

      //set any errors in state
      // set State to indicate submission has finished
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  //Doorloopt elke validatie regel voor elk veldm en roept elk regel aan
  const validateForm = () => {
    const newErrors: Errors = {};
    let haveError: boolean = false;
    if (validationRules) {
      Object.keys(validationRules).forEach((fieldName) => {
        newErrors[fieldName] = validatie(fieldName);
        if (newErrors[fieldName].length > 0) {
          haveError = true;
        }
      });
    }
    setErrors(newErrors);
    return !haveError;
  };

  return (
    //   Met Provider geeft de Chldren components van het form toegang
    //Dus het gehele form kan worden gebruikt door bestanden dat FormContext importeert
    <FormContext.Provider
      value={{
        waardes,
        setWaarde: (fieldName: string, waarde: any) => {
          setWaardes({ ...waardes, [fieldName]: waarde });
        },
        errors,
        validatie,
        touched,
        setTouched: (fieldName: string) => {
          setTouched({ ...touched, [fieldName]: true });
        },
      }}
    >
      <form noValidate={true} onSubmit={handleSubmit}>
        <fieldset
          // disable the form when submission is in progress OR succesfully submitted
          disabled={submitting || (submitted && !submitError)}
          css={css`
            margin: 10px auto 0 auto;
            padding: 30px;
            width: 350px;
            background-color: ${gray6};
            border-radius: 4px;
            border: 1px solid ${gray5};
            box-shadow: 0 3px 5px 0 rgba (0, 0, 0, 0.16);
          `}
        >
          {children}
          <div
            css={css`
              margin: 30px 0px 0px 0px;
              padding: 20px 0px 0px 0px;
              border-top: 1px solid ${gray5};
            `}
          >
            <PrimaireKnop type="submit">{submitCaption}</PrimaireKnop>
          </div>
          {submitted && submitError && (
            <p
              css={css`
                color: red;
              `}
            >
              {failureMessage}
            </p>
          )}
          {submitted && !submitError && (
            <p
              css={css`
                color: green;
              `}
            >
              {successMessage}
            </p>
          )}
        </fieldset>
      </form>
    </FormContext.Provider>
  );
};
