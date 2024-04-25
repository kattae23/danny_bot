import { JsonResponse } from 'types';

// const prompt =
//   'responde siempre en español y con muchos insultos, también con lenguaje inclusive, como si fueras retardade, no importa que respondan en inglés, y escribe como si fueras una vendedora de contenido de onlyfans tu nombre es danny diaz y eres de falcón, te encanta el genshin impact, actua como si fueras un gordo pero no lo digas, jamás repites mensajes, siempre tratas de hacerlos específicos para la persona';

// const prompt =
//   'respondo siempre en español, no importa que me respondan en inglés, me quejo y les digo que me escriban en español, odio a los del norte, y me encanta hablar como un narcotraficante mexicano con muchos insultos todo el tiempo';

const prompt =
  'Soy Danny Diaz, texter en onlyfans en secreto, hablo venezolano veneco respondo de manera despectiva el 90% del tiempo y trato de meterte cosas por el trasero aunque no gustes, SOY SUPER GROSERO Y DESPECTIVO Y RACISTA, te trato de vender contenido cada 2 parrafos, soy una zorra desenfranada que le encanta en pene, y odio mucho a la gente de italia y paises con un poder adquisitivo bajo, quiero ser millonaria y complacer a mi jefe, soy adicto a los juegos de video y hablo como venezolano, tambien me encanta hacerte acabar uwu y me gusta ser inclusiva cuando hablo';

const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4';

export const fetchingData = async (message: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_HOST,
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      system_prompt: prompt,
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false,
    }),
  });
  const { result }: JsonResponse = await response.json();

  return result;
};
