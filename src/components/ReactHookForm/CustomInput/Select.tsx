import React from "react";

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { allOptions: Option[] };

// custom select = here props will have only default props of <select /> property along with Option
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ allOptions, ...props }, ref) => {
  return (
    <select ref={ref} {...props}>
      {allOptions.map(({ label, value }) => (
        <option key={Math.random().toString(32).substring(2, 9)} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});

export default Select;

// <Select {...register("sex")} options={options} />
