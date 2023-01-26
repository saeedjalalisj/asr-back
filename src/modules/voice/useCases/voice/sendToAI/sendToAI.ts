import * as crypto from "crypto";
import {UseCase} from "../../../../../shared/core/UseCase";
import {SendToAIDTO} from "./sendToAIDTO";
import {Either, Result, right} from "../../../../../shared/core/Result";
import {AppError} from "../../../../../shared/core/AppError";
import {IFileRepo} from "../../../../file/repos/fileRepo";
import {Rabbitmq} from "../../../../../shared/infra/messageBroker/rabbitmq";

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
            const file = await this.fileRepo.findById(fileId);
            const rabbit = await Rabbitmq.getInstance();
            const correlationId = crypto.randomUUID();
            await rabbit.sendMessage({
                filePath: file.filepath,
                language
            }, correlationId);
            rabbit.channel.responseEmitter.on("data", (msg) => {
                if (msg.properties.correlationId === correlationId) {
                    //TODO: save response to result
                    console.log({correlationIdINNNNNNN:correlationId})
                }
            });
            return right(Result.ok<any>("ok"));
        } catch (e) {
            console.log("error", e)
        }
    }
}