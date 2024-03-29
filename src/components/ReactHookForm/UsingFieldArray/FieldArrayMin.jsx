import React from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {object, array, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = object().shape({
    questions: array()
        .of(
            object().shape({
                text: string().required("Some text is required"),
            })
        )
        .required(),
});

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        gap: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '20px auto',
    },
    question: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
    },
    removeButton: {
        marginTop: '10px',
        backgroundColor: '#dc3545',
    },
    error: {
        color: '#dc3545',
    }
};

function FieldArrayMinLength() {
    const {
        control,
        register,
        setError,
        clearErrors,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "questions", // Name of field array
    });

    const MAX_FIELDS = 10; // Maximum number of fields

    // When `appendQuestion` called , it will add a new question filed to the dynamic list
    const appendQuestion = React.useCallback(() => {
        // Example custom validation before append
        if (fields.length >= MAX_FIELDS) {
            // Manually setting an error if too many questions are added
            setError("questions", {
                type: "manual",
                message: "No more than 10 questions allowed.",
            });
        } else {
            clearErrors("questions");
            append({text: ""}); // INITIAL VALUE for newly generated field
        }
    }, [append, fields.length, setError, clearErrors]);

    return (
        <form onSubmit={handleSubmit(console.log)} style={styles.form}>
            <h1>Yup Validation - Field Array</h1>
            {fields.map((question, questionIndex) => (
                <div key={question.id} style={styles.question}>
                    <input
                        {...register(`questions.${questionIndex}.text`)}
                        style={styles.input}
                        defaultValue={question.text}
                        aria-label={`Question ${questionIndex + 1}`}
                    />
                    <button
                        type="button"
                        onClick={() => remove(questionIndex)}
                        style={{...styles.button, ...styles.removeButton}}
                        aria-label={`Remove Question ${questionIndex + 1}`}
                    >
                        Remove
                    </button>
                </div>
            ))}
            {errors.questions && <p style={styles.error}>Error: {errors.questions.message}</p>}
            {fields.length < MAX_FIELDS && ( // Only show the "Add question" button if the maximum number of fields hasn't been reached
                <button type="button" onClick={appendQuestion} style={styles.button}>
                    Add question
                </button>
            )}
            <input type="submit" style={styles.button}/>
        </form>
    );
}

export default FieldArrayMinLength;
