import {IsNotEmpty,  IsString} from "class-validator";
import { Agency } from "./agency.entity";

export class AgencyDto implements Partial<Agency>{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsString()
    range: string;
}