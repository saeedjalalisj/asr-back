import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";

export interface CreateFileDto {
    size: number;
    filepath: string;
    originalFilename: string | null;
    newFilename: string | null;
    mimetype: string | null;
    mtime: Date | null;
}

export interface CreateFileDTOResponse {
    id: UniqueEntityID;
}