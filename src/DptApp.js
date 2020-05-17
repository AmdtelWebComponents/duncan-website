import { LitElement, html, css } from 'lit-element';

import { installRouter } from 'pwa-helpers/router.js';

import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-icon-button';
import '@material/mwc-drawer';
import '@material/mwc-tab-bar';
import '@material/mwc-tab';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';

import 'elix/define/Carousel.js';

import '@polymer/app-layout/demo/sample-content.js';

const pageLib = ['home', 'services', 'events', 'store', 'articles', 'contact']

function getPageElement(page) {
  switch (page) {
    case 'home':
      return html`<dpt-home-page></dpt-home-page>`;
    case 'services':
      return html`<dpt-services-page></dpt-services-page>`;
    case 'events':
      return html`<dpt-events-page></dpt-events-page>`;
    case 'store':
      return html`<dpt-store-page></dpt-store-page>`;
    case 'articles':
      return html`<dpt-articles-page></dpt-articles-page>`;
    case 'contact':
      return html`<dpt-contact-page></dpt-contact-page>`;
    default:
      return '404';
  }
}

export class DptApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      _page: { type: String },
      _pageIDX: { type: Number},
      _routes: { type: Array},
      _mediaView: {type: Boolean},
      _drawerOpen: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: grid;
        align-items: center;
        text-align: center;
      }
      mwc-top-app-bar-fixed {
        --mdc-theme-primary: #666666;
      }
      mwc-top-app-bar-fixed .app-bar-title {
        font-family: 'Audiowide', cursive;
      }
      mwc-tab-bar {
        --mdc-tab-text-label-color-default: white;
        --mdc-theme-primary: red;
      }
      mwc-tab {
        --mdc-tab-horizontal-padding: 0.5em;
      }
      footer {
        background-color: black;
        color: white;
        height: 60vh;
      }
    `;
  }

  constructor() {
    super();
    let mql = window.matchMedia("(orientation: portrait)");
    mql.addListener((e) => this._handleOrientationChange(e.matches));
    this._handleOrientationChange(mql.matches);
    this._page = window.location.pathname;
  }

  render() {
    return html`
            <mwc-drawer ?open="${this._drawerOpen}" hasHeader type="modal" @MDCDrawer:closed="${()=>this._drawerOpen=false}">
              <span slot="title">StrengthEvity</span>
              <span slot="subtitle">Man conquers the world by conquering himself</span>
              <mwc-list activatable @selected="${(e)=>{window.history.pushState({}, '', window.location.origin + '/' + pageLib[e.detail.index] ); this._handleNavigation(window.location)}}">
                <mwc-list-item>Home</mwc-list-item>
                <mwc-list-item>Services</mwc-list-item>
                <mwc-list-item>Events</mwc-list-item>
                <mwc-list-item>Store</mwc-list-item>
                <mwc-list-item>Articles</mwc-list-item>
                <mwc-list-item>Contact</mwc-list-item>
              </mwc-list>
              </mwc-drawer>
              
                <mwc-top-app-bar-fixed @MDCTopAppBar:nav="${()=>this._drawerOpen=true}">
                  <div slot="title" class="app-bar-title">StrengthEvity</div>
                  ${this._mediaView
                    ? html`<mwc-icon-button icon="menu" slot="navigationIcon"></mwc-icon-button>`
                    : html`<mwc-tab-bar .activeIndex="${this._pageIDX}" slot="actionItems" @MDCTabBar:activated="${(e)=>{window.history.pushState({}, '', window.location.origin + '/' + pageLib[e.detail.index] ); this._handleNavigation(window.location)}}">
                            <mwc-tab label="Home"></mwc-tab>
                            <mwc-tab label="Services"></mwc-tab>
                            <mwc-tab label="Events"></mwc-tab>
                            <mwc-tab label="Store"></mwc-tab>
                            <mwc-tab label="Articles"></mwc-tab>
                            <mwc-tab label="Contact"></mwc-tab>
                          </mwc-tab-bar>`
                  }
                  <!-- content -->
                  ${getPageElement(this._page)}
                </mwc-top-app-bar-fixed>
                
                <footer>
                  <p>© 2018 Amdtel</p>
                </footer>
              
            
    `;
  }

  firstUpdated() {
    installRouter((location) => this._handleNavigation(location));
  }

  _handleOrientationChange(mql) {
    this._mediaView = mql;
  }
  _handleNavigation(location) {
    let path = location.pathname;
    if(getPageElement(path.slice(1)) === '404') {
      path = '/'
    }
    this._page = path === '/' ? 'home' : path.slice(1);
    if (customElements.get('dpt-' + this._page + '-page') === undefined) {
      this.loadLazy();
    }
    this._pageIDX = pageLib.findIndex(i=>i==this._page);
  }
  async loadLazy() {
    await import('./dpt-' + this._page + '-page.js');
  }
}
