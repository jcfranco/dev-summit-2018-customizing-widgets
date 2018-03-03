/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { subclass, declared } from "esri/core/accessorSupport/decorators";
import { accessibleHandler, tsx } from "esri/widgets/support/widget";

import BasemapGallery = require("esri/widgets/BasemapGallery");
import BasemapGalleryItem = require("esri/widgets/BasemapGallery/support/BasemapGalleryItem");

const DEFAULT_BASEMAP_IMAGE = require.toUrl("esri/themes/base/images/basemap-toggle-64.svg");

const CSS = {
  loadingIndicator: "esri-basemap-gallery_loading-indicator",
  item: "esri-basemap-gallery__item",
  itemTitle: "esri-basemap-gallery__item-title",
  itemThumbnail: "esri-basemap-gallery__item-thumbnail",
  selectedItem: "esri-basemap-gallery__item--selected",
  itemLoading: "esri-basemap-gallery__item--loading",
  itemError: "esri-basemap-gallery__item--error",

  // new custom class
  thumbnailFrame: "esri-basemap-gallery__item-thumbnail-frame",
};

@subclass("demo.CustomBasemapGallery")
class CustomBasemapGallery extends declared(BasemapGallery) {

  //--------------------------------------------------------------------------
  //
  //  Overridden Methods
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
    const thumbnailUrl = item.basemap.thumbnailUrl;
    const thumbnailSource = thumbnailUrl || DEFAULT_BASEMAP_IMAGE;
    const title = item.basemap.title;
    const tooltip = item.error && item.error || title;
    const tabIndex = item.state === "ready" ? 0 : -1;
    const isSelected = this.viewModel.basemapEquals(item.basemap, this.activeBasemap);

    const itemClasses = {
      [CSS.selectedItem]: isSelected,
      [CSS.itemLoading]: item.state === "loading",
      [CSS.itemError]: item.state === "error"
    };

    const loadingIndicator = item.state === "loading" ?
      <div class={CSS.loadingIndicator} key="esri-basemap-gallery_loading-indicator" /> :
      null;

    return (
      <li aria-selected={isSelected} bind={this}
          class={this.classes(CSS.item, itemClasses)}
          data-item={item} onkeydown={this._handleClick} onclick={this._handleClick}
          role="menuitem" tabIndex={tabIndex} title={tooltip}>
        {loadingIndicator}
        <div class={CSS.thumbnailFrame}>
          <img alt="" class={CSS.itemThumbnail} src={thumbnailSource} />
        </div>
        <div class={CSS.itemTitle}>{title}</div>
      </li>
    );
  }

}

export = CustomBasemapGallery;
