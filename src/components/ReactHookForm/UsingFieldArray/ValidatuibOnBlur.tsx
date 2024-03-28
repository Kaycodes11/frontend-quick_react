import { useForm } from "react-hook-form";

interface FieldValues {
  firstName: string;
  lastName: string;
  email: string;
}

const ValidatuibOnBlur = () => {
  // onBlur runs validation on the field that's just touched
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    mode: "onBlur", // "onChange"
  });
  const onSubmit = (data: FieldValues) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            placeholder="bill"
            {...register("firstName", { required: true, maxLength: 2 })}
          />
          {errors.firstName && <p>This is required</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            placeholder="luo"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && <p>This is required</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email", { required: true })} />
          {errors.email && <p>This is required</p>}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default ValidatuibOnBlur;
