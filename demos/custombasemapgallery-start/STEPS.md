# Extending View Demo: Steps

**Note**: Steps assume development environment has been previously set up.

Please refer to the following for more information:

- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
____________

1. Open `index.html`
    - simple app setup
    - imports custom widget

2. Open `CustomBasemapGallery.tsx`
    - widget extension boilerplate

3. Go to [BasemapGallery SDK](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html) and navigate to view file (TSX).
    - all widget views are available on GitHub
    - inside look at how we develop widgets

4. Let's focus on `render()`. For our demo, we want to modify the markup for individual basemap items, which is produced by `_renderBasemapGalleryItem()`.

5. Let's copy `_renderBasemapGalleryItem`.

  **methods**

  ```tsx
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  @accessibleHandler()
  private _handleClick(event: Event) {
    const item = event.currentTarget["data-item"] as BasemapGalleryItem;

    if (item.state === "ready") {
      this.activeBasemap = item.basemap;
    }
  }

  private _renderBasemapGalleryItem(item: BasemapGalleryItem): any {
    const thumbnailUrl = item.get<string>("basemap.thumbnailUrl");
    const thumbnailSource = thumbnailUrl || DEFAULT_BASEMAP_IMAGE;
    const title = item.get<string>("basemap.title");
    const tooltip = item.get<string>("error.message") || title;
    const tabIndex = item.state === "ready" ? 0 : -1;
    const isSelected = this.viewModel.basemapEquals(item.basemap, this.activeBasemap);

    const itemClasses = {
      [CSS.selectedItem]: isSelected,
      [CSS.itemLoading]: item.state === "loading",
      [CSS.itemError]: item.state === "error"
    };            ``

    const loadingIndicator = item.state === "loading" ?
      <div class={CSS.loadingIndicator} key="esri-basemap-gallery_loading-indicator" /> :
      null;

    return (
      <li aria-selected={isSelected} bind={this} 
          class={this.classes(CSS.item, itemClasses)}
          data-item={item} onkeydown={this._handleClick} onclick={this._handleClick}
          role="menuitem" tabIndex={tabIndex} title={tooltip}>
        {loadingIndicator}
        <img alt="" class={CSS.itemThumbnail} src={thumbnailSource} />
        <div class={CSS.itemTitle}>{title}</div>
      </li>
    );
  }
  ```

  **imports and constants**

  ```tsx
  import { accessibleHandler, tsx } from "esri/widgets/support/widget";

  import BasemapGallery = require("esri/widgets/BasemapGallery");
  import BasemapGalleryItem = require("esri/widgets/BasemapGallery/support/BasemapGalleryItem");

  const DEFAULT_BASEMAP_IMAGE = require.toUrl("esri/themes/base/images/basemap-toggle-64.svg");

  const CSS = {
    base: "esri-basemap-gallery esri-widget",
    sourceLoading: "esri-basemap-gallery--source-loading",
    loadingIndicator: "esri-basemap-gallery_loading-indicator",
    item: "esri-basemap-gallery__item",
    itemContainer: "esri-basemap-gallery__item-container",
    itemTitle: "esri-basemap-gallery__item-title",
    itemThumbnail: "esri-basemap-gallery__item-thumbnail",
    selectedItem: "esri-basemap-gallery__item--selected",
    itemLoading: "esri-basemap-gallery__item--loading",
    itemError: "esri-basemap-gallery__item--error",
    emptyMessage: "esri-basemap-gallery__empty-message",

    // common
    disabled: "esri-disabled"
  };
  ```

  **Note**: we added a custom CSS class to the lookup object used to apply CSS.

6. Customize `_renderBasemapGalleryItem` by wrapping thumbnail image node

  ```tsx
  <div class={CSS.thumbnailFrame}>
    <img alt="" class={CSS.itemThumbnail} src={thumbnailSource} />
  </div>
  ```

  and updating CSS lookup object

  ```tsx
  // new custom class
  thumbnailFrame: "esri-basemap-gallery__item-thumbnail-frame"
  ```

7. At this point, our widget's markup has been modified, but no custom CSS has been applied.

8. Let's bring in some precooked 8-bit CSS.

  ```css
  /* overrides BasemapGallery styles */
  
  .esri-basemap-gallery {
    color: #fff;
    padding-left: 20px;
    padding-right: 20px;
    background: #1374e8 url("../images/basemap-selection-bg.png") no-repeat;
  }
  
  .esri-basemap-gallery__item-container {
    margin: 50px 50px 0;
    justify-content: space-around;
  }
  
  .esri-basemap-gallery__item-title {
    padding: 0;
    word-break: normal;
  }
  
  .esri-basemap-gallery__item-thumbnail-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../images/frame.png") no-repeat;
    height: 115px;
    width: 115px;
  }
  
  .esri-basemap-gallery__item-thumbnail {
    height: 80px;
    width: 80px;
  }
  
  .esri-view .esri-basemap-gallery__item-container {
    flex-flow: row wrap;
    align-items: baseline;
  }
  
  .esri-view .esri-basemap-gallery__item {
    flex-flow: inherit;
    width: 20%;
    border: none;
    margin: 8px 2%;
    justify-content: center;
    text-align: center;
  }
  
  .esri-view .esri-basemap-gallery__item-title {
    margin-top: 6px;
  }
  
  .esri-view .esri-basemap-gallery__item-thumbnail {
    height: 80px;
    width: 80px;
    max-width: inherit;
    margin-bottom: 0;
  }
  
  .esri-basemap-gallery__item-thumbnail-frame:hover,
  .esri-basemap-gallery__item--selected .esri-basemap-gallery__item-thumbnail-frame {
    background: url("../images/frame-selected.png") no-repeat;
  }
  
  .esri-view .esri-widget.esri-basemap-gallery {
    height: 700px;
    width: 800px;
    max-height: none;
  }
  
  .esri-view .esri-widget.esri-basemap-gallery .esri-basemap-gallery__item,
  .esri-view .esri-widget.esri-basemap-gallery .esri-basemap-gallery__item-title {
    color: #fff;
    background-color: transparent;
    border: none;
  }
  ```

9. Done!
