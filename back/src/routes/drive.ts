import express from "express";
import { db } from "@/db";
import { drive, vaccinationSession, sessionBeneficiary, immunizationDriveRecord } from "@/db/schema/drive-schema";
import { eq } from "drizzle-orm";

const router = express.Router();

// GET /api/drives - List all drives
router.get("/", async (req, res) => {
  try {
    const drives = await db.select().from(drive);
    res.json(drives);
  } catch (error) {
    console.error("Error fetching drives:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/drives/:id - Get drive by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const drives = await db.select().from(drive).where(eq(drive.id, id));
    if (drives.length === 0) {
      return res.status(404).json({ error: "Drive not found" });
    }
    res.json(drives[0]);
  } catch (error) {
    console.error("Error fetching drive:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/drives - Create new drive
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      startDate,
      endDate,
      targetVillages,
      targetVaccineTypes,
      userId,
      status = "planned"
    } = req.body;

    // Validate required fields
    if (!name || !startDate || !userId) {
      return res.status(400).json({
        error: "Missing required fields: name, startDate, userId"
      });
    }

    // Insert drive data
    const driveData: any = {
      name,
      startDate: new Date(startDate),
      userId,
      status
    };

    if (description) driveData.description = description;
    if (endDate) driveData.endDate = new Date(endDate);
    if (targetVillages) driveData.targetVillages = targetVillages;
    if (targetVaccineTypes) driveData.targetVaccineTypes = targetVaccineTypes;

    const newDrive = await db.insert(drive).values(driveData).returning();

    res.status(201).json({
      message: "Drive created successfully",
      drive: newDrive[0]
    });
  } catch (error) {
    console.error("Error creating drive:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

// PUT /api/drives/:id - Update drive
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    // Remove id from updateData if present
    delete updateData.id;

    // Convert dates if present
    if (updateData.startDate) updateData.startDate = new Date(updateData.startDate);
    if (updateData.endDate) updateData.endDate = new Date(updateData.endDate);

    const updatedDrive = await db.update(drive).set(updateData).where(eq(drive.id, id)).returning();

    if (updatedDrive.length === 0) {
      return res.status(404).json({ error: "Drive not found" });
    }

    res.json({
      message: "Drive updated successfully",
      drive: updatedDrive[0]
    });
  } catch (error) {
    console.error("Error updating drive:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/drives/:id - Delete drive
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDrive = await db.delete(drive).where(eq(drive.id, id)).returning();

    if (deletedDrive.length === 0) {
      return res.status(404).json({ error: "Drive not found" });
    }

    res.json({
      message: "Drive deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting drive:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Sessions routes
// GET /api/sessions - List all sessions
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await db.select().from(vaccinationSession);
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/sessions - Create new session
router.post("/sessions", async (req, res) => {
  try {
    const {
      driveId,
      sessionDate,
      villageId,
      healthWorkers,
      plannedBeneficiaries = 0,
      actualBeneficiaries = 0,
      vaccinesAdministered,
      status = "scheduled",
      notes,
      userId
    } = req.body;

    // Validate required fields
    if (!driveId || !sessionDate || !villageId || !userId) {
      return res.status(400).json({
        error: "Missing required fields: driveId, sessionDate, villageId, userId"
      });
    }

    const sessionData: any = {
      driveId,
      sessionDate: new Date(sessionDate),
      villageId,
      plannedBeneficiaries: parseInt(plannedBeneficiaries),
      actualBeneficiaries: parseInt(actualBeneficiaries),
      status,
      userId
    };

    if (healthWorkers) sessionData.healthWorkers = healthWorkers;
    if (vaccinesAdministered) sessionData.vaccinesAdministered = vaccinesAdministered;
    if (notes) sessionData.notes = notes;

    const newSession = await db.insert(vaccinationSession).values(sessionData).returning();

    res.status(201).json({
      message: "Session created successfully",
      session: newSession[0]
    });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

// Add more routes for sessions, beneficiaries, records as needed

export default router;