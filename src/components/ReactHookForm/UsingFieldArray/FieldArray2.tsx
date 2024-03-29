import React from 'react';
import {
    useForm,
    useFieldArray,
    useWatch,
    Control,
    FieldValues,
    UseFieldArrayUpdate,
    FieldArrayWithId
} from "react-hook-form";
import {CSSProperties} from 'react';

interface FormData {
    array: {
        firstName: string;
    }[];
};

interface EditProps {
    control: Control<FormData>;
    update: UseFieldArrayUpdate<FormData>;
    index: number;
    value: FieldArrayWithId<FormData, "array", "id">; // Add this line
}

interface DisplayProps {
    control: Control<FormData>;
    index: number;
}


// Styles typed with CSSProperties for proper type checking
const styles: Record<string, CSSProperties> = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        padding: '20px',
    },
    field: {
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    button: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
    },
    input: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
};

// Add a dynamic field and update
export default function FieldArray2() {
    const {control, handleSubmit} = useForm<FormData>({
        defaultValues: {array: []},
    });
    const {fields, append, update} = useFieldArray({
        control,
        name: "array",
    });

    return (
        <form onSubmit={handleSubmit((data) => console.log(data))} style={styles.form}>
            {fields.map((field, index) => (
                <Edit
                    key={field.id}
                    control={control}
                    update={update}
                    index={index}
                    value={field}
                />
            ))}

            <button
                type="button"
                onClick={() => append({firstName: ""})}
                style={styles.button}
            >
                Append
            </button>
            <input type="submit" style={styles.button}/>
        </form>
    );
}

const Display: React.FC<DisplayProps> = ({control, index}) => {
    const data = useWatch({
        control,
        name: `array.${index}.firstName`,
    });
    return <p>{data}</p>;
};

const Edit: React.FC<EditProps> = ({update, index, control}) => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            firstName: "",
        },
    });

    return (
        <div style={styles.field}>
            <Display control={control} index={index}/>

            <form onSubmit={handleSubmit((data) => update(index, data))}>
                <input
                    placeholder="First Name"
                    {...register(`firstName`, {required: "First name is required"})}
                    style={styles.input}
                />
                {errors.firstName && <p style={{color: 'red'}}>{errors.firstName.message}</p>}

                <button type="submit" style={styles.button}>
                    Update
                </button>
            </form>
        </div>
    );
};
