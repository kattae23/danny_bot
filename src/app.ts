import { Client, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  try {
    if (message.author.bot) return;

    if (message.content && message.author.id !== client.user.id) {
      if (message.content.toLowerCase() === 'gato') {
        const data = await fetch('https://cataas.com/cat');

        const buffer = await data.arrayBuffer();
        const imageBuffer = Buffer.from(buffer);

        await message.reply({
          content: 'Gaticoo',
          files: [{ attachment: imageBuffer, name: 'gato.jpg' }],
        });
      }

      if (message.content.toLocaleLowerCase().startsWith('giphy')) {
        const newMessage = message.content.slice(5);

        const resp = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=${newMessage}&limit=1`,
        );

        const { data } = await resp.json();

        const {
          type,
          slug,
          images: {
            downsized_medium: { url },
          },
        } = data[0];

        const imageData = await fetch(url);

        const buffer = await imageData.arrayBuffer();
        const imageBuffer = Buffer.from(buffer);

        await message.reply({
          content: 'Toma tu mierda',
          files: [{ attachment: imageBuffer, name: `${slug}.${type}` }],
        });
      }
    }
  } catch (error) {
    console.log(error);
    message.reply('ocurrió un error al mandar la imagen');
    message.reply(error);
  }
});

client.login(process.env.DISCORD_TOKEN);
