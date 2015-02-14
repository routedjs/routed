![logo](http://switer.qiniudn.com/crossroads.png)
# routed
The very lightweight and simple hashchange dispatcher.

# Install
Only run in brower:

```js
<script src="dist/routed.min.js"></script>
```
Or client-side module loader:

```js
var Routed = require('routed.js')
```

# Launch

```js
Routed(function (ctx) {
    // do something when hashchange
})
```

`ctx` argument see: [Context Object](#contextobject)


## API Reference

- Global API
    - [Routed(listener)](#Routedlistener)
    - [.use(middleware)](usemiddleware)

- Route Methods
    - [.back()](back)
    - [.forward()](forward)
    - [.route(path)](routepath)
    - [.replace(path)](replacepath)

- [Context Object](#contextobject)


## Global API

### Routed(listener)

### .use(middleware)

## Route Methods

### .back()
Equal to history.back

### .forward()
Equal to history

### .route(path)
- **path** <String> Hash string

### .replace(path)


## Context Object

#### Properties:

- type `<String>` Means hashchange event trigger type:
    - **boot**  routed launch first time
    - **route** use *Route.route()*
    - **replace** use *Route.replace()*
    - **manual** *history.back()*, *Routed.back()*, *history.forward()*, *Routed.forward()*, *location.hash*

- **prev** `<String>` last hash
- **path** `<String>` current hash
