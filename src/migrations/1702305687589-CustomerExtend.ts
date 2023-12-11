import { MigrationInterface, QueryRunner } from "typeorm"

export class CustomerExtend1702305687589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          "ALTER TABLE \"customer\"" + 
          " ADD COLUMN \"loyaltyPoints\" int,"+
          " ADD COLUMN \"referralCode\" varchar," +
          " ADD COLUMN \"referralInput\" varchar," +
          " ADD COLUMN \"referrer\" varchar"
        )
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          "ALTER TABLE \"customer\"" +
          " DROP COLUMN \"loyaltyPoints\"," +
          " DROP COLUMN \"referralCode\"," +
          " DROP COLUMN \"referralInput\"," +
          " DROP COLUMN \"referrer\""
        )
      }

}
