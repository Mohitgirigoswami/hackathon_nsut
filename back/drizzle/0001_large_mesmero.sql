CREATE TABLE "beneficiary" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"date_of_birth" date,
	"age" integer,
	"gender" text,
	"phone" text,
	"email" text,
	"address" text,
	"village_id" text NOT NULL,
	"user_id" text NOT NULL,
	"benefit_type" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"is_eligible" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drive" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"start_date" date NOT NULL,
	"end_date" date,
	"target_villages" jsonb,
	"target_vaccine_types" jsonb,
	"user_id" text NOT NULL,
	"status" text DEFAULT 'planned' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "immunization_drive_record" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"beneficiary_id" text NOT NULL,
	"vaccine_type_id" text NOT NULL,
	"vaccine_batch_id" text,
	"administered_date" date NOT NULL,
	"administered_by" text NOT NULL,
	"dose_number" integer DEFAULT 1 NOT NULL,
	"side_effects" text,
	"notes" text,
	"status" text DEFAULT 'completed' NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session_beneficiary" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"beneficiary_id" text NOT NULL,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vaccination_session" (
	"id" text PRIMARY KEY NOT NULL,
	"drive_id" text NOT NULL,
	"session_date" date NOT NULL,
	"village_id" text NOT NULL,
	"health_workers" jsonb,
	"planned_beneficiaries" integer DEFAULT 0 NOT NULL,
	"actual_beneficiaries" integer DEFAULT 0 NOT NULL,
	"vaccines_administered" jsonb,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"notes" text,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vaccination_record" (
	"id" text PRIMARY KEY NOT NULL,
	"beneficiary_id" text NOT NULL,
	"vaccine_type_id" text NOT NULL,
	"vaccine_batch_id" text,
	"administered_date" date NOT NULL,
	"administered_by" text NOT NULL,
	"user_id" text NOT NULL,
	"dose_number" integer DEFAULT 1 NOT NULL,
	"next_due_date" date,
	"side_effects" text,
	"notes" text,
	"is_completed" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vaccine_batch" (
	"id" text PRIMARY KEY NOT NULL,
	"batch_number" text NOT NULL,
	"vaccine_type_id" text NOT NULL,
	"manufacturer" text NOT NULL,
	"expiry_date" date NOT NULL,
	"quantity_received" integer NOT NULL,
	"quantity_used" integer DEFAULT 0 NOT NULL,
	"storage_temperature" numeric(4, 1),
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "vaccine_batch_batch_number_unique" UNIQUE("batch_number")
);
--> statement-breakpoint
CREATE TABLE "vaccine_type" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"manufacturer" text,
	"target_disease" text NOT NULL,
	"recommended_age_months" integer,
	"dosage" text,
	"schedule" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "village" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"district" text NOT NULL,
	"state" text NOT NULL,
	"country" text DEFAULT 'India' NOT NULL,
	"population" integer NOT NULL,
	"area_sq_km" numeric(8, 2),
	"latitude" numeric(10, 8),
	"longitude" numeric(11, 8),
	"village_head" text,
	"panchayat_name" text,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "beneficiary" ADD CONSTRAINT "beneficiary_village_id_village_id_fk" FOREIGN KEY ("village_id") REFERENCES "public"."village"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beneficiary" ADD CONSTRAINT "beneficiary_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drive" ADD CONSTRAINT "drive_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "immunization_drive_record" ADD CONSTRAINT "immunization_drive_record_session_id_vaccination_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."vaccination_session"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "immunization_drive_record" ADD CONSTRAINT "immunization_drive_record_beneficiary_id_beneficiary_id_fk" FOREIGN KEY ("beneficiary_id") REFERENCES "public"."beneficiary"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "immunization_drive_record" ADD CONSTRAINT "immunization_drive_record_vaccine_type_id_vaccine_type_id_fk" FOREIGN KEY ("vaccine_type_id") REFERENCES "public"."vaccine_type"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "immunization_drive_record" ADD CONSTRAINT "immunization_drive_record_vaccine_batch_id_vaccine_batch_id_fk" FOREIGN KEY ("vaccine_batch_id") REFERENCES "public"."vaccine_batch"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "immunization_drive_record" ADD CONSTRAINT "immunization_drive_record_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_beneficiary" ADD CONSTRAINT "session_beneficiary_session_id_vaccination_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."vaccination_session"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_beneficiary" ADD CONSTRAINT "session_beneficiary_beneficiary_id_beneficiary_id_fk" FOREIGN KEY ("beneficiary_id") REFERENCES "public"."beneficiary"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccination_session" ADD CONSTRAINT "vaccination_session_drive_id_drive_id_fk" FOREIGN KEY ("drive_id") REFERENCES "public"."drive"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccination_session" ADD CONSTRAINT "vaccination_session_village_id_village_id_fk" FOREIGN KEY ("village_id") REFERENCES "public"."village"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccination_session" ADD CONSTRAINT "vaccination_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccination_record" ADD CONSTRAINT "vaccination_record_beneficiary_id_beneficiary_id_fk" FOREIGN KEY ("beneficiary_id") REFERENCES "public"."beneficiary"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccination_record" ADD CONSTRAINT "vaccination_record_vaccine_type_id_vaccine_type_id_fk" FOREIGN KEY ("vaccine_type_id") REFERENCES "public"."vaccine_type"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccination_record" ADD CONSTRAINT "vaccination_record_vaccine_batch_id_vaccine_batch_id_fk" FOREIGN KEY ("vaccine_batch_id") REFERENCES "public"."vaccine_batch"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccination_record" ADD CONSTRAINT "vaccination_record_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccine_batch" ADD CONSTRAINT "vaccine_batch_vaccine_type_id_vaccine_type_id_fk" FOREIGN KEY ("vaccine_type_id") REFERENCES "public"."vaccine_type"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccine_batch" ADD CONSTRAINT "vaccine_batch_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "village" ADD CONSTRAINT "village_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;