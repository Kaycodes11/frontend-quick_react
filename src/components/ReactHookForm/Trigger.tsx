import { useForm } from "react-hook-form";

type FormInputs = {
  firstName: string;
  lastName: string;
};

// Manually triggers form or input validation. This method is also useful when you have
// dependant validation (input validation depends on another input's value).

export default function Trigger() {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<FormInputs>();

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
      <button
        type="button"
        onClick={() => {
          trigger("lastName");
        }}
      >
        Trigger
      </button>
      <button
        type="button"
        onClick={() => {
          trigger(["firstName", "lastName"]);
        }}
      >
        Trigger Multiple
      </button>
      <button
        type="button"
        onClick={() => {
          trigger();
        }}
      >
        Trigger All
      </button>
    </form>
  );
}
