require('dotenv').config()

import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka } from "kafkajs";
import { parse } from "./parser";
import { sendEmail } from "./email";
import { sendSol } from "./solana";
import axios from "axios";

const prismaClient = new PrismaClient();
const TOPIC_NAME = "zap-events"
const KAFKA_URL=process.env.KAFKA_URL as string
console.log("KAFKA_URL",KAFKA_URL)
//const kafka = new Kafka({
//    clientId: 'outbox-processor-2',
//    brokers: [KAFKA_URL]
//})
const client= new Kafka({
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
async function main() {
    const consumer = client.consumer({ groupId: 'main-worker-2' });
    await consumer.connect();
    const producer =  client.producer();
    await producer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            partition,
            offset: message.offset,
            value: message.value?.toString(),
          })
          if (!message.value?.toString()) {
            return;
          }

          const parsedValue = JSON.parse(message.value?.toString());
          const zapRunId = parsedValue.zapRunId;
          const stage = parsedValue.stage;

          const zapRunDetails = await prismaClient.zapRun.findFirst({
            where: {
              id: zapRunId
            },
            include: {
              zap: {
                include: {
                  actions: {
                    include: {
                      type: true
                    }
                  }
                }
              },
            }
          });
          const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage);

          if (!currentAction) {
            console.log("Current action not found?");
            return;
          }

          const zapRunMetadata = zapRunDetails?.metadata as JsonObject;

          if (currentAction.type.id === "email") {
            const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);
            const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetadata);
            console.log(`Sending out email to ${to} body is ${body}`)
           await sendEmail(to, body);
          }

          // if (currentAction.type.id === "send-sol") {

          //   const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
          //   const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
          //   console.log(`Sending out SOL of ${amount} to address ${address}`);
          //   //await sendSol(address, amount);
          // }
          
          if(currentAction.type.id=== "slack"){
            // const hookurl=currentAction?.metadata as JsonObject?.hookUrl;
            console.log(currentAction?.metadata)
            const metadata=currentAction?.metadata as JsonObject
            const issuedata={
              issueTitle:(zapRunMetadata?.issue as {title:string,url:string})?.title,
              issueLink:(zapRunMetadata?.issue as {title:string,html_url:string})?.html_url,
              body:(zapRunMetadata?.comment as {body:string})?.body,
              OpenedBy:(zapRunMetadata?.issue as {user:{login:string}})?.user?.login
            }
            const payload={
              text:
               JSON.stringify( issuedata)
            }
            try{
           const repsonse= await axios.post(`${metadata?.hookUrl}`,payload,{ headers: {
              'Content-Type': 'application/json',
            }})
            console.log(repsonse)
          }catch(err){
            console.log(err)
          };
            // await axios.post(`${hookUrl}`,{})
          }
          await new Promise(r => setTimeout(r, 500));

          const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1; // 1
          console.log(lastStage);
          console.log(stage);
          if (lastStage !== stage) {
            console.log("pushing back to the queue")
            await producer.send({
              topic: TOPIC_NAME,
              messages: [{
                value: JSON.stringify({
                  stage: stage + 1,
                  zapRunId
                })
              }]
            })  
          }

          console.log("processing done");
          // 
          await consumer.commitOffsets([{
            topic: TOPIC_NAME,
            partition: partition,
            offset: (parseInt(message.offset) + 1).toString() // 5
          }])
        },
      })

}

main()

