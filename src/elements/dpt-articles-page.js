import { LitElement, html, css } from 'lit-element';

export class DptArticlesPage extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
        perspective: 2px;
      }
      :host([hidden]) {
        display: none;
      }
      .section {
        /* Needed for children to be absolutely positioned relative to the parent. */
        position: relative;
        /* The height of the container. Must be set, but it doesn't really matter what the value is. */
        height: 100vh;
        
        /* For text formatting. */
        display: grid;
        align-items: center;
        justify-content: center;
        color: white;
        text-shadow: 0 0 5px #000;
      }
      .parallax::after {
        /* Display and position the pseudo-element */
        content: " ";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        
        /* Move the pseudo-element back away from the camera,
        * then scale it back up to fill the viewport.
        * Because the pseudo-element is further away, it appears to move more slowly, like in real life. */
        transform: translateZ(-1px) scale(1.5);
        /* Force the background image to fill the whole element. */
        background-size: 100%;
        /* Keep the image from overlapping sibling elements. */ 
        z-index: -1;
      }

      /* The styling for the static div. */
      .static {
        background: #666666;
      }

      /* Sets the actual background images to adorable kitties. This part is crucial. */
      .bg1::after {
        background-image: url('https://res.cloudinary.com/amdtel/image/upload/v1589558550/strengthevity/oa-judo.jpg');
      }

      .bg2::after {
        background-image: url('https://res.cloudinary.com/amdtel/image/upload/v1589558550/strengthevity/oa-runner.jpg');
      }
    `;
  }

  render() {
    return html`
      <section class="section parallax bg1">
        <div>
          <h1>What is the Oxygen Advantage?</h1>
          <p>The Oxygen Advantage is a simple</p>
          <p>scientifically proven breathing technique</p>
          <p>that will revolutionise your health and fitness.</p>
        </div>
      </section>
      <section class="section static">
        <div>
          <h1>Advantages of Oxygen Advantage</h1>
          <p>Improved breathing efficiency</p>
          <p>Delay the onset of lactic acid build up.</p>
          <p>Improves sleep and recovery</p>
          <p>Improves oxygen delivery to muscles and organs</p>
          <p>Reduces the risk of injury</p>
        </div>
      </section>
      <section class="section parallax bg2">
        <h1>Strengthevity can give you the Advantage</h1>
      </section>
      
    `;
  }

  // firstUpdated() {
  //   if (getComputedStyle(this.shadowRoot.getElementById('overflow')).webkitOverflowScrolling) {
  //     document.body.classList.add('sticky-parallax');
  //   } else {
  //     document.body.classList.add('overflow-parallax');
  //   }
  // }
}

customElements.define('dpt-articles-page', DptArticlesPage);
