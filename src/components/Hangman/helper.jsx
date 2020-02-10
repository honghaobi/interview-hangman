import * as randomWords from "random-words";

export const initialState = {
  word: randomWords(),
  guessingLetter: "",
  incorrectLetters: "",
  correctLetters: "",
};
