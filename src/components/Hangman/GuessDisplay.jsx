import React from 'react';
import {includes, map} from 'lodash';
import PropTypes from "prop-types";

export const GuessDisplay = ( {word, correctLetters} ) =>
{
  return (
    <span>
      {
        map( word, ( letter ) =>
        {
          return includes( correctLetters, letter ) ? letter : "_";
        } )
      }
    </span>
  );
};

GuessDisplay.propTypes = {
  word: PropTypes.string.isRequired,
  correctLetters: PropTypes.string.isRequired,
};
