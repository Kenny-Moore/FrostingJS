define(["exports", "tinycolor2"], function (exports, _tinycolor) {
  /*jshint esversion: 6 */
  // Frosting v1.2.0
  // https://github.com/gooeyideas/frosting
  // 2016-11-01, Kenneth Moore, MIT License
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _tinycolor2 = _interopRequireDefault(_tinycolor);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  // Define our default color generator class!

  var ctorDefaults = {
    primary: "#0067B1"
    //accent:  "#FF9800",
    //neutral: "#D1D1D1",
    //warning: "#FFC107",
    //info:    "#03A9F4",
    //error:   "#F44336",
    //success: "#4CAF50"
  };

  var paletteDefaults = {
    colors: [],
    orig: [],
    base: '',
    json: '',
    name: '',
    palette: {}
  };

  var Frosting = function () {
    function Frosting(palettes) {
      _classCallCheck(this, Frosting);

      this.palettes = {};
      this.skewLighten = 1;
      this.skewDarken = 1;
      this.initialize(palettes);
    }

    _createClass(Frosting, [{
      key: "initialize",
      value: function initialize(palettes) {
        var FrostingPalettes = void 0;
        //Set Frosting Palette Defaults
        FrostingPalettes = _extends({}, ctorDefaults, palettes);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(FrostingPalettes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            this.initPalette(key, FrostingPalettes[key]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: "initPalette",
      value: function initPalette(key, base) {
        this.palettes[key] = _extends({}, paletteDefaults);
        if ((typeof base === "undefined" ? "undefined" : _typeof(base)) === "object") {
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
    }, {
      key: "calcPalette",
      value: function calcPalette(key) {
        this.palettes[key].orig = this.computeColors(this.palettes[key].palette);
        this.palettes[key].colors = this.palettes[key].orig;

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.palettes[key].colors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var color = _step2.value;

            this.palettes[key][color.name] = color.hex;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }, {
      key: "computeColors",
      value: function computeColors(palette) {
        // Return array of color objects.
        var base = (0, _tinycolor2.default)(palette.base);
        var light = palette.light ? (0, _tinycolor2.default)(palette.light) : base.clone().lighten(8.7 * this.skewLighten);
        var lighter = palette.lighter ? (0, _tinycolor2.default)(palette.lighter) : light.clone().lighten(8 * this.skewLighten);
        var lighterer = palette.lighterer ? (0, _tinycolor2.default)(palette.lighterer) : lighter.clone().lighten(10 * this.skewLighten);
        var lightest = palette.lightest ? (0, _tinycolor2.default)(palette.lightest) : lighterer.clone().lighten(10 * this.skewLighten);
        var lightestest = palette.lightestest ? (0, _tinycolor2.default)(palette.lightestest) : lightest.clone().lighten(9.3 * this.skewLighten);
        var dark = palette.dark ? (0, _tinycolor2.default)(palette.dark) : base.clone().darken(4.35 * this.skewDarken);
        var darker = palette.darker ? (0, _tinycolor2.default)(palette.darker) : dark.clone().darken(7 * this.skewDarken);
        var darkerer = palette.darkerer ? (0, _tinycolor2.default)(palette.darkerer) : darker.clone().darken(6 * this.skewDarken);
        var darkest = palette.darkest ? (0, _tinycolor2.default)(palette.darkest) : darkerer.clone().darken(11 * this.skewDarken);
        var darkestest = palette.darkestest ? (0, _tinycolor2.default)(palette.darkestest) : darkest.clone().darken(6 * this.skewDarken);

        return [this.getColorObject(lightestest, '50'), this.getColorObject(lightest, '100'), this.getColorObject(lighterer, '200'), this.getColorObject(lighter, '300'), this.getColorObject(light, '400'), this.getColorObject(base, '500'), this.getColorObject(dark, '600'), this.getColorObject(darker, '700'), this.getColorObject(darkerer, '800'), this.getColorObject(darkest, '900'), this.getColorObject(darkestest, '950')];
      }
    }, {
      key: "getColorObject",
      value: function getColorObject(value, name) {
        var c = (0, _tinycolor2.default)(value);
        return {
          name: name,
          hex: c.toHexString(),
          darkContrast: c.isDark()
        };
      }
    }, {
      key: "getLightestBase",
      value: function getLightestBase(base) {
        // If this base's lightest color returns white
        if ((0, _tinycolor2.default)(base).lighten(46 * this.skewLighten).toHexString().toLowerCase() === "#ffffff") {
          // Darken it and try again
          this.skewLighten -= .046;
          return this.getLightestBase(base);
        } else {
          return this.getDarkestBase(base);
        }
      }
    }, {
      key: "getDarkestBase",
      value: function getDarkestBase(base) {
        // If this base's darkest color returns black
        if ((0, _tinycolor2.default)(base).darken(34.35 * this.skewDarken).toHexString().toLowerCase() === "#000000") {
          // Lighten it and try again
          this.skewDarken -= .3435;
          return this.getDarkestBase(base);
        }
        // Otherwise,
        else {
            //...base is ready to rock!
            return base;
          }
      }
    }]);

    return Frosting;
  }();

  exports.default = Frosting;
});