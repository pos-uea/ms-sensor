import { Injectable, Logger } from '@nestjs/common';
import { IGateway } from './intefaces/gateway.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GatewayService {

    constructor(@InjectModel('Gateway') private readonly appModel: Model<IGateway>) { }

    private readonly logger = new Logger(GatewayService.name);

    async createGateway(gateway: IGateway): Promise<IGateway> {
        try {
            const createdGateway = new this.appModel(gateway);
            return await createdGateway.save();
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }

    async updateGateway(_id: string, gateway: IGateway): Promise<void> {
        try {
            await this.appModel.findOneAndUpdate({ _id: _id }, { $set: gateway }).exec();
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }

    async getGatewayById(_id: string): Promise<IGateway> {
        try {
            return await this.appModel.findOne( { _id: _id } ).exec();
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }

    async getGatewayByCode(code: string): Promise<IGateway> {
        try {
            return await this.appModel.findOne({ code: code }).exec();
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }

    async getAllGateways(): Promise<IGateway[]> {
        try {
            return await this.appModel.find().exec();
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }


}
