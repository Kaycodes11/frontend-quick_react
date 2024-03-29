import React from 'react';
import {useFormik, FormikProvider, Form, useField} from 'formik';
import * as Yup from 'yup';

interface TextInputLiveFeedbackProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
    label: string;
    helpText?: string;
    name: string; // Ensure 'name' is always provided and is not optional
}

const styles: Record<string, React.CSSProperties> = {
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
        marginTop: '50px',
    },
    formGroup: {
        marginBottom: '20px',
        width: '100%',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    feedback: {
        minHeight: '20px',
        fontSize: '0.875rem',
        color: 'red',
    },
    button: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    },
};

const TextInputLiveFeedback: React.FC<TextInputLiveFeedbackProps> = ({label, helpText, ...props}) => {
    const [field, meta] = useField(props);

    // const showFeedback = (!!field.value && field.value.trim().length > 2) || meta.touched;

    return (
        <div style={styles.formGroup}>
            <label htmlFor={props.name} style={styles.label}>{label}</label>
            <input
                {...field}
                aria-describedby={`${props.name}-feedback ${props.name}-help`}
                style={styles.input}
                {...props}
            />
            <div style={styles.feedback}>
                {meta.touched && meta.error ? meta.error : ''}
            </div>
            {helpText && <div className="text-xs" style={{marginTop: '4px'}}>{helpText}</div>}
        </div>
    );
};

const InstantFeedbackForm = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Must be at least 3 characters')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <FormikProvider value={formik}>
            <Form style={styles.formContainer}>
                <TextInputLiveFeedback
                    label="Username"
                    name="username"
                    helpText="Must be 3-15 characters and cannot contain special characters."
                    type="text"
                />
                <button type="submit" style={styles.button}>Submit</button>
            </Form>
        </FormikProvider>
    );
};

export default InstantFeedbackForm;


// N.B: wherever it would be used , it can be used as <InstantFeedbackForm /> (no props needs to passed to it)