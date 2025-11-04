import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type VaccineBatchFormData = {
  batchNumber: string;
  vaccineTypeId: string;
  manufacturer: string;
  expiryDate: string;
  quantityReceived: number;
  storageTemperature?: number;
};

interface VaccineBatchFormProps {
  vaccineTypes: { id: string; name: string }[];
  onSubmit: (data: VaccineBatchFormData) => void;
  onClose: () => void;
}

const VaccineBatchForm: React.FC<VaccineBatchFormProps> = ({ vaccineTypes, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VaccineBatchFormData>();

  const handleFormSubmit: SubmitHandler<VaccineBatchFormData> = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Batch Number */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Batch Number
        </label>
        <input
          {...register("batchNumber", { required: "Batch number is required" })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter batch number"
        />
        {errors.batchNumber && (
          <p className="text-red-500 text-sm">{errors.batchNumber.message}</p>
        )}
      </div>

      {/* Vaccine Type */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Vaccine Type
        </label>
        <select
          {...register("vaccineTypeId", { required: "Vaccine type is required" })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Vaccine Type</option>
          {vaccineTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        {errors.vaccineTypeId && (
          <p className="text-red-500 text-sm">{errors.vaccineTypeId.message}</p>
        )}
      </div>

      {/* Manufacturer */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Manufacturer
        </label>
        <input
          {...register("manufacturer", { required: "Manufacturer is required" })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter manufacturer"
        />
        {errors.manufacturer && (
          <p className="text-red-500 text-sm">{errors.manufacturer.message}</p>
        )}
      </div>

      {/* Expiry Date */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Expiry Date
        </label>
        <input
          type="date"
          {...register("expiryDate", { required: "Expiry date is required" })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.expiryDate && (
          <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>
        )}
      </div>

      {/* Quantity Received */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Quantity Received
        </label>
        <input
          type="number"
          {...register("quantityReceived", { required: "Quantity received is required", valueAsNumber: true })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter quantity received"
        />
        {errors.quantityReceived && (
          <p className="text-red-500 text-sm">{errors.quantityReceived.message}</p>
        )}
      </div>

      {/* Storage Temperature */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Storage Temperature (°C)
        </label>
        <input
          type="number"
          step="0.1"
          {...register("storageTemperature", { valueAsNumber: true })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter storage temperature (optional)"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Vaccine Batch
      </button>
    </form>
  );
};

export default VaccineBatchForm;