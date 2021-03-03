import React, { FC, useEffect } from 'react';
import { Page } from './Page';
import { Form, minLength, required, Waardes, SubmitResult } from './Form';
import { Field } from './Field';
import { VraagData, PostVraagData } from './VragenData';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  AppState,
  leegVerzondenVraagActionCretor,
  PostOpenVragenActionCreator,
} from './Store';
import { AnyAction } from 'redux';

interface Props {
  postVraag: (vraag: PostVraagData) => Promise<void>;
  verzondenVraagResultaat?: VraagData;
  leegVerzondenVraag: () => void;
}

//Deze functie werkt async
const VraagPage: FC<Props> = ({
  postVraag,
  verzondenVraagResultaat,
  leegVerzondenVraag,
}) => {
  //Clear the queston posted state when the VraagPage comp is unmounted
  useEffect(() => {
    return function cleanUp() {
      leegVerzondenVraag();
    };
  }, [leegVerzondenVraag]);
  //////
  const handleSubmit = (w: Waardes) => {
    postVraag({
      title: w.title,
      content: w.content,
      userName: 'Rey',
      created: new Date(),
    });
    // return { success: vraag ? true : false };
  };

  let submitResult: SubmitResult | undefined;
  if (verzondenVraagResultaat) {
    submitResult = { success: verzondenVraagResultaat !== undefined };
  }

  return (
    <Page title="stel een vraag">
      <Form
        submitCaption="Stel uw vraag"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 50 }],
        }}
        onSubmit={handleSubmit}
        submitResult={submitResult}
        failureMessage="Er is een groot probleem met uw vraag"
        successMessage="Chill"
      >
        <Field name="title" label="Title" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Page>
  );
};

const mapStateToProps = (store: AppState) => {
  return {
    verzondenVraagResultaat: store.vragen.verzondenResultaat,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    postVraag: (vraag: PostVraagData) =>
      dispatch(PostOpenVragenActionCreator(vraag)),
    leegVerzondenVraag: () => dispatch(leegVerzondenVraagActionCretor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VraagPage);
//export default VraagPage;
