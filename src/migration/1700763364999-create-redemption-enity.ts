import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRedemptionEnity1700763364999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'redemption',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'userId',
            type: 'integer',
          },
          {
            name: 'amount',
            type: 'decimal',
          },
          {
            name: 'status',
            type: 'varchar',
          },
        ],
      }),
    );

    // Add foreign key constraint
    await queryRunner.createForeignKey(
      'redemption',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('redemption');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey('redemption', foreignKey);

    await queryRunner.dropTable('redemption');
  }
}
