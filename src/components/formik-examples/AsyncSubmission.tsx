import React from "react";
import {Formik, Field, Form, FormikHelpers} from "formik";
import {TextField, Button, Container, Typography, Box} from "@mui/material";
import {fieldToTextField} from "formik-mui";

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const AsyncSubmission: React.FC = () => {
    const handleSubmit = async (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
        await sleep(500);
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    };

    return (
        <Container maxWidth="sm" style={{marginTop: "2rem"}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
            </Typography>
            <Formik initialValues={{firstName: "", lastName: "", email: ""}} onSubmit={handleSubmit}>
                {({isSubmitting, handleChange, values}) => (
                    <Form style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                        <TextField
                            name="firstName"
                            label="First Name"
                            placeholder="Jane"
                            onChange={handleChange}
                            value={values.firstName}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            name="lastName"
                            label="Last Name"
                            placeholder="Doe"
                            onChange={handleChange}
                            value={values.lastName}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            name="email"
                            label="Email"
                            placeholder="jane@gmail.com"
                            type="email"
                            onChange={handleChange}
                            value={values.email}
                            variant="outlined"
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default AsyncSubmission;
