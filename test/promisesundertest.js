/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const chai = require('chai');
const expect = require('chai').expect
const assert = require('chai').assert

chai.should();
chai.use(require('chai-as-promised'));

// bring in the test class
const UnderTest = require('../lib/promisesundertest');

// Demo the promising handling
let testCode;

// Run the same tests several times with the various settings
[{ reverseLogic: false, wrongData: false },
{ reverseLogic: true, wrongData: false },
{ reverseLogic: false, wrongData: true }].forEach((opt) => {

  describe(`Handling Promises reverseLogic:${opt.reverseLogic} wrongData:${opt.wrongData} `, () => {

    beforeEach(() => {
      testCode = new UnderTest(opt);
    })

    // Shows how to have multiple promise sbe checked in a single test
    describe('When handling multiple promises', () => {

      it('Using await to await the promise', async () => {
        let r1 = await testCode.resolveWithData('Hello');
        r1.should.equal('Hello');
        expect(r1).to.be.equal('Hello');
        assert.equal(r1, 'Hello');

        let r2 = await testCode.resolveWithData('Bye');
        r2.should.equal('Bye');
        expect(r2).to.be.equal('Bye');
        assert.equal(r2, 'Bye');

      });

      it('Using await to await the promise if expected to be rejected', async () => {

        await testCode.rejectWithData('EpicFail').should.eventually.be.rejectedWith(/EpicFail/)
        await testCode.rejectWithData('EpicFail').should.eventually.be.rejected;

        await expect(testCode.rejectWithData('EpicFail')).to.be.eventually.rejected;
        await expect(testCode.rejectWithData('EpicFail')).to.be.eventually.rejectedWith(/EpicFail/);

        let p = testCode.rejectWithData('EpicFail');
        await assert.isRejected(p, /EpicFail/, 'Should fail with EpicFail')

      });

    })

    // Tests using should to handle the promise
    // These tests follow the pattern of one promise to check at the end of the test
    describe('Using should for assertions', () => {

      // resolved promises
      it('returning the promise', () => {
        return testCode.resolveWithData('Hello').should.eventually.be.equal('Hello');
      });

      it('calling done', (done) => {
        testCode.resolveWithData('Hello').should.eventually.be.equal('Hello').notify(done);
      });

      it('not worried about the value, just fulfillment', () => {
        return testCode.resolveWithData('').should.eventually.be.fulfilled;
      })

      it('not worried about the value, callback style', (done) => {
        testCode.resolveWithData('').should.eventually.be.fulfilled.notify(done);
      })

      // rejected promises
      it('should be rejected not concerned with value', () => {
        return testCode.rejectWithData('EpicFail').should.eventually.be.rejected;
      })

      it('should be rejected with value check ', () => {
        return testCode.rejectWithData('EpicFail').should.eventually.be.rejectedWith(/EpicFail/);
      })

      it('should be rejected, callback style', (done) => {
        testCode.rejectWithData('EpicFail').should.eventually.be.rejectedWith(/EpicFail/).notify(done);
      })

    });

    // Tests using expect to handle the promise
    // These tests follow the pattern of one promise to check at the end of the test
    describe('Using expect for the assertions', () => {

      it('expect calling done', (done) => {
        expect(testCode.resolveWithData('Hello')).to.eventually.be.equal('Hello').notify(done);
      })

      it('expect returning promise', () => {
        return expect(testCode.resolveWithData('Hello')).to.eventually.be.equal('Hello');
      })

      // rejected promises
      it('should be rejected not concerned with value', () => {
        return expect(testCode.rejectWithData('EpicFail')).to.eventually.be.rejected;
      })

      it('should be rejected with value check ', () => {
        return expect(testCode.rejectWithData('EpicFail')).to.eventually.be.rejectedWith(/EpicFail/);
      })

      it('should be rejected, callback style', (done) => {
        expect(testCode.rejectWithData('EpicFail')).to.eventually.be.rejectedWith(/EpicFail/).notify(done);
      })

    })

    // Tests using expect to handle the promise
    // These tests follow the pattern of one promise to check at the end of the test
    describe('Using assert for the assertions', () => {

       // resolved promises
      it('not worried about the value', () => {
        let promise = testCode.resolveWithData('');
        return assert.isFulfilled(promise, 'Fulfilled with something ')
      })

      it('returning the promise, checking resolved with correct data', () => {
        let promise = testCode.resolveWithData('Hello')
        return assert.becomes(promise,'Hello','Should be resolved with correct data');
      });

      it('returning the promise,  checking resolved with not the wrong data', () => {
        let promise = testCode.resolveWithData('Hello')
        return assert.doesNotBecome(promise,'Wrong Data','Resolved by checking it doesNotBecome');
      });

      it('calling done, with expected data', (done) => {
        let promise = testCode.resolveWithData('Hello')
        assert.becomes(promise,'Hello','Should be resolved with correct data').notify(done);
      });

      // rejected promises
      it('should be rejected correct value', () => {
        let promise  = testCode.rejectWithData('EpicFail');
        return assert.isRejected(promise,/EpicFail/,'Rejected with correct data');
      })

    })

  })

})

