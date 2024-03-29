import React, {CSSProperties} from "react";
import {useForm, useFieldArray} from "react-hook-form";

// Define your styles with explicit CSSProperties typing
const styles: Record<string, CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column', // Correctly typed as FlexDirection
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column', // Correctly typed as FlexDirection
        gap: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    input: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    buttonWrapper: {
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        borderRadius: "5px"
    },
    button: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
    }
};

const FieldArray4 = () => {
    const {register, control} = useForm({
        defaultValues: {
            test: [{value: "1"}, {value: "2"}],
        },
    });

    const {fields, prepend, append} = useFieldArray({
        name: "test",
        control,
    });

    return (
        <div style={styles.container}> {/* Centering the form */}
            <form style={styles.form}>
                {fields.map((field, index) => (
                    <input
                        key={field.id}
                        {...register(`test.${index}.value` as const)}
                        style={styles.input}
                    />
                ))}
                <div style={styles.buttonWrapper}>
                    <button
                        type="button"
                        onClick={() => prepend({value: ""})}
                        style={styles.button}
                    >
                        Prepend
                    </button>
                    <button
                        type="button"
                        onClick={() => append({value: ""})}
                        style={styles.button}
                    >
                        Append
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FieldArray4;