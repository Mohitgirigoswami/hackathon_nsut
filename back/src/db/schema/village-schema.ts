import { pgTable, text, timestamp, integer, numeric, boolean } from "drizzle-orm/pg-core";
import namespacedId from "@/lib/utils";
import { user } from "./auth-schema";

export const village = pgTable("village", {
  id: text("id").primaryKey().$defaultFn(() => namespacedId("village")),
  name: text("name").notNull(),
  description: text("description"),
  district: text("district").notNull(),
  state: text("state").notNull(),
  country: text("country").default("India").notNull(),
  population: integer("population").notNull(),
  areaSqKm: numeric("area_sq_km", { precision: 8, scale: 2 }),
  latitude: numeric("latitude", { precision: 10, scale: 8 }),
  longitude: numeric("longitude", { precision: 11, scale: 8 }),
  villageHead: text("village_head"),
  panchayatName: text("panchayat_name"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
