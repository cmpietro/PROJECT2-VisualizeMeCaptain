-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/EyngiH
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- drop tables

CREATE TABLE "firearms_mfg" (
    "year" INT   NOT NULL,
    "pistols" INT   NOT NULL,
    "revolvers" int   NOT NULL,
    "rilfes" int   NOT NULL,
    "shotguns" int   NOT NULL,
    "misc_firearms1" int   NOT NULL,
    "total_firearms" int   NOT NULL
);

CREATE TABLE "gun_ownership_2019" (
    "state" varchar(14)   NOT NULL,
    "state_abv" varchar(9)   NOT NULL,
    "gun_ownership" float   NOT NULL,
    "pop" float   NOT NULL
);

CREATE TABLE "reg_weapons_by_state" (
    "state" varchar(20)   NOT NULL,
    "any_other" float   NOT NULL,
    "weapon" float   NOT NULL,
    "destructive_device" float   NOT NULL,
    "machine_gun" float   NOT NULL,
    "silencer" float   NOT NULL,
    "short_barreled_rifle" float   NOT NULL,
    "Short_barreled_shotgun" float   NOT NULL,
    "total" float   NOT NULL,
    "state_abbv" varchar(6)   NOT NULL
);

CREATE TABLE "FBI_UCR_Data" (
    "index" int   NOT NULL,
    "state" varchar(2)   NOT NULL,
    "offense_year" varchar(4)   NOT NULL,
    "offense_type" varchar(20)   NOT NULL,
    "offense_count" int   NOT NULL
);

CREATE TABLE "mortality_data" (
    "index" float   NOT NULL,
    "year" float   NOT NULL,
    "month" float   NOT NULL,
    "intent" varchar(12)   NOT NULL,
    "police" float   NOT NULL,
    "sex" varchar(1)   NOT NULL,
    "age" float   NOT NULL,
    "race" varchar(30)   NOT NULL,
    "hispanic" float   NOT NULL,
    "place" varchar(23)   NOT NULL,
    "education" varchar(12)   NOT NULL
);

CREATE TABLE "mother_jones" (
    "case" varchar(45)   NOT NULL,
    "location" varchar(36)   NOT NULL,
    "date" varchar(10)   NOT NULL,
    "summary" varchar(908)   NOT NULL,
    "fatalities" float   NOT NULL,
    "injured" float   NOT NULL,
    "total_victims" float   NOT NULL,
    "location_desc" varchar(10)   NOT NULL,
    "shooter_age" float   NOT NULL,
    "prior_signs_mental_health_issues" varchar(8)   NOT NULL,
    "mental_health_details" varchar(619)   NOT NULL,
    "weapons_obtained_legally" varchar(131)   NOT NULL,
    "where_weapon_obtained" varchar(124)   NOT NULL,
    "weapon_type" varchar(389)   NOT NULL,
    "weapon_details" varchar(328)   NOT NULL,
    "race" varchar(15)   NOT NULL,
    "gender" varchar(13)   NOT NULL,
    "sources" varchar(951)   NOT NULL,
    "mental_health_sources" varchar(444)   NOT NULL,
    "sources_additional_age" varchar(951)   NOT NULL,
    "latitude" varchar(18)   NOT NULL,
    "longitude" varchar(19)   NOT NULL,
    "type" varchar(5)   NOT NULL,
    "year" float   NOT NULL,
    "city" varchar(24)   NOT NULL,
    "state" varchar(2)   NOT NULL
);

ALTER TABLE "firearms_mfg" ADD CONSTRAINT "fk_firearms_mfg_year" FOREIGN KEY("year")
REFERENCES "mother_jones" ("year");

ALTER TABLE "reg_weapons_by_state" ADD CONSTRAINT "fk_reg_weapons_by_state_weapon" FOREIGN KEY("weapon")
REFERENCES "firearms_mfg" ("total_firearms");

ALTER TABLE "reg_weapons_by_state" ADD CONSTRAINT "fk_reg_weapons_by_state_state_abbv" FOREIGN KEY("state_abbv")
REFERENCES "mother_jones" ("state");

ALTER TABLE "FBI_UCR_Data" ADD CONSTRAINT "fk_FBI_UCR_Data_state" FOREIGN KEY("state")
REFERENCES "mother_jones" ("state");

ALTER TABLE "mortality_data" ADD CONSTRAINT "fk_mortality_data_year" FOREIGN KEY("year")
REFERENCES "mother_jones" ("year");

ALTER TABLE "mother_jones" ADD CONSTRAINT "fk_mother_jones_year" FOREIGN KEY("year")
REFERENCES "FBI_UCR_Data" ("offense_year");

ALTER TABLE "mother_jones" ADD CONSTRAINT "fk_mother_jones_state" FOREIGN KEY("state")
REFERENCES "gun_ownership_2019" ("state_abv");

