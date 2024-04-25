import { Client, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { fetchGiphyImage, fetchImage } from './hooks/fetch-image-api';
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
        await fetchImage('https://cataas.com/cat', message, 'Gaticoo');
      }

      if (message.content.toLocaleLowerCase().startsWith('giphy')) {
        const newMessage = message.content.slice(5);
        await fetchGiphyImage(
          `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=${newMessage}&limit=1`,
          message,
          'Toma tu mierda',
        );
      }
    }
  } catch (error) {
    console.log(error);
    message.reply('ocurrió un error al mandar la imagen');
    message.reply(error);
  }
});

client.login(process.env.DISCORD_TOKEN);
