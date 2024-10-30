import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727348363477 implements MigrationInterface {
    name = 'Migration1727348363477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Cards" ALTER COLUMN "dueDate" datetime`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Cards" ALTER COLUMN "dueDate" datetime NOT NULL`);
    }

}
