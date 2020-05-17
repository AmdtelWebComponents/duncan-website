import { LitElement, html, css } from 'lit-element';

import 'elix/define/Carousel.js';

export class DptHomePage extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
      }
      :host([hidden]) {
        display: none;
      }
    `;
  }

  render() {
    return html`
      <elix-carousel>
        <img src="https://res.cloudinary.com/amdtel/image/upload/v1589558550/strengthevity/oa-judo.jpg">
        <img src="https://res.cloudinary.com/amdtel/image/upload/v1589558550/strengthevity/oa-runner.jpg">
        <img src="https://res.cloudinary.com/amdtel/image/upload/v1585765104/examples/Innerleithen_hightstreet.jpg">
      </elix-carousel>
      <img src="https://res.cloudinary.com/amdtel/image/upload/v1589558547/strengthevity/oa-ci-logo.jpg">
      <sample-content size="10"></sample-content>
    `;
  }
}

customElements.define('dpt-home-page', DptHomePage);
