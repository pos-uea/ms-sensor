import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { ISensor } from './interfaces/sensor.interface';


@Injectable()
export class SensorService {

  constructor(@InjectModel('Sensor') private readonly appModel: Model<ISensor>) { }

  private readonly logger = new Logger(SensorService.name);

  async createSensor(idata: ISensor): Promise<ISensor> {

    try {
      const model = new this.appModel(idata);
      return await model.save();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async updateSensor(_id: string, idata: ISensor): Promise<void> {
    try {

      await this.appModel.findOneAndUpdate({ _id: _id }, { $set: idata }).exec();

    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async getSensorByCode(sensorCode: string): Promise<ISensor> {
    try {
      
      return await this.appModel.findOne({ code: sensorCode }).exec();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async getSensorById(_id: string): Promise<ISensor> {
    try {
      return await this.appModel.findOne({ _id: _id }).exec();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async findAllSensors(): Promise<ISensor[]> {
    try {
      return await this.appModel.find().exec();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }
  
}

