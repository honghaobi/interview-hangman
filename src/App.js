import React from 'react';
import {GameStatus, GuessDisplay, GuessLetterSubmit, Hangman} from './components';
import {includes, split, toLower, uniq} from 'lodash';
import {initialState} from "./components/Hangman/helper";

import './App.css';

export default class App extends React.Component
{
  constructor( props )
  {
    super( props );
    this.state = initialState;
  }

  render()
  {
    const {incorrectGuessCount, word, guessingLetter, incorrectLetters, correctLetters} = this.state;
    return (
      <div className="App">
        <div className="container">
          <h1>React Hangman</h1>
          <GameStatus incorrectLetters={incorrectLetters} correctLetters={correctLetters} incorrectGuessCount={incorrectGuessCount}/>
          <GuessLetterSubmit guessingLetter={guessingLetter} handleSubmit={this.handleGuessSubmitted} handleChange={this.handleChange}/>
          <GuessDisplay word={word} correctLetters={correctLetters}/>
          <Hangman incorrectGuessCount={incorrectGuessCount}/>
        </div>
      </div>
    );
  }

  componentDidUpdate( prevProps, prevState, snapshot )
  {
    const {incorrectGuessCount, word, correctLetters} = this.state;
    this.handleGameStatusAndReset( incorrectGuessCount, word, correctLetters );
  };

  handleGuessSubmitted = ( event ) =>
  {
    event.preventDefault();
    this.handleGuessingLogic();
    this.setState( {guessingLetter: ""} );
  };

  handleGuessingLogic = () =>
  {
    const {incorrectGuessCount, word, guessingLetter, incorrectLetters, correctLetters} = this.state;
    const isLetterAlreadyGuessed = includes( [...incorrectLetters, ...correctLetters], guessingLetter );
    const isGuessCorrect = includes( word, guessingLetter );
    const isLetterInvalid = !guessingLetter.match( /[a-z]/ );

    isLetterInvalid ? this.handleInvalidInput()
                    : isLetterAlreadyGuessed ? this.handleAlreadyGuessedLetter( guessingLetter )
                                             : isGuessCorrect ? this.handleCorrectGuess( guessingLetter, correctLetters )
                                                              : this.handleIncorrectGuess( guessingLetter, incorrectLetters, incorrectGuessCount );

  };

  handleCorrectGuess = ( guessingLetter, correctLetters ) => this.setState( {correctLetters: [...correctLetters, guessingLetter]} );

  handleIncorrectGuess = ( guessingLetter, incorrectLetters, incorrectGuessCount ) =>
  {
    this.setState( {
      incorrectGuessCount: incorrectGuessCount + 1,
      incorrectLetters: [...incorrectLetters, guessingLetter],
    } );
  };

  handleGameStatusAndReset = ( incorrectGuessCount, word, correctLetters ) =>
  {
    let guessedWordCorrect = uniq( split( word, "" ) ).length === correctLetters.length;
    let noMoreGuesses = incorrectGuessCount === 10;

    guessedWordCorrect && this.handleGameResult( "You Won!!" );
    noMoreGuesses && this.handleGameResult( `You lost! The word is ${this.state.word}` )
  };

  handleGameResult = ( message ) =>
  {
    window.alert( message );
    this.handleReset();
  }

  handleInvalidInput = () => window.alert( "Please enter a valid letter" );
  handleAlreadyGuessedLetter = guessingLetter => window.alert( `You have already guessed ${guessingLetter}, please try a different letter` );
  handleChange = event => this.setState( {guessingLetter: toLower( event.target.value )} );
  handleReset = () => this.setState( initialState );
}
