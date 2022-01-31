// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { getRandomWord, getWordById } from "../../database";

type LetterStatus = "right" | "exists" | "wrong" | "unknow";

export type Letter = {
  key: string;
  status: LetterStatus;
} | null;

export type Data = {
  data: {
    wordId: number;
    letters: Letter[];
  };
};

type Error = { error: { message: string } };

export type Response = Data | Error;

type Body = { wordId?: number; keys: string[] };

export default function handler(req: Req, res: Res<Response>) {
  if (req.method !== "POST")
    return res.status(400).json({ error: { message: "Invalid method" } });

  const { wordId: cliendWordId, keys: clientKeys } = req.body as Body;

  const serverWord =
    cliendWordId !== undefined ? getWordById(cliendWordId) : getRandomWord();

  if (!serverWord)
    return res.status(400).json({ error: { message: "Database error" } });

  if (cliendWordId === undefined) {
    return res.status(200).json({
      data: {
        wordId: serverWord.id,
        letters: serverWord.word
          .split("")
          .map(() => ({ key: "", status: "unknow" })),
      },
    });
  }

  const serverWordKeys = serverWord.word.split("");

  const letters: Letter[] = serverWordKeys.map((letter, index) => {
    const key = clientKeys[index];
    const isRight = key === letter;

    const exists = !!serverWordKeys.find(
      (serverWordKey) => serverWordKey === key
    );

    return {
      key: key || "",
      status: isRight ? "right" : exists ? "exists" : "wrong",
    };
  });

  const serverWordKeysWithoutRights = serverWordKeys.map(
    (serverWordKey, index) => {
      const letter = letters[index];

      return letter?.status === "right" ? "" : serverWordKey;
    }
  );

  const updatedLetters: Letter[] = letters.map((letter) => {
    if (letter?.status === "exists") {
      const exists = !!serverWordKeysWithoutRights.find(
        (serverWord) => serverWord === letter.key
      );
      return exists ? letter : { ...letter, status: "wrong" };
    }
    return letter;
  });

  return res.status(200).json({
    data: {
      wordId: cliendWordId,
      letters: updatedLetters,
    },
  });
}
