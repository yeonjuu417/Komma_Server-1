import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class test1610606696889 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.createForeignKey("answer", new TableForeignKey({
    //   columnNames: ["questionId"],
    //   referencedColumnNames: ["id"],
    //   referencedTableName: "question",
    //   onDelete: "CASCADE"
    // }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // const table = await queryRunner.getTable("question");
    // const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("questionId") !== -1);
    // await queryRunner.dropForeignKey("question", foreignKey);
  }

}
