import React from "react";
import {Formik, Form, Field} from "formik";
import {TextField, Button, Container, Typography, Box} from "@mui/material";
import {fieldToTextField} from "formik-mui";

interface MyFormValues {
    firstName: string;
}

const TypedForm: React.FC = () => {
    const initialValues: MyFormValues = {firstName: ""};

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{mt: 4, mb: 2}}>
                My Example
            </Typography>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                {() => (
                    <Form>
                        <Box sx={{'& .MuiTextField-root': {mb: 2}, display: 'flex', flexDirection: 'column'}}>
                            <Field
                                as={TextField}
                                name="firstName"
                                label="First Name"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default TypedForm;
