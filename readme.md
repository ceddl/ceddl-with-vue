# ceddl with vue

This is a Implementation example of ceddl-polyfill with vue. It demonstrates how you could use templating and ceddl data model to create a web frontend datalayer.

Files that were changed to add a datalayer to the app:

* package.json
* src/js/app.js
* src/js/routes.js
* src/index.html
* src/assets/data-models.ts

Data model that was implemented.
![data-model](screenshots/model.png)

```js
 (function () {

    ceddl.modelFactory.create({
        key: 'page',
        root: true,
        fields: {
            category: {
                type: ceddl.modelFactory.fields.StringField,
                required: true,
                choices: 'homepage|about'
            }
        }
    });

      ceddl.modelFactory.create({
        key: 'todoItem',
        root: false,
        fields: {
            state: {
                type: ceddl.modelFactory.fields.StringField,
                required: true,
                choices: 'active|completed'
            },
            content: {
                type: ceddl.modelFactory.fields.StringField,
                required: true,
            },
            contentLength: {
                type: ceddl.modelFactory.fields.NumberField,
                required: true,
            }
        }
    });

     ceddl.modelFactory.create({
        key: 'todoList',
        root: true,
        fields: {
            itemsTotal: {
                type: ceddl.modelFactory.fields.NumberField,
                required: true,
            },
            itemsLeft: {
                type: ceddl.modelFactory.fields.NumberField,
                required: true,
            },
            items: {
                type: ceddl.modelFactory.fields.ListField, // Note the ListField type here
                foreignModel: 'todoItem', // Reference to the key of the sub model
                required: false,
            },
            activeFilter: {
                type: ceddl.modelFactory.fields.StringField,
                required: true,
                choices: 'all|active|completed'
            }
        }
    });

    // Initialize not here but part of the app router.

}());
```

## Router code
```js

/*global app, Router */

(function (app, Router) {

    'use strict';

    var router = new Router();

    ['all', 'active', 'completed', 'about'].forEach(function (visibility) {
        router.on(visibility, function () {
            app.visibility = visibility;
            if(visibility == 'about') {
                // Clean datalayer in re-initialize on page change.
                ceddl.initialize();
            }
        });
    });

    router.configure({
        notfound: function () {
            window.location.hash = '';
            app.visibility = 'all';
            // Clean datalayer in re-initialize on page change.
            ceddl.initialize();
        }
    });

    router.init('/');

})(app, Router);

```

## Demo server.
Run `npm install` and `npm run start` for a dev server. Navigate to `http://localhost:4200/`.

## Licence
ceddl-with-vue is [MIT licensed]()

## CEDDL-polyfill
Customer experience digital data layer polyfill. Bridging the gap between the ceddl spec's and the browsers.
For more information please visit [https://www.ceddlbyexample.com/](https://www.ceddlbyexample.com/)
