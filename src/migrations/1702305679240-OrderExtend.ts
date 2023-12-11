import { MigrationInterface, QueryRunner } from "typeorm"

export class OrderExtend1702305679240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          "ALTER TABLE \"order\"" + 
          " ADD COLUMN \"loyaltyPoints\" int," +
          " ADD COLUMN \"referrer\" varchar"

        )
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          "ALTER TABLE \"order\" DROP COLUMN \"loyaltyPoints\","+
          "ALTER TABLE \"order\" DROP COLUMN \"referrer\""
        )
      }

}
