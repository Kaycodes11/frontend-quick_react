import { useForm, useController, UseControllerProps } from "react-hook-form";

type FormValues = {
  FirstName: string;
};

// To make custom field/control like below use these two hooks rather than <Controller />
// This is also good to use for native input and when using with any libary
function Input(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props);

  return (
    <div>
      <input {...field} placeholder={props.name} />
      <p>{fieldState.isTouched && "Touched"}</p>
      <p>{fieldState.isDirty && "Dirty"}</p>
    </div>
  );
}

// here using "UseController" to make custom input
export default function UsingControl() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      FirstName: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => console.log(data);

  //   rather thant using <Controller /> here  Input will be using the hook i.e. UseController

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} name="FirstName" rules={{ required: true }} />
      <input type="submit" />
    </form>
  );
}
