import React from "react";
import { Path, UseFormRegister, useForm } from "react-hook-form";

interface IFormValues {
  firstName: string;
}

// when using custom component then
type InputProps = {
  // name type is Path<IFormValues> ...register("firstName")
  label: Path<IFormValues>;
  // register type
  register: UseFormRegister<IFormValues>;
  // native required attribute is boolean
  required: boolean;
};

// working
// Reusable Input : this way of building custom input is ok when not using with any libary
export default function Input1({ label, register, required }: InputProps) {
  return (
    <>
      <label>{label}</label>
      <input {...register(label, { required })} />
    </>
  );
}

function UsingInput() {
  const { register, control, handleSubmit } = useForm<IFormValues>({
    defaultValues: { firstName: "" },
  });
  return (
    <form onSubmit={handleSubmit((data: IFormValues) => console.log(data))}>
      <Input1 label="firstName" register={register} required />
    </form>
  );
}

/* usage = <Input label="First Name" register={register} required /> */
