import React, {CSSProperties} from "react";
import ReactDatePicker from "react-datepicker";
import {useForm, UseControllerProps, useController} from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

type FormValues = {
    ReactDatepicker: Date | null;
};


const styles: Record<string, CSSProperties> = {
    form: {
        display: 'flex',
        flexDirection: 'column', // Correctly recognized as a valid FlexDirection type
        alignItems: 'center', // Correctly recognized as a valid AlignItems type
        gap: '1rem', // Recognized as string, valid for gap
        margin: '2rem auto', // Recognized as string, valid for margin
        padding: '2rem', // Recognized as string, valid for padding
        backgroundColor: '#f7f7f7', // Recognized as string, valid for backgroundColor
        borderRadius: '8px', // Recognized as string, valid for borderRadius
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Recognized as string, valid for boxShadow
        maxWidth: '400px', // Recognized as string, valid for maxWidth
    },
    submitButton: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    datePickerWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    }
};


function UsingDatePicker(props: UseControllerProps<FormValues>) {
    const {field} = useController(props);

    return (
        <div style={styles.datePickerWrapper}>
            <ReactDatePicker
                onChange={(date: Date) => field.onChange(date)}
                onBlur={field.onBlur}
                selected={field.value}
                showTimeSelect
                dateFormat="Pp"
                className="react-datepicker" // This class is for targeting ReactDatePicker's internal input
            />
        </div>
    );
}

export default function FormDate() {
    const {handleSubmit, control} = useForm<FormValues>({
        defaultValues: {
            ReactDatepicker: null,
        },
    });

    return (
        <form onSubmit={handleSubmit((data: FormValues) => console.log(data))} style={styles.form}>
            <UsingDatePicker control={control} name="ReactDatepicker"/>
            <input type="submit" style={styles.submitButton}/>
        </form>
    );
}