/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { aliasOf, subclass, property, declared } from "esri/core/accessorSupport/decorators";
import { accessibleHandler, tsx, renderable } from "esri/widgets/support/widget";

import Widget = require("esri/widgets/Widget");

import AttributionViewModel = require("esri/widgets/Attribution/AttributionViewModel");

import watchUtils = require("esri/core/watchUtils");

import View = require("esri/views/View");

const CSS = {
  base: "esri-custom-attribution esri-widget",
  poweredBy: "esri-attribution__powered-by",
  sources: "esri-attribution__sources",
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


  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  attributionText
  //----------------------------------

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

  @property()
  @renderable()
  itemDelimiter = " | ";

  //----------------------------------
  //  view
  //----------------------------------

  @aliasOf("viewModel.view")
  view: View = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

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
    return (
      <div
        class={CSS.base}>
        Hello world
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------


}

export = Attribution;
