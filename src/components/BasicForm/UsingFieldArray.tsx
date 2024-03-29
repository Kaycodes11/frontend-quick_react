import React from "react";
import {Formik, Form, Field, FieldArray, FormikHelpers} from "formik";
import {Button, Container, TextField, Box, Typography} from "@mui/material";

interface FormValues {
    friends: string[];
}

const UsingFormArray: React.FC = () => (
    <Container maxWidth="sm">
        <Typography variant="h4" sx={{my: 4, textAlign: 'center'}}>
            Friend List
        </Typography>
        <Formik
            initialValues={{friends: ["jared", "ian", "brent"]}}
            onSubmit={(values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 500);
            }}
        >
            {({values}) => (
                <Form>
                    <FieldArray
                        name="friends"
                        render={(arrayHelpers) => (
                            <Box>
                                {values.friends && values.friends.length > 0 ? (
                                    values.friends.map((friend, index) => (
                                        <Box key={index} display="flex" alignItems="center" gap={2} mb={2}>
                                            <Field as={TextField} name={`friends.${index}`} variant="outlined"
                                                   fullWidth/>
                                            <Button variant="outlined" color="error"
                                                    onClick={() => arrayHelpers.remove(index)}>
                                                -
                                            </Button>
                                            <Button variant="outlined" color="primary"
                                                    onClick={() => arrayHelpers.insert(index, "")}>
                                                +
                                            </Button>
                                        </Box>
                                    ))
                                ) : (
                                    <Button variant="outlined" onClick={() => arrayHelpers.push("")} sx={{mb: 2}}>
                                        Add a friend
                                    </Button>
                                )}
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Box>
                        )}
                    />
                </Form>
            )}
        </Formik>
    </Container>
);

export default UsingFormArray;
