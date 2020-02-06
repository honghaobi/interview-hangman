import React from 'react';
import {GuessDisplay, Hangman} from './components';
import {includes, sortedUniq, split} from 'lodash';
import * as randomWords from 'random-words';

import './App.css';

export default class App extends React.Component
{
  constructor( props )
  {
    super( props );
    this.state = {
      gameState: "inProgress",
      guessWord: randomWords(),
      guessedLetter: "",
      guessedLettersHistory: [],
      incorrectGuessCount: 0,
      correctLetters: "",
    }
  }

  render()
  {
    return (
      <div className="App">
        <div className="container">
          <h1>React Hangman</h1>
          <h2>Word to Quess: {this.state.guessWord}</h2>
          <h3>You have already guessed these letters: {this.state.guessedLettersHistory}</h3>
          <h3>Letters that are correct: {this.state.correctLetters}</h3>
          <h3>Letter You have submited: {this.state.guessedLetter}</h3>
          <h4>{this.state.gameState}</h4>
          <form onSubmit={this.handleGuessSubmitted}>
            <label>Guess a letter:
              <input required type="text" name="name" minLength="1" maxLength="1" value={this.state.guessedLetter} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit"/>
          </form>
          <GuessDisplay word={this.state.guessWord} correctLetters={this.state.correctLetters}/>
          <Hangman incorrectGuessCount={this.state.incorrectGuessCount}/>
        </div>
      </div>
    );
  }

  handleChange = event => this.setState( {guessedLetter: event.target.value} );
  handleGuessSubmitted = ( event ) =>
  {
    event.preventDefault();
    const {incorrectGuessCount, guessWord, guessedLetter, guessedLettersHistory, correctLetters} = this.state;

    this.handleGameWinLossState( incorrectGuessCount, guessWord, correctLetters );

    if ( includes( guessWord, guessedLetter ) )
    {
      this.setState( {correctLetters: correctLetters.concat( guessedLetter )} );
    }
    else
    {
      this.setState( {incorrectGuessCount: incorrectGuessCount + 1} );
    }

    if ( includes( guessedLettersHistory, guessedLetter ) )
    {
      window.alert( `you have already guessed ${guessedLetter}, please try a different letter` );
      this.setState( {guessedLetter: ""} );
    }
    else
    {
      this.setState( {guessedLettersHistory: guessedLettersHistory.concat( guessedLetter )} );
    }
    this.setState( {guessedLetter: ""} );
  };

  handleGameWinLossState( incorrectGuessCount, guessWord, correctLetters )
  {
    if ( incorrectGuessCount === 10 )
    {
      this.setState( {gameState: "lost", incorrectGuessCount: 0} );
    }
    else if ( sortedUniq( split( guessWord ) ) === sortedUniq( split( correctLetters ) ) )
    {
      this.setState( {gameState: "won", incorrectGuessCount: 0} );
    }
  }
};
