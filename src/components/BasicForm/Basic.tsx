import React from "react";
import { Formik, ErrorMessage, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";
import "./basic.css";

interface FormValues {
  email: string;
  password: string;
}

interface OtherProps {
  title?: string;
}

interface MyFormProps {
  initialEmail?: string;
  initialPassword?: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Too short")
    .max(15, "Must be 15 chracters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

// @ts-ignore
const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

// this is just a basic form with validation and masking

// WORKING
export default function Basic() {
  // field level validation
  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  // field level validation
  function validateUsername(value: string) {
    let error;
    if (value === "admin") {
      error = "Nice try!";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ username: "", email: "", color: "green", hobby: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        errors,
        touched,
        isValidating,
        validateField,
        validateForm,
      }: FormikProps<{
        username: "";
        email: "";
        color: "green";
        hobby: "";
      }>) => (
        <Form>
          <Field
            name="email"
            validate={validateEmail}
            placeholder="Enter email"
          />
          {errors.email && touched.email && <div>{errors.email}</div>}

          <Field
            name="username"
            validate={validateUsername}
            placeholder="Enter username"
          />
          {/* {touched.username && errors.username  && <div>{errors.username}</div>} */}
          <ErrorMessage name="username" component="div" />

          <Field name="username">
             {({
               field, // { name, value, onChange, onBlur }
               form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
               meta,
             }: any) => (
               <div>
                 <input type="text" placeholder="Email" {...field} />
                 {meta.touched && meta.error && (
                   <div className="error">{meta.error}</div>
                 )}
               </div>
             )}
           </Field>

          <Field as="select" name="color">
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </Field>

          <Field name="hobby" placeholder="hobby" component={MyInput} />

          {/* manually validate any field  */}
          <button type="button" onClick={() => validateField("username")}>
            Check Username
          </button>

          {/* manually validate the whole form based on there given validation beforehand */}
          <button
            type="button"
            onClick={() => validateForm().then(() => console.log("blah"))}
          >
            Validate All
          </button>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
