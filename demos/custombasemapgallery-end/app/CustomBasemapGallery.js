/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/BasemapGallery"], function (require, exports, __extends, __decorate, decorators_1, widget_1, BasemapGallery) {
    "use strict";
    var DEFAULT_BASEMAP_IMAGE = require.toUrl("esri/themes/base/images/basemap-toggle-64.svg");
    var CSS = {
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
    var CustomBasemapGallery = /** @class */ (function (_super) {
        __extends(CustomBasemapGallery, _super);
        function CustomBasemapGallery() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //--------------------------------------------------------------------------
        //
        //  Overridden Methods
        //
        //--------------------------------------------------------------------------
        CustomBasemapGallery.prototype._handleClick = function (event) {
            var item = event.currentTarget["data-item"];
            if (item.state === "ready") {
                this.activeBasemap = item.basemap;
            }
        };
        CustomBasemapGallery.prototype._renderBasemapGalleryItem = function (item) {
            var thumbnailUrl = item.basemap.thumbnailUrl;
            var thumbnailSource = thumbnailUrl || DEFAULT_BASEMAP_IMAGE;
            var title = item.basemap.title;
            var tooltip = item.error && item.error || title;
            var tabIndex = item.state === "ready" ? 0 : -1;
            var isSelected = this.viewModel.basemapEquals(item.basemap, this.activeBasemap);
            var itemClasses = (_a = {},
                _a[CSS.selectedItem] = isSelected,
                _a[CSS.itemLoading] = item.state === "loading",
                _a[CSS.itemError] = item.state === "error",
                _a);
            var loadingIndicator = item.state === "loading" ?
                widget_1.tsx("div", { class: CSS.loadingIndicator, key: "esri-basemap-gallery_loading-indicator" }) :
                null;
            return (widget_1.tsx("li", { "aria-selected": isSelected, bind: this, class: this.classes(CSS.item, itemClasses), "data-item": item, onkeydown: this._handleClick, onclick: this._handleClick, role: "menuitem", tabIndex: tabIndex, title: tooltip },
                loadingIndicator,
                widget_1.tsx("div", { class: CSS.thumbnailFrame },
                    widget_1.tsx("img", { alt: "", class: CSS.itemThumbnail, src: thumbnailSource })),
                widget_1.tsx("div", { class: CSS.itemTitle }, title)));
            var _a;
        };
        __decorate([
            widget_1.accessibleHandler()
        ], CustomBasemapGallery.prototype, "_handleClick", null);
        CustomBasemapGallery = __decorate([
            decorators_1.subclass("demo.CustomBasemapGallery")
        ], CustomBasemapGallery);
        return CustomBasemapGallery;
    }(decorators_1.declared(BasemapGallery)));
    return CustomBasemapGallery;
});
//# sourceMappingURL=CustomBasemapGallery.js.map