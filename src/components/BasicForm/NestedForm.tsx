import { Formik, Form, Field } from "formik";

const NestedForm = () => (
  <div>
    <h1>Social Profiles</h1>
    <Formik
      initialValues={{
        social: { facebook: "", twitter: "" },
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        <Field name="social.facebook" />
        <Field name="social.twitter" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

export default NestedForm;
