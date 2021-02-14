import { FC, useState, createContext } from 'react';
import { PrimaireKnop, gray5, gray6 } from './Styles';
/**@jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from '@emotion/react';

export interface Waardes {
  [key: string]: any; //Indexable type
}

interface FormContextProps {
  waardes: Waardes;
  setWaarde?: (fieldName: string, waarde: any) => void;
}

interface Props {
  submitCaption?: string;
}

//doorsturen van een initiele waarde is een verreiste voor deze context, sans waarom setWaarde optioneel is
export const FormContext = createContext<FormContextProps>({ waardes: {} });

export const Form: FC<Props> = ({ submitCaption, children }) => {
  const [waardes, setWaardes] = useState<Waardes>({});
  return (
    //   Met Provider geeft de Chldren components van het form toegang
    //Dus het gehele form kan worden gebruikt door bestanden dat FormContext importeert
    <FormContext.Provider
      value={{
        waardes,
        setWaarde: (fieldName: string, waarde: any) => {
          setWaardes({ ...waardes, [fieldName]: waarde });
        },
      }}
    >
      <form noValidate={true}>
        <fieldset
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
        </fieldset>
      </form>
    </FormContext.Provider>
  );
};
