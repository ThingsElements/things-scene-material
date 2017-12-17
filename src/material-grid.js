/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
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

export default class MaterialGrid extends HTMLOverlayContainer {

  static get nature() {
    return NATURE;
  }

  oncreate_element(div) {
    div.classList.add('mdc-grid-list')
    div.innerHTML = '<ul class="mdc-grid-list__tiles"></ul>'
    div.style.overflow = ''

    ScriptLoader.load([
      'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js'
    ], 'https://unpkg.com/material-components-web@0.26.0/dist/material-components-web.min.css').then(() => {
      this.buildTiles()
    }, error);
  }

  buildTile(title, src) {
    return `
<li class="mdc-grid-tile">
  <div class="mdc-grid-tile__primary">
    <img class="mdc-grid-tile__primary-content" src="${src}" />
  </div>
  <span class="mdc-grid-tile__secondary">
    <span class="mdc-grid-tile__title">${title}</span>
  </span>
</li>`
  }

  buildTiles() {
    var [ ul ] = ['ul'].map(query => this.element.querySelector(query));

    ul.innerHTML = this.data.map(entry => this.buildTile(entry.title, entry.src))
    .join('')
  }

  /*
    * 컴포넌트의 생성 또는 속성 변화 시에 호출되며,
    * 그에 따른 html element의 반영이 필요한 부분을 구현한다.
    */

  setElementProperties(div) {
  }

  onchangeData(after, before) {
    super.onchangeData(after, before)

    this.buildTiles()
  }

  get tagName() {
    return 'div'
  }
}

scene.Component.register('material-grid', MaterialGrid);
