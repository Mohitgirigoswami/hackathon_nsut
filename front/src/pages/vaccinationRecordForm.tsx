import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type VaccinationRecordFormData = {
  beneficiaryId: string;
  vaccineTypeId: string;
  vaccineBatchId?: string;
  administeredDate: string;
  administeredBy: string;
  doseNumber: number;
  nextDueDate?: string;
  sideEffects?: string;
  notes?: string;
  isCompleted: boolean;
};

interface VaccinationRecordFormProps {
  beneficiaries: { id: string; name: string }[];
  vaccineTypes: { id: string; name: string }[];
  vaccineBatches: { id: string; batchNumber: string }[];
  onSubmit: (data: VaccinationRecordFormData) => void;
  onClose: () => void;
}

const VaccinationRecordForm: React.FC<VaccinationRecordFormProps> = ({
  beneficiaries,
  vaccineTypes,
  vaccineBatches,
  onSubmit,
  onClose
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VaccinationRecordFormData>();

  const handleFormSubmit: SubmitHandler<VaccinationRecordFormData> = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Beneficiary */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Beneficiary
        </label>
        <select
          {...register("beneficiaryId", { required: "Beneficiary is required" })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Beneficiary</option>
          {beneficiaries.map((beneficiary) => (
            <option key={beneficiary.id} value={beneficiary.id}>
              {beneficiary.name}
            </option>
          ))}
        </select>
        {errors.beneficiaryId && (
          <p className="text-red-500 text-sm">{errors.beneficiaryId.message}</p>
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

      {/* Vaccine Batch */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Vaccine Batch
        </label>
        <select
          {...register("vaccineBatchId")}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Vaccine Batch (optional)</option>
          {vaccineBatches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.batchNumber}
            </option>
          ))}
        </select>
      </div>

      {/* Administered Date */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Administered Date
        </label>
        <input
          type="date"
          {...register("administeredDate", { required: "Administered date is required" })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.administeredDate && (
          <p className="text-red-500 text-sm">{errors.administeredDate.message}</p>
        )}
      </div>

      {/* Administered By */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Administered By
        </label>
        <input
          {...register("administeredBy", { required: "Administered by is required" })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter name of person who administered"
        />
        {errors.administeredBy && (
          <p className="text-red-500 text-sm">{errors.administeredBy.message}</p>
        )}
      </div>

      {/* Dose Number */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Dose Number
        </label>
        <input
          type="number"
          {...register("doseNumber", { required: "Dose number is required", valueAsNumber: true })}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter dose number"
        />
        {errors.doseNumber && (
          <p className="text-red-500 text-sm">{errors.doseNumber.message}</p>
        )}
      </div>

      {/* Next Due Date */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Next Due Date
        </label>
        <input
          type="date"
          {...register("nextDueDate")}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Side Effects */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Side Effects
        </label>
        <textarea
          {...register("sideEffects")}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter any side effects (optional)"
          rows={2}
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">
          Notes
        </label>
        <textarea
          {...register("notes")}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter additional notes (optional)"
          rows={2}
        />
      </div>

      {/* Is Completed */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register("isCompleted")}
            className="mr-2"
          />
          <span className="text-gray-700 font-medium">Is Completed</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Vaccination Record
      </button>
    </form>
  );
};

export default VaccinationRecordForm;