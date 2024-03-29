import {useEffect} from "react";
import {useForm, useFieldArray, Controller} from "react-hook-form";

const styles = {
    form: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: "10px",
        marginTop: "20px",
    },
    listItem: {
        listStyleType: "none",
        margin: "10px",
    },
    input: {
        padding: "8px",
        marginRight: "4px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    deleteButton: {
        padding: "8px 12px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        backgroundColor: "#ff6347",
        color: "white",
    },
    submitButton: {
        padding: "8px 12px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "white",
    },
};

export default function UsingResetForFieldArray() {
    const {register, control, handleSubmit, reset} = useForm({
        defaultValues: {
            loadState: "unloaded",
            names: [{firstName: "Bill", lastName: "Luo"}],
        },
    });
    const {fields, remove} = useFieldArray({
        control,
        name: "names",
    });

    useEffect(() => {
        // Simulate loading and then resetting form with new values
        reset({
            names: [
                {firstName: "Bob", lastName: "Actually"},
                {firstName: "Jane", lastName: "Actually"},
            ],
        });
    }, [reset]);

    const onSubmit = (data: unknown) => console.log("data", data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <ul>
                {fields.map((item, index) => (
                    <li key={item.id} style={styles.listItem}>
                        <input
                            {...register(`names.${index}.firstName`)}
                            style={styles.input}
                            placeholder="First Name"
                        />

                        <Controller
                            render={({field}) => <input {...field} style={styles.input} placeholder="Last Name"/>}
                            name={`names.${index}.lastName`}
                            control={control}
                        />

                        <button type="button" onClick={() => remove(index)} style={styles.deleteButton}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <input type="submit" value="Submit" style={styles.submitButton}/>
        </form>
    );
}
