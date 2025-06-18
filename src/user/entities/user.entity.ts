import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rol } from '../../rol/entities/rol.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  lastname: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({
    name: 'salt',
    type: 'varchar',
    comment: 'Salt utilizado para cifrado de la contraseña',
    length: 128,
  })
  salt: string;

  @Column({ type: 'varchar', length: 10 })
  phone: string;

  @Column({
    name: 'registration_day',
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  registrationDay: Date;

  @Column({
    name: 'last_login',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora del último inicio de sesión',
  })
  lastLogin: Date;
}
