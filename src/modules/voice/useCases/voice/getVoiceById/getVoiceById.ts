import {UseCase} from "../../../../../shared/core/UseCase";
import {Either, left, Result, right} from "../../../../../shared/core/Result";
import {AppError} from "../../../../../shared/core/AppError";
import {Voice} from "../../../domain/voice";
import {GetVoiceByIdRequestDTO} from "./getVoiceByIdRequestDTO";
import {IVoiceRepo} from "../../../repos/voiceRepo";

type Response = Either<
    AppError.UnexpectedError,
    Result<Voice> | Result<any>
    >

export class GetVoiceById implements UseCase<GetVoiceByIdRequestDTO, Promise<Response>>{
    private voiceRepo: IVoiceRepo;

    constructor(voiceRepo: IVoiceRepo) {
        this.voiceRepo = voiceRepo;
    }

    public async execute(request: GetVoiceByIdRequestDTO): Promise<Response> {
        try {
            const { voiceId } = request;
            const voice = await this.voiceRepo.getVoiceById(voiceId);
            return right(Result.ok<Voice>(voice));
        } catch (e) {
            return left(new AppError.UnexpectedError(e));
        }
    }
}