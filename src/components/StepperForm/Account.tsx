import React from "react";
import StepperContext from "../../contexts/StepperContext";

const Account = () => {
  // useContext might return null, so handle that case
  const context = React.useContext(StepperContext);

  if (!context) {
    // Handle the case where context is null, e.g., by returning null or a placeholder
    return <div>Context not available</div>;
  }

  // Now that we've checked context is not null, we can safely destructure it
  const { userData, setUserData } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {" "}
          username
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["userName"] || ""}
            name="userName"
            placeholder="username"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {" "}
          password
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["password"] || ""}
            name="password"
            placeholder="password"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            type="password"
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
