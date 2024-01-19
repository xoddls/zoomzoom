import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('holidayRule')
export class HolidayRule {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('int')
  public month!: number;

  @Column('int')
  public week!: number;

  @Column('int')
  public date!: number;

  @Column('int')
  public day!: number;
}
