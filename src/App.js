import React from 'react';
import {GameStatus, GuessDisplay, Hangman} from './components';
import {includes, split, uniq} from 'lodash';
import * as randomWords from 'random-words';

import './App.css';

const initialState = {
  gameStatus: "inProgress",
  guessWord: randomWords(),
  guessingLetter: "",
  incorrectLetters: "",
  incorrectGuessCount: 0,
  correctLetters: "",
};

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
          <GameStatus guessingLetter={guessingLetter} incorrectLetters={incorrectLetters} correctLetters={correctLetters} gameStatus={gameStatus}/>
          <form onSubmit={this.handleGuessSubmitted}>
            <label>Guess a letter:
              <input required type="text" name="name" minLength="1" maxLength="1" value={guessingLetter} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit"/>
          </form>
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
  }

  handleGuessSubmitted = ( event ) =>
  {
    event.preventDefault();
    const {incorrectGuessCount, guessWord, guessingLetter, incorrectLetters, correctLetters} = this.state;
    const alreadyGuessedLetter = includes( incorrectLetters.concat( correctLetters ), guessingLetter );
    const isCorrectGuess = includes( guessWord, guessingLetter );

    alreadyGuessedLetter ? this.handleAlreadyGuessedLetter( guessingLetter )
                         : isCorrectGuess ? this.handleCorrectGuess( guessingLetter, correctLetters )
                                          : this.handleIncorrectGuess( guessingLetter, incorrectLetters, incorrectGuessCount );

    this.setState( {guessingLetter: ""} );
  };

  handleIncorrectGuess = ( guessingLetter, incorrectLetters, incorrectGuessCount ) =>
  {
    this.setState( {
      incorrectGuessCount: incorrectGuessCount + 1,
      incorrectLetters: incorrectLetters.concat( guessingLetter )
    } );
  };

  handleCorrectGuess = ( guessingLetter, correctLetters ) =>
  {
    if ( !includes( correctLetters, guessingLetter ) )
    {
      this.setState( {correctLetters: correctLetters.concat( guessingLetter )} );
    }
  };

  handleGameStatusAndReset = ( incorrectGuessCount, guessWord, correctLetters ) =>
  {
    if ( incorrectGuessCount === 10 )
    {
      this.setState( {gameStatus: "lost"} );
      this.handleReset();
    }
    else if ( uniq( split( guessWord, "" ) ).length === correctLetters.length )
    {
      this.setState( {gameStatus: "won"} );
      this.handleReset();
    }
  };

  handleAlreadyGuessedLetter = guessingLetter => window.alert( `you have already guessed ${guessingLetter}, please try a different letter` );
  handleChange = event => this.setState( {guessingLetter: event.target.value} );
  handleReset = gameStatus => this.setState( initialState );
}
;
