import React from 'react';
import {includes, map} from 'lodash';
import PropTypes from "prop-types";

export const GuessDisplay = ( {word, correctLetters} ) =>
{
  return (
    <React.Fragment>
      {
        map( word, ( letter, i ) =>
        {
          return <span key={i}>{includes( correctLetters, letter ) ? letter : " _ "}</span>;
        } )
      }
    </React.Fragment>
  );
};

GuessDisplay.propTypes = {
  word: PropTypes.string.isRequired,
  correctLetters: PropTypes.string.isRequired,
};
