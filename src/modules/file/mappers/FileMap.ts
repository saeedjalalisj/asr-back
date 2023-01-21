import {Mapper} from "../../../shared/infra/Mapper";
import {File} from "../domain/file";

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
}