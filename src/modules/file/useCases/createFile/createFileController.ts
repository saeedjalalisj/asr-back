import {BaseController} from "../../../../shared/infra/http/models/BaseController";
import {CreateFile} from "./createFile";
import {DecodedExpressRequest} from "../../../users/infra/http/models/decodedRequest";
import {CreateFileDto, CreateFileDTOResponse} from "./createFileDto";

export class CreateFileController extends BaseController {
    private useCase: CreateFile;

    constructor(useCase: CreateFile) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
        const dto: CreateFileDto = {
            size: req.body?.files?.file?.size,
            filepath: req.body?.files?.file?.filepath,
            originalFilename: req.body?.files?.file?.originalFilename,
            newFilename: req.body?.files?.file?.newFilename,
            mimetype: req.body?.files?.file?.mimetype,
            mtime: req.body?.files?.file?.mtime,
        };
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                return this.fail(res, error.getErrorValue().message);
            }
            const dtos: CreateFileDTOResponse = result.value.getValue() as CreateFileDTOResponse;
            return this.ok(res,dtos);
        } catch (e) {
            return this.fail(res, e);
        }
    }
}