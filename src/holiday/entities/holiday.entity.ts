import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('holiday')
export class Holiday {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('date')
  public holidayDate!: string;
}
