import { Controller, Post, Req, Logger, Inject } from '@nestjs/common';
import { pipeline } from 'stream';
import { createGunzip } from 'zlib';
import { Request } from 'express';
import * as tar from 'tar-fs';

@Controller('/blog')
export class BlogController {
  private logger: Logger = new Logger(BlogController.name);

  @Post('/upload')
  recvUploadBlog(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      pipeline(
        req,
        createGunzip(),
        tar.extract(process.env.BLOG_LOCATION),
        err => {
          if (err) {
            this.logger.error(err);
            reject('error');
          }
          this.logger.log('Done upload blog');
          resolve('Done');
        },
      );
    });
  }
}
