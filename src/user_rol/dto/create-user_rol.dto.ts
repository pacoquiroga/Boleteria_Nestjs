import { IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateUserRolDto {
    @IsNotEmpty({ message: 'El nombre del rol es requerido' })
    @IsNumber({}, { message: 'El nombre del rol debe ser un string' })
    @Type(() => String)
    rolName: string;

    @IsNotEmpty({ message: 'El ID del usuario es requerido' })
    @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
    @Type(() => Number)
    id_user: number;

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
    @Transform(({ value }) => value ? value : new Date().toISOString())
    since: Date = new Date();

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
    until?: Date;
}
