import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api/devops')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/blog')
  getHello(): string {
    return this.appService.getHello();
  }
}
