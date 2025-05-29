import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthToken, LoginDto } from './types.d/auth.interface';
import * as bcrypt from 'bcryptjs';
import { RolService } from '../rol/rol.service';
import { UserRolService } from '../user_rol/user_rol.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private userRolService: UserRolService,
        private rolService: RolService,
        private jwtService: JwtService,
    ) { }

    async signup(userCreateDto: CreateUserDto): Promise<AuthToken> {
        const user = await this.userService.create(userCreateDto);
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                rol: userCreateDto.rol,
            },
        };
    }

    async login(userLoginDto: LoginDto): Promise<AuthToken> {
        const user = await this.userService.findByUsername(userLoginDto.username);

        if (user === null) {
            throw new NotFoundException('User not found');
        }

        const userRol = await this.userRolService.findUserRolByUserId(user.id);

        const rol = await this.rolService.findOne(userRol.rol.id);

        const isPasswordValid = await bcrypt.compare(
            user.salt + userLoginDto.password,
            user.password,
        );
        Logger.log(
            `Comparing password for user ${user.username}: ${isPasswordValid}`,
            'AuthService',
        );

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const payload = { sub: user.id, username: user.username };
        await this.userService.update(user.id, { lastLogin: new Date() });

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                rol: rol.rolName,
            },
        };
    }
}
