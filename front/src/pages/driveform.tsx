import React from "react";
import { useForm,type SubmitHandler } from "react-hook-form";

type DriveFormData = {
  state: string;
  district: string;
  villageName: string;
  driveName: string;
  organisation: string;
  ageGroup: string;
  addressLine1: string;
  addressLine2: string;
};

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];


const DriveForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DriveFormData>();

  // Handle form submission
  const onSubmit: SubmitHandler<DriveFormData> = (data) => {
    console.log("Form Submitted ", data);
    reset();
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Vaccination Drive Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* State Name */}
      <div>
  <label className="block text-gray-700 mb-1 font-medium">
    State Name
  </label>
  <select
    {...register("state", { required: "State is required" })}
    className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select State</option>
    {indianStates.map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>
  {errors.state && (
    <p className="text-red-500 text-sm">{errors.state.message}</p>
  )}
</div>


        {/* District Name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            District Name
          </label>
          <input
            {...register("district", { required: "District name is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter district name"
          />
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district.message}</p>
          )}
        </div>

        {/* Village Name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Village Name
          </label>
          <input
            {...register("villageName", { required: "Village Name is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter village Name"
          />
          {errors.villageName && (
            <p className="text-red-500 text-sm">{errors.villageName.message}</p>
          )}
        </div>

        {/* Drive Name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Drive Name
          </label>
          <input
            {...register("driveName", { required: "Drive name is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter drive name"
          />
          {errors.driveName && (
            <p className="text-red-500 text-sm">{errors.driveName.message}</p>
          )}
        </div>

        {/* Organisation Name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Organisation Name
          </label>
          <input
            {...register("organisation", {
              required: "Organisation name is required",
            })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter organisation name"
          />
          {errors.organisation && (
            <p className="text-red-500 text-sm">{errors.organisation.message}</p>
          )}
        </div>

        {/* Age Group */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Age Group to be Vaccinated
          </label>
          <select
            {...register("ageGroup", { required: "Please select an age group" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select age group</option>
            <option value="0-5">0–5 years</option>
            <option value="6-17">6–17 years</option>
            <option value="18-44">18–44 years</option>
            <option value="45+">45+ years</option>
          </select>
          {errors.ageGroup && (
            <p className="text-red-500 text-sm">{errors.ageGroup.message}</p>
          )}
        </div>

        {/* Address Line 1 */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Address Line 1
          </label>
          <input
            {...register("addressLine1", {
              required: "Address line 1 is required",
            })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address line 1"
          />
          {errors.addressLine1 && (
            <p className="text-red-500 text-sm">
              {errors.addressLine1.message}
            </p>
          )}
        </div>

        {/* Address Line 2 */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Address Line 2
          </label>
          <input
            {...register("addressLine2")}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address line 2 (optional)"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Drive
        </button>
      </form>
    </div>
  );
};

export default DriveForm;
