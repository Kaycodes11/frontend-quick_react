import React from "react";
import ProductCodeInput from "./ProductCodeInput";
import { IMaskInput } from "react-imask";

const Masking: React.FC = () => {
  const inputRef = React.useRef<any | null>(null);

  const handleAccept = (value: string) => {
    console.log("Accepted value (unmasked):", value);
    // Additional manipulations and logging can be done here
  };

  return (
    <div className="flex flex-col items-center my-10">
      <IMaskInput
        mask="00000-00000" // Mask pattern for numeric input and dash
        definitions={{
          "0": /[0-9]/, // Define '0' to accept any digit from 0 to 9
        }}
        value=""
        unmask={true} // Get the unmasked (raw) value in onAccept
        inputRef={inputRef} // To access nested input
        onAccept={(value: string, mask) => handleAccept(value)}
        placeholder="Enter Number"
        className="py-2 mb-4"
      />

      <ProductCodeInput />
    </div>
  );
};

export default Masking;
