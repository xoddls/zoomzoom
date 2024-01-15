import { Injectable } from '@nestjs/common';

@Injectable()
export class TourService {
  create() {
    return 'This action adds a new tour';
  }

  findAll() {
    return `This action returns all tour`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tour`;
  }

  update(id: number) {
    return `This action updates a #${id} tour`;
  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }
}
