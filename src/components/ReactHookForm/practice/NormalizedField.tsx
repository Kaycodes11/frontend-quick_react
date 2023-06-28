import { useController, Field, UseControllerProps, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const defaultValues = {
  priceInCents: 1234567,
  muiPriceInCents: 1234567,
};

interface FormValues {
  priceInCents: number | string;
  muiPriceInCents: number | string;
}

// Here, UseControllerProps type takes FormValues (or FieldValues) for MaskedInput's props type
// since props.field.ref thus MaskedInput expects a forwardRef which is why it's having this issue
function MaskedInput(props: UseControllerProps<FormValues>) {
  const { field, fieldState, formState } = useController(props);
  const { value, onChange, ...rest } = field;
  return (
    <NumericFormat
      {...rest}
      value={value}
      thousandSeparator={true}
      decimalScale={2}
      onValueChange={(target: any) => {
        if (target.floatValue) onChange(target.floatValue);
      }}
      prefix="$ "
    />
  );
}

export default function NormalizedField() {
  const { control, reset, watch } = useForm<FormValues>({
    mode: "onChange",
    defaultValues,
  });
  return (
    <form>
      <label style={{ display: "block" }} htmlFor="muiPriceInCents">
        MuiPriceInCents
      </label>
      <MaskedInput control={control} name="muiPriceInCents"  />
      <input type="submit" style={{ marginLeft: "0.4rem" }} />
      <input
        style={{ display: "block", marginTop: 20 }}
        type="button"
        onClick={() => reset(defaultValues)}
        value="Custom Reset"
      />
      <pre style={{ color: "#fff", marginTop: 24 }}>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
}
