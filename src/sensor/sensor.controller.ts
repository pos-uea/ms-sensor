import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ISensor } from './interfaces/sensor.interface';
import { SensorService } from './sensor.service';

const ackErrors = ['E11000'];

@Controller()
export class SensorController {

    constructor(
        private readonly appService: SensorService
        ) { }

    logger = new Logger(SensorController.name);

    @EventPattern('create-sensor')
    async createSensor(
        @Payload() iData: ISensor, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        this.logger.log(`data: ${JSON.stringify(iData)}`);

        try {
            await this.appService.createSensor(iData);
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

    @EventPattern('update-sensor')
    async updateSensor(
        @Payload() data: any, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        this.logger.log(`data: ${JSON.stringify(data)}`);

        try {
            const _id: string = data._id
            const sensor: ISensor = data.sensor;

            await this.appService.updateSensor(_id, sensor);
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

    @MessagePattern('get-sensor-by-code')
    async getSensorByCode(@Payload() sensorCode: string, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {
            return await this.appService.getSensorByCode(sensorCode);
        } finally {
            await channel.ack(originalMsg);
        }

    }

    @MessagePattern('get-sensor-by-id')
    async getSensorById(@Payload() id: string, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {
            return await this.appService.getSensorById(id);
        } finally {
            await channel.ack(originalMsg);
        }

    }

    @MessagePattern('get-all-sensors')
    async getSensors(@Payload() empty: string, @Ctx() context: RmqContext) {
        
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {
            return await this.appService.findAllSensors();
            
        } finally {
            await channel.ack(originalMsg);
        }
        
    }

}

