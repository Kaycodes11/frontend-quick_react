import * as React from "react";
import {useForm} from "react-hook-form";

type FormValues = {
    a: string;
    b: string;
    c: string;
};

// Define the styles with correct types
const styles: Record<string, React.CSSProperties> = {
    form: {
        display: "flex",
        flexDirection: "column", // Correctly recognized as FlexDirection
        gap: "1rem",
        width: "300px",
        margin: "auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
    },
    input: {
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    submitButton: {
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "white",
    },
    triggerButton: {
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        cursor: "pointer",
        backgroundColor: "#f0f0f0",
    },
}

export default function UsingSetValueDependant() {
    const {watch, register, handleSubmit, setValue, formState} = useForm<FormValues>({
        defaultValues: {
            a: "",
            b: "",
            c: "",
        },
    });

    const onSubmit = (data: FormValues) => console.log(data);
    const [a, b] = watch(["a", "b"]);

    React.useEffect(() => {
        if (formState.touchedFields.a && formState.touchedFields.b && a && b) {
            setValue("c", `${a} ${b}`);
        }
    }, [a, b, formState.touchedFields.a, formState.touchedFields.b, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <input {...register("a")} placeholder="Enter value for a" style={styles.input}/>
            <input {...register("b")} placeholder="Enter value for b" style={styles.input}/>
            <input {...register("c")} placeholder="Result will appear here" style={styles.input} disabled/>
            <button type="submit" style={styles.submitButton}>
                Submit
            </button>
            <button
                type="button"
                onClick={() => {
                    setValue("a", "what", {shouldTouch: true});
                    setValue("b", "ever", {shouldTouch: true});
                }}
                style={styles.triggerButton}
            >
                Trigger Values
            </button>
        </form>
    );
}