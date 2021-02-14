import { FC, useContext, ChangeEvent } from 'react';
/**@jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { fontFamily, fontSize, gray1, gray2, gray5, gray6 } from './Styles';
import { FormContext } from './Form';

interface Props {
  name: string;
  label?: string;
  type?: 'Text' | 'TextArea' | 'Password'; //kan alleen die drie waardes zijn
}

const baseCSS = css`
  box-sizing: border-box;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  margin-bottom: 5px;
  padding: 8px 10px;
  border: 1px solid ${gray5};
  border-radius: 3px;
  color: ${gray2};
  background-color: white;
  width: 100%;
  :focus {
    outline-color: ${gray5};
  }
  ::disabled {
    background-color: ${gray6};
  }
`;

export const Field: FC<Props> = ({ name, label, type = 'Text' }) => {
  const { setWaarde } = useContext(FormContext);
  //onChange even om het setWarde op te roepen binnen het context
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (setWaarde) {
      setWaarde(name, e.currentTarget.value);
    }
  };
  //onChhange handler eindigt hier
  return (
    <FormContext.Consumer>
      {(waardes) => (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
          `}
        >
          {label && (
            <label
              css={css`
                font-weight: bold;
              `}
              htmlFor={name}
            >
              {/* short circuit syntax voor label prop */}
              {label}
            </label>
          )}
          {(type === 'Text' || type === 'Password') && (
            <input
              type={type.toLowerCase()}
              id={name}
              value={
                waardes.waardes[name] === undefined ? '' : waardes.waardes[name]
              }
              onChange={handleChange}
              css={baseCSS}
            />
          )}
          {/* Render the text area */}
          {type === 'TextArea' && (
            <textarea
              id={name}
              value={
                waardes.waardes[name] === undefined ? '' : waardes.waardes[name]
              }
              onChange={handleChange}
              css={css`
                ${baseCSS};
                height: 100px;
              `}
            />
          )}
        </div>
      )}
    </FormContext.Consumer>
  );
};
