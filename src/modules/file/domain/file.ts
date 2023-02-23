import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import {FileId} from "./fileId";
import {Result} from "../../../shared/core/Result";
import {Guard, IGuardArgument} from "../../../shared/core/Guard";

export interface FileProps {
    size: number;
    filepath: string;
    originalFilename: string | null;
    newFilename: string | null;
    mimetype: string | null;
    mtime: Date | null;
}

export class File extends AggregateRoot<FileProps> {

    get fileId(): FileId {
        return FileId.create(this._id).getValue();
    }
    get size(): number {
        return this.props.size;
    }

    get filepath(): string {
        return this.props.filepath;
    }

    get originalFilename(): (string | null) {
        return this.props.originalFilename;
    }

    get newFilename(): (string | null) {
        return this.props.newFilename;
    }

    get mimetype(): (string | null) {
        return this.props.mimetype;
    }

    get mtime(): (Date | null) {
        return this.props.mtime;
    }

    constructor(props: FileProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: FileProps, id?: UniqueEntityID): Result<File> {
        const guardArgs: IGuardArgument[] = [
            { argument: props.filepath, argumentName: 'filepath' },
            { argument: props.size, argumentName: 'size' }
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);
        if (guardResult.isFailure) {
            return Result.fail<File>(guardResult.getErrorValue());
        }
        const defaultValues: FileProps = {
            ...props,
        };
        // const isNewFile = !!id === false;
        const file = new File(defaultValues, id);
        return Result.ok<File>(file);
    }
}