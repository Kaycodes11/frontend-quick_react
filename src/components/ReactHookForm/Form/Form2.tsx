import React from "react";
import {useForm, SubmitHandler, FieldValues} from "react-hook-form";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    (props, ref) => (
        <input
            ref={ref}
            {...props}
            style={{
                marginBottom: '20px',
                padding: '10px',
                width: '100%',
                boxSizing: 'border-box',
                borderRadius: '4px',
                border: '1px solid #ccc'
            }}
        />
    ));

type Option = {
    label: React.ReactNode;
    value: string | number;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { options: Option[] };

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({options, ...props}, ref) => (
        <select
            ref={ref}
            {...props}
            style={{
                marginBottom: '20px',
                padding: '10px',
                width: '100%',
                boxSizing: 'border-box',
                borderRadius: '4px',
                border: '1px solid #ccc'
            }}
        >
            {options.map(({label, value}) => (
                <option key={value.toString()} value={value}>{label}</option>
            ))}
        </select>
    )
);

type FormProps<TFormValues extends FieldValues = FormValues> = {
    onSubmit: SubmitHandler<TFormValues>;
    children: (methods: ReturnType<typeof useForm<TFormValues>>) => React.ReactNode;
};

const Form = <TFormValues extends Record<string, any> = Record<string, any>>({
                                                                                 onSubmit,
                                                                                 children,
                                                                             }: FormProps<TFormValues>) => {
    const methods = useForm<TFormValues>();
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '16px',
                    width: '100%',
                    maxWidth: '400px'
                }}
            >
                {children(methods)}
            </form>
        </div>
    );
};

type FormValues = {
    firstName: string;
    lastName: string;
    sex: string;
};

export default function Form2() {
    const onSubmit: SubmitHandler<FormValues> = (data) => alert(JSON.stringify(data));

    return (
        <>
            <h1 style={{textAlign: 'center', marginBottom: '20px'}}>React Hook Form - UseFormReturn</h1>
            <Form<FormValues> onSubmit={onSubmit}>
                {({register}) => (
                    <>
                        <Input {...register("firstName")} placeholder="First Name"/>
                        <Input {...register("lastName")} placeholder="Last Name"/>
                        <Select
                            {...register("sex")}
                            name="sex"
                            options={[
                                {label: "Female", value: "female"},
                                {label: "Male", value: "male"},
                                {label: "Other", value: "other"},
                            ]}
                        />
                        <Input type="submit" value="Submit" style={{padding: '10px', cursor: 'pointer'}}/>
                    </>
                )}
            </Form>
        </>
    );
}
