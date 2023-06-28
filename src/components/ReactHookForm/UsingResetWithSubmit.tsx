import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export default function UsingResetWithSubmit() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues: { something: "anything" } });

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ something: "" });
    }
  }, [formState, isSubmitSuccessful, reset]);

  const onSubmit = (data: unknown) => {
    // It's recommended to reset in useEffect as execution order matters
    // reset({ ...data })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("something")} />
      <input type="submit" />
    </form>
  );
}

// interface for the Uncontrolled Form
interface UseFormInputs {
  firstName: string;
  lastName: string;
}

// Reset the Uncontrolled Form
export function UncontrolledForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UseFormInputs>();
  const onSubmit = (data: UseFormInputs) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First name</label>
      <input {...register("firstName", { required: true })} />

      <label>Last name</label>
      <input {...register("lastName")} />

      <input type="submit" />
      <input type="reset" value="Standard Reset Field Values" />
      <input type="button" onClick={() => reset()} value="Custom Reset Field Values & Errors" />
    </form>
  );
}


// interface for the controlled form
interface IFormInputs {
  firstName: string
  lastName: string
}

export function ControlledForm() {
  const { register, handleSubmit, reset, setValue, control } =
    useForm<IFormInputs>()
  const onSubmit = (data: IFormInputs) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => <TextField {...field} />}
        name="firstName"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        render={({ field }) => <TextField {...field} />}
        name="lastName"
        control={control}
        defaultValue=""
      />

      <input type="submit" />
      {/* @ts-ignore */}
      <input type="button" onClick={reset} />
      <input
        type="button"
        onClick={() => {
          reset({
            firstName: "bill",
            lastName: "luo",
          })
        }}
      />
    </form>
  )
}