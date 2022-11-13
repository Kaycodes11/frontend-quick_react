import { useForm, FormProvider, useFormContext } from "react-hook-form";

export default function App() {
  const methods = useForm();
  const onSubmit = (data: Record<string, any>) => console.log(data);

  return (
    <FormProvider {...methods}>
      {/* pass all methods into the context */}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <NestedInput />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

// specially form is quite nested then use FormProvider and useFormContext()
function NestedInput() {
  const { register } = useFormContext(); // retrieve all hook methods
  return <input {...register("test")} />;
}
