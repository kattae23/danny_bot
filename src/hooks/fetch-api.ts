import { Message } from 'discord.js';

export const fetchImage = async (
  url: string,
  message: Message<boolean>,
  content: string,
) => {
  const data = await fetch(url);

  const buffer = await data.arrayBuffer();
  const imageBuffer = Buffer.from(buffer);

  await message.reply({
    content,
    files: [{ attachment: imageBuffer, name: 'gato.jpg' }],
  });
};

export const fetchGiphyImage = async (
  url: string,
  message: Message<boolean>,
  content: string,
  limit: number,
  gifs: string[],
) => {
  if (
    message.content
      .toLocaleLowerCase()
      .split(' ')
      .some((gif) => gifs.includes(gif))
  ) {
    const newMessage = message.content.slice(5).trim();
    const resp = await fetch(url + `&q=${newMessage}&limit=${limit}`);

    const { data } = await resp.json();

    const randomNumber = Math.floor(Math.random() * limit) + 1;

    const {
      type,
      slug,
      images: {
        downsized_medium: { mp4: downsizedMediumUrl },
      },
    } = data[randomNumber];

    const imageData = await fetch(downsizedMediumUrl);

    const buffer = await imageData.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    await message.reply({
      content,
      files: [{ attachment: imageBuffer, name: `${slug}.${type}` }],
    });
  }
};

export const fetchInsults = async (
  url: string,
  message: Message<boolean>,
  insults: string[],
  content: string | null,
) => {
  if (
    message.content
      .toLocaleLowerCase()
      .split(' ')
      .some((insult) => insults.includes(insult))
  ) {
    const resp = await fetch(url);

    const insult = await resp.text();

    await message.reply(`${content ?? content + ' '}${insult}`);
  }
};
