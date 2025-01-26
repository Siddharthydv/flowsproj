import dotenv from 'dotenv'
dotenv.config();
import { PrismaClient } from "@prisma/client";
import {Kafka} from "kafkajs";

const TOPIC_NAME = "zap-events"
const KAFKA_URL=process.env.KAFKA_URL as string
const client = new PrismaClient();
console.log(KAFKA_URL)
//const kafka = new Kafka({
//    clientId: 'outbox-processor',
//    brokers: [KAFKA_URL]
//})
const kafkaclient= new Kafka({
  clientId: 'ccloud-nodejs-client-c394a163-4d7d-4c47-8b8c-b1e186d7f1b7',
      brokers: ['pkc-41p56.asia-south1.gcp.confluent.cloud:9092'],
      sasl: {
          mechanism: 'plain',
          username: 'FNK7MWNVCIUR3T7L', // Replace with your actual SASL username
          password: 'Icjh1hQJ+RdeJVB0By/YEeuoEyyISSMtMiK246uaTJVFVq+j/hsL+8jukYXwL0tT' // Replace with your actual SASL password
      },
      ssl: true
  //}, // Replace with your client ID
  

});
//console.log(kafka)
async function main() {
    const producer =  kafkaclient.producer();
    await producer.connect();

    while(1) {
        const pendingRows = await client.zapRunOutbox.findMany({
            where :{},
            take: 10
        })
        console.log(pendingRows);

        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map(r => {
                return {
                    value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 })
                }
            })
        })  

        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(x => x.id)
                }
            }
        })

        await new Promise(r => setTimeout(r, 3000));
    }
}

main();
