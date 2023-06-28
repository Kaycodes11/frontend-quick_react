import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import Select2 from "./Select2";

export interface IFormValues {
  firstName: string;
  sex: string;
  age: number;
}

export default function Form() {
  const { register, handleSubmit } = useForm<IFormValues>();
  const onSubmit = (data: IFormValues) => console.log(data);
  const options = [
    { label: "Female", value: "female" },
    { label: "Male", value: "male" },
    { label: "Other", value: "other" },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="firstName" register={register} required />
      <Select {...register("sex")} allOptions={options} />
      <Select2 labelo="age" {...register("age")} />
      <input type="submit" style={{ display: "block", marginTop: "5px" }} />
    </form>
  );
}
