import { Injectable, Logger } from '@nestjs/common';
import { INotificationAdmin } from './interfaces/notification_admin.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class NotificationAdminService {

    constructor(@InjectModel('Notification_admin') private readonly appModel: Model<INotificationAdmin>) { }

    private readonly logger = new Logger(NotificationAdminService.name);

    async createNotificationAdmin(notificationAdmin: INotificationAdmin): Promise<INotificationAdmin> {
        try {
            const createdNotification = new this.appModel(notificationAdmin);
            return await createdNotification.save();
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }

    async getAllNotificationAdmin(): Promise<INotificationAdmin[]> {
        try {
            return await this.appModel.find().exec();
        }
        catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }

    async getNotificationAdminBySensorId(sensorId: string): Promise<INotificationAdmin> {
        try {
            return await this.appModel.findOne({ sensor: sensorId  }).exec();
        }
        catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }


    async updateNotificationAdmin(id: string, notificationAdmin: INotificationAdmin): Promise<INotificationAdmin> {
        try {
            return await this.appModel.findByIdAndUpdate(id, notificationAdmin).exec();
        }
        catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }


}
