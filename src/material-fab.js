/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'string',
    label: 'icon',
    name: 'icon'
  }],
  sample: {
    type: 'material-fab',
    top: 100,
    left: 100,
    width: 50,
    height: 50,
    icon: 'favorite'
  }
}

var {
  HTMLOverlayContainer,
  ScriptLoader,
  error
} = scene

export default class MaterialFab extends HTMLOverlayContainer {

  static get nature() {
    return NATURE
  }

  oncreate_element(button) {
    button.innerHTML = '<span class="mdc-fab__icon"></span>'
    button.classList.add('mdc-fab', 'material-icons')

    ScriptLoader.load([
      'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js'
    ], [
      'https://unpkg.com/material-components-web@0.26.0/dist/material-components-web.min.css',
      'https://fonts.googleapis.com/icon?family=Material+Icons'
    ]).then(() => {
    }, error);
  }

  /*
    * 컴포넌트의 생성 또는 속성 변화 시에 호출되며,
    * 그에 따른 html element의 반영이 필요한 부분을 구현한다.
    */

  setElementProperties(button) {
    var {
      icon
    } = this.state

    console.log(this.nature)

    button.setAttribute('aria-label', this.text)

    var [ span ] = ['span'].map(query => button.querySelector(query));

    span.textContent = icon
  }

  get tagName() {
    return 'button'
  }
}

scene.Component.register('material-fab', MaterialFab);
