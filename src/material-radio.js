/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'string',
    label: 'name',
    name: 'name'
  }, {
    type: 'boolean',
    label: 'checked',
    name: 'checked'
  }]
}

var {
  HTMLOverlayContainer,
  ScriptLoader,
  error
} = scene

export default class MaterialRadio extends HTMLOverlayContainer {

  static get nature() {
    return NATURE;
  }

  oncreate_element(div) {
    div.innerHTML = `
  <div class="mdc-radio">
    <input class="mdc-radio__native-control" type="radio">
    <div class="mdc-radio__background">
      <div class="mdc-radio__outer-circle"></div>
      <div class="mdc-radio__inner-circle"></div>
    </div>
  </div>
  <label></label>`

    ScriptLoader.load([
      'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js'
    ], 'https://unpkg.com/material-components-web@0.26.0/dist/material-components-web.min.css').then(() => {
    }, error);
  }

  /*
    * 컴포넌트의 생성 또는 속성 변화 시에 호출되며,
    * 그에 따른 html element의 반영이 필요한 부분을 구현한다.
    */

  setElementProperties(div) {
    var {
      id,
      value,
      name,
      checked
    } = this.state

    var [ label, input ] = ['label', 'input'].map(query => div.querySelector(query));

    if(id) {
      input.id = id + '-radio'
      label.setAttribute('for', id + '-radio')
    }

    label.textContent = this.value
    input.name = name

    if(checked)
      input.setAttribute('checked', '')
    else
      input.removeAttribute('checked')
  }

  get tagName() {
    return 'div'
  }
}

scene.Component.register('material-radio', MaterialRadio);
