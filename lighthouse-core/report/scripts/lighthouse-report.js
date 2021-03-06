/**
 * @license
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global window, document */

'use strict';

/* Using ES5 to broaden support */
function LighthouseReport() {
  this.printButton = document.querySelector('.js-print');
  this.checkboxToggleView = document.querySelector('.js-toggle-view');
  this.viewUserFeature = document.querySelector('.js-report-by-user-feature');
  this.viewTechnology = document.querySelector('.js-report-by-technology');

  this.updateView = this.updateView.bind(this);

  this.addEventListeners();
}

LighthouseReport.prototype = {

  onPrint: function() {
    window.print();
  },

  updateView: function() {
    if (this.checkboxToggleView.checked) {
      this.viewUserFeature.setAttribute('hidden', 'hidden');
      this.viewTechnology.removeAttribute('hidden');
    } else {
      this.viewUserFeature.removeAttribute('hidden');
      this.viewTechnology.setAttribute('hidden', 'hidden');
    }
  },

  addEventListeners: function() {
    this.printButton.addEventListener('click', this.onPrint);
    this.checkboxToggleView.addEventListener('change', this.updateView);
  }
};

(function() {
  return new LighthouseReport();
})();
