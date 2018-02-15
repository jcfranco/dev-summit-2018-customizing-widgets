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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "esri/widgets/Attribution/AttributionViewModel", "esri/core/watchUtils"], function (require, exports, __extends, __decorate, decorators_1, widget_1, Widget, AttributionViewModel, watchUtils) {
    "use strict";
    var CSS = {
        base: "esri-attribution esri-widget",
        poweredBy: "esri-attribution__powered-by",
        sources: "esri-attribution__sources",
        open: "esri-attribution--open",
        sourcesOpen: "esri-attribution__sources--open",
        link: "esri-attribution__link",
        // common.css
        interactive: "esri-interactive"
    };
    var Attribution = /** @class */ (function (_super) {
        __extends(Attribution, _super);
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
        function Attribution(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._isOpen = false;
            _this._attributionTextOverflowed = false;
            _this._prevSourceNodeHeight = 0;
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
            _this.itemDelimiter = " | ";
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
            _this.view = null;
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
            _this.viewModel = new AttributionViewModel();
            return _this;
        }
        Attribution.prototype.postInitialize = function () {
            var _this = this;
            this.own(watchUtils.on(this, "viewModel.items", "change", function () { return _this.scheduleRender(); }));
        };
        Object.defineProperty(Attribution.prototype, "attributionText", {
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
            get: function () {
                return this.viewModel.items.map(function (item) { return item.text; }).join(this.itemDelimiter);
            },
            enumerable: true,
            configurable: true
        });
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        Attribution.prototype.render = function () {
            var classes = (_a = {},
                _a[CSS.open] = this._isOpen,
                _a);
            return (widget_1.tsx("div", { bind: this, class: CSS.base, classes: classes, onclick: this._toggleState, onkeydown: this._toggleState },
                this._renderSourcesNode(),
                widget_1.tsx("div", { class: CSS.poweredBy },
                    "Powered by ",
                    widget_1.tsx("a", { target: "_blank", href: "http://www.esri.com/", class: CSS.link }, "Esri"))));
            var _a;
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Attribution.prototype._renderSourcesNode = function () {
            var isOpen = this._isOpen;
            var interactive = this._isInteractive();
            var sourceTabIndex = interactive ? 0 : -1;
            var attributionText = this.attributionText;
            var role = interactive ? "button" : undefined;
            var sourceClasses = (_a = {},
                _a[CSS.sourcesOpen] = isOpen,
                _a[CSS.interactive] = interactive,
                _a);
            return widget_1.tsx("div", { afterCreate: this._afterSourcesNodeCreate, afterUpdate: this._afterSourcesNodeUpdate, bind: this, class: CSS.sources, classes: sourceClasses, innerHTML: attributionText, role: role, tabIndex: sourceTabIndex });
            var _a;
        };
        Attribution.prototype._afterSourcesNodeCreate = function (element) {
            this._prevSourceNodeHeight = element.clientWidth;
        };
        Attribution.prototype._afterSourcesNodeUpdate = function (element) {
            var shouldRender = false;
            var clientHeight = element.clientHeight, clientWidth = element.clientWidth, scrollWidth = element.scrollWidth;
            var attributionTextOverflowed = scrollWidth >= clientWidth;
            var attributionTextOverflowChanged = this._attributionTextOverflowed !== attributionTextOverflowed;
            this._attributionTextOverflowed = attributionTextOverflowed;
            if (attributionTextOverflowChanged) {
                shouldRender = true;
            }
            if (this._isOpen) {
                var recentlyClosed = clientHeight < this._prevSourceNodeHeight;
                this._prevSourceNodeHeight = clientHeight;
                if (recentlyClosed) {
                    this._isOpen = false;
                    shouldRender = true;
                }
            }
            if (shouldRender) {
                this.scheduleRender();
            }
        };
        Attribution.prototype._toggleState = function () {
            if (this._isInteractive()) {
                this._isOpen = !this._isOpen;
            }
        };
        Attribution.prototype._isInteractive = function () {
            return this._isOpen || this._attributionTextOverflowed;
        };
        __decorate([
            decorators_1.property({
                dependsOn: ["viewModel.items.length", "itemDelimiter"],
                readOnly: true
            }),
            widget_1.renderable()
        ], Attribution.prototype, "attributionText", null);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], Attribution.prototype, "itemDelimiter", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Attribution.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: AttributionViewModel
            }),
            widget_1.renderable([
                "state",
                "view.size"
            ])
        ], Attribution.prototype, "viewModel", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], Attribution.prototype, "_toggleState", null);
        Attribution = __decorate([
            decorators_1.subclass("esri.widgets.Attribution")
        ], Attribution);
        return Attribution;
    }(decorators_1.declared(Widget)));
    return Attribution;
});
//# sourceMappingURL=CustomAttribution.js.map