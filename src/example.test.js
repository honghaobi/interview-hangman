import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {GameStatus, GuessDisplay, GuessLetterSubmit, Hangman} from "./components/Hangman";

let mockInitialState = {
  word: "hello",
  guessingLetter: "",
  incorrectLetters: "",
  incorrectGuessCount: 0,
  correctLetters: "",
};

let state, component, element;

describe( 'All Components can render without error', function ()
{
  beforeAll( () =>
  {
    state = mockInitialState;
  } );

  beforeEach( () =>
  {
    component = null;
    element = null;
  } );

  it( 'can render GameStatus Component without error', function ()
  {
    element = React.createElement( GameStatus,
      {
        incorrectLetters: state.incorrectLetters,
        correctLetters: state.correctLetters,
        incorrectGuessCount: state.incorrectGuessCount
      } );
    expect( () =>
    {
      component = ReactTestUtils.renderIntoDocument( element );
    } ).not.toThrow();
  } );

  it( 'can render GuessLetterSubmit Component without error', function ()
  {
    element = React.createElement( GuessLetterSubmit );
    expect( () =>
    {
      component = ReactTestUtils.renderIntoDocument( element );
    } ).not.toThrow();
  } );

  it( 'can render GuessDisplay Component without error', function ()
  {
    element = React.createElement( GuessDisplay );
    expect( () =>
    {
      component = ReactTestUtils.renderIntoDocument( element );
    } ).not.toThrow();
  } );

  it( 'can render Hangman Component without error', function ()
  {
    element = React.createElement( Hangman, {incorrectGuessCount: state.incorrectGuessCount} );
    expect( () =>
    {
      component = ReactTestUtils.renderIntoDocument( element );
    } ).not.toThrow();
  } );
} )
