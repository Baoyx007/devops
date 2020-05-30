import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [ConfigModule.forRoot(), BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
