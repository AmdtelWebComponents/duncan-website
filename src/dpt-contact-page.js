import { LitElement, html, css } from 'lit-element';

export class DptContactPage extends LitElement {

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
      <h1>Contact</h1>
      <sample-content size="10"></sample-content>
    `;
  }
}

customElements.define('dpt-contact-page', DptContactPage);
