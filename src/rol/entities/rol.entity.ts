import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn({ name: 'id_rol' })
  idRol: number;
  
  @Column({ type: 'varchar', length: 50, name: 'rol_name' })
  rolName: string;

  @Column({ type: 'varchar', length: 100, name: 'rol_description' })
  rolDescription: string;
  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;
}
