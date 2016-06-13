# Shared Style Demo

### Concept
The purpose of this repo is to streamline the process for developers to inherit styling from parent applications to child applications, and fulfill the shared-style component of hub-ready apps. An example app and attached docs will allow internal Esri developers (and eventually Citizens) to create hub-ready applications in terms of shared-styling, whether they are starting from scratch or looking to make an existing app hub-ready.

### Walkthrough
---
#### Observe the example site
1. Clone this repo
2. Run http-server from the directory (download http-server if you do not have it on your machine)
3. Open up your locally hosted page and observe the example site, adding "/?site=562" (or any applicable site id # to observe changes). 562 (default), 563 (google), 564 (Los Angeles), 565 (Charlotte), 566 (ugly pumpkin) should all work.

#### Create your own
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

5. Set related DOM elements (navbars, h1s, ps, buttons, etc...) to observe the incorporated changes. The below are just a few examples of DOM elements that will likely change based on input parent site id #.
```html
<body>
<navbar><h1>Big header</h1></navbar>
<h3>Smaller header</h3>
<p>With any text.</p>
<button type="button" class="btn btn-default">Default</button>
<button type="button" class="btn btn-primary">Primary</button>
</body>
```

6. Call the retrieve function, which makes a call to a specific parent site id's data (based on the id # identified in the URL e.g. "/?site=562" ), and then applies that site's compiled css to your page.
```javascript
styles.retrieve())
```

7. Fiddle with the URL and observe changing styles based on called parent site id #s. For example, by changing the string at the end of your URL, something like -
```
http://127.0.0.1:8080/?site=562
```
can be changed to end in "?site=564" instead of "?site=562", and the site will now have the look and feel of site 564.

### Clarification on Hub-Ready apps
See https://github.com/ArcGIS/Hub and https://github.com/ArcGIS/Hub/blob/master/specification.md.
For now, this story aims to facilitate the incorporation of the "shared style" portion of hub-ready apps. Other major components of hub-ready apps (that can be addressed down the line in other stories) include:
- Schema matching
- Link apps to data
- Category Ontology
- Item Listing
- Structured License
- etc...

### Contact
Please reach out to mshofner@esri.com, should you have any questions around this shared-styling demo.
