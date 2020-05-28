import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { createGunzip } from 'zlib';
import * as tar from 'tar-fs';

@Controller('/api/devops')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/blog/upload')
  recvUploadBlog(@Req() req: Request): string {
    req.on('data', chunk => {
      console.log(chunk);
      console.log('req');
    });
    const gunzip = createGunzip();

    req.pipe(gunzip).pipe(tar.extract(process.env.BLOG_LOCATION));

    return this.appService.getHello();
  }
}
