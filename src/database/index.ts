import words from "./words";

export const getWordById = (id: number) => words.find((word) => word.id === id);

export const getRandomWord = () =>
  words[Math.floor(Math.random() * words.length)];
