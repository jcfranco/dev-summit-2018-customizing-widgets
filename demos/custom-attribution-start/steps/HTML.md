# Custom View Demo: HTML Steps

### 1. Setup Dojo Configuration for demo package

```html
<script>
    var href = location.href;
    var demoLocation = href.slice(0, href.lastIndexOf("/"));
    var dojoConfig = {
      //locale: "es",
      packages: [{
        name: "demo",
        location: demoLocation + "/app"
      }]
    };

</script>
```

### 2. Require our Attribution Table widget.

```js
"demo/AttributionTable",
```

It should look like the following:

```js
require([
      "esri/WebMap",
      "esri/views/MapView",
      "demo/AttributionTable",
      "dojo/domReady!"
    ], function (
      WebMap,
      MapView,
      AttributionTable
    ) {
```

### 3.  Initialize AttributionTable widget

```js
var attribution = new AttributionTable({
  view: view
});
```

### 4. Add AttributionTable widget to the view.ui

```js
view.ui.add(attribution, "bottom-left");
```

### 5. Add stylesheets to the document. The first is for a font and the second is for our new widget. We will use these styles later.

```html
<link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">

<link rel="stylesheet" href="app/css/AttributionTable.css">
```

### 6. Turn off default attribution on view

```js
var view = new MapView({
  container: "viewDiv",
  ui: {
    components: ["zoom"]
  },
  map: map
});
```

## Next...

After the HTML has been setup, head to the [View Steps](VIEW.md)
