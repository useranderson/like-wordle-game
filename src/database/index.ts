import words from "./words";

export const getWordById = async (id: number) => words.find((word) => word.id === id);

export const getRandomWord = async () =>
  words[Math.floor(Math.random() * words.length)];

export const getWordByKeys = async (keys: string) => words.find((w) => w.word === keys)
