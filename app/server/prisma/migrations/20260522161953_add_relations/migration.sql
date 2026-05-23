-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "service_id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,
    "men" INTEGER NOT NULL DEFAULT 0,
    "women" INTEGER NOT NULL DEFAULT 0,
    "children" INTEGER NOT NULL DEFAULT 0,
    "counter_name" TEXT,
    "submitted_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attendance_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Attendance_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Attendance" ("children", "counter_name", "id", "men", "section_id", "service_id", "submitted_at", "women") SELECT "children", "counter_name", "id", "men", "section_id", "service_id", "submitted_at", "women" FROM "Attendance";
DROP TABLE "Attendance";
ALTER TABLE "new_Attendance" RENAME TO "Attendance";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
