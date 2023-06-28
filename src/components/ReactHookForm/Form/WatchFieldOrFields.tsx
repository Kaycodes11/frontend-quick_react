import { useForm, useWatch, Control } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
};

// https://codesandbox.io/s/react-hook-form-control-forked-giq0e
function IsolateReRender({ control }: { control: Control<FormValues> }) {
  const firstName = useWatch({
    control,
    name: "firstName",
    defaultValue: "default",
  });

  return <div>{firstName}</div>;
}

export default function WatchFieldOrFields() {
  const { register, control, handleSubmit } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => alert(JSON.stringify(data)));

  return (
    <div className="App">
      {/* <h1>React Hook Form - Control</h1> */}
      <form onSubmit={onSubmit}>
        <div>
          <label>First Name</label>
          <input {...register("firstName")} />
        </div>
        <div>
          <label>Last Name</label>
          <input {...register("lastName")} />
        </div>

        {/* for some reason if needed to wach all / specific form cotrols */}
        <IsolateReRender control={control} />

        <input type="submit" />
      </form>
    </div>
  );
}
