import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1705384623516 implements MigrationInterface {
    name = 'Migration1705384623516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tour\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tourname\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`seller\` (\`id\` int NOT NULL AUTO_INCREMENT, \`company\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`testmigration\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`seller\``);
        await queryRunner.query(`DROP TABLE \`tour\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
