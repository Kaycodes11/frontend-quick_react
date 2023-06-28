import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface FieldValues {
  firstName: string;
  lastName: string;
}

const Step1 = () => {
  const { register, handleSubmit } = useForm<FieldValues>();
  //   const {actions, data} = useSomeState()
  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    // now here either use some context method or an action to update data within store
    // this way, the data could be "acessible on any step and updated from any step" as needed

    // actions.dispatch(data);
    navigate("/step2");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1</h2>
      <label>
        First Name:
        <input {...register("firstName")} defaultValue={""} />
      </label>

      <label>
        Last Name:
        <input {...register("lastName")} defaultValue={""} />
      </label>

      <input type="submit" />
    </form>
  );
};

export default Step1;
