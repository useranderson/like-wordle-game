import { KeyBoardRow, KeyContainer } from ".";
import type { Letter } from "../pages/api/word";

const KeyBoard = ({
  previousLetters,
  handleKeyClick,
  handleBackSpaceClick,
  handleEnterClick,
}: {
  previousLetters: Letter[];
  handleKeyClick: (key: string) => void;
  handleBackSpaceClick: () => void;
  handleEnterClick: () => void;
}) => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const BackSpaceKey = (
    <KeyContainer
      className="bg-neutral-700 w-10"
      onClick={handleBackSpaceClick}
    >
      BS
    </KeyContainer>
  );

  const EnterKey = (
    <KeyContainer className="bg-neutral-700 w-16" onClick={handleEnterClick}>
      ENTER
    </KeyContainer>
  );

  return (
    <div>
      <KeyBoardRow
        keys={keys1}
        previousLetters={previousLetters}
        handleKeyClick={handleKeyClick}
      />
      <KeyBoardRow
        keys={keys2}
        previousLetters={previousLetters}
        handleKeyClick={handleKeyClick}
        className="ml-3"
        specialKey={BackSpaceKey}
      />

      <KeyBoardRow
        keys={keys3}
        previousLetters={previousLetters}
        handleKeyClick={handleKeyClick}
        className="ml-6"
        specialKey={EnterKey}
      />
    </div>
  );
};

export default KeyBoard;
