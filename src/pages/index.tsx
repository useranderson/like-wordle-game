import React, { useEffect, useState } from "react";
import type { NextPage } from "next";

import type { Letter } from "./api/word";
import {
  LetterContainer,
  KeyBoard,
  PageContainer,
  SelectIndicator,
  Modal,
  LettersRows,
  Button,
  ErrorContainer,
} from "../components";
import { getData } from "../utils";

export const colors = {
  right: "bg-green-600",
  wrong: "bg-neutral-800",
  exists: "bg-yellow-600",
  unknow: "bg-neutral-700",
};

const Home: NextPage = () => {
  const [wordId, setWordId] = useState<number | undefined>(undefined);
  const [keys, setKeys] = useState<string[]>([]);
  const [previousAttempts, setPreviousAttempts] = useState<Letter[][]>([]);
  const [previousLetters, setPreviousLetters] = useState<Letter[]>([]);
  const [selectedInput, setSelectedInput] = useState(() => 0);
  const [error, setError] = useState("");

  useEffect(() => {
    handleReset({ keys: [] });
  }, [setWordId, setKeys]);

  const handleKeyClick = (newKey: string) => {
    setKeys((keys) =>
      keys.map((key, index) => (index === selectedInput ? newKey : key))
    );
    setSelectedInput((selected) =>
      selected < keys.length - 1 ? selected + 1 : selected
    );
  };

  const handleBackSpaceClick = () => {
    setKeys((keys) =>
      keys.map((key, index) => (index === selectedInput ? "" : key))
    );
    setSelectedInput((selected) => (selected > 0 ? selected - 1 : selected));
  };

  const addLetter = (letter: Letter) => {
    const findedLetter = previousLetters.find((l) => l?.key === letter?.key);
    if (!findedLetter) {
      return setPreviousLetters((letters) => [...letters, letter]);
    }

    if (findedLetter.status !== "wrong") {
      if (letter?.status === "right" && findedLetter.status === "exists") {
        return setPreviousLetters((letters) =>
          letters.map((l) =>
            l?.key === findedLetter.key ? { ...l, status: "right" } : l
          )
        );
      }
    }
  };

  const handleEnterClick = () => {
    if (!!keys.filter((key) => !key).length)
      return setError("Apenas palavras com 5 letras");

    setError("");

    getData({
      keys: keys.map((key) => key.toLocaleLowerCase()),
      wordId,
    }).then(({ data: responseData }) => {
      const { data, error } = responseData;

      if (error) return setError("Ops! Houve um erro");

      setPreviousAttempts((attempts) => [...attempts, data.letters]);
      setKeys((keys) => keys.map(() => ""));
      setSelectedInput(0);
      data.letters.map((letter: Letter) => addLetter(letter));
    });
  };

  const handleReset = ({
    keys,
    wordId,
  }: {
    keys: string[];
    wordId?: number;
  }) => {
    getData({ keys, wordId }).then(({ data: responseData }) => {
      const { data, error } = responseData;

      if (error) return null;

      setWordId(data.wordId);
      setPreviousAttempts([]);
      setSelectedInput(0);
      setKeys(data.letters.map(() => ``));
      setPreviousLetters([]);
    });
  };

  const emptyLines =
    previousAttempts.length < 5
      ? Array.from({ length: 5 - previousAttempts.length }, () => []).map(() =>
          Array.from({ length: keys.length }, () => null)
        )
      : [];

  const won =
    !!previousAttempts.length &&
    !previousAttempts[previousAttempts.length - 1].filter(
      (attempt) => attempt?.status !== "right"
    ).length;

  const lost = previousAttempts.length > 5;

  return (
    <PageContainer>
      {won && (
        <Modal data-cy="modal-won">
          <div className="text-4xl w-full mb-10">Parabéns</div>
          <LettersRows className="mb-10">
            {previousAttempts[previousAttempts.length - 1].map(
              (letter, letterIndex) => (
                <LetterContainer
                  key={letterIndex}
                  className={`${colors["right"]}`}
                >
                  {letter?.key.toUpperCase()}
                </LetterContainer>
              )
            )}
          </LettersRows>
          <Button
            data-cy="play-again"
            onClick={() => handleReset({ wordId, keys })}
          >
            Jogar Novamente
          </Button>
        </Modal>
      )}
      {!won && lost && (
        <Modal data-cy="modal-lost">
          <div className="text-4xl w-full mb-10">Perdeu</div>
          <Button
            data-cy="play-again"
            onClick={() => handleReset({ keys, wordId })}
          >
            Jogar Novamente
          </Button>
        </Modal>
      )}
      <main className="w-full h-full">
        <div className="flex flex-col h-full w-full items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-white p-2 w-full text-center">
              LIKE WORDLE
            </div>
            {error && <ErrorContainer>{error}</ErrorContainer>}
          </div>
          <div className="p-4">
            {previousAttempts.map((attempt, attemptIndex) => (
              <LettersRows key={attemptIndex}>
                {attempt.map((letter, letterIndex) => (
                  <LetterContainer
                    data-cy={`letter-container-${letter?.status}`}
                    key={letterIndex}
                    className={`${colors[letter?.status || "wrong"]}`}
                  >
                    {letter?.key.toUpperCase()}
                  </LetterContainer>
                ))}
              </LettersRows>
            ))}
            {previousAttempts.length < 6 && (
              <LettersRows>
                {keys.map((key, index) => (
                  <LetterContainer
                    key={index}
                    className={`${colors["unknow"]}`}
                  >
                    {index === selectedInput && <SelectIndicator />}
                    {key.toUpperCase()}
                  </LetterContainer>
                ))}
              </LettersRows>
            )}
            {emptyLines.map((attempt, index) => (
              <LettersRows key={index}>
                {attempt.map((_, lettersIndex) => (
                  <LetterContainer
                    key={lettersIndex}
                    className={`${colors["unknow"]}`}
                  ></LetterContainer>
                ))}
              </LettersRows>
            ))}
          </div>
          <KeyBoard
            previousLetters={previousLetters}
            handleBackSpaceClick={handleBackSpaceClick}
            handleEnterClick={handleEnterClick}
            handleKeyClick={handleKeyClick}
          />
        </div>
      </main>
    </PageContainer>
  );
};

export default Home;
