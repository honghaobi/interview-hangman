import * as randomWords from 'random-words';

describe( 'Example Test', () =>
{
  it( 'is just an example showing jest is working', () =>
  {
    expect( true ).toBe( true );
  } );
} );
describe( 'Random word generator tests', () =>
{
  it( 'it generates a random word', () =>
  {
    const guessWord = randomWords();
    expect( guessWord ).toBe( true );
  } );
} );
