import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayAdminSchema } from './interface/gateway_admin.schema';
import { GatewayAdminService } from './gateway_admin.service';
import { GatewayAdminController } from './gateway_admin.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Gateway_admin', schema: GatewayAdminSchema}])],
  providers: [GatewayAdminService],
  controllers: [GatewayAdminController]
})
export class GatewayAdminModule {}
