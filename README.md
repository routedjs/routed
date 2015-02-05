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

`ctx` argument see: [Context Object](#context)


## API Reference

- Global API
    - [Routed(listener)]()
    - [.use(middleware)]()

- Route Methods
    - [.back()]()
    - [.forward()]()
    - [.route(path)]()
    - [.replace(path)]()

- [Context Object](#context)


## Global API

### Routed(listener)

### .use(middleware)

## Route Methods

### .back()

### .forward()

### .route(path)

### .replace(path)


## Context Object

#### Properties:
- **type** *<String>* boot | route | replace | manual
- **prev** *<String>* 
- **path** *<String>*
