import React from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { IFormValues } from "./Form";


// when using custom component then
type InputProps = {
  // name type is Path<IFormValues> ...register("firstName")
  label: Path<IFormValues>;
  // register type
  register: UseFormRegister<IFormValues>;
  // native required attribute is boolean [this below property could be optional]
  required: boolean;
};

// custom Input : this will have built in props from native <input />
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, register, required }, ref) => {
    return (
      <>
        <label>{label}</label>
        {/* to use react hook form options such as valueAsNumber do { required, valueAsNumber } */}
        <input {...register(label, { required })} />
      </>
    );
  }
);

export default Input;

// usage = <Input label="First Name" register={register} required />
