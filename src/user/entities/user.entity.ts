import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('varchar')
  public name!: string;

  @Column('varchar')
  public email!: string;
}
