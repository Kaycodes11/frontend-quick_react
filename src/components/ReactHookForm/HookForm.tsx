import React from "react";
import { useForm, UseFormReturn, SubmitHandler, FieldValues } from "react-hook-form";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input ref={ref} {...props} />
));

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: Option[] };

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ options, ...props }, ref) => {
  return (
    <select ref={ref} {...props}>
      {options.map(({ label, value }) => (
        <option key={Math.random().toString(32).substring(2, 9)} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
};

// This is custom Form component
const Form = <TFormValues extends Record<string, any> = FormValues>({
  onSubmit,
  children,
}: FormProps<TFormValues>) => {
  // all the methods from react-hook-form is available within methods thus use it as needed
  const methods = useForm<TFormValues>();
  return <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>;
};

type FormValues = {
  firstName: string;
  lastName: string;
  sex: string;
};

export default function HookForm() {
  const onSubmit = (data: FormValues) => console.log(data);

  // either use <Form<FormValues> onSubmit={onSubmit}></form> or use a default type on Form

  return (
    <Form onSubmit={onSubmit}>
      {({ register, control }) => (
        <>
          <Input {...register("firstName")} />
          <Input {...register("lastName")} />
          <Select
            {...register("sex")}
            options={[
              { label: "Female", value: "female" },
              { label: "Male", value: "male" },
              { label: "Other", value: "other" },
            ]}
          />

          <Input type="submit" />
        </>
      )}
    </Form>
  );
}
