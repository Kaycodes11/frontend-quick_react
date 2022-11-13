import { Formik, Field, Form } from "formik";

enum Gender {
  Male,
  Female,
  Others,
}

interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  mobile?: string;
  gender?: Gender;
}

export default function Basic() {
  const initialValues: MyFormValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="Jane" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
