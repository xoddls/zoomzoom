import { Injectable } from '@nestjs/common';

@Injectable()
export class SellerService {
  create() {
    return 'This action adds a new seller';
  }

  findAll() {
    return `This action returns all seller`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }

  update(id: number) {
    return `This action updates a #${id} seller`;
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }
}
