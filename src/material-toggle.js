/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'string',
    label: 'toggle-on',
    name: 'toggleOn'
  }, {
    type: 'string',
    label: 'toggle-off',
    name: 'toggleOff'
  }]
}

var {
  HTMLOverlayContainer,
  ScriptLoader,
  error
} = scene

export default class MaterialToggle extends HTMLOverlayContainer {

  static get nature() {
    return NATURE;
  }

  oncreate_element(i) {

    i.classList.add('mdc-icon-toggle', 'material-icons')
    i.setAttribute('role', 'button')

    ScriptLoader.load([
      'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js'
    ], [
      'https://unpkg.com/material-components-web@0.26.0/dist/material-components-web.min.css',
      'https://fonts.googleapis.com/icon?family=Material+Icons'
    ]).then(() => {
      mdc.iconToggle.MDCIconToggle.attachTo(i);
    }, error);
  }

  /*
    * 컴포넌트의 생성 또는 속성 변화 시에 호출되며,
    * 그에 따른 html element의 반영이 필요한 부분을 구현한다.
    */

  setElementProperties(i) {
    var {
      toggleOn,
      toggleOff
    } = this.state

    i.setAttribute('data-toggle-on', JSON.stringify({
      label: 'Remove from favorites',
      content: toggleOn
    }));//'{"label": "Remove from favorites", "content": "favorite"}')

    i.setAttribute('data-toggle-off', JSON.stringify({
      label: 'Add to favorites',
      content: toggleOff
    }));//'{"label": "Add to favorites", "content": "favorite_border"}')
  }

  get tagName() {
    return 'i'
  }
}

scene.Component.register('material-toggle', MaterialToggle);
