import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { UserSeed } from "../seed/user.seed";

export class dummyData1606205882260 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository('User').save(UserSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
