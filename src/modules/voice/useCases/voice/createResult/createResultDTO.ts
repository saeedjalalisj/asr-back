import {ResultGender} from "../../../domain/resultGender";

export interface CreateResultDTO {
    voiceId: string;
    text: string;
    gender: ResultGender;
}