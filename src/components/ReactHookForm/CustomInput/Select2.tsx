import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IFormValues } from "./Form";

// you can use React.forwardRef to pass the ref too
const Select2 = React.forwardRef<
  HTMLSelectElement,
  { labelo: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, name, labelo }, ref) => (
  <>
    <label>{labelo}</label>
    <select name={name} ref={ref} onChange={onChange}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
));

export default Select2;

// <Select2 label="age" {...register("age")} />
