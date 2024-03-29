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

// 25 + 14 = 40 Lakh

// 18 + 14 = 32 Lakh

// NPS : 200000 (150000 + 50000)

// 80C -> 1,50,000 + (Health insurance + NPS)

// 24B: 216000 (18000 / m) EMI

// Tax = 200000 + 150000 + 50000  + 50000 = 4,50,000 RS , 60,000 Rs

// EMI -> Rent + HI + NPS = (216000 - 1, 20, 000 ) = 96000  = 50000 H + 50000  NPS

// 80c = NPS (1, 50, 000 INR)

// 24b = ?

// Tax = 95,000 INR
