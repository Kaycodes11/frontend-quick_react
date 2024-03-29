import React from "react";
import {useForm} from "react-hook-form";

type FormData = {
    firstName: string;
};

const styles = {
    form: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: "1rem",
        marginTop: "2rem",
    },
    input: {
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "200px",
    },
    button: {
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "white",
        margin: "0.5rem",
    },
};

export default function UsingSetValue() {
    const {register, setValue, handleSubmit} = useForm<FormData>();
    const onSubmit = (data: FormData) => console.log(data);

    // Prevent default to avoid form submission when setting values
    const handleSetValue = (name: keyof FormData, value: string, options?: Parameters<typeof setValue>[2]) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setValue(name, value, options);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <input {...register("firstName", {required: true})} style={styles.input}/>
            <button onClick={handleSetValue("firstName", "Bill")} style={styles.button}>
                Set "Bill"
            </button>
            <button
                onClick={handleSetValue("firstName", "Luo", {
                    shouldValidate: true,
                    shouldDirty: true,
                })}
                style={styles.button}
            >
                Set "Luo" with Options
            </button>
            <input type="submit" value="Submit" style={styles.button}/>
        </form>
    );
}
