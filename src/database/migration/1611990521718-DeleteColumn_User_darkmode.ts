import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteColumnUserDarkmode1611990521718 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user", "darkMode");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
