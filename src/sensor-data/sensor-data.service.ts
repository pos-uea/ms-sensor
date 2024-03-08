import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISensorData } from './interfaces/sensor-data.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SensorDataService {

  constructor(@InjectModel('Sensor_Data') private readonly appModel: Model<ISensorData>) { }

  private readonly logger = new Logger(SensorDataService.name);

  async createSensorData(sensorData: ISensorData): Promise<ISensorData> {

    try {
      const createdSensorData = new this.appModel(sensorData);
      return await createdSensorData.save();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async findSensorDataById(sensorId: string): Promise<ISensorData[]> {
    try {
      return await this.appModel.find({ sensor  : sensorId }).exec();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

}

