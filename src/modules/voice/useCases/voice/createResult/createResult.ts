import {UseCase} from "../../../../../shared/core/UseCase";
import {CreateResultDTO} from "./createResultDTO";
import {Either, left, Result, right } from "../../../../../shared/core/Result";
import {AppError} from "../../../../../shared/core/AppError";
import {IVoiceResultRepo} from "../../../repos/voiceResultRepo";
import {VoiceResultRepo} from "../../../repos/implementations/seqVoiceResultRepo";
import {ResultText} from "../../../domain/resultText";
import { Result as VoiceResult } from "../../../domain/result";
import {ResultGender} from "../../../domain/resultGender";

type Response = Either<
    Result<any>|
    AppError.UnexpectedError,
    Result<void>
    >

export class CreateResult implements UseCase<CreateResultDTO, Promise<Response>> {
    private voiceResultRepo: IVoiceResultRepo;
    constructor(voiceResultRepo: VoiceResultRepo) {
        this.voiceResultRepo = voiceResultRepo;
    }

    public async execute(request: CreateResultDTO): Promise<Response> {
        try {
            const textOrError = ResultText.create({value: request.text});
            if (textOrError.isFailure) {
                return left(textOrError);
            }
            const text :ResultText = textOrError.getValue();
            const voiceResultProps: { voiceId: any; gender: ResultGender; text: ResultText } = {
                text,
                gender: request.gender,
                voiceId: request.voiceId
            };
            const resultOrError = VoiceResult.create(voiceResultProps);
            if (resultOrError.isFailure) {
                return left(resultOrError);
            }
            const result: VoiceResult = resultOrError.getValue();
            const voiceResult = await this.voiceResultRepo.save(result);
            return right(Result.ok<void>(voiceResult))
        } catch (e) {
            console.log("error:", e)
        }
    }
}