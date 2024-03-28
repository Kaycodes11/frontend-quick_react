import React from "react";
import { IMaskInput } from "react-imask";

const ProductCodeInput: React.FC = () => {
  return (
    <div className="flex flex-col m-2 p-2">
      <label htmlFor="product-code">Product Code:</label>
      <IMaskInput
        id="product-code"
        mask="AA-00000-00"
        definitions={{
          A: {
            // Custom definition to only allow uppercase letters
            mask: /[A-Z]/,
          },
          "0": {
            // Custom definition to only allow digits
            mask: /[0-9]/,
            // validate: digit => /[0-9]/.test(digit)
          },

          // N: {
          //   mask: Number,
          //   scale: 2, // Allow two decimal places
          //   thousandsSeparator: ",", // Use comma as thousands separator
          // },
        }}
        placeholder="XX-12345-67"
      />

      {/* <IMaskInput
        id="product-code"
        mask="AA-00000-aa"
        definitions={{
          A: {
            // Definition to only allow uppercase letters
            mask: /[A-Z]/,
          },
          "0": {
            // Definition to only allow digits
            mask: /[0-9]/,
          },
          a: {
            // New definition for lowercase letters
            mask: /[a-z]/,
          },
        }}
        placeholder="XX-12345-xx"
      /> */}

      {/* <IMaskInput
        mask="00-AAA-aaa-999"
        definitions={{
          A: { mask: /[A-Z]/ }, // Uppercase letters
          a: { mask: /[a-z]/ }, // Lowercase letters
          9: { mask: /[0-9]/ }, // Digits
        }}
        placeholder="01-ABC-def-123"
        className="p-4 m-2"
      /> */}
    </div>
  );
};

export default ProductCodeInput;
