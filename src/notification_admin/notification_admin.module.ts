import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationAdminSchema } from './interfaces/notification_admin.schema';
import { NotificationAdminService } from './notification_admin.service';
import { NotificationAdminController } from './notification_admin.controller';


@Module({
    imports: [MongooseModule.forFeature([{name: 'Notification_admin', schema: NotificationAdminSchema}])],
    providers: [NotificationAdminService],
    controllers: [NotificationAdminController]
  })

  export class NotificationAdminModule {}