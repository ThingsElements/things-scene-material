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
    label: 'disabled',
    name: 'disabled'
  }]
}

var {
  HTMLOverlayContainer,
  ScriptLoader,
  error
} = scene

export default class MaterialSwitch extends HTMLOverlayContainer {

  static get nature() {
    return NATURE;
  }

  oncreate_element(div) {
    div.innerHTML = `
<div class="mdc-switch">
  <input type="checkbox" class="mdc-switch__native-control" />
  <div class="mdc-switch__background">
    <div class="mdc-switch__knob"></div>
  </div>
</div>
<label class="mdc-switch-label"></label>`

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
      value,
      disabled,
      id,
      name
    } = this.state

    var [ label, input ] = ['label', 'input'].map(query => div.querySelector(query));

    if(id) {
      input.id = id + '-switch'
      label.setAttribute('for', id + '-switch')
    }

    label.textContent = this.value
    input.name = name

    if(disabled)
      input.setAttribute('disabled', '')
    else
      input.removeAttribute('disabled')
  }

  get tagName() {
    return 'div'
  }
}

scene.Component.register('material-switch', MaterialSwitch);
