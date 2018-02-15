/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { aliasOf, subclass, property, declared } from "esri/core/accessorSupport/decorators";
import { accessibleHandler, tsx, renderable } from "esri/widgets/support/widget";

import Widget = require("esri/widgets/Widget");

import AttributionViewModel = require("esri/widgets/Attribution/AttributionViewModel");

import watchUtils = require("esri/core/watchUtils");

import View = require("esri/views/View");

const CSS = {
  base: "esri-attribution esri-widget",
  poweredBy: "esri-attribution__powered-by",
  sources: "esri-attribution__sources",
  open: "esri-attribution--open",
  sourcesOpen: "esri-attribution__sources--open",
  link: "esri-attribution__link",

  // common.css
  interactive: "esri-interactive"
};

@subclass("esri.widgets.Attribution")
class Attribution extends declared(Widget) {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * @constructor
   * @alias module:esri/widgets/Attribution
   * @extends module:esri/widgets/Widget
   * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
   *                                that may be passed into the constructor.
   */
  constructor(params?: any) {
    super();
  }

  postInitialize() {
    this.own(
      watchUtils.on(this, "viewModel.items", "change", () => this.scheduleRender())
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _isOpen = false;

  private _attributionTextOverflowed = false;

  private _prevSourceNodeHeight = 0;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  attributionText
  //----------------------------------

  /**
   * Full attribution text.
   *
   * @name attributionText
   * @instance
   * @type {string}
   * @readonly
   */
  @property({
    dependsOn: ["viewModel.items.length", "itemDelimiter"],
    readOnly: true
  })
  @renderable()
  get attributionText(): string {
    return this.viewModel.items.map(item => item.text).join(this.itemDelimiter);
  }

  //----------------------------------
  //  itemDelimiter
  //----------------------------------

  /**
   * Text used to split attribution by {@link module:esri/layers/Layer layers}
   *
   * @name itemDelimiter
   * @instance
   * @type {string}
   * @default |
   */
  @property()
  @renderable()
  itemDelimiter = " | ";

  //----------------------------------
  //  view
  //----------------------------------

  /**
   * A reference to the {@link module:esri/views/MapView} or {@link module:esri/views/SceneView}. Set this to link the widget to a specific view.
   *
   * @type {module:esri/views/MapView | module:esri/views/SceneView}
   * @name view
   * @instance
   */
  @aliasOf("viewModel.view")
  view: View = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  /**
   * The view model for this widget. This is a class that contains all the logic
   * (properties and methods) that controls this widget's behavior. See the
   * {@link module:esri/widgets/Attribution/AttributionViewModel} class to access
   * all properties and methods on the widget.
   *
   * @name viewModel
   * @instance
   * @autocast
   * @type {module:esri/widgets/Attribution/AttributionViewModel}
   */
  @property({
    type: AttributionViewModel
  })
  @renderable([
    "state",
    "view.size"
  ])
  viewModel: AttributionViewModel = new AttributionViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const classes = {
      [CSS.open]: this._isOpen
    };

    return (
      <div bind={this}
        class={CSS.base}
        classes={classes}
        onclick={this._toggleState}
        onkeydown={this._toggleState}>
        {this._renderSourcesNode()}
        <div class={CSS.poweredBy}>Powered by <a target="_blank"
          href="http://www.esri.com/"
          class={CSS.link}>Esri</a></div>
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _renderSourcesNode(): any {
    const isOpen = this._isOpen;
    const interactive = this._isInteractive();
    const sourceTabIndex = interactive ? 0 : -1;
    const { attributionText } = this;
    const role = interactive ? "button" : undefined;

    const sourceClasses = {
      [CSS.sourcesOpen]: isOpen,
      [CSS.interactive]: interactive
    };

    return <div afterCreate={this._afterSourcesNodeCreate}
      afterUpdate={this._afterSourcesNodeUpdate}
      bind={this}
      class={CSS.sources}
      classes={sourceClasses}
      innerHTML={attributionText}
      role={role}
      tabIndex={sourceTabIndex} />;
  }

  private _afterSourcesNodeCreate(element: Element): void {
    this._prevSourceNodeHeight = element.clientWidth;
  }

  private _afterSourcesNodeUpdate(element: Element): void {
    let shouldRender = false;

    const { clientHeight, clientWidth, scrollWidth } = element;

    const attributionTextOverflowed = scrollWidth >= clientWidth;
    const attributionTextOverflowChanged = this._attributionTextOverflowed !== attributionTextOverflowed;
    this._attributionTextOverflowed = attributionTextOverflowed;

    if (attributionTextOverflowChanged) {
      shouldRender = true;
    }

    if (this._isOpen) {
      const recentlyClosed = clientHeight < this._prevSourceNodeHeight;
      this._prevSourceNodeHeight = clientHeight;

      if (recentlyClosed) {
        this._isOpen = false;
        shouldRender = true;
      }
    }

    if (shouldRender) {
      this.scheduleRender();
    }
  }

  @accessibleHandler()
  private _toggleState(): void {
    if (this._isInteractive()) {
      this._isOpen = !this._isOpen;
    }
  }

  private _isInteractive(): boolean {
    return this._isOpen || this._attributionTextOverflowed;
  }

}

export = Attribution;
