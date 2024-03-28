import React from "react";
import { IMaskInput } from "react-imask";

const CurrencyInput = () => {
  return (
    <IMaskInput
      mask="$num"
      blocks={{
        num: {
          mask: Number,
          scale: 2, // Allow two decimal places
          thousandsSeparator: ",",
        },
      }}
      placeholder="$1,234.56"
    />
  );
};

export default CurrencyInput;
