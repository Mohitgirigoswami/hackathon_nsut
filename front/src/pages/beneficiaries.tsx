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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";

interface Beneficiary {
  id: string;
  name: string;
  dateOfBirth?: string;
  age?: number;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  benefitType: string;
  status: string;
  isEligible: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Beneficiaries() {
  const { data: session } = authClient.useSession();
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    villageId: '',
    benefitType: '',
  });

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/beneficiaries");
        if (!response.ok) {
          throw new Error("Failed to fetch beneficiaries");
        }
        const data = await response.json();
        setBeneficiaries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/beneficiaries", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age) : undefined,
          userId: session?.user?.id || 'user123',
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create beneficiary');
      }
      setIsDialogOpen(false);
      setFormData({
        name: '',
        dateOfBirth: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        villageId: '',
        benefitType: '',
      });
      // Refresh the list
      const data = await response.json();
      setBeneficiaries(prev => [...prev, data.beneficiary]);
    } catch (err) {
      console.error('Error creating beneficiary:', err);
    }
  };

  if (loading) {
    return <div className="p-4">Loading beneficiaries...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Beneficiaries</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Beneficiary</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Beneficiary</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="villageId">Village ID</Label>
                <Input
                  id="villageId"
                  value={formData.villageId}
                  onChange={(e) => setFormData(prev => ({ ...prev, villageId: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="benefitType">Benefit Type</Label>
                <Input
                  id="benefitType"
                  value={formData.benefitType}
                  onChange={(e) => setFormData(prev => ({ ...prev, benefitType: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit">Create Beneficiary</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Benefit Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Eligible</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {beneficiaries.map((beneficiary) => (
            <TableRow key={beneficiary.id}>
              <TableCell>{beneficiary.name}</TableCell>
              <TableCell>{beneficiary.age || "-"}</TableCell>
              <TableCell>{beneficiary.gender || "-"}</TableCell>
              <TableCell>{beneficiary.phone || "-"}</TableCell>
              <TableCell>{beneficiary.email || "-"}</TableCell>
              <TableCell>{beneficiary.benefitType}</TableCell>
              <TableCell>{beneficiary.status}</TableCell>
              <TableCell>{beneficiary.isEligible ? "Yes" : "No"}</TableCell>
              <TableCell>{new Date(beneficiary.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}