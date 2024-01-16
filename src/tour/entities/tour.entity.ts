import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tour')
export class Tour {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public userId!: number;

  @Column('date')
  public tourDate!: Date;
}
