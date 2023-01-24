import {UseCase} from "../../../../../shared/core/UseCase";
import {SendToAIDTO} from "./sendToAIDTO";
import {Either, Result, right} from "../../../../../shared/core/Result";
import {AppError} from "../../../../../shared/core/AppError";
import {IFileRepo} from "../../../../file/repos/fileRepo";

type Response = Either<
   AppError.UnexpectedError,
   Result<any>
>

export class SendToAI implements UseCase<SendToAIDTO,Promise<Response>> {
    private fileRepo: IFileRepo;
    constructor(fileRepo: IFileRepo) {
        this.fileRepo = fileRepo;
    }

    public async execute(response: SendToAIDTO): Promise<Response> {
        try {
            const { language, fileId } = response;
            console.log({ language, fileId });
            const file = await this.fileRepo.findById(fileId);
            console.log({file});
            // TODO: send to rabbitmq
            return right(Result.ok<any>("ok"));
        } catch (e) {
            console.log("error", e)
        }
    }
}