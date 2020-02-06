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
    const {incorrectGuessCount, guessWord, guessingLetter, incorrectLetters, correctLetters, gameStatus} = this.state;
    return (
      <div className="App">
        <div className="container">
          <h1>React Hangman</h1>
          <GameStatus guessingLetter={guessingLetter} incorrectLetters={incorrectLetters} correctLetters={correctLetters} gameStatus={gameStatus}
                      incorrectGuessCount={incorrectGuessCount}/>
          <GuessLetterSubmit guessingLetter={guessingLetter} handleSubmit={this.handleGuessSubmitted} handleChange={this.handleChange}/>
          <GuessDisplay word={guessWord} correctLetters={correctLetters}/>
          <Hangman incorrectGuessCount={incorrectGuessCount}/>
        </div>
      </div>
    );
  }

  componentDidUpdate( prevProps, prevState, snapshot )
  {
    const {incorrectGuessCount, guessWord, correctLetters} = this.state;
    this.handleGameStatusAndReset( incorrectGuessCount, guessWord, correctLetters );
  };

  handleGuessSubmitted = ( event ) =>
  {
    event.preventDefault();
    this.handleGuessingLogic();
    this.setState( {guessingLetter: ""} );
  };

  handleGuessingLogic = () =>
  {
    const {incorrectGuessCount, guessWord, guessingLetter, incorrectLetters, correctLetters} = this.state;
    const isLetterAlreadyGuessed = includes( [...incorrectLetters, ...correctLetters], guessingLetter );
    const isGuessCorrect = includes( guessWord, guessingLetter );
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

  handleGameStatusAndReset = ( incorrectGuessCount, guessWord, correctLetters ) =>
  {
    let guessedAllLettersCorrect = uniq( split( guessWord, "" ) ).length === correctLetters.length;
    if ( guessedAllLettersCorrect )
    {
      this.setState( {gameStatus: "won"} );
      this.handleReset();
    }
    else if ( incorrectGuessCount === 10 )
    {
      this.setState( {gameStatus: "lost"} );
      this.handleReset();
    }
  };

  handleInvalidInput = () => window.alert( "Please enter a valid letter" );
  handleAlreadyGuessedLetter = guessingLetter => window.alert( `You have already guessed ${guessingLetter}, please try a different letter` );
  handleChange = event => this.setState( {guessingLetter: toLower( event.target.value )} );
  handleReset = () => this.setState( initialState );
}
