import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorDataSchema } from './sensor-data/interfaces/sensor-data.schema';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { ConfigModule } from '@nestjs/config';
import { SensorModule } from './sensor/sensor.module';
import { SensorSchema } from './sensor/interfaces/sensor.schema';
import { GatewaysModule } from './gateway/gateway.module';
import { GatewaySchema } from './gateway/intefaces/gateway.schema';
import { GatewayAdminModule } from './gateway_admin/gateway_admin.module';
import { NotificationAdminModule } from './notification_admin/notification_admin.module';

const password = encodeURIComponent("Jujutsu@2024");

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production':'.env.development',
      isGlobal: true
    }),
    MongooseModule.forRoot(`mongodb+srv://salomaocalheiros:${password}@cluster0.qpzlosd.mongodb.net/sensors?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: 'Sensor', schema: SensorSchema }]),
    MongooseModule.forFeature([{ name: 'Sensor_Data', schema: SensorDataSchema }]),
    MongooseModule.forFeature([{ name: 'Gateway', schema: GatewaySchema }]),
    SensorModule,
    SensorDataModule,
    GatewaysModule,
    GatewayAdminModule,
    NotificationAdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
