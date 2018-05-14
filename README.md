# FrostingJS
This is a proof of concept js library that (Given list of named colors) will generate palettes approaching the logic of Google Material Design Color Palettes.
Since the algorithm behind their generation is not (yet) known this module approximates the colors values. Depends on tinycolor.js: https://github.com/bgrins/TinyColor

![2018-05-14 15_14_42-frosting js w_custom input](https://user-images.githubusercontent.com/6644447/40021161-b30ea44c-5789-11e8-871a-318a4a6f1846.png)

See a working example: https://codepen.io/GooeyIdeas/pen/QqJKmq?editors=0010 


## Including in a browser
*if you want to try it out you can download it yourself and include it locally. Not ready to publish a npm/bower package*

## Basic Usage (Will Likely Change)
Create a new frosting and initalize as many named pallettes as you want. Start by passing in a single color and Frosting will generate the entire pallete,
```js
let paletteFrom = "#00A5E0"; 
let frosting = new Frosting();
	frosting.initPalette('primary', paletteFrom);
	
let lightest = frosting.primary['50']; // #CBF1FF
```

 or supply multiple colors and have frosting fill in the gaps:
 
```js
let paletteFrom = {
    lightestest: ""; 		// 50	(Google Material Shades)
    lightest:    ""; 		//100
    lighterer:   ""; 		//200
    lighter:     "#45C9FB"; 	//300
    light:       ""; 		//400
    base:        "#00A5E0"; 	//500
    dark:        "#118FBB"; 	//600
    darker:      ""; 		//700
    darkerer:    ""; 		//800
    darkest:     "#0A465A"; 	//900
    darkestest:  ""; 		//950 (Not in google material, added this mostly because my OCD required it...)
  }
let frosting = new Frosting();
	frosting.initPalette('primary', paletteFrom);
	
let lightest = frosting.primary['50']; // #D7F3FE
```
