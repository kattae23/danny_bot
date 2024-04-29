import { Client, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { fetchGiphyImage, fetchImage, fetchInsults } from './hooks/fetch-api';
dotenv.config();

const OPTIONS = {
  GIPHY_URL: `${process.env.API_GIPHY_URL}?api_key=${process.env.GIPHY_KEY}`,
  ADJETIVE_URL: `${process.env.ADJETIVE_API_URL}`,
  INSULT_URL: `${process.env.INSULT_API_URL}`,
  INSULTS: ['puto', 'linda', 'puta', 'perra', 'pene', 'pipe'],
  KEYS: ['insultame', 'insult me', 'insúltame', 'insult', 'insu'],
  GIFS: ['giphy', 'gif'],
};

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

      await fetchGiphyImage(
        `${OPTIONS.GIPHY_URL}`,
        message,
        'Toma tu mierda',
        20,
        OPTIONS.GIFS,
      );

      await fetchInsults(
        `${OPTIONS.ADJETIVE_URL}`,
        message,
        OPTIONS.INSULTS,
        "Thank's",
      );

      await fetchInsults(`${OPTIONS.INSULT_URL}`, message, OPTIONS.KEYS, null);
    }
  } catch (error) {
    console.log(error);
    message.reply('ocurrió un error al mandar la imagen');
    message.reply(error);
  }
});

client.login(process.env.DISCORD_TOKEN);
