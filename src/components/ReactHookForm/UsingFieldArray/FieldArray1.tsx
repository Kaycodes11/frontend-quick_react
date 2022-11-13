import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";

type FormValues = {
  cart: {
    name: string | null;
    price: number | null;
    quantity: number | null;
  }[];
};

const Total = ({ control }: { control: Control<FormValues> }) => {
  // watching the cart field
  const formValues = useWatch({
    name: "cart",
    control,
  });

  console.log("formValues: ", formValues);

  const total = formValues.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );

  return <p>Total Amount: {total}</p>;
};

export default function FieldArray1() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ name: "", quantity: null, price: null }],
    },
    mode: "onBlur",
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: "cart",
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <input
                  placeholder="name"
                  {...register(`cart.${index}.name` as const, {
                    required: true,
                  })}
                  className={errors?.cart?.[index]?.name ? "error" : ""}
                />
                <input
                  placeholder="quantity"
                  type="number"
                  {...register(`cart.${index}.quantity` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={errors?.cart?.[index]?.quantity ? "error" : ""}
                />
                <input
                  placeholder="value"
                  type="number"
                  {...register(`cart.${index}.price` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={errors?.cart?.[index]?.price ? "error" : ""}
                />
                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          );
        })}

        <Total control={control} />

        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              quantity: 0,
              price: 0,
            })
          }
        >
          APPEND
        </button>
        <button
          type="button"
          onClick={() => prepend({ name: "", price: 1, quantity: 2 })}
        >
          PREPEND
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
