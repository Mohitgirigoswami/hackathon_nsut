import { pgTable, text, timestamp, date, integer, boolean } from "drizzle-orm/pg-core";
import namespacedId from "@/lib/utils";
import { user } from "./auth-schema";
import { village } from "./village-schema";

export const beneficiary = pgTable("beneficiary", {
  id: text("id").primaryKey().$defaultFn(() => namespacedId("beneficiary")),
  name: text("name").notNull(),
  dateOfBirth: date("date_of_birth"),
  age: integer("age"),
  gender: text("gender"), // 'male', 'female', 'other'
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  villageId: text("village_id")
    .notNull()
    .references(() => village.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  benefitType: text("benefit_type").notNull(),
  status: text("status").default("active").notNull(),
  isEligible: boolean("is_eligible").default(true).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
