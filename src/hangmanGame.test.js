import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';
import {GameStatus, GuessDisplay, GuessLetterSubmit, Hangman} from "./components/Hangman";

let mockInitialState = {
  word: "hello",
  guessingLetter: "",
  incorrectLetters: "",
  incorrectGuessCount: 0,
  correctLetters: "",
};

let state, component, element, renderer;

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
    element = React.createElement( GuessLetterSubmit,
      {
        guessingLetter: state.guessingLetter,
        handleChange: () =>
        {
        },
        handleSubmit: () =>
        {
        },
      } );
    expect( () =>
    {
      component = ReactTestUtils.renderIntoDocument( element );
    } ).not.toThrow();
  } );

  it( 'can render GuessDisplay Component without error', function ()
  {
    element = React.createElement( GuessDisplay, {
      word: state.word,
      correctLetters: state.correctLetters,
    } );
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
} );

describe( 'GuessDisplay Component rendering', function ()
{
  beforeAll( () =>
  {
    state = mockInitialState;
    renderer = new ShallowRenderer();
  } );

  beforeEach( () =>
  {
    renderer = new ShallowRenderer();
  } );

  afterEach( () =>
  {
    renderer = null;
  } );

  it( 'render for no correct letters guessed', function ()
  {
    renderer.render( <GuessDisplay word={state.word} correctLetters=""/> );
    const result = renderer.getRenderOutput();
    expect( result.type ).toBe( 'span' );
    expect( result.props.children ).toEqual(
      ['_', '_', '_', '_', '_']
    );
  } );

  it( 'render for 1 correct letters guessed', function ()
  {
    renderer.render( <GuessDisplay word={state.word} correctLetters="e"/> );
    const result = renderer.getRenderOutput();
    expect( result.props.children ).toEqual(
      ['_', 'e', '_', '_', '_']
    );
  } );

  it( 'render for 1 correct letters guessed for two places in the word', function ()
  {
    renderer.render( <GuessDisplay word={state.word} correctLetters="l"/> );
    const result = renderer.getRenderOutput();
    expect( result.props.children ).toEqual(
      ['_', '_', 'l', 'l', '_']
    );
  } );

  it( 'render for all correct letters guessed', function ()
  {
    renderer.render( <GuessDisplay word={state.word} correctLetters={state.word}/> );
    const result = renderer.getRenderOutput();
    expect( result.props.children ).toEqual(
      ['h', 'e', 'l', 'l', 'o']
    );
  } );
} );

describe( 'GameStatus Component rendering', function ()
{
  beforeAll( () =>
  {
    state = mockInitialState;
    renderer = new ShallowRenderer();
  } );

  beforeEach( () =>
  {
    renderer = new ShallowRenderer();
  } );

  afterEach( () =>
  {
    renderer = null;
  } );

  it( 'render for 1 correct letter and 1 incorrect letter', function ()
  {
    renderer.render( <GameStatus incorrectLetters="x" correctLetters="h"/> );
    const result = renderer.getRenderOutput();
    const parentDiv = result.props.children;
    expect( result.type ).toBe( 'div' );
    expect( parentDiv[0].props.children ).toEqual(
      ["Incorrect Letters: ", "x"]
    );
    expect( parentDiv[1].props.children ).toEqual(
      ["Correct Letters: ", "h"]
    );
    expect( parentDiv[2].props.children ).toEqual(
      ["Number of Guesses Left: ", 9]
    );
  } );

  it( 'render for 4 correct letter and 0 incorrect letter', function ()
  {
    renderer.render( <GameStatus incorrectLetters="" correctLetters="helo"/> );
    const result = renderer.getRenderOutput();
    const parentDiv = result.props.children;
    expect( result.type ).toBe( 'div' );
    expect( parentDiv[0].props.children ).toEqual(
      ["Incorrect Letters: ", ""]
    );
    expect( parentDiv[1].props.children ).toEqual(
      ["Correct Letters: ", "helo"]
    );
    expect( parentDiv[2].props.children ).toEqual(
      ["Number of Guesses Left: ", 10]
    );
  } );

  it( 'render for 0 correct letter and 10 incorrect letter', function ()
  {
    renderer.render( <GameStatus incorrectLetters="abcdefghij" correctLetters=""/> );
    const result = renderer.getRenderOutput();
    const parentDiv = result.props.children;
    expect( result.type ).toBe( 'div' );
    expect( parentDiv[0].props.children ).toEqual(
      ["Incorrect Letters: ", "abcdefghij"]
    );
    expect( parentDiv[1].props.children ).toEqual(
      ["Correct Letters: ", ""]
    );
    expect( parentDiv[2].props.children ).toEqual(
      ["Number of Guesses Left: ", 0]
    );
  } );
} );
