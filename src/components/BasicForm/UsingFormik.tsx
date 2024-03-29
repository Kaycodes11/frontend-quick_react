import {useFormik} from "formik";
import React from 'react';
import {Button, TextField, Box, Container, Typography} from '@mui/material';

// eslint-disable-next-line no-lone-blocks

/* <Field>, <FastField>, <ErrorMessage>, connect(), and <FieldArray> will NOT work with useFormik() as they all require React Context */

// use useFormik() when don't want to use above built-in apis form Formik

// WORKING


interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
}

export default function UsingFormik() {
    const formik = useFormik<FormValues>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Container maxWidth="sm" style={{marginTop: '2rem'}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Using useFormik
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
                <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />
                <TextField
                    id="email"
                    name="email"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
}
