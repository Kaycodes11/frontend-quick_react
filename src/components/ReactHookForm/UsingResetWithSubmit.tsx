import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

export default function UsingResetWithSubmit() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues: { something: "anything" } });

  const onSubmit = (data: unknown) => {
    // It's recommended to reset in useEffect as execution order matters
    // reset({ ...data })
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ something: "" });
    }
  }, [formState, isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("something")} />
      <input type="submit" />
    </form>
  );
}
