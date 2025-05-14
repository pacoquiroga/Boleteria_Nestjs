import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthToken } from './types.d/auth.interface';
import { firstValueFrom } from 'rxjs';
import { RolService } from 'src/rol/rol.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private rolService: RolService,
        private jwtService: JwtService,
    ) { }

    async signup(userCreateDto: CreateUserDto): Promise<AuthToken> {
        const user = await this.userService.create(userCreateDto);
        const payload = { sub: user.idUser, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.idUser,
                username: user.username,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                rol: userCreateDto.rol,
            },
        };
    }
}
