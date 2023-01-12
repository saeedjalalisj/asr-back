import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";

interface VoiceFilePathProps {
    filePath: string
}

export class VoiceFilePath extends ValueObject<VoiceFilePathProps> {
    get value (): string {
        return this.props.filePath;
    }

    private constructor (props: VoiceFilePathProps) {
        super(props);
    }
    
    public create(props: VoiceFilePathProps): Result<VoiceFilePath> {
        return Result.ok<VoiceFilePath>(new VoiceFilePath(props));
    }
}