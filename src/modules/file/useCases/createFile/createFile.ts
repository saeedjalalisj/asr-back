import {UseCase} from "../../../../shared/core/UseCase";
import {IFileRepo} from "../../repos/fileRepo";
import {Either, left, Result, right} from "../../../../shared/core/Result";
import {AppError} from "../../../../shared/core/AppError";
import {CreateFileDto, CreateFileDTOResponse} from "./createFileDto";
import {File, FileProps} from "../../domain/file";
import {LoginDTOResponse} from "../../../users/useCases/login/LoginDTO";
import {CreateFileError} from "./createFileError";


type Response = Either<
    AppError.UnexpectedError,
    Result<CreateFileDTOResponse>
>
export class CreateFile implements UseCase<CreateFileDto, Promise<Response>> {
    private fileRepo: IFileRepo;

    constructor(fileRepo: IFileRepo) {
        this.fileRepo = fileRepo;
    }

    public async execute(request: CreateFileDto): Promise<Response> {
        try {
            const fileProps: FileProps = {
                size: request.size,
                filepath: request.filepath,
                originalFilename: request.originalFilename,
                newFilename: request.newFilename,
                mimetype: request.mimetype,
                mtime: request.mtime,
            }
            const fileOrError = File.create(fileProps)
            if (fileOrError.isFailure) {
                return left(new CreateFileError.CreateFileErrorUnexpected());
            }
            const file: File = fileOrError.getValue();
            await this.fileRepo.save(file);
            console.log()
            return right(Result.ok<CreateFileDTOResponse>({id: file.id}))
        } catch (e) {
            return left(new AppError.UnexpectedError(e));
        }
    }
}