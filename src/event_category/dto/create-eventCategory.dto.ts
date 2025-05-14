import { IsNotEmpty, IsString } from "class-validator";

export class CreateEventCategoryDto {
    @IsString({message: "El nombre de la categoría debe ser una cadena"})
    @IsNotEmpty({message: "El nombre de la categoría no puede estar vacío"})
    name: string;
}
