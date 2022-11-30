import { Formik, Form, Field } from "formik";

// WORKING
const NestedForm = () => (
  <div>
    <h1>Social Profiles</h1>
    <Formik
      initialValues={{
        social: { facebook: "", twitter: "" },
      }}
      onSubmit={(values) => {
        console.log(JSON.stringify(values, null, 2));
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
