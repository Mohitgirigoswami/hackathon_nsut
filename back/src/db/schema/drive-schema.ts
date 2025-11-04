import { pgTable, text, timestamp, date, integer, jsonb } from "drizzle-orm/pg-core";
import namespacedId from "@/lib/utils";
import { user } from "./auth-schema";
import { village } from "./village-schema";
import { beneficiary } from "./beneficiaries-schema";
import { vaccineType, vaccineBatch } from "./vaccine-schema";

export const drive = pgTable("drive", {
  id: text("id").primaryKey().$defaultFn(() => namespacedId("drive")),
  name: text("name").notNull(),
  description: text("description"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  targetVillages: jsonb("target_villages").$type<string[]>(), // Array of village IDs
  targetVaccineTypes: jsonb("target_vaccine_types").$type<string[]>(), // Array of vaccine type IDs
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: text("status").default("planned").notNull(), // 'planned', 'active', 'completed', 'cancelled'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const vaccinationSession = pgTable("vaccination_session", {
  id: text("id").primaryKey().$defaultFn(() => namespacedId("vaccination_session")),
  driveId: text("drive_id")
    .notNull()
    .references(() => drive.id, { onDelete: "cascade" }),
  sessionDate: date("session_date").notNull(),
  villageId: text("village_id")
    .notNull()
    .references(() => village.id, { onDelete: "cascade" }),
  healthWorkers: jsonb("health_workers").$type<string[]>(), // Array of user IDs who are health workers
  plannedBeneficiaries: integer("planned_beneficiaries").default(0).notNull(),
  actualBeneficiaries: integer("actual_beneficiaries").default(0).notNull(),
  vaccinesAdministered: jsonb("vaccines_administered").$type<{ [vaccineTypeId: string]: number }>(), // Count per vaccine type
  status: text("status").default("scheduled").notNull(), // 'scheduled', 'in_progress', 'completed', 'cancelled'
  notes: text("notes"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const sessionBeneficiary = pgTable("session_beneficiary", {
  id: text("id").primaryKey().$defaultFn(() => namespacedId("session_beneficiary")),
  sessionId: text("session_id")
    .notNull()
    .references(() => vaccinationSession.id, { onDelete: "cascade" }),
  beneficiaryId: text("beneficiary_id")
    .notNull()
    .references(() => beneficiary.id, { onDelete: "cascade" }),
  status: text("status").default("scheduled").notNull(), // 'scheduled', 'vaccinated', 'missed', 'postponed'
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const immunizationDriveRecord = pgTable("immunization_drive_record", {
  id: text("id").primaryKey().$defaultFn(() => namespacedId("immunization_drive_record")),
  sessionId: text("session_id")
    .notNull()
    .references(() => vaccinationSession.id, { onDelete: "cascade" }),
  beneficiaryId: text("beneficiary_id")
    .notNull()
    .references(() => beneficiary.id, { onDelete: "cascade" }),
  vaccineTypeId: text("vaccine_type_id")
    .notNull()
    .references(() => vaccineType.id, { onDelete: "cascade" }),
  vaccineBatchId: text("vaccine_batch_id")
    .references(() => vaccineBatch.id, { onDelete: "set null" }),
  administeredDate: date("administered_date").notNull(),
  administeredBy: text("administered_by").notNull(), // User ID of health worker
  doseNumber: integer("dose_number").default(1).notNull(),
  sideEffects: text("side_effects"),
  notes: text("notes"),
  status: text("status").default("completed").notNull(), // 'completed', 'partial', 'failed'
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});