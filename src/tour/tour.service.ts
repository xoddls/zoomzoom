import { Injectable } from '@nestjs/common';
import { Tour } from './entities/tour.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppDataSource } from '../../data-source';



@Injectable()
export class TourService {

  constructor(
    @InjectRepository(Tour) private tourRepo: Repository<Tour>,
  ) { }

  async autoApproveReservations(
    userId: number,
    date: Date
  ) {
    await AppDataSource.transaction(async (t) => {

      await t.query('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');

      const tour = await t.getRepository(Tour)
        .createQueryBuilder('tour')
        .where('tour.tourDate = :date', { date: date })
        .getMany()

      if (tour.length >= 5) {
        return 'over 5';
      } else {
        await t.save(Tour, {
          userId: userId,
          tourDate: date
        });
        return 'ok';
      }
    });
  }
}
