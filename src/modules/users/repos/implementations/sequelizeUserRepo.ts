
import { IUserRepo } from "../userRepo";
import { UserName } from "../../domain/userName";
import { User } from "../../domain/user";
import { UserMap } from "../../mappers/userMap";
import { UserEmail } from "../../domain/userEmail";

export class SequelizeUserRepo implements IUserRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  async exists (userEmail: UserEmail): Promise<boolean> {
    const UserModel = this.models.User;
    const baseUser = await UserModel.findOne({
      where: {
        user_email: userEmail.value
      }
    });
    return !!baseUser === true;
  }

  async getUserByUserName (userName: UserName | string): Promise<User> {
    const UserModel = this.models.User;
    const baseUser = await UserModel.findOne({
      where: {
        username: userName instanceof UserName 
          ? (<UserName>userName).value 
          : userName
      }
    });
    if (!!baseUser === false) return null;
    return UserMap.toDomain(baseUser);
  }

  async getUserByUserId (userId: string): Promise<User> {
    const UserModel = this.models.User;
    const baseUser = await UserModel.findOne({
      where: {
        user_id: userId
      }
    });
    if (!!baseUser === false) throw new Error("User not found.")
    return UserMap.toDomain(baseUser);
  }

  async save (user: User): Promise<void> {
    const UserModel = this.models.User;
    const exists = await this.exists(user.email);
    
    if (!exists) {
      const rawSequelizeUser = await UserMap.toPersistence(user);
      await UserModel.create(rawSequelizeUser);
    }

    return;
  }
}