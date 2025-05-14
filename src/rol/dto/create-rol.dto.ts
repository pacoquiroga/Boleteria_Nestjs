import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RoleType } from "../enums/enums";

export class CreateRolDto {
    @IsNotEmpty({ message: 'El rol es requerido' })
    @IsEnum(RoleType, {
        message: `El rol debe ser uno de los siguientes valores: ${Object.values(RoleType).join(', ')}`
    })
    rolName: RoleType;

    @IsString({ message: 'La descripción del rol debe ser un texto' })
    rolDescription: string;
}
