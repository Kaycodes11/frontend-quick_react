import { Formik, Field, Form, FormikHelpers } from "formik";

interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

export default function TsForm() {
  return (
    <div>
      <h1>SignUp</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        onSubmit={(
          values: MyFormValues,
          { setSubmitting }: FormikHelpers<MyFormValues>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />

          <button style={{ marginTop: "4px" }} type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
