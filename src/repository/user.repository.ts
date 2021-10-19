import { EntityRepository, Repository } from "typeorm";
import { UserEntity} from "../entity/user.enity";
import { Request, Response } from "express";


@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async saveUserData(req: Request, res: Response) {
    let { username, useremail, userpassword } = req.body
    let checkIfUserExists = await this.createQueryBuilder("users")
        .select()
        .where("users.useremail = :useremail", {

    })

    }
}