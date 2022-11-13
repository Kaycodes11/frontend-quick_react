import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IFormValues {
  firstName: string;
  age: number;
}

const Select1 = React.forwardRef<
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

export default Select1;

// since {...register("age")} has ref so Select1 must use forwardRef
// usage = <Select1 label="Age" {...register("age")} />
