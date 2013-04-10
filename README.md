mongoose-format
===============

A Mongoose plugin that enables you to produce formatted output of your instantiated models.

Introduction
------------

When using Mongoose, it is also likely that you are looking for different ways to output the contents of instances of your models.

But it is not always certain that you require all fields of your object, or maybe you wish them to be arranged in alternative manner.

You may even want to populate database references differently.

This plugin for Mongoose can solve all of those problems for you.

API
---
```JavaScript

  // schema.js
  var formatPlugin = require('mongoose-format');

  // schema definition
  var schema = mongoose.schema({ ... });

  schema.plugin(formatPlugin);
  
  schema.addFormat('api_v1', function (done) {
    return {
      field: value,
      field: method()
    };
  });
  ...
  
  // model.js
  // we require the schema from above
  var schema = require(...);
  
  // create a model based on that schema
  var Model = mongoose.model('Schema', schema);
  
  // instantiate our model
  var model = new Model({ ... });
  
  model.format('api_v1', function (err, output) {
    console.log(output);
  });
  ...
```

I hope that piece of code is good enough to illustrate. I recommend using some kind of async flow control to create more advanced formats.

License
-------
Copyright (C) 2012 Christoffer Hallas <christoffer.hallas@forsvikgroup.com>

Distributed under the MIT License, the same as Node.js.
