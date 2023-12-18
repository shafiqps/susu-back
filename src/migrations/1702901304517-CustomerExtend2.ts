import { MigrationInterface, QueryRunner } from "typeorm"

export class CustomerExtend21702901304517 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          "ALTER TABLE \"customer\"" + 
          " ADD COLUMN \"totalOrders\" int,"+
          " ADD COLUMN \"recruits\" int," +
          " ADD COLUMN \"totalBulkPurchase\" int," +
          " ADD COLUMN \"totalProfitShare\" int"
        )
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          "ALTER TABLE \"customer\"" +
          " DROP COLUMN \"totalOrders\"," +
          " DROP COLUMN \"recruits\"," +
          " DROP COLUMN \"totalBulkPurchase\"," +
          " DROP COLUMN \"totalProfitShare\""
        )
      }

}
