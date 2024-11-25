import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getUnixTime } from 'date-fns';
import { PrismaService } from 'nestjs-prisma';
import { pbkdf2, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  private readonly host = 'biz-dev-backend';

  async getSalt(size = 16) {
    const buffetSalt = await promisify(randomBytes)(size);
    return buffetSalt.toString('hex');
  }

  async verifyPassword(password: string, hashPassword: string) {
    const derivedKey = await promisify(pbkdf2)(
      password,
      'passwordSalt',
      10000,
      64,
      'sha512',
    );
    return derivedKey.toString('hex') === hashPassword;
  }

  async hashPassword(param: { password: string }) {
    const derivedKey = await promisify(pbkdf2)(
      param.password,
      'passwordSalt',
      10000,
      64,
      'sha512',
    );
    return derivedKey.toString('hex');
  }

  async signUp(param: { userId: string; empNo: string; password: string }) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        loginInfo: {
          userId: param.userId,
          empNo: param.empNo,
        },
      },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await this.prismaService.user.create({
      data: {
        userId: param.userId,
        empNo: param.empNo,
        password: await this.hashPassword({ password: param.password }),
      },
    });

    return user;
  }

  async generateAccessToken(loginInfo: { userId: string; empNo: string }) {
    const accessToken = await this.jwtService.signAsync({
      sub: loginInfo.userId,
      empno: loginInfo.empNo,
      iss: this.host,
      iat: getUnixTime(new Date()),
      exp: getUnixTime(new Date()) + 60 * 60 * 24 * 7, // 1 week,
      type: 'access',
      maxAge: 60 * 60 * 24 * 7,
    });

    return accessToken;
  }

  async validateToken(serializedToken: string) {
    const decoded = await this.jwtService.verifyAsync(serializedToken, {
      issuer: this.host,
    });

    return decoded;
  }

  async authenticate(serializedAccessToken: string) {
    const decodedToken = await this.validateToken(serializedAccessToken);
    if (decodedToken.type !== 'access') {
      throw new Error('Invalid token type');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        loginInfo: {
          userId: decodedToken.sub,
          empNo: decodedToken.empno,
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async signIn(param: { userId: string; empNo: string; password: string }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        loginInfo: {
          userId: param.userId,
          empNo: param.empNo,
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await this.verifyPassword(
      param.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const accessToken = await this.generateAccessToken({
      userId: user.userId,
      empNo: user.empNo,
    });

    return { accessToken };
  }
}
