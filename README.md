# Shared Style Demo

### Concept
The idea is to create an explanation mechanism that clarifies the shared-style component of hub-ready apps. An example app and attached docs will allow internal Esri developers (and eventually Citizens) to create hub-ready applications, whether they are starting from scratch or looking to make an existing app hub-ready.

### Walkthrough
#### to observe the example site
1. Clone this repo
2. Run http-server from the directory (download http-server if you do not have it on your machine)
3. Open up your locally hosted page and observe the example site, adding "/?site=562" (or any applicable site id # to observe changes. 562 (default), 563 (google), 564 (Los Angeles), 565 (Charlotte), 566 (ugly pumpkin) should all work.)

#### to include
4. Incorporate the below styles object in your JavaScript.

```javascript
var styles = {
  mule: {},
  getUrlVars: function() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name) {
    return this.getUrlVars()[name];
  },
  retrieve: function() {
    var self = this;
    var site = self.getUrlVar('site');
    $.ajax({
      // call to API with extracted site id#. Use site 562  if no site id in URL.
      url: "https://opendatadev.arcgis.com/api/v2/sites/" + (site ? site : "562") + "?fields[sites]=stylesheets"
    }).done(function(data) {
      console.log(data);
      self.extract(data);
      self.inject();
    });
  },
  extract: function(data) {
    this.mule.stylesheet = data.data.attributes.stylesheets.opendata.current;
    console.log(this.mule.stylesheet);
  },
  inject: function() {
    $('head').append('<link rel="stylesheet" href=' + this.mule.stylesheet + ' type="text/css" />');
  },
  display: function(name) {
    $('body').css('display', 'block');
  }
};
```

5. Call the retrieve function, which makes a call to a specific parent site id's data (based on the id # identified in the URL e.g. "/?site=562" ), and then applies that site's compiled css to your page.
```javascript
styles.retrieve())
```

6. Set related DOM elements (navbars, h1s, ps, buttons, etc...) to observe the incorporated changes. See the example page for more information.

### Clarification on Hub-Ready apps
See https://github.com/ArcGIS/Hub and https://github.com/ArcGIS/Hub/blob/master/specification.md.
For now, this story aims to facilitate the incorporation of the "shared style" portion of hub-ready apps. Other major components of hub-ready apps (that can be addressed down the line in other stories) include:
- Schema matching
- Link apps to data
- Category Ontology
- Item Listing
- Structured License
- etc...
