import React from 'react';
import {Formik, Field, Form, FormikHelpers} from "formik";

interface MyFormValues {
    firstName: string;
    lastName: string;
    email: string;
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        padding: '25px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px',
        width: '100%',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    },
};

export default function TsForm() {
    return (
        <div style={styles.container}>
            <h1>SignUp</h1>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                }}
                onSubmit={(values: MyFormValues, {setSubmitting}: FormikHelpers<MyFormValues>) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
            >
                <Form style={styles.form}>
                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="John" style={styles.input}/>

                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="lastName" placeholder="Doe" style={styles.input}/>

                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" placeholder="john@acme.com" type="email" style={styles.input}/>

                    <button type="submit" style={styles.button}>
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    );
}
