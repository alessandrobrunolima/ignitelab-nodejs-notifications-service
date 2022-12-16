import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-notification-producer',
    brokers: ['arriving-bonefish-9788-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'YXJyaXZpbmctYm9uZWZpc2gtOTc4OCRnuBILnr80Yc3--MbeUoPQ_GuMV0E_kRc',
      password:
        'db3svvLoi7ho5dKj84ie9eDGIT1VCpz6q9xvf1cASLkjbOIsrW-KEGwfVBy2DR-mLGKOUw==',
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
