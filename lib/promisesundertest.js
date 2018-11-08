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

/**
 * Undertest: has two methods for returning resolve and rejected promises.
 */
module.exports = class UnderTest{

  /**
   * Create an instance, with options object that controls if the methods
   * should return different values for help in checking the tests.
   *
   * reverseLogic: set to true if the logic should
   * be reversed. So that the methods that return a resolved promise
   * returns a rejected promise.
   *
   * wrongData: set to true to return the wrong data when the promise
   * is resolved or rejected
   */
  constructor(options = { reverseLogic:false, wrongData:false } ) {

    if (options.reverseLogic){
      this.reverseLogic=options.reverseLogic
    }

    if (options.wrongData){
      this.wrongData=options.wrongData
    }

  }

  /**
   * Return a promised resolved with the data specified, in the duration given
   * (but controlled by the options in the constructors)
   *
   * @param {String} data promise should be resolved with
   * @param {int} duration of when promise should be resolved (default = 500)
   */
  async resolveWithData(data, duration = 500){
    let d = this.wrongData ? 'Wrong Value' : data;
    return this.reverseLogic ? this._getRejectedPromise(d,duration) : this._getResolvedPromise(d,duration)
  }

  /**
   * Return a promised rejected with the data specified, in the duration given;
   * (but controlled by the options in the constructors)
   *
   * @param {String} data promise should be rejected with
   * @param {int} duration of when promise should be resolved (default = 500)
   */
  async rejectWithData(data, duration = 1500){
    let d = this.wrongData ? 'Wrong Value' : data;
    return this.reverseLogic ? this._getResolvedPromise(d,duration) : this._getRejectedPromise(d,duration)
  }

  /**
   * Get a promised that will resolve
   *
   * @param {String} data promise should be resolved with
   * @param {int} duration of when promise should be resolved
   */
  _getResolvedPromise(data,duration){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve(data);
      }, duration)
    });
  }

  /**
   * Get a promised that will reject
   *
   * @param {String} data promise should be rejected with
   * @param {int} duration of when promise should be resolved
   */
  _getRejectedPromise(data,duration){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        reject(new Error(data));
      }, duration)
    });
  }

}
