import { CreateFile } from "./createFile";
import { fileRepo } from "../../repos";
import {CreateFileController} from "./createFileController";
const createFile = new CreateFile(fileRepo);
const createFileController = new CreateFileController(createFile);

export {
    createFile,
    createFileController
}