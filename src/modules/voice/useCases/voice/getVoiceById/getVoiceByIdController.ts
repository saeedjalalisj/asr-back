import express from "express";
import {BaseController} from "../../../../../shared/infra/http/models/BaseController";
import {GetVoiceById} from "./getVoiceById";
import {DecodedExpressRequest} from "../../../../users/infra/http/models/decodedRequest";
import {GetVoiceByIdRequestDTO} from "./getVoiceByIdRequestDTO";

export class GetVoiceByIdController extends BaseController {
    private useCase: GetVoiceById;

    constructor(useCase: GetVoiceById) {
        super();
        this.useCase = useCase;
    }

    public async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
        const dto: GetVoiceByIdRequestDTO = {
            voiceId: req.params.id
        };

        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;

                switch (error.constructor) {
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            } else {
                const voice = result.value.getValue();
                return this.ok(res, voice);
            }
        } catch (e) {
            return this.fail(res, e)
        }
    }
}