import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Rol } from '../../rol/entities/rol.entity';

@Entity('user_rol')
export class UserRol {
  @PrimaryGeneratedColumn({ name: 'id_user_rol' })
  idUserRol: number;
  
  @Column({ type: 'date', name: 'since' })
  since: Date;
  
  @Column({ type: 'date', name: 'until', nullable: true })
  until: Date;
  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;
  
  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;
}
