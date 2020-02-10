import React from 'react';
import PropTypes from 'prop-types';

export const GameStatus = ( {incorrectLetters, correctLetters} ) =>
{
  return (
    <div>
      <h3>Incorrect Letters: {incorrectLetters}</h3>
      <h3>Correct Letters: {correctLetters}</h3>
      <h3>Number of Guesses Left: {10 - incorrectLetters.length}</h3>
    </div>
  );
};

GameStatus.propTypes = {
  incorrectLetters: PropTypes.string.isRequired,
  correctLetters: PropTypes.string.isRequired,
};
