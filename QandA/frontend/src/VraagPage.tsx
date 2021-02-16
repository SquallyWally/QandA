import React from 'react';
import { Page } from './Page';
import { Form, minLength, required, Waardes } from './Form';
import { Field } from './Field';
import { postVraag } from './VragenData';

//Deze functie werkt async
export const VraagPage = () => {
  const handleSubmit = async (w: Waardes) => {
    const vraag = await postVraag({
      title: w.title,
      content: w.content,
      userName: 'Rey',
      created: new Date(),
    });
    return { success: vraag ? true : false };
  };

  return (
    <Page title="stel een vraag">
      <Form
        submitCaption="Stel uw vraag"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 50 }],
        }}
        onSubmit={handleSubmit}
        failureMessage="Er is een groot probleem met uw vraag"
        successMessage="Chill"
      >
        <Field name="title" label="Title" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Page>
  );
};
export default VraagPage;

//Pagina 190
