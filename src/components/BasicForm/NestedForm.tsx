import React from "react";
import {Formik, Form, Field} from "formik";
import {TextField, Button, Box, Typography, Container} from "@mui/material";
import {TextField as FormikTextField} from 'formik-mui';

interface FormValues {
    social: {
        facebook: string;
        twitter: string;
    };
}

const NestedForm: React.FC = () => (
    <Container maxWidth="sm" style={{marginTop: "2rem"}}>
        <Typography variant="h4" component="h1" gutterBottom>
            Social Profiles
        </Typography>
        <Formik
            initialValues={{
                social: {facebook: "", twitter: ""},
            }}
            onSubmit={(values: FormValues) => {
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {() => (
                <Form>
                    <Box sx={{
                        '& .MuiTextField-root': {margin: "8px 0"},
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}>
                        <Field
                            component={FormikTextField}
                            name="social.facebook"
                            label="Facebook"
                            variant="outlined"
                        />
                        <Field
                            component={FormikTextField}
                            name="social.twitter"
                            label="Twitter"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    </Container>
);

export default NestedForm;