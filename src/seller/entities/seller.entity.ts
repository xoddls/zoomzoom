import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('seller')
export class SellerEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('varchar')
  public company!: string;

  @Column('varchar')
  public phone!: string;

  @Column('varchar')
  public testmigration!: string;
}
