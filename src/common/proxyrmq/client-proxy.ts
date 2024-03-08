import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ClientProxyRadioFrequency {

    // private user = this.configService.get<string>('RMQ_USER')
    // private password = encodeURIComponent(this.configService.get<string>('RMQ_PASSWORD'))
    // private host = this.configService.get<string>('RMQ_URL')
    // private protocol = this.configService.get<string>('RMQ_PROTOCOLO')

    private user = process.env.RMQ_USER
    private password = encodeURIComponent(process.env.RMQ_PASSWORD)
    private host = process.env.RMQ_URL
    private protocol = process.env.RMQ_PROTOCOLO


    constructor(
        ) {}

    getClientProxyAdminUserInstance(): ClientProxy {

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                // urls: [`${this.protocol}://${this.user}:${this.password}@${this.host}`],
                urls: ["amqp://admin:admin@rabbitmq:5672/radiofrequencia"],
                queue: 'users'
            },
        })
    }

    getClientProxyDominioSensorsInstance(): ClientProxy {
      
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ["amqp://admin:admin@rabbitmq:5672/radiofrequencia"],
                noAck: false,
                queue: 'sensors'
            }
        })
    }

    getClientProxyDominioNotificationInstance(): ClientProxy {
      
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ["amqp://admin:admin@rabbitmq:5672/radiofrequencia"],
                queue: 'notifications'
            }
        })
    }
}