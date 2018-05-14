/*jshint esversion: 6 */
// Frosting v1.2.0
// https://github.com/gooeyideas/frosting
// 2016-11-01, Kenneth Moore, MIT License
"use strict";
import tinycolor from "tinycolor2";

// Define our default color generator class!

const ctorDefaults = {
  primary: "#0067B1",
  //accent:  "#FF9800",
  //neutral: "#D1D1D1",
  //warning: "#FFC107",
  //info:    "#03A9F4",
  //error:   "#F44336",
  //success: "#4CAF50"
};

const paletteDefaults = {
  colors: [],
  orig:   [],
  base:   '',
  json:   '',
  name:   '',
  palette: {}
};

class Frosting {

  constructor(palettes) {
    this.palettes = {};
    this.skewLighten = 1;
    this.skewDarken = 1;
    this.initialize(palettes);
  }

  initialize(palettes) {
    let FrostingPalettes;
    //Set Frosting Palette Defaults
    FrostingPalettes = Object.assign({}, ctorDefaults, palettes);
    for (let key of Object.keys(FrostingPalettes)){
      this.initPalette(key, FrostingPalettes[key]);
    }
  }

  initPalette(key, base) {
    this.palettes[key] = Object.assign({}, paletteDefaults);
    if (typeof base === "object") {      
      this.palettes[key].base = this.getLightestBase(base.base);
      this.palettes[key].palette = base;
    } else {
      this.palettes[key].base = this.getLightestBase(base);
      this.palettes[key].palette.base = this.palettes[key].base;
    }
    this.calcPalette(key);
    this.skewLighten = 1;
    this.skewDarken = 1;
  }

  calcPalette(key) {
    this.palettes[key].orig = this.computeColors(this.palettes[key].palette);
    this.palettes[key].colors = this.palettes[key].orig;
    
    for (let color of this.palettes[key].colors){
      this.palettes[key][color.name] = color.hex;
    } 
  }

  computeColors(palette) {
    // Return array of color objects.
    let base = tinycolor(palette.base);
    let light = palette.light ? tinycolor(palette.light) : base.clone().lighten( 8.7 * this.skewLighten );
    let lighter = palette.lighter ? tinycolor(palette.lighter) : light.clone().lighten( 8 * this.skewLighten );    
    let lighterer = palette.lighterer ? tinycolor(palette.lighterer) : lighter.clone().lighten( 10 * this.skewLighten );
    let lightest = palette.lightest ? tinycolor(palette.lightest) : lighterer.clone().lighten( 10 * this.skewLighten );
    let lightestest = palette.lightestest ? tinycolor(palette.lightestest) : lightest.clone().lighten( 9.3 * this.skewLighten );
    let dark = palette.dark ? tinycolor(palette.dark) : base.clone().darken( 4.35 * this.skewDarken );
    let darker = palette.darker ? tinycolor(palette.darker) : dark.clone().darken( 7 * this.skewDarken );
    let darkerer = palette.darkerer ? tinycolor(palette.darkerer) : darker.clone().darken( 6 * this.skewDarken );
    let darkest = palette.darkest ? tinycolor(palette.darkest) : darkerer.clone().darken( 11 * this.skewDarken );
    let darkestest = palette.darkestest ? tinycolor(palette.darkestest) : darkest.clone().darken( 6 * this.skewDarken );

    return [
			this.getColorObject(lightestest, '50'),
			this.getColorObject(lightest, '100'),
			this.getColorObject(lighterer, '200'),
			this.getColorObject(lighter, '300'),
			this.getColorObject(light, '400'),
			this.getColorObject(base, '500'),
			this.getColorObject(dark, '600'),
			this.getColorObject(darker, '700'),
			this.getColorObject(darkerer, '800'),
			this.getColorObject(darkest, '900'),
			this.getColorObject(darkestest, '950'),
    ];
  }
  
  getColorObject(value, name) {
    let c = tinycolor(value);
    return {
      name: name,
      hex: c.toHexString(),
      darkContrast:  c.isDark()
    };
  }

  // Function to prevent lightest
  // colors from turning into white.
  // Done by darkening base until the
  // brightest color is no longer #ffffff.
  getLightestBase (base) {
    // If this base's lightest color returns white
    if( tinycolor( base ).lighten( 46 * this.skewLighten ).toHexString().toLowerCase() === "#ffffff" ) {
      // Darken it and try again
      this.skewLighten -= .046;
      return this.getLightestBase( base );
    } 
    else {
      return this.getDarkestBase(base);
    }
  };
  // Function to prevent darkest
  // colors from turning into black.
  // Done by lightening base until the
  // darkest color is no longer #00000.
  getDarkestBase (base) {
    // If this base's darkest color returns black
    if( tinycolor( base ).darken( 34.35 * this.skewDarken ).toHexString().toLowerCase() === "#000000" ) {
      // Lighten it and try again
      this.skewDarken -= .3435;
      return this.getDarkestBase( base );
    }
      // Otherwise,
    else {
      //...base is ready to rock!
      return base;
    }
  };
}
export default Frosting;