import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731074580394 implements MigrationInterface {
    name = 'Migration1731074580394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "permission" character varying(20) NOT NULL, "userId" uuid, "projectId" uuid, CONSTRAINT "PK_e83fa8a46bd5a3bfaa095d40812" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Notes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "body" character varying(500) NOT NULL, "userId" uuid, CONSTRAINT "PK_d4cfe008ad0b9edfe9aee8c7129" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "color" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_61aa7408a426fea5dd8416f5a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "status" boolean NOT NULL, "date" TIMESTAMP NOT NULL, "content" json NOT NULL, "userId" uuid, CONSTRAINT "PK_c77268afe7d3c5568da66c5bebe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, "password" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Sprints" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "initialDate" TIMESTAMP NOT NULL, "duration" integer NOT NULL, "status" boolean NOT NULL, "projectId" uuid, CONSTRAINT "PK_148536d4d902230656681e5d73e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying(500) NOT NULL, "status" boolean NOT NULL, "userId" uuid, "tagId" uuid, CONSTRAINT "PK_b25c37f2cdf0161b4f10ed3121c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CardTags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "color" character varying NOT NULL, "projectId" uuid, CONSTRAINT "PK_e424f03546d2742b461f197eff9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying(5000), "dueDate" TIMESTAMP, "status" boolean NOT NULL, "index" integer NOT NULL, "columnId" uuid, "sectionId" uuid, CONSTRAINT "PK_f8d646c98446cc0ef6872e960cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CardsColumn" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "index" integer NOT NULL, "sprintId" uuid, CONSTRAINT "PK_319a9eb9a9c83b19171b609cbc0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Sections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "color" character varying NOT NULL, "index" integer NOT NULL, "columnId" uuid, CONSTRAINT "PK_4b6cce072263b8e9c10478c7a08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_cards_cards" ("usersId" uuid NOT NULL, "cardsId" uuid NOT NULL, CONSTRAINT "PK_7a57bae034415b9b4b7a44de0b5" PRIMARY KEY ("usersId", "cardsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_58cb57e2237e8779896c70d1f2" ON "users_cards_cards" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a3f96d2248f7fa3a8e5bc33fa6" ON "users_cards_cards" ("cardsId") `);
        await queryRunner.query(`CREATE TABLE "card_tags_cards_cards" ("cardTagsId" uuid NOT NULL, "cardsId" uuid NOT NULL, CONSTRAINT "PK_53d691a5dbec66f55d456de397c" PRIMARY KEY ("cardTagsId", "cardsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_539e9b400b04fbece595747695" ON "card_tags_cards_cards" ("cardTagsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_acca7db2870e3836e319e9eee2" ON "card_tags_cards_cards" ("cardsId") `);
        await queryRunner.query(`CREATE TABLE "cards_tags_card_tags" ("cardsId" uuid NOT NULL, "cardTagsId" uuid NOT NULL, CONSTRAINT "PK_78632d35eab4d6ae06bb1342f07" PRIMARY KEY ("cardsId", "cardTagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c8102a1f815120b8255a353cc9" ON "cards_tags_card_tags" ("cardsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_355cda844f80f49b022dc5a3a7" ON "cards_tags_card_tags" ("cardTagsId") `);
        await queryRunner.query(`CREATE TABLE "cards_users_users" ("cardsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_205bd64101a4ff041805d411cef" PRIMARY KEY ("cardsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c75a848cb303bf11d74053e6f5" ON "cards_users_users" ("cardsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_29e45876f52fdfc19e0448357d" ON "cards_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "Permissions" ADD CONSTRAINT "FK_3cb723f9f5d9e9f0352bdbed145" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Permissions" ADD CONSTRAINT "FK_c23c8796ad70dbfd179e59f7893" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Notes" ADD CONSTRAINT "FK_de4642a08a8e66123f34b71a1ba" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Tags" ADD CONSTRAINT "FK_64a23c8460bc3eca5ae3d4c7a67" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Notifications" ADD CONSTRAINT "FK_28a9de2f34e218f2ccc746ed4f7" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Sprints" ADD CONSTRAINT "FK_652df3acce442c9d7b120acbf7a" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Projects" ADD CONSTRAINT "FK_828856727aa053c3e37f698caa9" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Projects" ADD CONSTRAINT "FK_41b9d355bf75682dcf9b8823aee" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CardTags" ADD CONSTRAINT "FK_26cc68b19b25fcae0202a267d3e" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Cards" ADD CONSTRAINT "FK_06b2f79aa00b9cf863668ae3838" FOREIGN KEY ("columnId") REFERENCES "CardsColumn"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Cards" ADD CONSTRAINT "FK_ad35a3fce143b893ba14f273e7e" FOREIGN KEY ("sectionId") REFERENCES "Sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CardsColumn" ADD CONSTRAINT "FK_2a69d467073add417d81c95847c" FOREIGN KEY ("sprintId") REFERENCES "Sprints"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Sections" ADD CONSTRAINT "FK_6d609de0fa7793d2089f2cbd392" FOREIGN KEY ("columnId") REFERENCES "CardsColumn"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_cards_cards" ADD CONSTRAINT "FK_58cb57e2237e8779896c70d1f26" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_cards_cards" ADD CONSTRAINT "FK_a3f96d2248f7fa3a8e5bc33fa6a" FOREIGN KEY ("cardsId") REFERENCES "Cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "card_tags_cards_cards" ADD CONSTRAINT "FK_539e9b400b04fbece595747695c" FOREIGN KEY ("cardTagsId") REFERENCES "CardTags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "card_tags_cards_cards" ADD CONSTRAINT "FK_acca7db2870e3836e319e9eee2a" FOREIGN KEY ("cardsId") REFERENCES "Cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cards_tags_card_tags" ADD CONSTRAINT "FK_c8102a1f815120b8255a353cc9a" FOREIGN KEY ("cardsId") REFERENCES "Cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cards_tags_card_tags" ADD CONSTRAINT "FK_355cda844f80f49b022dc5a3a7b" FOREIGN KEY ("cardTagsId") REFERENCES "CardTags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cards_users_users" ADD CONSTRAINT "FK_c75a848cb303bf11d74053e6f55" FOREIGN KEY ("cardsId") REFERENCES "Cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cards_users_users" ADD CONSTRAINT "FK_29e45876f52fdfc19e0448357da" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards_users_users" DROP CONSTRAINT "FK_29e45876f52fdfc19e0448357da"`);
        await queryRunner.query(`ALTER TABLE "cards_users_users" DROP CONSTRAINT "FK_c75a848cb303bf11d74053e6f55"`);
        await queryRunner.query(`ALTER TABLE "cards_tags_card_tags" DROP CONSTRAINT "FK_355cda844f80f49b022dc5a3a7b"`);
        await queryRunner.query(`ALTER TABLE "cards_tags_card_tags" DROP CONSTRAINT "FK_c8102a1f815120b8255a353cc9a"`);
        await queryRunner.query(`ALTER TABLE "card_tags_cards_cards" DROP CONSTRAINT "FK_acca7db2870e3836e319e9eee2a"`);
        await queryRunner.query(`ALTER TABLE "card_tags_cards_cards" DROP CONSTRAINT "FK_539e9b400b04fbece595747695c"`);
        await queryRunner.query(`ALTER TABLE "users_cards_cards" DROP CONSTRAINT "FK_a3f96d2248f7fa3a8e5bc33fa6a"`);
        await queryRunner.query(`ALTER TABLE "users_cards_cards" DROP CONSTRAINT "FK_58cb57e2237e8779896c70d1f26"`);
        await queryRunner.query(`ALTER TABLE "Sections" DROP CONSTRAINT "FK_6d609de0fa7793d2089f2cbd392"`);
        await queryRunner.query(`ALTER TABLE "CardsColumn" DROP CONSTRAINT "FK_2a69d467073add417d81c95847c"`);
        await queryRunner.query(`ALTER TABLE "Cards" DROP CONSTRAINT "FK_ad35a3fce143b893ba14f273e7e"`);
        await queryRunner.query(`ALTER TABLE "Cards" DROP CONSTRAINT "FK_06b2f79aa00b9cf863668ae3838"`);
        await queryRunner.query(`ALTER TABLE "CardTags" DROP CONSTRAINT "FK_26cc68b19b25fcae0202a267d3e"`);
        await queryRunner.query(`ALTER TABLE "Projects" DROP CONSTRAINT "FK_41b9d355bf75682dcf9b8823aee"`);
        await queryRunner.query(`ALTER TABLE "Projects" DROP CONSTRAINT "FK_828856727aa053c3e37f698caa9"`);
        await queryRunner.query(`ALTER TABLE "Sprints" DROP CONSTRAINT "FK_652df3acce442c9d7b120acbf7a"`);
        await queryRunner.query(`ALTER TABLE "Notifications" DROP CONSTRAINT "FK_28a9de2f34e218f2ccc746ed4f7"`);
        await queryRunner.query(`ALTER TABLE "Tags" DROP CONSTRAINT "FK_64a23c8460bc3eca5ae3d4c7a67"`);
        await queryRunner.query(`ALTER TABLE "Notes" DROP CONSTRAINT "FK_de4642a08a8e66123f34b71a1ba"`);
        await queryRunner.query(`ALTER TABLE "Permissions" DROP CONSTRAINT "FK_c23c8796ad70dbfd179e59f7893"`);
        await queryRunner.query(`ALTER TABLE "Permissions" DROP CONSTRAINT "FK_3cb723f9f5d9e9f0352bdbed145"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29e45876f52fdfc19e0448357d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c75a848cb303bf11d74053e6f5"`);
        await queryRunner.query(`DROP TABLE "cards_users_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_355cda844f80f49b022dc5a3a7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c8102a1f815120b8255a353cc9"`);
        await queryRunner.query(`DROP TABLE "cards_tags_card_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_acca7db2870e3836e319e9eee2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_539e9b400b04fbece595747695"`);
        await queryRunner.query(`DROP TABLE "card_tags_cards_cards"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3f96d2248f7fa3a8e5bc33fa6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58cb57e2237e8779896c70d1f2"`);
        await queryRunner.query(`DROP TABLE "users_cards_cards"`);
        await queryRunner.query(`DROP TABLE "Sections"`);
        await queryRunner.query(`DROP TABLE "CardsColumn"`);
        await queryRunner.query(`DROP TABLE "Cards"`);
        await queryRunner.query(`DROP TABLE "CardTags"`);
        await queryRunner.query(`DROP TABLE "Projects"`);
        await queryRunner.query(`DROP TABLE "Sprints"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Notifications"`);
        await queryRunner.query(`DROP TABLE "Tags"`);
        await queryRunner.query(`DROP TABLE "Notes"`);
        await queryRunner.query(`DROP TABLE "Permissions"`);
    }

}