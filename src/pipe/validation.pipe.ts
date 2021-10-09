import type { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Validate } from 'class-validator'

// 最基本结构
// @Injectable()
// export class ValidationPipe implements PipeTransform {
//   async transform(value: any, metadata: ArgumentMetadata) {
//     return value
//   }
// }

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  // type 取值有 query body param custom
  async transform(value: any, { type, metatype, data }: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No data submitted')
    }

    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await Validate(object)
    if (errors.length) {
      // throw new BadRequestException('Validation failed')
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: this.buildError(errors)
        },
        HttpStatus.BAD_REQUEST
      )
    }
    return value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }

  private buildError(errors) {
    const result = {}
    errors.forEach(el => {
      const prop = el.property
      Object.entries(el.constraints).forEach(constraint => {
        result[prop + constraint[0]] = `${constraint[1]}`
      })
    })
    return result
  }
}
