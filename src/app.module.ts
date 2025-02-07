import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './modules/auth/auth.controller';
import config from './config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.databaseUrl,
      synchronize: true,
      logging: true,
      autoLoadEntities: true
    }),
    JwtModule.register({
      global: true,
      secret: config.jwtSecret || 'defaultSecretKey',
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule { }
