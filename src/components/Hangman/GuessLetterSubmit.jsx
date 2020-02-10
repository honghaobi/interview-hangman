import React from 'react';
import PropTypes from "prop-types";

export const GuessLetterSubmit = ( {guessingLetter, handleChange, handleSubmit} ) =>
{
  return (
    <form onSubmit={handleSubmit}>
      <input className="input" required type="text" name="name" minLength="1" maxLength="1" value={guessingLetter} onChange={handleChange}/>
      <input type="submit" className="submitBtn" value="Submit"/>
    </form>
  );
};

GuessLetterSubmit.propTypes = {
  guessingLetter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
