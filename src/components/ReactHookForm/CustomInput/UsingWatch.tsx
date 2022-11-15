import { useForm, useWatch, Control } from "react-hook-form";

interface FormInputs {
  firstName: string;
  lastName: string;
}

function FirstNameWatched({ control }: { control: Control<FormInputs> }) {
  const firstName = useWatch({
    control,
    name: "firstName", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: "default", // default value before the render
  });
  const rendercount = 1;
  console.log("rendering", rendercount + 1);

  // this component will only re-render when when firstName changes
  return <p>Watch: {firstName}</p>;
}

export default function UsingWatch() {
  const { register, control, handleSubmit } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  console.log("RENDER");
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label>First Name:</label>
      <input {...register("firstName")} placeholder="FirstName" />
      <label>Last Name:</label>
      <input {...register("lastName")} placeholder="LastName" />
      <input type="submit" style={{ marginTop: "0.5rem" }} />

      <FirstNameWatched control={control} />
    </form>
  );
}
