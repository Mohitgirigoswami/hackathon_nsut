import express from "express";
import { db } from "@/db";
import { beneficiary } from "@/db/schema/beneficiaries-schema";
import { eq } from "drizzle-orm";

const router = express.Router();

// GET /api/beneficiaries - List all beneficiaries
router.get("/", async (req, res) => {
  try {
    const beneficiaries = await db.select().from(beneficiary);
    res.json(beneficiaries);
  } catch (error) {
    console.error("Error fetching beneficiaries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/beneficiaries/:id - Get beneficiary by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const beneficiaries = await db.select().from(beneficiary).where(eq(beneficiary.id, id));
    if (beneficiaries.length === 0) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }
    res.json(beneficiaries[0]);
  } catch (error) {
    console.error("Error fetching beneficiary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/beneficiaries - Create new beneficiary
router.post("/", async (req, res) => {
  try {
    const {
      name,
      dateOfBirth,
      age,
      gender,
      phone,
      email,
      address,
      villageId,
      userId,
      benefitType,
      status = "active",
      isEligible = true,
      notes
    } = req.body;

    if (!name || !villageId || !userId || !benefitType) {
      return res.status(400).json({
        error: "Missing required fields: name, villageId, userId, benefitType"
      });
    }

    const beneficiaryData: any = {
      name,
      villageId,
      userId,
      benefitType,
      status,
      isEligible
    };

    if (dateOfBirth) beneficiaryData.dateOfBirth = new Date(dateOfBirth);
    if (age) beneficiaryData.age = parseInt(age);
    if (gender) beneficiaryData.gender = gender;
    if (phone) beneficiaryData.phone = phone;
    if (email) beneficiaryData.email = email;
    if (address) beneficiaryData.address = address;
    if (notes) beneficiaryData.notes = notes;

    const newBeneficiary = await db.insert(beneficiary).values(beneficiaryData).returning();

    res.status(201).json({
      message: "Beneficiary created successfully",
      beneficiary: newBeneficiary[0]
    });
  } catch (error) {
    console.error("Error creating beneficiary:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

// PUT /api/beneficiaries/:id - Update beneficiary
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    delete updateData.id;

    if (updateData.age) updateData.age = parseInt(updateData.age);
    if (updateData.isEligible !== undefined) updateData.isEligible = Boolean(updateData.isEligible);
    if (updateData.dateOfBirth) updateData.dateOfBirth = new Date(updateData.dateOfBirth);

    const updatedBeneficiary = await db.update(beneficiary).set(updateData).where(eq(beneficiary.id, id)).returning();

    if (updatedBeneficiary.length === 0) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }

    res.json({
      message: "Beneficiary updated successfully",
      beneficiary: updatedBeneficiary[0]
    });
  } catch (error) {
    console.error("Error updating beneficiary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/beneficiaries/:id - Delete beneficiary
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBeneficiary = await db.delete(beneficiary).where(eq(beneficiary.id, id)).returning();

    if (deletedBeneficiary.length === 0) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }

    res.json({
      message: "Beneficiary deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting beneficiary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
