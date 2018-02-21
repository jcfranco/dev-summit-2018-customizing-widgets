/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import watchUtils = require("esri/core/watchUtils");
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";

import Widget = require("esri/widgets/Widget");
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";

import AttributionViewModel = require("esri/widgets/Attribution/AttributionViewModel");

import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

// import Layer = require("esri/layers/Layer");
// import LayerView = require("esri/views/layers/LayerView");

import { Extent } from "esri/geometry";

const CSS = {
  base: "esri-widget esri-custom-attribution",
};

// function getLayerView(layer: Layer, view: MapView | SceneView): LayerView {
//   return (view as any).allLayerViews.find((lv: LayerView) => lv.layer === layer);
// }

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
  view: MapView | SceneView = null;

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
    const tableNode = this.view.ready ? (
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
    ) : null;

    return (
      <div class={CSS.base}>
        {tableNode}
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
    const { view } = this;

    if (!extent || !view) {
      return;
    }

    (view as MapView).goTo(extent);
  }

  private _getLayerUrl(layer: any): string {
    return layer.url || null;
  }

  private _renderItem(item: __esri.AttributionItem) {
    const { text, layer } = item;

    const layerUrl = this._getLayerUrl(layer);

    const layerTitleNode = layerUrl ?
      (<a target="_blank" href={layerUrl}>{layer.title}</a>) :
      (<span>{layer.title}</span>);

    // const layerView = getLayerView(layer, this.view);
    // console.log(layerView);

    return (
      <tr key={item}>
        <td>{layerTitleNode}</td>
        <td>{!!layer.visible}</td>
        <td>{layer.type}</td>
        <td>{text}</td>
        <td><a
          bind={this}
          data-extent={layer.fullExtent}
          onclick={this._zoomTo}
        >Zoom to</a></td>
      </tr>
    );
  }

  private _renderItems(): any {
    return this.viewModel.items.toArray().map(item => this._renderItem(item));
  }

}

export = Attribution;
