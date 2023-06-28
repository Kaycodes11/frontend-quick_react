import React from "react";
import {
  Control,
  FieldValues,
  UseControllerProps,
  useForm,
  UseFormSetValue,
  UseFormWatch,
  useWatch,
} from "react-hook-form";

type SchoolLevel = "elementary" | "middle" | "high" | "university" | string;
interface FormValues {
  school: SchoolLevel;
  ageGroup: string;
}

function getAgeGroup(school: FormValues["school"]) {
  switch (school) {
    case "elementary":
      return "2 - 6";
    case "middle":
      return "6 - 12";
    case "high":
      return "12 - 18";
    case "university":
      return "18 - 24";

    default:
      return "";
  }
}

type AgeGroupProps<TFormValues extends FieldValues = FormValues> = {
  control: Control<FormValues>;
  getFieldValues: UseFormWatch<TFormValues>;
  setFieldValue: UseFormSetValue<TFormValues>;
  others?: UseControllerProps<TFormValues>;
};

function WatchAgeGroup({ control, getFieldValues, setFieldValue, others }: AgeGroupProps) {
  // const { register, unregister, getFieldState } = control;
  const { school } = getFieldValues();
  console.log("school: ", school);

  React.useEffect(() => {
    setFieldValue("ageGroup", getAgeGroup(school));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!school) {
      const ageGroup = getAgeGroup(school);
      console.log("ageGroup", ageGroup);
      setFieldValue("ageGroup", ageGroup);
    }
  }, [school, setFieldValue]);

  const ageGrp = useWatch({
    control,
    name: "ageGroup",
    defaultValue: getAgeGroup(school),
  });

  // if needed onchange may be added like this {...control.register("ageGroup", {onChange: handleChange})}
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("onchange", e.target.value);
    const age = getAgeGroup(e.target.value);
  };

  return (
    <>
      <input
        style={{ display: "block", marginTop: "1rem" }}
        placeholder="ageGroup"
        {...control.register("ageGroup")}
      />
      <p>Watch: {ageGrp}</p>
    </>
  );
}

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

// {...register("FieldName")} is basically the ref so get all the default props for the element it'll be used for, here i.e. SelectElement
// does it have anything else otherProps other than {...register("FieldName")} then add
type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: Option[]; someNewProp?: boolean; hidden?: boolean | string | undefined };

// [NOTE]: here overwritten native "hidden" property; it's allowed if keeping its og type boolean | undefined -> then I can add extra type but og types must be kept else ts error
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ options, ...props }, ref) => {
  // console.log(props.someNewProp, props.hidden);
  return (
    <select ref={ref} {...props}>
      {options.map(({ label, value }) => (
        <option key={Math.random().toString(32).substring(2, 9)} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});

export default function DependantField() {
  const { control, getValues, register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      school: "elementary",
    },
  });

  // this will be watching for any value changes on "school field"
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const ageGrp = getAgeGroup(e.target.value);
    setValue("ageGroup", ageGrp, { shouldValidate: true });
  };

  const onSubmit = (data: FormValues) => console.log(data);

  // whenever value changed on "school field" -> age's value will be updated programtically
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        {...register("school", { onChange: handleChange })}
        options={[
          { label: "elementary", value: "elementary" },
          { label: "middle", value: "middle" },
          { label: "high", value: "high" },
          { label: "university", value: "university" },
        ]}
      />
      {/* <input
        {...register("ageGroup")}
        placeholder="ageGroup"
        style={{ marginTop: ".5rem", display: "block" }}
      /> */}
      <WatchAgeGroup control={control} getFieldValues={getValues} setFieldValue={setValue} />
      <input type="submit" style={{ marginTop: ".5rem", display: "block" }} />
    </form>
  );
}
