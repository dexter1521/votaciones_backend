import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MagistradosModule } from './magistrados/magistrados.module';
import { PlenosModule } from './plenos/plenos.module';
import { PuntosModule } from './puntos/puntos.module';
import { VotosModule } from './votos/votos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', // compatible con MariaDB
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false, // seguridad: no tocar tablas ya creadas
      }),
      inject: [ConfigService],
    }),
    UsuariosModule,
    AuthModule,
    MagistradosModule,
    PlenosModule,
    PuntosModule,
    VotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
