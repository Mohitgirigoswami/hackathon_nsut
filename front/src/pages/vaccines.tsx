import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VaccineTypeForm from "./vaccineTypeForm";
import VaccineBatchForm from "./vaccineBatchForm";
import VaccinationRecordForm from "./vaccinationRecordForm";

interface VaccineType {
  id: string;
  name: string;
  description?: string;
  manufacturer?: string;
  targetDisease: string;
  recommendedAgeMonths?: number;
  dosage?: string;
  schedule?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface VaccineBatch {
  id: string;
  batchNumber: string;
  vaccineTypeId: string;
  manufacturer: string;
  expiryDate: string;
  quantityReceived: number;
  quantityUsed: number;
  storageTemperature?: number;
  createdAt: string;
  updatedAt: string;
}

interface VaccinationRecord {
  id: string;
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
  createdAt: string;
  updatedAt: string;
}

interface Beneficiary {
  id: string;
  name: string;
  // Add other fields as needed
}

export default function Vaccines() {
  const [types, setTypes] = useState<VaccineType[]>([]);
  const [batches, setBatches] = useState<VaccineBatch[]>([]);
  const [records, setRecords] = useState<VaccinationRecord[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeDialogOpen, setTypeDialogOpen] = useState(false);
  const [batchDialogOpen, setBatchDialogOpen] = useState(false);
  const [recordDialogOpen, setRecordDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesRes, batchesRes, recordsRes, beneficiariesRes] = await Promise.all([
          fetch("http://localhost:3000/api/vaccine/types"),
          fetch("http://localhost:3000/api/vaccine/batches"),
          fetch("http://localhost:3000/api/vaccine/records"),
          fetch("http://localhost:3000/api/beneficiaries"),
        ]);

        if (!typesRes.ok || !batchesRes.ok || !recordsRes.ok || !beneficiariesRes.ok) {
          throw new Error("Failed to fetch vaccine data");
        }

        const [typesData, batchesData, recordsData, beneficiariesData] = await Promise.all([
          typesRes.json(),
          batchesRes.json(),
          recordsRes.json(),
          beneficiariesRes.json(),
        ]);

        setTypes(typesData);
        setBatches(batchesData);
        setRecords(recordsData);
        setBeneficiaries(beneficiariesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddVaccineType = async (data: Omit<VaccineType, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch("http://localhost:3000/api/vaccine/types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Refresh data
        const res = await fetch("http://localhost:3000/api/vaccine/types");
        const typesData = await res.json();
        setTypes(typesData);
      }
    } catch (err) {
      console.error("Failed to add vaccine type", err);
    }
  };

  const handleAddVaccineBatch = async (data: Omit<VaccineBatch, 'id' | 'quantityUsed' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch("http://localhost:3000/api/vaccine/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Refresh data
        const res = await fetch("http://localhost:3000/api/vaccine/batches");
        const batchesData = await res.json();
        setBatches(batchesData);
      }
    } catch (err) {
      console.error("Failed to add vaccine batch", err);
    }
  };

  const handleAddVaccinationRecord = async (data: Omit<VaccinationRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch("http://localhost:3000/api/vaccine/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Refresh data
        const res = await fetch("http://localhost:3000/api/vaccine/records");
        const recordsData = await res.json();
        setRecords(recordsData);
      }
    } catch (err) {
      console.error("Failed to add vaccination record", err);
    }
  };

  if (loading) {
    return <div className="p-4">Loading vaccines...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vaccines</h1>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Vaccine Types</h2>
          <Dialog open={typeDialogOpen} onOpenChange={setTypeDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Vaccine Type</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Vaccine Type</DialogTitle>
              </DialogHeader>
              <VaccineTypeForm
                onSubmit={handleAddVaccineType}
                onClose={() => setTypeDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Target Disease</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Recommended Age (Months)</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.map((type) => (
              <TableRow key={type.id}>
                <TableCell>{type.name}</TableCell>
                <TableCell>{type.targetDisease}</TableCell>
                <TableCell>{type.manufacturer || "-"}</TableCell>
                <TableCell>{type.recommendedAgeMonths || "-"}</TableCell>
                <TableCell>{type.dosage || "-"}</TableCell>
                <TableCell>{type.isActive ? "Yes" : "No"}</TableCell>
                <TableCell>{new Date(type.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Vaccine Batches</h2>
          <Dialog open={batchDialogOpen} onOpenChange={setBatchDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Vaccine Batch</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Vaccine Batch</DialogTitle>
              </DialogHeader>
              <VaccineBatchForm
                vaccineTypes={types.map(t => ({ id: t.id, name: t.name }))}
                onSubmit={handleAddVaccineBatch}
                onClose={() => setBatchDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch Number</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Quantity Received</TableHead>
              <TableHead>Quantity Used</TableHead>
              <TableHead>Storage Temp (°C)</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell>{batch.batchNumber}</TableCell>
                <TableCell>{batch.manufacturer}</TableCell>
                <TableCell>{new Date(batch.expiryDate).toLocaleDateString()}</TableCell>
                <TableCell>{batch.quantityReceived}</TableCell>
                <TableCell>{batch.quantityUsed}</TableCell>
                <TableCell>{batch.storageTemperature || "-"}</TableCell>
                <TableCell>{new Date(batch.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Vaccination Records</h2>
          <Dialog open={recordDialogOpen} onOpenChange={setRecordDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Vaccination Record</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Vaccination Record</DialogTitle>
              </DialogHeader>
              <VaccinationRecordForm
                beneficiaries={beneficiaries.map(b => ({ id: b.id, name: b.name }))}
                vaccineTypes={types.map(t => ({ id: t.id, name: t.name }))}
                vaccineBatches={batches.map(b => ({ id: b.id, batchNumber: b.batchNumber }))}
                onSubmit={handleAddVaccinationRecord}
                onClose={() => setRecordDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Beneficiary ID</TableHead>
              <TableHead>Vaccine Type ID</TableHead>
              <TableHead>Batch ID</TableHead>
              <TableHead>Administered Date</TableHead>
              <TableHead>Administered By</TableHead>
              <TableHead>Dose Number</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.beneficiaryId}</TableCell>
                <TableCell>{record.vaccineTypeId}</TableCell>
                <TableCell>{record.vaccineBatchId || "-"}</TableCell>
                <TableCell>{new Date(record.administeredDate).toLocaleDateString()}</TableCell>
                <TableCell>{record.administeredBy}</TableCell>
                <TableCell>{record.doseNumber}</TableCell>
                <TableCell>{record.isCompleted ? "Yes" : "No"}</TableCell>
                <TableCell>{new Date(record.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}