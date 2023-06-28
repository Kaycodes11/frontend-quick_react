import { Formik, Field, Form } from "formik";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
// const sleep = (n = 500) => setTimeout(() => Promise.resolve(undefined), n)

// This example demonstrates how to use async/await to submit a Formik form.

// WORKING
export default function AsyncSumission() {
  const handleSubmit = async (values: { firstName: string; lastName: string; email: string }) => {
    await sleep(500);
    alert(JSON.stringify(values, null, 2));
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        onSubmit={async (values) => {
          await sleep(500);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" placeholder="Jane" />

            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" placeholder="Doe" />

            <label htmlFor="email">Email</label>
            <Field name="email" placeholder="jane@gmail.com" type="email" />

            <button style={{ marginTop: "4px" }} type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
