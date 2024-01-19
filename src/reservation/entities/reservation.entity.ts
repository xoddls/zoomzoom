import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservation')
export class Reservation {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('int')
  public userId!: number;

  @Column('date')
  public date!: string;
}
