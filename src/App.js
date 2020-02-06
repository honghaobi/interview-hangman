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
    }
  }

  render()
  {
    return (
      <div className="App">
        <div className="container">
          <h1>React Hangman</h1>
          <h2>Word to Quess: {this.state.guessWordArr}</h2>
          <Hangman incorrectGuessCount={10}></Hangman>
        </div>
      </div>
    );
  }
};
