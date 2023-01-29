import {BaseController} from "../../../../../shared/infra/http/models/BaseController";
import {GetVoiceList} from "./getVoiceList";
import {DecodedExpressRequest} from "../../../../users/infra/http/models/decodedRequest";
import express from "express";
import {GetVoiceListRequestDTO} from "./getVoiceListRequestDTO";
import {GetVoiceListResponseDTO} from "./getVoiceListResponseDTO";

export class GetVoiceListController extends BaseController{
    private useCase: GetVoiceList;

    constructor(useCase: GetVoiceList) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
        const dto: GetVoiceListRequestDTO = {
            offset: Number(req.query.offset),
            page: Number(req.query.page),
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
                const voices = result.value.getValue();
                return this.ok<GetVoiceListResponseDTO>(res, {
                    voices: voices
                })
            }
        } catch (e) {
            return this.fail(res, e)
        }
    }
}
