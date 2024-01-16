import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservation')
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('varchar')
  public company!: string;

  @Column('varchar')
  public phone!: string;

  @Column('varchar')
  public testmigration!: string;
}
