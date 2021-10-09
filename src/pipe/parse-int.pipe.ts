import type { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { BadRequestException, Injectable } from '@nestjs/common'

/**
 * 转换型管道
 */
@Injectable()
export class ParseIntPipe implements PipeTransform<string, Promise<number>> {
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed')
    }
    return Promise.resolve(val)
  }
}
