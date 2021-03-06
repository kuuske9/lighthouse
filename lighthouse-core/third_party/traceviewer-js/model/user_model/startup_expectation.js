/**
Copyright (c) 2015 The Chromium Authors. All rights reserved.
Use of this source code is governed by a BSD-style license that can be
found in the LICENSE file.
**/

require("./user_expectation.js");

'use strict';

global.tr.exportTo('tr.model.um', function() {
  function StartupExpectation(parentModel, start, duration) {
    tr.model.um.UserExpectation.call(
        this, parentModel, '', start, duration);
  }

  StartupExpectation.prototype = {
    __proto__: tr.model.um.UserExpectation.prototype,
    constructor: StartupExpectation
  };

  tr.model.um.UserExpectation.register(StartupExpectation, {
    stageTitle: 'Startup',
    colorId: tr.b.ColorScheme.getColorIdForReservedName('startup')
  });

  return {
    StartupExpectation: StartupExpectation
  };
});
