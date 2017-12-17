/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [],
  sample: {
    left: 0,
    top: 0,
    width: 600,
    height: 400,
    text: 'Material Button'
  }
}

var {
  HTMLOverlayElement,
  ScriptLoader,
  error
} = scene

export default class MaterialButton extends HTMLOverlayElement {

  static get nature() {
    return NATURE
  }

  oncreate_element(button) {

    ScriptLoader.load([
      'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js'
    ], 'https://unpkg.com/material-components-web@0.26.0/dist/material-components-web.min.css').then(() => {
      this.element.classList.add('mdc-button', 'mdc-button--raised')
    }, error);
  }

  /*
   * 컴포넌트의 생성 또는 속성 변화 시에 호출되며,
   * 그에 따른 html element의 반영이 필요한 부분을 구현한다.
   */

  setElementProperties(button) {
    var {
      value
    } = this.state

    this.element.textContent = this.value
  }

  get tagName() {
    return 'button'
  }
}

scene.Component.register('material-button', MaterialButton);
