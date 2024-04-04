// @ts-nocheck
import React from "react";
import MaskedInput from "react-input-mask";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

// Define the shape of the form's data
interface IFormInput {
  ControlledMaskedInput: string;
}

// Helper functions with explicit return types
export const clearTel = (tel: string): string => tel.replace(/[^0-9]/g, "");

const isNotFilledTel = (v: string): string | undefined => {
  const clearedTel = clearTel(v);
  return clearedTel.length < 11 ? "Phone number is required." : undefined;
};

interface CustomMaskedInputProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const CustomMaskedInput: React.FC<CustomMaskedInputProps> = ({ value, onChange, name }) => {
  return (
    <MaskedInput
      mask="+7 (999) 999-99-99"
      maskPlaceholder="_"
      alwaysShowMask
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      }}
      name={name}
      type="text"
      autoComplete="tel-national"
    />
  );
};

export default function InputMasking() {
  const { handleSubmit, formState: { errors }, control} = useForm<IFormInput>({
    reValidateMode: "onSubmit",
    defaultValues: { ControlledMaskedInput: "7"},
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("submit", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          render={({ field }) => <CustomMaskedInput {...field} />}
          rules={{
            validate: {
              inputTelRequired: isNotFilledTel,
            },
          }}
          name="ControlledMaskedInput"
          control={control}
        />

        {errors.ControlledMaskedInput && (
          <p>{errors.ControlledMaskedInput.message}</p>
        )}
      </div>
      <input type="submit" />
    </form>
  );
}
