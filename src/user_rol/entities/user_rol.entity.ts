import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Rol } from '../../rol/entities/rol.entity';

@Entity('user_rol')
export class UserRol {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'date', name: 'since' })
  since: Date;

  @Column({ type: 'date', name: 'until', nullable: true })
  until: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;
}
