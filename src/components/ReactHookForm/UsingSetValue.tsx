import { useForm } from "react-hook-form";

// working
export default function UsingSetValue() {
  const { register, setValue, handleSubmit } = useForm();
  const onSubmit = (data: unknown) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      <button onClick={() => setValue("firstName", "Bill")}>setValue</button>
      <button
        onClick={() =>
          setValue("firstName", "Luo", {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
      >
        setValue options
      </button>
    </form>
  );
}
