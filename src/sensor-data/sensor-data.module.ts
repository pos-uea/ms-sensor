import { Module } from '@nestjs/common';
import { SensorDataController } from './sensor-data.controller';
import { SensorDataService } from './sensor-data.service';
import { SensorDataSchema } from './interfaces/sensor-data.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Sensor_Data', schema: SensorDataSchema}])],
  providers: 
  [
    SensorDataService,
  ],

  controllers: [SensorDataController]
})
export class SensorDataModule {}
