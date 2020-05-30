import { Controller, Post, Req } from '@nestjs/common';
import { pipeline } from 'stream';
import { createGunzip } from 'zlib';
import { Request } from 'express';
import * as tar from 'tar-fs';

@Controller('/blog')
export class BlogController {
  @Post('/upload')
  recvUploadBlog(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      pipeline(
        req,
        createGunzip(),
        tar.extract(process.env.BLOG_LOCATION),
        err => {
          if (err) {
            console.error(err);
            reject('error');
          }
          resolve('Done');
          console.log('Done');
        },
      );
    });
  }
}
