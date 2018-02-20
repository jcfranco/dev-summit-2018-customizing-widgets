/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import watchUtils = require("esri/core/watchUtils");
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";

import Widget = require("esri/widgets/Widget");
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";

import AttributionViewModel = require("esri/widgets/Attribution/AttributionViewModel");

import View = require("esri/views/View");
import { Extent } from "esri/geometry";

const CSS = {
  base: "esri-widget esri-custom-attribution",
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
        <table>
          <tr>
            <th>Layer</th>
            <th>Visible</th>
            <th>Type</th>
            <th>Source(s)</th>
            <th>Extent</th>
          </tr>
          {this._renderItems()}
        </table>
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _zoomTo(event: Event) {
    const extent = event.currentTarget["data-extent"] as Extent;
    console.log(extent);
    const { view } = this;

    if (!extent || !view) {
      return;
    }

    (view as any).goTo(extent);
  }

  private _renderItem(item: __esri.AttributionItem) {
    const { text, layer } = item as any;

    return (
      <tr key={item}>
        <td><a target="_blank" href={layer.url}>{layer.title}</a></td>
        <td>{!!layer.visible}</td>
        <td>{layer.type}</td>
        <td>{text}</td>
        <td><a bind={this} data-extent={layer.fullExtent} onclick={this._zoomTo}>Zoom to</a></td>
      </tr>
    );
  }

  private _renderItems(): any {
    const { items } = this.viewModel;
    return (items as any).toArray().map((item: __esri.AttributionItem) => this._renderItem(item));
  }

}

export = Attribution;
