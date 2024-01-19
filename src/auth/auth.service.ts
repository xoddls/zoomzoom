import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  generateToken(jwtPayload: JwtPayloadDto): string {
    const payload = {
      reservationId: jwtPayload.reservationId,
      userId: jwtPayload.userId,
      date: jwtPayload.date
    };
    const result = this.jwtService.sign(payload);
    return result;
  }

  async verifyToken(token: string): Promise<JwtPayloadDto> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}