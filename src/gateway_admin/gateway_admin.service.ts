import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGatewayAdmin } from './interface/create.gateway_admin.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GatewayAdminService {

    constructor(@InjectModel('Gateway_admin') private readonly appModel: Model<IGatewayAdmin>) { }

    private readonly logger = new Logger(GatewayAdminService.name);

    async createGatewayAdmin(gatewayAdmin: IGatewayAdmin): Promise<IGatewayAdmin> {
        try {
            const createdGateway = new this.appModel(gatewayAdmin);
            return await createdGateway.save();
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }

    async getGatewayAdmins(): Promise<IGatewayAdmin[]> {
        try {
            return await this.appModel.find().exec();
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }

    async getGatewayAdminById(_id: string): Promise<IGatewayAdmin> {
        try {
            return await this.appModel.findOne({ _id:_id }).exec();
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }

    async getGatewayAdminByCode(gateway: string): Promise<IGatewayAdmin> {
        try {
            return await this.appModel.findOne({ gateway: gateway }).exec();
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }

    async updateGatewayAdmin(_id: string,gatewayAdmin: IGatewayAdmin): Promise<void> {
        try {
             await this.appModel.updateOne({ _id }, { $set: gatewayAdmin }).exec();
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }

}
