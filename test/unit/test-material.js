/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { Material } from '../../src/index'

describe('Material', function () {

  var board;

  beforeEach(function () {
    board = scene.create({
      model: {
        components: [{
          id: 'material',
          type: 'material'
        }]
      }
    })
  });

  it('component should be found by its id.', function () {

    var component = board.findById('material')

    expect(!!component).not.to.equal(false);
  });
});
