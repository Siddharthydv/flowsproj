
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

async function main() {
    await prismaClient.availableTrigger.create({
        data: {
            id: "webhook",
            name: "Webhook",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
            
        }
    })    

    await prismaClient.availableAction.create({
        data: {
            id: "slack",
            name: "update slack",
            image: "https://w7.pngwing.com/pngs/345/302/png-transparent-chat-slack-slack-logo-social-media-icon-thumbnail.png"
        }
    })

    await prismaClient.availableAction.create({
        data: {
            id: "email",
            name: "Send Email",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s"
        }
    })
    
}

main();