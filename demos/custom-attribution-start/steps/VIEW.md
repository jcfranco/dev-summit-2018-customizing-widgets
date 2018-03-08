# Custom View Demo: View Steps

### 1. Add a basic class structure to the `AttributionTable.tsx` file.

```ts
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { declared, subclass } from "esri/core/accessorSupport/decorators";

import Widget = require("esri/widgets/Widget");
import { tsx } from "esri/widgets/support/widget";

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

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    return <div>Hello DevSummit!</div>
  }

}

export = AttributionTable;
```

### 2. Require and add AttributionViewModel as a property.

Require the AttributionviewModel

```ts
import AttributionViewModel = require("esri/widgets/Attribution/AttributionViewModel");
```

Setup a property for the ViewModel.

```ts
//--------------------------------------------------------------------------
//
//  Properties
//
//--------------------------------------------------------------------------

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
```

Add the renderable decorator for Widget support

```ts
import { renderable, tsx } from "esri/widgets/support/widget";
```

Add the @property decorator for Accessor property support

```ts
import { property, declared, subclass } from "esri/core/accessorSupport/decorators";
```

### 3. Add a view property for an alias of the ViewModel.view

```ts
//----------------------------------
//  view
//----------------------------------

@aliasOf("viewModel.view")
view: MapView | SceneView = null;
```

Require the aliasOf decorator from accessor decorators

```ts
import { aliasOf, property, declared, subclass } from "esri/core/accessorSupport/decorators";
```

Import MapView and SceneView

```ts
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");
```

### 4. Add aditional properties

```ts
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
```

Add CSS classes we're going to use to an object.

```ts
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
```

### 5. Setup i18n.

Import i18n.

```ts
import i18n = require("dojo/i18n!./nls/AttributionTable");
```

Add to i18n file.

```js
define({
  root: ({
    widgetLabel: "Attribution Table",
    noAttribution: "No attribution to display",
    fullExtent: "View layer's full extent",
    externalLink: "View layer's service URL",
    columnTitle: "Title",
    columnType: "Type",
    columnSources: "Source(s)"
  }),
  "es": 1
});
```

Spanish i18n file.

```js
define({
  widgetLabel: "Tabla de atribución",
  noAttribution: "Sin atribución para mostrar",
  fullExtent: "Ver la extensión completa de la capa",
  externalLink: "Ver la URL del servicio de la capa",
  columnTitle: "Título",
  columnType: "Tipo  ",
  columnSources: "Fuente(s)"
});
```

### 6. Watch for attribution items changes

```ts
postInitialize() {
  this.own(
    watchUtils.on(this, "viewModel.items", "change", () => this.scheduleRender())
  );
}
```

Import watchUtils.

```ts
import watchUtils = require("esri/core/watchUtils");
```

### 7. Modify render() method

```ts
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
```

### ** Progress report **

Now let's compile the widget and look at it.

### 8. Add private methods

```ts
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
```

### 9. Add @accessibleHandler

```ts
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";
```

### 10. Add Extent

```ts
import { Extent } from "esri/geometry";
```

### ** Progress report **

Recompile and then test.

## Next...

After the View has been setup, head to the [CSS Steps](CSS.md)
