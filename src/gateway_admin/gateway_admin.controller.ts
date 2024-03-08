import { Controller, Logger } from '@nestjs/common';
import { GatewayAdminService } from './gateway_admin.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { IGatewayAdmin } from './interface/create.gateway_admin.interface';

const ackErrors = ['E11000'];

@Controller('gateways-admin')
export class GatewayAdminController {

    constructor(private readonly appService: GatewayAdminService) { }

    logger = new Logger(GatewayAdminController.name);

    @EventPattern('create-gateway-admin')
    async createGatewayAdmin(
        @Payload() iData: IGatewayAdmin, @Ctx() context: RmqContext) {

            const channel = context.getChannelRef();
            const originalMsg = context.getMessage();

            this.logger.log(`data: ${JSON.stringify(iData)}`);

            try {
                await this.appService.createGatewayAdmin(iData);
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

    @EventPattern('update-gateway-admin')
    async updateGatewayAdmin(
        @Payload() data: any, @Ctx() context: RmqContext) {

            const channel = context.getChannelRef();
            const originalMsg = context.getMessage();

            this.logger.log(`data: ${JSON.stringify(data)}`);

            try {

                const _id: string = data._id
                const gatewayAdmin: IGatewayAdmin = data.gatewayAdmin;

                await this.appService.updateGatewayAdmin(_id,gatewayAdmin);
                await channel.ack(originalMsg);

            } catch (error) {

                this.logger.error(`error: ${JSON.stringify(error.message)}`);

                const filterAckError = ackErrors.filter(
                    ackError => error.message.includes(ackError),
                );

                if (filterAckError.length > 0) {
                    await channel.ack(originalMsg);
                }
            }
    
    }

    @MessagePattern('get-gateways-admin')
    async getGatewayAdmins() {
        return await this.appService.getGatewayAdmins();
    }

    @MessagePattern('get-gateway-admin-by-id')
    async getGatewayAdminById(_id: string) {
        return await this.appService.getGatewayAdminById(_id);
    }

    @MessagePattern('get-gateway-admin-by-code')
    async getGatewayAdminByCode(gateway: string) {
        return await this.appService.getGatewayAdminByCode(gateway);
    }


}
