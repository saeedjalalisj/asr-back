import {UseCase} from "../../../../../shared/core/UseCase";
import {Either, left, Result, right} from "../../../../../shared/core/Result";
import {AppError} from "../../../../../shared/core/AppError";
import {Voice} from "../../../domain/voice";
import {IVoiceRepo} from "../../../repos/voiceRepo";
import {GetVoiceListRequestDTO} from "./getVoiceListRequestDTO";

type Response = Either<
    AppError.UnexpectedError,
    Result<Voice[]> | Result<any>
    >

export class GetVoiceList implements UseCase<GetVoiceListRequestDTO, Promise<Response>> {
    private voiceRepo: IVoiceRepo;

    constructor(voiceRepo: IVoiceRepo) {
        this.voiceRepo = voiceRepo;
    }

    public async execute(request: GetVoiceListRequestDTO): Promise<Response> {
        try {
            const { page, offset } = request;
            const voices = await this.voiceRepo.getVoiceList(page, offset);
            return right(Result.ok<Voice[]>(voices));
        } catch (e) {
            return left(new AppError.UnexpectedError(e));
        }
    }
}