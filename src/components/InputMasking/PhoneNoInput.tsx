import React from "react";
import { IMaskInput } from "react-imask";

const PhoneNumberInput = () => {
  return <IMaskInput mask="00000-00000" placeholder="12345-67890" />;
};

export default PhoneNumberInput;
