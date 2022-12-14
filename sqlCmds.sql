-- CREATE TABLE "SHIPPED_PACKAGE"(
--     "Package_no" INTEGER NOT NULL, 
--     "Hieght" INTEGER,
--     "Width" INTEGER,
--     "Length" INTEGER,
--     "Location_Address" VARCHAR(255),
--     "Package_Status" VARCHAR(255),
--     "Weight" INTEGER,
--     "Final_Dilevery_Date" DATE,
--     "Transportation_Schedule_no" INTEGER NOT NULL,
--     "CenterID" INTEGER NOT NULL,

--     PRIMARY KEY("Package_no"),
--     FOREIGN KEY("Location_Address") REFERENCES "LOCATION(Address)",
--     FOREIGN KEY("CenterID")         REFERENCES "RETAIL_CENTER(ID)"
-- );

-- CREATE TABLE "LOCATION"(
--     "Address" VARCHAR(255) NOT NULL,
--     "Type" VARCHAR(255) NOT NULL,

--     PRIMARY KEY("Address")
-- );

-- CREATE TABLE "PACKAGE_CATEGORIES"(
--     "Package_no" INTEGER NOT NULL, 
--     "Category" VARCHAR(255),

--     FOREIGN KEY("Package_no") REFERENCES "SHIPPED_PACKAGE(Package_no)"
-- );

-- CREATE TABLE "DELAYED_PACKAGE"(
--     "Fine_Amount" INTEGER,
--     "Package_no" INTEGER NOT NULL, 
--     FOREIGN KEY("Package_no") REFERENCES "SHIPPED_PACKAGE(Package_no)"
-- );

-- CREATE TABLE "RETAIL_CENTER"(
--     "Type" VARCHAR(255),
--     "Address" VARCHAR(255),
--     "ID" INTEGER,
--     PRIMARY KEY("ID")
-- );

-- CREATE TABLE "DESTINATION"(
--     "CenterID" INTEGER,
--     FOREIGN KEY("CenterID") REFERENCES "RETAIL_CENTER(ID)"
-- );

-- CREATE TABLE "PACKAGE_LOCATIONS"(
--     "Address" VARCHAR(255),
--     "Package_no" INTEGER NOT NULL, 
--     "Entry_date" DATE,
--     "Exit_date" DATE,
--     FOREIGN KEY("Address") REFERENCES "Location(Address)",
--     FOREIGN KEY("Package_no") REFERENCES "SHIPPED_PACKAGE(Package_no)"
-- );

