import { useForm, Control, SubmitHandler, Controller, useWatch, Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./form.css";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: !values.firstName ? {} : values,
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

const SignupSchema = yup.object().shape({
  firstName: yup.string().trim().required().min(2).max(10),
  lastName: yup.string().trim().required().min(2).max(10),
  email: yup.string().trim().required().email(),
});

// this could be helpful for debugging / watching all form controls or specific controls
function FirstNameChanged({ control }: { control: Control<FormValues> }) {
  // without supplying name property; will watch entire form, or ['firstName', 'lastName'] to watch both
  const firstName = useWatch<FormValues>({
    control,
    name: "firstName",
    defaultValue: "",
  });
  // only re-render when firstName changes
  return <p>Watch: {firstName}</p>;
}

export default function Form() {
  const initialValues: FormValues = { firstName: "", lastName: "", email: "" };
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  // with hook form most likely either use validation like below or resolver
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="Bill" />
      {isDirty && errors?.firstName && <p>{errors.firstName.message}</p>}

      <Controller
        render={({ field }) => {
          return <input type={"text"} {...field} placeholder={"Luo"} />;
        }}
        name="lastName"
        control={control}
        defaultValue=""
      />
      {isDirty && errors?.lastName && <p>{errors.lastName.message}</p>}

      {/* <IsolateReRender control={control} />  */}

      <input type="email" {...register("email")} placeholder="john@gmail.com" />

      <input type="submit" />
      {/* for some reason if needed to wach all / specific form cotrols */}
      <FirstNameChanged control={control} />

      {/* when valid input given to specified form control then do something manually using this */}
      <button
        type="button"
        onClick={async () => {
          const result = await trigger(["firstName", "lastName"]);
          if (result) {
            console.log("Valid input");
          }
        }}
      >
        Trigger
      </button>
    </form>
  );
}
