import { UseCase } from "../../../../../shared/core/UseCase";
import { IVoiceRepo } from "../../../repos/voiceRepo";
import {Either, Result, left, right, Left} from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { CreateVoiceErrors } from "./createVoiceError";
import {CreateVoiceDto} from "./createVoiceDto";
import {VoiceTitle} from "../../../domain/voiceTitle";
import {VoiceFilePath} from "../../../domain/voiceFilePath";
import {Voice, VoiceProps} from "../../../domain/voice";

type Response = Either<
    CreateVoiceErrors.UserDoesntExistError |
    AppError.UnexpectedError |
    Result<any>,
    Result<void>
>

export class CreateVoice implements UseCase<CreateVoiceDto, Promise<Response>> {
    private voiceRepo: IVoiceRepo;

    constructor(voiceRepo: IVoiceRepo) {
        this.voiceRepo = voiceRepo;
    }

    public async execute(request: CreateVoiceDto): Promise<Response> {
        let title: VoiceTitle;
        let filepath: VoiceFilePath;
        let voice: Voice;
        const { userId } = request;
        try {
            const titleOrError = VoiceTitle.create({ value: request.title });
            if (titleOrError.isFailure) {
                return left(titleOrError);
            }
            title = titleOrError.getValue();
            const filepathOrError = VoiceFilePath.create({ value: request.file_path });
            if (filepathOrError.isFailure) {
                return left(filepathOrError);
            }
            filepath = filepathOrError.getValue();
            const voiceProps: VoiceProps = {
                title,
                filePath: filepath,
                status: 'uploaded',
                result: null,
                userId
            };
            const voiceOrError = Voice.create(voiceProps);
            if (voiceOrError.isFailure) {
                return left(voiceOrError);
            }
            voice = voiceOrError.getValue();
            await this.voiceRepo.save(voice);
            return right(Result.ok<void>())
        } catch (e) {
            return left(new AppError.UnexpectedError(e))
        }
    }
}