import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cancleReservation')
export class CancleReservation {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('int')
  public userId!: number;

  @Column('date')
  public date!: string;
}
