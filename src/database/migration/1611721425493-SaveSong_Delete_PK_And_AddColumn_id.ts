import { MigrationInterface, QueryRunner } from "typeorm";

export class SaveSongDeletePKAndAddColumnId1611721425493 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE savesong ADD id int;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
