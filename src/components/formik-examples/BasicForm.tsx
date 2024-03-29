import React from "react";
import {Formik, Field, Form} from "formik";
import {TextField, Button, Container, Box, Typography} from "@mui/material";

enum Gender {
    Male = "Male",
    Female = "Female",
    Others = "Others",
}

interface MyFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    mobile?: string;
    gender?: Gender;
}

export default function BasicForm() {
    const initialValues: MyFormValues = {
        firstName: "",
        lastName: "",
        email: "",
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
            </Typography>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {({submitForm}) => (
                    <Form>
                        <Box sx={{'& .MuiTextField-root': {mb: 2}}}>
                            <Field
                                component={TextField}
                                name="firstName"
                                label="First Name"
                                fullWidth
                                variant="outlined"
                            />

                            <Field
                                component={TextField}
                                name="lastName"
                                label="Last Name"
                                fullWidth
                                variant="outlined"
                            />

                            <Field
                                component={TextField}
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={submitForm}
                            sx={{mt: 1}}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
