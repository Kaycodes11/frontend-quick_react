import { useForm } from "react-hook-form";

export default function FieldState() {
  const {
    register,
    getFieldState,
    getValues,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
    },
  });

  // to get the specific field state , use this getFieldState hook as below
  // you can invoke before render or within the render function
  const fieldState = getFieldState("firstName");

  //   similary to get value of specific field or whole form then
  const values = getValues(); // whole form
  const { firstName } = getValues(); // const firstName = getValues("firstName");
//   const fullName = getValues(['firstName', 'lastName']); // ["John", "Johnson"]

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <p>{getFieldState("firstName").isDirty && "dirty"}</p>
      <p>{getFieldState("firstName").isTouched && "touched"}</p>
      <button
        type="button"
        onClick={() => console.log(getFieldState("firstName"))}
      >
        field state
      </button>
    </form>
  );
}
