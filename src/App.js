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
    const {word, guessingLetter, incorrectLetters, correctLetters} = this.state;
    return (
      <div className="App">
        <div className="displayContainer">
          <GameStatus incorrectLetters={incorrectLetters} correctLetters={correctLetters}/>
          <GuessLetterSubmit guessingLetter={guessingLetter} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
        </div>
        <div className="hangmanContainer">
          <Hangman incorrectGuessCount={incorrectLetters.length}/>
          <GuessDisplay word={word} correctLetters={correctLetters}/>
        </div>
      </div>
    );
  }

  componentDidUpdate( prevProps, prevState, snapshot )
  {
    const {word, correctLetters, incorrectLetters} = this.state;
    this.handleGameStatusAndReset( word, correctLetters, incorrectLetters );
  };

  handleSubmit = ( event ) =>
  {
    event.preventDefault();
    this.handleGuessingLogic();
    this.setState( {guessingLetter: ""} );
  };

  handleGuessingLogic = () =>
  {
    const {word, guessingLetter, incorrectLetters, correctLetters} = this.state;
    const isLetterAlreadyGuessed = includes( incorrectLetters + correctLetters, guessingLetter );
    const isGuessCorrect = includes( word, guessingLetter );
    const isLetterInvalid = !guessingLetter.match( /[a-z]/ );

    isLetterInvalid ? this.handleInvalidInput()
                    : isLetterAlreadyGuessed ? this.handleAlreadyGuessedLetter( guessingLetter )
                                             : isGuessCorrect ? this.handleCorrectGuess( guessingLetter, correctLetters )
                                                              : this.handleIncorrectGuess( guessingLetter, incorrectLetters );

  };

  handleGameStatusAndReset = ( word, correctLetters, incorrectLetters ) =>
  {
    let guessedWordCorrect = uniq( split( word, "" ) ).length === correctLetters.length;
    let noMoreGuesses = incorrectLetters.length === 10;

    guessedWordCorrect ? this.handleGameResult( "You Won!!" )
                       : noMoreGuesses && this.handleGameResult( `You lost! The word is ${this.state.word}` )
  };

  handleGameResult = ( message ) =>
  {
    window.alert( message );
    this.handleReset();
  };

  handleCorrectGuess = ( guessingLetter, correctLetters ) => this.setState( {correctLetters: correctLetters + guessingLetter} );
  handleIncorrectGuess = ( guessingLetter, incorrectLetters ) => this.setState( {incorrectLetters: incorrectLetters + guessingLetter} );
  handleInvalidInput = () => window.alert( "Please enter a valid letter" );
  handleAlreadyGuessedLetter = guessingLetter => window.alert( `You have already guessed ${guessingLetter}, please try a different letter` );
  handleChange = event => this.setState( {guessingLetter: toLower( event.target.value )} );
  handleReset = () => this.setState( initialState );
}
