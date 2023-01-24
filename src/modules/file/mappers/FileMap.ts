import {Mapper} from "../../../shared/infra/Mapper";
import {File} from "../domain/file";
import {UniqueEntityID} from "../../../shared/domain/UniqueEntityID";

export class FileMap implements Mapper<File> {
    public static toPersistence(file: File): any {
        return {
            file_id: file.fileId.id.toString(),
            meta_data: {
                size: file.size,
                originalFilename: file.originalFilename,
                newFilename: file.newFilename,
                mimetype: file.mimetype,
                mtime: file.mtime
            },
            path: file.filepath,
            updatedAt: new Date().toString(),
        }
    }

    public static toDomain(rawFile: any): File {
        const fileOrError = File.create({
            size: rawFile.meta_data.size,
            filepath: rawFile.path,
            originalFilename: rawFile.meta_data.originalFilename,
            newFilename: rawFile.meta_data.newFilename,
            mimetype: rawFile.meta_data.mimetype,
            mtime: rawFile.meta_data.mtime,
        }, new UniqueEntityID(rawFile.file_id));
        return fileOrError.isSuccess ? fileOrError.getValue() : null;
    }
}