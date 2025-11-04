import express from "express";
import { db } from "@/db";
import { village } from "@/db/schema/village-schema";
import { eq } from "drizzle-orm";

const router = express.Router();

// GET /api/villages - List all villages
router.get("/", async (req, res) => {
  try {
    const villages = await db.select().from(village);
    res.json(villages);
  } catch (error) {
    console.error("Error fetching villages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/villages/:id - Get village by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const villages = await db.select().from(village).where(eq(village.id, id));
    if (villages.length === 0) {
      return res.status(404).json({ error: "Village not found" });
    }
    res.json(villages[0]);
  } catch (error) {
    console.error("Error fetching village:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/villages - Create new village
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      district,
      state,
      country = "India",
      population,
      areaSqKm,
      latitude,
      longitude,
      villageHead,
      panchayatName,
      userId
    } = req.body;

    if (!name || !district || !state || !population || !userId) {
      return res.status(400).json({
        error: "Missing required fields: name, district, state, population, userId"
      });
    }

    const villageData: any = {
      name,
      district,
      state,
      country,
      population: parseInt(population),
      userId
    };

    if (description) villageData.description = description;
    if (areaSqKm) villageData.areaSqKm = parseFloat(areaSqKm);
    if (latitude) villageData.latitude = parseFloat(latitude);
    if (longitude) villageData.longitude = parseFloat(longitude);
    if (villageHead) villageData.villageHead = villageHead;
    if (panchayatName) villageData.panchayatName = panchayatName;

    const newVillage = await db.insert(village).values(villageData).returning();

    res.status(201).json({
      message: "Village created successfully",
      village: newVillage[0]
    });
  } catch (error) {
    console.error("Error creating village:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

// PUT /api/villages/:id - Update village
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    delete updateData.id;

    if (updateData.population) updateData.population = parseInt(updateData.population);
    if (updateData.areaSqKm) updateData.areaSqKm = parseFloat(updateData.areaSqKm);
    if (updateData.latitude) updateData.latitude = parseFloat(updateData.latitude);
    if (updateData.longitude) updateData.longitude = parseFloat(updateData.longitude);

    const updatedVillage = await db.update(village).set(updateData).where(eq(village.id, id)).returning();

    if (updatedVillage.length === 0) {
      return res.status(404).json({ error: "Village not found" });
    }

    res.json({
      message: "Village updated successfully",
      village: updatedVillage[0]
    });
  } catch (error) {
    console.error("Error updating village:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/villages/:id - Delete village
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVillage = await db.delete(village).where(eq(village.id, id)).returning();

    if (deletedVillage.length === 0) {
      return res.status(404).json({ error: "Village not found" });
    }

    res.json({
      message: "Village deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting village:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
