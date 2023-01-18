import * as express from 'express'
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { TextUtils } from "../../../../../shared/utils/TextUtils";
import {CreateVoice} from "./createVoice";
import {CreateVoiceDto} from "./createVoiceDto";

export class CreateVoiceController extends BaseController {
    private useCase: CreateVoice;

    constructor (useCase: CreateVoice) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
        const { userId } = req.decoded;
        const dto: CreateVoiceDto = {
            title: TextUtils.sanitize(req.body.title),
            file_path: req.body.file_path,
            userId
        }
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                return this.fail(res, error.getErrorValue());
            }
            return this.ok(res);
        } catch (e) {
            return this.fail(res, e)
        }
    }
}