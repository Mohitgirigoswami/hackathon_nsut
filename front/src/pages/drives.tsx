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

interface Drive {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  targetVillages?: string[];
  targetVaccineTypes?: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function Drives() {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/drives");
        if (!response.ok) {
          throw new Error("Failed to fetch drives");
        }
        const data = await response.json();
        setDrives(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDrives();
  }, []);

  if (loading) {
    return <div className="p-4">Loading drives...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Drives</h1>
        <Button onClick={() => window.location.href = '/add-drive'}>
          Add New Drive
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Target Villages</TableHead>
            <TableHead>Target Vaccine Types</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drives.map((drive) => (
            <TableRow key={drive.id}>
              <TableCell>{drive.name}</TableCell>
              <TableCell>{drive.description || "-"}</TableCell>
              <TableCell>{new Date(drive.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{drive.endDate ? new Date(drive.endDate).toLocaleDateString() : "-"}</TableCell>
              <TableCell>{drive.status}</TableCell>
              <TableCell>{drive.targetVillages?.length || 0}</TableCell>
              <TableCell>{drive.targetVaccineTypes?.length || 0}</TableCell>
              <TableCell>{new Date(drive.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}