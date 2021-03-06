/**
Copyright (c) 2015 The Chromium Authors. All rights reserved.
Use of this source code is governed by a BSD-style license that can be
found in the LICENSE file.
**/

require("../../base/event.js");
require("../../base/iteration_helpers.js");

'use strict';

global.tr.exportTo('tr.e.chrome', function() {
  var SAME_AS_PARENT = 'same-as-parent';

  var TITLES_FOR_USER_FRIENDLY_CATEGORY = {
    composite: [
      'CompositingInputsUpdater::update',
      'ThreadProxy::SetNeedsUpdateLayers',
      'LayerTreeHost::UpdateLayers::CalcDrawProps',
      'UpdateLayerTree'
    ],

    gc: [
      'minorGC',
      'majorGC',
      'MajorGC',
      'MinorGC',
      'V8.GCScavenger',
      'V8.GCIncrementalMarking',
      'V8.GCIdleNotification',
      'V8.GCContext',
      'V8.GCCompactor',
      'V8GCController::traceDOMWrappers'
    ],

    iframe_creation: [
      'WebLocalFrameImpl::createChildframe'
    ],

    imageDecode: [
      'Decode Image',
      'ImageFrameGenerator::decode',
      'ImageFrameGenerator::decodeAndScale'
    ],

    input: [
      'HitTest',
      'ScrollableArea::scrollPositionChanged',
      'EventHandler::handleMouseMoveEvent'
    ],

    layout: [
      'FrameView::invalidateTree',
      'FrameView::layout',
      'FrameView::performLayout',
      'FrameView::performPostLayoutTasks',
      'FrameView::performPreLayoutTasks',
      'Layer::updateLayerPositionsAfterLayout',
      'Layout',
      'LayoutView::hitTest',
      'ResourceLoadPriorityOptimizer::updateAllImageResourcePriorities',
      'WebViewImpl::layout'
    ],

    parseHTML: [
      'ParseHTML',
      'HTMLDocumentParser::didReceiveParsedChunkFromBackgroundParser',
      'HTMLDocumentParser::processParsedChunkFromBackgroundParser'
    ],

    raster: [
      'DisplayListRasterSource::PerformSolidColorAnalysis',
      'Picture::Raster',
      'RasterBufferImpl::Playback',
      'RasterTask',
      'RasterizerTaskImpl::RunOnWorkerThread',
      'SkCanvas::drawImageRect()',
      'SkCanvas::drawPicture()',
      'SkCanvas::drawTextBlob()',
      'TileTaskWorkerPool::PlaybackToMemory'
    ],

    record: [
      'ContentLayerDelegate::paintContents',
      'DeprecatedPaintLayerCompositor::updateIfNeededRecursive',
      'DeprecatedPaintLayerCompositor::updateLayerPositionsAfterLayout',
      'Paint',
      'Picture::Record',
      'PictureLayer::Update',
      'RenderLayer::updateLayerPositionsAfterLayout'
    ],

    style: [
      'CSSParserImpl::parseStyleSheet.parse',
      'CSSParserImpl::parseStyleSheet.tokenize',
      'Document::updateStyle',
      'Document::updateStyleInvalidationIfNeeded',
      'ParseAuthorStyleSheet',
      'RuleSet::addRulesFromSheet',
      'StyleElement::processStyleSheet',
      'StyleEngine::createResolver',
      'StyleSheetContents::parseAuthorStyleSheet',
      'UpdateLayoutTree'
    ],

    script_parse_and_compile: [
      'v8.parseOnBackground',
      'V8.ScriptCompiler'
    ],

    script_execute: [
      'V8.Execute',
      'WindowProxy::initialize'
    ],

    resource_loading: [
      'ResourceFetcher::requestResource',
      'ResourceDispatcher::OnReceivedData',
      'ResourceDispatcher::OnRequestComplete',
      'ResourceDispatcher::OnReceivedResponse',
      'Resource::appendData'
    ],

    // Where do these go?
    renderer_misc: [
      'DecodeFont',
      'ThreadState::completeSweep' // blink_gc
    ],

    // TODO(fmeawad): https://github.com/catapult-project/catapult/issues/2572
    v8_runtime: [
      // Dynamically populated.
    ],

    [SAME_AS_PARENT]: [
      'SyncChannel::Send'
    ]
  };

  var USER_FRIENDLY_CATEGORY_FOR_TITLE = new Map();

  for (var category in TITLES_FOR_USER_FRIENDLY_CATEGORY) {
    TITLES_FOR_USER_FRIENDLY_CATEGORY[category].forEach(function(title) {
      USER_FRIENDLY_CATEGORY_FOR_TITLE.set(title, category);
    });
  }

  var USER_FRIENDLY_CATEGORY_FOR_EVENT_CATEGORY = {
    netlog: 'net',
    overhead: 'overhead',
    startup: 'startup',
    gpu: 'gpu'
  };

  function ChromeUserFriendlyCategoryDriver() {
  }

  ChromeUserFriendlyCategoryDriver.fromEvent = function(event) {
    var userFriendlyCategory =
        USER_FRIENDLY_CATEGORY_FOR_TITLE.get(event.title);
    if (userFriendlyCategory) {
      if (userFriendlyCategory == SAME_AS_PARENT) {
        if (event.parentSlice)
          return ChromeUserFriendlyCategoryDriver.fromEvent(event.parentSlice);
      } else {
        return userFriendlyCategory;
      }
    }

    var eventCategoryParts = tr.b.getCategoryParts(event.category);
    for (var i = 0; i < eventCategoryParts.length; ++i) {
      var eventCategory = eventCategoryParts[i];
      userFriendlyCategory = USER_FRIENDLY_CATEGORY_FOR_EVENT_CATEGORY[
          eventCategory];
      if (userFriendlyCategory)
        return userFriendlyCategory;
    }

    return 'other';
  };

  ChromeUserFriendlyCategoryDriver.ALL_TITLES = ['other'];
  for (var category in TITLES_FOR_USER_FRIENDLY_CATEGORY) {
    if (category === SAME_AS_PARENT)
      continue;
    ChromeUserFriendlyCategoryDriver.ALL_TITLES.push(category);
  }
  for (var category in USER_FRIENDLY_CATEGORY_FOR_EVENT_CATEGORY) {
    ChromeUserFriendlyCategoryDriver.ALL_TITLES.push(category);
  }


  return {
    ChromeUserFriendlyCategoryDriver: ChromeUserFriendlyCategoryDriver
  };
});
