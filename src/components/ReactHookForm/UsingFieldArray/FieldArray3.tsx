import React from "react";
import {useForm, useWatch, useFieldArray, Control} from "react-hook-form";

type FormValues = {
    data: { name: string; conditional?: string; easyConditional?: string }[];
};

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '20px',
        marginTop: '50px',
    },
    fieldContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        width: '300px',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
    },
    button: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        alignSelf: 'center',
    },
};

const ConditionField = ({control, index}: { control: Control<FormValues>; index: number }) => {
    const name = useWatch({control, name: `data.${index}.name`, defaultValue: ""});

    return (
        <>
            {name === "bill" && (
                <input {...control.register(`data.${index}.conditional` as const)} placeholder="Conditional Field"
                       style={styles.input}/>
            )}
            <input
                {...control.register(`data.${index}.easyConditional` as const)}
                placeholder="Easy Conditional Field"
                style={{...styles.input, display: name === "bill" ? "block" : "none"}}
            />
        </>
    );
};

const FieldArrayRegisterWhen: React.FC = () => {
    const {control, handleSubmit} = useForm<FormValues>({
        defaultValues: {
            data: [{name: ""}],
        },
    });
    const {fields, append} = useFieldArray({control, name: "data"});

    const onSubmit = (data: FormValues) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            {fields.map((field, index) => (
                <div key={field.id} style={styles.fieldContainer}>
                    <input {...control.register(`data.${index}.name` as const)} placeholder="Name"
                           style={styles.input}/>
                    <ConditionField control={control} index={index}/>
                </div>
            ))}
            <button type="button" onClick={() => append({name: ""})} style={styles.button}>
                Add More
            </button>
            <input type="submit" value="Submit" style={styles.button}/>
        </form>
    );
};

export default FieldArrayRegisterWhen;
