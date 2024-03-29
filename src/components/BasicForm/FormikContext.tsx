import React from "react";
import {Formik, Form, Field, FormikHelpers, useFormikContext} from "formik";
import {Typography, Box} from "@mui/material";
import {TextField as FormikTextField} from "formik-mui";

interface FormValues {
    token: string;
}

const AutoSubmitToken: React.FC = () => {
    const {values, submitForm}: { values: FormValues; submitForm: () => void } = useFormikContext<FormValues>();

    React.useEffect(() => {
        if (values.token.length === 6) {
            submitForm();
        }
    }, [values, submitForm]);

    return null;
};

const TwoFactorVerificationForm: React.FC = () => (
    <Box sx={{maxWidth: 300, mx: "auto", textAlign: 'center'}}>
        <Typography variant="h4" gutterBottom>
            2-step Verification
        </Typography>
        <Typography variant="body1">
            Please enter the 6 digit code sent to your device
        </Typography>
        <Formik
            initialValues={{token: ""}}
            validate={(values: FormValues) => {
                const errors: Partial<FormValues> = {};
                if (values.token.length < 6) {
                    errors.token = "Invalid code. Must be 6 digits.";
                }
                return errors;
            }}
            onSubmit={(values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 1000);
            }}
        >
            {() => (
                <Form>
                    <Field
                        component={FormikTextField}
                        name="token"
                        type="tel"
                        label="Verification Code"
                        variant="outlined"
                        fullWidth
                        sx={{mb: 2}}
                    />
                    <AutoSubmitToken/>
                </Form>
            )}
        </Formik>
    </Box>
);

export default TwoFactorVerificationForm;
