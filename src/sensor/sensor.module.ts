import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorService } from './sensor.service';
import { SensorSchema } from './interfaces/sensor.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Sensor', schema: SensorSchema}])],
  providers: [SensorService ],
  controllers: [SensorController]
})
export class SensorModule {}