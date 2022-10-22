const amqp = require ("amqplib")
const msg_instruction = {instruction: "Switch on the light"}
const msg_match_score = {match_score: "2 goals"}

async function connect (){
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        await channel.assertQueue("instruction");
        await channel.sendToQueue("instruction", Buffer.from(JSON.stringify(msg_instruction)));

        await channel.assertQueue("match_score");
        await channel.sendToQueue("match_score", Buffer.from(JSON.stringify(msg_match_score)));

        console.log(`Messages sent successfully`);
        await channel.close();
        await connection.close();
}

connect();


