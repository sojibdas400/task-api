import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TasksEntity } from 'src/modules/tasks/entities/tasks.entity';

@Entity('userEntity')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @OneToMany(() => TasksEntity, (task) => task.user, { eager: true })
  tasks: TasksEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
