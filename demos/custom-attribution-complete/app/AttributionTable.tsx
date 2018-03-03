/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import watchUtils = require("esri/core/watchUtils");
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";

import Widget = require("esri/widgets/Widget");
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";

import AttributionViewModel = require("esri/widgets/Attribution/AttributionViewModel");

import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

import i18n = require("dojo/i18n!./nls/AttributionTable");

import { Extent } from "esri/geometry";

const CSS = {
  base: "demo-attribution-table",
  noAttribution: "demo-attribution-table__no-attribution",
  iconClass: "esri-icon-description",
  iconFullExtent: "esri-icon-zoom-out-fixed",
  iconExternalLink: "esri-icon-link-external",
  table: "demo-attribution-table__table",
  tableHeaderRow: "demo-attribution-table__header-row",
  tableHeaderCell: "demo-attribution-table__header-cell",
  tableHeaderCellTitle: "demo-attribution-table__header-cell--title",
  tableHeaderCellType: "demo-attribution-table__header-cell--type",
  tableHeaderCellSources: "demo-attribution-table__header-cell--sources",
  tableRow: "demo-attribution-table__row",
  tableCell: "demo-attribution-table__cell"
};

@subclass("demo.AttributionTable")
class AttributionTable extends declared(Widget) {

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
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  iconClass
  //----------------------------------

  @property()
  iconClass = CSS.iconClass;

  //----------------------------------
  //  label
  //----------------------------------

  @property()
  label = i18n.widgetLabel;

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
    "state"
  ])
  viewModel: AttributionViewModel = new AttributionViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const headerRowNode = (
      <tr class={CSS.tableHeaderRow}>
        <th class={this.classes(CSS.tableHeaderCell, CSS.tableHeaderCellTitle)}>{i18n.columnTitle}</th>
        <th class={this.classes(CSS.tableHeaderCell, CSS.tableHeaderCellType)}>{i18n.columnType}</th>
        <th class={this.classes(CSS.tableHeaderCell, CSS.tableHeaderCellSources)}>{i18n.columnSources}</th>
      </tr>
    );

    const attributionItems = this._renderAttributionItems();

    const tableNode = (
      <table class={CSS.table}>
        {headerRowNode}
        {attributionItems}
      </table>
    );

    const noItemsNode = (
      <div class={CSS.noAttribution}>{i18n.noAttribution}</div>
    );

    const { state } = this.viewModel;

    const rootNode = state === "ready" ?
      attributionItems.length ?
        tableNode :
        noItemsNode :
      null;

    return (
      <div class={CSS.base}>{rootNode}</div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _renderAttributionItems(): any {
    return this.viewModel.items.toArray().map(item => this._renderAttributionItem(item));
  }

  private _renderAttributionItem(item: __esri.AttributionItem) {
    const { text, layer } = item;

    const { fullExtent, title, type } = layer;

    const titleNode = fullExtent ? (
      <a
        href="#"
        bind={this}
        title={i18n.fullExtent}
        data-extent={fullExtent}
        onkeydown={this._fullExtent}
        onclick={this._fullExtent}>
        {title}
      </a>
    ) : title;

    const layerUrl = this._getLayerUrl(layer);

    const typeNode = layerUrl ? (
      <a href={layerUrl}
        title={i18n.externalLink}
        target="_blank">{type}</a>
    ) : type;

    return (
      <tr class={CSS.tableRow} key={item}>
        <td class={CSS.tableCell}>{titleNode}</td>
        <td class={CSS.tableCell}>{typeNode}</td>
        <td class={CSS.tableCell}>{text}</td>
      </tr>
    );
  }

  private _getLayerUrl(layer: any): string {
    return layer.url || null;
  }

  @accessibleHandler()
  private _fullExtent(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const extent = event.currentTarget["data-extent"] as Extent;
    const { view } = this;

    if (!extent || !view) {
      return;
    }

    (view as MapView).goTo(extent);
  }

}

export = AttributionTable;
