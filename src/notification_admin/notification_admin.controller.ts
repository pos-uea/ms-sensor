import { Controller, Logger } from '@nestjs/common';
import { NotificationAdminService } from './notification_admin.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { INotificationAdmin } from './interfaces/notification_admin.interfaces';

const ackErrors = ['E11000'];

@Controller('notification-admin')
export class NotificationAdminController {

    constructor(private readonly appService: NotificationAdminService) { }

    logger = new Logger(NotificationAdminController.name);

    @EventPattern('create-notification-admin')
    async createNotificationAdmin(
        @Payload() iData: INotificationAdmin, @Ctx() context: RmqContext) {

            const channel = context.getChannelRef();
            const originalMsg = context.getMessage();

            this.logger.log(`data: ${JSON.stringify(iData)}`);

            try {
                await this.appService.createNotificationAdmin(iData);
                await channel.ack(originalMsg);

            } catch (error) {

                // await channel.ack(originalMsg);

                this.logger.error(`error: ${JSON.stringify(error.message)}`);

                const filterAckError = ackErrors.filter(
                    ackError => error.message.includes(ackError),
                );

                if (filterAckError.length > 0) {
                    await channel.ack(originalMsg);
                }
            }
    
    }

    @MessagePattern('get-notifications-admin')
    async getAllNotificationAdmin(@Payload() empty: string, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {
            return await this.appService.getAllNotificationAdmin();
        } finally {
            await channel.ack(originalMsg);
        }

    }

    @MessagePattern('get-notification-admin-by-sensor-id')
    async getNotificationAdminBySensorId(
        @Payload() sensorId: string, @Ctx() context: RmqContext) {

            const channel = context.getChannelRef()
            const originalMsg = context.getMessage()
    
            try {
                return await this.appService.getNotificationAdminBySensorId(sensorId);
            } finally {
                await channel.ack(originalMsg);
            }
    
    }

    @EventPattern('update-notification-admin')
    async updateNotificationAdmin(
        @Payload() iData: any, @Ctx() context: RmqContext) {

            const channel = context.getChannelRef();
            const originalMsg = context.getMessage();

            this.logger.log(`data: ${JSON.stringify(iData)}`);

            try {
                const _id: string = iData._id
                const notification: INotificationAdmin = iData.notification;

                await this.appService.updateNotificationAdmin(_id,notification);
                await channel.ack(originalMsg);

            } catch (error) {

                // await channel.ack(originalMsg);

                this.logger.error(`error: ${JSON.stringify(error.message)}`);

                const filterAckError = ackErrors.filter(
                    ackError => error.message.includes(ackError),
                );

                if (filterAckError.length > 0) {
                    await channel.ack(originalMsg);
                }
            }
    
    }

}
