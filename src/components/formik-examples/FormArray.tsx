import {Formik, Field, Form, ErrorMessage, FieldArray, FormikHelpers} from "formik";
import * as Yup from "yup";

interface Friend {
    name: string;
    email: string;
}

interface FormValues {
    friends: Friend[];
}

const initialValues: FormValues = {
    friends: [{name: "", email: ""}],
};

const validationSchema = Yup.object({
    friends: Yup.array().of(
        Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
        })
    ),
});


// WORKING : This is one way to define FieldArray
const InviteFriends = () => (
    <div style={styles.container}>
        <h1>Invite friends</h1>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 500);
            }}
        >
            {({values}) => (
                <Form style={styles.form}>
                    <FieldArray name="friends">
                        {({remove, push}) => (
                            <div>
                                {values.friends.map((friend, index) => (
                                    <div key={index} style={styles.friendContainer}>
                                        <div>
                                            <label htmlFor={`friends.${index}.name`}>Name</label>
                                            <Field name={`friends.${index}.name`} type="text" style={styles.input}/>
                                            <div style={styles.error}>
                                                <ErrorMessage name={`friends.${index}.name`}/>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor={`friends.${index}.email`}>Email</label>
                                            <Field name={`friends.${index}.email`} type="email" style={styles.input}/>
                                            <div style={styles.error}>
                                                <ErrorMessage name={`friends.${index}.email`}/>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => remove(index)} style={styles.removeButton}>
                                            X
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => push({name: '', email: ''})}
                                        style={styles.addButton}>
                                    Add Friend
                                </button>
                            </div>
                        )}
                    </FieldArray>
                    <button type="submit" style={styles.submitButton}>Invite</button>
                </Form>
            )}
        </Formik>
    </div>
);


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
        gap: '10px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    },
    friendContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        marginBottom: '10px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    error: {
        color: 'red',
        marginTop: '2px',
    },
    removeButton: {
        cursor: 'pointer',
    },
    addButton: {
        marginTop: '10px',
        cursor: 'pointer',
    },
    submitButton: {
        marginTop: '20px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    },
};

export default InviteFriends;

// https://formik.org/docs/api/fieldarray
