import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ length: 200 })
  firstName!: string;

  @Column({ nullable: true, length: 200 })
  lastName!: string;

  @Column({ length: 200 })
  password!: string;

  @Column({ unique: true, length: 200 })
  email!: string;

  @Column({ default: true })
  isActive!: boolean;
}
