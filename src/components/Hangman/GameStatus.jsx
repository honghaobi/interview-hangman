import React from 'react';

export const GameStatus = ( {guessingLetter, incorrectLetters, correctLetters, incorrectGuessCount, gameStatus} ) =>
{
  return (
    <div>
      <h3>Incorrect Letters: {incorrectLetters}</h3>
      <h3>Correct Letters: {correctLetters}</h3>
      <h3>Guessing Letter: {guessingLetter}</h3>
      <h3>Number of Guesses Left: {10 - incorrectGuessCount}</h3>
      <h3>{gameStatus}</h3>
    </div>
  );
};
