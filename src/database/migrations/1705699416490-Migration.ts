import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1705699416490 implements MigrationInterface {
    name = 'Migration1705699416490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reservation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`date\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`holidayRule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`month\` int NOT NULL, \`week\` int NOT NULL, \`date\` int NOT NULL, \`day\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cancleReservation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`date\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`holiday\` (\`id\` int NOT NULL AUTO_INCREMENT, \`holidayDate\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`holiday\``);
        await queryRunner.query(`DROP TABLE \`cancleReservation\``);
        await queryRunner.query(`DROP TABLE \`holidayRule\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`reservation\``);
    }

}
