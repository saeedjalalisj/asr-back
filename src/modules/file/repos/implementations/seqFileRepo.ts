import { IFileRepo } from "../fileRepo";
import {File} from "../../domain/file";
import {FileMap} from "../../mappers/FileMap";
// import { File }

export class FileRepo implements IFileRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    public async save(file: File): Promise<any> {
        try {
            const rawSeqFile = await FileMap.toPersistence(file);
            return await this.models.File.create(rawSeqFile);
        } catch (e) {
            throw new Error(e.toString());
        }
    }
}