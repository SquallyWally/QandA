import React, { FC, useState, Fragment, useEffect } from 'react';
import { Page } from './Page';
import { RouteComponentProps as Router } from 'react-router-dom';
/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { gray3, gray5, gray6 } from './Styles';
import { getVraag, VraagData, postAntwoord } from './VragenData';
import { AntwoordenLijst } from './AntwoordenLijst';
import { Form, minLength, required, Waardes } from './Form';
import { Field } from './Field';

interface RouteParams {
  questionId: string;
}

export const QuestionPage: FC<Router<RouteParams>> = ({ match }) => {
  const [vraag, setVraag] = useState<VraagData | null>(
    null,
  ); /**maakt een state aan voor de vraag*/

  //render een vraag
  useEffect(() => {
    const doGetVraag = async (questionId: number) => {
      const vraagGevonden = await getVraag(questionId);
      setVraag(vraagGevonden);
    };

    if (match.params.questionId) {
      const questionId = Number(match.params.questionId); //string naar nummer
      doGetVraag(questionId);
    }
  }, [match.params.questionId]);

  const handleSubmit = async (w: Waardes) => {
    const res = await postAntwoord({
      questionId: vraag!.questionId,
      content: w.content,
      userName: 'Rey',
      created: new Date(),
    });

    return { success: res ? true : false };
  };

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {vraag === null ? '' : vraag.title}
        </div>
        {vraag !== null && (
          <Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {vraag.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Gevraagd door ${
                vraag.userName
              } op ${vraag.created.toLocaleDateString()} ${vraag.created.toLocaleTimeString()}`}
            </div>
            <AntwoordenLijst data={vraag.antwoorden} />
            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <Form
                submitCaption="Stel uw antwoord"
                validationRules={{
                  content: [
                    { validator: required },
                    { validator: minLength, arg: 50 },
                  ],
                }}
                onSubmit={handleSubmit}
                failureMessage="Lmao"
                successMessage="Nice"
              >
                <Field name="content" label="Jou antwoord" type="TextArea" />
              </Form>
            </div>
          </Fragment>
        )}
      </div>
    </Page>
  );
};
