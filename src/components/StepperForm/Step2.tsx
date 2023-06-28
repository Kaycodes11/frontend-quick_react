import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FieldValues {
  age: number;
  yearsOfExp: string;
}

const Step2 = () => {
  const { register, handleSubmit } = useForm<FieldValues>();
  const navigate = useNavigate();
  // const { state, actions } = useStateMachine({ updateAction });
  const onSubit = (data: FieldValues) => {
    // actions.updateAction(data); state update from step2's data
    // navigate("./result");
  };

  return (
    <form onSubmit={handleSubmit(onSubit)}>
      <h2>Step 2</h2>
      <label>
        Age:
        <input {...register("age")} defaultValue={"10"} />
      </label>
      <label>
        Years of experience:
        <input {...register("yearsOfExp")} defaultValue={"1"} />
      </label>
      <input type="submit" />
    </form>
  );
};

export default Step2;
