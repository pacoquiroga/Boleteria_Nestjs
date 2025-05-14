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
        private jwtService: JwtService,
    ){}

    async signup(userCreateDto: CreateUserDto): Promise<AuthToken> {
        const user = await this.userService.create(userCreateDto);


    }
}
