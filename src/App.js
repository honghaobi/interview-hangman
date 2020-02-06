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
    }
  }

  render()
  {
    return (
      <div className="App">
        <div className="container">
          <h1>React Hangman</h1>
          <h2>Word to Quess: {this.state.guessWordArr}</h2>
          <h3>Letter You have submited: {this.state.guessedLetter}</h3>
          <form onSubmit={this.handleGuessSubmitted}>
            <label>Guess a letter:
              <input type="text" name="name" minLength="1" maxLength="1" required onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit"/>
          </form>
          <Hangman incorrectGuessCount={10}></Hangman>
        </div>
      </div>
    );
  }

  handleGuessSubmitted = event => this.setState( {guessedLetterSubmitted: event.target.value} );
  handleChange = event => this.setState( {guessedLetter: event.target.value} );
};
