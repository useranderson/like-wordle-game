import { KeyContainer } from ".";
import type { Letter } from "../pages/api/word";
import { colors } from "../pages/index";

const KeyBoardRow: React.FC<
  {
    keys: string[];
    previousLetters: Letter[];
    handleKeyClick: (key: string) => void;
    specialKey?: JSX.Element;
  } & React.ComponentProps<"div">
> = ({
  keys,
  previousLetters,
  handleKeyClick,
  specialKey,
  className,
  ...props
}) => (
  <div className={`flex my-1 ${className}`} {...props}>
    {keys.map((key) => (
      <KeyContainer
        key={key}
        className={`w-6 md:w-12 ${
          colors[
            previousLetters.find((l) => l?.key.toUpperCase() === key)?.status ||
              "unknow"
          ]
        }`}
        onClick={() => handleKeyClick(key)}
      >
        {key}
      </KeyContainer>
    ))}
    {specialKey}
  </div>
);
export default KeyBoardRow;
