import React from "react";

import { useStepperContext } from "../../contexts/StepperContext";

interface UserDetails {
  address?: string;
  city?: string;
}

const Details = () => {
  // Use the custom hook with the UserDetails type
  const { userData, setUserData } = useStepperContext<UserDetails>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    // Now TypeScript knows the structure of userData,
    // so it can infer that userData is of type UserDetails
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Address
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            name="address" // Ensure the name attribute matches the property in UserDetails
            value={userData.address || ""}
            placeholder="Address"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          City
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            name="city" // Ensure the name attribute matches the property in UserDetails
            value={userData.city || ""}
            placeholder="City"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
