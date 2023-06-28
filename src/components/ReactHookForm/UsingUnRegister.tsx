import React from "react";
import { useForm } from "react-hook-form";

interface IFormInputs {
  firstName: string;
  lastName?: string;
}

// if some field which is not needed or dynamically turned off, then that field's value still
// avaiable somehow at the form submisstion, to exclude that field's value - use "unregister"

export default function UsingUnRegister() {
  const { register, handleSubmit, watch, unregister } = useForm<IFormInputs>();
  const onSubmit = (data: IFormInputs) => console.log(data);

  const firstName = watch("firstName");

  // This could be isolate to a separate watch component
  React.useEffect(() => {
    if (!firstName) {
      unregister("lastName");
    }
  }, [firstName, register, unregister]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="firstName" />
      {firstName && <input {...register("lastName")} placeholder="lastName" />}
      <button type="button" onClick={() => unregister("lastName")}>
        unregister
      </button>
      <input type="submit" />
    </form>
  );
}
