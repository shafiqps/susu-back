import { MigrationInterface, QueryRunner } from "typeorm"

export class WithdrawalCreate1702737731531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "withdrawal" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "total" character varying NOT NULL, "status" character varying NOT NULL, "reason" character varying,"customer_id" character varying, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`)
        await queryRunner.query(`ALTER TABLE "withdrawal" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "withdrawal" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`)
        await queryRunner.query(`DROP TABLE "withdrawal"`)


    }

}
