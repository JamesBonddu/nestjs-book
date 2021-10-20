import { Module } from '@nestjs/common'
import { ProviderScopeDefaultService } from './provider-scope.default.service'
import { ProviderScopeRequestService } from './provider-scope.request.service'
import { ProviderScopeTransientService } from './provider-scope.transient.service'

@Module({
  providers: [
    ProviderScopeDefaultService,
    ProviderScopeRequestService,
    ProviderScopeTransientService
  ]
})
export class ProviderModule {}
