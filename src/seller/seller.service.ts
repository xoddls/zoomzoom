import { Injectable } from '@nestjs/common';

@Injectable()
export class SellerService {
  sellerApproveReservations(): string {
    return 'add reervation';
  }

  setHoliday(): string {
    return 'add holiday';
  }

  checkReservation(): string {
    return 'check Reservation'
  }
}
