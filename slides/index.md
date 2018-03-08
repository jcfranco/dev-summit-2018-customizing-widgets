<!-- .slide: data-background="img/bg-1.png" -->
<!-- Presenter: Matt -->

# ArcGIS API for JavaScript: Customizing Widgets

### Alan Sangma – [@alansangma](https://twitter.com/alansangma)
### Matt Driscoll – [@driskull](https://twitter.com/driskull)
### JC Franco – [@arfncode](https://twitter.com/arfncode)

---

# Agenda

- What can be customized
- Customization approaches with demos
- Q & A

---

# Customizing Widgets

- Theming <!-- .element: class="fragment" data-fragment-index="1" -->
  - Changing styles: colors, sizing, font, etc.
- Implementing widget in a different framework <!-- .element: class="fragment" data-fragment-index="2" -->
- Altering presentation of a widget <!-- .element: class="fragment" data-fragment-index="3" -->

---

# Customization Approaches

- Authoring a theme <!-- .element: class="fragment" data-fragment-index="1" -->
- Recreating a view <!-- .element: class="fragment" data-fragment-index="2" -->
- Extending a view  <!-- .element: class="fragment" data-fragment-index="3" -->

---

# Ready?

![continue](./images/continue.gif)

---

<!-- Presenter: Alan -->
<h1 class="eight-bit">Level I</h1>

![Level 1](./images/8bit/JSAPI-8bit_Level-1.png)

<h2 class="eight-bit">Theming</h2>

---

# Level I: Theming
## Why Theme?                                  <!-- .element: class="fragment" data-fragment-index="0" -->
- Match branding.                              <!-- .element: class="fragment" data-fragment-index="1" -->
- Match the map.                         <!-- .element: class="fragment" data-fragment-index="2" -->
- Contrast with the map.                 <!-- .element: class="fragment" data-fragment-index="3" -->
- Based on the environment.              <!-- .element: class="fragment" data-fragment-index="4" -->
- User-specific (e.g. bigger buttons)   <!-- .element: class="fragment" data-fragment-index="5" -->

---

![Sass](./images/sass-white.png)

#### A powerful scripting language for compiling CSS.


---

![Sass](./images/sass-white.png)

### Why Sass?
- It's modular.                       <!-- .element: class="fragment" data-fragment-index="1" -->
- It's DRY.                           <!-- .element: class="fragment" data-fragment-index="2" -->
- It makes theming easy.              <!-- .element: class="fragment" data-fragment-index="3" -->

---

![Sass](./images/sass-white.png)

### Compiling
<img src="images/nodejs-new-pantone-black.png" height="80" style="margin-left:10px; margin-right: 10px;"/>
<img src="images/grunt.svg" height="80" style="margin-left:10px; margin-right: 10px;"/>

---

<h3 style="font-family:monospace;text-transform:uppercase;">Previously on Theming</h3>
<span style="font-family:monospace;text-transform:uppercase;">Life was hard.</span> <!-- .element: class="fragment" data-fragment-index="1" -->

---

Before, you needed to
1. Pull down the API.
1. Create a theme directory in the right place.
1. Run the compiler.
1. Wonder if there were a better way. <!-- .element: class="fragment" data-fragment-index="1" -->

---

# There is a better way!

1. Get Franco's theme utility. <!-- .element: class="fragment" data-fragment-index="1" -->
  - [github.com/jcfranco/jsapi-styles](https://github.com/jcfranco/jsapi-styles)
1. Use the utility. <!-- .element: class="fragment" data-fragment-index="2" -->
1. Smile. <!-- .element: class="fragment" data-fragment-index="3" -->


---

# Let's Create a Theme!

1. Clone Franco's utility
    - `git clone https://github.com/jcfranco/jsapi-styles.git`
1. Run `npm install`
    - Installs the necessary bits.
    - Creates a sample theme directory.
    - Compiles the CSS from the SCSS.
    - Spins up a preview in your default browser.

---

# Theme Structure
Before going into the individual .scss files, let's look at the theme's structure.

---

# Theme Structure

### Default
```
// Inside base/_colorVariables.scss
$background_color : #fff !default ;
```

Any value assignment overrides the `!default` value.

```
// Inside esri/themes/[your-theme-name]/main.scss
$background_color : #cc4b09;
```

But wait...there's more!

---

# Theme Structure

Override the four main color variables...

```
$text_color            : #fff;    // white
$background_color      : #cc4b09; // mario
$anchor_color          : #ffbaaa; // luigi
$button_text_color     : #ffbaaa; // luigi
```

_...then magic!_   <!-- .element: class="fragment" data-fragment-index="1" -->

<img src="./images/8bit/JSAPI-8bit_Magic.png" style="margin: 0;"/>

---

# Magic

<img src="./images/8bit/JSAPI-8bit_Magic.png" style="margin: 0;"/>

```
  $button_text_hover_color: offset-foreground-color($button_text_color, 25%) !default;
  $anchor_hover_color: offset-foreground-color($anchor_color, 25%) !default;
  $background_hover_color: offset-background-color($background_color, 5%) !default;
// etc.
```
<a href="https://developers.arcgis.com/javascript/latest/guide/styling/index.html#sassy-widgets" target="_blank">Theming Guide</a>

---

# Let's Create a Theme!
The easy way.

1. Get Franco's theme utility. <!-- .element: class="fragment" data-fragment-index="1" -->
  - [github.com/jcfranco/jsapi-styles](https://github.com/jcfranco/jsapi-styles)
1. Use the utility. <!-- .element: class="fragment" data-fragment-index="2" -->
1. Smile. <!-- .element: class="fragment" data-fragment-index="3" -->

---

# Franco's Utility

1. Download it.
1. run `npm install`

---

# Demo: Theming

<!-- .slide: data-background="img/bg-2.png" -->

<a target="_blank" href="http://localhost/jcfranco/dev-summit-2018-customizing-widgets/demos/theming/"><img src="images/theming-screenshot.png" width="600" /></a>

---

# Level I: Theming Recap

* Use Sass for easy theming. <!-- .element: class="fragment" data-fragment-index="1" -->
* Theme structure <!-- .element: class="fragment" data-fragment-index="2" -->
  - Color         <!-- .element: class="fragment" data-fragment-index="2" -->
  - Size          <!-- .element: class="fragment" data-fragment-index="2" -->
  - Typography    <!-- .element: class="fragment" data-fragment-index="2" -->
* Use the core and override values. <!-- .element: class="fragment" data-fragment-index="3" -->

---

<!-- LEVEL UP A -->
<h1 class="eight-bit">LEVEL UP!</h1>

![Level 1](./images/8bit/JSAPI-8bit_Level-1.png)

<h2 class="eight-bit">Ready?</h2>

---

<!-- LEVEL UP B -->
<h1 class="eight-bit">LEVEL II</h1>

![Level 2](./images/8bit/JSAPI-8bit_Level-2.png)

<h2 class="eight-bit">Views</h2>

---

<!-- Presenter: Matt -->
# Level II: Widget Composition

Widgets are composed of Views & ViewModels <!-- .element: class="fragment" data-fragment-index="0" -->

  - Reusable                  <!-- .element: class="fragment" data-fragment-index="1" -->
  - UI replacement            <!-- .element: class="fragment" data-fragment-index="2" -->
  - Framework integration     <!-- .element: class="fragment" data-fragment-index="3" -->

---

# Level II: Views

- Presentation of the Widget              <!-- .element: class="fragment" data-fragment-index="1" -->
- Uses ViewModel APIs to render the UI    <!-- .element: class="fragment" data-fragment-index="2" -->
- View-specific logic resides here        <!-- .element: class="fragment" data-fragment-index="3" -->

---

# Level II: Working with Views

<!-- .element: class="fragment" data-fragment-index="1" --> API Exploration

- <!-- .element: class="fragment" data-fragment-index="1" --> [Attribution Doc](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Attribution.html)
- <!-- .element: class="fragment" data-fragment-index="1" --> [Attribution Sample](https://developers.arcgis.com/javascript/latest/sample-code/widgets-layerlist/index.html)

---

# Level II: `AttributionViewModel`

```ts
// AttributionViewModel in 4.7 Release

interface AttributionViewModel {
  items: Collection<AttributionItem>;
  state: "ready" | "disabled";
  view: MapView | SceneView;
}

interface AttributionItem {
  layer: Layer;
  text: string;
}
```

---

# Views: Let's customize!

<!-- .element: class="fragment" data-fragment-index="1" --> Lets create a custom widget view.

---

# Demo

Create a custom Attribution Table view

- [Demo Steps](https://github.com/jcfranco/dev-summit-2018-customizing-widgets/tree/master/demos/custom-attribution-start/steps/STEPS.md)
- [Demo Complete](../demos/custom-attribution-complete/)
- [Demo Start](../demos/custom-attribution-start/)

[![Level 2 demo](./images/level2demo.png)](https://jcfranco.github.io/dev-summit-2018-customizing-widgets/demos/custom-attribution-complete/)

<!-- .slide: data-background="img/bg-2.png" -->

---

# Level II: Views Recap

What have we learned about Widget Views? <!-- .element: class="fragment" data-fragment-index="0" -->

- Views <!-- .element: class="fragment" data-fragment-index="1" -->
  - Face of the widget <!-- .element: class="fragment" data-fragment-index="2" -->
  - Presents the ViewModel logic <!-- .element: class="fragment" data-fragment-index="3" -->
  - View separation allows framework integration or custom views <!-- .element: class="fragment" data-fragment-index="4" -->
  - Views can be downloaded on API docs <!-- .element: class="fragment" data-fragment-index="5" -->
  - Can create views in other frameworks using ViewModels <!-- .element: class="fragment" data-fragment-index="6" -->

---

<!-- LEVEL UP A -->
<h1 class="eight-bit">LEVEL UP!</h1>

![Level 2](./images/8bit/JSAPI-8bit_Level-2.png)

<h2 class="eight-bit">Ready?</h2>

---

<!-- LEVEL UP B -->
<h1 class="eight-bit">LEVEL III</h1>

![Level 3](./images/8bit/JSAPI-8bit_Level-3.png)

<h2 class="eight-bit">Extending a View</h2>

---

<!-- Presenter: JC -->
# Level III: Extending a View

- Why?                          <!-- .element: class="fragment" data-fragment-index="1" -->
  - Reusable                    <!-- .element: class="fragment" data-fragment-index="2" -->
  - Same ecosystem              <!-- .element: class="fragment" data-fragment-index="3" -->
- How?                          <!-- .element: class="fragment" data-fragment-index="4" -->
  - JS API v4.7                 <!-- .element: class="fragment" data-fragment-index="5" -->
  - <!-- .element: class="fragment" data-fragment-index="5" --> `esri/widgets/Widget`
  - TypeScript                  <!-- .element: class="fragment" data-fragment-index="5" -->

---

`esri/widgets/Widget`

- Provides lifecycle            <!-- .element: class="fragment" data-fragment-index="1" -->
- API consistency               <!-- .element: class="fragment" data-fragment-index="2" -->

---

# Lifecycle

- <!-- .element: class="fragment" data-fragment-index="1" --> `constructor`
- <!-- .element: class="fragment" data-fragment-index="2" --> `postInitialize`
- <!-- .element: class="fragment" data-fragment-index="3" --> `render`
- <!-- .element: class="fragment" data-fragment-index="4" --> `destroy`

---

# `render`

- Defines UI                <!-- .element: class="fragment" data-fragment-index="1" -->
- Reacts to state           <!-- .element: class="fragment" data-fragment-index="2" -->
- Uses JSX                  <!-- .element: class="fragment" data-fragment-index="3" -->
- VDOM                      <!-- .element: class="fragment" data-fragment-index="4" -->

---

# TypeScript

- Typed JavaScript          <!-- .element: class="fragment" data-fragment-index="1" -->
- JS of the future, now     <!-- .element: class="fragment" data-fragment-index="2" -->
- IDE support               <!-- .element: class="fragment" data-fragment-index="3" -->
  - Visual Studio           <!-- .element: class="fragment" data-fragment-index="3" -->
  - WebStorm                <!-- .element: class="fragment" data-fragment-index="3" -->
  - Sublime                 <!-- .element: class="fragment" data-fragment-index="3" -->
  - and more!               <!-- .element: class="fragment" data-fragment-index="3" -->

---

# Demo: Extending a View

[Demo](https://jcfranco.github.io/dev-summit-2018-customizing-widgets/demos/custombasemapgallery-end/)
|
[Steps](https://github.com/jcfranco/dev-summit-2018-customizing-widgets/blob/master/demos/custombasemapgallery-start/STEPS.md)

<img src="images/demo-extending-view.png" width="50%"/>

<!-- .slide: data-background="img/bg-2.png" -->

---

# Level III: Extending a View Recap

- Reusable                          <!-- .element: class="fragment" data-fragment-index="1" -->
  - View/ViewModel                  <!-- .element: class="fragment" data-fragment-index="1" -->
- Same ecosystem                    <!-- .element: class="fragment" data-fragment-index="2" -->
  - No extra libraries              <!-- .element: class="fragment" data-fragment-index="2" -->
- Extended existing widget          <!-- .element: class="fragment" data-fragment-index="3" -->
  - Lifecycle                       <!-- .element: class="fragment" data-fragment-index="3" -->
  - TypeScript                      <!-- .element: class="fragment" data-fragment-index="3" -->

---

<!-- LEVEL UP A -->
<h1 class="eight-bit">LEVEL UP!</h1>

![Level 3](./images/8bit/JSAPI-8bit_Level-3.png)

<h2 class="eight-bit">Ready?</h2>

---

<!-- LEVEL UP B -->
<h1 class="eight-bit">LEVEL IV</h1>

![Level 4](./images/8bit/JSAPI-8bit_Level-4-ani.gif)

<h2 class="eight-bit">Put it all together.</h2>

---

# Conclusion

- Authored a theme      <!-- .element: class="fragment" data-fragment-index="1" -->
- Recreated a view      <!-- .element: class="fragment" data-fragment-index="2" -->
- Extended a view       <!-- .element: class="fragment" data-fragment-index="3" -->

---

## Additional Resources

- [Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html)
- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
- [JS API SDK](https://developers.arcgis.com/javascript/)

---

<!-- **please rate us** -->
<!-- .slide: data-background="img/ds18-survey.png" -->

---

# Questions?

##### For example

> &#x1f914; Where can I find the slides/source?

&#x1F449; [esriurl.com/customwidgetsds2018](http://esriurl.com/customwidgetsds2018) &#x1F448;

---

<!-- .slide: data-background="img/bg-final.jpg" -->

![Thank You](./images/thanks.gif)

---

<!-- .slide: data-background="img/bg-final.jpg" -->
