import React from 'react';
import {Hangman} from './components';
import * as randomWords from 'random-words';

import './App.css';

export default class App extends React.Component
{
  constructor()
  {
    super();
    this.state = {
      guessWordArr: randomWords().split( "" ),
      guessedLetter: "",
      guessedLetters: [],
    }
  }

  render()
  {
    return (
      <div className="App">
        <div className="container">
          <h1>React Hangman</h1>
          <h2>Word to Quess: {this.state.guessWordArr}</h2>
          <h3>You have already guessed these letters: {this.state.guessedLetters}</h3>
          <h3>Letter You have submited: {this.state.guessedLetter}</h3>
          <form onSubmit={this.handleGuessSubmitted}>
            <label>Guess a letter:
              <input required type="text" name="name" minLength="1" maxLength="1" value={this.state.guessedLetter} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit"/>
          </form>
          <Hangman incorrectGuessCount={10}></Hangman>
        </div>
      </div>
    );
  }

  handleChange = event => this.setState( {guessedLetter: event.target.value} );
  handleGuessSubmitted = ( event ) =>
  {
    event.preventDefault();
    if ( this.state.guessedLetters.includes( this.state.guessedLetter ) )
    {
      window.alert( `you have already guessed ${this.state.guessedLetter}, please try a different letter` );
      this.setState( {guessedLetter: ""} );
    }
    else
    {
      this.setState( {guessedLetters: this.state.guessedLetters.concat( this.state.guessedLetter )} )
    }
  };
};
