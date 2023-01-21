import {File} from "../domain/file";

export interface IFileRepo {
    save(file: File): Promise<void>
}

