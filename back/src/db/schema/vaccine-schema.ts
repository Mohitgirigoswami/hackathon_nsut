import { pgTable, text, timestamp, date, integer, boolean, numeric } from "drizzle-orm/pg-core";
import namespacedId from "@/lib/utils";
import { user } from "./auth-schema";
import { beneficiary } from "./beneficiaries-schema";

export const vaccineType = pgTable("vaccine_type", {
  id: text("id").primaryKey().$defaultFn(() => namespacedId("vaccine_type")),
  name: text("name").notNull(),
  description: text("description"),
  manufacturer: text("manufacturer"),
  targetDisease: text("target_disease").notNull(),
  recommendedAgeMonths: integer("recommended_age_months"),
  dosage: text("dosage"),
  schedule: text("schedule"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const vaccineBatch = pgTable("vaccine_batch", {
  id: text("id").primaryKey().$defaultFn(() => namespacedId("vaccine_batch")),
  batchNumber: text("batch_number").notNull().unique(),
  vaccineTypeId: text("vaccine_type_id")
    .notNull()
    .references(() => vaccineType.id, { onDelete: "cascade" }),
  manufacturer: text("manufacturer").notNull(),
  expiryDate: date("expiry_date").notNull(),
  quantityReceived: integer("quantity_received").notNull(),
  quantityUsed: integer("quantity_used").default(0).notNull(),
  storageTemperature: numeric("storage_temperature", { precision: 4, scale: 1 }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const vaccinationRecord = pgTable("vaccination_record", {
  id: text("id").primaryKey().$defaultFn(() => namespacedId("vaccination_record")),
  beneficiaryId: text("beneficiary_id")
    .notNull()
    .references(() => beneficiary.id, { onDelete: "cascade" }),
  vaccineTypeId: text("vaccine_type_id")
    .notNull()
    .references(() => vaccineType.id, { onDelete: "cascade" }),
  vaccineBatchId: text("vaccine_batch_id")
    .references(() => vaccineBatch.id, { onDelete: "set null" }),
  administeredDate: date("administered_date").notNull(),
  administeredBy: text("administered_by").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  doseNumber: integer("dose_number").default(1).notNull(),
  nextDueDate: date("next_due_date"),
  sideEffects: text("side_effects"),
  notes: text("notes"),
  isCompleted: boolean("is_completed").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
