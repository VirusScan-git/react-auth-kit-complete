/*
 * Copyright 2020 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {AuthContextInterface} from '../types';

/**
 * Utility Function
 * @description Used to check if the auth provider is missing or not
 * @throws Error if the auth provider is missing
 * @param authContext
 */
function checkAuthProvider(authContext: AuthContextInterface):void {
  if (authContext === null || authContext === undefined) {
    throw new
    Error('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }
}

export default checkAuthProvider;
