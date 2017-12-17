/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'string',
    label: 'title',
    name: 'title'
  }, {
    type: 'string',
    label: 'subtitle',
    name: 'subtitle'
  }]
}

var {
  HTMLOverlayContainer,
  ScriptLoader,
  error
} = scene

export default class MaterialCard extends HTMLOverlayContainer {

  static get nature() {
    return NATURE;
  }

  oncreate_element(div) {
    div.classList.add('mdc-card')
    div.innerHTML = `
<section class="mdc-card__primary">
  <h1 class="mdc-card__title mdc-card__title--large"></h1>
  <h2 class="mdc-card__subtitle"></h2>
</section>
<section class="mdc-card__supporting-text"></section>
<section class="mdc-card__actions">
  <button class="mdc-button mdc-button--compact mdc-card__action">Action 1</button>
  <button class="mdc-button mdc-button--compact mdc-card__action">Action 2</button>
</section>`

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
      title,
      subtitle
    } = this.state

    var [ title_e, subtitle_e, text_e ] = ['.mdc-card__title', '.mdc-card__subtitle', '.mdc-card__supporting-text'].map(query => div.querySelector(query));

    title_e.textContent = title
    subtitle_e.textContent = subtitle
    text_e.textContent = this.text
  }

  get tagName() {
    return 'div'
  }
}

scene.Component.register('material-card', MaterialCard);
