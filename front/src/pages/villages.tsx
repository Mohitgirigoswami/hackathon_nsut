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

interface Village {
  id: string;
  name: string;
  description?: string;
  district: string;
  state: string;
  country: string;
  population: number;
  areaSqKm?: number;
  latitude?: number;
  longitude?: number;
  villageHead?: string;
  panchayatName?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Villages() {
  const [villages, setVillages] = useState<Village[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/villages");
        if (!response.ok) {
          throw new Error("Failed to fetch villages");
        }
        const data = await response.json();
        setVillages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchVillages();
  }, []);

  if (loading) {
    return <div className="p-4">Loading villages...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Villages</h1>
        <Button onClick={() => window.location.href = '/add-village'}>
          Add New Village
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>District</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Population</TableHead>
            <TableHead>Village Head</TableHead>
            <TableHead>Panchayat Name</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {villages.map((village) => (
            <TableRow key={village.id}>
              <TableCell>{village.name}</TableCell>
              <TableCell>{village.district}</TableCell>
              <TableCell>{village.state}</TableCell>
              <TableCell>{village.population}</TableCell>
              <TableCell>{village.villageHead || "-"}</TableCell>
              <TableCell>{village.panchayatName || "-"}</TableCell>
              <TableCell>{new Date(village.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
