import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { GatewaySchema } from './intefaces/gateway.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Gateway', schema: GatewaySchema}])],
  providers: [GatewayService],
  controllers: [GatewayController]
})
export class GatewaysModule {}
