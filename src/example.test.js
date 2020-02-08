import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {GameStatus, GuessDisplay, GuessLetterSubmit, Hangman} from "./components/Hangman";

describe( 'All Components can render without error', function ()
{

  it( 'can render GameStatus Component without error', function ()
  {
    let component, element;
    element = React.createElement( GameStatus );
    expect( () =>
    {
      component = ReactTestUtils.renderIntoDocument( element );
    } ).not.toThrow();
  } );

  it( 'can render GuessLetterSubmit Component without error', function ()
  {
    let component, element;
    element = React.createElement( GuessLetterSubmit );
    expect( () =>
    {
      component = ReactTestUtils.renderIntoDocument( element );
    } ).not.toThrow();
  } );

  it( 'can render GuessDisplay Component without error', function ()
  {
    let component, element;
    element = React.createElement( GuessDisplay );
    expect( () =>
    {
      component = ReactTestUtils.renderIntoDocument( element );
    } ).not.toThrow();
  } );

  it( 'can render Hangman Component without error', function ()
  {
    let component, element;
    element = React.createElement( Hangman, {incorrectGuessCount: 10} );
    expect( () =>
    {
      component = ReactTestUtils.renderIntoDocument( element );
    } ).not.toThrow();
  } );
} )
