import { Controller, Logger } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ISensorData } from './interfaces/sensor-data.interface';

const ackErrors = ['E11000'];

@Controller()
export class SensorDataController {

    constructor(private readonly appService: SensorDataService) { }

    logger = new Logger(SensorDataController.name);

    @EventPattern('create-sensor-data')
    async createSensorData(
        @Payload() sensorData: ISensorData, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        this.logger.log(`data: ${JSON.stringify(sensorData)}`);

        try {

            await this.appService.createSensorData(sensorData);
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

    @MessagePattern('get-sensor-data-by-id')
    async findSensorDataById(@Payload() sensorId: string) {
        return await this.appService.findSensorDataById(sensorId);
    }

}

