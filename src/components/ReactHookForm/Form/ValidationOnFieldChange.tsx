import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";

enum GenderEnum {
  female = "female",
  male = "male",
  others = "others",
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  isDeveloper: boolean;
  mobileNumber: string;
  title: string;
  gender: GenderEnum;
  developer: string;
  isArtist: boolean;
};

const SignupSchema = yup.object().shape({
  firstName: yup.string().required().min(2).max(20),
  lastName: yup.string().required().min(2).max(20),
  email: yup.string().email(),
  mobileNumber: yup.string().required().min(10).max(10),
  title: yup.string().trim().required().min(2).max(10),
});

export default function ValidationOnFieldChange() {
  // to do field level validation when touched / dirty then use the mode "onChange"/ "onBlur"
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(SignupSchema),
    mode: "onChange",
  });

  // show which form control are dirty?
  const { dirtyFields, touchedFields } = useFormState({ control });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            placeholder="bill"
            {...register("firstName", { required: true })}
          />
          {dirtyFields.firstName && (
            <p>{touchedFields.firstName} Field is dirty.</p>
          )}
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            placeholder="luo"
            {...register("lastName", { required: true })}
          />
          ErrorMessage: <ErrorMessage errors={errors} name="lastName" />
          {/* ErrorMessage: <ErrorMessage errors={errors} name="lastName" as={"h1"} /> */}
          {/* <ErrorMessage
            errors={errors}
            name="lastName"
            render={({ message }) => <p>{message}</p>}
          /> */}
          {errors.lastName && <p role="alert">{errors.lastName.message}</p>}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email
          </label>
          <input {...register("email", { required: true })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div style={{ display: "flex" }}>
          <label>Is developer?</label>
          <input
            style={{ transform: "translateY(8px)" }}
            type="checkbox"
            {...register("isDeveloper")}
          />
        </div>

        <div>
          <label>Mobile number</label>
          <input type="tel" {...register("mobileNumber")} />
        </div>

        <div>
          <label>Title</label>
          <select {...register("title")}>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
          </select>
        </div>

        <div>
          <label>Gender</label>
          <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </div>

        <button
          style={{ marginRight: "4px" }}
          type="button"
          onClick={() => {
            setValue("firstName", "Set value by action");
            setValue("isDeveloper", true);
          }}
        >
          Set All Values
        </button>

        <div>
          <label>Are you a developer?</label>
          <input type="radio" value="Yes" {...register("developer")} />
          <input type="radio" value="No" {...register("developer")} />
        </div>

        <div>
          <label>Is developer?</label>
          <input type="checkbox" {...register("isArtist")} />
        </div>

        {/* <pre>{JSON.stringify(formState, null, 2)}</pre> */}

        <button type="submit">Submit</button>

        <input
          style={{ marginTop: ".2rem" }}
          type="button"
          onClick={() => {
            reset();
          }}
          value="custom value clear and errors"
        />

        <button
          style={{ marginTop: ".2rem" }}
          onClick={() => {
            reset((formValues) => ({
              ...formValues,
              lastName: "test",
            }));
          }}
        >
          Reset partial
        </button>
      </form>

      {/* to submit outside the form, use handleSumit like below */}
      <button type="button" onClick={handleSubmit(onSubmit)}>
        submit button outside of form
      </button>
    </>
  );
}
