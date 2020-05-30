import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { createGunzip } from 'zlib';
import * as tar from 'tar-fs';

@Controller('/api/devops')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/blog/upload')
  recvUploadBlog(@Req() req: Request) {
    // req.on('data', chunk => {
    //   console.log(chunk);
    //   console.log('req');
    // });

    return new Promise((resolve, reject) => {
      req
        .pipe(createGunzip())
        .pipe(tar.extract(process.env.BLOG_LOCATION, {}))
        .on('finish', () => {
          resolve('Done');
          console.log('Done');
        });
    });
  }
}
