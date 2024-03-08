import { Controller, Logger } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { IGateway } from './intefaces/gateway.interface';

const ackErrors = ['E11000'];

@Controller('gateways')
export class GatewayController {

    constructor(private readonly appService: GatewayService) { }

    logger = new Logger(GatewayController.name);

    @EventPattern('create-gateway')
    async createGateway(    
        @Payload() iData: IGateway, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        this.logger.log(`data: ${JSON.stringify(iData)}`);

        try {
            await this.appService.createGateway(iData);
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

    @EventPattern('update-gateway')
    async updateGateway(
        @Payload() data: any, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        this.logger.log(`data: ${JSON.stringify(data)}`);

        try {

            const _id: string = data._id
            const gateway: IGateway = data.gateway;

            await this.appService.updateGateway(_id, gateway);
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

    @MessagePattern('get-all-gateways')
    async getAllGateways(
        @Payload() empty: string, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage();

        try {
            const result = await this.appService.getAllGateways();
            await channel.ack(originalMsg);
            return result;

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

    @MessagePattern('get-gateway-by-id')
    async getGatewayById(
        @Payload() _id: string, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage();

        try {
            const result = await this.appService.getGatewayById(_id);
            await channel.ack(originalMsg);
            return result;

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

    @MessagePattern('get-gateway-by-code')
    async getGatewayByCode(
        @Payload() code: string, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage();

        try {
            const result = await this.appService.getGatewayByCode(code);
            await channel.ack(originalMsg);
            return result;

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
}
    
