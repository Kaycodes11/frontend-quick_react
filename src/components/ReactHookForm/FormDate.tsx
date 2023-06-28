import React, { KeyboardEvent } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm, UseControllerProps, useController } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

type FormValues = {
  ReactDatepicker: string | any;
};

// working but need to practice ReactDatePicker libary
// Whenever using the custom input field , to get proper type on props, use the appropiate "type"
function UsingDatePicker(props: UseControllerProps<FormValues>) {
  const { field, fieldState, formState } = useController(props);

  return (
    <ReactDatePicker
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      showTimeSelect
    />
  );
}

//  form handling : date picker
export default function FormDate() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      ReactDatepicker: new Date(),
    },
  });

  return (
    <form onSubmit={handleSubmit((data: FormValues) => console.log(data))}>
      <UsingDatePicker control={control} name="ReactDatepicker" />
      <input type="submit" />
    </form>
  );
}
