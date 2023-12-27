import { MigrationInterface, QueryRunner } from "typeorm"

export class CustomerUpdate1703684045104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"customer\"" + 
        " ADD COLUMN \"pendingFunds\" int"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"customer\"" +
          " DROP COLUMN \"pendingFunds\""
        )
    }

}
