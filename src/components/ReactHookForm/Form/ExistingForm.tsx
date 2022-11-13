import React from "react";
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";

interface IFormValues {
  "First Name": string;
  Age: number;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};

// this is another way to make custom input
const Input = ({ label, register, required }: InputProps) => {
  console.log("register", register);

  return (
    <>
      <label>{label}</label>
      <input {...register(label, { required })} defaultValue="John" />
    </>
  );
};

// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
));

// working
export default function ExistingForm() {
  const { register, handleSubmit } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* this doesn't use ref */}
      <Input label="First Name" register={register} required />
      {/* {...register()} this uses ref within  */}
      <Select label="Age" {...register("Age")} />
      <input type="submit" />
    </form>
  );
}
