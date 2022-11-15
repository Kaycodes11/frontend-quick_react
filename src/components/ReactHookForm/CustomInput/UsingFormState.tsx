import { useForm, useFormState } from "react-hook-form";

export default function UsingFormState() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      firstName: "firstName",
    },
  });
  // useFormState hook just helps to destructure from control
  const { dirtyFields } = useFormState({
    control,
  });
  const onSubmit = (data: {firstName: string}) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      {dirtyFields.firstName && <p>Field is dirty.</p>}

      <input type="submit" />
    </form>
  );
}
