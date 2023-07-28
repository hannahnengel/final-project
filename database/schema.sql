set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "users" (
  "userId" serial NOT NULL,
  "firstName" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "hashedPassword" TEXT NOT NULL,
  "demoId" integer,
  "createdAt" TIMESTAMPTZ NOT NULL default now(),
  CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "userInfos" (
  "userId" integer NOT NULL,
  "birthday" DATE NOT NULL,
  "gender" TEXT NOT NULL,
  "phone" TEXT,
  "contact" TEXT NOT NULL,
  CONSTRAINT "userInfos_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "friendPreferences" (
  "userId" integer NOT NULL,
  "city" TEXT NOT NULL,
  "zipCode" integer NOT NULL,
  "lat" decimal NOT NULL,
  "lng" decimal NOT NULL,
  "mileRadius" integer NOT NULL,
  "friendGender" TEXT NOT NULL,
  "friendAge" TEXT NOT NULL,
  CONSTRAINT "friendPreferences_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "forgottenPasswords" (
  "forgottenPasswordId" serial NOT NULL,
  "userId" integer NOT NULL,
  "verificationCode" TEXT NOT NULL,
  "newHashedPassword" TEXT NOT NULL,
  "emailQuery" TEXT NOT NULL,
  CONSTRAINT "forgottenPasswords_pk" PRIMARY KEY ("forgottenPasswordId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "matches" (
    "userId1" integer NOT NULL,
    "userId2" integer NOT NULL,
    "matchType" TEXT NOT NULL,
    "user1Status" TEXT,
    "user2Status" TEXT,
    "matchStatus" TEXT,
    CONSTRAINT "matches_pk" PRIMARY KEY ("userId1", "userId2")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "matchSelections" (
  "userId1" integer NOT NULL,
	"userId2" integer NOT NULL,
	"selectionId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	CONSTRAINT "matchSelections_pk" PRIMARY KEY ("userId1","userId2","categoryId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "profilePics" (
  "profilePicId" serial NOT NULL,
  "userId" integer NOT NULL,
  "url" TEXT NOT NULL,
  "fileName" TEXT NOT NULL,
  CONSTRAINT "profilePics_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "categories" (
  "categoryId" serial NOT NULL,
  "categoryName" TEXT NOT NULL,
  CONSTRAINT "categories_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "selections" (
  "selectionId" serial NOT NULL,
  "selectionName" text NOT NULL,
  "src" text NOT NULL,
  "categoryId" integer NOT NULL,
  CONSTRAINT "selections_pk" PRIMARY KEY ("selectionId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "userSelections" (
  "userId" integer NOT NULL,
  "categoryId" integer NOT NULL,
  "selectionId" integer NOT NULL,
  CONSTRAINT "userSelections_pk" PRIMARY KEY ("userId","categoryId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "forgottenPasswords" ADD CONSTRAINT "forgottenPasswords_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "matches" ADD CONSTRAINT "matches_fk0" FOREIGN KEY ("userId1") REFERENCES "users"("userId");
ALTER TABLE "matches" ADD CONSTRAINT "matches_fk1" FOREIGN KEY ("userId2") REFERENCES "users"("userId");
ALTER TABLE "profilePics" ADD CONSTRAINT "profilePics_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "selections" ADD CONSTRAINT "selections_fk0" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");
ALTER TABLE "userSelections" ADD CONSTRAINT "userSelections_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "userSelections" ADD CONSTRAINT "userSelections_fk1" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");
ALTER TABLE "userSelections" ADD CONSTRAINT "userSelections_fk2" FOREIGN KEY ("selectionId") REFERENCES "selections"("selectionId");
ALTER TABLE "matchSelections" ADD CONSTRAINT "matchSelections_fk0" FOREIGN KEY ("userId1") REFERENCES "users"("userId");
ALTER TABLE "matchSelections" ADD CONSTRAINT "matchSelections_fk1" FOREIGN KEY ("userId2") REFERENCES "users"("userId");
ALTER TABLE "matchSelections" ADD CONSTRAINT "matchSelections_fk2" FOREIGN KEY ("selectionId") REFERENCES "selections"("selectionId");
ALTER TABLE "matchSelections" ADD CONSTRAINT "matchSelections_fk3" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");
