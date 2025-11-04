import type { StringToBoolean } from "class-variance-authority/types";
import React from "react";
import { useForm,type SubmitHandler } from "react-hook-form";

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


// Define TypeScript type for all form fields
type DriveFormData = {
  state: string;
  district: string;
  VillageName: string;
  Pincode : String;
  population : String;
  total_adult : String;
  total_child : String;
  Longitude : String;
  Latitude : String; 
};

const VillageForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DriveFormData>();

  // Handle form submission
  const onSubmit: SubmitHandler<DriveFormData> = (data) => {
    console.log("Form Submitted", data);
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

        {/* VillageName */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            VillageName
          </label>
          <input
            {...register("VillageName", { required: "VillageName is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter VillageName"
          />
          {errors.VillageName && (
            <p className="text-red-500 text-sm">{errors.VillageName.message}</p>
          )}
        </div>
          {/* Pincode */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Pincode
          </label>
          <input
            {...register("Pincode", { required: "Pincode is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Pincode"
          />
          {errors.Pincode && (
            <p className="text-red-500 text-sm">{errors.Pincode.message}</p>
          )}
        </div>
          {/* Population */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            population
          </label>
          <input
            {...register("population", { required: "population is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter population"
          />
          {errors.population && (
            <p className="text-red-500 text-sm">{errors.population.message}</p>
          )}
        </div>
          {/* total_adult */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            total_adult
          </label>
          <input
            {...register("total_adult", { required: "population is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter total_adult"
          />
          {errors.total_adult && (
            <p className="text-red-500 text-sm">{errors.total_adult.message}</p>
          )}
        </div>
          {/* total_child */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            total_child
          </label>
          <input
            {...register("total_child", { required: "population is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter total_child"
          />
          {errors.total_child && (
            <p className="text-red-500 text-sm">{errors.total_child.message}</p>
          )}
        </div>
          {/* Longitude */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Longitude
          </label>
          <input
            {...register("Longitude", { required: "population is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Longitude"
          />
          {errors.Longitude && (
            <p className="text-red-500 text-sm">{errors.Longitude.message}</p>
          )}
        </div>
          {/* Latitude */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Latitude
          </label>
          <input
            {...register("Latitude", { required: "population is required" })}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Latitude"
          />
          {errors.Latitude && (
            <p className="text-red-500 text-sm">{errors.Latitude.message}</p>
          )}
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

export default VillageForm;
