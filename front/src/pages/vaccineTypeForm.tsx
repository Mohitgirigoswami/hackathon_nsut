import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type VaccineTypeFormData = {
  name: string;
  description?: string;
  manufacturer?: string;
  targetDisease: string;
  recommendedAgeMonths?: number;
  dosage?: string;
  schedule?: string;
  isActive: boolean;
};

interface VaccineTypeFormProps {
  onSubmit: (data: VaccineTypeFormData) => void;
  onClose: () => void;
}

const VaccineTypeForm: React.FC<VaccineTypeFormProps> = ({ onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VaccineTypeFormData>();

  const handleFormSubmit: SubmitHandler<VaccineTypeFormData> = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Vaccine Name
        </label>
        <input
          {...register("name", { required: "Vaccine name is required" })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter vaccine name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Description
        </label>
        <textarea
          {...register("description")}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter description (optional)"
          rows={3}
        />
      </div>

      {/* Manufacturer */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Manufacturer
        </label>
        <input
          {...register("manufacturer")}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter manufacturer (optional)"
        />
      </div>

      {/* Target Disease */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Target Disease
        </label>
        <input
          {...register("targetDisease", { required: "Target disease is required" })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter target disease"
        />
        {errors.targetDisease && (
          <p className="text-red-500 text-sm">{errors.targetDisease.message}</p>
        )}
      </div>

      {/* Recommended Age Months */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Recommended Age (Months)
        </label>
        <input
          type="number"
          {...register("recommendedAgeMonths", { valueAsNumber: true })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter recommended age in months (optional)"
        />
      </div>

      {/* Dosage */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Dosage
        </label>
        <input
          {...register("dosage")}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter dosage (optional)"
        />
      </div>

      {/* Schedule */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Schedule
        </label>
        <input
          {...register("schedule")}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter vaccination schedule (optional)"
        />
      </div>

      {/* Is Active */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register("isActive")}
            className="mr-2"
          />
          <span className="text-gray-700 font-medium">Is Active</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Vaccine Type
      </button>
    </form>
  );
};

export default VaccineTypeForm;