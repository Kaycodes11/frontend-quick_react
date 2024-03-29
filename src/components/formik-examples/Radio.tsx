import React from 'react';
import {Formik, Field, Form} from 'formik';

const styles:Record<string, React.CSSProperties> = {
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
        gap: '10px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f7f7f7',
        maxWidth: '300px',
    },
    radioGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        margin: '5px',
    },
    pickedDisplay: {
        marginTop: '20px',
        fontWeight: 'bold',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    },
};

const Radio = () => (
    <div style={styles.container}>
        <h1>Sign Up</h1>
        <Formik
            initialValues={{
                picked: '',
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({values}) => (
                <Form style={styles.form}>
                    <div id="my-radio-group" style={styles.radioGroup}>Picked</div>
                    <div role="group" aria-labelledby="my-radio-group">
                        <label style={styles.label}>
                            <Field type="radio" name="picked" value="One"/>
                            One
                        </label>
                        <label style={styles.label}>
                            <Field type="radio" name="picked" value="Two"/>
                            Two
                        </label>
                    </div>
                    <div style={styles.pickedDisplay}>Picked: {values.picked}</div>

                    <button type="submit" style={styles.button}>Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default Radio;
