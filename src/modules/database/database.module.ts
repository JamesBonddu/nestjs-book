import { Module } from '@nestjs/common'
import type { DynamicModule } from '@nestjs/common'

@Module({
  providers: []
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [],
      exports: []
    }
  }
}

// 对比 typeorm 的 TypeOrmModule.forRoot 实现
