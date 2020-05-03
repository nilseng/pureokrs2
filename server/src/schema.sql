CREATE SCHEMA "pureokrs2";

CREATE TABLE "pureokrs2"."Company" (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE "pureokrs2"."User" (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    "companyId" INTEGER NOT NULL,
    FOREIGN KEY ("companyId") REFERENCES "pureokrs2"."Company"(id)
);

CREATE TABLE "pureokrs2"."Okr" (
    id SERIAL PRIMARY KEY NOT NULL,
    objective VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'Active',
    "dueDate" TIMESTAMP,
    "parentId" INTEGER,
    FOREIGN KEY ("parentId") REFERENCES "pureokrs2"."Okr"(id),
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedById" INTEGER,
    FOREIGN KEY ("updatedById") REFERENCES "pureokrs2"."User"(id),
    "assignedToId" INTEGER,
    FOREIGN KEY ("assignedToId") REFERENCES "pureokrs2"."User"(id),
    "companyId" INTEGER NOT NULL,
    FOREIGN KEY ("companyId") REFERENCES "pureokrs2"."Company"(id)
);

CREATE TABLE "pureokrs2"."KeyResult" (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    value REAL DEFAULT 0,
    type VARCHAR(255) NOT NULL DEFAULT 'Number',
    "dueDate" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedById" INTEGER NOT NULL,
    FOREIGN KEY ("updatedById") REFERENCES "pureokrs2"."User"(id),
    "okrId" INTEGER NOT NULL,
    FOREIGN KEY ("okrId") REFERENCES "pureokrs2"."Okr"(id),
    "companyId" INTEGER NOT NULL,
    FOREIGN KEY ("companyId") REFERENCES "pureokrs2"."Company"(id)
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "pureokrs2"."Okr"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "pureokrs2"."KeyResult"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();