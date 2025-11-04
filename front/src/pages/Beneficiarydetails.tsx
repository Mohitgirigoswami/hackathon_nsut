import React from "react";
import { useForm,type SubmitHandler } from "react-hook-form";

type BeneficiaryFormData = {
  name: string;
  age: number;
  address: string;
  contact: string;
  doseNumber: string;
};

const BeneficiaryDetails: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BeneficiaryFormData>();

  const onSubmit: SubmitHandler<BeneficiaryFormData> = (data) => {
    console.log("Beneficiary Details Submitted", data);
    reset();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Beneficiary Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter beneficiary name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Age</label>
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              min: { value: 0, message: "Age must be positive" },
            })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter age"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Address</label>
          <input
            {...register("address", { required: "Address is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        {/* Contact */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Contact Number</label>
          <input
            type="tel"
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter contact number"
          />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
        </div>

        {/* Dose Number */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Dose Number</label>
          <input
            {...register("doseNumber", { required: "Dose number is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter dose number (e.g., 1st, 2nd, Booster)"
          />
          {errors.doseNumber && <p className="text-red-500 text-sm">{errors.doseNumber.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BeneficiaryDetails;
