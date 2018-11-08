# Examples of sinon/chai/mocha testing

After several years of using the sinon/chai/mocha combination it is stil common in the team to hear

> How do I check a function is rejected with the correct error?

> How do I assert a function returns null?

Inevitably, we go looking for an example of how it's been done before.

This repository's aim is to give examples.  The type of checks that always seem to send you back to the test code written before looking for examples.

PRs welcome for corrections and suggestions - but I'd like to keep this quite targeted on very specific examples rather than larger testing patterns. Or on many alternatives of tools.

## should or expect or assert

Generally I use should. Expect makes it slightly easier in some cases were null or undefined might cause problems.

The examples try and show a mixture, as they are all useful. Assert I admint to finding a bit clumsy in JavaScript

## What about 'other testing framework here'

I like mocha; you might not.  To quote Evelyn Hall

> "I disapprove of what you say, but I will defend to the death your right to say it"

## Things I'd like to add to this

- Common patterns such as checking arrays, null values
- Stubbing out requires()
- Constructor testing
- Other stuff that I always forget about chai/sinon/mocha
- Typescript

# The Examples

## Promise examples

A class that has methods that return both resolve and rejected promises with data. The data can be specified.
What the class under test can also be set to do is 'get it wrong' i.e. reverse the resolution, resolved becomes rejected, and rejected resolved. As well as returning some other data.

Why? a) this helps to make sure that the example is really working, b) it shows you how the test will fail and what information is returned (it does vary subtly).

Examples show how you can handle both resolved and rejected promises in a variety of styles. Including cases where you might want to check a number of promises withing a single test.

### Running the tests

Clone this repo, install and then test

```bash
git clone https://github.com/ampretia/js-testing.git
npm install
npm test
```

# References

- [chai](https://www.chaijs.com/)
  - [chai-as-promised](https://github.com/domenic/chai-as-promised)
- [mocha](https://mochajs.org/)
- [sinon](https://sinonjs.org/)
