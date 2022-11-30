import React from "react";
import { useFormik } from "formik";

// eslint-disable-next-line no-lone-blocks
{
  /* <Field>, <FastField>, <ErrorMessage>, connect(), and <FieldArray> will NOT work with useFormik() as they all require React Context */
}

// use useFormik() when don't want to use above built-in apis form Formik

// WORKING
export default function UsingFormik() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <button style={{marginTop: "4px"}} type="submit">Submit</button>
    </form>
  );
}
