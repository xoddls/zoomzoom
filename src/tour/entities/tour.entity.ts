import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tour')
export class TourEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('varchar')
  public tourname!: string;

  @Column('varchar')
  public location!: string;
}
