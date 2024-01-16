import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1705388748611 implements MigrationInterface {
    name = 'Migration1705388748611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`seller\` (\`id\` int NOT NULL AUTO_INCREMENT, \`company\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`testmigration\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Tour\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`tourDate\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`company\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`testmigration\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`reservation\``);
        await queryRunner.query(`DROP TABLE \`Tour\``);
        await queryRunner.query(`DROP TABLE \`seller\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
