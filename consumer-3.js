const amqp = require ("amqplib")

async function connect (){
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result_instruction = await channel.assertQueue("instruction");
      
        channel.consume("instruction", message => {
            const content_msg = JSON.parse(message.content.toString());
            console.log(content_msg)
            // channel.ack(message);
        })

        const result_match_score = await channel.assertQueue("match_score");
      
        channel.consume("match_score", message => {
            const content_msg = JSON.parse(message.content.toString());
            console.log(content_msg)
            // channel.ack(message);
        })
        console.log("waiting for messages")
}

connect();
