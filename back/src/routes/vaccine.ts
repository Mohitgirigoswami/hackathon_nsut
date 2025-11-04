import express from "express";
import { db } from "@/db";
import { vaccineType, vaccineBatch, vaccinationRecord } from "@/db/schema/vaccine-schema";
import { eq } from "drizzle-orm";

const router = express.Router();

// GET /api/vaccine-types - List all vaccine types
router.get("/types", async (req, res) => {
  try {
    const types = await db.select().from(vaccineType);
    res.json(types);
  } catch (error) {
    console.error("Error fetching vaccine types:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/vaccine-types - Create new vaccine type
router.post("/types", async (req, res) => {
  try {
    const {
      name,
      description,
      manufacturer,
      targetDisease,
      recommendedAgeMonths,
      dosage,
      schedule,
      isActive = true
    } = req.body;

    if (!name || !targetDisease) {
      return res.status(400).json({
        error: "Missing required fields: name, targetDisease"
      });
    }

    const typeData: any = {
      name,
      targetDisease,
      isActive
    };

    if (description) typeData.description = description;
    if (manufacturer) typeData.manufacturer = manufacturer;
    if (recommendedAgeMonths) typeData.recommendedAgeMonths = parseInt(recommendedAgeMonths);
    if (dosage) typeData.dosage = dosage;
    if (schedule) typeData.schedule = schedule;

    const newType = await db.insert(vaccineType).values(typeData).returning();

    res.status(201).json({
      message: "Vaccine type created successfully",
      vaccineType: newType[0]
    });
  } catch (error) {
    console.error("Error creating vaccine type:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

// Vaccine Batches routes
// GET /api/vaccine-batches - List all vaccine batches
router.get("/batches", async (req, res) => {
  try {
    const batches = await db.select().from(vaccineBatch);
    res.json(batches);
  } catch (error) {
    console.error("Error fetching vaccine batches:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/vaccine-batches - Create new vaccine batch
router.post("/batches", async (req, res) => {
  try {
    const {
      batchNumber,
      vaccineTypeId,
      manufacturer,
      expiryDate,
      quantityReceived,
      quantityUsed = 0,
      storageTemperature,
      userId
    } = req.body;

    if (!batchNumber || !vaccineTypeId || !manufacturer || !expiryDate || !quantityReceived || !userId) {
      return res.status(400).json({
        error: "Missing required fields: batchNumber, vaccineTypeId, manufacturer, expiryDate, quantityReceived, userId"
      });
    }

    const batchData: any = {
      batchNumber,
      vaccineTypeId,
      manufacturer,
      expiryDate: new Date(expiryDate),
      quantityReceived: parseInt(quantityReceived),
      quantityUsed: parseInt(quantityUsed),
      userId
    };

    if (storageTemperature) batchData.storageTemperature = parseFloat(storageTemperature);

    const newBatch = await db.insert(vaccineBatch).values(batchData).returning();

    res.status(201).json({
      message: "Vaccine batch created successfully",
      vaccineBatch: newBatch[0]
    });
  } catch (error) {
    console.error("Error creating vaccine batch:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

// Vaccination Records routes
// GET /api/vaccination-records - List all vaccination records
router.get("/records", async (req, res) => {
  try {
    const records = await db.select().from(vaccinationRecord);
    res.json(records);
  } catch (error) {
    console.error("Error fetching vaccination records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/vaccination-records - Create new vaccination record
router.post("/records", async (req, res) => {
  try {
    const {
      beneficiaryId,
      vaccineTypeId,
      vaccineBatchId,
      administeredDate,
      administeredBy,
      userId,
      doseNumber = 1,
      nextDueDate,
      sideEffects,
      notes,
      isCompleted = true
    } = req.body;

    if (!beneficiaryId || !vaccineTypeId || !administeredDate || !administeredBy || !userId) {
      return res.status(400).json({
        error: "Missing required fields: beneficiaryId, vaccineTypeId, administeredDate, administeredBy, userId"
      });
    }

    const recordData: any = {
      beneficiaryId,
      vaccineTypeId,
      administeredDate: new Date(administeredDate),
      administeredBy,
      userId,
      doseNumber: parseInt(doseNumber),
      isCompleted
    };

    if (vaccineBatchId) recordData.vaccineBatchId = vaccineBatchId;
    if (nextDueDate) recordData.nextDueDate = new Date(nextDueDate);
    if (sideEffects) recordData.sideEffects = sideEffects;
    if (notes) recordData.notes = notes;

    const newRecord = await db.insert(vaccinationRecord).values(recordData).returning();

    res.status(201).json({
      message: "Vaccination record created successfully",
      vaccinationRecord: newRecord[0]
    });
  } catch (error) {
    console.error("Error creating vaccination record:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

export default router;
