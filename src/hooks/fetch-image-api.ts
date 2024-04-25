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
) => {
  const resp = await fetch(url);

  const { data } = await resp.json();

  const {
    type,
    slug,
    images: {
      downsized_medium: { url: downsizedMediumUrl },
    },
  } = data[0];

  const imageData = await fetch(downsizedMediumUrl);

  const buffer = await imageData.arrayBuffer();
  const imageBuffer = Buffer.from(buffer);

  await message.reply({
    content,
    files: [{ attachment: imageBuffer, name: `${slug}.${type}` }],
  });
};
