import React, {CSSProperties} from "react";
import {useForm, useFieldArray, useWatch, Control} from "react-hook-form";

type FormValues = {
    cart: {
        name: string | null;
        price: number | null;
        quantity: number | null;
    }[];
};

const Total = ({control}: { control: Control<FormValues> }) => {
    const formValues = useWatch({
        name: "cart",
        control,
    });

    const total = formValues.reduce(
        (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
        0
    );

    return <p>Total Amount: {total}</p>;
};

const styles: Record<string, CSSProperties> = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Use the full height of the viewport
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        margin: '20px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        width: '90%',
        backgroundColor: '#f9f9f9',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '10px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    errorInput: {
        borderColor: 'red',
    },
    button: {
        padding: '10px 15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        width: "auto"
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    addButton: {
        alignSelf: 'center',
        width: "auto"
    },
};

export default function FieldArray1() {
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>({
        defaultValues: {
            cart: [{name: "", quantity: null, price: null}],
        },
        mode: "onBlur",
    });

    const {fields, append, prepend, remove} = useFieldArray({
        name: "cart",
        control,
    });

    const onSubmit = (data: FormValues) => console.log(data);

    return (
        <div style={styles.container}> {/* Added this `container` to center it in middle */}
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                {fields.map((field, index) => (
                    <section style={styles.section} key={field.id}>
                        <input
                            placeholder="Name"
                            {...register(`cart.${index}.name` as const, {required: true})}
                            style={{...styles.input, ...(errors?.cart?.[index]?.name && styles.errorInput)}}
                        />
                        <input
                            placeholder="Quantity"
                            type="number"
                            {...register(`cart.${index}.quantity` as const, {valueAsNumber: true, required: true})}
                            style={{...styles.input, ...(errors?.cart?.[index]?.quantity && styles.errorInput)}}
                        />
                        <input
                            placeholder="Value"
                            type="number"
                            {...register(`cart.${index}.price` as const, {valueAsNumber: true, required: true})}
                            style={{...styles.input, ...(errors?.cart?.[index]?.price && styles.errorInput)}}
                        />
                        <button type="button" onClick={() => remove(index)}
                                style={{...styles.button, ...styles.deleteButton}}>
                            DELETE
                        </button>
                    </section>
                ))}

                <Total control={control}/>

                <button
                    type="button"
                    onClick={() => append({name: "", quantity: 0, price: 0})}
                    style={{...styles.button, ...styles.addButton}}
                >
                    APPEND
                </button>
                <button
                    type="button"
                    onClick={() => prepend({name: "", price: 1, quantity: 2})}
                    style={{...styles.button, ...styles.addButton}}
                >
                    PREPEND
                </button>
                <input type="submit" style={styles.button}/>
            </form>
        </div>
    );
}
