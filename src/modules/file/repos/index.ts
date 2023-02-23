import models from "../../../shared/infra/database/sequelize/models";
import { FileRepo } from "./implementations/seqFileRepo";

const fileRepo = new FileRepo(models);

export {
    fileRepo
}