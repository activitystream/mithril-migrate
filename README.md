# Usage

```javascript
    // app.js
    var m = require('mithril');
    var mithril1 = require('mithril1'); // or however you want
    var migrate = require('mithril-migrate');

    migrate.m = m;
    migrate.m1 = mithril1;

    var myComponent = require('./mycomponent.js');
    
    m.mount(document.body, {
        view: function(){
            return m('.container', [
                m(myComponent)
            ])
        }
    })
```

```javascript
// mycomponent.js

var m = require('mithril1'); // or however you load mithril v1 into your app
var migrate = require('mithril-migrate');

var myComponent = {
    oninit: function(){
        console.log('intializing mithril 1.0 component inside 0.2');
    },
    view: function(vnode) {
        return m('h1', 'success')
    }
}

module.exports = migrate(myComponent);
```