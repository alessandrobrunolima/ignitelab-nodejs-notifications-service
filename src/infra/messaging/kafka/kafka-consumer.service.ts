import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['arriving-bonefish-9788-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'YXJyaXZpbmctYm9uZWZpc2gtOTc4OCRnuBILnr80Yc3--MbeUoPQ_GuMV0E_kRc',
          password:
            'db3svvLoi7ho5dKj84ie9eDGIT1VCpz6q9xvf1cASLkjbOIsrW-KEGwfVBy2DR-mLGKOUw==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
