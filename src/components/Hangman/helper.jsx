import * as randomWords from "random-words";

export const initialState = {
  gameStatus: "inProgress",
  guessWord: randomWords(),
  guessingLetter: "",
  incorrectLetters: "",
  incorrectGuessCount: 0,
  correctLetters: "",
};
