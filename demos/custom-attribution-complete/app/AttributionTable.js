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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/widgets/Attribution/AttributionViewModel", "dojo/i18n!./nls/AttributionTable"], function (require, exports, __extends, __decorate, watchUtils, decorators_1, Widget, widget_1, AttributionViewModel, i18n) {
    "use strict";
    var CSS = {
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
    var AttributionTable = /** @class */ (function (_super) {
        __extends(AttributionTable, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function AttributionTable(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  iconClass
            //----------------------------------
            _this.iconClass = CSS.iconClass;
            //----------------------------------
            //  label
            //----------------------------------
            _this.label = i18n.widgetLabel;
            //----------------------------------
            //  view
            //----------------------------------
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            _this.viewModel = new AttributionViewModel();
            return _this;
        }
        AttributionTable.prototype.postInitialize = function () {
            var _this = this;
            this.own(watchUtils.on(this, "viewModel.items", "change", function () { return _this.scheduleRender(); }));
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        AttributionTable.prototype.render = function () {
            var headerRowNode = (widget_1.tsx("tr", { class: CSS.tableHeaderRow },
                widget_1.tsx("th", { class: this.classes(CSS.tableHeaderCell, CSS.tableHeaderCellTitle) }, i18n.columnTitle),
                widget_1.tsx("th", { class: this.classes(CSS.tableHeaderCell, CSS.tableHeaderCellType) }, i18n.columnType),
                widget_1.tsx("th", { class: this.classes(CSS.tableHeaderCell, CSS.tableHeaderCellSources) }, i18n.columnSources)));
            var attributionItems = this._renderAttributionItems();
            var tableNode = (widget_1.tsx("table", { class: CSS.table },
                headerRowNode,
                attributionItems));
            var noItemsNode = (widget_1.tsx("div", { class: CSS.noAttribution }, i18n.noAttribution));
            var state = this.viewModel.state;
            var rootNode = state === "ready" ?
                attributionItems.length ?
                    tableNode :
                    noItemsNode :
                null;
            return (widget_1.tsx("div", { class: CSS.base }, rootNode));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        AttributionTable.prototype._renderAttributionItems = function () {
            var _this = this;
            return this.viewModel.items.toArray().map(function (item) { return _this._renderAttributionItem(item); });
        };
        AttributionTable.prototype._renderAttributionItem = function (item) {
            var text = item.text, layer = item.layer;
            var fullExtent = layer.fullExtent, title = layer.title, type = layer.type;
            var titleNode = fullExtent ? (widget_1.tsx("a", { href: "#", bind: this, title: i18n.fullExtent, "data-extent": fullExtent, onkeydown: this._fullExtent, onclick: this._fullExtent }, title)) : title;
            var layerUrl = this._getLayerUrl(layer);
            var typeNode = layerUrl ? (widget_1.tsx("a", { href: layerUrl, title: i18n.externalLink, target: "_blank" }, type)) : type;
            return (widget_1.tsx("tr", { class: CSS.tableRow, key: item },
                widget_1.tsx("td", { class: CSS.tableCell }, titleNode),
                widget_1.tsx("td", { class: CSS.tableCell }, typeNode),
                widget_1.tsx("td", { class: CSS.tableCell }, text)));
        };
        AttributionTable.prototype._getLayerUrl = function (layer) {
            return layer.url || null;
        };
        AttributionTable.prototype._fullExtent = function (event) {
            event.preventDefault();
            event.stopPropagation();
            var extent = event.currentTarget["data-extent"];
            var view = this.view;
            if (!extent || !view) {
                return;
            }
            view.goTo(extent);
        };
        __decorate([
            decorators_1.property()
        ], AttributionTable.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], AttributionTable.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], AttributionTable.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: AttributionViewModel
            }),
            widget_1.renderable([
                "state"
            ])
        ], AttributionTable.prototype, "viewModel", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], AttributionTable.prototype, "_fullExtent", null);
        AttributionTable = __decorate([
            decorators_1.subclass("demo.AttributionTable")
        ], AttributionTable);
        return AttributionTable;
    }(decorators_1.declared(Widget)));
    return AttributionTable;
});
//# sourceMappingURL=AttributionTable.js.map