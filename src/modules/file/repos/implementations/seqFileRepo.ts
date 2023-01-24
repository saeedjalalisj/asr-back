import { IFileRepo } from "../fileRepo";
import {File} from "../../domain/file";
import {FileMap} from "../../mappers/FileMap";


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

    public async findById(fileId:string): Promise<File> {
        try {
            const baseModel = this.models.File;
            const file = await baseModel.findOne({ where: { file_id: fileId } });
            if (!file) throw new Error("not found");
            return FileMap.toDomain(file);
        } catch (e) {
            throw new Error(e.toString());
        }
    }
}