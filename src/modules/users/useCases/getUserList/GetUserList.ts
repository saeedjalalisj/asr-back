import {UseCase} from "../../../../shared/core/UseCase";
import {GetUserListDTO} from "./GetUserListDTO";
import {Either, left, Result, right} from "../../../../shared/core/Result";
import {AppError} from "../../../../shared/core/AppError";
import {User} from "../../domain/user";
import {IUserRepo} from "../../repos/userRepo";


type Response = Either<
    AppError.UnexpectedError,
    Result<User[]>
>

export class GetUserList implements UseCase<GetUserListDTO, Promise<Response>> {
    private userRepo: IUserRepo;

    constructor (userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    public async execute (request:GetUserListDTO): Promise<Response> {
        try {
            const { page, count } = request;
            const users = await this.userRepo.getUserList(page, count);
            return right(Result.ok<User[]>(users));
        } catch (e) {
            return left(new AppError.UnexpectedError(e));
        }
    }
}