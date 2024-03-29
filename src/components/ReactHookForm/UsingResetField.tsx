import * as React from "react";
import {useForm} from "react-hook-form";

const styles = {
    form: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: "10px",
        marginTop: "20px",
    },
    input: {
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "200px",
    },
    button: {
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #007bff",
        backgroundColor: "#007bff",
        color: "#ffffff",
        cursor: "pointer",
        marginTop: "5px",
    },
    feedback: {
        marginTop: "10px",
    },
};

export default function UsingResetField() {
    const {
        register,
        resetField,
        formState: {isDirty, isValid, errors, touchedFields, dirtyFields},
    } = useForm({
        mode: "onChange",
        defaultValues: {
            firstName: "",
        },
    });

    return (
        <div style={styles.form}>
            <input {...register("firstName", {required: "First name is required"})} style={styles.input}/>
            <div style={styles.feedback}>
                <p>isDirty: {isDirty ? "Yes" : "No"}</p>
                <p>touchedFields: {touchedFields.firstName ? "Yes" : "No"}</p>
                <p>dirtyFields: {dirtyFields.firstName ? "Yes" : "No"}</p>
                <p>isValid: {isValid ? "Yes" : "No"}</p>
                <p>error: {errors.firstName ? "First name is required" : "No error"}</p>
            </div>
            <hr style={{width: "100%", marginTop: "20px"}}/>
            <button style={styles.button} onClick={() => resetField("firstName", {keepError: true})}>
                Reset (Keep Error)
            </button>
            <button style={styles.button} onClick={() => resetField("firstName", {keepTouched: true})}>
                Reset (Keep Touched)
            </button>
            <button style={styles.button} onClick={() => resetField("firstName", {keepDirty: true})}>
                Reset (Keep Dirty)
            </button>
            <button style={styles.button} onClick={() => resetField("firstName", {defaultValue: "New"})}>
                Update Default Value
            </button>
        </div>
    );
}
