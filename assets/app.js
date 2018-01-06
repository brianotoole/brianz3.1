/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/*!****************************************!*\
  !*** ./node_modules/gsap/TweenLite.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * VERSION: 1.20.3
 * DATE: 2017-10-02
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function(window, moduleName) {

		"use strict";
		var _exports = {},
			_doc = window.document,
			_globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
		if (_globals.TweenLite) {
			return; //in case the core set of classes is already loaded, don't instantiate twice.
		}
		var _namespace = function(ns) {
				var a = ns.split("."),
					p = _globals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_tinyNum = 0.0000000001,
			_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++])) {}
				return b;
			},
			_emptyFunc = function() {},
			_isArray = (function() { //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
				var toString = Object.prototype.toString,
					array = toString.call([]);
				return function(obj) {
					return obj != null && (obj instanceof Array || (typeof(obj) === "object" && !!obj.push && toString.call(obj) === array));
				};
			}()),
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
			 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/TweenMax.js"></script>
			 * <script>
			 *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/TweenMax.js"></script>
			 * <script>
			 *     gs.TweenLite.to(...); //would use v1.7
			 *     TweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
			 */
			Definition = function(ns, dependencies, func, global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = dependencies.length,
						missing = i,
						cur, a, n, cl;
					while (--i > -1) {
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (global) {
							_globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
							if (typeof(module) !== "undefined" && module.exports) { //node
								if (ns === moduleName) {
									module.exports = _exports[moduleName] = cl;
									for (i in _exports) {
										cl[i] = _exports[i];
									}
								} else if (_exports[moduleName]) {
									_exports[moduleName][n] = cl;
								}
							} else if (true){ //AMD
								!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() { return cl; }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
							}
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has dependencies).
			_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
				return new Definition(ns, dependencies, func, global);
			},

			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, global) {
				func = func || function() {};
				_gsDefine(ns, [], function(){ return func; }, global);
				return func;
			};

		_gsDefine.globals = _globals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				if (i > 1) { 
					list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
				}
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener) {
						if (listener.up) {
							listener.c.call(listener.s || t, {type:type, target:t});
						} else {
							listener.c.call(listener.s || t);
						}
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame,
			_cancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();},
			_lastUpdate = _getTime();

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _reqAnimFrame) ? "auto" : false,
				_lagThreshold = 500,
				_adjustedLag = 33,
				_tickWord = "tick", //helps reduce gc burden
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					var elapsed = _getTime() - _lastUpdate,
						overlap, dispatch;
					if (elapsed > _lagThreshold) {
						_startTime += elapsed - _adjustedLag;
					}
					_lastUpdate += elapsed;
					_self.time = (_lastUpdate - _startTime) / 1000;
					overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						dispatch = true;
					}
					if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
						_id = _req(_tick);
					}
					if (dispatch) {
						_self.dispatchEvent(_tickWord);
					}
				};

			EventDispatcher.call(_self);
			_self.time = _self.frame = 0;
			_self.tick = function() {
				_tick(true);
			};

			_self.lagSmoothing = function(threshold, adjustedLag) {
				if (!arguments.length) { //if lagSmoothing() is called with no arguments, treat it like a getter that returns a boolean indicating if it's enabled or not. This is purposely undocumented and is for internal use.
					return (_lagThreshold < 1 / _tinyNum);
				}
				_lagThreshold = threshold || (1 / _tinyNum); //zero should be interpreted as basically unlimited
				_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
			};

			_self.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_cancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_cancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			_self.wake = function(seamless) {
				if (_id !== null) {
					_self.sleep();
				} else if (seamless) {
					_startTime += -_lastUpdate + (_lastUpdate = _getTime());
				} else if (_self.frame > 10) { //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
					_lastUpdate = _getTime() - _lagThreshold + 5;
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			_self.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			_self.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF === "auto" && _self.frame < 5 && _doc.visibilityState !== "hidden") {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(vars.delay) || 0;
				this._timeScale = 1;
				this._active = (vars.immediateRender === true);
				this.data = vars.data;
				this._reversed = (vars.reversed === true);

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = Animation.ticker = new gs.Ticker();
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;


		//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
		var _checkTimeout = function() {
				if (_tickerActive && _getTime() - _lastUpdate > 2000 && (_doc.visibilityState !== "hidden" || !_ticker.lagSmoothing())) { //note: if the tab is hidden, we should still wake if lagSmoothing has been disabled.
					_ticker.wake();
				}
				var t = setTimeout(_checkTimeout, 2000);
				if (t.unref) {
					// allows a node process to exit even if the timeout’s callback hasn't been invoked. Without it, the node process could hang as this function is called every two seconds.
					t.unref();
				}
			};
		_checkTimeout();


		p.play = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (atTime != null) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (from != null) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function(time, suppressEvents, force) {
			//stub - we override this method in subclasses.
		};

		p.invalidate = function() {
			this._time = this._totalTime = 0;
			this._initted = this._gc = false;
			this._rawPrevTime = -1;
			if (this._gc || !this.timeline) {
				this._enabled(true);
			}
			return this;
		};

		p.isActive = function() {
			var tl = this._timeline, //the 2 root timelines won't have a _timeline; they're always active.
				startTime = this._startTime,
				rawTime;
			return (!tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - 0.0000001));
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = this.isActive();
			if (ignoreTimeline !== true) {
				if (enabled && !this.timeline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};

		p._swapSelfInParams = function(params) {
			var i = params.length,
				copy = params.concat();
			while (--i > -1) {
				if (params[i] === "{self}") {
					copy[i] = this;
				}
			}
			return copy;
		};

		p._callback = function(type) {
			var v = this.vars,
				callback = v[type],
				params = v[type + "Params"],
				scope = v[type + "Scope"] || v.callbackScope || this,
				l = params ? params.length : 0;
			switch (l) { //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
				case 0: callback.call(scope); break;
				case 1: callback.call(scope, params[0]); break;
				case 2: callback.call(scope, params[0], params[1]); break;
				default: callback.apply(scope, params);
			}
		};

//----Animation getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if ((type || "").substr(0,2) === "on") {
				var v = this.vars;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = (_isArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
					v[type + "Scope"] = scope;
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
					if (tl._timeline) {
						while (tl._timeline) {
							if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
								tl.totalTime(tl._totalTime, true);
							}
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time || this._duration === 0) {
					if (_lazyTweens.length) {
						_lazyRender();
					}
					this.render(time, suppressEvents, false);
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
						_lazyRender();
					}
				}
			}
			return this;
		};

		p.progress = p.totalProgress = function(value, suppressEvents) {
			var duration = this.duration();
			return (!arguments.length) ? (duration ? this._time / duration : this.ratio) : this.totalTime(duration * value, suppressEvents);
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.endTime = function(includeRepeats) {
			return this._startTime + ((includeRepeats != false) ? this.totalDuration() : this.duration()) / this._timeScale;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			var pauseTime, t;
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				pauseTime = this._pauseTime;
				t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			t = this.timeline;
			while (t && t.timeline) { //must update the duration/totalDuration of all ancestor timelines immediately in case in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
				t._dirty = true;
				t.totalDuration();
				t = t.timeline;
			}
			return this;
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			var tl = this._timeline,
				raw, elapsed;
			if (value != this._paused) if (tl) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				raw = tl.rawTime();
				elapsed = raw - this._pauseTime;
				if (!value && tl.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = this.isActive();
				if (!value && elapsed !== 0 && this._initted && this.duration()) {
					raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
					this.render(raw, (raw === this._totalTime), true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = p._recent = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);
			}
			if (child.timeline) {
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}
			child.timeline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			this._recent = child;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}
				tween._next = tween._prev = tween.timeline = null;
				if (tween === this._recent) {
					this._recent = this._last;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused && !tween._gc)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};

/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);
				this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array || (target.push && _isArray(target))) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice(target);  //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice(targ));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
					this.render(Math.min(0, -this._delay)); //in case delay is negative
				}
			}, true),
			_isSelector = function(v) {
				return (v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;

//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = p._lazy = false;

		TweenLite.version = "1.20.3";
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		TweenLite.autoSleep = 120;
		TweenLite.lagSmoothing = function(threshold, adjustedLag) {
			_ticker.lagSmoothing(threshold, adjustedLag);
		};

		TweenLite.selector = window.$ || window.jQuery || function(e) {
			var selector = window.$ || window.jQuery;
			if (selector) {
				TweenLite.selector = selector;
				return selector(e);
			}
			return (typeof(_doc) === "undefined") ? e : (_doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
		};

		var _lazyTweens = [],
			_lazyLookup = {},
			_numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			_relExp = /[\+-]=-?[\.\d]/,
			//_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
			_setRatio = function(v) {
				var pt = this._firstPT,
					min = 0.000001,
					val;
				while (pt) {
					val = !pt.blob ? pt.c * v + pt.s : (v === 1 && this.end != null) ? this.end : v ? this.join("") : this.start;
					if (pt.m) {
						val = pt.m(val, this._target || pt.t);
					} else if (val < min) if (val > -min && !pt.blob) { //prevents issues with converting very small numbers to strings in the browser
						val = 0;
					}
					if (!pt.f) {
						pt.t[pt.p] = val;
					} else if (pt.fp) {
						pt.t[pt.p](pt.fp, val);
					} else {
						pt.t[pt.p](val);
					}
					pt = pt._next;
				}
			},
			//compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
			_blobDif = function(start, end, filter, pt) {
				var a = [],
					charIndex = 0,
					s = "",
					color = 0,
					startNums, endNums, num, i, l, nonNumbers, currentNum;
				a.start = start;
				a.end = end;
				start = a[0] = start + ""; //ensure values are strings
				end = a[1] = end + "";
				if (filter) {
					filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
					start = a[0];
					end = a[1];
				}
				a.length = 0;
				startNums = start.match(_numbersExp) || [];
				endNums = end.match(_numbersExp) || [];
				if (pt) {
					pt._next = null;
					pt.blob = 1;
					a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
				}
				l = endNums.length;
				for (i = 0; i < l; i++) {
					currentNum = endNums[i];
					nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex)-charIndex);
					s += (nonNumbers || !i) ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
					charIndex += nonNumbers.length;
					if (color) { //sense rgba() values and round them.
						color = (color + 1) % 5;
					} else if (nonNumbers.substr(-5) === "rgba(") {
						color = 1;
					}
					if (currentNum === startNums[i] || startNums.length <= i) {
						s += currentNum;
					} else {
						if (s) {
							a.push(s);
							s = "";
						}
						num = parseFloat(startNums[i]);
						a.push(num);
						a._firstPT = {_next: a._firstPT, t:a, p: a.length-1, s:num, c:((currentNum.charAt(1) === "=") ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : (parseFloat(currentNum) - num)) || 0, f:0, m:(color && color < 4) ? Math.round : 0};
						//note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
					}
					charIndex += currentNum.length;
				}
				s += end.substr(charIndex);
				if (s) {
					a.push(s);
				}
				a.setRatio = _setRatio;
				if (_relExp.test(end)) { //if the end string contains relative values, delete it so that on the final render (in _setRatio()), we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
					a.end = null;
				}
				return a;
			},
			//note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
			_addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
				if (typeof(end) === "function") {
					end = end(index || 0, target);
				}
				var type = typeof(target[prop]),
					getterName = (type !== "function") ? "" : ((prop.indexOf("set") || typeof(target["get" + prop.substr(3)]) !== "function") ? prop : "get" + prop.substr(3)),
					s = (start !== "get") ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
					isRelative = (typeof(end) === "string" && end.charAt(1) === "="),
					pt = {t:target, p:prop, s:s, f:(type === "function"), pg:0, n:overwriteProp || prop, m:(!mod ? 0 : (typeof(mod) === "function") ? mod : Math.round), pr:0, c:isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : (parseFloat(end) - s) || 0},
					blob;

				if (typeof(s) !== "number" || (typeof(end) !== "number" && !isRelative)) {
					if (funcParam || isNaN(s) || (!isRelative && isNaN(end)) || typeof(s) === "boolean" || typeof(end) === "boolean") {
						//a blob (string that has multiple numbers in it)
						pt.fp = funcParam;
						blob = _blobDif(s, (isRelative ? parseFloat(pt.s) + pt.c : end), stringFilter || TweenLite.defaultStringFilter, pt);
						pt = {t: blob, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: overwriteProp || prop, pr: 0, m: 0}; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
					} else {
						pt.s = parseFloat(s);
						if (!isRelative) {
							pt.c = (parseFloat(end) - pt.s) || 0;
						}
					}
				}
				if (pt.c) { //only add it to the linked list if there's a change.
					if ((pt._next = this._firstPT)) {
						pt._next._prev = pt;
					}
					this._firstPT = pt;
					return pt;
				}
			},
			_internals = TweenLite._internals = {isArray:_isArray, isSelector:_isSelector, lazyTweens:_lazyTweens, blobDif:_blobDif}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
			_plugins = TweenLite._plugins = {},
			_tweenLookup = _internals.tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1, lazy:1, onOverwrite:1, callbackScope:1, stringFilter:1, id:1, yoyoEase:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
			_nextGCFrame = 30,
			_lazyRender = _internals.lazyRender = function() {
				var i = _lazyTweens.length,
					tween;
				_lazyLookup = {};
				while (--i > -1) {
					tween = _lazyTweens[i];
					if (tween && tween._lazy !== false) {
						tween.render(tween._lazy[0], tween._lazy[1], true);
						tween._lazy = false;
					}
				}
				_lazyTweens.length = 0;
			};

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;
		setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

		Animation._updateRoot = TweenLite.render = function() {
				var i, a, p;
				if (_lazyTweens.length) { //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
					_lazyRender();
				}
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (_lazyTweens.length) {
					_lazyRender();
				}
				if (_ticker.frame >= _nextGCFrame) { //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
					_nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", Animation._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},
			_onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
				var func = overwrittenTween.vars.onOverwrite, r1, r2;
				if (func) {
					r1 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				func = TweenLite.onOverwrite;
				if (func) {
					r2 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				return (r1 !== false && r2 !== false);
			},
			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) {
								if (curTween._kill(null, target, tween)) {
									changed = true;
								}
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + _tinyNum,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target, tween)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
						if (mode !== 2 && !_onOverwrite(curTween, tween)) {
							continue;
						}
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},
			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime;
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _tinyNum)) ? _tinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum) ? 0 : t - reference - _tinyNum;
			};


//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				immediate = !!v.immediateRender,
				ease = v.ease,
				i, initPlugins, pt, p, startVars, l;
			if (v.startAt) {
				if (this._startAt) {
					this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
					this._startAt.kill();
				}
				startVars = {};
				for (p in v.startAt) { //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
					startVars[p] = v.startAt[p];
				}
				startVars.data = "isStart";
				startVars.overwrite = false;
				startVars.immediateRender = true;
				startVars.lazy = (immediate && v.lazy !== false);
				startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
				startVars.onUpdate = v.onUpdate;
				startVars.onUpdateParams = v.onUpdateParams;
				startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
				this._startAt = TweenLite.to(this.target, 0, startVars);
				if (immediate) {
					if (this._time > 0) {
						this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					} else if (dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {
					this._startAt.render(-1, true);
					this._startAt.kill();
					this._startAt = null;
				} else {
					if (this._time !== 0) { //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
						immediate = false;
					}
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
					pt.lazy = (immediate && v.lazy !== false);
					pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
					this._startAt = TweenLite.to(this.target, 0, pt);
					if (!immediate) {
						this._startAt._init(); //ensures that the initial values are recorded
						this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
						if (this.vars.immediateRender) {
							this._startAt = null;
						}
					} else if (this._time === 0) {
						return;
					}
				}
			}
			this._ease = ease = (!ease) ? TweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
			if (v.easeParams instanceof Array && ease.config) {
				this._ease = ease.config.apply(ease, v.easeParams);
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				l = this._targets.length;
				for (i = 0; i < l; i++) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null), i) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
			}

			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps, index) {
			var p, i, initPlugins, plugin, pt, v;
			if (target == null) {
				return false;
			}

			if (_lazyLookup[target._gsTweenID]) {
				_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
			}

			if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				v = this.vars[p];
				if (_reservedProps[p]) {
					if (v) if ((v instanceof Array) || (v.push && _isArray(v))) if (v.join("").indexOf("{self}") !== -1) {
						this.vars[p] = v = this._swapSelfInParams(v, this);
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					//m - mod           [function | 0]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:1, n:p, pg:1, pr:plugin._priority, m:0};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}
					if (pt._next) {
						pt._next._prev = pt;
					}

				} else {
					propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._firstPT) if ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration)) { //zero duration tweens don't lazy render by default; everything else does.
				_lazyLookup[target._gsTweenID] = true;
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, rawPrevTime;
			if (time >= duration - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed ) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted || (this._startAt && this._startAt.progress())) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately. Also, we check progress() because if startAt has already rendered at its end, we should force a render at its beginning. Otherwise, if you put the playhead directly on top of where a fromTo({immediateRender:false}) starts, and then move it backwards, the from() won't revert its values.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;

				if (this._easeType) {
					var r = time / duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(time / duration);
				}
			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) {
					this._time = this._totalTime = prevTime;
					this._rawPrevTime = prevRawPrevTime;
					_lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) { //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
				this._lazy = false;
			}
			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, true, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt && time !== -0.0001) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._time !== prevTime || isComplete || force) {
					this._callback("onUpdate");
				}
			}
			if (callback) if (!this._gc || force) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) { //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
					this._startAt.render(time, true, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};

		p._kill = function(vars, target, overwritingTween) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				this._lazy = false;
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
			var simultaneousOverwrite = (overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline),
				i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i], overwritingTween)) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof(vars) !== "object" || !vars._tempKill)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
						for (p in killProps) {
							if (propLookup[p]) {
								if (!killed) {
									killed = [];
								}
								killed.push(p);
							}
						}
						if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) { //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
							return false;
						}
					}

					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (simultaneousOverwrite) { //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
								if (pt.f) {
									pt.t[pt.p](pt.s);
								} else {
									pt.t[pt.p] = pt.s;
								}
								changed = true;
							}
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
			this._notifyPluginsOfEnabled = this._active = this._lazy = false;
			this._propLookup = (this._targets) ? {} : [];
			Animation.prototype.invalidate.call(this);
			if (this.vars.immediateRender) {
				this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
				this.render(Math.min(0, -this._delay)); //in case delay is negative.
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----TweenLite static methods -----------------------------------------------------

		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};

		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenLite(target, duration, vars);
		};

		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenLite(target, duration, toVars);
		};

		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, lazy:false, useFrames:useFrames, overwrite:0});
		};

		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};

		TweenLite.getTweensOf = function(target, onlyActive) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
			var i, a, j, t;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else if (target._gsTweenID) {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc || (onlyActive && !a[i].isActive())) {
						a.splice(i, 1);
					}
				}
			}
			return a || [];
		};

		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
			if (typeof(onlyActive) === "object") {
				vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
				onlyActive = false;
			}
			var a = TweenLite.getTweensOf(target, onlyActive),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.19.0";
		TweenPlugin.API = 2;
		p._firstPT = null;
		p._addTween = _addPropTween;
		p.setRatio = _setRatio;

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._mod = p._roundProps = function(lookup) {
			var pt = this._firstPT,
				val;
			while (pt) {
				val = lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ]);
				if (val && typeof(val) === "function") { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					if (pt.f === 2) {
						pt.t._applyPT.m = val;
					} else {
						pt.m = val;
					}
				}
				pt = pt._next;
			}
		};

		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_mod", mod:"_mod", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
		a = window._gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: " + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

})((typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window, "TweenLite");
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 0)))

/***/ }),
/* 2 */
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! styles/app.scss */ 3);

__webpack_require__(/*! ./main.js */ 4);

__webpack_require__(/*! ./tweens.js */ 5);

/***/ }),
/* 3 */
/*!*****************************!*\
  !*** ./src/styles/app.scss ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// MAIN
// Mobile nav
$(document).ready(function () {
  var trigger = $('#js-nav-toggle');
  var isClosed = false;
  trigger.on('click', function () {
    $('#js-nav-mobile').toggleClass('nav-open');
    $('body').toggleClass('nav-open');
    $('#js-nav-toggle').toggleClass('active');
  });
}); // scroll on click of anchor link (a href="#")

$(function () {
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 900);
        return false;
      }
    }
  });
}); // validate on formsubmit

var formSubmit = $('#js-form-submit');
formSubmit.click(function () {
  validateForm();
  return false;
}); // form validation

function validateForm() {
  var email, atpos, dotpos, username;
  name = $('#name').val();
  email = $('#email').val();
  atpos = email.indexOf('@');
  dotpos = email.lastIndexOf('.');
  message = $('#message').val();

  if (name == null || name == '') {
    $('#js-form-message').addClass('text-error text-large').text('* Please enter your name.');
    $('#name').focus();
    return false;
  }

  if (email == null || email == '') {
    $('#js-form-message').addClass('text-error text-large').text('* Please enter your email.');
    $('#email').focus();
    return false;
  }

  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
    $('#js-form-message').addClass('text-error text-large').text('* Please enter a valid email address.');
    $('#email').focus();
    return false;
  }

  if (message == null || message == '') {
    $('#js-form-message').addClass('text-error text-large').text('* Please enter your message.');
    $('#message').focus();
    return false;
  } else {
    var datastring = $("#js-form").serialize();
    $.ajax({
      //send the form using formspree
      url: "https://formspree.io/botoole518@gmail.com",
      method: "POST",
      data: datastring,
      dataType: "json"
    });
    $('#js-form-message').addClass('text-success text-large').text('Thanks for reaching out! Your message has been sent successfully. I\'ll be in touch as soon as possible.');
    return false;
  }
} // add different bg class name
// ex - '.bg-alt1' to each post item


$('.post-item').each(function (i) {
  var num = i % 4 + 1; //start index at 1

  $(this).addClass('bg-alt' + num);
  $(this).attr('data-item', i);
});

/***/ }),
/* 5 */
/*!**************************!*\
  !*** ./src/js/tweens.js ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ScrollMagic = _interopRequireDefault(__webpack_require__(/*! scrollmagic/scrollmagic/uncompressed/ScrollMagic */ 7));

var _TimelineMax = _interopRequireDefault(__webpack_require__(/*! gsap/TimelineMax */ 6));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TimelineMax & ScrollMagic
// TweenMax
//tl.method(element, duration, vars), delay
var tl = new _TimelineMax.default({});
tl // news page: timeline 
.staggerFrom('.post-item', 0.5, {
  y: 5,
  autoAlpha: 0,
  ease: Power1.easeOut
}, 0.15); // ScrollMagic
// Init

var controller = new _ScrollMagic.default.Controller(); //pin the intro

var pinIntroScene = new _ScrollMagic.default.Scene({
  triggerElement: '.section-hero',
  triggerHook: 0,
  duration: '100%'
}).setPin('.section-hero', {
  pushFollowers: false
}).addTo(controller); //loop through each el and build scene

$('.project-block, .hero-content').each(function () {
  //build a scene
  var projectScene = new _ScrollMagic.default.Scene({
    //scene options
    triggerElement: this.children[0],
    triggerHook: 0.9,
    reverse: false
  }).setClassToggle(this, 'fadeIn') //add class to el
  //.addIndicators({name: 'fade scene',}) //indicators; uses plugin
  .addTo(controller);
});

/***/ }),
/* 6 */
/*!******************************************!*\
  !*** ./node_modules/gsap/TimelineMax.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * VERSION: 1.20.3
 * DATE: 2017-10-02
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	_gsScope._gsDefine("TimelineMax", ["TimelineLite","TweenLite","easing.Ease"], function(TimelineLite, TweenLite, Ease) {
		
		var TimelineMax = function(vars) {
				TimelineLite.call(this, vars);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._dirty = true;
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = TweenLite._internals,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _gsScope._gsDefine.globals,
			_easeNone = new Ease(null, null, 1, 0),
			p = TimelineMax.prototype = new TimelineLite();
			
		p.constructor = TimelineMax;
		p.kill()._gc = false;
		TimelineMax.version = "1.20.3";
		
		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TimelineLite.prototype.invalidate.call(this);
		};
		
		p.addCallback = function(callback, position, params, scope) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};
		
		p.removeCallback = function(callback, position) {
			if (callback) {
				if (position == null) {
					this._kill(null, callback);
				} else {
					var a = this.getTweensOf(callback, false),
						i = a.length,
						time = this._parseTimeOrLabel(position);
					while (--i > -1) {
						if (a[i]._startTime === time) {
							a[i]._enabled(false, false);
						}
					}
				}
			}
			return this;
		};

		p.removePause = function(position) {
			return this.removeCallback(TimelineLite._internals.pauseCallback, position);
		};
		
		p.tweenTo = function(position, vars) {
			vars = vars || {};
			var copy = {ease:_easeNone, useFrames:this.usesFrames(), immediateRender:false},
				Engine = (vars.repeat && _globals.TweenMax) || TweenLite,
				duration, p, t;
			for (p in vars) {
				copy[p] = vars[p];
			}
			copy.time = this._parseTimeOrLabel(position);
			duration = (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001;
			t = new Engine(this, duration, copy);
			copy.onStart = function() {
				t.target.paused(true);
				if (t.vars.time !== t.target.time() && duration === t.duration()) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale );
				}
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.
					vars.onStart.apply(vars.onStartScope || vars.callbackScope || t, vars.onStartParams || []); //don't use t._callback("onStart") or it'll point to the copy.onStart and we'll get a recursion error.
				}
			};
			return t;
		};
		
		p.tweenFromTo = function(fromPosition, toPosition, vars) {
			vars = vars || {};
			fromPosition = this._parseTimeOrLabel(fromPosition);
			vars.startAt = {onComplete:this.seek, onCompleteParams:[fromPosition], callbackScope:this};
			vars.immediateRender = (vars.immediateRender !== false);
			var t = this.tweenTo(toPosition, vars);
			return t.duration((Math.abs( t.vars.time - fromPosition) / this._timeScale) || 0.001);
		};
		
		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var prevTime = this._time,
				totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				dur = this._duration,
				prevTotalTime = this._totalTime,
				prevStart = this._startTime, 
				prevTimeScale = this._timeScale, 
				prevRawPrevTime = this._rawPrevTime,
				prevPaused = this._paused, 
				prevCycle = this._cycle, 
				tween, isComplete, next, callback, internalForce, cycleDuration, pauseTween, curTime;
			if (prevTime !== this._time) { //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
				time += this._time - prevTime;
			}
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				if (!this._locked) {
					this._totalTime = totalDur;
					this._cycle = this._repeat;
				}
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) if (prevRawPrevTime !== time && this._first) {
						internalForce = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = time = 0;
				} else {
					this._time = dur;
					time = dur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7. We cannot do less then 0.0001 because the same issue can occur when the duration is extremely large like 999999999999 in which case adding 0.00000001, for example, causes it to act like nothing was added.
				}
				
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				if (!this._locked) {
					this._totalTime = this._cycle = 0;
				}
				this._time = 0;
				if (prevTime !== 0 || (dur === 0 && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || (time < 0 && prevRawPrevTime >= 0)) && !this._locked)) { //edge case for checking time < 0 && prevRawPrevTime >= 0: a zero-duration fromTo() tween inside a zero-duration timeline (yeah, very rare)
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) {
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (prevRawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (dur || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}
				
			} else {
				if (dur === 0 && prevRawPrevTime < 0) { //without this, zero-duration repeating timelines (like with a simple callback nested at the very beginning and a repeatDelay) wouldn't render the first time through.
					internalForce = true;
				}
				this._time = this._rawPrevTime = time;
				if (!this._locked) {
					this._totalTime = time;
					if (this._repeat !== 0) {
						cycleDuration = dur + this._repeatDelay;
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}
						this._time = this._totalTime - (this._cycle * cycleDuration);
						if (this._yoyo) if ((this._cycle & 1) !== 0) {
							this._time = dur - this._time;
						}
						if (this._time > dur) {
							this._time = dur;
							time = dur + 0.0001; //to avoid occasional floating point rounding error
						} else if (this._time < 0) {
							this._time = time = 0;
						} else {
							time = this._time;
						}
					}
				}

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					time = this._time;
					if (time >= prevTime || (this._repeat && prevCycle !== this._cycle)) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween && pauseTween._startTime < dur) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

			}
			
			if (this._cycle !== prevCycle) if (!this._locked) {
				/*
				make sure children at the end/beginning of the timeline are rendered properly. If, for example, 
				a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
				would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So 
				we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work. 
				*/
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
					recTotalTime = this._totalTime,
					recCycle = this._cycle,
					recRawPrevTime = this._rawPrevTime,
					recTime = this._time;
				
				this._totalTime = prevCycle * dur;
				if (this._cycle < prevCycle) {
					backwards = !backwards;
				} else {
					this._totalTime += dur;
				}
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.
				
				this._rawPrevTime = (dur === 0) ? prevRawPrevTime - 0.0001 : prevRawPrevTime;
				this._cycle = prevCycle;
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : dur;
				this.render(prevTime, suppressEvents, (dur === 0));
				if (!suppressEvents) if (!this._gc) {
					if (this.vars.onRepeat) {
						this._cycle = recCycle; //in case the onRepeat alters the playhead or invalidates(), we shouldn't stay locked or use the previous cycle.
						this._locked = false;
						this._callback("onRepeat");
					}
				}
				if (prevTime !== this._time) { //in case there's a callback like onComplete in a nested tween/timeline that changes the playhead position, like via seek(), we should just abort.
					return;
				}
				if (wrap) {
					this._cycle = prevCycle; //if there's an onRepeat, we reverted this above, so make sure it's set properly again. We also unlocked in that scenario, so reset that too.
					this._locked = true;
					prevTime = (backwards) ? dur + 0.0001 : -0.0001;
					this.render(prevTime, true, false);
				}
				this._locked = false;
				if (this._paused && !prevPaused) { //if the render() triggered callback that paused this timeline, we should abort (very rare, but possible)
					return;
				}
				this._time = recTime;
				this._totalTime = recTotalTime;
				this._cycle = recCycle;
				this._rawPrevTime = recRawPrevTime;
			}

			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._callback("onUpdate");
				}
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._totalTime !== prevTotalTime && time > 0) {
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}
			
			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0 || !this._totalDuration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}
			
			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};
		
		p.getActive = function(nested, tweens, timelines) {
			if (nested == null) {
				nested = true;
			}
			if (tweens == null) {
				tweens = true;
			}
			if (timelines == null) {
				timelines = false;
			}
			var a = [], 
				all = this.getChildren(nested, tweens, timelines), 
				cnt = 0, 
				l = all.length,
				i, tween;
			for (i = 0; i < l; i++) {
				tween = all[i];
				if (tween.isActive()) {
					a[cnt++] = tween;
				}
			}
			return a;
		};
		
		
		p.getLabelAfter = function(time) {
			if (!time) if (time !== 0) { //faster than isNan()
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				l = labels.length,
				i;
			for (i = 0; i < l; i++) {
				if (labels[i].time > time) {
					return labels[i].name;
				}
			}
			return null;
		};
		
		p.getLabelBefore = function(time) {
			if (time == null) {
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				i = labels.length;
			while (--i > -1) {
				if (labels[i].time < time) {
					return labels[i].name;
				}
			}
			return null;
		};
		
		p.getLabelsArray = function() {
			var a = [],
				cnt = 0,
				p;
			for (p in this._labels) {
				a[cnt++] = {time:this._labels[p], name:p};
			}
			a.sort(function(a,b) {
				return a.time - b.time;
			});
			return a;
		};

		p.invalidate = function() {
			this._locked = false; //unlock and set cycle in case invalidate() is called from inside an onRepeat
			return TimelineLite.prototype.invalidate.call(this);
		};

		
//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------
		
		p.progress = function(value, suppressEvents) {
			return (!arguments.length) ? (this._time / this.duration()) || 0 : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};
		
		p.totalProgress = function(value, suppressEvents) {
			return (!arguments.length) ? (this._totalTime / this.totalDuration()) || 0 : this.totalTime( this.totalDuration() * value, suppressEvents);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					TimelineLite.prototype.totalDuration.call(this); //just forces refresh
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}
				return this._totalDuration;
			}
			return (this._repeat === -1 || !value) ? this : this.timeScale( this.totalDuration() / value );
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};
		
		p.currentLabel = function(value) {
			if (!arguments.length) {
				return this.getLabelBefore(this._time + 0.00000001);
			}
			return this.seek(value, true);
		};
		
		return TimelineMax;
		
	}, true);







/*
 * ----------------------------------------------------------------
 * TimelineLite
 * ----------------------------------------------------------------
 */

	_gsScope._gsDefine("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {

		var TimelineLite = function(vars) {
				SimpleTimeline.call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren === true);
				this.smoothChildTiming = (this.vars.smoothChildTiming === true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var v = this.vars,
					val, p;
				for (p in v) {
					val = v[p];
					if (_isArray(val)) if (val.join("").indexOf("{self}") !== -1) {
						v[p] = this._swapSelfInParams(val);
					}
				}
				if (_isArray(v.tweens)) {
					this.add(v.tweens, 0, v.align, v.stagger);
				}
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = TweenLite._internals,
			_internals = TimelineLite._internals = {},
			_isSelector = TweenLiteInternals.isSelector,
			_isArray = TweenLiteInternals.isArray,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _gsScope._gsDefine.globals,
			_copy = function(vars) {
				var copy = {}, p;
				for (p in vars) {
					copy[p] = vars[p];
				}
				return copy;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val(i, targets[i]) : val[i % val.length];
				}
				delete vars.cycle;
			},
			_pauseCallback = _internals.pauseCallback = function() {},
			_slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			p = TimelineLite.prototype = new SimpleTimeline();

		TimelineLite.version = "1.20.3";
		p.constructor = TimelineLite;
		p.kill()._gc = p._forcingPlayhead = p._hasPause = false;

		/* might use later...
		//translates a local time inside an animation to the corresponding time on the root/global timeline, factoring in all nesting and timeScales.
		function localToGlobal(time, animation) {
			while (animation) {
				time = (time / animation._timeScale) + animation._startTime;
				animation = animation.timeline;
			}
			return time;
		}

		//translates the supplied time on the root/global timeline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
		function globalToLocal(time, animation) {
			var scale = 1;
			time -= localToGlobal(0, animation);
			while (animation) {
				scale *= animation._timeScale;
				animation = animation.timeline;
			}
			return time * scale;
		}
		*/

		p.to = function(target, duration, vars, position) {
			var Engine = (vars.repeat && _globals.TweenMax) || TweenLite;
			return duration ? this.add( new Engine(target, duration, vars), position) : this.set(target, vars, position);
		};

		p.from = function(target, duration, vars, position) {
			return this.add( ((vars.repeat && _globals.TweenMax) || TweenLite).from(target, duration, vars), position);
		};

		p.fromTo = function(target, duration, fromVars, toVars, position) {
			var Engine = (toVars.repeat && _globals.TweenMax) || TweenLite;
			return duration ? this.add( Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};

		p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, callbackScope:onCompleteAllScope, smoothChildTiming:this.smoothChildTiming}),
				cycle = vars.cycle,
				copy, i;
			if (typeof(targets) === "string") {
				targets = TweenLite.selector(targets) || targets;
			}
			targets = targets || [];
			if (_isSelector(targets)) { //senses if the targets object is a selector. If it is, we should translate it into an array.
				targets = _slice(targets);
			}
			stagger = stagger || 0;
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			for (i = 0; i < targets.length; i++) {
				copy = _copy(vars);
				if (copy.startAt) {
					copy.startAt = _copy(copy.startAt);
					if (copy.startAt.cycle) {
						_applyCycle(copy.startAt, targets, i);
					}
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				tl.to(targets[i], duration, copy, i * stagger);
			}
			return this.add(tl, position);
		};

		p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.immediateRender = (vars.immediateRender != false);
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.call = function(callback, params, scope, position) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.set = function(target, vars, position) {
			position = this._parseTimeOrLabel(position, 0, true);
			if (vars.immediateRender == null) {
				vars.immediateRender = (position === this._time && !this._paused);
			}
			return this.add( new TweenLite(target, 0, vars), position);
		};

		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline,
				hasNegativeStart, time,	tween, next;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			tween = root._first;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target === tween.vars.onComplete)) {
					time = tween._startTime - tween._delay;
					if (time < 0) {
						hasNegativeStart = 1;
					}
					tl.add(tween, time);
				}
				tween = next;
			}
			root.add(tl, 0);
			if (hasNegativeStart) { //calling totalDuration() will force the adjustment necessary to shift the children forward so none of them start before zero, and moves the timeline backwards the same amount, so the playhead is still aligned where it should be globally, but the timeline doesn't have illegal children that start before zero.
				tl.totalDuration();
			}
			return tl;
		};

		p.add = function(value, position, align, stagger) {
			var curTime, l, i, child, tl, beforeRawTime;
			if (typeof(position) !== "number") {
				position = this._parseTimeOrLabel(position, 0, true, value);
			}
			if (!(value instanceof Animation)) {
				if ((value instanceof Array) || (value && value.push && _isArray(value))) {
					align = align || "normal";
					stagger = stagger || 0;
					curTime = position;
					l = value.length;
					for (i = 0; i < l; i++) {
						if (_isArray(child = value[i])) {
							child = new TimelineLite({tweens:child});
						}
						this.add(child, curTime);
						if (typeof(child) !== "string" && typeof(child) !== "function") {
							if (align === "sequence") {
								curTime = child._startTime + (child.totalDuration() / child._timeScale);
							} else if (align === "start") {
								child._startTime -= child.delay();
							}
						}
						curTime += stagger;
					}
					return this._uncache(true);
				} else if (typeof(value) === "string") {
					return this.addLabel(value, position);
				} else if (typeof(value) === "function") {
					value = TweenLite.delayedCall(0, value);
				} else {
					throw("Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.");
				}
			}

			SimpleTimeline.prototype.add.call(this, value, position);

			if (value._time) { //in case, for example, the _startTime is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
				value.render((this.rawTime() - value._startTime) * value._timeScale, false, false);
			}

			//if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.
			if (this._gc || this._time === this._duration) if (!this._paused) if (this._duration < this.duration()) {
				//in case any of the ancestors had completed but should now be enabled...
				tl = this;
				beforeRawTime = (tl.rawTime() > value._startTime); //if the tween is placed on the timeline so that it starts BEFORE the current rawTime, we should align the playhead (move the timeline). This is because sometimes users will create a timeline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.
				while (tl._timeline) {
					if (beforeRawTime && tl._timeline.smoothChildTiming) {
						tl.totalTime(tl._totalTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.
					} else if (tl._gc) {
						tl._enabled(true, false);
					}
					tl = tl._timeline;
				}
			}

			return this;
		};

		p.remove = function(value) {
			if (value instanceof Animation) {
				this._remove(value, false);
				var tl = value._timeline = value.vars.useFrames ? Animation._rootFramesTimeline : Animation._rootTimeline; //now that it's removed, default it to the root timeline so that if it gets played again, it doesn't jump back into this timeline.
				value._startTime = (value._paused ? value._pauseTime : tl._time) - ((!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale); //ensure that if it gets played again, the timing is correct.
				return this;
			} else if (value instanceof Array || (value && value.push && _isArray(value))) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		};

		p._remove = function(tween, skipDisable) {
			SimpleTimeline.prototype._remove.call(this, tween, skipDisable);
			var last = this._last;
			if (!last) {
				this._time = this._totalTime = this._duration = this._totalDuration = 0;
			} else if (this._time > this.duration()) {
				this._time = this._duration;
				this._totalTime = this._totalDuration;
			}
			return this;
		};

		p.append = function(value, offsetOrLabel) {
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
		};

		p.insert = p.insertMultiple = function(value, position, align, stagger) {
			return this.add(value, position || 0, align, stagger);
		};

		p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
		};

		p.addLabel = function(label, position) {
			this._labels[label] = this._parseTimeOrLabel(position);
			return this;
		};

		p.addPause = function(position, callback, params, scope) {
			var t = TweenLite.delayedCall(0, _pauseCallback, params, scope || this);
			t.vars.onComplete = t.vars.onReverseComplete = callback;
			t.data = "isPause";
			this._hasPause = true;
			return this.add(t, position);
		};

		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		};

		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		};

		p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
			var clippedDuration, i;
			//if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof Animation && ignore.timeline === this) {
				this.remove(ignore);
			} else if (ignore && ((ignore instanceof Array) || (ignore.push && _isArray(ignore)))) {
				i = ignore.length;
				while (--i > -1) {
					if (ignore[i] instanceof Animation && ignore[i].timeline === this) {
						this.remove(ignore[i]);
					}
				}
			}
			clippedDuration = (typeof(timeOrLabel) === "number" && !offsetOrLabel) ? 0 : (this.duration() > 99999999999) ? this.recent().endTime(false) : this._duration; //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
			if (typeof(offsetOrLabel) === "string") {
				return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof(timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - clippedDuration : 0, appendIfAbsent);
			}
			offsetOrLabel = offsetOrLabel || 0;
			if (typeof(timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) { //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");
				if (i === -1) {
					if (this._labels[timeOrLabel] == null) {
						return appendIfAbsent ? (this._labels[timeOrLabel] = clippedDuration + offsetOrLabel) : offsetOrLabel;
					}
					return this._labels[timeOrLabel] + offsetOrLabel;
				}
				offsetOrLabel = parseInt(timeOrLabel.charAt(i-1) + "1", 10) * Number(timeOrLabel.substr(i+1));
				timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i-1), 0, appendIfAbsent) : clippedDuration;
			} else if (timeOrLabel == null) {
				timeOrLabel = clippedDuration;
			}
			return Number(timeOrLabel) + offsetOrLabel;
		};

		p.seek = function(position, suppressEvents) {
			return this.totalTime((typeof(position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== false));
		};

		p.stop = function() {
			return this.paused(true);
		};

		p.gotoAndPlay = function(position, suppressEvents) {
			return this.play(position, suppressEvents);
		};

		p.gotoAndStop = function(position, suppressEvents) {
			return this.pause(position, suppressEvents);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevTime = this._time,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevPaused = this._paused,
				tween, isComplete, next, callback, internalForce, pauseTween, curTime;
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || this._rawPrevTime < 0 || this._rawPrevTime === _tinyNum) if (this._rawPrevTime !== time && this._first) {
						internalForce = true;
						if (this._rawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime !== _tinyNum && (this._rawPrevTime > 0 || (time < 0 && this._rawPrevTime >= 0)))) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) { //ensures proper GC if a timeline is resumed after it's finished reversing.
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (this._rawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}

			} else {

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					if (time >= prevTime) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

				this._totalTime = this._time = this._rawPrevTime = time;
			}
			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._time !== prevTime && time > 0) {
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0 || !this._duration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= curTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}

			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};

		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		};

		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [],
				tween = this._first,
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof TweenLite) {
					if (tweens !== false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines !== false) {
						a[cnt++] = tween;
					}
					if (nested !== false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		};

		p.getTweensOf = function(target, nested) {
			var disabled = this._gc,
				a = [],
				cnt = 0,
				tweens, i;
			if (disabled) {
				this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the timeline completes in order to allow clean garbage collection, so temporarily re-enable the timeline here.
			}
			tweens = TweenLite.getTweensOf(target);
			i = tweens.length;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			if (disabled) {
				this._enabled(false, true);
			}
			return a;
		};

		p.recent = function() {
			return this._recent;
		};

		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		};

		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first,
				labels = this._labels,
				p;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		};

		p._kill = function(vars, target) {
			if (!vars && !target) {
				return this._enabled(false, false);
			}
			var tweens = (!target) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length,
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		};

		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels !== false) {
				this._labels = {};
			}
			return this._uncache(true);
		};

		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return Animation.prototype.invalidate.call(this);;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled === this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			this._forcingPlayhead = true;
			var val = Animation.prototype.totalTime.apply(this, arguments);
			this._forcingPlayhead = false;
			return val;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0 && value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0,
						tween = this._last,
						prevStart = 999999999999,
						prev, end;
					while (tween) {
						prev = tween._prev; //record it here in case the tween changes position in the sequence...
						if (tween._dirty) {
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}
						if (tween._startTime > prevStart && this._sortChildren && !tween._paused && !this._calculatingDuration) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this._calculatingDuration = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add(), like _parseTimeOrLabel().
							this.add(tween, tween._startTime - tween._delay);
							this._calculatingDuration = 0;
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0 && !tween._paused) { //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;
							if (this._timeline.smoothChildTiming) {
								this._startTime += tween._startTime / this._timeScale;
								this._time -= tween._startTime;
								this._totalTime -= tween._startTime;
								this._rawPrevTime -= tween._startTime;
							}
							this.shiftChildren(-tween._startTime, false, -9999999999);
							prevStart = 0;
						}
						end = tween._startTime + (tween._totalDuration / tween._timeScale);
						if (end > max) {
							max = end;
						}
						tween = prev;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (value && this.totalDuration()) ? this.timeScale(this._totalDuration / value) : this;
		};

		p.paused = function(value) {
			if (!value) { //if there's a pause directly at the spot from where we're unpausing, skip it.
				var tween = this._first,
					time = this._time;
				while (tween) {
					if (tween._startTime === time && tween.data === "isPause") {
						tween._rawPrevTime = 0; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
					}
					tween = tween._next;
				}
			}
			return Animation.prototype.paused.apply(this, arguments);
		};

		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === Animation._rootFramesTimeline);
		};

		p.rawTime = function(wrapRepeats) {
			return (wrapRepeats && (this._paused || (this._repeat && this.time() > 0 && this.totalProgress() < 1))) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(wrapRepeats) - this._startTime) * this._timeScale;
		};

		return TimelineLite;

	}, true);

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		__webpack_require__(/*! gsap/TweenLite */ 1); //dependency
		module.exports = getGlobal();
	} else if (true) { //AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! gsap/TweenLite */ 1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (getGlobal),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
}("TimelineMax"));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 0)))

/***/ }),
/* 7 */
/*!**************************************************************************!*\
  !*** ./node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js ***!
  \**************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * ScrollMagic v2.0.5 (2015-04-29)
 * The javascript library for magical scroll interactions.
 * (c) 2015 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 * 
 * @version 2.0.5
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic main library.
 */
/**
 * @namespace ScrollMagic
 */
(function (root, factory) {
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory();
	} else {
		// Browser global
		root.ScrollMagic = factory();
	}
}(this, function () {
	"use strict";

	var ScrollMagic = function () {
		_util.log(2, '(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use \'new ScrollMagic.Controller()\' to create a new controller instance. Use \'new ScrollMagic.Scene()\' to instance a scene.');
	};

	ScrollMagic.version = "2.0.5";

	// TODO: temporary workaround for chrome's scroll jitter bug
	window.addEventListener("mousewheel", function () {});

	// global const
	var PIN_SPACER_ATTRIBUTE = "data-scrollmagic-pin-spacer";

	/**
	 * The main class that is needed once per scroll container.
	 *
	 * @class
	 *
	 * @example
	 * // basic initialization
	 * var controller = new ScrollMagic.Controller();
	 *
	 * // passing options
	 * var controller = new ScrollMagic.Controller({container: "#myContainer", loglevel: 3});
	 *
	 * @param {object} [options] - An object containing one or more options for the controller.
	 * @param {(string|object)} [options.container=window] - A selector, DOM object that references the main container for scrolling.
	 * @param {boolean} [options.vertical=true] - Sets the scroll mode to vertical (`true`) or horizontal (`false`) scrolling.
	 * @param {object} [options.globalSceneOptions={}] - These options will be passed to every Scene that is added to the controller using the addScene method. For more information on Scene options see {@link ScrollMagic.Scene}.
	 * @param {number} [options.loglevel=2] Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
	 ** `0` => silent
	 ** `1` => errors
	 ** `2` => errors, warnings
	 ** `3` => errors, warnings, debuginfo
	 * @param {boolean} [options.refreshInterval=100] - Some changes don't call events by default, like changing the container size or moving a scene trigger element.  
	 This interval polls these parameters to fire the necessary events.  
	 If you don't use custom containers, trigger elements or have static layouts, where the positions of the trigger elements don't change, you can set this to 0 disable interval checking and improve performance.
	 *
	 */
	ScrollMagic.Controller = function (options) {
/*
	 * ----------------------------------------------------------------
	 * settings
	 * ----------------------------------------------------------------
	 */
		var
		NAMESPACE = 'ScrollMagic.Controller',
			SCROLL_DIRECTION_FORWARD = 'FORWARD',
			SCROLL_DIRECTION_REVERSE = 'REVERSE',
			SCROLL_DIRECTION_PAUSED = 'PAUSED',
			DEFAULT_OPTIONS = CONTROLLER_OPTIONS.defaults;

/*
	 * ----------------------------------------------------------------
	 * private vars
	 * ----------------------------------------------------------------
	 */
		var
		Controller = this,
			_options = _util.extend({}, DEFAULT_OPTIONS, options),
			_sceneObjects = [],
			_updateScenesOnNextCycle = false,
			// can be boolean (true => all scenes) or an array of scenes to be updated
			_scrollPos = 0,
			_scrollDirection = SCROLL_DIRECTION_PAUSED,
			_isDocument = true,
			_viewPortSize = 0,
			_enabled = true,
			_updateTimeout, _refreshTimeout;

/*
	 * ----------------------------------------------------------------
	 * private functions
	 * ----------------------------------------------------------------
	 */

		/**
		 * Internal constructor function of the ScrollMagic Controller
		 * @private
		 */
		var construct = function () {
			for (var key in _options) {
				if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
					log(2, "WARNING: Unknown option \"" + key + "\"");
					delete _options[key];
				}
			}
			_options.container = _util.get.elements(_options.container)[0];
			// check ScrollContainer
			if (!_options.container) {
				log(1, "ERROR creating object " + NAMESPACE + ": No valid scroll container supplied");
				throw NAMESPACE + " init failed."; // cancel
			}
			_isDocument = _options.container === window || _options.container === document.body || !document.body.contains(_options.container);
			// normalize to window
			if (_isDocument) {
				_options.container = window;
			}
			// update container size immediately
			_viewPortSize = getViewportSize();
			// set event handlers
			_options.container.addEventListener("resize", onChange);
			_options.container.addEventListener("scroll", onChange);

			_options.refreshInterval = parseInt(_options.refreshInterval) || DEFAULT_OPTIONS.refreshInterval;
			scheduleRefresh();

			log(3, "added new " + NAMESPACE + " controller (v" + ScrollMagic.version + ")");
		};

		/**
		 * Schedule the next execution of the refresh function
		 * @private
		 */
		var scheduleRefresh = function () {
			if (_options.refreshInterval > 0) {
				_refreshTimeout = window.setTimeout(refresh, _options.refreshInterval);
			}
		};

		/**
		 * Default function to get scroll pos - overwriteable using `Controller.scrollPos(newFunction)`
		 * @private
		 */
		var getScrollPos = function () {
			return _options.vertical ? _util.get.scrollTop(_options.container) : _util.get.scrollLeft(_options.container);
		};

		/**
		 * Returns the current viewport Size (width vor horizontal, height for vertical)
		 * @private
		 */
		var getViewportSize = function () {
			return _options.vertical ? _util.get.height(_options.container) : _util.get.width(_options.container);
		};

		/**
		 * Default function to set scroll pos - overwriteable using `Controller.scrollTo(newFunction)`
		 * Make available publicly for pinned mousewheel workaround.
		 * @private
		 */
		var setScrollPos = this._setScrollPos = function (pos) {
			if (_options.vertical) {
				if (_isDocument) {
					window.scrollTo(_util.get.scrollLeft(), pos);
				} else {
					_options.container.scrollTop = pos;
				}
			} else {
				if (_isDocument) {
					window.scrollTo(pos, _util.get.scrollTop());
				} else {
					_options.container.scrollLeft = pos;
				}
			}
		};

		/**
		 * Handle updates in cycles instead of on scroll (performance)
		 * @private
		 */
		var updateScenes = function () {
			if (_enabled && _updateScenesOnNextCycle) {
				// determine scenes to update
				var scenesToUpdate = _util.type.Array(_updateScenesOnNextCycle) ? _updateScenesOnNextCycle : _sceneObjects.slice(0);
				// reset scenes
				_updateScenesOnNextCycle = false;
				var oldScrollPos = _scrollPos;
				// update scroll pos now instead of onChange, as it might have changed since scheduling (i.e. in-browser smooth scroll)
				_scrollPos = Controller.scrollPos();
				var deltaScroll = _scrollPos - oldScrollPos;
				if (deltaScroll !== 0) { // scroll position changed?
					_scrollDirection = (deltaScroll > 0) ? SCROLL_DIRECTION_FORWARD : SCROLL_DIRECTION_REVERSE;
				}
				// reverse order of scenes if scrolling reverse
				if (_scrollDirection === SCROLL_DIRECTION_REVERSE) {
					scenesToUpdate.reverse();
				}
				// update scenes
				scenesToUpdate.forEach(function (scene, index) {
					log(3, "updating Scene " + (index + 1) + "/" + scenesToUpdate.length + " (" + _sceneObjects.length + " total)");
					scene.update(true);
				});
				if (scenesToUpdate.length === 0 && _options.loglevel >= 3) {
					log(3, "updating 0 Scenes (nothing added to controller)");
				}
			}
		};

		/**
		 * Initializes rAF callback
		 * @private
		 */
		var debounceUpdate = function () {
			_updateTimeout = _util.rAF(updateScenes);
		};

		/**
		 * Handles Container changes
		 * @private
		 */
		var onChange = function (e) {
			log(3, "event fired causing an update:", e.type);
			if (e.type == "resize") {
				// resize
				_viewPortSize = getViewportSize();
				_scrollDirection = SCROLL_DIRECTION_PAUSED;
			}
			// schedule update
			if (_updateScenesOnNextCycle !== true) {
				_updateScenesOnNextCycle = true;
				debounceUpdate();
			}
		};

		var refresh = function () {
			if (!_isDocument) {
				// simulate resize event. Only works for viewport relevant param (performance)
				if (_viewPortSize != getViewportSize()) {
					var resizeEvent;
					try {
						resizeEvent = new Event('resize', {
							bubbles: false,
							cancelable: false
						});
					} catch (e) { // stupid IE
						resizeEvent = document.createEvent("Event");
						resizeEvent.initEvent("resize", false, false);
					}
					_options.container.dispatchEvent(resizeEvent);
				}
			}
			_sceneObjects.forEach(function (scene, index) { // refresh all scenes
				scene.refresh();
			});
			scheduleRefresh();
		};

		/**
		 * Send a debug message to the console.
		 * provided publicly with _log for plugins
		 * @private
		 *
		 * @param {number} loglevel - The loglevel required to initiate output for the message.
		 * @param {...mixed} output - One or more variables that should be passed to the console.
		 */
		var log = this._log = function (loglevel, output) {
			if (_options.loglevel >= loglevel) {
				Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ") ->");
				_util.log.apply(window, arguments);
			}
		};
		// for scenes we have getters for each option, but for the controller we don't, so we need to make it available externally for plugins
		this._options = _options;

		/**
		 * Sort scenes in ascending order of their start offset.
		 * @private
		 *
		 * @param {array} ScenesArray - an array of ScrollMagic Scenes that should be sorted
		 * @return {array} The sorted array of Scenes.
		 */
		var sortScenes = function (ScenesArray) {
			if (ScenesArray.length <= 1) {
				return ScenesArray;
			} else {
				var scenes = ScenesArray.slice(0);
				scenes.sort(function (a, b) {
					return a.scrollOffset() > b.scrollOffset() ? 1 : -1;
				});
				return scenes;
			}
		};

		/**
		 * ----------------------------------------------------------------
		 * public functions
		 * ----------------------------------------------------------------
		 */

		/**
		 * Add one ore more scene(s) to the controller.  
		 * This is the equivalent to `Scene.addTo(controller)`.
		 * @public
		 * @example
		 * // with a previously defined scene
		 * controller.addScene(scene);
		 *
		 * // with a newly created scene.
		 * controller.addScene(new ScrollMagic.Scene({duration : 0}));
		 *
		 * // adding multiple scenes
		 * controller.addScene([scene, scene2, new ScrollMagic.Scene({duration : 0})]);
		 *
		 * @param {(ScrollMagic.Scene|array)} newScene - ScrollMagic Scene or Array of Scenes to be added to the controller.
		 * @return {Controller} Parent object for chaining.
		 */
		this.addScene = function (newScene) {
			if (_util.type.Array(newScene)) {
				newScene.forEach(function (scene, index) {
					Controller.addScene(scene);
				});
			} else if (newScene instanceof ScrollMagic.Scene) {
				if (newScene.controller() !== Controller) {
					newScene.addTo(Controller);
				} else if (_sceneObjects.indexOf(newScene) < 0) {
					// new scene
					_sceneObjects.push(newScene); // add to array
					_sceneObjects = sortScenes(_sceneObjects); // sort
					newScene.on("shift.controller_sort", function () { // resort whenever scene moves
						_sceneObjects = sortScenes(_sceneObjects);
					});
					// insert Global defaults.
					for (var key in _options.globalSceneOptions) {
						if (newScene[key]) {
							newScene[key].call(newScene, _options.globalSceneOptions[key]);
						}
					}
					log(3, "adding Scene (now " + _sceneObjects.length + " total)");
				}
			} else {
				log(1, "ERROR: invalid argument supplied for '.addScene()'");
			}
			return Controller;
		};

		/**
		 * Remove one ore more scene(s) from the controller.  
		 * This is the equivalent to `Scene.remove()`.
		 * @public
		 * @example
		 * // remove a scene from the controller
		 * controller.removeScene(scene);
		 *
		 * // remove multiple scenes from the controller
		 * controller.removeScene([scene, scene2, scene3]);
		 *
		 * @param {(ScrollMagic.Scene|array)} Scene - ScrollMagic Scene or Array of Scenes to be removed from the controller.
		 * @returns {Controller} Parent object for chaining.
		 */
		this.removeScene = function (Scene) {
			if (_util.type.Array(Scene)) {
				Scene.forEach(function (scene, index) {
					Controller.removeScene(scene);
				});
			} else {
				var index = _sceneObjects.indexOf(Scene);
				if (index > -1) {
					Scene.off("shift.controller_sort");
					_sceneObjects.splice(index, 1);
					log(3, "removing Scene (now " + _sceneObjects.length + " left)");
					Scene.remove();
				}
			}
			return Controller;
		};

		/**
		 * Update one ore more scene(s) according to the scroll position of the container.  
		 * This is the equivalent to `Scene.update()`.  
		 * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
		 * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.  
		 * _**Note:** This method gets called constantly whenever Controller detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
		 * @public
		 * @example
		 * // update a specific scene on next cycle
		 * controller.updateScene(scene);
		 *
		 * // update a specific scene immediately
		 * controller.updateScene(scene, true);
		 *
		 * // update multiple scenes scene on next cycle
		 * controller.updateScene([scene1, scene2, scene3]);
		 *
		 * @param {ScrollMagic.Scene} Scene - ScrollMagic Scene or Array of Scenes that is/are supposed to be updated.
		 * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle.  
		 This is useful when changing multiple properties of the scene - this way it will only be updated once all new properties are set (updateScenes).
		 * @return {Controller} Parent object for chaining.
		 */
		this.updateScene = function (Scene, immediately) {
			if (_util.type.Array(Scene)) {
				Scene.forEach(function (scene, index) {
					Controller.updateScene(scene, immediately);
				});
			} else {
				if (immediately) {
					Scene.update(true);
				} else if (_updateScenesOnNextCycle !== true && Scene instanceof ScrollMagic.Scene) { // if _updateScenesOnNextCycle is true, all connected scenes are already scheduled for update
					// prep array for next update cycle
					_updateScenesOnNextCycle = _updateScenesOnNextCycle || [];
					if (_updateScenesOnNextCycle.indexOf(Scene) == -1) {
						_updateScenesOnNextCycle.push(Scene);
					}
					_updateScenesOnNextCycle = sortScenes(_updateScenesOnNextCycle); // sort
					debounceUpdate();
				}
			}
			return Controller;
		};

		/**
		 * Updates the controller params and calls updateScene on every scene, that is attached to the controller.  
		 * See `Controller.updateScene()` for more information about what this means.  
		 * In most cases you will not need this function, as it is called constantly, whenever ScrollMagic detects a state change event, like resize or scroll.  
		 * The only application for this method is when ScrollMagic fails to detect these events.  
		 * One application is with some external scroll libraries (like iScroll) that move an internal container to a negative offset instead of actually scrolling. In this case the update on the controller needs to be called whenever the child container's position changes.
		 * For this case there will also be the need to provide a custom function to calculate the correct scroll position. See `Controller.scrollPos()` for details.
		 * @public
		 * @example
		 * // update the controller on next cycle (saves performance due to elimination of redundant updates)
		 * controller.update();
		 *
		 * // update the controller immediately
		 * controller.update(true);
		 *
		 * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance)
		 * @return {Controller} Parent object for chaining.
		 */
		this.update = function (immediately) {
			onChange({
				type: "resize"
			}); // will update size and set _updateScenesOnNextCycle to true
			if (immediately) {
				updateScenes();
			}
			return Controller;
		};

		/**
		 * Scroll to a numeric scroll offset, a DOM element, the start of a scene or provide an alternate method for scrolling.  
		 * For vertical controllers it will change the top scroll offset and for horizontal applications it will change the left offset.
		 * @public
		 *
		 * @since 1.1.0
		 * @example
		 * // scroll to an offset of 100
		 * controller.scrollTo(100);
		 *
		 * // scroll to a DOM element
		 * controller.scrollTo("#anchor");
		 *
		 * // scroll to the beginning of a scene
		 * var scene = new ScrollMagic.Scene({offset: 200});
		 * controller.scrollTo(scene);
		 *
		 * // define a new scroll position modification function (jQuery animate instead of jump)
		 * controller.scrollTo(function (newScrollPos) {
		 *	$("html, body").animate({scrollTop: newScrollPos});
		 * });
		 * controller.scrollTo(100); // call as usual, but the new function will be used instead
		 *
		 * // define a new scroll function with an additional parameter
		 * controller.scrollTo(function (newScrollPos, message) {
		 *  console.log(message);
		 *	$(this).animate({scrollTop: newScrollPos});
		 * });
		 * // call as usual, but supply an extra parameter to the defined custom function
		 * controller.scrollTo(100, "my message");
		 *
		 * // define a new scroll function with an additional parameter containing multiple variables
		 * controller.scrollTo(function (newScrollPos, options) {
		 *  someGlobalVar = options.a + options.b;
		 *	$(this).animate({scrollTop: newScrollPos});
		 * });
		 * // call as usual, but supply an extra parameter containing multiple options
		 * controller.scrollTo(100, {a: 1, b: 2});
		 *
		 * // define a new scroll function with a callback supplied as an additional parameter
		 * controller.scrollTo(function (newScrollPos, callback) {
		 *	$(this).animate({scrollTop: newScrollPos}, 400, "swing", callback);
		 * });
		 * // call as usual, but supply an extra parameter, which is used as a callback in the previously defined custom scroll function
		 * controller.scrollTo(100, function() {
		 *	console.log("scroll has finished.");
		 * });
		 *
		 * @param {mixed} scrollTarget - The supplied argument can be one of these types:
		 * 1. `number` -> The container will scroll to this new scroll offset.
		 * 2. `string` or `object` -> Can be a selector or a DOM object.  
		 *  The container will scroll to the position of this element.
		 * 3. `ScrollMagic Scene` -> The container will scroll to the start of this scene.
		 * 4. `function` -> This function will be used for future scroll position modifications.  
		 *  This provides a way for you to change the behaviour of scrolling and adding new behaviour like animation. The function receives the new scroll position as a parameter and a reference to the container element using `this`.  
		 *  It may also optionally receive an optional additional parameter (see below)  
		 *  _**NOTE:**  
		 *  All other options will still work as expected, using the new function to scroll._
		 * @param {mixed} [additionalParameter] - If a custom scroll function was defined (see above 4.), you may want to supply additional parameters to it, when calling it. You can do this using this parameter – see examples for details. Please note, that this parameter will have no effect, if you use the default scrolling function.
		 * @returns {Controller} Parent object for chaining.
		 */
		this.scrollTo = function (scrollTarget, additionalParameter) {
			if (_util.type.Number(scrollTarget)) { // excecute
				setScrollPos.call(_options.container, scrollTarget, additionalParameter);
			} else if (scrollTarget instanceof ScrollMagic.Scene) { // scroll to scene
				if (scrollTarget.controller() === Controller) { // check if the controller is associated with this scene
					Controller.scrollTo(scrollTarget.scrollOffset(), additionalParameter);
				} else {
					log(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", scrollTarget);
				}
			} else if (_util.type.Function(scrollTarget)) { // assign new scroll function
				setScrollPos = scrollTarget;
			} else { // scroll to element
				var elem = _util.get.elements(scrollTarget)[0];
				if (elem) {
					// if parent is pin spacer, use spacer position instead so correct start position is returned for pinned elements.
					while (elem.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
						elem = elem.parentNode;
					}

					var
					param = _options.vertical ? "top" : "left",
						// which param is of interest ?
						containerOffset = _util.get.offset(_options.container),
						// container position is needed because element offset is returned in relation to document, not in relation to container.
						elementOffset = _util.get.offset(elem);

					if (!_isDocument) { // container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
						containerOffset[param] -= Controller.scrollPos();
					}

					Controller.scrollTo(elementOffset[param] - containerOffset[param], additionalParameter);
				} else {
					log(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", scrollTarget);
				}
			}
			return Controller;
		};

		/**
		 * **Get** the current scrollPosition or **Set** a new method to calculate it.  
		 * -> **GET**:
		 * When used as a getter this function will return the current scroll position.  
		 * To get a cached value use Controller.info("scrollPos"), which will be updated in the update cycle.  
		 * For vertical controllers it will return the top scroll offset and for horizontal applications it will return the left offset.
		 *
		 * -> **SET**:
		 * When used as a setter this method prodes a way to permanently overwrite the controller's scroll position calculation.  
		 * A typical usecase is when the scroll position is not reflected by the containers scrollTop or scrollLeft values, but for example by the inner offset of a child container.  
		 * Moving a child container inside a parent is a commonly used method for several scrolling frameworks, including iScroll.  
		 * By providing an alternate calculation function you can make sure ScrollMagic receives the correct scroll position.  
		 * Please also bear in mind that your function should return y values for vertical scrolls an x for horizontals.
		 *
		 * To change the current scroll position please use `Controller.scrollTo()`.
		 * @public
		 *
		 * @example
		 * // get the current scroll Position
		 * var scrollPos = controller.scrollPos();
		 *
		 * // set a new scroll position calculation method
		 * controller.scrollPos(function () {
		 *	return this.info("vertical") ? -mychildcontainer.y : -mychildcontainer.x
		 * });
		 *
		 * @param {function} [scrollPosMethod] - The function to be used for the scroll position calculation of the container.
		 * @returns {(number|Controller)} Current scroll position or parent object for chaining.
		 */
		this.scrollPos = function (scrollPosMethod) {
			if (!arguments.length) { // get
				return getScrollPos.call(Controller);
			} else { // set
				if (_util.type.Function(scrollPosMethod)) {
					getScrollPos = scrollPosMethod;
				} else {
					log(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'.");
				}
			}
			return Controller;
		};

		/**
		 * **Get** all infos or one in particular about the controller.
		 * @public
		 * @example
		 * // returns the current scroll position (number)
		 * var scrollPos = controller.info("scrollPos");
		 *
		 * // returns all infos as an object
		 * var infos = controller.info();
		 *
		 * @param {string} [about] - If passed only this info will be returned instead of an object containing all.  
		 Valid options are:
		 ** `"size"` => the current viewport size of the container
		 ** `"vertical"` => true if vertical scrolling, otherwise false
		 ** `"scrollPos"` => the current scroll position
		 ** `"scrollDirection"` => the last known direction of the scroll
		 ** `"container"` => the container element
		 ** `"isDocument"` => true if container element is the document.
		 * @returns {(mixed|object)} The requested info(s).
		 */
		this.info = function (about) {
			var values = {
				size: _viewPortSize,
				// contains height or width (in regard to orientation);
				vertical: _options.vertical,
				scrollPos: _scrollPos,
				scrollDirection: _scrollDirection,
				container: _options.container,
				isDocument: _isDocument
			};
			if (!arguments.length) { // get all as an object
				return values;
			} else if (values[about] !== undefined) {
				return values[about];
			} else {
				log(1, "ERROR: option \"" + about + "\" is not available");
				return;
			}
		};

		/**
		 * **Get** or **Set** the current loglevel option value.
		 * @public
		 *
		 * @example
		 * // get the current value
		 * var loglevel = controller.loglevel();
		 *
		 * // set a new value
		 * controller.loglevel(3);
		 *
		 * @param {number} [newLoglevel] - The new loglevel setting of the Controller. `[0-3]`
		 * @returns {(number|Controller)} Current loglevel or parent object for chaining.
		 */
		this.loglevel = function (newLoglevel) {
			if (!arguments.length) { // get
				return _options.loglevel;
			} else if (_options.loglevel != newLoglevel) { // set
				_options.loglevel = newLoglevel;
			}
			return Controller;
		};

		/**
		 * **Get** or **Set** the current enabled state of the controller.  
		 * This can be used to disable all Scenes connected to the controller without destroying or removing them.
		 * @public
		 *
		 * @example
		 * // get the current value
		 * var enabled = controller.enabled();
		 *
		 * // disable the controller
		 * controller.enabled(false);
		 *
		 * @param {boolean} [newState] - The new enabled state of the controller `true` or `false`.
		 * @returns {(boolean|Controller)} Current enabled state or parent object for chaining.
		 */
		this.enabled = function (newState) {
			if (!arguments.length) { // get
				return _enabled;
			} else if (_enabled != newState) { // set
				_enabled = !! newState;
				Controller.updateScene(_sceneObjects, true);
			}
			return Controller;
		};

		/**
		 * Destroy the Controller, all Scenes and everything.
		 * @public
		 *
		 * @example
		 * // without resetting the scenes
		 * controller = controller.destroy();
		 *
		 * // with scene reset
		 * controller = controller.destroy(true);
		 *
		 * @param {boolean} [resetScenes=false] - If `true` the pins and tweens (if existent) of all scenes will be reset.
		 * @returns {null} Null to unset handler variables.
		 */
		this.destroy = function (resetScenes) {
			window.clearTimeout(_refreshTimeout);
			var i = _sceneObjects.length;
			while (i--) {
				_sceneObjects[i].destroy(resetScenes);
			}
			_options.container.removeEventListener("resize", onChange);
			_options.container.removeEventListener("scroll", onChange);
			_util.cAF(_updateTimeout);
			log(3, "destroyed " + NAMESPACE + " (reset: " + (resetScenes ? "true" : "false") + ")");
			return null;
		};

		// INIT
		construct();
		return Controller;
	};

	// store pagewide controller options
	var CONTROLLER_OPTIONS = {
		defaults: {
			container: window,
			vertical: true,
			globalSceneOptions: {},
			loglevel: 2,
			refreshInterval: 100
		}
	};
/*
 * method used to add an option to ScrollMagic Scenes.
 */
	ScrollMagic.Controller.addOption = function (name, defaultValue) {
		CONTROLLER_OPTIONS.defaults[name] = defaultValue;
	};
	// instance extension function for plugins
	ScrollMagic.Controller.extend = function (extension) {
		var oldClass = this;
		ScrollMagic.Controller = function () {
			oldClass.apply(this, arguments);
			this.$super = _util.extend({}, this); // copy parent state
			return extension.apply(this, arguments) || this;
		};
		_util.extend(ScrollMagic.Controller, oldClass); // copy properties
		ScrollMagic.Controller.prototype = oldClass.prototype; // copy prototype
		ScrollMagic.Controller.prototype.constructor = ScrollMagic.Controller; // restore constructor
	};


	/**
	 * A Scene defines where the controller should react and how.
	 *
	 * @class
	 *
	 * @example
	 * // create a standard scene and add it to a controller
	 * new ScrollMagic.Scene()
	 *		.addTo(controller);
	 *
	 * // create a scene with custom options and assign a handler to it.
	 * var scene = new ScrollMagic.Scene({
	 * 		duration: 100,
	 *		offset: 200,
	 *		triggerHook: "onEnter",
	 *		reverse: false
	 * });
	 *
	 * @param {object} [options] - Options for the Scene. The options can be updated at any time.  
	 Instead of setting the options for each scene individually you can also set them globally in the controller as the controllers `globalSceneOptions` option. The object accepts the same properties as the ones below.  
	 When a scene is added to the controller the options defined using the Scene constructor will be overwritten by those set in `globalSceneOptions`.
	 * @param {(number|function)} [options.duration=0] - The duration of the scene. 
	 If `0` tweens will auto-play when reaching the scene start point, pins will be pinned indefinetly starting at the start position.  
	 A function retuning the duration value is also supported. Please see `Scene.duration()` for details.
	 * @param {number} [options.offset=0] - Offset Value for the Trigger Position. If no triggerElement is defined this will be the scroll distance from the start of the page, after which the scene will start.
	 * @param {(string|object)} [options.triggerElement=null] - Selector or DOM object that defines the start of the scene. If undefined the scene will start right at the start of the page (unless an offset is set).
	 * @param {(number|string)} [options.triggerHook="onCenter"] - Can be a number between 0 and 1 defining the position of the trigger Hook in relation to the viewport.  
	 Can also be defined using a string:
	 ** `"onEnter"` => `1`
	 ** `"onCenter"` => `0.5`
	 ** `"onLeave"` => `0`
	 * @param {boolean} [options.reverse=true] - Should the scene reverse, when scrolling up?
	 * @param {number} [options.loglevel=2] - Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
	 ** `0` => silent
	 ** `1` => errors
	 ** `2` => errors, warnings
	 ** `3` => errors, warnings, debuginfo
	 * 
	 */
	ScrollMagic.Scene = function (options) {

/*
	 * ----------------------------------------------------------------
	 * settings
	 * ----------------------------------------------------------------
	 */

		var
		NAMESPACE = 'ScrollMagic.Scene',
			SCENE_STATE_BEFORE = 'BEFORE',
			SCENE_STATE_DURING = 'DURING',
			SCENE_STATE_AFTER = 'AFTER',
			DEFAULT_OPTIONS = SCENE_OPTIONS.defaults;

/*
	 * ----------------------------------------------------------------
	 * private vars
	 * ----------------------------------------------------------------
	 */

		var
		Scene = this,
			_options = _util.extend({}, DEFAULT_OPTIONS, options),
			_state = SCENE_STATE_BEFORE,
			_progress = 0,
			_scrollOffset = {
				start: 0,
				end: 0
			},
			// reflects the controllers's scroll position for the start and end of the scene respectively
			_triggerPos = 0,
			_enabled = true,
			_durationUpdateMethod, _controller;

		/**
		 * Internal constructor function of the ScrollMagic Scene
		 * @private
		 */
		var construct = function () {
			for (var key in _options) { // check supplied options
				if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
					log(2, "WARNING: Unknown option \"" + key + "\"");
					delete _options[key];
				}
			}
			// add getters/setters for all possible options
			for (var optionName in DEFAULT_OPTIONS) {
				addSceneOption(optionName);
			}
			// validate all options
			validateOption();
		};

/*
 * ----------------------------------------------------------------
 * Event Management
 * ----------------------------------------------------------------
 */

		var _listeners = {};
		/**
		 * Scene start event.  
		 * Fires whenever the scroll position its the starting point of the scene.  
		 * It will also fire when scrolling back up going over the start position of the scene. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
		 *
		 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
		 *
		 * @event ScrollMagic.Scene#start
		 *
		 * @example
		 * scene.on("start", function (event) {
		 * 	console.log("Hit start point of scene.");
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {number} event.progress - Reflects the current progress of the scene
		 * @property {string} event.state - The current state of the scene `"BEFORE"` or `"DURING"`
		 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
		 */
		/**
		 * Scene end event.  
		 * Fires whenever the scroll position its the ending point of the scene.  
		 * It will also fire when scrolling back up from after the scene and going over its end position. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
		 *
		 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
		 *
		 * @event ScrollMagic.Scene#end
		 *
		 * @example
		 * scene.on("end", function (event) {
		 * 	console.log("Hit end point of scene.");
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {number} event.progress - Reflects the current progress of the scene
		 * @property {string} event.state - The current state of the scene `"DURING"` or `"AFTER"`
		 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
		 */
		/**
		 * Scene enter event.  
		 * Fires whenever the scene enters the "DURING" state.  
		 * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene enters its active scroll timeframe, regardless of the scroll-direction.
		 *
		 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
		 *
		 * @event ScrollMagic.Scene#enter
		 *
		 * @example
		 * scene.on("enter", function (event) {
		 * 	console.log("Scene entered.");
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {number} event.progress - Reflects the current progress of the scene
		 * @property {string} event.state - The current state of the scene - always `"DURING"`
		 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
		 */
		/**
		 * Scene leave event.  
		 * Fires whenever the scene's state goes from "DURING" to either "BEFORE" or "AFTER".  
		 * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene leaves its active scroll timeframe, regardless of the scroll-direction.
		 *
		 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
		 *
		 * @event ScrollMagic.Scene#leave
		 *
		 * @example
		 * scene.on("leave", function (event) {
		 * 	console.log("Scene left.");
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {number} event.progress - Reflects the current progress of the scene
		 * @property {string} event.state - The current state of the scene `"BEFORE"` or `"AFTER"`
		 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
		 */
		/**
		 * Scene update event.  
		 * Fires whenever the scene is updated (but not necessarily changes the progress).
		 *
		 * @event ScrollMagic.Scene#update
		 *
		 * @example
		 * scene.on("update", function (event) {
		 * 	console.log("Scene updated.");
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {number} event.startPos - The starting position of the scene (in relation to the conainer)
		 * @property {number} event.endPos - The ending position of the scene (in relation to the conainer)
		 * @property {number} event.scrollPos - The current scroll position of the container
		 */
		/**
		 * Scene progress event.  
		 * Fires whenever the progress of the scene changes.
		 *
		 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
		 *
		 * @event ScrollMagic.Scene#progress
		 *
		 * @example
		 * scene.on("progress", function (event) {
		 * 	console.log("Scene progress changed to " + event.progress);
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {number} event.progress - Reflects the current progress of the scene
		 * @property {string} event.state - The current state of the scene `"BEFORE"`, `"DURING"` or `"AFTER"`
		 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
		 */
		/**
		 * Scene change event.  
		 * Fires whenvever a property of the scene is changed.
		 *
		 * @event ScrollMagic.Scene#change
		 *
		 * @example
		 * scene.on("change", function (event) {
		 * 	console.log("Scene Property \"" + event.what + "\" changed to " + event.newval);
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {string} event.what - Indicates what value has been changed
		 * @property {mixed} event.newval - The new value of the changed property
		 */
		/**
		 * Scene shift event.  
		 * Fires whenvever the start or end **scroll offset** of the scene change.
		 * This happens explicitely, when one of these values change: `offset`, `duration` or `triggerHook`.
		 * It will fire implicitly when the `triggerElement` changes, if the new element has a different position (most cases).
		 * It will also fire implicitly when the size of the container changes and the triggerHook is anything other than `onLeave`.
		 *
		 * @event ScrollMagic.Scene#shift
		 * @since 1.1.0
		 *
		 * @example
		 * scene.on("shift", function (event) {
		 * 	console.log("Scene moved, because the " + event.reason + " has changed.)");
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {string} event.reason - Indicates why the scene has shifted
		 */
		/**
		 * Scene destroy event.  
		 * Fires whenvever the scene is destroyed.
		 * This can be used to tidy up custom behaviour used in events.
		 *
		 * @event ScrollMagic.Scene#destroy
		 * @since 1.1.0
		 *
		 * @example
		 * scene.on("enter", function (event) {
		 *        // add custom action
		 *        $("#my-elem").left("200");
		 *      })
		 *      .on("destroy", function (event) {
		 *        // reset my element to start position
		 *        if (event.reset) {
		 *          $("#my-elem").left("0");
		 *        }
		 *      });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {boolean} event.reset - Indicates if the destroy method was called with reset `true` or `false`.
		 */
		/**
		 * Scene add event.  
		 * Fires when the scene is added to a controller.
		 * This is mostly used by plugins to know that change might be due.
		 *
		 * @event ScrollMagic.Scene#add
		 * @since 2.0.0
		 *
		 * @example
		 * scene.on("add", function (event) {
		 * 	console.log('Scene was added to a new controller.');
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {boolean} event.controller - The controller object the scene was added to.
		 */
		/**
		 * Scene remove event.  
		 * Fires when the scene is removed from a controller.
		 * This is mostly used by plugins to know that change might be due.
		 *
		 * @event ScrollMagic.Scene#remove
		 * @since 2.0.0
		 *
		 * @example
		 * scene.on("remove", function (event) {
		 * 	console.log('Scene was removed from its controller.');
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 */

		/**
		 * Add one ore more event listener.  
		 * The callback function will be fired at the respective event, and an object containing relevant data will be passed to the callback.
		 * @method ScrollMagic.Scene#on
		 *
		 * @example
		 * function callback (event) {
		 * 		console.log("Event fired! (" + event.type + ")");
		 * }
		 * // add listeners
		 * scene.on("change update progress start end enter leave", callback);
		 *
		 * @param {string} names - The name or names of the event the callback should be attached to.
		 * @param {function} callback - A function that should be executed, when the event is dispatched. An event object will be passed to the callback.
		 * @returns {Scene} Parent object for chaining.
		 */
		this.on = function (names, callback) {
			if (_util.type.Function(callback)) {
				names = names.trim().split(' ');
				names.forEach(function (fullname) {
					var
					nameparts = fullname.split('.'),
						eventname = nameparts[0],
						namespace = nameparts[1];
					if (eventname != "*") { // disallow wildcards
						if (!_listeners[eventname]) {
							_listeners[eventname] = [];
						}
						_listeners[eventname].push({
							namespace: namespace || '',
							callback: callback
						});
					}
				});
			} else {
				log(1, "ERROR when calling '.on()': Supplied callback for '" + names + "' is not a valid function!");
			}
			return Scene;
		};

		/**
		 * Remove one or more event listener.
		 * @method ScrollMagic.Scene#off
		 *
		 * @example
		 * function callback (event) {
		 * 		console.log("Event fired! (" + event.type + ")");
		 * }
		 * // add listeners
		 * scene.on("change update", callback);
		 * // remove listeners
		 * scene.off("change update", callback);
		 *
		 * @param {string} names - The name or names of the event that should be removed.
		 * @param {function} [callback] - A specific callback function that should be removed. If none is passed all callbacks to the event listener will be removed.
		 * @returns {Scene} Parent object for chaining.
		 */
		this.off = function (names, callback) {
			if (!names) {
				log(1, "ERROR: Invalid event name supplied.");
				return Scene;
			}
			names = names.trim().split(' ');
			names.forEach(function (fullname, key) {
				var
				nameparts = fullname.split('.'),
					eventname = nameparts[0],
					namespace = nameparts[1] || '',
					removeList = eventname === '*' ? Object.keys(_listeners) : [eventname];
				removeList.forEach(function (remove) {
					var
					list = _listeners[remove] || [],
						i = list.length;
					while (i--) {
						var listener = list[i];
						if (listener && (namespace === listener.namespace || namespace === '*') && (!callback || callback == listener.callback)) {
							list.splice(i, 1);
						}
					}
					if (!list.length) {
						delete _listeners[remove];
					}
				});
			});
			return Scene;
		};

		/**
		 * Trigger an event.
		 * @method ScrollMagic.Scene#trigger
		 *
		 * @example
		 * this.trigger("change");
		 *
		 * @param {string} name - The name of the event that should be triggered.
		 * @param {object} [vars] - An object containing info that should be passed to the callback.
		 * @returns {Scene} Parent object for chaining.
		 */
		this.trigger = function (name, vars) {
			if (name) {
				var
				nameparts = name.trim().split('.'),
					eventname = nameparts[0],
					namespace = nameparts[1],
					listeners = _listeners[eventname];
				log(3, 'event fired:', eventname, vars ? "->" : '', vars || '');
				if (listeners) {
					listeners.forEach(function (listener, key) {
						if (!namespace || namespace === listener.namespace) {
							listener.callback.call(Scene, new ScrollMagic.Event(eventname, listener.namespace, Scene, vars));
						}
					});
				}
			} else {
				log(1, "ERROR: Invalid event name supplied.");
			}
			return Scene;
		};

		// set event listeners
		Scene.on("change.internal", function (e) {
			if (e.what !== "loglevel" && e.what !== "tweenChanges") { // no need for a scene update scene with these options...
				if (e.what === "triggerElement") {
					updateTriggerElementPosition();
				} else if (e.what === "reverse") { // the only property left that may have an impact on the current scene state. Everything else is handled by the shift event.
					Scene.update();
				}
			}
		}).on("shift.internal", function (e) {
			updateScrollOffset();
			Scene.update(); // update scene to reflect new position
		});

		/**
		 * Send a debug message to the console.
		 * @private
		 * but provided publicly with _log for plugins
		 *
		 * @param {number} loglevel - The loglevel required to initiate output for the message.
		 * @param {...mixed} output - One or more variables that should be passed to the console.
		 */
		var log = this._log = function (loglevel, output) {
			if (_options.loglevel >= loglevel) {
				Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ") ->");
				_util.log.apply(window, arguments);
			}
		};

		/**
		 * Add the scene to a controller.  
		 * This is the equivalent to `Controller.addScene(scene)`.
		 * @method ScrollMagic.Scene#addTo
		 *
		 * @example
		 * // add a scene to a ScrollMagic Controller
		 * scene.addTo(controller);
		 *
		 * @param {ScrollMagic.Controller} controller - The controller to which the scene should be added.
		 * @returns {Scene} Parent object for chaining.
		 */
		this.addTo = function (controller) {
			if (!(controller instanceof ScrollMagic.Controller)) {
				log(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller");
			} else if (_controller != controller) {
				// new controller
				if (_controller) { // was associated to a different controller before, so remove it...
					_controller.removeScene(Scene);
				}
				_controller = controller;
				validateOption();
				updateDuration(true);
				updateTriggerElementPosition(true);
				updateScrollOffset();
				_controller.info("container").addEventListener('resize', onContainerResize);
				controller.addScene(Scene);
				Scene.trigger("add", {
					controller: _controller
				});
				log(3, "added " + NAMESPACE + " to controller");
				Scene.update();
			}
			return Scene;
		};

		/**
		 * **Get** or **Set** the current enabled state of the scene.  
		 * This can be used to disable this scene without removing or destroying it.
		 * @method ScrollMagic.Scene#enabled
		 *
		 * @example
		 * // get the current value
		 * var enabled = scene.enabled();
		 *
		 * // disable the scene
		 * scene.enabled(false);
		 *
		 * @param {boolean} [newState] - The new enabled state of the scene `true` or `false`.
		 * @returns {(boolean|Scene)} Current enabled state or parent object for chaining.
		 */
		this.enabled = function (newState) {
			if (!arguments.length) { // get
				return _enabled;
			} else if (_enabled != newState) { // set
				_enabled = !! newState;
				Scene.update(true);
			}
			return Scene;
		};

		/**
		 * Remove the scene from the controller.  
		 * This is the equivalent to `Controller.removeScene(scene)`.
		 * The scene will not be updated anymore until you readd it to a controller.
		 * To remove the pin or the tween you need to call removeTween() or removePin() respectively.
		 * @method ScrollMagic.Scene#remove
		 * @example
		 * // remove the scene from its controller
		 * scene.remove();
		 *
		 * @returns {Scene} Parent object for chaining.
		 */
		this.remove = function () {
			if (_controller) {
				_controller.info("container").removeEventListener('resize', onContainerResize);
				var tmpParent = _controller;
				_controller = undefined;
				tmpParent.removeScene(Scene);
				Scene.trigger("remove");
				log(3, "removed " + NAMESPACE + " from controller");
			}
			return Scene;
		};

		/**
		 * Destroy the scene and everything.
		 * @method ScrollMagic.Scene#destroy
		 * @example
		 * // destroy the scene without resetting the pin and tween to their initial positions
		 * scene = scene.destroy();
		 *
		 * // destroy the scene and reset the pin and tween
		 * scene = scene.destroy(true);
		 *
		 * @param {boolean} [reset=false] - If `true` the pin and tween (if existent) will be reset.
		 * @returns {null} Null to unset handler variables.
		 */
		this.destroy = function (reset) {
			Scene.trigger("destroy", {
				reset: reset
			});
			Scene.remove();
			Scene.off("*.*");
			log(3, "destroyed " + NAMESPACE + " (reset: " + (reset ? "true" : "false") + ")");
			return null;
		};


		/**
		 * Updates the Scene to reflect the current state.  
		 * This is the equivalent to `Controller.updateScene(scene, immediately)`.  
		 * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
		 * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.
		 * This means an update doesn't necessarily result in a progress change. The `progress` event will be fired if the progress has indeed changed between this update and the last.  
		 * _**NOTE:** This method gets called constantly whenever ScrollMagic detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
		 * @method ScrollMagic.Scene#update
		 * @example
		 * // update the scene on next tick
		 * scene.update();
		 *
		 * // update the scene immediately
		 * scene.update(true);
		 *
		 * @fires Scene.update
		 *
		 * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance).
		 * @returns {Scene} Parent object for chaining.
		 */
		this.update = function (immediately) {
			if (_controller) {
				if (immediately) {
					if (_controller.enabled() && _enabled) {
						var
						scrollPos = _controller.info("scrollPos"),
							newProgress;

						if (_options.duration > 0) {
							newProgress = (scrollPos - _scrollOffset.start) / (_scrollOffset.end - _scrollOffset.start);
						} else {
							newProgress = scrollPos >= _scrollOffset.start ? 1 : 0;
						}

						Scene.trigger("update", {
							startPos: _scrollOffset.start,
							endPos: _scrollOffset.end,
							scrollPos: scrollPos
						});

						Scene.progress(newProgress);
					} else if (_pin && _state === SCENE_STATE_DURING) {
						updatePinState(true); // unpin in position
					}
				} else {
					_controller.updateScene(Scene, false);
				}
			}
			return Scene;
		};

		/**
		 * Updates dynamic scene variables like the trigger element position or the duration.
		 * This method is automatically called in regular intervals from the controller. See {@link ScrollMagic.Controller} option `refreshInterval`.
		 * 
		 * You can call it to minimize lag, for example when you intentionally change the position of the triggerElement.
		 * If you don't it will simply be updated in the next refresh interval of the container, which is usually sufficient.
		 *
		 * @method ScrollMagic.Scene#refresh
		 * @since 1.1.0
		 * @example
		 * scene = new ScrollMagic.Scene({triggerElement: "#trigger"});
		 * 
		 * // change the position of the trigger
		 * $("#trigger").css("top", 500);
		 * // immediately let the scene know of this change
		 * scene.refresh();
		 *
		 * @fires {@link Scene.shift}, if the trigger element position or the duration changed
		 * @fires {@link Scene.change}, if the duration changed
		 *
		 * @returns {Scene} Parent object for chaining.
		 */
		this.refresh = function () {
			updateDuration();
			updateTriggerElementPosition();
			// update trigger element position
			return Scene;
		};

		/**
		 * **Get** or **Set** the scene's progress.  
		 * Usually it shouldn't be necessary to use this as a setter, as it is set automatically by scene.update().  
		 * The order in which the events are fired depends on the duration of the scene:
		 *  1. Scenes with `duration == 0`:  
		 *  Scenes that have no duration by definition have no ending. Thus the `end` event will never be fired.  
		 *  When the trigger position of the scene is passed the events are always fired in this order:  
		 *  `enter`, `start`, `progress` when scrolling forward  
		 *  and  
		 *  `progress`, `start`, `leave` when scrolling in reverse
		 *  2. Scenes with `duration > 0`:  
		 *  Scenes with a set duration have a defined start and end point.  
		 *  When scrolling past the start position of the scene it will fire these events in this order:  
		 *  `enter`, `start`, `progress`  
		 *  When continuing to scroll and passing the end point it will fire these events:  
		 *  `progress`, `end`, `leave`  
		 *  When reversing through the end point these events are fired:  
		 *  `enter`, `end`, `progress`  
		 *  And when continuing to scroll past the start position in reverse it will fire:  
		 *  `progress`, `start`, `leave`  
		 *  In between start and end the `progress` event will be called constantly, whenever the progress changes.
		 * 
		 * In short:  
		 * `enter` events will always trigger **before** the progress update and `leave` envents will trigger **after** the progress update.  
		 * `start` and `end` will always trigger at their respective position.
		 * 
		 * Please review the event descriptions for details on the events and the event object that is passed to the callback.
		 * 
		 * @method ScrollMagic.Scene#progress
		 * @example
		 * // get the current scene progress
		 * var progress = scene.progress();
		 *
		 * // set new scene progress
		 * scene.progress(0.3);
		 *
		 * @fires {@link Scene.enter}, when used as setter
		 * @fires {@link Scene.start}, when used as setter
		 * @fires {@link Scene.progress}, when used as setter
		 * @fires {@link Scene.end}, when used as setter
		 * @fires {@link Scene.leave}, when used as setter
		 *
		 * @param {number} [progress] - The new progress value of the scene `[0-1]`.
		 * @returns {number} `get` -  Current scene progress.
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */
		this.progress = function (progress) {
			if (!arguments.length) { // get
				return _progress;
			} else { // set
				var
				doUpdate = false,
					oldState = _state,
					scrollDirection = _controller ? _controller.info("scrollDirection") : 'PAUSED',
					reverseOrForward = _options.reverse || progress >= _progress;
				if (_options.duration === 0) {
					// zero duration scenes
					doUpdate = _progress != progress;
					_progress = progress < 1 && reverseOrForward ? 0 : 1;
					_state = _progress === 0 ? SCENE_STATE_BEFORE : SCENE_STATE_DURING;
				} else {
					// scenes with start and end
					if (progress < 0 && _state !== SCENE_STATE_BEFORE && reverseOrForward) {
						// go back to initial state
						_progress = 0;
						_state = SCENE_STATE_BEFORE;
						doUpdate = true;
					} else if (progress >= 0 && progress < 1 && reverseOrForward) {
						_progress = progress;
						_state = SCENE_STATE_DURING;
						doUpdate = true;
					} else if (progress >= 1 && _state !== SCENE_STATE_AFTER) {
						_progress = 1;
						_state = SCENE_STATE_AFTER;
						doUpdate = true;
					} else if (_state === SCENE_STATE_DURING && !reverseOrForward) {
						updatePinState(); // in case we scrolled backwards mid-scene and reverse is disabled => update the pin position, so it doesn't move back as well.
					}
				}
				if (doUpdate) {
					// fire events
					var
					eventVars = {
						progress: _progress,
						state: _state,
						scrollDirection: scrollDirection
					},
						stateChanged = _state != oldState;

					var trigger = function (eventName) { // tmp helper to simplify code
						Scene.trigger(eventName, eventVars);
					};

					if (stateChanged) { // enter events
						if (oldState !== SCENE_STATE_DURING) {
							trigger("enter");
							trigger(oldState === SCENE_STATE_BEFORE ? "start" : "end");
						}
					}
					trigger("progress");
					if (stateChanged) { // leave events
						if (_state !== SCENE_STATE_DURING) {
							trigger(_state === SCENE_STATE_BEFORE ? "start" : "end");
							trigger("leave");
						}
					}
				}

				return Scene;
			}
		};


		/**
		 * Update the start and end scrollOffset of the container.
		 * The positions reflect what the controller's scroll position will be at the start and end respectively.
		 * Is called, when:
		 *   - Scene event "change" is called with: offset, triggerHook, duration 
		 *   - scroll container event "resize" is called
		 *   - the position of the triggerElement changes
		 *   - the controller changes -> addTo()
		 * @private
		 */
		var updateScrollOffset = function () {
			_scrollOffset = {
				start: _triggerPos + _options.offset
			};
			if (_controller && _options.triggerElement) {
				// take away triggerHook portion to get relative to top
				_scrollOffset.start -= _controller.info("size") * _options.triggerHook;
			}
			_scrollOffset.end = _scrollOffset.start + _options.duration;
		};

		/**
		 * Updates the duration if set to a dynamic function.
		 * This method is called when the scene is added to a controller and in regular intervals from the controller through scene.refresh().
		 * 
		 * @fires {@link Scene.change}, if the duration changed
		 * @fires {@link Scene.shift}, if the duration changed
		 *
		 * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
		 * @private
		 */
		var updateDuration = function (suppressEvents) {
			// update duration
			if (_durationUpdateMethod) {
				var varname = "duration";
				if (changeOption(varname, _durationUpdateMethod.call(Scene)) && !suppressEvents) { // set
					Scene.trigger("change", {
						what: varname,
						newval: _options[varname]
					});
					Scene.trigger("shift", {
						reason: varname
					});
				}
			}
		};

		/**
		 * Updates the position of the triggerElement, if present.
		 * This method is called ...
		 *  - ... when the triggerElement is changed
		 *  - ... when the scene is added to a (new) controller
		 *  - ... in regular intervals from the controller through scene.refresh().
		 * 
		 * @fires {@link Scene.shift}, if the position changed
		 *
		 * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
		 * @private
		 */
		var updateTriggerElementPosition = function (suppressEvents) {
			var
			elementPos = 0,
				telem = _options.triggerElement;
			if (_controller && telem) {
				var
				controllerInfo = _controller.info(),
					containerOffset = _util.get.offset(controllerInfo.container),
					// container position is needed because element offset is returned in relation to document, not in relation to container.
					param = controllerInfo.vertical ? "top" : "left"; // which param is of interest ?
				// if parent is spacer, use spacer position instead so correct start position is returned for pinned elements.
				while (telem.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
					telem = telem.parentNode;
				}

				var elementOffset = _util.get.offset(telem);

				if (!controllerInfo.isDocument) { // container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
					containerOffset[param] -= _controller.scrollPos();
				}

				elementPos = elementOffset[param] - containerOffset[param];
			}
			var changed = elementPos != _triggerPos;
			_triggerPos = elementPos;
			if (changed && !suppressEvents) {
				Scene.trigger("shift", {
					reason: "triggerElementPosition"
				});
			}
		};

		/**
		 * Trigger a shift event, when the container is resized and the triggerHook is > 1.
		 * @private
		 */
		var onContainerResize = function (e) {
			if (_options.triggerHook > 0) {
				Scene.trigger("shift", {
					reason: "containerResize"
				});
			}
		};

		var _validate = _util.extend(SCENE_OPTIONS.validate, {
			// validation for duration handled internally for reference to private var _durationMethod
			duration: function (val) {
				if (_util.type.String(val) && val.match(/^(\.|\d)*\d+%$/)) {
					// percentage value
					var perc = parseFloat(val) / 100;
					val = function () {
						return _controller ? _controller.info("size") * perc : 0;
					};
				}
				if (_util.type.Function(val)) {
					// function
					_durationUpdateMethod = val;
					try {
						val = parseFloat(_durationUpdateMethod());
					} catch (e) {
						val = -1; // will cause error below
					}
				}
				// val has to be float
				val = parseFloat(val);
				if (!_util.type.Number(val) || val < 0) {
					if (_durationUpdateMethod) {
						_durationUpdateMethod = undefined;
						throw ["Invalid return value of supplied function for option \"duration\":", val];
					} else {
						throw ["Invalid value for option \"duration\":", val];
					}
				}
				return val;
			}
		});

		/**
		 * Checks the validity of a specific or all options and reset to default if neccessary.
		 * @private
		 */
		var validateOption = function (check) {
			check = arguments.length ? [check] : Object.keys(_validate);
			check.forEach(function (optionName, key) {
				var value;
				if (_validate[optionName]) { // there is a validation method for this option
					try { // validate value
						value = _validate[optionName](_options[optionName]);
					} catch (e) { // validation failed -> reset to default
						value = DEFAULT_OPTIONS[optionName];
						var logMSG = _util.type.String(e) ? [e] : e;
						if (_util.type.Array(logMSG)) {
							logMSG[0] = "ERROR: " + logMSG[0];
							logMSG.unshift(1); // loglevel 1 for error msg
							log.apply(this, logMSG);
						} else {
							log(1, "ERROR: Problem executing validation callback for option '" + optionName + "':", e.message);
						}
					} finally {
						_options[optionName] = value;
					}
				}
			});
		};

		/**
		 * Helper used by the setter/getters for scene options
		 * @private
		 */
		var changeOption = function (varname, newval) {
			var
			changed = false,
				oldval = _options[varname];
			if (_options[varname] != newval) {
				_options[varname] = newval;
				validateOption(varname); // resets to default if necessary
				changed = oldval != _options[varname];
			}
			return changed;
		};

		// generate getters/setters for all options
		var addSceneOption = function (optionName) {
			if (!Scene[optionName]) {
				Scene[optionName] = function (newVal) {
					if (!arguments.length) { // get
						return _options[optionName];
					} else {
						if (optionName === "duration") { // new duration is set, so any previously set function must be unset
							_durationUpdateMethod = undefined;
						}
						if (changeOption(optionName, newVal)) { // set
							Scene.trigger("change", {
								what: optionName,
								newval: _options[optionName]
							});
							if (SCENE_OPTIONS.shifts.indexOf(optionName) > -1) {
								Scene.trigger("shift", {
									reason: optionName
								});
							}
						}
					}
					return Scene;
				};
			}
		};

		/**
		 * **Get** or **Set** the duration option value.
		 * As a setter it also accepts a function returning a numeric value.  
		 * This is particularly useful for responsive setups.
		 *
		 * The duration is updated using the supplied function every time `Scene.refresh()` is called, which happens periodically from the controller (see ScrollMagic.Controller option `refreshInterval`).  
		 * _**NOTE:** Be aware that it's an easy way to kill performance, if you supply a function that has high CPU demand.  
		 * Even for size and position calculations it is recommended to use a variable to cache the value. (see example)  
		 * This counts double if you use the same function for multiple scenes._
		 *
		 * @method ScrollMagic.Scene#duration
		 * @example
		 * // get the current duration value
		 * var duration = scene.duration();
		 *
		 * // set a new duration
		 * scene.duration(300);
		 *
		 * // use a function to automatically adjust the duration to the window height.
		 * var durationValueCache;
		 * function getDuration () {
		 *   return durationValueCache;
		 * }
		 * function updateDuration (e) {
		 *   durationValueCache = window.innerHeight;
		 * }
		 * $(window).on("resize", updateDuration); // update the duration when the window size changes
		 * $(window).triggerHandler("resize"); // set to initial value
		 * scene.duration(getDuration); // supply duration method
		 *
		 * @fires {@link Scene.change}, when used as setter
		 * @fires {@link Scene.shift}, when used as setter
		 * @param {(number|function)} [newDuration] - The new duration of the scene.
		 * @returns {number} `get` -  Current scene duration.
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */

		/**
		 * **Get** or **Set** the offset option value.
		 * @method ScrollMagic.Scene#offset
		 * @example
		 * // get the current offset
		 * var offset = scene.offset();
		 *
		 * // set a new offset
		 * scene.offset(100);
		 *
		 * @fires {@link Scene.change}, when used as setter
		 * @fires {@link Scene.shift}, when used as setter
		 * @param {number} [newOffset] - The new offset of the scene.
		 * @returns {number} `get` -  Current scene offset.
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */

		/**
		 * **Get** or **Set** the triggerElement option value.
		 * Does **not** fire `Scene.shift`, because changing the trigger Element doesn't necessarily mean the start position changes. This will be determined in `Scene.refresh()`, which is automatically triggered.
		 * @method ScrollMagic.Scene#triggerElement
		 * @example
		 * // get the current triggerElement
		 * var triggerElement = scene.triggerElement();
		 *
		 * // set a new triggerElement using a selector
		 * scene.triggerElement("#trigger");
		 * // set a new triggerElement using a DOM object
		 * scene.triggerElement(document.getElementById("trigger"));
		 *
		 * @fires {@link Scene.change}, when used as setter
		 * @param {(string|object)} [newTriggerElement] - The new trigger element for the scene.
		 * @returns {(string|object)} `get` -  Current triggerElement.
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */

		/**
		 * **Get** or **Set** the triggerHook option value.
		 * @method ScrollMagic.Scene#triggerHook
		 * @example
		 * // get the current triggerHook value
		 * var triggerHook = scene.triggerHook();
		 *
		 * // set a new triggerHook using a string
		 * scene.triggerHook("onLeave");
		 * // set a new triggerHook using a number
		 * scene.triggerHook(0.7);
		 *
		 * @fires {@link Scene.change}, when used as setter
		 * @fires {@link Scene.shift}, when used as setter
		 * @param {(number|string)} [newTriggerHook] - The new triggerHook of the scene. See {@link Scene} parameter description for value options.
		 * @returns {number} `get` -  Current triggerHook (ALWAYS numerical).
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */

		/**
		 * **Get** or **Set** the reverse option value.
		 * @method ScrollMagic.Scene#reverse
		 * @example
		 * // get the current reverse option
		 * var reverse = scene.reverse();
		 *
		 * // set new reverse option
		 * scene.reverse(false);
		 *
		 * @fires {@link Scene.change}, when used as setter
		 * @param {boolean} [newReverse] - The new reverse setting of the scene.
		 * @returns {boolean} `get` -  Current reverse option value.
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */

		/**
		 * **Get** or **Set** the loglevel option value.
		 * @method ScrollMagic.Scene#loglevel
		 * @example
		 * // get the current loglevel
		 * var loglevel = scene.loglevel();
		 *
		 * // set new loglevel
		 * scene.loglevel(3);
		 *
		 * @fires {@link Scene.change}, when used as setter
		 * @param {number} [newLoglevel] - The new loglevel setting of the scene. `[0-3]`
		 * @returns {number} `get` -  Current loglevel.
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */

		/**
		 * **Get** the associated controller.
		 * @method ScrollMagic.Scene#controller
		 * @example
		 * // get the controller of a scene
		 * var controller = scene.controller();
		 *
		 * @returns {ScrollMagic.Controller} Parent controller or `undefined`
		 */
		this.controller = function () {
			return _controller;
		};

		/**
		 * **Get** the current state.
		 * @method ScrollMagic.Scene#state
		 * @example
		 * // get the current state
		 * var state = scene.state();
		 *
		 * @returns {string} `"BEFORE"`, `"DURING"` or `"AFTER"`
		 */
		this.state = function () {
			return _state;
		};

		/**
		 * **Get** the current scroll offset for the start of the scene.  
		 * Mind, that the scrollOffset is related to the size of the container, if `triggerHook` is bigger than `0` (or `"onLeave"`).  
		 * This means, that resizing the container or changing the `triggerHook` will influence the scene's start offset.
		 * @method ScrollMagic.Scene#scrollOffset
		 * @example
		 * // get the current scroll offset for the start and end of the scene.
		 * var start = scene.scrollOffset();
		 * var end = scene.scrollOffset() + scene.duration();
		 * console.log("the scene starts at", start, "and ends at", end);
		 *
		 * @returns {number} The scroll offset (of the container) at which the scene will trigger. Y value for vertical and X value for horizontal scrolls.
		 */
		this.scrollOffset = function () {
			return _scrollOffset.start;
		};

		/**
		 * **Get** the trigger position of the scene (including the value of the `offset` option).  
		 * @method ScrollMagic.Scene#triggerPosition
		 * @example
		 * // get the scene's trigger position
		 * var triggerPosition = scene.triggerPosition();
		 *
		 * @returns {number} Start position of the scene. Top position value for vertical and left position value for horizontal scrolls.
		 */
		this.triggerPosition = function () {
			var pos = _options.offset; // the offset is the basis
			if (_controller) {
				// get the trigger position
				if (_options.triggerElement) {
					// Element as trigger
					pos += _triggerPos;
				} else {
					// return the height of the triggerHook to start at the beginning
					pos += _controller.info("size") * Scene.triggerHook();
				}
			}
			return pos;
		};

		var
		_pin, _pinOptions;

		Scene.on("shift.internal", function (e) {
			var durationChanged = e.reason === "duration";
			if ((_state === SCENE_STATE_AFTER && durationChanged) || (_state === SCENE_STATE_DURING && _options.duration === 0)) {
				// if [duration changed after a scene (inside scene progress updates pin position)] or [duration is 0, we are in pin phase and some other value changed].
				updatePinState();
			}
			if (durationChanged) {
				updatePinDimensions();
			}
		}).on("progress.internal", function (e) {
			updatePinState();
		}).on("add.internal", function (e) {
			updatePinDimensions();
		}).on("destroy.internal", function (e) {
			Scene.removePin(e.reset);
		});
		/**
		 * Update the pin state.
		 * @private
		 */
		var updatePinState = function (forceUnpin) {
			if (_pin && _controller) {
				var
				containerInfo = _controller.info(),
					pinTarget = _pinOptions.spacer.firstChild; // may be pin element or another spacer, if cascading pins
				if (!forceUnpin && _state === SCENE_STATE_DURING) { // during scene or if duration is 0 and we are past the trigger
					// pinned state
					if (_util.css(pinTarget, "position") != "fixed") {
						// change state before updating pin spacer (position changes due to fixed collapsing might occur.)
						_util.css(pinTarget, {
							"position": "fixed"
						});
						// update pin spacer
						updatePinDimensions();
					}

					var
					fixedPos = _util.get.offset(_pinOptions.spacer, true),
						// get viewport position of spacer
						scrollDistance = _options.reverse || _options.duration === 0 ? containerInfo.scrollPos - _scrollOffset.start // quicker
						: Math.round(_progress * _options.duration * 10) / 10; // if no reverse and during pin the position needs to be recalculated using the progress
					// add scrollDistance
					fixedPos[containerInfo.vertical ? "top" : "left"] += scrollDistance;

					// set new values
					_util.css(_pinOptions.spacer.firstChild, {
						top: fixedPos.top,
						left: fixedPos.left
					});
				} else {
					// unpinned state
					var
					newCSS = {
						position: _pinOptions.inFlow ? "relative" : "absolute",
						top: 0,
						left: 0
					},
						change = _util.css(pinTarget, "position") != newCSS.position;

					if (!_pinOptions.pushFollowers) {
						newCSS[containerInfo.vertical ? "top" : "left"] = _options.duration * _progress;
					} else if (_options.duration > 0) { // only concerns scenes with duration
						if (_state === SCENE_STATE_AFTER && parseFloat(_util.css(_pinOptions.spacer, "padding-top")) === 0) {
							change = true; // if in after state but havent updated spacer yet (jumped past pin)
						} else if (_state === SCENE_STATE_BEFORE && parseFloat(_util.css(_pinOptions.spacer, "padding-bottom")) === 0) { // before
							change = true; // jumped past fixed state upward direction
						}
					}
					// set new values
					_util.css(pinTarget, newCSS);
					if (change) {
						// update pin spacer if state changed
						updatePinDimensions();
					}
				}
			}
		};

		/**
		 * Update the pin spacer and/or element size.
		 * The size of the spacer needs to be updated whenever the duration of the scene changes, if it is to push down following elements.
		 * @private
		 */
		var updatePinDimensions = function () {
			if (_pin && _controller && _pinOptions.inFlow) { // no spacerresize, if original position is absolute
				var
				after = (_state === SCENE_STATE_AFTER),
					before = (_state === SCENE_STATE_BEFORE),
					during = (_state === SCENE_STATE_DURING),
					vertical = _controller.info("vertical"),
					pinTarget = _pinOptions.spacer.firstChild,
					// usually the pined element but can also be another spacer (cascaded pins)
					marginCollapse = _util.isMarginCollapseType(_util.css(_pinOptions.spacer, "display")),
					css = {};

				// set new size
				// if relsize: spacer -> pin | else: pin -> spacer
				if (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) {
					if (during) {
						_util.css(_pin, {
							"width": _util.get.width(_pinOptions.spacer)
						});
					} else {
						_util.css(_pin, {
							"width": "100%"
						});
					}
				} else {
					// minwidth is needed for cascaded pins.
					css["min-width"] = _util.get.width(vertical ? _pin : pinTarget, true, true);
					css.width = during ? css["min-width"] : "auto";
				}
				if (_pinOptions.relSize.height) {
					if (during) {
						// the only padding the spacer should ever include is the duration (if pushFollowers = true), so we need to substract that.
						_util.css(_pin, {
							"height": _util.get.height(_pinOptions.spacer) - (_pinOptions.pushFollowers ? _options.duration : 0)
						});
					} else {
						_util.css(_pin, {
							"height": "100%"
						});
					}
				} else {
					// margin is only included if it's a cascaded pin to resolve an IE9 bug
					css["min-height"] = _util.get.height(vertical ? pinTarget : _pin, true, !marginCollapse); // needed for cascading pins
					css.height = during ? css["min-height"] : "auto";
				}

				// add space for duration if pushFollowers is true
				if (_pinOptions.pushFollowers) {
					css["padding" + (vertical ? "Top" : "Left")] = _options.duration * _progress;
					css["padding" + (vertical ? "Bottom" : "Right")] = _options.duration * (1 - _progress);
				}
				_util.css(_pinOptions.spacer, css);
			}
		};

		/**
		 * Updates the Pin state (in certain scenarios)
		 * If the controller container is not the document and we are mid-pin-phase scrolling or resizing the main document can result to wrong pin positions.
		 * So this function is called on resize and scroll of the document.
		 * @private
		 */
		var updatePinInContainer = function () {
			if (_controller && _pin && _state === SCENE_STATE_DURING && !_controller.info("isDocument")) {
				updatePinState();
			}
		};

		/**
		 * Updates the Pin spacer size state (in certain scenarios)
		 * If container is resized during pin and relatively sized the size of the pin might need to be updated...
		 * So this function is called on resize of the container.
		 * @private
		 */
		var updateRelativePinSpacer = function () {
			if (_controller && _pin && // well, duh
			_state === SCENE_STATE_DURING && // element in pinned state?
			( // is width or height relatively sized, but not in relation to body? then we need to recalc.
			((_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) && _util.get.width(window) != _util.get.width(_pinOptions.spacer.parentNode)) || (_pinOptions.relSize.height && _util.get.height(window) != _util.get.height(_pinOptions.spacer.parentNode)))) {
				updatePinDimensions();
			}
		};

		/**
		 * Is called, when the mousewhel is used while over a pinned element inside a div container.
		 * If the scene is in fixed state scroll events would be counted towards the body. This forwards the event to the scroll container.
		 * @private
		 */
		var onMousewheelOverPin = function (e) {
			if (_controller && _pin && _state === SCENE_STATE_DURING && !_controller.info("isDocument")) { // in pin state
				e.preventDefault();
				_controller._setScrollPos(_controller.info("scrollPos") - ((e.wheelDelta || e[_controller.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || -e.detail * 30));
			}
		};

		/**
		 * Pin an element for the duration of the tween.  
		 * If the scene duration is 0 the element will only be unpinned, if the user scrolls back past the start position.  
		 * Make sure only one pin is applied to an element at the same time.
		 * An element can be pinned multiple times, but only successively.
		 * _**NOTE:** The option `pushFollowers` has no effect, when the scene duration is 0._
		 * @method ScrollMagic.Scene#setPin
		 * @example
		 * // pin element and push all following elements down by the amount of the pin duration.
		 * scene.setPin("#pin");
		 *
		 * // pin element and keeping all following elements in their place. The pinned element will move past them.
		 * scene.setPin("#pin", {pushFollowers: false});
		 *
		 * @param {(string|object)} element - A Selector targeting an element or a DOM object that is supposed to be pinned.
		 * @param {object} [settings] - settings for the pin
		 * @param {boolean} [settings.pushFollowers=true] - If `true` following elements will be "pushed" down for the duration of the pin, if `false` the pinned element will just scroll past them.  
		 Ignored, when duration is `0`.
		 * @param {string} [settings.spacerClass="scrollmagic-pin-spacer"] - Classname of the pin spacer element, which is used to replace the element.
		 *
		 * @returns {Scene} Parent object for chaining.
		 */
		this.setPin = function (element, settings) {
			var
			defaultSettings = {
				pushFollowers: true,
				spacerClass: "scrollmagic-pin-spacer"
			};
			settings = _util.extend({}, defaultSettings, settings);

			// validate Element
			element = _util.get.elements(element)[0];
			if (!element) {
				log(1, "ERROR calling method 'setPin()': Invalid pin element supplied.");
				return Scene; // cancel
			} else if (_util.css(element, "position") === "fixed") {
				log(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'.");
				return Scene; // cancel
			}

			if (_pin) { // preexisting pin?
				if (_pin === element) {
					// same pin we already have -> do nothing
					return Scene; // cancel
				} else {
					// kill old pin
					Scene.removePin();
				}

			}
			_pin = element;

			var
			parentDisplay = _pin.parentNode.style.display,
				boundsParams = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];

			_pin.parentNode.style.display = 'none'; // hack start to force css to return stylesheet values instead of calculated px values.
			var
			inFlow = _util.css(_pin, "position") != "absolute",
				pinCSS = _util.css(_pin, boundsParams.concat(["display"])),
				sizeCSS = _util.css(_pin, ["width", "height"]);
			_pin.parentNode.style.display = parentDisplay; // hack end.
			if (!inFlow && settings.pushFollowers) {
				log(2, "WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled.");
				settings.pushFollowers = false;
			}
			window.setTimeout(function () { // wait until all finished, because with responsive duration it will only be set after scene is added to controller
				if (_pin && _options.duration === 0 && settings.pushFollowers) {
					log(2, "WARNING: pushFollowers =", true, "has no effect, when scene duration is 0.");
				}
			}, 0);

			// create spacer and insert
			var
			spacer = _pin.parentNode.insertBefore(document.createElement('div'), _pin),
				spacerCSS = _util.extend(pinCSS, {
					position: inFlow ? "relative" : "absolute",
					boxSizing: "content-box",
					mozBoxSizing: "content-box",
					webkitBoxSizing: "content-box"
				});

			if (!inFlow) { // copy size if positioned absolutely, to work for bottom/right positioned elements.
				_util.extend(spacerCSS, _util.css(_pin, ["width", "height"]));
			}

			_util.css(spacer, spacerCSS);
			spacer.setAttribute(PIN_SPACER_ATTRIBUTE, "");
			_util.addClass(spacer, settings.spacerClass);

			// set the pin Options
			_pinOptions = {
				spacer: spacer,
				relSize: { // save if size is defined using % values. if so, handle spacer resize differently...
					width: sizeCSS.width.slice(-1) === "%",
					height: sizeCSS.height.slice(-1) === "%",
					autoFullWidth: sizeCSS.width === "auto" && inFlow && _util.isMarginCollapseType(pinCSS.display)
				},
				pushFollowers: settings.pushFollowers,
				inFlow: inFlow,
				// stores if the element takes up space in the document flow
			};

			if (!_pin.___origStyle) {
				_pin.___origStyle = {};
				var
				pinInlineCSS = _pin.style,
					copyStyles = boundsParams.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
				copyStyles.forEach(function (val) {
					_pin.___origStyle[val] = pinInlineCSS[val] || "";
				});
			}

			// if relative size, transfer it to spacer and make pin calculate it...
			if (_pinOptions.relSize.width) {
				_util.css(spacer, {
					width: sizeCSS.width
				});
			}
			if (_pinOptions.relSize.height) {
				_util.css(spacer, {
					height: sizeCSS.height
				});
			}

			// now place the pin element inside the spacer	
			spacer.appendChild(_pin);
			// and set new css
			_util.css(_pin, {
				position: inFlow ? "relative" : "absolute",
				margin: "auto",
				top: "auto",
				left: "auto",
				bottom: "auto",
				right: "auto"
			});

			if (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) {
				_util.css(_pin, {
					boxSizing: "border-box",
					mozBoxSizing: "border-box",
					webkitBoxSizing: "border-box"
				});
			}

			// add listener to document to update pin position in case controller is not the document.
			window.addEventListener('scroll', updatePinInContainer);
			window.addEventListener('resize', updatePinInContainer);
			window.addEventListener('resize', updateRelativePinSpacer);
			// add mousewheel listener to catch scrolls over fixed elements
			_pin.addEventListener("mousewheel", onMousewheelOverPin);
			_pin.addEventListener("DOMMouseScroll", onMousewheelOverPin);

			log(3, "added pin");

			// finally update the pin to init
			updatePinState();

			return Scene;
		};

		/**
		 * Remove the pin from the scene.
		 * @method ScrollMagic.Scene#removePin
		 * @example
		 * // remove the pin from the scene without resetting it (the spacer is not removed)
		 * scene.removePin();
		 *
		 * // remove the pin from the scene and reset the pin element to its initial position (spacer is removed)
		 * scene.removePin(true);
		 *
		 * @param {boolean} [reset=false] - If `false` the spacer will not be removed and the element's position will not be reset.
		 * @returns {Scene} Parent object for chaining.
		 */
		this.removePin = function (reset) {
			if (_pin) {
				if (_state === SCENE_STATE_DURING) {
					updatePinState(true); // force unpin at position
				}
				if (reset || !_controller) { // if there's no controller no progress was made anyway...
					var pinTarget = _pinOptions.spacer.firstChild; // usually the pin element, but may be another spacer (cascaded pins)...
					if (pinTarget.hasAttribute(PIN_SPACER_ATTRIBUTE)) { // copy margins to child spacer
						var
						style = _pinOptions.spacer.style,
							values = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
						margins = {};
						values.forEach(function (val) {
							margins[val] = style[val] || "";
						});
						_util.css(pinTarget, margins);
					}
					_pinOptions.spacer.parentNode.insertBefore(pinTarget, _pinOptions.spacer);
					_pinOptions.spacer.parentNode.removeChild(_pinOptions.spacer);
					if (!_pin.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) { // if it's the last pin for this element -> restore inline styles
						// TODO: only correctly set for first pin (when cascading) - how to fix?
						_util.css(_pin, _pin.___origStyle);
						delete _pin.___origStyle;
					}
				}
				window.removeEventListener('scroll', updatePinInContainer);
				window.removeEventListener('resize', updatePinInContainer);
				window.removeEventListener('resize', updateRelativePinSpacer);
				_pin.removeEventListener("mousewheel", onMousewheelOverPin);
				_pin.removeEventListener("DOMMouseScroll", onMousewheelOverPin);
				_pin = undefined;
				log(3, "removed pin (reset: " + (reset ? "true" : "false") + ")");
			}
			return Scene;
		};


		var
		_cssClasses, _cssClassElems = [];

		Scene.on("destroy.internal", function (e) {
			Scene.removeClassToggle(e.reset);
		});
		/**
		 * Define a css class modification while the scene is active.  
		 * When the scene triggers the classes will be added to the supplied element and removed, when the scene is over.
		 * If the scene duration is 0 the classes will only be removed if the user scrolls back past the start position.
		 * @method ScrollMagic.Scene#setClassToggle
		 * @example
		 * // add the class 'myclass' to the element with the id 'my-elem' for the duration of the scene
		 * scene.setClassToggle("#my-elem", "myclass");
		 *
		 * // add multiple classes to multiple elements defined by the selector '.classChange'
		 * scene.setClassToggle(".classChange", "class1 class2 class3");
		 *
		 * @param {(string|object)} element - A Selector targeting one or more elements or a DOM object that is supposed to be modified.
		 * @param {string} classes - One or more Classnames (separated by space) that should be added to the element during the scene.
		 *
		 * @returns {Scene} Parent object for chaining.
		 */
		this.setClassToggle = function (element, classes) {
			var elems = _util.get.elements(element);
			if (elems.length === 0 || !_util.type.String(classes)) {
				log(1, "ERROR calling method 'setClassToggle()': Invalid " + (elems.length === 0 ? "element" : "classes") + " supplied.");
				return Scene;
			}
			if (_cssClassElems.length > 0) {
				// remove old ones
				Scene.removeClassToggle();
			}
			_cssClasses = classes;
			_cssClassElems = elems;
			Scene.on("enter.internal_class leave.internal_class", function (e) {
				var toggle = e.type === "enter" ? _util.addClass : _util.removeClass;
				_cssClassElems.forEach(function (elem, key) {
					toggle(elem, _cssClasses);
				});
			});
			return Scene;
		};

		/**
		 * Remove the class binding from the scene.
		 * @method ScrollMagic.Scene#removeClassToggle
		 * @example
		 * // remove class binding from the scene without reset
		 * scene.removeClassToggle();
		 *
		 * // remove class binding and remove the changes it caused
		 * scene.removeClassToggle(true);
		 *
		 * @param {boolean} [reset=false] - If `false` and the classes are currently active, they will remain on the element. If `true` they will be removed.
		 * @returns {Scene} Parent object for chaining.
		 */
		this.removeClassToggle = function (reset) {
			if (reset) {
				_cssClassElems.forEach(function (elem, key) {
					_util.removeClass(elem, _cssClasses);
				});
			}
			Scene.off("start.internal_class end.internal_class");
			_cssClasses = undefined;
			_cssClassElems = [];
			return Scene;
		};

		// INIT
		construct();
		return Scene;
	};

	// store pagewide scene options
	var SCENE_OPTIONS = {
		defaults: {
			duration: 0,
			offset: 0,
			triggerElement: undefined,
			triggerHook: 0.5,
			reverse: true,
			loglevel: 2
		},
		validate: {
			offset: function (val) {
				val = parseFloat(val);
				if (!_util.type.Number(val)) {
					throw ["Invalid value for option \"offset\":", val];
				}
				return val;
			},
			triggerElement: function (val) {
				val = val || undefined;
				if (val) {
					var elem = _util.get.elements(val)[0];
					if (elem) {
						val = elem;
					} else {
						throw ["Element defined in option \"triggerElement\" was not found:", val];
					}
				}
				return val;
			},
			triggerHook: function (val) {
				var translate = {
					"onCenter": 0.5,
					"onEnter": 1,
					"onLeave": 0
				};
				if (_util.type.Number(val)) {
					val = Math.max(0, Math.min(parseFloat(val), 1)); //  make sure its betweeen 0 and 1
				} else if (val in translate) {
					val = translate[val];
				} else {
					throw ["Invalid value for option \"triggerHook\": ", val];
				}
				return val;
			},
			reverse: function (val) {
				return !!val; // force boolean
			},
			loglevel: function (val) {
				val = parseInt(val);
				if (!_util.type.Number(val) || val < 0 || val > 3) {
					throw ["Invalid value for option \"loglevel\":", val];
				}
				return val;
			}
		},
		// holder for  validation methods. duration validation is handled in 'getters-setters.js'
		shifts: ["duration", "offset", "triggerHook"],
		// list of options that trigger a `shift` event
	};
/*
 * method used to add an option to ScrollMagic Scenes.
 * TODO: DOC (private for dev)
 */
	ScrollMagic.Scene.addOption = function (name, defaultValue, validationCallback, shifts) {
		if (!(name in SCENE_OPTIONS.defaults)) {
			SCENE_OPTIONS.defaults[name] = defaultValue;
			SCENE_OPTIONS.validate[name] = validationCallback;
			if (shifts) {
				SCENE_OPTIONS.shifts.push(name);
			}
		} else {
			ScrollMagic._util.log(1, "[static] ScrollMagic.Scene -> Cannot add Scene option '" + name + "', because it already exists.");
		}
	};
	// instance extension function for plugins
	// TODO: DOC (private for dev)
	ScrollMagic.Scene.extend = function (extension) {
		var oldClass = this;
		ScrollMagic.Scene = function () {
			oldClass.apply(this, arguments);
			this.$super = _util.extend({}, this); // copy parent state
			return extension.apply(this, arguments) || this;
		};
		_util.extend(ScrollMagic.Scene, oldClass); // copy properties
		ScrollMagic.Scene.prototype = oldClass.prototype; // copy prototype
		ScrollMagic.Scene.prototype.constructor = ScrollMagic.Scene; // restore constructor
	};


	/**
	 * TODO: DOCS (private for dev)
	 * @class
	 * @private
	 */

	ScrollMagic.Event = function (type, namespace, target, vars) {
		vars = vars || {};
		for (var key in vars) {
			this[key] = vars[key];
		}
		this.type = type;
		this.target = this.currentTarget = target;
		this.namespace = namespace || '';
		this.timeStamp = this.timestamp = Date.now();
		return this;
	};

/*
 * TODO: DOCS (private for dev)
 */

	var _util = ScrollMagic._util = (function (window) {
		var U = {},
			i;

		/**
		 * ------------------------------
		 * internal helpers
		 * ------------------------------
		 */

		// parse float and fall back to 0.
		var floatval = function (number) {
			return parseFloat(number) || 0;
		};
		// get current style IE safe (otherwise IE would return calculated values for 'auto')
		var _getComputedStyle = function (elem) {
			return elem.currentStyle ? elem.currentStyle : window.getComputedStyle(elem);
		};

		// get element dimension (width or height)
		var _dimension = function (which, elem, outer, includeMargin) {
			elem = (elem === document) ? window : elem;
			if (elem === window) {
				includeMargin = false;
			} else if (!_type.DomElement(elem)) {
				return 0;
			}
			which = which.charAt(0).toUpperCase() + which.substr(1).toLowerCase();
			var dimension = (outer ? elem['offset' + which] || elem['outer' + which] : elem['client' + which] || elem['inner' + which]) || 0;
			if (outer && includeMargin) {
				var style = _getComputedStyle(elem);
				dimension += which === 'Height' ? floatval(style.marginTop) + floatval(style.marginBottom) : floatval(style.marginLeft) + floatval(style.marginRight);
			}
			return dimension;
		};
		// converts 'margin-top' into 'marginTop'
		var _camelCase = function (str) {
			return str.replace(/^[^a-z]+([a-z])/g, '$1').replace(/-([a-z])/g, function (g) {
				return g[1].toUpperCase();
			});
		};

		/**
		 * ------------------------------
		 * external helpers
		 * ------------------------------
		 */

		// extend obj – same as jQuery.extend({}, objA, objB)
		U.extend = function (obj) {
			obj = obj || {};
			for (i = 1; i < arguments.length; i++) {
				if (!arguments[i]) {
					continue;
				}
				for (var key in arguments[i]) {
					if (arguments[i].hasOwnProperty(key)) {
						obj[key] = arguments[i][key];
					}
				}
			}
			return obj;
		};

		// check if a css display type results in margin-collapse or not
		U.isMarginCollapseType = function (str) {
			return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(str) > -1;
		};

		// implementation of requestAnimationFrame
		// based on https://gist.github.com/paulirish/1579671
		var
		lastTime = 0,
			vendors = ['ms', 'moz', 'webkit', 'o'];
		var _requestAnimationFrame = window.requestAnimationFrame;
		var _cancelAnimationFrame = window.cancelAnimationFrame;
		// try vendor prefixes if the above doesn't work
		for (i = 0; !_requestAnimationFrame && i < vendors.length; ++i) {
			_requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
			_cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
		}

		// fallbacks
		if (!_requestAnimationFrame) {
			_requestAnimationFrame = function (callback) {
				var
				currTime = new Date().getTime(),
					timeToCall = Math.max(0, 16 - (currTime - lastTime)),
					id = window.setTimeout(function () {
						callback(currTime + timeToCall);
					}, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}
		if (!_cancelAnimationFrame) {
			_cancelAnimationFrame = function (id) {
				window.clearTimeout(id);
			};
		}
		U.rAF = _requestAnimationFrame.bind(window);
		U.cAF = _cancelAnimationFrame.bind(window);

		var
		loglevels = ["error", "warn", "log"],
			console = window.console || {};

		console.log = console.log ||
		function () {}; // no console log, well - do nothing then...
		// make sure methods for all levels exist.
		for (i = 0; i < loglevels.length; i++) {
			var method = loglevels[i];
			if (!console[method]) {
				console[method] = console.log; // prefer .log over nothing
			}
		}
		U.log = function (loglevel) {
			if (loglevel > loglevels.length || loglevel <= 0) loglevel = loglevels.length;
			var now = new Date(),
				time = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + ":" + ("00" + now.getMilliseconds()).slice(-3),
				method = loglevels[loglevel - 1],
				args = Array.prototype.splice.call(arguments, 1),
				func = Function.prototype.bind.call(console[method], console);
			args.unshift(time);
			func.apply(console, args);
		};

		/**
		 * ------------------------------
		 * type testing
		 * ------------------------------
		 */

		var _type = U.type = function (v) {
			return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
		};
		_type.String = function (v) {
			return _type(v) === 'string';
		};
		_type.Function = function (v) {
			return _type(v) === 'function';
		};
		_type.Array = function (v) {
			return Array.isArray(v);
		};
		_type.Number = function (v) {
			return !_type.Array(v) && (v - parseFloat(v) + 1) >= 0;
		};
		_type.DomElement = function (o) {
			return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
			o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string");
		};

		/**
		 * ------------------------------
		 * DOM Element info
		 * ------------------------------
		 */
		// always returns a list of matching DOM elements, from a selector, a DOM element or an list of elements or even an array of selectors
		var _get = U.get = {};
		_get.elements = function (selector) {
			var arr = [];
			if (_type.String(selector)) {
				try {
					selector = document.querySelectorAll(selector);
				} catch (e) { // invalid selector
					return arr;
				}
			}
			if (_type(selector) === 'nodelist' || _type.Array(selector)) {
				for (var i = 0, ref = arr.length = selector.length; i < ref; i++) { // list of elements
					var elem = selector[i];
					arr[i] = _type.DomElement(elem) ? elem : _get.elements(elem); // if not an element, try to resolve recursively
				}
			} else if (_type.DomElement(selector) || selector === document || selector === window) {
				arr = [selector]; // only the element
			}
			return arr;
		};
		// get scroll top value
		_get.scrollTop = function (elem) {
			return (elem && typeof elem.scrollTop === 'number') ? elem.scrollTop : window.pageYOffset || 0;
		};
		// get scroll left value
		_get.scrollLeft = function (elem) {
			return (elem && typeof elem.scrollLeft === 'number') ? elem.scrollLeft : window.pageXOffset || 0;
		};
		// get element height
		_get.width = function (elem, outer, includeMargin) {
			return _dimension('width', elem, outer, includeMargin);
		};
		// get element width
		_get.height = function (elem, outer, includeMargin) {
			return _dimension('height', elem, outer, includeMargin);
		};

		// get element position (optionally relative to viewport)
		_get.offset = function (elem, relativeToViewport) {
			var offset = {
				top: 0,
				left: 0
			};
			if (elem && elem.getBoundingClientRect) { // check if available
				var rect = elem.getBoundingClientRect();
				offset.top = rect.top;
				offset.left = rect.left;
				if (!relativeToViewport) { // clientRect is by default relative to viewport...
					offset.top += _get.scrollTop();
					offset.left += _get.scrollLeft();
				}
			}
			return offset;
		};

		/**
		 * ------------------------------
		 * DOM Element manipulation
		 * ------------------------------
		 */

		U.addClass = function (elem, classname) {
			if (classname) {
				if (elem.classList) elem.classList.add(classname);
				else elem.className += ' ' + classname;
			}
		};
		U.removeClass = function (elem, classname) {
			if (classname) {
				if (elem.classList) elem.classList.remove(classname);
				else elem.className = elem.className.replace(new RegExp('(^|\\b)' + classname.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}
		};
		// if options is string -> returns css value
		// if options is array -> returns object with css value pairs
		// if options is object -> set new css values
		U.css = function (elem, options) {
			if (_type.String(options)) {
				return _getComputedStyle(elem)[_camelCase(options)];
			} else if (_type.Array(options)) {
				var
				obj = {},
					style = _getComputedStyle(elem);
				options.forEach(function (option, key) {
					obj[option] = style[_camelCase(option)];
				});
				return obj;
			} else {
				for (var option in options) {
					var val = options[option];
					if (val == parseFloat(val)) { // assume pixel for seemingly numerical values
						val += 'px';
					}
					elem.style[_camelCase(option)] = val;
				}
			}
		};

		return U;
	}(window || {}));

	ScrollMagic.Scene.prototype.addIndicators = function () {
		ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin \'debug.addIndicators\'. Please make sure to include plugins/debug.addIndicators.js');
		return this;
	}
	ScrollMagic.Scene.prototype.removeIndicators = function () {
		ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin \'debug.addIndicators\'. Please make sure to include plugins/debug.addIndicators.js');
		return this;
	}
	ScrollMagic.Scene.prototype.setTween = function () {
		ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin \'animation.gsap\'. Please make sure to include plugins/animation.gsap.js');
		return this;
	}
	ScrollMagic.Scene.prototype.removeTween = function () {
		ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin \'animation.gsap\'. Please make sure to include plugins/animation.gsap.js');
		return this;
	}
	ScrollMagic.Scene.prototype.setVelocity = function () {
		ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin \'animation.velocity\'. Please make sure to include plugins/animation.velocity.js');
		return this;
	}
	ScrollMagic.Scene.prototype.removeVelocity = function () {
		ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin \'animation.velocity\'. Please make sure to include plugins/animation.velocity.js');
		return this;
	}

	return ScrollMagic;
}));

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmZiN2ZmMzhlZjMwYzZlMTUyYWYiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ3NhcC9Ud2VlbkxpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy90d2VlbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dzYXAvVGltZWxpbmVNYXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Njcm9sbG1hZ2ljL3Njcm9sbG1hZ2ljL3VuY29tcHJlc3NlZC9TY3JvbGxNYWdpYy5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsInRyaWdnZXIiLCJpc0Nsb3NlZCIsIm9uIiwidG9nZ2xlQ2xhc3MiLCJjbGljayIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJyZXBsYWNlIiwiaG9zdG5hbWUiLCJ0YXJnZXQiLCJoYXNoIiwibGVuZ3RoIiwic2xpY2UiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwiZm9ybVN1Ym1pdCIsInZhbGlkYXRlRm9ybSIsImVtYWlsIiwiYXRwb3MiLCJkb3Rwb3MiLCJ1c2VybmFtZSIsIm5hbWUiLCJ2YWwiLCJpbmRleE9mIiwibGFzdEluZGV4T2YiLCJtZXNzYWdlIiwiYWRkQ2xhc3MiLCJ0ZXh0IiwiZm9jdXMiLCJkYXRhc3RyaW5nIiwic2VyaWFsaXplIiwiYWpheCIsInVybCIsIm1ldGhvZCIsImRhdGEiLCJkYXRhVHlwZSIsImVhY2giLCJpIiwibnVtIiwiYXR0ciIsInRsIiwic3RhZ2dlckZyb20iLCJ5IiwiYXV0b0FscGhhIiwiZWFzZSIsIlBvd2VyMSIsImVhc2VPdXQiLCJjb250cm9sbGVyIiwiQ29udHJvbGxlciIsInBpbkludHJvU2NlbmUiLCJTY2VuZSIsInRyaWdnZXJFbGVtZW50IiwidHJpZ2dlckhvb2siLCJkdXJhdGlvbiIsInNldFBpbiIsInB1c2hGb2xsb3dlcnMiLCJhZGRUbyIsInByb2plY3RTY2VuZSIsImNoaWxkcmVuIiwicmV2ZXJzZSIsInNldENsYXNzVG9nZ2xlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7Ozs7OzhDQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBLElBQUk7QUFDSiw2QkFBNkI7QUFDN0IsMkJBQTJCO0FBQzNCO0FB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QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOzs7Ozs7OztBQVFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxLQUFLO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLDREQUE0RDtBQUM1RCx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsMklBQTJJO0FBQ3pLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxvQkFBb0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBLGlDQUFpQyxhQUFhO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMLHVEQUF1RDtBQUN2RDtBQUNBOztBQUVBOztBQUVBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4R0FBOEc7QUFDOUcsNktBQTZLO0FBQzdLO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0tBQWdLO0FBQ2hLO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUdBQXVHO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvSEFBb0g7QUFDcEgsNkJBQTZCOztBQUU3QixJQUFJLDZCQUE2QjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0EsTUFBTSxrREFBa0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHFIQUFxSDtBQUNySCxvQ0FBb0MsNFhBQTRYLE1BQU0sY0FBYyxNQUFNO0FBQzFiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsbUVBQW1FO0FBQ25FO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLG1FQUFtRTtBQUNuRTtBQUNBLE1BQU07QUFDTjtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1LQUFtSztBQUNuSztBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLFlBQVk7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsU0FBUyxPQUFPO0FBQ3ZFO0FBQ0Esa0VBQWtFO0FBQ2xFO0FBQ0EsSUFBSTtBQUNKLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLGFBQWE7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJmYjdmZjM4ZWYzMGM2ZTE1MmFmIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogVkVSU0lPTjogMS4yMC4zXG4gKiBEQVRFOiAyMDE3LTEwLTAyXG4gKiBVUERBVEVTIEFORCBET0NTIEFUOiBodHRwOi8vZ3JlZW5zb2NrLmNvbVxuICpcbiAqIEBsaWNlbnNlIENvcHlyaWdodCAoYykgMjAwOC0yMDE3LCBHcmVlblNvY2suIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIHdvcmsgaXMgc3ViamVjdCB0byB0aGUgdGVybXMgYXQgaHR0cDovL2dyZWVuc29jay5jb20vc3RhbmRhcmQtbGljZW5zZSBvciBmb3JcbiAqIENsdWIgR3JlZW5Tb2NrIG1lbWJlcnMsIHRoZSBzb2Z0d2FyZSBhZ3JlZW1lbnQgdGhhdCB3YXMgaXNzdWVkIHdpdGggeW91ciBtZW1iZXJzaGlwLlxuICogXG4gKiBAYXV0aG9yOiBKYWNrIERveWxlLCBqYWNrQGdyZWVuc29jay5jb21cbiAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgbW9kdWxlTmFtZSkge1xuXG5cdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cdFx0dmFyIF9leHBvcnRzID0ge30sXG5cdFx0XHRfZG9jID0gd2luZG93LmRvY3VtZW50LFxuXHRcdFx0X2dsb2JhbHMgPSB3aW5kb3cuR3JlZW5Tb2NrR2xvYmFscyA9IHdpbmRvdy5HcmVlblNvY2tHbG9iYWxzIHx8IHdpbmRvdztcblx0XHRpZiAoX2dsb2JhbHMuVHdlZW5MaXRlKSB7XG5cdFx0XHRyZXR1cm47IC8vaW4gY2FzZSB0aGUgY29yZSBzZXQgb2YgY2xhc3NlcyBpcyBhbHJlYWR5IGxvYWRlZCwgZG9uJ3QgaW5zdGFudGlhdGUgdHdpY2UuXG5cdFx0fVxuXHRcdHZhciBfbmFtZXNwYWNlID0gZnVuY3Rpb24obnMpIHtcblx0XHRcdFx0dmFyIGEgPSBucy5zcGxpdChcIi5cIiksXG5cdFx0XHRcdFx0cCA9IF9nbG9iYWxzLCBpO1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHBbYVtpXV0gPSBwID0gcFthW2ldXSB8fCB7fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcDtcblx0XHRcdH0sXG5cdFx0XHRncyA9IF9uYW1lc3BhY2UoXCJjb20uZ3JlZW5zb2NrXCIpLFxuXHRcdFx0X3RpbnlOdW0gPSAwLjAwMDAwMDAwMDEsXG5cdFx0XHRfc2xpY2UgPSBmdW5jdGlvbihhKSB7IC8vZG9uJ3QgdXNlIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRhcmdldCwgMCkgYmVjYXVzZSB0aGF0IGRvZXNuJ3Qgd29yayBpbiBJRTggd2l0aCBhIE5vZGVMaXN0IHRoYXQncyByZXR1cm5lZCBieSBxdWVyeVNlbGVjdG9yQWxsKClcblx0XHRcdFx0dmFyIGIgPSBbXSxcblx0XHRcdFx0XHRsID0gYS5sZW5ndGgsXG5cdFx0XHRcdFx0aTtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSAhPT0gbDsgYi5wdXNoKGFbaSsrXSkpIHt9XG5cdFx0XHRcdHJldHVybiBiO1xuXHRcdFx0fSxcblx0XHRcdF9lbXB0eUZ1bmMgPSBmdW5jdGlvbigpIHt9LFxuXHRcdFx0X2lzQXJyYXkgPSAoZnVuY3Rpb24oKSB7IC8vd29ya3MgYXJvdW5kIGlzc3VlcyBpbiBpZnJhbWUgZW52aXJvbm1lbnRzIHdoZXJlIHRoZSBBcnJheSBnbG9iYWwgaXNuJ3Qgc2hhcmVkLCB0aHVzIGlmIHRoZSBvYmplY3Qgb3JpZ2luYXRlcyBpbiBhIGRpZmZlcmVudCB3aW5kb3cvaWZyYW1lLCBcIihvYmogaW5zdGFuY2VvZiBBcnJheSlcIiB3aWxsIGV2YWx1YXRlIGZhbHNlLiBXZSBhZGRlZCBzb21lIHNwZWVkIG9wdGltaXphdGlvbnMgdG8gYXZvaWQgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCkgdW5sZXNzIGl0J3MgYWJzb2x1dGVseSBuZWNlc3NhcnkgYmVjYXVzZSBpdCdzIFZFUlkgc2xvdyAobGlrZSAyMHggc2xvd2VyKVxuXHRcdFx0XHR2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLFxuXHRcdFx0XHRcdGFycmF5ID0gdG9TdHJpbmcuY2FsbChbXSk7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbihvYmopIHtcblx0XHRcdFx0XHRyZXR1cm4gb2JqICE9IG51bGwgJiYgKG9iaiBpbnN0YW5jZW9mIEFycmF5IHx8ICh0eXBlb2Yob2JqKSA9PT0gXCJvYmplY3RcIiAmJiAhIW9iai5wdXNoICYmIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gYXJyYXkpKTtcblx0XHRcdFx0fTtcblx0XHRcdH0oKSksXG5cdFx0XHRhLCBpLCBwLCBfdGlja2VyLCBfdGlja2VyQWN0aXZlLFxuXHRcdFx0X2RlZkxvb2t1cCA9IHt9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdFx0ICogRGVmaW5lcyBhIEdyZWVuU29jayBjbGFzcywgb3B0aW9uYWxseSB3aXRoIGFuIGFycmF5IG9mIGRlcGVuZGVuY2llcyB0aGF0IG11c3QgYmUgaW5zdGFudGlhdGVkIGZpcnN0IGFuZCBwYXNzZWQgaW50byB0aGUgZGVmaW5pdGlvbi5cblx0XHRcdCAqIFRoaXMgYWxsb3dzIHVzZXJzIHRvIGxvYWQgR3JlZW5Tb2NrIEpTIGZpbGVzIGluIGFueSBvcmRlciBldmVuIGlmIHRoZXkgaGF2ZSBpbnRlcmRlcGVuZGVuY2llcyAobGlrZSBDU1NQbHVnaW4gZXh0ZW5kcyBUd2VlblBsdWdpbiB3aGljaCBpc1xuXHRcdFx0ICogaW5zaWRlIFR3ZWVuTGl0ZS5qcywgYnV0IGlmIENTU1BsdWdpbiBpcyBsb2FkZWQgZmlyc3QsIGl0IHNob3VsZCB3YWl0IHRvIHJ1biBpdHMgY29kZSB1bnRpbCBUd2VlbkxpdGUuanMgbG9hZHMgYW5kIGluc3RhbnRpYXRlcyBUd2VlblBsdWdpblxuXHRcdFx0ICogYW5kIHRoZW4gcGFzcyBUd2VlblBsdWdpbiB0byBDU1NQbHVnaW4ncyBkZWZpbml0aW9uKS4gVGhpcyBpcyBhbGwgZG9uZSBhdXRvbWF0aWNhbGx5IGFuZCBpbnRlcm5hbGx5LlxuXHRcdFx0ICpcblx0XHRcdCAqIEV2ZXJ5IGRlZmluaXRpb24gd2lsbCBiZSBhZGRlZCB0byBhIFwiY29tLmdyZWVuc29ja1wiIGdsb2JhbCBvYmplY3QgKHR5cGljYWxseSB3aW5kb3csIGJ1dCBpZiBhIHdpbmRvdy5HcmVlblNvY2tHbG9iYWxzIG9iamVjdCBpcyBmb3VuZCxcblx0XHRcdCAqIGl0IHdpbGwgZ28gdGhlcmUgYXMgb2YgdjEuNykuIEZvciBleGFtcGxlLCBUd2VlbkxpdGUgd2lsbCBiZSBmb3VuZCBhdCB3aW5kb3cuY29tLmdyZWVuc29jay5Ud2VlbkxpdGUgYW5kIHNpbmNlIGl0J3MgYSBnbG9iYWwgY2xhc3MgdGhhdCBzaG91bGQgYmUgYXZhaWxhYmxlIGFueXdoZXJlLFxuXHRcdFx0ICogaXQgaXMgQUxTTyByZWZlcmVuY2VkIGF0IHdpbmRvdy5Ud2VlbkxpdGUuIEhvd2V2ZXIgc29tZSBjbGFzc2VzIGFyZW4ndCBjb25zaWRlcmVkIGdsb2JhbCwgbGlrZSB0aGUgYmFzZSBjb20uZ3JlZW5zb2NrLmNvcmUuQW5pbWF0aW9uIGNsYXNzLCBzb1xuXHRcdFx0ICogdGhvc2Ugd2lsbCBvbmx5IGJlIGF0IHRoZSBwYWNrYWdlIGxpa2Ugd2luZG93LmNvbS5ncmVlbnNvY2suY29yZS5BbmltYXRpb24uIEFnYWluLCBpZiB5b3UgZGVmaW5lIGEgR3JlZW5Tb2NrR2xvYmFscyBvYmplY3Qgb24gdGhlIHdpbmRvdywgZXZlcnl0aGluZ1xuXHRcdFx0ICogZ2V0cyB0dWNrZWQgbmVhdGx5IGluc2lkZSB0aGVyZSBpbnN0ZWFkIG9mIG9uIHRoZSB3aW5kb3cgZGlyZWN0bHkuIFRoaXMgYWxsb3dzIHlvdSB0byBkbyBhZHZhbmNlZCB0aGluZ3MgbGlrZSBsb2FkIG11bHRpcGxlIHZlcnNpb25zIG9mIEdyZWVuU29ja1xuXHRcdFx0ICogZmlsZXMgYW5kIHB1dCB0aGVtIGludG8gZGlzdGluY3Qgb2JqZWN0cyAoaW1hZ2luZSBhIGJhbm5lciBhZCB1c2VzIGEgbmV3ZXIgdmVyc2lvbiBidXQgdGhlIG1haW4gc2l0ZSB1c2VzIGFuIG9sZGVyIG9uZSkuIEluIHRoYXQgY2FzZSwgeW91IGNvdWxkXG5cdFx0XHQgKiBzYW5kYm94IHRoZSBiYW5uZXIgb25lIGxpa2U6XG5cdFx0XHQgKlxuXHRcdFx0ICogPHNjcmlwdD5cblx0XHRcdCAqICAgICB2YXIgZ3MgPSB3aW5kb3cuR3JlZW5Tb2NrR2xvYmFscyA9IHt9OyAvL3RoZSBuZXdlciB2ZXJzaW9uIHdlJ3JlIGFib3V0IHRvIGxvYWQgY291bGQgbm93IGJlIHJlZmVyZW5jZWQgaW4gYSBcImdzXCIgb2JqZWN0LCBsaWtlIGdzLlR3ZWVuTGl0ZS50byguLi4pLiBVc2Ugd2hhdGV2ZXIgYWxpYXMgeW91IHdhbnQgYXMgbG9uZyBhcyBpdCdzIHVuaXF1ZSwgXCJnc1wiIG9yIFwiYmFubmVyXCIgb3Igd2hhdGV2ZXIuXG5cdFx0XHQgKiA8L3NjcmlwdD5cblx0XHRcdCAqIDxzY3JpcHQgc3JjPVwianMvZ3JlZW5zb2NrL3YxLjcvVHdlZW5NYXguanNcIj48L3NjcmlwdD5cblx0XHRcdCAqIDxzY3JpcHQ+XG5cdFx0XHQgKiAgICAgd2luZG93LkdyZWVuU29ja0dsb2JhbHMgPSB3aW5kb3cuX2dzUXVldWUgPSB3aW5kb3cuX2dzRGVmaW5lID0gbnVsbDsgLy9yZXNldCBpdCBiYWNrIHRvIG51bGwgKGFsb25nIHdpdGggdGhlIHNwZWNpYWwgX2dzUXVldWUgdmFyaWFibGUpIHNvIHRoYXQgdGhlIG5leHQgbG9hZCBvZiBUd2Vlbk1heCBhZmZlY3RzIHRoZSB3aW5kb3cgYW5kIHdlIGNhbiByZWZlcmVuY2UgdGhpbmdzIGRpcmVjdGx5IGxpa2UgVHdlZW5MaXRlLnRvKC4uLilcblx0XHRcdCAqIDwvc2NyaXB0PlxuXHRcdFx0ICogPHNjcmlwdCBzcmM9XCJqcy9ncmVlbnNvY2svdjEuNi9Ud2Vlbk1heC5qc1wiPjwvc2NyaXB0PlxuXHRcdFx0ICogPHNjcmlwdD5cblx0XHRcdCAqICAgICBncy5Ud2VlbkxpdGUudG8oLi4uKTsgLy93b3VsZCB1c2UgdjEuN1xuXHRcdFx0ICogICAgIFR3ZWVuTGl0ZS50byguLi4pOyAvL3dvdWxkIHVzZSB2MS42XG5cdFx0XHQgKiA8L3NjcmlwdD5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0geyFzdHJpbmd9IG5zIFRoZSBuYW1lc3BhY2Ugb2YgdGhlIGNsYXNzIGRlZmluaXRpb24sIGxlYXZpbmcgb2ZmIFwiY29tLmdyZWVuc29jay5cIiBhcyB0aGF0J3MgYXNzdW1lZC4gRm9yIGV4YW1wbGUsIFwiVHdlZW5MaXRlXCIgb3IgXCJwbHVnaW5zLkNTU1BsdWdpblwiIG9yIFwiZWFzaW5nLkJhY2tcIi5cblx0XHRcdCAqIEBwYXJhbSB7IUFycmF5LjxzdHJpbmc+fSBkZXBlbmRlbmNpZXMgQW4gYXJyYXkgb2YgZGVwZW5kZW5jaWVzIChkZXNjcmliZWQgYXMgdGhlaXIgbmFtZXNwYWNlcyBtaW51cyBcImNvbS5ncmVlbnNvY2suXCIgcHJlZml4KS4gRm9yIGV4YW1wbGUgW1wiVHdlZW5MaXRlXCIsXCJwbHVnaW5zLlR3ZWVuUGx1Z2luXCIsXCJjb3JlLkFuaW1hdGlvblwiXVxuXHRcdFx0ICogQHBhcmFtIHshZnVuY3Rpb24oKTpPYmplY3R9IGZ1bmMgVGhlIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCBhbmQgcGFzc2VkIHRoZSByZXNvbHZlZCBkZXBlbmRlbmNpZXMgd2hpY2ggd2lsbCByZXR1cm4gdGhlIGFjdHVhbCBjbGFzcyBmb3IgdGhpcyBkZWZpbml0aW9uLlxuXHRcdFx0ICogQHBhcmFtIHtib29sZWFuPX0gZ2xvYmFsIElmIHRydWUsIHRoZSBjbGFzcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBnbG9iYWwgc2NvcGUgKHR5cGljYWxseSB3aW5kb3cgdW5sZXNzIHlvdSBkZWZpbmUgYSB3aW5kb3cuR3JlZW5Tb2NrR2xvYmFscyBvYmplY3QpXG5cdFx0XHQgKi9cblx0XHRcdERlZmluaXRpb24gPSBmdW5jdGlvbihucywgZGVwZW5kZW5jaWVzLCBmdW5jLCBnbG9iYWwpIHtcblx0XHRcdFx0dGhpcy5zYyA9IChfZGVmTG9va3VwW25zXSkgPyBfZGVmTG9va3VwW25zXS5zYyA6IFtdOyAvL3N1YmNsYXNzZXNcblx0XHRcdFx0X2RlZkxvb2t1cFtuc10gPSB0aGlzO1xuXHRcdFx0XHR0aGlzLmdzQ2xhc3MgPSBudWxsO1xuXHRcdFx0XHR0aGlzLmZ1bmMgPSBmdW5jO1xuXHRcdFx0XHR2YXIgX2NsYXNzZXMgPSBbXTtcblx0XHRcdFx0dGhpcy5jaGVjayA9IGZ1bmN0aW9uKGluaXQpIHtcblx0XHRcdFx0XHR2YXIgaSA9IGRlcGVuZGVuY2llcy5sZW5ndGgsXG5cdFx0XHRcdFx0XHRtaXNzaW5nID0gaSxcblx0XHRcdFx0XHRcdGN1ciwgYSwgbiwgY2w7XG5cdFx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRpZiAoKGN1ciA9IF9kZWZMb29rdXBbZGVwZW5kZW5jaWVzW2ldXSB8fCBuZXcgRGVmaW5pdGlvbihkZXBlbmRlbmNpZXNbaV0sIFtdKSkuZ3NDbGFzcykge1xuXHRcdFx0XHRcdFx0XHRfY2xhc3Nlc1tpXSA9IGN1ci5nc0NsYXNzO1xuXHRcdFx0XHRcdFx0XHRtaXNzaW5nLS07XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGluaXQpIHtcblx0XHRcdFx0XHRcdFx0Y3VyLnNjLnB1c2godGhpcyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChtaXNzaW5nID09PSAwICYmIGZ1bmMpIHtcblx0XHRcdFx0XHRcdGEgPSAoXCJjb20uZ3JlZW5zb2NrLlwiICsgbnMpLnNwbGl0KFwiLlwiKTtcblx0XHRcdFx0XHRcdG4gPSBhLnBvcCgpO1xuXHRcdFx0XHRcdFx0Y2wgPSBfbmFtZXNwYWNlKGEuam9pbihcIi5cIikpW25dID0gdGhpcy5nc0NsYXNzID0gZnVuYy5hcHBseShmdW5jLCBfY2xhc3Nlcyk7XG5cblx0XHRcdFx0XHRcdC8vZXhwb3J0cyB0byBtdWx0aXBsZSBlbnZpcm9ubWVudHNcblx0XHRcdFx0XHRcdGlmIChnbG9iYWwpIHtcblx0XHRcdFx0XHRcdFx0X2dsb2JhbHNbbl0gPSBfZXhwb3J0c1tuXSA9IGNsOyAvL3Byb3ZpZGVzIGEgd2F5IHRvIGF2b2lkIGdsb2JhbCBuYW1lc3BhY2UgcG9sbHV0aW9uLiBCeSBkZWZhdWx0LCB0aGUgbWFpbiBjbGFzc2VzIGxpa2UgVHdlZW5MaXRlLCBQb3dlcjEsIFN0cm9uZywgZXRjLiBhcmUgYWRkZWQgdG8gd2luZG93IHVubGVzcyBhIEdyZWVuU29ja0dsb2JhbHMgaXMgZGVmaW5lZC4gU28gaWYgeW91IHdhbnQgdG8gaGF2ZSB0aGluZ3MgYWRkZWQgdG8gYSBjdXN0b20gb2JqZWN0IGluc3RlYWQsIGp1c3QgZG8gc29tZXRoaW5nIGxpa2Ugd2luZG93LkdyZWVuU29ja0dsb2JhbHMgPSB7fSBiZWZvcmUgbG9hZGluZyBhbnkgR3JlZW5Tb2NrIGZpbGVzLiBZb3UgY2FuIGV2ZW4gc2V0IHVwIGFuIGFsaWFzIGxpa2Ugd2luZG93LkdyZWVuU29ja0dsb2JhbHMgPSB3aW5kb3dzLmdzID0ge30gc28gdGhhdCB5b3UgY2FuIGFjY2VzcyBldmVyeXRoaW5nIGxpa2UgZ3MuVHdlZW5MaXRlLiBBbHNvIHJlbWVtYmVyIHRoYXQgQUxMIGNsYXNzZXMgYXJlIGFkZGVkIHRvIHRoZSB3aW5kb3cuY29tLmdyZWVuc29jayBvYmplY3QgKGluIHRoZWlyIHJlc3BlY3RpdmUgcGFja2FnZXMsIGxpa2UgY29tLmdyZWVuc29jay5lYXNpbmcuUG93ZXIxLCBjb20uZ3JlZW5zb2NrLlR3ZWVuTGl0ZSwgZXRjLilcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZihtb2R1bGUpICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZS5leHBvcnRzKSB7IC8vbm9kZVxuXHRcdFx0XHRcdFx0XHRcdGlmIChucyA9PT0gbW9kdWxlTmFtZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmV4cG9ydHMgPSBfZXhwb3J0c1ttb2R1bGVOYW1lXSA9IGNsO1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChpIGluIF9leHBvcnRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNsW2ldID0gX2V4cG9ydHNbaV07XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChfZXhwb3J0c1ttb2R1bGVOYW1lXSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0X2V4cG9ydHNbbW9kdWxlTmFtZV1bbl0gPSBjbDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mKGRlZmluZSkgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKXsgLy9BTURcblx0XHRcdFx0XHRcdFx0XHRkZWZpbmUoKHdpbmRvdy5HcmVlblNvY2tBTURQYXRoID8gd2luZG93LkdyZWVuU29ja0FNRFBhdGggKyBcIi9cIiA6IFwiXCIpICsgbnMuc3BsaXQoXCIuXCIpLnBvcCgpLCBbXSwgZnVuY3Rpb24oKSB7IHJldHVybiBjbDsgfSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLnNjLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2NbaV0uY2hlY2soKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHRcdHRoaXMuY2hlY2sodHJ1ZSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvL3VzZWQgdG8gY3JlYXRlIERlZmluaXRpb24gaW5zdGFuY2VzICh3aGljaCBiYXNpY2FsbHkgcmVnaXN0ZXJzIGEgY2xhc3MgdGhhdCBoYXMgZGVwZW5kZW5jaWVzKS5cblx0XHRcdF9nc0RlZmluZSA9IHdpbmRvdy5fZ3NEZWZpbmUgPSBmdW5jdGlvbihucywgZGVwZW5kZW5jaWVzLCBmdW5jLCBnbG9iYWwpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBEZWZpbml0aW9uKG5zLCBkZXBlbmRlbmNpZXMsIGZ1bmMsIGdsb2JhbCk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvL2EgcXVpY2sgd2F5IHRvIGNyZWF0ZSBhIGNsYXNzIHRoYXQgZG9lc24ndCBoYXZlIGFueSBkZXBlbmRlbmNpZXMuIFJldHVybnMgdGhlIGNsYXNzLCBidXQgZmlyc3QgcmVnaXN0ZXJzIGl0IGluIHRoZSBHcmVlblNvY2sgbmFtZXNwYWNlIHNvIHRoYXQgb3RoZXIgY2xhc3NlcyBjYW4gZ3JhYiBpdCAob3RoZXIgY2xhc3NlcyBtaWdodCBiZSBkZXBlbmRlbnQgb24gdGhlIGNsYXNzKS5cblx0XHRcdF9jbGFzcyA9IGdzLl9jbGFzcyA9IGZ1bmN0aW9uKG5zLCBmdW5jLCBnbG9iYWwpIHtcblx0XHRcdFx0ZnVuYyA9IGZ1bmMgfHwgZnVuY3Rpb24oKSB7fTtcblx0XHRcdFx0X2dzRGVmaW5lKG5zLCBbXSwgZnVuY3Rpb24oKXsgcmV0dXJuIGZ1bmM7IH0sIGdsb2JhbCk7XG5cdFx0XHRcdHJldHVybiBmdW5jO1xuXHRcdFx0fTtcblxuXHRcdF9nc0RlZmluZS5nbG9iYWxzID0gX2dsb2JhbHM7XG5cblxuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRWFzZVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cdFx0dmFyIF9iYXNlUGFyYW1zID0gWzAsIDAsIDEsIDFdLFxuXHRcdFx0RWFzZSA9IF9jbGFzcyhcImVhc2luZy5FYXNlXCIsIGZ1bmN0aW9uKGZ1bmMsIGV4dHJhUGFyYW1zLCB0eXBlLCBwb3dlcikge1xuXHRcdFx0XHR0aGlzLl9mdW5jID0gZnVuYztcblx0XHRcdFx0dGhpcy5fdHlwZSA9IHR5cGUgfHwgMDtcblx0XHRcdFx0dGhpcy5fcG93ZXIgPSBwb3dlciB8fCAwO1xuXHRcdFx0XHR0aGlzLl9wYXJhbXMgPSBleHRyYVBhcmFtcyA/IF9iYXNlUGFyYW1zLmNvbmNhdChleHRyYVBhcmFtcykgOiBfYmFzZVBhcmFtcztcblx0XHRcdH0sIHRydWUpLFxuXHRcdFx0X2Vhc2VNYXAgPSBFYXNlLm1hcCA9IHt9LFxuXHRcdFx0X2Vhc2VSZWcgPSBFYXNlLnJlZ2lzdGVyID0gZnVuY3Rpb24oZWFzZSwgbmFtZXMsIHR5cGVzLCBjcmVhdGUpIHtcblx0XHRcdFx0dmFyIG5hID0gbmFtZXMuc3BsaXQoXCIsXCIpLFxuXHRcdFx0XHRcdGkgPSBuYS5sZW5ndGgsXG5cdFx0XHRcdFx0dGEgPSAodHlwZXMgfHwgXCJlYXNlSW4sZWFzZU91dCxlYXNlSW5PdXRcIikuc3BsaXQoXCIsXCIpLFxuXHRcdFx0XHRcdGUsIG5hbWUsIGosIHR5cGU7XG5cdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdG5hbWUgPSBuYVtpXTtcblx0XHRcdFx0XHRlID0gY3JlYXRlID8gX2NsYXNzKFwiZWFzaW5nLlwiK25hbWUsIG51bGwsIHRydWUpIDogZ3MuZWFzaW5nW25hbWVdIHx8IHt9O1xuXHRcdFx0XHRcdGogPSB0YS5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKC0taiA+IC0xKSB7XG5cdFx0XHRcdFx0XHR0eXBlID0gdGFbal07XG5cdFx0XHRcdFx0XHRfZWFzZU1hcFtuYW1lICsgXCIuXCIgKyB0eXBlXSA9IF9lYXNlTWFwW3R5cGUgKyBuYW1lXSA9IGVbdHlwZV0gPSBlYXNlLmdldFJhdGlvID8gZWFzZSA6IGVhc2VbdHlwZV0gfHwgbmV3IGVhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRwID0gRWFzZS5wcm90b3R5cGU7XG5cdFx0cC5fY2FsY0VuZCA9IGZhbHNlO1xuXHRcdHAuZ2V0UmF0aW8gPSBmdW5jdGlvbihwKSB7XG5cdFx0XHRpZiAodGhpcy5fZnVuYykge1xuXHRcdFx0XHR0aGlzLl9wYXJhbXNbMF0gPSBwO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZnVuYy5hcHBseShudWxsLCB0aGlzLl9wYXJhbXMpO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHQgPSB0aGlzLl90eXBlLFxuXHRcdFx0XHRwdyA9IHRoaXMuX3Bvd2VyLFxuXHRcdFx0XHRyID0gKHQgPT09IDEpID8gMSAtIHAgOiAodCA9PT0gMikgPyBwIDogKHAgPCAwLjUpID8gcCAqIDIgOiAoMSAtIHApICogMjtcblx0XHRcdGlmIChwdyA9PT0gMSkge1xuXHRcdFx0XHRyICo9IHI7XG5cdFx0XHR9IGVsc2UgaWYgKHB3ID09PSAyKSB7XG5cdFx0XHRcdHIgKj0gciAqIHI7XG5cdFx0XHR9IGVsc2UgaWYgKHB3ID09PSAzKSB7XG5cdFx0XHRcdHIgKj0gciAqIHIgKiByO1xuXHRcdFx0fSBlbHNlIGlmIChwdyA9PT0gNCkge1xuXHRcdFx0XHRyICo9IHIgKiByICogciAqIHI7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKHQgPT09IDEpID8gMSAtIHIgOiAodCA9PT0gMikgPyByIDogKHAgPCAwLjUpID8gciAvIDIgOiAxIC0gKHIgLyAyKTtcblx0XHR9O1xuXG5cdFx0Ly9jcmVhdGUgYWxsIHRoZSBzdGFuZGFyZCBlYXNlcyBsaWtlIExpbmVhciwgUXVhZCwgQ3ViaWMsIFF1YXJ0LCBRdWludCwgU3Ryb25nLCBQb3dlcjAsIFBvd2VyMSwgUG93ZXIyLCBQb3dlcjMsIGFuZCBQb3dlcjQgKGVhY2ggd2l0aCBlYXNlSW4sIGVhc2VPdXQsIGFuZCBlYXNlSW5PdXQpXG5cdFx0YSA9IFtcIkxpbmVhclwiLFwiUXVhZFwiLFwiQ3ViaWNcIixcIlF1YXJ0XCIsXCJRdWludCxTdHJvbmdcIl07XG5cdFx0aSA9IGEubGVuZ3RoO1xuXHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0cCA9IGFbaV0rXCIsUG93ZXJcIitpO1xuXHRcdFx0X2Vhc2VSZWcobmV3IEVhc2UobnVsbCxudWxsLDEsaSksIHAsIFwiZWFzZU91dFwiLCB0cnVlKTtcblx0XHRcdF9lYXNlUmVnKG5ldyBFYXNlKG51bGwsbnVsbCwyLGkpLCBwLCBcImVhc2VJblwiICsgKChpID09PSAwKSA/IFwiLGVhc2VOb25lXCIgOiBcIlwiKSk7XG5cdFx0XHRfZWFzZVJlZyhuZXcgRWFzZShudWxsLG51bGwsMyxpKSwgcCwgXCJlYXNlSW5PdXRcIik7XG5cdFx0fVxuXHRcdF9lYXNlTWFwLmxpbmVhciA9IGdzLmVhc2luZy5MaW5lYXIuZWFzZUluO1xuXHRcdF9lYXNlTWFwLnN3aW5nID0gZ3MuZWFzaW5nLlF1YWQuZWFzZUluT3V0OyAvL2ZvciBqUXVlcnkgZm9sa3NcblxuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRXZlbnREaXNwYXRjaGVyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblx0XHR2YXIgRXZlbnREaXNwYXRjaGVyID0gX2NsYXNzKFwiZXZlbnRzLkV2ZW50RGlzcGF0Y2hlclwiLCBmdW5jdGlvbih0YXJnZXQpIHtcblx0XHRcdHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuXHRcdFx0dGhpcy5fZXZlbnRUYXJnZXQgPSB0YXJnZXQgfHwgdGhpcztcblx0XHR9KTtcblx0XHRwID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZTtcblxuXHRcdHAuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBzY29wZSwgdXNlUGFyYW0sIHByaW9yaXR5KSB7XG5cdFx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0XHR2YXIgbGlzdCA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXSxcblx0XHRcdFx0aW5kZXggPSAwLFxuXHRcdFx0XHRsaXN0ZW5lciwgaTtcblx0XHRcdGlmICh0aGlzID09PSBfdGlja2VyICYmICFfdGlja2VyQWN0aXZlKSB7XG5cdFx0XHRcdF90aWNrZXIud2FrZSgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGxpc3QgPT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl9saXN0ZW5lcnNbdHlwZV0gPSBsaXN0ID0gW107XG5cdFx0XHR9XG5cdFx0XHRpID0gbGlzdC5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0bGlzdGVuZXIgPSBsaXN0W2ldO1xuXHRcdFx0XHRpZiAobGlzdGVuZXIuYyA9PT0gY2FsbGJhY2sgJiYgbGlzdGVuZXIucyA9PT0gc2NvcGUpIHtcblx0XHRcdFx0XHRsaXN0LnNwbGljZShpLCAxKTtcblx0XHRcdFx0fSBlbHNlIGlmIChpbmRleCA9PT0gMCAmJiBsaXN0ZW5lci5wciA8IHByaW9yaXR5KSB7XG5cdFx0XHRcdFx0aW5kZXggPSBpICsgMTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bGlzdC5zcGxpY2UoaW5kZXgsIDAsIHtjOmNhbGxiYWNrLCBzOnNjb3BlLCB1cDp1c2VQYXJhbSwgcHI6cHJpb3JpdHl9KTtcblx0XHR9O1xuXG5cdFx0cC5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgY2FsbGJhY2spIHtcblx0XHRcdHZhciBsaXN0ID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdLCBpO1xuXHRcdFx0aWYgKGxpc3QpIHtcblx0XHRcdFx0aSA9IGxpc3QubGVuZ3RoO1xuXHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHRpZiAobGlzdFtpXS5jID09PSBjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0bGlzdC5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHAuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKHR5cGUpIHtcblx0XHRcdHZhciBsaXN0ID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdLFxuXHRcdFx0XHRpLCB0LCBsaXN0ZW5lcjtcblx0XHRcdGlmIChsaXN0KSB7XG5cdFx0XHRcdGkgPSBsaXN0Lmxlbmd0aDtcblx0XHRcdFx0aWYgKGkgPiAxKSB7IFxuXHRcdFx0XHRcdGxpc3QgPSBsaXN0LnNsaWNlKDApOyAvL2luIGNhc2UgYWRkRXZlbnRMaXN0ZW5lcigpIGlzIGNhbGxlZCBmcm9tIHdpdGhpbiBhIGxpc3RlbmVyL2NhbGxiYWNrIChvdGhlcndpc2UgdGhlIGluZGV4IGNvdWxkIGNoYW5nZSwgcmVzdWx0aW5nIGluIGEgc2tpcClcblx0XHRcdFx0fVxuXHRcdFx0XHR0ID0gdGhpcy5fZXZlbnRUYXJnZXQ7XG5cdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdGxpc3RlbmVyID0gbGlzdFtpXTtcblx0XHRcdFx0XHRpZiAobGlzdGVuZXIpIHtcblx0XHRcdFx0XHRcdGlmIChsaXN0ZW5lci51cCkge1xuXHRcdFx0XHRcdFx0XHRsaXN0ZW5lci5jLmNhbGwobGlzdGVuZXIucyB8fCB0LCB7dHlwZTp0eXBlLCB0YXJnZXQ6dH0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0bGlzdGVuZXIuYy5jYWxsKGxpc3RlbmVyLnMgfHwgdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVGlja2VyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cbiBcdFx0dmFyIF9yZXFBbmltRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLFxuXHRcdFx0X2NhbmNlbEFuaW1GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSxcblx0XHRcdF9nZXRUaW1lID0gRGF0ZS5ub3cgfHwgZnVuY3Rpb24oKSB7cmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO30sXG5cdFx0XHRfbGFzdFVwZGF0ZSA9IF9nZXRUaW1lKCk7XG5cblx0XHQvL25vdyB0cnkgdG8gZGV0ZXJtaW5lIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgYW5kIGNhbmNlbEFuaW1hdGlvbkZyYW1lIGZ1bmN0aW9ucyBhbmQgaWYgbm9uZSBhcmUgZm91bmQsIHdlJ2xsIHVzZSBhIHNldFRpbWVvdXQoKS9jbGVhclRpbWVvdXQoKSBwb2x5ZmlsbC5cblx0XHRhID0gW1wibXNcIixcIm1velwiLFwid2Via2l0XCIsXCJvXCJdO1xuXHRcdGkgPSBhLmxlbmd0aDtcblx0XHR3aGlsZSAoLS1pID4gLTEgJiYgIV9yZXFBbmltRnJhbWUpIHtcblx0XHRcdF9yZXFBbmltRnJhbWUgPSB3aW5kb3dbYVtpXSArIFwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xuXHRcdFx0X2NhbmNlbEFuaW1GcmFtZSA9IHdpbmRvd1thW2ldICsgXCJDYW5jZWxBbmltYXRpb25GcmFtZVwiXSB8fCB3aW5kb3dbYVtpXSArIFwiQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xuXHRcdH1cblxuXHRcdF9jbGFzcyhcIlRpY2tlclwiLCBmdW5jdGlvbihmcHMsIHVzZVJBRikge1xuXHRcdFx0dmFyIF9zZWxmID0gdGhpcyxcblx0XHRcdFx0X3N0YXJ0VGltZSA9IF9nZXRUaW1lKCksXG5cdFx0XHRcdF91c2VSQUYgPSAodXNlUkFGICE9PSBmYWxzZSAmJiBfcmVxQW5pbUZyYW1lKSA/IFwiYXV0b1wiIDogZmFsc2UsXG5cdFx0XHRcdF9sYWdUaHJlc2hvbGQgPSA1MDAsXG5cdFx0XHRcdF9hZGp1c3RlZExhZyA9IDMzLFxuXHRcdFx0XHRfdGlja1dvcmQgPSBcInRpY2tcIiwgLy9oZWxwcyByZWR1Y2UgZ2MgYnVyZGVuXG5cdFx0XHRcdF9mcHMsIF9yZXEsIF9pZCwgX2dhcCwgX25leHRUaW1lLFxuXHRcdFx0XHRfdGljayA9IGZ1bmN0aW9uKG1hbnVhbCkge1xuXHRcdFx0XHRcdHZhciBlbGFwc2VkID0gX2dldFRpbWUoKSAtIF9sYXN0VXBkYXRlLFxuXHRcdFx0XHRcdFx0b3ZlcmxhcCwgZGlzcGF0Y2g7XG5cdFx0XHRcdFx0aWYgKGVsYXBzZWQgPiBfbGFnVGhyZXNob2xkKSB7XG5cdFx0XHRcdFx0XHRfc3RhcnRUaW1lICs9IGVsYXBzZWQgLSBfYWRqdXN0ZWRMYWc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF9sYXN0VXBkYXRlICs9IGVsYXBzZWQ7XG5cdFx0XHRcdFx0X3NlbGYudGltZSA9IChfbGFzdFVwZGF0ZSAtIF9zdGFydFRpbWUpIC8gMTAwMDtcblx0XHRcdFx0XHRvdmVybGFwID0gX3NlbGYudGltZSAtIF9uZXh0VGltZTtcblx0XHRcdFx0XHRpZiAoIV9mcHMgfHwgb3ZlcmxhcCA+IDAgfHwgbWFudWFsID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRfc2VsZi5mcmFtZSsrO1xuXHRcdFx0XHRcdFx0X25leHRUaW1lICs9IG92ZXJsYXAgKyAob3ZlcmxhcCA+PSBfZ2FwID8gMC4wMDQgOiBfZ2FwIC0gb3ZlcmxhcCk7XG5cdFx0XHRcdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChtYW51YWwgIT09IHRydWUpIHsgLy9tYWtlIHN1cmUgdGhlIHJlcXVlc3QgaXMgbWFkZSBiZWZvcmUgd2UgZGlzcGF0Y2ggdGhlIFwidGlja1wiIGV2ZW50IHNvIHRoYXQgdGltaW5nIGlzIG1haW50YWluZWQuIE90aGVyd2lzZSwgaWYgcHJvY2Vzc2luZyB0aGUgXCJ0aWNrXCIgcmVxdWlyZXMgYSBidW5jaCBvZiB0aW1lIChsaWtlIDE1bXMpIGFuZCB3ZSdyZSB1c2luZyBhIHNldFRpbWVvdXQoKSB0aGF0J3MgYmFzZWQgb24gMTYuN21zLCBpdCdkIHRlY2huaWNhbGx5IHRha2UgMzEuN21zIGJldHdlZW4gZnJhbWVzIG90aGVyd2lzZS5cblx0XHRcdFx0XHRcdF9pZCA9IF9yZXEoX3RpY2spO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoZGlzcGF0Y2gpIHtcblx0XHRcdFx0XHRcdF9zZWxmLmRpc3BhdGNoRXZlbnQoX3RpY2tXb3JkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cblx0XHRcdEV2ZW50RGlzcGF0Y2hlci5jYWxsKF9zZWxmKTtcblx0XHRcdF9zZWxmLnRpbWUgPSBfc2VsZi5mcmFtZSA9IDA7XG5cdFx0XHRfc2VsZi50aWNrID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdF90aWNrKHRydWUpO1xuXHRcdFx0fTtcblxuXHRcdFx0X3NlbGYubGFnU21vb3RoaW5nID0gZnVuY3Rpb24odGhyZXNob2xkLCBhZGp1c3RlZExhZykge1xuXHRcdFx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHsgLy9pZiBsYWdTbW9vdGhpbmcoKSBpcyBjYWxsZWQgd2l0aCBubyBhcmd1bWVudHMsIHRyZWF0IGl0IGxpa2UgYSBnZXR0ZXIgdGhhdCByZXR1cm5zIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGl0J3MgZW5hYmxlZCBvciBub3QuIFRoaXMgaXMgcHVycG9zZWx5IHVuZG9jdW1lbnRlZCBhbmQgaXMgZm9yIGludGVybmFsIHVzZS5cblx0XHRcdFx0XHRyZXR1cm4gKF9sYWdUaHJlc2hvbGQgPCAxIC8gX3RpbnlOdW0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF9sYWdUaHJlc2hvbGQgPSB0aHJlc2hvbGQgfHwgKDEgLyBfdGlueU51bSk7IC8vemVybyBzaG91bGQgYmUgaW50ZXJwcmV0ZWQgYXMgYmFzaWNhbGx5IHVubGltaXRlZFxuXHRcdFx0XHRfYWRqdXN0ZWRMYWcgPSBNYXRoLm1pbihhZGp1c3RlZExhZywgX2xhZ1RocmVzaG9sZCwgMCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRfc2VsZi5zbGVlcCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoX2lkID09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFfdXNlUkFGIHx8ICFfY2FuY2VsQW5pbUZyYW1lKSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KF9pZCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0X2NhbmNlbEFuaW1GcmFtZShfaWQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF9yZXEgPSBfZW1wdHlGdW5jO1xuXHRcdFx0XHRfaWQgPSBudWxsO1xuXHRcdFx0XHRpZiAoX3NlbGYgPT09IF90aWNrZXIpIHtcblx0XHRcdFx0XHRfdGlja2VyQWN0aXZlID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdF9zZWxmLndha2UgPSBmdW5jdGlvbihzZWFtbGVzcykge1xuXHRcdFx0XHRpZiAoX2lkICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0X3NlbGYuc2xlZXAoKTtcblx0XHRcdFx0fSBlbHNlIGlmIChzZWFtbGVzcykge1xuXHRcdFx0XHRcdF9zdGFydFRpbWUgKz0gLV9sYXN0VXBkYXRlICsgKF9sYXN0VXBkYXRlID0gX2dldFRpbWUoKSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoX3NlbGYuZnJhbWUgPiAxMCkgeyAvL2Rvbid0IHRyaWdnZXIgbGFnU21vb3RoaW5nIGlmIHdlJ3JlIGp1c3Qgd2FraW5nIHVwLCBhbmQgbWFrZSBzdXJlIHRoYXQgYXQgbGVhc3QgMTAgZnJhbWVzIGhhdmUgZWxhcHNlZCBiZWNhdXNlIG9mIHRoZSBpT1MgYnVnIHRoYXQgd2Ugd29yayBhcm91bmQgYmVsb3cgd2l0aCB0aGUgMS41LXNlY29uZCBzZXRUaW1vdXQoKS5cblx0XHRcdFx0XHRfbGFzdFVwZGF0ZSA9IF9nZXRUaW1lKCkgLSBfbGFnVGhyZXNob2xkICsgNTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfcmVxID0gKF9mcHMgPT09IDApID8gX2VtcHR5RnVuYyA6ICghX3VzZVJBRiB8fCAhX3JlcUFuaW1GcmFtZSkgPyBmdW5jdGlvbihmKSB7IHJldHVybiBzZXRUaW1lb3V0KGYsICgoX25leHRUaW1lIC0gX3NlbGYudGltZSkgKiAxMDAwICsgMSkgfCAwKTsgfSA6IF9yZXFBbmltRnJhbWU7XG5cdFx0XHRcdGlmIChfc2VsZiA9PT0gX3RpY2tlcikge1xuXHRcdFx0XHRcdF90aWNrZXJBY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF90aWNrKDIpO1xuXHRcdFx0fTtcblxuXHRcdFx0X3NlbGYuZnBzID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF9mcHM7XG5cdFx0XHRcdH1cblx0XHRcdFx0X2ZwcyA9IHZhbHVlO1xuXHRcdFx0XHRfZ2FwID0gMSAvIChfZnBzIHx8IDYwKTtcblx0XHRcdFx0X25leHRUaW1lID0gdGhpcy50aW1lICsgX2dhcDtcblx0XHRcdFx0X3NlbGYud2FrZSgpO1xuXHRcdFx0fTtcblxuXHRcdFx0X3NlbGYudXNlUkFGID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF91c2VSQUY7XG5cdFx0XHRcdH1cblx0XHRcdFx0X3NlbGYuc2xlZXAoKTtcblx0XHRcdFx0X3VzZVJBRiA9IHZhbHVlO1xuXHRcdFx0XHRfc2VsZi5mcHMoX2Zwcyk7XG5cdFx0XHR9O1xuXHRcdFx0X3NlbGYuZnBzKGZwcyk7XG5cblx0XHRcdC8vYSBidWcgaW4gaU9TIDYgU2FmYXJpIG9jY2FzaW9uYWxseSBwcmV2ZW50cyB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZyb20gd29ya2luZyBpbml0aWFsbHksIHNvIHdlIHVzZSBhIDEuNS1zZWNvbmQgdGltZW91dCB0aGF0IGF1dG9tYXRpY2FsbHkgZmFsbHMgYmFjayB0byBzZXRUaW1lb3V0KCkgaWYgaXQgc2Vuc2VzIHRoaXMgY29uZGl0aW9uLlxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKF91c2VSQUYgPT09IFwiYXV0b1wiICYmIF9zZWxmLmZyYW1lIDwgNSAmJiBfZG9jLnZpc2liaWxpdHlTdGF0ZSAhPT0gXCJoaWRkZW5cIikge1xuXHRcdFx0XHRcdF9zZWxmLnVzZVJBRihmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDE1MDApO1xuXHRcdH0pO1xuXG5cdFx0cCA9IGdzLlRpY2tlci5wcm90b3R5cGUgPSBuZXcgZ3MuZXZlbnRzLkV2ZW50RGlzcGF0Y2hlcigpO1xuXHRcdHAuY29uc3RydWN0b3IgPSBncy5UaWNrZXI7XG5cblxuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEFuaW1hdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cdFx0dmFyIEFuaW1hdGlvbiA9IF9jbGFzcyhcImNvcmUuQW5pbWF0aW9uXCIsIGZ1bmN0aW9uKGR1cmF0aW9uLCB2YXJzKSB7XG5cdFx0XHRcdHRoaXMudmFycyA9IHZhcnMgPSB2YXJzIHx8IHt9O1xuXHRcdFx0XHR0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX3RvdGFsRHVyYXRpb24gPSBkdXJhdGlvbiB8fCAwO1xuXHRcdFx0XHR0aGlzLl9kZWxheSA9IE51bWJlcih2YXJzLmRlbGF5KSB8fCAwO1xuXHRcdFx0XHR0aGlzLl90aW1lU2NhbGUgPSAxO1xuXHRcdFx0XHR0aGlzLl9hY3RpdmUgPSAodmFycy5pbW1lZGlhdGVSZW5kZXIgPT09IHRydWUpO1xuXHRcdFx0XHR0aGlzLmRhdGEgPSB2YXJzLmRhdGE7XG5cdFx0XHRcdHRoaXMuX3JldmVyc2VkID0gKHZhcnMucmV2ZXJzZWQgPT09IHRydWUpO1xuXG5cdFx0XHRcdGlmICghX3Jvb3RUaW1lbGluZSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIV90aWNrZXJBY3RpdmUpIHsgLy9zb21lIGJyb3dzZXJzIChsaWtlIGlPUyA2IFNhZmFyaSkgc2h1dCBkb3duIEphdmFTY3JpcHQgZXhlY3V0aW9uIHdoZW4gdGhlIHRhYiBpcyBkaXNhYmxlZCBhbmQgdGhleSBbb2NjYXNpb25hbGx5XSBuZWdsZWN0IHRvIHN0YXJ0IHVwIHJlcXVlc3RBbmltYXRpb25GcmFtZSBhZ2FpbiB3aGVuIHJldHVybmluZyAtIHRoaXMgY29kZSBlbnN1cmVzIHRoYXQgdGhlIGVuZ2luZSBzdGFydHMgdXAgYWdhaW4gcHJvcGVybHkuXG5cdFx0XHRcdFx0X3RpY2tlci53YWtlKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdGwgPSB0aGlzLnZhcnMudXNlRnJhbWVzID8gX3Jvb3RGcmFtZXNUaW1lbGluZSA6IF9yb290VGltZWxpbmU7XG5cdFx0XHRcdHRsLmFkZCh0aGlzLCB0bC5fdGltZSk7XG5cblx0XHRcdFx0aWYgKHRoaXMudmFycy5wYXVzZWQpIHtcblx0XHRcdFx0XHR0aGlzLnBhdXNlZCh0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRfdGlja2VyID0gQW5pbWF0aW9uLnRpY2tlciA9IG5ldyBncy5UaWNrZXIoKTtcblx0XHRwID0gQW5pbWF0aW9uLnByb3RvdHlwZTtcblx0XHRwLl9kaXJ0eSA9IHAuX2djID0gcC5faW5pdHRlZCA9IHAuX3BhdXNlZCA9IGZhbHNlO1xuXHRcdHAuX3RvdGFsVGltZSA9IHAuX3RpbWUgPSAwO1xuXHRcdHAuX3Jhd1ByZXZUaW1lID0gLTE7XG5cdFx0cC5fbmV4dCA9IHAuX2xhc3QgPSBwLl9vblVwZGF0ZSA9IHAuX3RpbWVsaW5lID0gcC50aW1lbGluZSA9IG51bGw7XG5cdFx0cC5fcGF1c2VkID0gZmFsc2U7XG5cblxuXHRcdC8vc29tZSBicm93c2VycyAobGlrZSBpT1MpIG9jY2FzaW9uYWxseSBkcm9wIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZXZlbnQgd2hlbiB0aGUgdXNlciBzd2l0Y2hlcyB0byBhIGRpZmZlcmVudCB0YWIgYW5kIHRoZW4gY29tZXMgYmFjayBhZ2Fpbiwgc28gd2UgdXNlIGEgMi1zZWNvbmQgc2V0VGltZW91dCgpIHRvIHNlbnNlIGlmL3doZW4gdGhhdCBjb25kaXRpb24gb2NjdXJzIGFuZCB0aGVuIHdha2UoKSB0aGUgdGlja2VyLlxuXHRcdHZhciBfY2hlY2tUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmIChfdGlja2VyQWN0aXZlICYmIF9nZXRUaW1lKCkgLSBfbGFzdFVwZGF0ZSA+IDIwMDAgJiYgKF9kb2MudmlzaWJpbGl0eVN0YXRlICE9PSBcImhpZGRlblwiIHx8ICFfdGlja2VyLmxhZ1Ntb290aGluZygpKSkgeyAvL25vdGU6IGlmIHRoZSB0YWIgaXMgaGlkZGVuLCB3ZSBzaG91bGQgc3RpbGwgd2FrZSBpZiBsYWdTbW9vdGhpbmcgaGFzIGJlZW4gZGlzYWJsZWQuXG5cdFx0XHRcdFx0X3RpY2tlci53YWtlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIHQgPSBzZXRUaW1lb3V0KF9jaGVja1RpbWVvdXQsIDIwMDApO1xuXHRcdFx0XHRpZiAodC51bnJlZikge1xuXHRcdFx0XHRcdC8vIGFsbG93cyBhIG5vZGUgcHJvY2VzcyB0byBleGl0IGV2ZW4gaWYgdGhlIHRpbWVvdXTigJlzIGNhbGxiYWNrIGhhc24ndCBiZWVuIGludm9rZWQuIFdpdGhvdXQgaXQsIHRoZSBub2RlIHByb2Nlc3MgY291bGQgaGFuZyBhcyB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBldmVyeSB0d28gc2Vjb25kcy5cblx0XHRcdFx0XHR0LnVucmVmKCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0X2NoZWNrVGltZW91dCgpO1xuXG5cblx0XHRwLnBsYXkgPSBmdW5jdGlvbihmcm9tLCBzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0aWYgKGZyb20gIT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLnNlZWsoZnJvbSwgc3VwcHJlc3NFdmVudHMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMucmV2ZXJzZWQoZmFsc2UpLnBhdXNlZChmYWxzZSk7XG5cdFx0fTtcblxuXHRcdHAucGF1c2UgPSBmdW5jdGlvbihhdFRpbWUsIHN1cHByZXNzRXZlbnRzKSB7XG5cdFx0XHRpZiAoYXRUaW1lICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5zZWVrKGF0VGltZSwgc3VwcHJlc3NFdmVudHMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMucGF1c2VkKHRydWUpO1xuXHRcdH07XG5cblx0XHRwLnJlc3VtZSA9IGZ1bmN0aW9uKGZyb20sIHN1cHByZXNzRXZlbnRzKSB7XG5cdFx0XHRpZiAoZnJvbSAhPSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuc2Vlayhmcm9tLCBzdXBwcmVzc0V2ZW50cyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5wYXVzZWQoZmFsc2UpO1xuXHRcdH07XG5cblx0XHRwLnNlZWsgPSBmdW5jdGlvbih0aW1lLCBzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0cmV0dXJuIHRoaXMudG90YWxUaW1lKE51bWJlcih0aW1lKSwgc3VwcHJlc3NFdmVudHMgIT09IGZhbHNlKTtcblx0XHR9O1xuXG5cdFx0cC5yZXN0YXJ0ID0gZnVuY3Rpb24oaW5jbHVkZURlbGF5LCBzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0cmV0dXJuIHRoaXMucmV2ZXJzZWQoZmFsc2UpLnBhdXNlZChmYWxzZSkudG90YWxUaW1lKGluY2x1ZGVEZWxheSA/IC10aGlzLl9kZWxheSA6IDAsIChzdXBwcmVzc0V2ZW50cyAhPT0gZmFsc2UpLCB0cnVlKTtcblx0XHR9O1xuXG5cdFx0cC5yZXZlcnNlID0gZnVuY3Rpb24oZnJvbSwgc3VwcHJlc3NFdmVudHMpIHtcblx0XHRcdGlmIChmcm9tICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5zZWVrKChmcm9tIHx8IHRoaXMudG90YWxEdXJhdGlvbigpKSwgc3VwcHJlc3NFdmVudHMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMucmV2ZXJzZWQodHJ1ZSkucGF1c2VkKGZhbHNlKTtcblx0XHR9O1xuXG5cdFx0cC5yZW5kZXIgPSBmdW5jdGlvbih0aW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHtcblx0XHRcdC8vc3R1YiAtIHdlIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIHN1YmNsYXNzZXMuXG5cdFx0fTtcblxuXHRcdHAuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5fdGltZSA9IHRoaXMuX3RvdGFsVGltZSA9IDA7XG5cdFx0XHR0aGlzLl9pbml0dGVkID0gdGhpcy5fZ2MgPSBmYWxzZTtcblx0XHRcdHRoaXMuX3Jhd1ByZXZUaW1lID0gLTE7XG5cdFx0XHRpZiAodGhpcy5fZ2MgfHwgIXRoaXMudGltZWxpbmUpIHtcblx0XHRcdFx0dGhpcy5fZW5hYmxlZCh0cnVlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cblx0XHRwLmlzQWN0aXZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdGwgPSB0aGlzLl90aW1lbGluZSwgLy90aGUgMiByb290IHRpbWVsaW5lcyB3b24ndCBoYXZlIGEgX3RpbWVsaW5lOyB0aGV5J3JlIGFsd2F5cyBhY3RpdmUuXG5cdFx0XHRcdHN0YXJ0VGltZSA9IHRoaXMuX3N0YXJ0VGltZSxcblx0XHRcdFx0cmF3VGltZTtcblx0XHRcdHJldHVybiAoIXRsIHx8ICghdGhpcy5fZ2MgJiYgIXRoaXMuX3BhdXNlZCAmJiB0bC5pc0FjdGl2ZSgpICYmIChyYXdUaW1lID0gdGwucmF3VGltZSh0cnVlKSkgPj0gc3RhcnRUaW1lICYmIHJhd1RpbWUgPCBzdGFydFRpbWUgKyB0aGlzLnRvdGFsRHVyYXRpb24oKSAvIHRoaXMuX3RpbWVTY2FsZSAtIDAuMDAwMDAwMSkpO1xuXHRcdH07XG5cblx0XHRwLl9lbmFibGVkID0gZnVuY3Rpb24gKGVuYWJsZWQsIGlnbm9yZVRpbWVsaW5lKSB7XG5cdFx0XHRpZiAoIV90aWNrZXJBY3RpdmUpIHtcblx0XHRcdFx0X3RpY2tlci53YWtlKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9nYyA9ICFlbmFibGVkO1xuXHRcdFx0dGhpcy5fYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpO1xuXHRcdFx0aWYgKGlnbm9yZVRpbWVsaW5lICE9PSB0cnVlKSB7XG5cdFx0XHRcdGlmIChlbmFibGVkICYmICF0aGlzLnRpbWVsaW5lKSB7XG5cdFx0XHRcdFx0dGhpcy5fdGltZWxpbmUuYWRkKHRoaXMsIHRoaXMuX3N0YXJ0VGltZSAtIHRoaXMuX2RlbGF5KTtcblx0XHRcdFx0fSBlbHNlIGlmICghZW5hYmxlZCAmJiB0aGlzLnRpbWVsaW5lKSB7XG5cdFx0XHRcdFx0dGhpcy5fdGltZWxpbmUuX3JlbW92ZSh0aGlzLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblxuXHRcdHAuX2tpbGwgPSBmdW5jdGlvbih2YXJzLCB0YXJnZXQpIHtcblx0XHRcdHJldHVybiB0aGlzLl9lbmFibGVkKGZhbHNlLCBmYWxzZSk7XG5cdFx0fTtcblxuXHRcdHAua2lsbCA9IGZ1bmN0aW9uKHZhcnMsIHRhcmdldCkge1xuXHRcdFx0dGhpcy5fa2lsbCh2YXJzLCB0YXJnZXQpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdHAuX3VuY2FjaGUgPSBmdW5jdGlvbihpbmNsdWRlU2VsZikge1xuXHRcdFx0dmFyIHR3ZWVuID0gaW5jbHVkZVNlbGYgPyB0aGlzIDogdGhpcy50aW1lbGluZTtcblx0XHRcdHdoaWxlICh0d2Vlbikge1xuXHRcdFx0XHR0d2Vlbi5fZGlydHkgPSB0cnVlO1xuXHRcdFx0XHR0d2VlbiA9IHR3ZWVuLnRpbWVsaW5lO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdHAuX3N3YXBTZWxmSW5QYXJhbXMgPSBmdW5jdGlvbihwYXJhbXMpIHtcblx0XHRcdHZhciBpID0gcGFyYW1zLmxlbmd0aCxcblx0XHRcdFx0Y29weSA9IHBhcmFtcy5jb25jYXQoKTtcblx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRpZiAocGFyYW1zW2ldID09PSBcIntzZWxmfVwiKSB7XG5cdFx0XHRcdFx0Y29weVtpXSA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBjb3B5O1xuXHRcdH07XG5cblx0XHRwLl9jYWxsYmFjayA9IGZ1bmN0aW9uKHR5cGUpIHtcblx0XHRcdHZhciB2ID0gdGhpcy52YXJzLFxuXHRcdFx0XHRjYWxsYmFjayA9IHZbdHlwZV0sXG5cdFx0XHRcdHBhcmFtcyA9IHZbdHlwZSArIFwiUGFyYW1zXCJdLFxuXHRcdFx0XHRzY29wZSA9IHZbdHlwZSArIFwiU2NvcGVcIl0gfHwgdi5jYWxsYmFja1Njb3BlIHx8IHRoaXMsXG5cdFx0XHRcdGwgPSBwYXJhbXMgPyBwYXJhbXMubGVuZ3RoIDogMDtcblx0XHRcdHN3aXRjaCAobCkgeyAvL3NwZWVkIG9wdGltaXphdGlvbjsgY2FsbCgpIGlzIGZhc3RlciB0aGFuIGFwcGx5KCkgc28gdXNlIGl0IHdoZW4gdGhlcmUgYXJlIG9ubHkgYSBmZXcgcGFyYW1ldGVycyAod2hpY2ggaXMgYnkgZmFyIG1vc3QgY29tbW9uKS4gUHJldmlvdXNseSB3ZSBzaW1wbHkgZGlkIHZhciB2ID0gdGhpcy52YXJzOyB2W3R5cGVdLmFwcGx5KHZbdHlwZSArIFwiU2NvcGVcIl0gfHwgdi5jYWxsYmFja1Njb3BlIHx8IHRoaXMsIHZbdHlwZSArIFwiUGFyYW1zXCJdIHx8IF9ibGFua0FycmF5KTtcblx0XHRcdFx0Y2FzZSAwOiBjYWxsYmFjay5jYWxsKHNjb3BlKTsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgMTogY2FsbGJhY2suY2FsbChzY29wZSwgcGFyYW1zWzBdKTsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgMjogY2FsbGJhY2suY2FsbChzY29wZSwgcGFyYW1zWzBdLCBwYXJhbXNbMV0pOyBicmVhaztcblx0XHRcdFx0ZGVmYXVsdDogY2FsbGJhY2suYXBwbHkoc2NvcGUsIHBhcmFtcyk7XG5cdFx0XHR9XG5cdFx0fTtcblxuLy8tLS0tQW5pbWF0aW9uIGdldHRlcnMvc2V0dGVycyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0cC5ldmVudENhbGxiYWNrID0gZnVuY3Rpb24odHlwZSwgY2FsbGJhY2ssIHBhcmFtcywgc2NvcGUpIHtcblx0XHRcdGlmICgodHlwZSB8fCBcIlwiKS5zdWJzdHIoMCwyKSA9PT0gXCJvblwiKSB7XG5cdFx0XHRcdHZhciB2ID0gdGhpcy52YXJzO1xuXHRcdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHJldHVybiB2W3R5cGVdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjYWxsYmFjayA9PSBudWxsKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIHZbdHlwZV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dlt0eXBlXSA9IGNhbGxiYWNrO1xuXHRcdFx0XHRcdHZbdHlwZSArIFwiUGFyYW1zXCJdID0gKF9pc0FycmF5KHBhcmFtcykgJiYgcGFyYW1zLmpvaW4oXCJcIikuaW5kZXhPZihcIntzZWxmfVwiKSAhPT0gLTEpID8gdGhpcy5fc3dhcFNlbGZJblBhcmFtcyhwYXJhbXMpIDogcGFyYW1zO1xuXHRcdFx0XHRcdHZbdHlwZSArIFwiU2NvcGVcIl0gPSBzY29wZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodHlwZSA9PT0gXCJvblVwZGF0ZVwiKSB7XG5cdFx0XHRcdFx0dGhpcy5fb25VcGRhdGUgPSBjYWxsYmFjaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdHAuZGVsYXkgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9kZWxheTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLl90aW1lbGluZS5zbW9vdGhDaGlsZFRpbWluZykge1xuXHRcdFx0XHR0aGlzLnN0YXJ0VGltZSggdGhpcy5fc3RhcnRUaW1lICsgdmFsdWUgLSB0aGlzLl9kZWxheSApO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fZGVsYXkgPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cblx0XHRwLmR1cmF0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLl9kaXJ0eSA9IGZhbHNlO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZHVyYXRpb247XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX3RvdGFsRHVyYXRpb24gPSB2YWx1ZTtcblx0XHRcdHRoaXMuX3VuY2FjaGUodHJ1ZSk7IC8vdHJ1ZSBpbiBjYXNlIGl0J3MgYSBUd2Vlbk1heCBvciBUaW1lbGluZU1heCB0aGF0IGhhcyBhIHJlcGVhdCAtIHdlJ2xsIG5lZWQgdG8gcmVmcmVzaCB0aGUgdG90YWxEdXJhdGlvbi5cblx0XHRcdGlmICh0aGlzLl90aW1lbGluZS5zbW9vdGhDaGlsZFRpbWluZykgaWYgKHRoaXMuX3RpbWUgPiAwKSBpZiAodGhpcy5fdGltZSA8IHRoaXMuX2R1cmF0aW9uKSBpZiAodmFsdWUgIT09IDApIHtcblx0XHRcdFx0dGhpcy50b3RhbFRpbWUodGhpcy5fdG90YWxUaW1lICogKHZhbHVlIC8gdGhpcy5fZHVyYXRpb24pLCB0cnVlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cblx0XHRwLnRvdGFsRHVyYXRpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0dGhpcy5fZGlydHkgPSBmYWxzZTtcblx0XHRcdHJldHVybiAoIWFyZ3VtZW50cy5sZW5ndGgpID8gdGhpcy5fdG90YWxEdXJhdGlvbiA6IHRoaXMuZHVyYXRpb24odmFsdWUpO1xuXHRcdH07XG5cblx0XHRwLnRpbWUgPSBmdW5jdGlvbih2YWx1ZSwgc3VwcHJlc3NFdmVudHMpIHtcblx0XHRcdGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fdGltZTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLl9kaXJ0eSkge1xuXHRcdFx0XHR0aGlzLnRvdGFsRHVyYXRpb24oKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLnRvdGFsVGltZSgodmFsdWUgPiB0aGlzLl9kdXJhdGlvbikgPyB0aGlzLl9kdXJhdGlvbiA6IHZhbHVlLCBzdXBwcmVzc0V2ZW50cyk7XG5cdFx0fTtcblxuXHRcdHAudG90YWxUaW1lID0gZnVuY3Rpb24odGltZSwgc3VwcHJlc3NFdmVudHMsIHVuY2FwcGVkKSB7XG5cdFx0XHRpZiAoIV90aWNrZXJBY3RpdmUpIHtcblx0XHRcdFx0X3RpY2tlci53YWtlKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3RvdGFsVGltZTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLl90aW1lbGluZSkge1xuXHRcdFx0XHRpZiAodGltZSA8IDAgJiYgIXVuY2FwcGVkKSB7XG5cdFx0XHRcdFx0dGltZSArPSB0aGlzLnRvdGFsRHVyYXRpb24oKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5fdGltZWxpbmUuc21vb3RoQ2hpbGRUaW1pbmcpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5fZGlydHkpIHtcblx0XHRcdFx0XHRcdHRoaXMudG90YWxEdXJhdGlvbigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgdG90YWxEdXJhdGlvbiA9IHRoaXMuX3RvdGFsRHVyYXRpb24sXG5cdFx0XHRcdFx0XHR0bCA9IHRoaXMuX3RpbWVsaW5lO1xuXHRcdFx0XHRcdGlmICh0aW1lID4gdG90YWxEdXJhdGlvbiAmJiAhdW5jYXBwZWQpIHtcblx0XHRcdFx0XHRcdHRpbWUgPSB0b3RhbER1cmF0aW9uO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgPSAodGhpcy5fcGF1c2VkID8gdGhpcy5fcGF1c2VUaW1lIDogdGwuX3RpbWUpIC0gKCghdGhpcy5fcmV2ZXJzZWQgPyB0aW1lIDogdG90YWxEdXJhdGlvbiAtIHRpbWUpIC8gdGhpcy5fdGltZVNjYWxlKTtcblx0XHRcdFx0XHRpZiAoIXRsLl9kaXJ0eSkgeyAvL2ZvciBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudC4gSWYgdGhlIHBhcmVudCdzIGNhY2hlIGlzIGFscmVhZHkgZGlydHksIGl0IGFscmVhZHkgdG9vayBjYXJlIG9mIG1hcmtpbmcgdGhlIGFuY2VzdG9ycyBhcyBkaXJ0eSB0b28sIHNvIHNraXAgdGhlIGZ1bmN0aW9uIGNhbGwgaGVyZS5cblx0XHRcdFx0XHRcdHRoaXMuX3VuY2FjaGUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvL2luIGNhc2UgYW55IG9mIHRoZSBhbmNlc3RvciB0aW1lbGluZXMgaGFkIGNvbXBsZXRlZCBidXQgc2hvdWxkIG5vdyBiZSBlbmFibGVkLCB3ZSBzaG91bGQgcmVzZXQgdGhlaXIgdG90YWxUaW1lKCkgd2hpY2ggd2lsbCBhbHNvIGVuc3VyZSB0aGF0IHRoZXkncmUgbGluZWQgdXAgcHJvcGVybHkgYW5kIGVuYWJsZWQuIFNraXAgZm9yIGFuaW1hdGlvbnMgdGhhdCBhcmUgb24gdGhlIHJvb3QgKHdhc3RlZnVsKS4gRXhhbXBsZTogYSBUaW1lbGluZUxpdGUuZXhwb3J0Um9vdCgpIGlzIHBlcmZvcm1lZCB3aGVuIHRoZXJlJ3MgYSBwYXVzZWQgdHdlZW4gb24gdGhlIHJvb3QsIHRoZSBleHBvcnQgd2lsbCBub3QgY29tcGxldGUgdW50aWwgdGhhdCB0d2VlbiBpcyB1bnBhdXNlZCwgYnV0IGltYWdpbmUgYSBjaGlsZCBnZXRzIHJlc3RhcnRlZCBsYXRlciwgYWZ0ZXIgYWxsIFt1bnBhdXNlZF0gdHdlZW5zIGhhdmUgY29tcGxldGVkLiBUaGUgc3RhcnRUaW1lIG9mIHRoYXQgY2hpbGQgd291bGQgZ2V0IHB1c2hlZCBvdXQsIGJ1dCBvbmUgb2YgdGhlIGFuY2VzdG9ycyBtYXkgaGF2ZSBjb21wbGV0ZWQuXG5cdFx0XHRcdFx0aWYgKHRsLl90aW1lbGluZSkge1xuXHRcdFx0XHRcdFx0d2hpbGUgKHRsLl90aW1lbGluZSkge1xuXHRcdFx0XHRcdFx0XHRpZiAodGwuX3RpbWVsaW5lLl90aW1lICE9PSAodGwuX3N0YXJ0VGltZSArIHRsLl90b3RhbFRpbWUpIC8gdGwuX3RpbWVTY2FsZSkge1xuXHRcdFx0XHRcdFx0XHRcdHRsLnRvdGFsVGltZSh0bC5fdG90YWxUaW1lLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0bCA9IHRsLl90aW1lbGluZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMuX2djKSB7XG5cdFx0XHRcdFx0dGhpcy5fZW5hYmxlZCh0cnVlLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMuX3RvdGFsVGltZSAhPT0gdGltZSB8fCB0aGlzLl9kdXJhdGlvbiA9PT0gMCkge1xuXHRcdFx0XHRcdGlmIChfbGF6eVR3ZWVucy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdF9sYXp5UmVuZGVyKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMucmVuZGVyKHRpbWUsIHN1cHByZXNzRXZlbnRzLCBmYWxzZSk7XG5cdFx0XHRcdFx0aWYgKF9sYXp5VHdlZW5zLmxlbmd0aCkgeyAvL2luIGNhc2UgcmVuZGVyaW5nIGNhdXNlZCBhbnkgdHdlZW5zIHRvIGxhenktaW5pdCwgd2Ugc2hvdWxkIHJlbmRlciB0aGVtIGJlY2F1c2UgdHlwaWNhbGx5IHdoZW4gc29tZW9uZSBjYWxscyBzZWVrKCkgb3IgdGltZSgpIG9yIHByb2dyZXNzKCksIHRoZXkgZXhwZWN0IGFuIGltbWVkaWF0ZSByZW5kZXIuXG5cdFx0XHRcdFx0XHRfbGF6eVJlbmRlcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdHAucHJvZ3Jlc3MgPSBwLnRvdGFsUHJvZ3Jlc3MgPSBmdW5jdGlvbih2YWx1ZSwgc3VwcHJlc3NFdmVudHMpIHtcblx0XHRcdHZhciBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb24oKTtcblx0XHRcdHJldHVybiAoIWFyZ3VtZW50cy5sZW5ndGgpID8gKGR1cmF0aW9uID8gdGhpcy5fdGltZSAvIGR1cmF0aW9uIDogdGhpcy5yYXRpbykgOiB0aGlzLnRvdGFsVGltZShkdXJhdGlvbiAqIHZhbHVlLCBzdXBwcmVzc0V2ZW50cyk7XG5cdFx0fTtcblxuXHRcdHAuc3RhcnRUaW1lID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc3RhcnRUaW1lO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHZhbHVlICE9PSB0aGlzLl9zdGFydFRpbWUpIHtcblx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0aGlzLnRpbWVsaW5lKSBpZiAodGhpcy50aW1lbGluZS5fc29ydENoaWxkcmVuKSB7XG5cdFx0XHRcdFx0dGhpcy50aW1lbGluZS5hZGQodGhpcywgdmFsdWUgLSB0aGlzLl9kZWxheSk7IC8vZW5zdXJlcyB0aGF0IGFueSBuZWNlc3NhcnkgcmUtc2VxdWVuY2luZyBvZiBBbmltYXRpb25zIGluIHRoZSB0aW1lbGluZSBvY2N1cnMgdG8gbWFrZSBzdXJlIHRoZSByZW5kZXJpbmcgb3JkZXIgaXMgY29ycmVjdC5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdHAuZW5kVGltZSA9IGZ1bmN0aW9uKGluY2x1ZGVSZXBlYXRzKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fc3RhcnRUaW1lICsgKChpbmNsdWRlUmVwZWF0cyAhPSBmYWxzZSkgPyB0aGlzLnRvdGFsRHVyYXRpb24oKSA6IHRoaXMuZHVyYXRpb24oKSkgLyB0aGlzLl90aW1lU2NhbGU7XG5cdFx0fTtcblxuXHRcdHAudGltZVNjYWxlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fdGltZVNjYWxlO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHBhdXNlVGltZSwgdDtcblx0XHRcdHZhbHVlID0gdmFsdWUgfHwgX3RpbnlOdW07IC8vY2FuJ3QgYWxsb3cgemVybyBiZWNhdXNlIGl0J2xsIHRocm93IHRoZSBtYXRoIG9mZlxuXHRcdFx0aWYgKHRoaXMuX3RpbWVsaW5lICYmIHRoaXMuX3RpbWVsaW5lLnNtb290aENoaWxkVGltaW5nKSB7XG5cdFx0XHRcdHBhdXNlVGltZSA9IHRoaXMuX3BhdXNlVGltZTtcblx0XHRcdFx0dCA9IChwYXVzZVRpbWUgfHwgcGF1c2VUaW1lID09PSAwKSA/IHBhdXNlVGltZSA6IHRoaXMuX3RpbWVsaW5lLnRvdGFsVGltZSgpO1xuXHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgPSB0IC0gKCh0IC0gdGhpcy5fc3RhcnRUaW1lKSAqIHRoaXMuX3RpbWVTY2FsZSAvIHZhbHVlKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3RpbWVTY2FsZSA9IHZhbHVlO1xuXHRcdFx0dCA9IHRoaXMudGltZWxpbmU7XG5cdFx0XHR3aGlsZSAodCAmJiB0LnRpbWVsaW5lKSB7IC8vbXVzdCB1cGRhdGUgdGhlIGR1cmF0aW9uL3RvdGFsRHVyYXRpb24gb2YgYWxsIGFuY2VzdG9yIHRpbWVsaW5lcyBpbW1lZGlhdGVseSBpbiBjYXNlIGluIHRoZSBtaWRkbGUgb2YgYSByZW5kZXIgbG9vcCwgb25lIHR3ZWVuIGFsdGVycyBhbm90aGVyIHR3ZWVuJ3MgdGltZVNjYWxlIHdoaWNoIHNob3ZlcyBpdHMgc3RhcnRUaW1lIGJlZm9yZSAwLCBmb3JjaW5nIHRoZSBwYXJlbnQgdGltZWxpbmUgdG8gc2hpZnQgYXJvdW5kIGFuZCBzaGlmdENoaWxkcmVuKCkgd2hpY2ggY291bGQgYWZmZWN0IHRoYXQgbmV4dCB0d2VlbidzIHJlbmRlciAoc3RhcnRUaW1lKS4gRG9lc24ndCBtYXR0ZXIgZm9yIHRoZSByb290IHRpbWVsaW5lIHRob3VnaC5cblx0XHRcdFx0dC5fZGlydHkgPSB0cnVlO1xuXHRcdFx0XHR0LnRvdGFsRHVyYXRpb24oKTtcblx0XHRcdFx0dCA9IHQudGltZWxpbmU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0cC5yZXZlcnNlZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3JldmVyc2VkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHZhbHVlICE9IHRoaXMuX3JldmVyc2VkKSB7XG5cdFx0XHRcdHRoaXMuX3JldmVyc2VkID0gdmFsdWU7XG5cdFx0XHRcdHRoaXMudG90YWxUaW1lKCgodGhpcy5fdGltZWxpbmUgJiYgIXRoaXMuX3RpbWVsaW5lLnNtb290aENoaWxkVGltaW5nKSA/IHRoaXMudG90YWxEdXJhdGlvbigpIC0gdGhpcy5fdG90YWxUaW1lIDogdGhpcy5fdG90YWxUaW1lKSwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0cC5wYXVzZWQgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9wYXVzZWQ7XG5cdFx0XHR9XG5cdFx0XHR2YXIgdGwgPSB0aGlzLl90aW1lbGluZSxcblx0XHRcdFx0cmF3LCBlbGFwc2VkO1xuXHRcdFx0aWYgKHZhbHVlICE9IHRoaXMuX3BhdXNlZCkgaWYgKHRsKSB7XG5cdFx0XHRcdGlmICghX3RpY2tlckFjdGl2ZSAmJiAhdmFsdWUpIHtcblx0XHRcdFx0XHRfdGlja2VyLndha2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyYXcgPSB0bC5yYXdUaW1lKCk7XG5cdFx0XHRcdGVsYXBzZWQgPSByYXcgLSB0aGlzLl9wYXVzZVRpbWU7XG5cdFx0XHRcdGlmICghdmFsdWUgJiYgdGwuc21vb3RoQ2hpbGRUaW1pbmcpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgKz0gZWxhcHNlZDtcblx0XHRcdFx0XHR0aGlzLl91bmNhY2hlKGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9wYXVzZVRpbWUgPSB2YWx1ZSA/IHJhdyA6IG51bGw7XG5cdFx0XHRcdHRoaXMuX3BhdXNlZCA9IHZhbHVlO1xuXHRcdFx0XHR0aGlzLl9hY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XG5cdFx0XHRcdGlmICghdmFsdWUgJiYgZWxhcHNlZCAhPT0gMCAmJiB0aGlzLl9pbml0dGVkICYmIHRoaXMuZHVyYXRpb24oKSkge1xuXHRcdFx0XHRcdHJhdyA9IHRsLnNtb290aENoaWxkVGltaW5nID8gdGhpcy5fdG90YWxUaW1lIDogKHJhdyAtIHRoaXMuX3N0YXJ0VGltZSkgLyB0aGlzLl90aW1lU2NhbGU7XG5cdFx0XHRcdFx0dGhpcy5yZW5kZXIocmF3LCAocmF3ID09PSB0aGlzLl90b3RhbFRpbWUpLCB0cnVlKTsgLy9pbiBjYXNlIHRoZSB0YXJnZXQncyBwcm9wZXJ0aWVzIGNoYW5nZWQgdmlhIHNvbWUgb3RoZXIgdHdlZW4gb3IgbWFudWFsIHVwZGF0ZSBieSB0aGUgdXNlciwgd2Ugc2hvdWxkIGZvcmNlIGEgcmVuZGVyLlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5fZ2MgJiYgIXZhbHVlKSB7XG5cdFx0XHRcdHRoaXMuX2VuYWJsZWQodHJ1ZSwgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogU2ltcGxlVGltZWxpbmVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXHRcdHZhciBTaW1wbGVUaW1lbGluZSA9IF9jbGFzcyhcImNvcmUuU2ltcGxlVGltZWxpbmVcIiwgZnVuY3Rpb24odmFycykge1xuXHRcdFx0QW5pbWF0aW9uLmNhbGwodGhpcywgMCwgdmFycyk7XG5cdFx0XHR0aGlzLmF1dG9SZW1vdmVDaGlsZHJlbiA9IHRoaXMuc21vb3RoQ2hpbGRUaW1pbmcgPSB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0cCA9IFNpbXBsZVRpbWVsaW5lLnByb3RvdHlwZSA9IG5ldyBBbmltYXRpb24oKTtcblx0XHRwLmNvbnN0cnVjdG9yID0gU2ltcGxlVGltZWxpbmU7XG5cdFx0cC5raWxsKCkuX2djID0gZmFsc2U7XG5cdFx0cC5fZmlyc3QgPSBwLl9sYXN0ID0gcC5fcmVjZW50ID0gbnVsbDtcblx0XHRwLl9zb3J0Q2hpbGRyZW4gPSBmYWxzZTtcblxuXHRcdHAuYWRkID0gcC5pbnNlcnQgPSBmdW5jdGlvbihjaGlsZCwgcG9zaXRpb24sIGFsaWduLCBzdGFnZ2VyKSB7XG5cdFx0XHR2YXIgcHJldlR3ZWVuLCBzdDtcblx0XHRcdGNoaWxkLl9zdGFydFRpbWUgPSBOdW1iZXIocG9zaXRpb24gfHwgMCkgKyBjaGlsZC5fZGVsYXk7XG5cdFx0XHRpZiAoY2hpbGQuX3BhdXNlZCkgaWYgKHRoaXMgIT09IGNoaWxkLl90aW1lbGluZSkgeyAvL3dlIG9ubHkgYWRqdXN0IHRoZSBfcGF1c2VUaW1lIGlmIGl0IHdhc24ndCBpbiB0aGlzIHRpbWVsaW5lIGFscmVhZHkuIFJlbWVtYmVyLCBzb21ldGltZXMgYSB0d2VlbiB3aWxsIGJlIGluc2VydGVkIGFnYWluIGludG8gdGhlIHNhbWUgdGltZWxpbmUgd2hlbiBpdHMgc3RhcnRUaW1lIGlzIGNoYW5nZWQgc28gdGhhdCB0aGUgdHdlZW5zIGluIHRoZSBUaW1lbGluZUxpdGUvTWF4IGFyZSByZS1vcmRlcmVkIHByb3Blcmx5IGluIHRoZSBsaW5rZWQgbGlzdCAoc28gZXZlcnl0aGluZyByZW5kZXJzIGluIHRoZSBwcm9wZXIgb3JkZXIpLlxuXHRcdFx0XHRjaGlsZC5fcGF1c2VUaW1lID0gY2hpbGQuX3N0YXJ0VGltZSArICgodGhpcy5yYXdUaW1lKCkgLSBjaGlsZC5fc3RhcnRUaW1lKSAvIGNoaWxkLl90aW1lU2NhbGUpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGNoaWxkLnRpbWVsaW5lKSB7XG5cdFx0XHRcdGNoaWxkLnRpbWVsaW5lLl9yZW1vdmUoY2hpbGQsIHRydWUpOyAvL3JlbW92ZXMgZnJvbSBleGlzdGluZyB0aW1lbGluZSBzbyB0aGF0IGl0IGNhbiBiZSBwcm9wZXJseSBhZGRlZCB0byB0aGlzIG9uZS5cblx0XHRcdH1cblx0XHRcdGNoaWxkLnRpbWVsaW5lID0gY2hpbGQuX3RpbWVsaW5lID0gdGhpcztcblx0XHRcdGlmIChjaGlsZC5fZ2MpIHtcblx0XHRcdFx0Y2hpbGQuX2VuYWJsZWQodHJ1ZSwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRwcmV2VHdlZW4gPSB0aGlzLl9sYXN0O1xuXHRcdFx0aWYgKHRoaXMuX3NvcnRDaGlsZHJlbikge1xuXHRcdFx0XHRzdCA9IGNoaWxkLl9zdGFydFRpbWU7XG5cdFx0XHRcdHdoaWxlIChwcmV2VHdlZW4gJiYgcHJldlR3ZWVuLl9zdGFydFRpbWUgPiBzdCkge1xuXHRcdFx0XHRcdHByZXZUd2VlbiA9IHByZXZUd2Vlbi5fcHJldjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHByZXZUd2Vlbikge1xuXHRcdFx0XHRjaGlsZC5fbmV4dCA9IHByZXZUd2Vlbi5fbmV4dDtcblx0XHRcdFx0cHJldlR3ZWVuLl9uZXh0ID0gY2hpbGQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjaGlsZC5fbmV4dCA9IHRoaXMuX2ZpcnN0O1xuXHRcdFx0XHR0aGlzLl9maXJzdCA9IGNoaWxkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGNoaWxkLl9uZXh0KSB7XG5cdFx0XHRcdGNoaWxkLl9uZXh0Ll9wcmV2ID0gY2hpbGQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9sYXN0ID0gY2hpbGQ7XG5cdFx0XHR9XG5cdFx0XHRjaGlsZC5fcHJldiA9IHByZXZUd2Vlbjtcblx0XHRcdHRoaXMuX3JlY2VudCA9IGNoaWxkO1xuXHRcdFx0aWYgKHRoaXMuX3RpbWVsaW5lKSB7XG5cdFx0XHRcdHRoaXMuX3VuY2FjaGUodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0cC5fcmVtb3ZlID0gZnVuY3Rpb24odHdlZW4sIHNraXBEaXNhYmxlKSB7XG5cdFx0XHRpZiAodHdlZW4udGltZWxpbmUgPT09IHRoaXMpIHtcblx0XHRcdFx0aWYgKCFza2lwRGlzYWJsZSkge1xuXHRcdFx0XHRcdHR3ZWVuLl9lbmFibGVkKGZhbHNlLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0d2Vlbi5fcHJldikge1xuXHRcdFx0XHRcdHR3ZWVuLl9wcmV2Ll9uZXh0ID0gdHdlZW4uX25leHQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5fZmlyc3QgPT09IHR3ZWVuKSB7XG5cdFx0XHRcdFx0dGhpcy5fZmlyc3QgPSB0d2Vlbi5fbmV4dDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodHdlZW4uX25leHQpIHtcblx0XHRcdFx0XHR0d2Vlbi5fbmV4dC5fcHJldiA9IHR3ZWVuLl9wcmV2O1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2xhc3QgPT09IHR3ZWVuKSB7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdCA9IHR3ZWVuLl9wcmV2O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHR3ZWVuLl9uZXh0ID0gdHdlZW4uX3ByZXYgPSB0d2Vlbi50aW1lbGluZSA9IG51bGw7XG5cdFx0XHRcdGlmICh0d2VlbiA9PT0gdGhpcy5fcmVjZW50KSB7XG5cdFx0XHRcdFx0dGhpcy5fcmVjZW50ID0gdGhpcy5fbGFzdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl90aW1lbGluZSkge1xuXHRcdFx0XHRcdHRoaXMuX3VuY2FjaGUodHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cblx0XHRwLnJlbmRlciA9IGZ1bmN0aW9uKHRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSkge1xuXHRcdFx0dmFyIHR3ZWVuID0gdGhpcy5fZmlyc3QsXG5cdFx0XHRcdG5leHQ7XG5cdFx0XHR0aGlzLl90b3RhbFRpbWUgPSB0aGlzLl90aW1lID0gdGhpcy5fcmF3UHJldlRpbWUgPSB0aW1lO1xuXHRcdFx0d2hpbGUgKHR3ZWVuKSB7XG5cdFx0XHRcdG5leHQgPSB0d2Vlbi5fbmV4dDsgLy9yZWNvcmQgaXQgaGVyZSBiZWNhdXNlIHRoZSB2YWx1ZSBjb3VsZCBjaGFuZ2UgYWZ0ZXIgcmVuZGVyaW5nLi4uXG5cdFx0XHRcdGlmICh0d2Vlbi5fYWN0aXZlIHx8ICh0aW1lID49IHR3ZWVuLl9zdGFydFRpbWUgJiYgIXR3ZWVuLl9wYXVzZWQgJiYgIXR3ZWVuLl9nYykpIHtcblx0XHRcdFx0XHRpZiAoIXR3ZWVuLl9yZXZlcnNlZCkge1xuXHRcdFx0XHRcdFx0dHdlZW4ucmVuZGVyKCh0aW1lIC0gdHdlZW4uX3N0YXJ0VGltZSkgKiB0d2Vlbi5fdGltZVNjYWxlLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0d2Vlbi5yZW5kZXIoKCghdHdlZW4uX2RpcnR5KSA/IHR3ZWVuLl90b3RhbER1cmF0aW9uIDogdHdlZW4udG90YWxEdXJhdGlvbigpKSAtICgodGltZSAtIHR3ZWVuLl9zdGFydFRpbWUpICogdHdlZW4uX3RpbWVTY2FsZSksIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHR3ZWVuID0gbmV4dDtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cC5yYXdUaW1lID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIV90aWNrZXJBY3RpdmUpIHtcblx0XHRcdFx0X3RpY2tlci53YWtlKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5fdG90YWxUaW1lO1xuXHRcdH07XG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUd2VlbkxpdGVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXHRcdHZhciBUd2VlbkxpdGUgPSBfY2xhc3MoXCJUd2VlbkxpdGVcIiwgZnVuY3Rpb24odGFyZ2V0LCBkdXJhdGlvbiwgdmFycykge1xuXHRcdFx0XHRBbmltYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbiwgdmFycyk7XG5cdFx0XHRcdHRoaXMucmVuZGVyID0gVHdlZW5MaXRlLnByb3RvdHlwZS5yZW5kZXI7IC8vc3BlZWQgb3B0aW1pemF0aW9uIChhdm9pZCBwcm90b3R5cGUgbG9va3VwIG9uIHRoaXMgXCJob3RcIiBtZXRob2QpXG5cblx0XHRcdFx0aWYgKHRhcmdldCA9PSBudWxsKSB7XG5cdFx0XHRcdFx0dGhyb3cgXCJDYW5ub3QgdHdlZW4gYSBudWxsIHRhcmdldC5cIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMudGFyZ2V0ID0gdGFyZ2V0ID0gKHR5cGVvZih0YXJnZXQpICE9PSBcInN0cmluZ1wiKSA/IHRhcmdldCA6IFR3ZWVuTGl0ZS5zZWxlY3Rvcih0YXJnZXQpIHx8IHRhcmdldDtcblxuXHRcdFx0XHR2YXIgaXNTZWxlY3RvciA9ICh0YXJnZXQuanF1ZXJ5IHx8ICh0YXJnZXQubGVuZ3RoICYmIHRhcmdldCAhPT0gd2luZG93ICYmIHRhcmdldFswXSAmJiAodGFyZ2V0WzBdID09PSB3aW5kb3cgfHwgKHRhcmdldFswXS5ub2RlVHlwZSAmJiB0YXJnZXRbMF0uc3R5bGUgJiYgIXRhcmdldC5ub2RlVHlwZSkpKSksXG5cdFx0XHRcdFx0b3ZlcndyaXRlID0gdGhpcy52YXJzLm92ZXJ3cml0ZSxcblx0XHRcdFx0XHRpLCB0YXJnLCB0YXJnZXRzO1xuXG5cdFx0XHRcdHRoaXMuX292ZXJ3cml0ZSA9IG92ZXJ3cml0ZSA9IChvdmVyd3JpdGUgPT0gbnVsbCkgPyBfb3ZlcndyaXRlTG9va3VwW1R3ZWVuTGl0ZS5kZWZhdWx0T3ZlcndyaXRlXSA6ICh0eXBlb2Yob3ZlcndyaXRlKSA9PT0gXCJudW1iZXJcIikgPyBvdmVyd3JpdGUgPj4gMCA6IF9vdmVyd3JpdGVMb29rdXBbb3ZlcndyaXRlXTtcblxuXHRcdFx0XHRpZiAoKGlzU2VsZWN0b3IgfHwgdGFyZ2V0IGluc3RhbmNlb2YgQXJyYXkgfHwgKHRhcmdldC5wdXNoICYmIF9pc0FycmF5KHRhcmdldCkpKSAmJiB0eXBlb2YodGFyZ2V0WzBdKSAhPT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHRcdHRoaXMuX3RhcmdldHMgPSB0YXJnZXRzID0gX3NsaWNlKHRhcmdldCk7ICAvL2Rvbid0IHVzZSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0YXJnZXQsIDApIGJlY2F1c2UgdGhhdCBkb2Vzbid0IHdvcmsgaW4gSUU4IHdpdGggYSBOb2RlTGlzdCB0aGF0J3MgcmV0dXJuZWQgYnkgcXVlcnlTZWxlY3RvckFsbCgpXG5cdFx0XHRcdFx0dGhpcy5fcHJvcExvb2t1cCA9IFtdO1xuXHRcdFx0XHRcdHRoaXMuX3NpYmxpbmdzID0gW107XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHRhcmcgPSB0YXJnZXRzW2ldO1xuXHRcdFx0XHRcdFx0aWYgKCF0YXJnKSB7XG5cdFx0XHRcdFx0XHRcdHRhcmdldHMuc3BsaWNlKGktLSwgMSk7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YodGFyZykgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRcdFx0dGFyZyA9IHRhcmdldHNbaS0tXSA9IFR3ZWVuTGl0ZS5zZWxlY3Rvcih0YXJnKTsgLy9pbiBjYXNlIGl0J3MgYW4gYXJyYXkgb2Ygc3RyaW5nc1xuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mKHRhcmcpID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGFyZ2V0cy5zcGxpY2UoaSsxLCAxKTsgLy90byBhdm9pZCBhbiBlbmRsZXNzIGxvb3AgKGNhbid0IGltYWdpbmUgd2h5IHRoZSBzZWxlY3RvciB3b3VsZCByZXR1cm4gYSBzdHJpbmcsIGJ1dCBqdXN0IGluIGNhc2UpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHRhcmcubGVuZ3RoICYmIHRhcmcgIT09IHdpbmRvdyAmJiB0YXJnWzBdICYmICh0YXJnWzBdID09PSB3aW5kb3cgfHwgKHRhcmdbMF0ubm9kZVR5cGUgJiYgdGFyZ1swXS5zdHlsZSAmJiAhdGFyZy5ub2RlVHlwZSkpKSB7IC8vaW4gY2FzZSB0aGUgdXNlciBpcyBwYXNzaW5nIGluIGFuIGFycmF5IG9mIHNlbGVjdG9yIG9iamVjdHMgKGxpa2UgalF1ZXJ5IG9iamVjdHMpLCB3ZSBuZWVkIHRvIGNoZWNrIG9uZSBtb3JlIGxldmVsIGFuZCBwdWxsIHRoaW5ncyBvdXQgaWYgbmVjZXNzYXJ5LiBBbHNvIG5vdGUgdGhhdCA8c2VsZWN0PiBlbGVtZW50cyBwYXNzIGFsbCB0aGUgY3JpdGVyaWEgcmVnYXJkaW5nIGxlbmd0aCBhbmQgdGhlIGZpcnN0IGNoaWxkIGhhdmluZyBzdHlsZSwgc28gd2UgbXVzdCBhbHNvIGNoZWNrIHRvIGVuc3VyZSB0aGUgdGFyZ2V0IGlzbid0IGFuIEhUTUwgbm9kZSBpdHNlbGYuXG5cdFx0XHRcdFx0XHRcdHRhcmdldHMuc3BsaWNlKGktLSwgMSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3RhcmdldHMgPSB0YXJnZXRzID0gdGFyZ2V0cy5jb25jYXQoX3NsaWNlKHRhcmcpKTtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aGlzLl9zaWJsaW5nc1tpXSA9IF9yZWdpc3Rlcih0YXJnLCB0aGlzLCBmYWxzZSk7XG5cdFx0XHRcdFx0XHRpZiAob3ZlcndyaXRlID09PSAxKSBpZiAodGhpcy5fc2libGluZ3NbaV0ubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdFx0XHRfYXBwbHlPdmVyd3JpdGUodGFyZywgdGhpcywgbnVsbCwgMSwgdGhpcy5fc2libGluZ3NbaV0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX3Byb3BMb29rdXAgPSB7fTtcblx0XHRcdFx0XHR0aGlzLl9zaWJsaW5ncyA9IF9yZWdpc3Rlcih0YXJnZXQsIHRoaXMsIGZhbHNlKTtcblx0XHRcdFx0XHRpZiAob3ZlcndyaXRlID09PSAxKSBpZiAodGhpcy5fc2libGluZ3MubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdFx0X2FwcGx5T3ZlcndyaXRlKHRhcmdldCwgdGhpcywgbnVsbCwgMSwgdGhpcy5fc2libGluZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy52YXJzLmltbWVkaWF0ZVJlbmRlciB8fCAoZHVyYXRpb24gPT09IDAgJiYgdGhpcy5fZGVsYXkgPT09IDAgJiYgdGhpcy52YXJzLmltbWVkaWF0ZVJlbmRlciAhPT0gZmFsc2UpKSB7XG5cdFx0XHRcdFx0dGhpcy5fdGltZSA9IC1fdGlueU51bTsgLy9mb3JjZXMgYSByZW5kZXIgd2l0aG91dCBoYXZpbmcgdG8gc2V0IHRoZSByZW5kZXIoKSBcImZvcmNlXCIgcGFyYW1ldGVyIHRvIHRydWUgYmVjYXVzZSB3ZSB3YW50IHRvIGFsbG93IGxhenlpbmcgYnkgZGVmYXVsdCAodXNpbmcgdGhlIFwiZm9yY2VcIiBwYXJhbWV0ZXIgYWx3YXlzIGZvcmNlcyBhbiBpbW1lZGlhdGUgZnVsbCByZW5kZXIpXG5cdFx0XHRcdFx0dGhpcy5yZW5kZXIoTWF0aC5taW4oMCwgLXRoaXMuX2RlbGF5KSk7IC8vaW4gY2FzZSBkZWxheSBpcyBuZWdhdGl2ZVxuXHRcdFx0XHR9XG5cdFx0XHR9LCB0cnVlKSxcblx0XHRcdF9pc1NlbGVjdG9yID0gZnVuY3Rpb24odikge1xuXHRcdFx0XHRyZXR1cm4gKHYgJiYgdi5sZW5ndGggJiYgdiAhPT0gd2luZG93ICYmIHZbMF0gJiYgKHZbMF0gPT09IHdpbmRvdyB8fCAodlswXS5ub2RlVHlwZSAmJiB2WzBdLnN0eWxlICYmICF2Lm5vZGVUeXBlKSkpOyAvL3dlIGNhbm5vdCBjaGVjayBcIm5vZGVUeXBlXCIgaWYgdGhlIHRhcmdldCBpcyB3aW5kb3cgZnJvbSB3aXRoaW4gYW4gaWZyYW1lLCBvdGhlcndpc2UgaXQgd2lsbCB0cmlnZ2VyIGEgc2VjdXJpdHkgZXJyb3IgaW4gc29tZSBicm93c2VycyBsaWtlIEZpcmVmb3guXG5cdFx0XHR9LFxuXHRcdFx0X2F1dG9DU1MgPSBmdW5jdGlvbih2YXJzLCB0YXJnZXQpIHtcblx0XHRcdFx0dmFyIGNzcyA9IHt9LFxuXHRcdFx0XHRcdHA7XG5cdFx0XHRcdGZvciAocCBpbiB2YXJzKSB7XG5cdFx0XHRcdFx0aWYgKCFfcmVzZXJ2ZWRQcm9wc1twXSAmJiAoIShwIGluIHRhcmdldCkgfHwgcCA9PT0gXCJ0cmFuc2Zvcm1cIiB8fCBwID09PSBcInhcIiB8fCBwID09PSBcInlcIiB8fCBwID09PSBcIndpZHRoXCIgfHwgcCA9PT0gXCJoZWlnaHRcIiB8fCBwID09PSBcImNsYXNzTmFtZVwiIHx8IHAgPT09IFwiYm9yZGVyXCIpICYmICghX3BsdWdpbnNbcF0gfHwgKF9wbHVnaW5zW3BdICYmIF9wbHVnaW5zW3BdLl9hdXRvQ1NTKSkpIHsgLy9ub3RlOiA8aW1nPiBlbGVtZW50cyBjb250YWluIHJlYWQtb25seSBcInhcIiBhbmQgXCJ5XCIgcHJvcGVydGllcy4gV2Ugc2hvdWxkIGFsc28gcHJpb3JpdGl6ZSBlZGl0aW5nIGNzcyB3aWR0aC9oZWlnaHQgcmF0aGVyIHRoYW4gdGhlIGVsZW1lbnQncyBwcm9wZXJ0aWVzLlxuXHRcdFx0XHRcdFx0Y3NzW3BdID0gdmFyc1twXTtcblx0XHRcdFx0XHRcdGRlbGV0ZSB2YXJzW3BdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR2YXJzLmNzcyA9IGNzcztcblx0XHRcdH07XG5cblx0XHRwID0gVHdlZW5MaXRlLnByb3RvdHlwZSA9IG5ldyBBbmltYXRpb24oKTtcblx0XHRwLmNvbnN0cnVjdG9yID0gVHdlZW5MaXRlO1xuXHRcdHAua2lsbCgpLl9nYyA9IGZhbHNlO1xuXG4vLy0tLS1Ud2VlbkxpdGUgZGVmYXVsdHMsIG92ZXJ3cml0ZSBtYW5hZ2VtZW50LCBhbmQgcm9vdCB1cGRhdGVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdHAucmF0aW8gPSAwO1xuXHRcdHAuX2ZpcnN0UFQgPSBwLl90YXJnZXRzID0gcC5fb3ZlcndyaXR0ZW5Qcm9wcyA9IHAuX3N0YXJ0QXQgPSBudWxsO1xuXHRcdHAuX25vdGlmeVBsdWdpbnNPZkVuYWJsZWQgPSBwLl9sYXp5ID0gZmFsc2U7XG5cblx0XHRUd2VlbkxpdGUudmVyc2lvbiA9IFwiMS4yMC4zXCI7XG5cdFx0VHdlZW5MaXRlLmRlZmF1bHRFYXNlID0gcC5fZWFzZSA9IG5ldyBFYXNlKG51bGwsIG51bGwsIDEsIDEpO1xuXHRcdFR3ZWVuTGl0ZS5kZWZhdWx0T3ZlcndyaXRlID0gXCJhdXRvXCI7XG5cdFx0VHdlZW5MaXRlLnRpY2tlciA9IF90aWNrZXI7XG5cdFx0VHdlZW5MaXRlLmF1dG9TbGVlcCA9IDEyMDtcblx0XHRUd2VlbkxpdGUubGFnU21vb3RoaW5nID0gZnVuY3Rpb24odGhyZXNob2xkLCBhZGp1c3RlZExhZykge1xuXHRcdFx0X3RpY2tlci5sYWdTbW9vdGhpbmcodGhyZXNob2xkLCBhZGp1c3RlZExhZyk7XG5cdFx0fTtcblxuXHRcdFR3ZWVuTGl0ZS5zZWxlY3RvciA9IHdpbmRvdy4kIHx8IHdpbmRvdy5qUXVlcnkgfHwgZnVuY3Rpb24oZSkge1xuXHRcdFx0dmFyIHNlbGVjdG9yID0gd2luZG93LiQgfHwgd2luZG93LmpRdWVyeTtcblx0XHRcdGlmIChzZWxlY3Rvcikge1xuXHRcdFx0XHRUd2VlbkxpdGUuc2VsZWN0b3IgPSBzZWxlY3Rvcjtcblx0XHRcdFx0cmV0dXJuIHNlbGVjdG9yKGUpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICh0eXBlb2YoX2RvYykgPT09IFwidW5kZWZpbmVkXCIpID8gZSA6IChfZG9jLnF1ZXJ5U2VsZWN0b3JBbGwgPyBfZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoZSkgOiBfZG9jLmdldEVsZW1lbnRCeUlkKChlLmNoYXJBdCgwKSA9PT0gXCIjXCIpID8gZS5zdWJzdHIoMSkgOiBlKSk7XG5cdFx0fTtcblxuXHRcdHZhciBfbGF6eVR3ZWVucyA9IFtdLFxuXHRcdFx0X2xhenlMb29rdXAgPSB7fSxcblx0XHRcdF9udW1iZXJzRXhwID0gLyg/OigtfC09fFxcKz0pP1xcZCpcXC4/XFxkKig/OmVbXFwtK10/XFxkKyk/KVswLTldL2lnLFxuXHRcdFx0X3JlbEV4cCA9IC9bXFwrLV09LT9bXFwuXFxkXS8sXG5cdFx0XHQvL19ub25OdW1iZXJzRXhwID0gLyg/OihbXFwtK10oPyEoXFxkfD0pKSl8W15cXGRcXC0rPWVdfChlKD8hW1xcLStdW1xcZF0pKSkrL2lnLFxuXHRcdFx0X3NldFJhdGlvID0gZnVuY3Rpb24odikge1xuXHRcdFx0XHR2YXIgcHQgPSB0aGlzLl9maXJzdFBULFxuXHRcdFx0XHRcdG1pbiA9IDAuMDAwMDAxLFxuXHRcdFx0XHRcdHZhbDtcblx0XHRcdFx0d2hpbGUgKHB0KSB7XG5cdFx0XHRcdFx0dmFsID0gIXB0LmJsb2IgPyBwdC5jICogdiArIHB0LnMgOiAodiA9PT0gMSAmJiB0aGlzLmVuZCAhPSBudWxsKSA/IHRoaXMuZW5kIDogdiA/IHRoaXMuam9pbihcIlwiKSA6IHRoaXMuc3RhcnQ7XG5cdFx0XHRcdFx0aWYgKHB0Lm0pIHtcblx0XHRcdFx0XHRcdHZhbCA9IHB0Lm0odmFsLCB0aGlzLl90YXJnZXQgfHwgcHQudCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh2YWwgPCBtaW4pIGlmICh2YWwgPiAtbWluICYmICFwdC5ibG9iKSB7IC8vcHJldmVudHMgaXNzdWVzIHdpdGggY29udmVydGluZyB2ZXJ5IHNtYWxsIG51bWJlcnMgdG8gc3RyaW5ncyBpbiB0aGUgYnJvd3NlclxuXHRcdFx0XHRcdFx0dmFsID0gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCFwdC5mKSB7XG5cdFx0XHRcdFx0XHRwdC50W3B0LnBdID0gdmFsO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHQuZnApIHtcblx0XHRcdFx0XHRcdHB0LnRbcHQucF0ocHQuZnAsIHZhbCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHB0LnRbcHQucF0odmFsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cHQgPSBwdC5fbmV4dDtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdC8vY29tcGFyZXMgdHdvIHN0cmluZ3MgKHN0YXJ0L2VuZCksIGZpbmRzIHRoZSBudW1iZXJzIHRoYXQgYXJlIGRpZmZlcmVudCBhbmQgc3BpdHMgYmFjayBhbiBhcnJheSByZXByZXNlbnRpbmcgdGhlIHdob2xlIHZhbHVlIGJ1dCB3aXRoIHRoZSBjaGFuZ2luZyB2YWx1ZXMgaXNvbGF0ZWQgYXMgZWxlbWVudHMuIEZvciBleGFtcGxlLCBcInJnYigwLDAsMClcIiBhbmQgXCJyZ2IoMTAwLDUwLDApXCIgd291bGQgYmVjb21lIFtcInJnYihcIiwgMCwgXCIsXCIsIDUwLCBcIiwwKVwiXS4gTm90aWNlIGl0IG1lcmdlcyB0aGUgcGFydHMgdGhhdCBhcmUgaWRlbnRpY2FsIChwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24pLiBUaGUgYXJyYXkgYWxzbyBoYXMgYSBsaW5rZWQgbGlzdCBvZiBQcm9wVHdlZW5zIGF0dGFjaGVkIHN0YXJ0aW5nIHdpdGggX2ZpcnN0UFQgdGhhdCBjb250YWluIHRoZSB0d2VlbmluZyBkYXRhICh0LCBwLCBzLCBjLCBmLCBldGMuKS4gSXQgYWxzbyBzdG9yZXMgdGhlIHN0YXJ0aW5nIHZhbHVlIGFzIGEgXCJzdGFydFwiIHByb3BlcnR5IHNvIHRoYXQgd2UgY2FuIHJldmVydCB0byBpdCBpZi93aGVuIG5lY2Vzc2FyeSwgbGlrZSB3aGVuIGEgdHdlZW4gcmV3aW5kcyBmdWxseS4gSWYgdGhlIHF1YW50aXR5IG9mIG51bWJlcnMgZGlmZmVycyBiZXR3ZWVuIHRoZSBzdGFydCBhbmQgZW5kLCBpdCB3aWxsIGFsd2F5cyBwcmlvcml0aXplIHRoZSBlbmQgdmFsdWUocykuIFRoZSBwdCBwYXJhbWV0ZXIgaXMgb3B0aW9uYWwgLSBpdCdzIGZvciBhIFByb3BUd2VlbiB0aGF0IHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGVuZCBvZiB0aGUgbGlua2VkIGxpc3QgYW5kIGlzIHR5cGljYWxseSBmb3IgYWN0dWFsbHkgc2V0dGluZyB0aGUgdmFsdWUgYWZ0ZXIgYWxsIG9mIHRoZSBlbGVtZW50cyBoYXZlIGJlZW4gdXBkYXRlZCAod2l0aCBhcnJheS5qb2luKFwiXCIpKS5cblx0XHRcdF9ibG9iRGlmID0gZnVuY3Rpb24oc3RhcnQsIGVuZCwgZmlsdGVyLCBwdCkge1xuXHRcdFx0XHR2YXIgYSA9IFtdLFxuXHRcdFx0XHRcdGNoYXJJbmRleCA9IDAsXG5cdFx0XHRcdFx0cyA9IFwiXCIsXG5cdFx0XHRcdFx0Y29sb3IgPSAwLFxuXHRcdFx0XHRcdHN0YXJ0TnVtcywgZW5kTnVtcywgbnVtLCBpLCBsLCBub25OdW1iZXJzLCBjdXJyZW50TnVtO1xuXHRcdFx0XHRhLnN0YXJ0ID0gc3RhcnQ7XG5cdFx0XHRcdGEuZW5kID0gZW5kO1xuXHRcdFx0XHRzdGFydCA9IGFbMF0gPSBzdGFydCArIFwiXCI7IC8vZW5zdXJlIHZhbHVlcyBhcmUgc3RyaW5nc1xuXHRcdFx0XHRlbmQgPSBhWzFdID0gZW5kICsgXCJcIjtcblx0XHRcdFx0aWYgKGZpbHRlcikge1xuXHRcdFx0XHRcdGZpbHRlcihhKTsgLy9wYXNzIGFuIGFycmF5IHdpdGggdGhlIHN0YXJ0aW5nIGFuZCBlbmRpbmcgdmFsdWVzIGFuZCBsZXQgdGhlIGZpbHRlciBkbyB3aGF0ZXZlciBpdCBuZWVkcyB0byB0aGUgdmFsdWVzLlxuXHRcdFx0XHRcdHN0YXJ0ID0gYVswXTtcblx0XHRcdFx0XHRlbmQgPSBhWzFdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGEubGVuZ3RoID0gMDtcblx0XHRcdFx0c3RhcnROdW1zID0gc3RhcnQubWF0Y2goX251bWJlcnNFeHApIHx8IFtdO1xuXHRcdFx0XHRlbmROdW1zID0gZW5kLm1hdGNoKF9udW1iZXJzRXhwKSB8fCBbXTtcblx0XHRcdFx0aWYgKHB0KSB7XG5cdFx0XHRcdFx0cHQuX25leHQgPSBudWxsO1xuXHRcdFx0XHRcdHB0LmJsb2IgPSAxO1xuXHRcdFx0XHRcdGEuX2ZpcnN0UFQgPSBhLl9hcHBseVBUID0gcHQ7IC8vYXBwbHkgbGFzdCBpbiB0aGUgbGlua2VkIGxpc3QgKHdoaWNoIG1lYW5zIGluc2VydGluZyBpdCBmaXJzdClcblx0XHRcdFx0fVxuXHRcdFx0XHRsID0gZW5kTnVtcy5sZW5ndGg7XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0XHRjdXJyZW50TnVtID0gZW5kTnVtc1tpXTtcblx0XHRcdFx0XHRub25OdW1iZXJzID0gZW5kLnN1YnN0cihjaGFySW5kZXgsIGVuZC5pbmRleE9mKGN1cnJlbnROdW0sIGNoYXJJbmRleCktY2hhckluZGV4KTtcblx0XHRcdFx0XHRzICs9IChub25OdW1iZXJzIHx8ICFpKSA/IG5vbk51bWJlcnMgOiBcIixcIjsgLy9ub3RlOiBTVkcgc3BlYyBhbGxvd3Mgb21pc3Npb24gb2YgY29tbWEvc3BhY2Ugd2hlbiBhIG5lZ2F0aXZlIHNpZ24gaXMgd2VkZ2VkIGJldHdlZW4gdHdvIG51bWJlcnMsIGxpa2UgMi41LTUuMyBpbnN0ZWFkIG9mIDIuNSwtNS4zIGJ1dCB3aGVuIHR3ZWVuaW5nLCB0aGUgbmVnYXRpdmUgdmFsdWUgbWF5IHN3aXRjaCB0byBwb3NpdGl2ZSwgc28gd2UgaW5zZXJ0IHRoZSBjb21tYSBqdXN0IGluIGNhc2UuXG5cdFx0XHRcdFx0Y2hhckluZGV4ICs9IG5vbk51bWJlcnMubGVuZ3RoO1xuXHRcdFx0XHRcdGlmIChjb2xvcikgeyAvL3NlbnNlIHJnYmEoKSB2YWx1ZXMgYW5kIHJvdW5kIHRoZW0uXG5cdFx0XHRcdFx0XHRjb2xvciA9IChjb2xvciArIDEpICUgNTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG5vbk51bWJlcnMuc3Vic3RyKC01KSA9PT0gXCJyZ2JhKFwiKSB7XG5cdFx0XHRcdFx0XHRjb2xvciA9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChjdXJyZW50TnVtID09PSBzdGFydE51bXNbaV0gfHwgc3RhcnROdW1zLmxlbmd0aCA8PSBpKSB7XG5cdFx0XHRcdFx0XHRzICs9IGN1cnJlbnROdW07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChzKSB7XG5cdFx0XHRcdFx0XHRcdGEucHVzaChzKTtcblx0XHRcdFx0XHRcdFx0cyA9IFwiXCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRudW0gPSBwYXJzZUZsb2F0KHN0YXJ0TnVtc1tpXSk7XG5cdFx0XHRcdFx0XHRhLnB1c2gobnVtKTtcblx0XHRcdFx0XHRcdGEuX2ZpcnN0UFQgPSB7X25leHQ6IGEuX2ZpcnN0UFQsIHQ6YSwgcDogYS5sZW5ndGgtMSwgczpudW0sIGM6KChjdXJyZW50TnVtLmNoYXJBdCgxKSA9PT0gXCI9XCIpID8gcGFyc2VJbnQoY3VycmVudE51bS5jaGFyQXQoMCkgKyBcIjFcIiwgMTApICogcGFyc2VGbG9hdChjdXJyZW50TnVtLnN1YnN0cigyKSkgOiAocGFyc2VGbG9hdChjdXJyZW50TnVtKSAtIG51bSkpIHx8IDAsIGY6MCwgbTooY29sb3IgJiYgY29sb3IgPCA0KSA/IE1hdGgucm91bmQgOiAwfTtcblx0XHRcdFx0XHRcdC8vbm90ZTogd2UgZG9uJ3Qgc2V0IF9wcmV2IGJlY2F1c2Ugd2UnbGwgbmV2ZXIgbmVlZCB0byByZW1vdmUgaW5kaXZpZHVhbCBQcm9wVHdlZW5zIGZyb20gdGhpcyBsaXN0LlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjaGFySW5kZXggKz0gY3VycmVudE51bS5sZW5ndGg7XG5cdFx0XHRcdH1cblx0XHRcdFx0cyArPSBlbmQuc3Vic3RyKGNoYXJJbmRleCk7XG5cdFx0XHRcdGlmIChzKSB7XG5cdFx0XHRcdFx0YS5wdXNoKHMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGEuc2V0UmF0aW8gPSBfc2V0UmF0aW87XG5cdFx0XHRcdGlmIChfcmVsRXhwLnRlc3QoZW5kKSkgeyAvL2lmIHRoZSBlbmQgc3RyaW5nIGNvbnRhaW5zIHJlbGF0aXZlIHZhbHVlcywgZGVsZXRlIGl0IHNvIHRoYXQgb24gdGhlIGZpbmFsIHJlbmRlciAoaW4gX3NldFJhdGlvKCkpLCB3ZSBkb24ndCBhY3R1YWxseSBzZXQgaXQgdG8gdGhlIHN0cmluZyB3aXRoICs9IG9yIC09IGNoYXJhY3RlcnMgKGZvcmNlcyBpdCB0byB1c2UgdGhlIGNhbGN1bGF0ZWQgdmFsdWUpLlxuXHRcdFx0XHRcdGEuZW5kID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdH0sXG5cdFx0XHQvL25vdGU6IFwiZnVuY1BhcmFtXCIgaXMgb25seSBuZWNlc3NhcnkgZm9yIGZ1bmN0aW9uLWJhc2VkIGdldHRlcnMvc2V0dGVycyB0aGF0IHJlcXVpcmUgYW4gZXh0cmEgcGFyYW1ldGVyIGxpa2UgZ2V0QXR0cmlidXRlKFwid2lkdGhcIikgYW5kIHNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHZhbHVlKS4gSW4gdGhpcyBleGFtcGxlLCBmdW5jUGFyYW0gd291bGQgYmUgXCJ3aWR0aFwiLiBVc2VkIGJ5IEF0dHJQbHVnaW4gZm9yIGV4YW1wbGUuXG5cdFx0XHRfYWRkUHJvcFR3ZWVuID0gZnVuY3Rpb24odGFyZ2V0LCBwcm9wLCBzdGFydCwgZW5kLCBvdmVyd3JpdGVQcm9wLCBtb2QsIGZ1bmNQYXJhbSwgc3RyaW5nRmlsdGVyLCBpbmRleCkge1xuXHRcdFx0XHRpZiAodHlwZW9mKGVuZCkgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGVuZCA9IGVuZChpbmRleCB8fCAwLCB0YXJnZXQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciB0eXBlID0gdHlwZW9mKHRhcmdldFtwcm9wXSksXG5cdFx0XHRcdFx0Z2V0dGVyTmFtZSA9ICh0eXBlICE9PSBcImZ1bmN0aW9uXCIpID8gXCJcIiA6ICgocHJvcC5pbmRleE9mKFwic2V0XCIpIHx8IHR5cGVvZih0YXJnZXRbXCJnZXRcIiArIHByb3Auc3Vic3RyKDMpXSkgIT09IFwiZnVuY3Rpb25cIikgPyBwcm9wIDogXCJnZXRcIiArIHByb3Auc3Vic3RyKDMpKSxcblx0XHRcdFx0XHRzID0gKHN0YXJ0ICE9PSBcImdldFwiKSA/IHN0YXJ0IDogIWdldHRlck5hbWUgPyB0YXJnZXRbcHJvcF0gOiBmdW5jUGFyYW0gPyB0YXJnZXRbZ2V0dGVyTmFtZV0oZnVuY1BhcmFtKSA6IHRhcmdldFtnZXR0ZXJOYW1lXSgpLFxuXHRcdFx0XHRcdGlzUmVsYXRpdmUgPSAodHlwZW9mKGVuZCkgPT09IFwic3RyaW5nXCIgJiYgZW5kLmNoYXJBdCgxKSA9PT0gXCI9XCIpLFxuXHRcdFx0XHRcdHB0ID0ge3Q6dGFyZ2V0LCBwOnByb3AsIHM6cywgZjoodHlwZSA9PT0gXCJmdW5jdGlvblwiKSwgcGc6MCwgbjpvdmVyd3JpdGVQcm9wIHx8IHByb3AsIG06KCFtb2QgPyAwIDogKHR5cGVvZihtb2QpID09PSBcImZ1bmN0aW9uXCIpID8gbW9kIDogTWF0aC5yb3VuZCksIHByOjAsIGM6aXNSZWxhdGl2ZSA/IHBhcnNlSW50KGVuZC5jaGFyQXQoMCkgKyBcIjFcIiwgMTApICogcGFyc2VGbG9hdChlbmQuc3Vic3RyKDIpKSA6IChwYXJzZUZsb2F0KGVuZCkgLSBzKSB8fCAwfSxcblx0XHRcdFx0XHRibG9iO1xuXG5cdFx0XHRcdGlmICh0eXBlb2YocykgIT09IFwibnVtYmVyXCIgfHwgKHR5cGVvZihlbmQpICE9PSBcIm51bWJlclwiICYmICFpc1JlbGF0aXZlKSkge1xuXHRcdFx0XHRcdGlmIChmdW5jUGFyYW0gfHwgaXNOYU4ocykgfHwgKCFpc1JlbGF0aXZlICYmIGlzTmFOKGVuZCkpIHx8IHR5cGVvZihzKSA9PT0gXCJib29sZWFuXCIgfHwgdHlwZW9mKGVuZCkgPT09IFwiYm9vbGVhblwiKSB7XG5cdFx0XHRcdFx0XHQvL2EgYmxvYiAoc3RyaW5nIHRoYXQgaGFzIG11bHRpcGxlIG51bWJlcnMgaW4gaXQpXG5cdFx0XHRcdFx0XHRwdC5mcCA9IGZ1bmNQYXJhbTtcblx0XHRcdFx0XHRcdGJsb2IgPSBfYmxvYkRpZihzLCAoaXNSZWxhdGl2ZSA/IHBhcnNlRmxvYXQocHQucykgKyBwdC5jIDogZW5kKSwgc3RyaW5nRmlsdGVyIHx8IFR3ZWVuTGl0ZS5kZWZhdWx0U3RyaW5nRmlsdGVyLCBwdCk7XG5cdFx0XHRcdFx0XHRwdCA9IHt0OiBibG9iLCBwOiBcInNldFJhdGlvXCIsIHM6IDAsIGM6IDEsIGY6IDIsIHBnOiAwLCBuOiBvdmVyd3JpdGVQcm9wIHx8IHByb3AsIHByOiAwLCBtOiAwfTsgLy9cIjJcIiBpbmRpY2F0ZXMgaXQncyBhIEJsb2IgcHJvcGVydHkgdHdlZW4uIE5lZWRlZCBmb3IgUm91bmRQcm9wc1BsdWdpbiBmb3IgZXhhbXBsZS5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cHQucyA9IHBhcnNlRmxvYXQocyk7XG5cdFx0XHRcdFx0XHRpZiAoIWlzUmVsYXRpdmUpIHtcblx0XHRcdFx0XHRcdFx0cHQuYyA9IChwYXJzZUZsb2F0KGVuZCkgLSBwdC5zKSB8fCAwO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAocHQuYykgeyAvL29ubHkgYWRkIGl0IHRvIHRoZSBsaW5rZWQgbGlzdCBpZiB0aGVyZSdzIGEgY2hhbmdlLlxuXHRcdFx0XHRcdGlmICgocHQuX25leHQgPSB0aGlzLl9maXJzdFBUKSkge1xuXHRcdFx0XHRcdFx0cHQuX25leHQuX3ByZXYgPSBwdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5fZmlyc3RQVCA9IHB0O1xuXHRcdFx0XHRcdHJldHVybiBwdDtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdF9pbnRlcm5hbHMgPSBUd2VlbkxpdGUuX2ludGVybmFscyA9IHtpc0FycmF5Ol9pc0FycmF5LCBpc1NlbGVjdG9yOl9pc1NlbGVjdG9yLCBsYXp5VHdlZW5zOl9sYXp5VHdlZW5zLCBibG9iRGlmOl9ibG9iRGlmfSwgLy9naXZlcyB1cyBhIHdheSB0byBleHBvc2UgY2VydGFpbiBwcml2YXRlIHZhbHVlcyB0byBvdGhlciBHcmVlblNvY2sgY2xhc3NlcyB3aXRob3V0IGNvbnRhbWluYXRpbmcgdGhhIG1haW4gVHdlZW5MaXRlIG9iamVjdC5cblx0XHRcdF9wbHVnaW5zID0gVHdlZW5MaXRlLl9wbHVnaW5zID0ge30sXG5cdFx0XHRfdHdlZW5Mb29rdXAgPSBfaW50ZXJuYWxzLnR3ZWVuTG9va3VwID0ge30sXG5cdFx0XHRfdHdlZW5Mb29rdXBOdW0gPSAwLFxuXHRcdFx0X3Jlc2VydmVkUHJvcHMgPSBfaW50ZXJuYWxzLnJlc2VydmVkUHJvcHMgPSB7ZWFzZToxLCBkZWxheToxLCBvdmVyd3JpdGU6MSwgb25Db21wbGV0ZToxLCBvbkNvbXBsZXRlUGFyYW1zOjEsIG9uQ29tcGxldGVTY29wZToxLCB1c2VGcmFtZXM6MSwgcnVuQmFja3dhcmRzOjEsIHN0YXJ0QXQ6MSwgb25VcGRhdGU6MSwgb25VcGRhdGVQYXJhbXM6MSwgb25VcGRhdGVTY29wZToxLCBvblN0YXJ0OjEsIG9uU3RhcnRQYXJhbXM6MSwgb25TdGFydFNjb3BlOjEsIG9uUmV2ZXJzZUNvbXBsZXRlOjEsIG9uUmV2ZXJzZUNvbXBsZXRlUGFyYW1zOjEsIG9uUmV2ZXJzZUNvbXBsZXRlU2NvcGU6MSwgb25SZXBlYXQ6MSwgb25SZXBlYXRQYXJhbXM6MSwgb25SZXBlYXRTY29wZToxLCBlYXNlUGFyYW1zOjEsIHlveW86MSwgaW1tZWRpYXRlUmVuZGVyOjEsIHJlcGVhdDoxLCByZXBlYXREZWxheToxLCBkYXRhOjEsIHBhdXNlZDoxLCByZXZlcnNlZDoxLCBhdXRvQ1NTOjEsIGxhenk6MSwgb25PdmVyd3JpdGU6MSwgY2FsbGJhY2tTY29wZToxLCBzdHJpbmdGaWx0ZXI6MSwgaWQ6MSwgeW95b0Vhc2U6MX0sXG5cdFx0XHRfb3ZlcndyaXRlTG9va3VwID0ge25vbmU6MCwgYWxsOjEsIGF1dG86MiwgY29uY3VycmVudDozLCBhbGxPblN0YXJ0OjQsIHByZWV4aXN0aW5nOjUsIFwidHJ1ZVwiOjEsIFwiZmFsc2VcIjowfSxcblx0XHRcdF9yb290RnJhbWVzVGltZWxpbmUgPSBBbmltYXRpb24uX3Jvb3RGcmFtZXNUaW1lbGluZSA9IG5ldyBTaW1wbGVUaW1lbGluZSgpLFxuXHRcdFx0X3Jvb3RUaW1lbGluZSA9IEFuaW1hdGlvbi5fcm9vdFRpbWVsaW5lID0gbmV3IFNpbXBsZVRpbWVsaW5lKCksXG5cdFx0XHRfbmV4dEdDRnJhbWUgPSAzMCxcblx0XHRcdF9sYXp5UmVuZGVyID0gX2ludGVybmFscy5sYXp5UmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBpID0gX2xhenlUd2VlbnMubGVuZ3RoLFxuXHRcdFx0XHRcdHR3ZWVuO1xuXHRcdFx0XHRfbGF6eUxvb2t1cCA9IHt9O1xuXHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHR0d2VlbiA9IF9sYXp5VHdlZW5zW2ldO1xuXHRcdFx0XHRcdGlmICh0d2VlbiAmJiB0d2Vlbi5fbGF6eSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHR3ZWVuLnJlbmRlcih0d2Vlbi5fbGF6eVswXSwgdHdlZW4uX2xhenlbMV0sIHRydWUpO1xuXHRcdFx0XHRcdFx0dHdlZW4uX2xhenkgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0X2xhenlUd2VlbnMubGVuZ3RoID0gMDtcblx0XHRcdH07XG5cblx0XHRfcm9vdFRpbWVsaW5lLl9zdGFydFRpbWUgPSBfdGlja2VyLnRpbWU7XG5cdFx0X3Jvb3RGcmFtZXNUaW1lbGluZS5fc3RhcnRUaW1lID0gX3RpY2tlci5mcmFtZTtcblx0XHRfcm9vdFRpbWVsaW5lLl9hY3RpdmUgPSBfcm9vdEZyYW1lc1RpbWVsaW5lLl9hY3RpdmUgPSB0cnVlO1xuXHRcdHNldFRpbWVvdXQoX2xhenlSZW5kZXIsIDEpOyAvL29uIHNvbWUgbW9iaWxlIGRldmljZXMsIHRoZXJlIGlzbid0IGEgXCJ0aWNrXCIgYmVmb3JlIGNvZGUgcnVucyB3aGljaCBtZWFucyBhbnkgbGF6eSByZW5kZXJzIHdvdWxkbid0IHJ1biBiZWZvcmUgdGhlIG5leHQgb2ZmaWNpYWwgXCJ0aWNrXCIuXG5cblx0XHRBbmltYXRpb24uX3VwZGF0ZVJvb3QgPSBUd2VlbkxpdGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBpLCBhLCBwO1xuXHRcdFx0XHRpZiAoX2xhenlUd2VlbnMubGVuZ3RoKSB7IC8vaWYgY29kZSBpcyBydW4gb3V0c2lkZSBvZiB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGxvb3AsIHRoZXJlIG1heSBiZSB0d2VlbnMgcXVldWVkIEFGVEVSIHRoZSBlbmdpbmUgcmVmcmVzaGVkLCBzbyB3ZSBuZWVkIHRvIGVuc3VyZSBhbnkgcGVuZGluZyByZW5kZXJzIG9jY3VyIGJlZm9yZSB3ZSByZWZyZXNoIGFnYWluLlxuXHRcdFx0XHRcdF9sYXp5UmVuZGVyKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0X3Jvb3RUaW1lbGluZS5yZW5kZXIoKF90aWNrZXIudGltZSAtIF9yb290VGltZWxpbmUuX3N0YXJ0VGltZSkgKiBfcm9vdFRpbWVsaW5lLl90aW1lU2NhbGUsIGZhbHNlLCBmYWxzZSk7XG5cdFx0XHRcdF9yb290RnJhbWVzVGltZWxpbmUucmVuZGVyKChfdGlja2VyLmZyYW1lIC0gX3Jvb3RGcmFtZXNUaW1lbGluZS5fc3RhcnRUaW1lKSAqIF9yb290RnJhbWVzVGltZWxpbmUuX3RpbWVTY2FsZSwgZmFsc2UsIGZhbHNlKTtcblx0XHRcdFx0aWYgKF9sYXp5VHdlZW5zLmxlbmd0aCkge1xuXHRcdFx0XHRcdF9sYXp5UmVuZGVyKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKF90aWNrZXIuZnJhbWUgPj0gX25leHRHQ0ZyYW1lKSB7IC8vZHVtcCBnYXJiYWdlIGV2ZXJ5IDEyMCBmcmFtZXMgb3Igd2hhdGV2ZXIgdGhlIHVzZXIgc2V0cyBUd2VlbkxpdGUuYXV0b1NsZWVwIHRvXG5cdFx0XHRcdFx0X25leHRHQ0ZyYW1lID0gX3RpY2tlci5mcmFtZSArIChwYXJzZUludChUd2VlbkxpdGUuYXV0b1NsZWVwLCAxMCkgfHwgMTIwKTtcblx0XHRcdFx0XHRmb3IgKHAgaW4gX3R3ZWVuTG9va3VwKSB7XG5cdFx0XHRcdFx0XHRhID0gX3R3ZWVuTG9va3VwW3BdLnR3ZWVucztcblx0XHRcdFx0XHRcdGkgPSBhLmxlbmd0aDtcblx0XHRcdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoYVtpXS5fZ2MpIHtcblx0XHRcdFx0XHRcdFx0XHRhLnNwbGljZShpLCAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGEubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBfdHdlZW5Mb29rdXBbcF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vaWYgdGhlcmUgYXJlIG5vIG1vcmUgdHdlZW5zIGluIHRoZSByb290IHRpbWVsaW5lcywgb3IgaWYgdGhleSdyZSBhbGwgcGF1c2VkLCBtYWtlIHRoZSBfdGltZXIgc2xlZXAgdG8gcmVkdWNlIGxvYWQgb24gdGhlIENQVSBzbGlnaHRseVxuXHRcdFx0XHRcdHAgPSBfcm9vdFRpbWVsaW5lLl9maXJzdDtcblx0XHRcdFx0XHRpZiAoIXAgfHwgcC5fcGF1c2VkKSBpZiAoVHdlZW5MaXRlLmF1dG9TbGVlcCAmJiAhX3Jvb3RGcmFtZXNUaW1lbGluZS5fZmlyc3QgJiYgX3RpY2tlci5fbGlzdGVuZXJzLnRpY2subGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHR3aGlsZSAocCAmJiBwLl9wYXVzZWQpIHtcblx0XHRcdFx0XHRcdFx0cCA9IHAuX25leHQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIXApIHtcblx0XHRcdFx0XHRcdFx0X3RpY2tlci5zbGVlcCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdF90aWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgQW5pbWF0aW9uLl91cGRhdGVSb290KTtcblxuXHRcdHZhciBfcmVnaXN0ZXIgPSBmdW5jdGlvbih0YXJnZXQsIHR3ZWVuLCBzY3J1Yikge1xuXHRcdFx0XHR2YXIgaWQgPSB0YXJnZXQuX2dzVHdlZW5JRCwgYSwgaTtcblx0XHRcdFx0aWYgKCFfdHdlZW5Mb29rdXBbaWQgfHwgKHRhcmdldC5fZ3NUd2VlbklEID0gaWQgPSBcInRcIiArIChfdHdlZW5Mb29rdXBOdW0rKykpXSkge1xuXHRcdFx0XHRcdF90d2Vlbkxvb2t1cFtpZF0gPSB7dGFyZ2V0OnRhcmdldCwgdHdlZW5zOltdfTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodHdlZW4pIHtcblx0XHRcdFx0XHRhID0gX3R3ZWVuTG9va3VwW2lkXS50d2VlbnM7XG5cdFx0XHRcdFx0YVsoaSA9IGEubGVuZ3RoKV0gPSB0d2Vlbjtcblx0XHRcdFx0XHRpZiAoc2NydWIpIHtcblx0XHRcdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoYVtpXSA9PT0gdHdlZW4pIHtcblx0XHRcdFx0XHRcdFx0XHRhLnNwbGljZShpLCAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gX3R3ZWVuTG9va3VwW2lkXS50d2VlbnM7XG5cdFx0XHR9LFxuXHRcdFx0X29uT3ZlcndyaXRlID0gZnVuY3Rpb24ob3ZlcndyaXR0ZW5Ud2Vlbiwgb3ZlcndyaXRpbmdUd2VlbiwgdGFyZ2V0LCBraWxsZWRQcm9wcykge1xuXHRcdFx0XHR2YXIgZnVuYyA9IG92ZXJ3cml0dGVuVHdlZW4udmFycy5vbk92ZXJ3cml0ZSwgcjEsIHIyO1xuXHRcdFx0XHRpZiAoZnVuYykge1xuXHRcdFx0XHRcdHIxID0gZnVuYyhvdmVyd3JpdHRlblR3ZWVuLCBvdmVyd3JpdGluZ1R3ZWVuLCB0YXJnZXQsIGtpbGxlZFByb3BzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmdW5jID0gVHdlZW5MaXRlLm9uT3ZlcndyaXRlO1xuXHRcdFx0XHRpZiAoZnVuYykge1xuXHRcdFx0XHRcdHIyID0gZnVuYyhvdmVyd3JpdHRlblR3ZWVuLCBvdmVyd3JpdGluZ1R3ZWVuLCB0YXJnZXQsIGtpbGxlZFByb3BzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gKHIxICE9PSBmYWxzZSAmJiByMiAhPT0gZmFsc2UpO1xuXHRcdFx0fSxcblx0XHRcdF9hcHBseU92ZXJ3cml0ZSA9IGZ1bmN0aW9uKHRhcmdldCwgdHdlZW4sIHByb3BzLCBtb2RlLCBzaWJsaW5ncykge1xuXHRcdFx0XHR2YXIgaSwgY2hhbmdlZCwgY3VyVHdlZW4sIGw7XG5cdFx0XHRcdGlmIChtb2RlID09PSAxIHx8IG1vZGUgPj0gNCkge1xuXHRcdFx0XHRcdGwgPSBzaWJsaW5ncy5sZW5ndGg7XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYgKChjdXJUd2VlbiA9IHNpYmxpbmdzW2ldKSAhPT0gdHdlZW4pIHtcblx0XHRcdFx0XHRcdFx0aWYgKCFjdXJUd2Vlbi5fZ2MpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY3VyVHdlZW4uX2tpbGwobnVsbCwgdGFyZ2V0LCB0d2VlbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChtb2RlID09PSA1KSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gY2hhbmdlZDtcblx0XHRcdFx0fVxuXHRcdFx0XHQvL05PVEU6IEFkZCAwLjAwMDAwMDAwMDEgdG8gb3ZlcmNvbWUgZmxvYXRpbmcgcG9pbnQgZXJyb3JzIHRoYXQgY2FuIGNhdXNlIHRoZSBzdGFydFRpbWUgdG8gYmUgVkVSWSBzbGlnaHRseSBvZmYgKHdoZW4gYSB0d2VlbidzIHRpbWUoKSBpcyBzZXQgZm9yIGV4YW1wbGUpXG5cdFx0XHRcdHZhciBzdGFydFRpbWUgPSB0d2Vlbi5fc3RhcnRUaW1lICsgX3RpbnlOdW0sXG5cdFx0XHRcdFx0b3ZlcmxhcHMgPSBbXSxcblx0XHRcdFx0XHRvQ291bnQgPSAwLFxuXHRcdFx0XHRcdHplcm9EdXIgPSAodHdlZW4uX2R1cmF0aW9uID09PSAwKSxcblx0XHRcdFx0XHRnbG9iYWxTdGFydDtcblx0XHRcdFx0aSA9IHNpYmxpbmdzLmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0aWYgKChjdXJUd2VlbiA9IHNpYmxpbmdzW2ldKSA9PT0gdHdlZW4gfHwgY3VyVHdlZW4uX2djIHx8IGN1clR3ZWVuLl9wYXVzZWQpIHtcblx0XHRcdFx0XHRcdC8vaWdub3JlXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjdXJUd2Vlbi5fdGltZWxpbmUgIT09IHR3ZWVuLl90aW1lbGluZSkge1xuXHRcdFx0XHRcdFx0Z2xvYmFsU3RhcnQgPSBnbG9iYWxTdGFydCB8fCBfY2hlY2tPdmVybGFwKHR3ZWVuLCAwLCB6ZXJvRHVyKTtcblx0XHRcdFx0XHRcdGlmIChfY2hlY2tPdmVybGFwKGN1clR3ZWVuLCBnbG9iYWxTdGFydCwgemVyb0R1cikgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0b3ZlcmxhcHNbb0NvdW50KytdID0gY3VyVHdlZW47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjdXJUd2Vlbi5fc3RhcnRUaW1lIDw9IHN0YXJ0VGltZSkgaWYgKGN1clR3ZWVuLl9zdGFydFRpbWUgKyBjdXJUd2Vlbi50b3RhbER1cmF0aW9uKCkgLyBjdXJUd2Vlbi5fdGltZVNjYWxlID4gc3RhcnRUaW1lKSBpZiAoISgoemVyb0R1ciB8fCAhY3VyVHdlZW4uX2luaXR0ZWQpICYmIHN0YXJ0VGltZSAtIGN1clR3ZWVuLl9zdGFydFRpbWUgPD0gMC4wMDAwMDAwMDAyKSkge1xuXHRcdFx0XHRcdFx0b3ZlcmxhcHNbb0NvdW50KytdID0gY3VyVHdlZW47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aSA9IG9Db3VudDtcblx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0Y3VyVHdlZW4gPSBvdmVybGFwc1tpXTtcblx0XHRcdFx0XHRpZiAobW9kZSA9PT0gMikgaWYgKGN1clR3ZWVuLl9raWxsKHByb3BzLCB0YXJnZXQsIHR3ZWVuKSkge1xuXHRcdFx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChtb2RlICE9PSAyIHx8ICghY3VyVHdlZW4uX2ZpcnN0UFQgJiYgY3VyVHdlZW4uX2luaXR0ZWQpKSB7XG5cdFx0XHRcdFx0XHRpZiAobW9kZSAhPT0gMiAmJiAhX29uT3ZlcndyaXRlKGN1clR3ZWVuLCB0d2VlbikpIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoY3VyVHdlZW4uX2VuYWJsZWQoZmFsc2UsIGZhbHNlKSkgeyAvL2lmIGFsbCBwcm9wZXJ0eSB0d2VlbnMgaGF2ZSBiZWVuIG92ZXJ3cml0dGVuLCBraWxsIHRoZSB0d2Vlbi5cblx0XHRcdFx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBjaGFuZ2VkO1xuXHRcdFx0fSxcblx0XHRcdF9jaGVja092ZXJsYXAgPSBmdW5jdGlvbih0d2VlbiwgcmVmZXJlbmNlLCB6ZXJvRHVyKSB7XG5cdFx0XHRcdHZhciB0bCA9IHR3ZWVuLl90aW1lbGluZSxcblx0XHRcdFx0XHR0cyA9IHRsLl90aW1lU2NhbGUsXG5cdFx0XHRcdFx0dCA9IHR3ZWVuLl9zdGFydFRpbWU7XG5cdFx0XHRcdHdoaWxlICh0bC5fdGltZWxpbmUpIHtcblx0XHRcdFx0XHR0ICs9IHRsLl9zdGFydFRpbWU7XG5cdFx0XHRcdFx0dHMgKj0gdGwuX3RpbWVTY2FsZTtcblx0XHRcdFx0XHRpZiAodGwuX3BhdXNlZCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIC0xMDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRsID0gdGwuX3RpbWVsaW5lO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHQgLz0gdHM7XG5cdFx0XHRcdHJldHVybiAodCA+IHJlZmVyZW5jZSkgPyB0IC0gcmVmZXJlbmNlIDogKCh6ZXJvRHVyICYmIHQgPT09IHJlZmVyZW5jZSkgfHwgKCF0d2Vlbi5faW5pdHRlZCAmJiB0IC0gcmVmZXJlbmNlIDwgMiAqIF90aW55TnVtKSkgPyBfdGlueU51bSA6ICgodCArPSB0d2Vlbi50b3RhbER1cmF0aW9uKCkgLyB0d2Vlbi5fdGltZVNjYWxlIC8gdHMpID4gcmVmZXJlbmNlICsgX3RpbnlOdW0pID8gMCA6IHQgLSByZWZlcmVuY2UgLSBfdGlueU51bTtcblx0XHRcdH07XG5cblxuLy8tLS0tIFR3ZWVuTGl0ZSBpbnN0YW5jZSBtZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRwLl9pbml0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdiA9IHRoaXMudmFycyxcblx0XHRcdFx0b3AgPSB0aGlzLl9vdmVyd3JpdHRlblByb3BzLFxuXHRcdFx0XHRkdXIgPSB0aGlzLl9kdXJhdGlvbixcblx0XHRcdFx0aW1tZWRpYXRlID0gISF2LmltbWVkaWF0ZVJlbmRlcixcblx0XHRcdFx0ZWFzZSA9IHYuZWFzZSxcblx0XHRcdFx0aSwgaW5pdFBsdWdpbnMsIHB0LCBwLCBzdGFydFZhcnMsIGw7XG5cdFx0XHRpZiAodi5zdGFydEF0KSB7XG5cdFx0XHRcdGlmICh0aGlzLl9zdGFydEF0KSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRBdC5yZW5kZXIoLTEsIHRydWUpOyAvL2lmIHdlJ3ZlIHJ1biBhIHN0YXJ0QXQgcHJldmlvdXNseSAod2hlbiB0aGUgdHdlZW4gaW5zdGFudGlhdGVkKSwgd2Ugc2hvdWxkIHJldmVydCBpdCBzbyB0aGF0IHRoZSB2YWx1ZXMgcmUtaW5zdGFudGlhdGUgY29ycmVjdGx5IHBhcnRpY3VsYXJseSBmb3IgcmVsYXRpdmUgdHdlZW5zLiBXaXRob3V0IHRoaXMsIGEgVHdlZW5MaXRlLmZyb21UbyhvYmosIDEsIHt4OlwiKz0xMDBcIn0sIHt4OlwiLT0xMDBcIn0pLCBmb3IgZXhhbXBsZSwgd291bGQgYWN0dWFsbHkganVtcCB0byArPTIwMCBiZWNhdXNlIHRoZSBzdGFydEF0IHdvdWxkIHJ1biB0d2ljZSwgZG91YmxpbmcgdGhlIHJlbGF0aXZlIGNoYW5nZS5cblx0XHRcdFx0XHR0aGlzLl9zdGFydEF0LmtpbGwoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzdGFydFZhcnMgPSB7fTtcblx0XHRcdFx0Zm9yIChwIGluIHYuc3RhcnRBdCkgeyAvL2NvcHkgdGhlIHByb3BlcnRpZXMvdmFsdWVzIGludG8gYSBuZXcgb2JqZWN0IHRvIGF2b2lkIGNvbGxpc2lvbnMsIGxpa2UgdmFyIHRvID0ge3g6MH0sIGZyb20gPSB7eDo1MDB9OyB0aW1lbGluZS5mcm9tVG8oZSwgMSwgZnJvbSwgdG8pLmZyb21UbyhlLCAxLCB0bywgZnJvbSk7XG5cdFx0XHRcdFx0c3RhcnRWYXJzW3BdID0gdi5zdGFydEF0W3BdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN0YXJ0VmFycy5kYXRhID0gXCJpc1N0YXJ0XCI7XG5cdFx0XHRcdHN0YXJ0VmFycy5vdmVyd3JpdGUgPSBmYWxzZTtcblx0XHRcdFx0c3RhcnRWYXJzLmltbWVkaWF0ZVJlbmRlciA9IHRydWU7XG5cdFx0XHRcdHN0YXJ0VmFycy5sYXp5ID0gKGltbWVkaWF0ZSAmJiB2LmxhenkgIT09IGZhbHNlKTtcblx0XHRcdFx0c3RhcnRWYXJzLnN0YXJ0QXQgPSBzdGFydFZhcnMuZGVsYXkgPSBudWxsOyAvL25vIG5lc3Rpbmcgb2Ygc3RhcnRBdCBvYmplY3RzIGFsbG93ZWQgKG90aGVyd2lzZSBpdCBjb3VsZCBjYXVzZSBhbiBpbmZpbml0ZSBsb29wKS5cblx0XHRcdFx0c3RhcnRWYXJzLm9uVXBkYXRlID0gdi5vblVwZGF0ZTtcblx0XHRcdFx0c3RhcnRWYXJzLm9uVXBkYXRlUGFyYW1zID0gdi5vblVwZGF0ZVBhcmFtcztcblx0XHRcdFx0c3RhcnRWYXJzLm9uVXBkYXRlU2NvcGUgPSB2Lm9uVXBkYXRlU2NvcGUgfHwgdi5jYWxsYmFja1Njb3BlIHx8IHRoaXM7XG5cdFx0XHRcdHRoaXMuX3N0YXJ0QXQgPSBUd2VlbkxpdGUudG8odGhpcy50YXJnZXQsIDAsIHN0YXJ0VmFycyk7XG5cdFx0XHRcdGlmIChpbW1lZGlhdGUpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5fdGltZSA+IDApIHtcblx0XHRcdFx0XHRcdHRoaXMuX3N0YXJ0QXQgPSBudWxsOyAvL3R3ZWVucyB0aGF0IHJlbmRlciBpbW1lZGlhdGVseSAobGlrZSBtb3N0IGZyb20oKSBhbmQgZnJvbVRvKCkgdHdlZW5zKSBzaG91bGRuJ3QgcmV2ZXJ0IHdoZW4gdGhlaXIgcGFyZW50IHRpbWVsaW5lJ3MgcGxheWhlYWQgZ29lcyBiYWNrd2FyZCBwYXN0IHRoZSBzdGFydFRpbWUgYmVjYXVzZSB0aGUgaW5pdGlhbCByZW5kZXIgY291bGQgaGF2ZSBoYXBwZW5lZCBhbnl0aW1lIGFuZCBpdCBzaG91bGRuJ3QgYmUgZGlyZWN0bHkgY29ycmVsYXRlZCB0byB0aGlzIHR3ZWVuJ3Mgc3RhcnRUaW1lLiBJbWFnaW5lIHNldHRpbmcgdXAgYSBjb21wbGV4IGFuaW1hdGlvbiB3aGVyZSB0aGUgYmVnaW5uaW5nIHN0YXRlcyBvZiB2YXJpb3VzIG9iamVjdHMgYXJlIHJlbmRlcmVkIGltbWVkaWF0ZWx5IGJ1dCB0aGUgdHdlZW4gZG9lc24ndCBoYXBwZW4gZm9yIHF1aXRlIHNvbWUgdGltZSAtIGlmIHdlIHJldmVydCB0byB0aGUgc3RhcnRpbmcgdmFsdWVzIGFzIHNvb24gYXMgdGhlIHBsYXloZWFkIGdvZXMgYmFja3dhcmQgcGFzdCB0aGUgdHdlZW4ncyBzdGFydFRpbWUsIGl0IHdpbGwgdGhyb3cgdGhpbmdzIG9mZiB2aXN1YWxseS4gUmV2ZXJzaW9uIHNob3VsZCBvbmx5IGhhcHBlbiBpbiBUaW1lbGluZUxpdGUvTWF4IGluc3RhbmNlcyB3aGVyZSBpbW1lZGlhdGVSZW5kZXIgd2FzIGZhbHNlICh3aGljaCBpcyB0aGUgZGVmYXVsdCBpbiB0aGUgY29udmVuaWVuY2UgbWV0aG9kcyBsaWtlIGZyb20oKSkuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChkdXIgIT09IDApIHtcblx0XHRcdFx0XHRcdHJldHVybjsgLy93ZSBza2lwIGluaXRpYWxpemF0aW9uIGhlcmUgc28gdGhhdCBvdmVyd3JpdGluZyBkb2Vzbid0IG9jY3VyIHVudGlsIHRoZSB0d2VlbiBhY3R1YWxseSBiZWdpbnMuIE90aGVyd2lzZSwgaWYgeW91IGNyZWF0ZSBzZXZlcmFsIGltbWVkaWF0ZVJlbmRlcjp0cnVlIHR3ZWVucyBvZiB0aGUgc2FtZSB0YXJnZXQvcHJvcGVydGllcyB0byBkcm9wIGludG8gYSBUaW1lbGluZUxpdGUgb3IgVGltZWxpbmVNYXgsIHRoZSBsYXN0IG9uZSBjcmVhdGVkIHdvdWxkIG92ZXJ3cml0ZSB0aGUgZmlyc3Qgb25lcyBiZWNhdXNlIHRoZXkgZGlkbid0IGdldCBwbGFjZWQgaW50byB0aGUgdGltZWxpbmUgeWV0IGJlZm9yZSB0aGUgZmlyc3QgcmVuZGVyIG9jY3VycyBhbmQga2lja3MgaW4gb3ZlcndyaXRpbmcuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHYucnVuQmFja3dhcmRzICYmIGR1ciAhPT0gMCkge1xuXHRcdFx0XHQvL2Zyb20oKSB0d2VlbnMgbXVzdCBiZSBoYW5kbGVkIHVuaXF1ZWx5OiB0aGVpciBiZWdpbm5pbmcgdmFsdWVzIG11c3QgYmUgcmVuZGVyZWQgYnV0IHdlIGRvbid0IHdhbnQgb3ZlcndyaXRpbmcgdG8gb2NjdXIgeWV0ICh3aGVuIHRpbWUgaXMgc3RpbGwgMCkuIFdhaXQgdW50aWwgdGhlIHR3ZWVuIGFjdHVhbGx5IGJlZ2lucyBiZWZvcmUgZG9pbmcgYWxsIHRoZSByb3V0aW5lcyBsaWtlIG92ZXJ3cml0aW5nLiBBdCB0aGF0IHRpbWUsIHdlIHNob3VsZCByZW5kZXIgYXQgdGhlIEVORCBvZiB0aGUgdHdlZW4gdG8gZW5zdXJlIHRoYXQgdGhpbmdzIGluaXRpYWxpemUgY29ycmVjdGx5IChyZW1lbWJlciwgZnJvbSgpIHR3ZWVucyBnbyBiYWNrd2FyZHMpXG5cdFx0XHRcdGlmICh0aGlzLl9zdGFydEF0KSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRBdC5yZW5kZXIoLTEsIHRydWUpO1xuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0QXQua2lsbCgpO1xuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0QXQgPSBudWxsO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmICh0aGlzLl90aW1lICE9PSAwKSB7IC8vaW4gcmFyZSBjYXNlcyAobGlrZSBpZiBhIGZyb20oKSB0d2VlbiBydW5zIGFuZCB0aGVuIGlzIGludmFsaWRhdGUoKS1lZCksIGltbWVkaWF0ZVJlbmRlciBjb3VsZCBiZSB0cnVlIGJ1dCB0aGUgaW5pdGlhbCBmb3JjZWQtcmVuZGVyIGdldHMgc2tpcHBlZCwgc28gdGhlcmUncyBubyBuZWVkIHRvIGZvcmNlIHRoZSByZW5kZXIgaW4gdGhpcyBjb250ZXh0IHdoZW4gdGhlIF90aW1lIGlzIGdyZWF0ZXIgdGhhbiAwXG5cdFx0XHRcdFx0XHRpbW1lZGlhdGUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cHQgPSB7fTtcblx0XHRcdFx0XHRmb3IgKHAgaW4gdikgeyAvL2NvcHkgcHJvcHMgaW50byBhIG5ldyBvYmplY3QgYW5kIHNraXAgYW55IHJlc2VydmVkIHByb3BzLCBvdGhlcndpc2Ugb25Db21wbGV0ZSBvciBvblVwZGF0ZSBvciBvblN0YXJ0IGNvdWxkIGZpcmUuIFdlIHNob3VsZCwgaG93ZXZlciwgcGVybWl0IGF1dG9DU1MgdG8gZ28gdGhyb3VnaC5cblx0XHRcdFx0XHRcdGlmICghX3Jlc2VydmVkUHJvcHNbcF0gfHwgcCA9PT0gXCJhdXRvQ1NTXCIpIHtcblx0XHRcdFx0XHRcdFx0cHRbcF0gPSB2W3BdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwdC5vdmVyd3JpdGUgPSAwO1xuXHRcdFx0XHRcdHB0LmRhdGEgPSBcImlzRnJvbVN0YXJ0XCI7IC8vd2UgdGFnIHRoZSB0d2VlbiB3aXRoIGFzIFwiaXNGcm9tU3RhcnRcIiBzbyB0aGF0IGlmIFtpbnNpZGUgYSBwbHVnaW5dIHdlIG5lZWQgdG8gb25seSBkbyBzb21ldGhpbmcgYXQgdGhlIHZlcnkgRU5EIG9mIGEgdHdlZW4sIHdlIGhhdmUgYSB3YXkgb2YgaWRlbnRpZnlpbmcgdGhpcyB0d2VlbiBhcyBtZXJlbHkgdGhlIG9uZSB0aGF0J3Mgc2V0dGluZyB0aGUgYmVnaW5uaW5nIHZhbHVlcyBmb3IgYSBcImZyb20oKVwiIHR3ZWVuLiBGb3IgZXhhbXBsZSwgY2xlYXJQcm9wcyBpbiBDU1NQbHVnaW4gc2hvdWxkIG9ubHkgZ2V0IGFwcGxpZWQgYXQgdGhlIHZlcnkgRU5EIG9mIGEgdHdlZW4gYW5kIHdpdGhvdXQgdGhpcyB0YWcsIGZyb20oLi4ue2hlaWdodDoxMDAsIGNsZWFyUHJvcHM6XCJoZWlnaHRcIiwgZGVsYXk6MX0pIHdvdWxkIHdpcGUgdGhlIGhlaWdodCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSB0d2VlbiBhbmQgYWZ0ZXIgMSBzZWNvbmQsIGl0J2Qga2ljayBiYWNrIGluLlxuXHRcdFx0XHRcdHB0LmxhenkgPSAoaW1tZWRpYXRlICYmIHYubGF6eSAhPT0gZmFsc2UpO1xuXHRcdFx0XHRcdHB0LmltbWVkaWF0ZVJlbmRlciA9IGltbWVkaWF0ZTsgLy96ZXJvLWR1cmF0aW9uIHR3ZWVucyByZW5kZXIgaW1tZWRpYXRlbHkgYnkgZGVmYXVsdCwgYnV0IGlmIHdlJ3JlIG5vdCBzcGVjaWZpY2FsbHkgaW5zdHJ1Y3RlZCB0byByZW5kZXIgdGhpcyB0d2VlbiBpbW1lZGlhdGVseSwgd2Ugc2hvdWxkIHNraXAgdGhpcyBhbmQgbWVyZWx5IF9pbml0KCkgdG8gcmVjb3JkIHRoZSBzdGFydGluZyB2YWx1ZXMgKHJlbmRlcmluZyB0aGVtIGltbWVkaWF0ZWx5IHdvdWxkIHB1c2ggdGhlbSB0byBjb21wbGV0aW9uIHdoaWNoIGlzIHdhc3RlZnVsIGluIHRoYXQgY2FzZSAtIHdlJ2QgaGF2ZSB0byByZW5kZXIoLTEpIGltbWVkaWF0ZWx5IGFmdGVyKVxuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0QXQgPSBUd2VlbkxpdGUudG8odGhpcy50YXJnZXQsIDAsIHB0KTtcblx0XHRcdFx0XHRpZiAoIWltbWVkaWF0ZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fc3RhcnRBdC5faW5pdCgpOyAvL2Vuc3VyZXMgdGhhdCB0aGUgaW5pdGlhbCB2YWx1ZXMgYXJlIHJlY29yZGVkXG5cdFx0XHRcdFx0XHR0aGlzLl9zdGFydEF0Ll9lbmFibGVkKGZhbHNlKTsgLy9ubyBuZWVkIHRvIGhhdmUgdGhlIHR3ZWVuIHJlbmRlciBvbiB0aGUgbmV4dCBjeWNsZS4gRGlzYWJsZSBpdCBiZWNhdXNlIHdlJ2xsIGFsd2F5cyBtYW51YWxseSBjb250cm9sIHRoZSByZW5kZXJzIG9mIHRoZSBfc3RhcnRBdCB0d2Vlbi5cblx0XHRcdFx0XHRcdGlmICh0aGlzLnZhcnMuaW1tZWRpYXRlUmVuZGVyKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3N0YXJ0QXQgPSBudWxsO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5fdGltZSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5fZWFzZSA9IGVhc2UgPSAoIWVhc2UpID8gVHdlZW5MaXRlLmRlZmF1bHRFYXNlIDogKGVhc2UgaW5zdGFuY2VvZiBFYXNlKSA/IGVhc2UgOiAodHlwZW9mKGVhc2UpID09PSBcImZ1bmN0aW9uXCIpID8gbmV3IEVhc2UoZWFzZSwgdi5lYXNlUGFyYW1zKSA6IF9lYXNlTWFwW2Vhc2VdIHx8IFR3ZWVuTGl0ZS5kZWZhdWx0RWFzZTtcblx0XHRcdGlmICh2LmVhc2VQYXJhbXMgaW5zdGFuY2VvZiBBcnJheSAmJiBlYXNlLmNvbmZpZykge1xuXHRcdFx0XHR0aGlzLl9lYXNlID0gZWFzZS5jb25maWcuYXBwbHkoZWFzZSwgdi5lYXNlUGFyYW1zKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2Vhc2VUeXBlID0gdGhpcy5fZWFzZS5fdHlwZTtcblx0XHRcdHRoaXMuX2Vhc2VQb3dlciA9IHRoaXMuX2Vhc2UuX3Bvd2VyO1xuXHRcdFx0dGhpcy5fZmlyc3RQVCA9IG51bGw7XG5cblx0XHRcdGlmICh0aGlzLl90YXJnZXRzKSB7XG5cdFx0XHRcdGwgPSB0aGlzLl90YXJnZXRzLmxlbmd0aDtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuXHRcdFx0XHRcdGlmICggdGhpcy5faW5pdFByb3BzKCB0aGlzLl90YXJnZXRzW2ldLCAodGhpcy5fcHJvcExvb2t1cFtpXSA9IHt9KSwgdGhpcy5fc2libGluZ3NbaV0sIChvcCA/IG9wW2ldIDogbnVsbCksIGkpICkge1xuXHRcdFx0XHRcdFx0aW5pdFBsdWdpbnMgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW5pdFBsdWdpbnMgPSB0aGlzLl9pbml0UHJvcHModGhpcy50YXJnZXQsIHRoaXMuX3Byb3BMb29rdXAsIHRoaXMuX3NpYmxpbmdzLCBvcCwgMCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpbml0UGx1Z2lucykge1xuXHRcdFx0XHRUd2VlbkxpdGUuX29uUGx1Z2luRXZlbnQoXCJfb25Jbml0QWxsUHJvcHNcIiwgdGhpcyk7IC8vcmVvcmRlcnMgdGhlIGFycmF5IGluIG9yZGVyIG9mIHByaW9yaXR5LiBVc2VzIGEgc3RhdGljIFR3ZWVuUGx1Z2luIG1ldGhvZCBpbiBvcmRlciB0byBtaW5pbWl6ZSBmaWxlIHNpemUgaW4gVHdlZW5MaXRlXG5cdFx0XHR9XG5cdFx0XHRpZiAob3ApIGlmICghdGhpcy5fZmlyc3RQVCkgaWYgKHR5cGVvZih0aGlzLnRhcmdldCkgIT09IFwiZnVuY3Rpb25cIikgeyAvL2lmIGFsbCB0d2VlbmluZyBwcm9wZXJ0aWVzIGhhdmUgYmVlbiBvdmVyd3JpdHRlbiwga2lsbCB0aGUgdHdlZW4uIElmIHRoZSB0YXJnZXQgaXMgYSBmdW5jdGlvbiwgaXQncyBwcm9iYWJseSBhIGRlbGF5ZWRDYWxsIHNvIGxldCBpdCBsaXZlLlxuXHRcdFx0XHR0aGlzLl9lbmFibGVkKGZhbHNlLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodi5ydW5CYWNrd2FyZHMpIHtcblx0XHRcdFx0cHQgPSB0aGlzLl9maXJzdFBUO1xuXHRcdFx0XHR3aGlsZSAocHQpIHtcblx0XHRcdFx0XHRwdC5zICs9IHB0LmM7XG5cdFx0XHRcdFx0cHQuYyA9IC1wdC5jO1xuXHRcdFx0XHRcdHB0ID0gcHQuX25leHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuX29uVXBkYXRlID0gdi5vblVwZGF0ZTtcblx0XHRcdHRoaXMuX2luaXR0ZWQgPSB0cnVlO1xuXHRcdH07XG5cblx0XHRwLl9pbml0UHJvcHMgPSBmdW5jdGlvbih0YXJnZXQsIHByb3BMb29rdXAsIHNpYmxpbmdzLCBvdmVyd3JpdHRlblByb3BzLCBpbmRleCkge1xuXHRcdFx0dmFyIHAsIGksIGluaXRQbHVnaW5zLCBwbHVnaW4sIHB0LCB2O1xuXHRcdFx0aWYgKHRhcmdldCA9PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKF9sYXp5TG9va3VwW3RhcmdldC5fZ3NUd2VlbklEXSkge1xuXHRcdFx0XHRfbGF6eVJlbmRlcigpOyAvL2lmIG90aGVyIHR3ZWVucyBvZiB0aGUgc2FtZSB0YXJnZXQgaGF2ZSByZWNlbnRseSBpbml0dGVkIGJ1dCBoYXZlbid0IHJlbmRlcmVkIHlldCwgd2UndmUgZ290IHRvIGZvcmNlIHRoZSByZW5kZXIgc28gdGhhdCB0aGUgc3RhcnRpbmcgdmFsdWVzIGFyZSBjb3JyZWN0IChpbWFnaW5lIHBvcHVsYXRpbmcgYSB0aW1lbGluZSB3aXRoIGEgYnVuY2ggb2Ygc2VxdWVudGlhbCB0d2VlbnMgYW5kIHRoZW4ganVtcGluZyB0byB0aGUgZW5kKVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXRoaXMudmFycy5jc3MpIGlmICh0YXJnZXQuc3R5bGUpIGlmICh0YXJnZXQgIT09IHdpbmRvdyAmJiB0YXJnZXQubm9kZVR5cGUpIGlmIChfcGx1Z2lucy5jc3MpIGlmICh0aGlzLnZhcnMuYXV0b0NTUyAhPT0gZmFsc2UpIHsgLy9pdCdzIHNvIGNvbW1vbiB0byB1c2UgVHdlZW5MaXRlL01heCB0byBhbmltYXRlIHRoZSBjc3Mgb2YgRE9NIGVsZW1lbnRzLCB3ZSBhc3N1bWUgdGhhdCBpZiB0aGUgdGFyZ2V0IGlzIGEgRE9NIGVsZW1lbnQsIHRoYXQncyB3aGF0IGlzIGludGVuZGVkIChhIGNvbnZlbmllbmNlIHNvIHRoYXQgdXNlcnMgZG9uJ3QgaGF2ZSB0byB3cmFwIHRoaW5ncyBpbiBjc3M6e30sIGFsdGhvdWdoIHdlIHN0aWxsIHJlY29tbWVuZCBpdCBmb3IgYSBzbGlnaHQgcGVyZm9ybWFuY2UgYm9vc3QgYW5kIGJldHRlciBzcGVjaWZpY2l0eSkuIE5vdGU6IHdlIGNhbm5vdCBjaGVjayBcIm5vZGVUeXBlXCIgb24gdGhlIHdpbmRvdyBpbnNpZGUgYW4gaWZyYW1lLlxuXHRcdFx0XHRfYXV0b0NTUyh0aGlzLnZhcnMsIHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKHAgaW4gdGhpcy52YXJzKSB7XG5cdFx0XHRcdHYgPSB0aGlzLnZhcnNbcF07XG5cdFx0XHRcdGlmIChfcmVzZXJ2ZWRQcm9wc1twXSkge1xuXHRcdFx0XHRcdGlmICh2KSBpZiAoKHYgaW5zdGFuY2VvZiBBcnJheSkgfHwgKHYucHVzaCAmJiBfaXNBcnJheSh2KSkpIGlmICh2LmpvaW4oXCJcIikuaW5kZXhPZihcIntzZWxmfVwiKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFyc1twXSA9IHYgPSB0aGlzLl9zd2FwU2VsZkluUGFyYW1zKHYsIHRoaXMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2UgaWYgKF9wbHVnaW5zW3BdICYmIChwbHVnaW4gPSBuZXcgX3BsdWdpbnNbcF0oKSkuX29uSW5pdFR3ZWVuKHRhcmdldCwgdGhpcy52YXJzW3BdLCB0aGlzLCBpbmRleCkpIHtcblxuXHRcdFx0XHRcdC8vdCAtIHRhcmdldCBcdFx0W29iamVjdF1cblx0XHRcdFx0XHQvL3AgLSBwcm9wZXJ0eSBcdFx0W3N0cmluZ11cblx0XHRcdFx0XHQvL3MgLSBzdGFydFx0XHRcdFtudW1iZXJdXG5cdFx0XHRcdFx0Ly9jIC0gY2hhbmdlXHRcdFtudW1iZXJdXG5cdFx0XHRcdFx0Ly9mIC0gaXNGdW5jdGlvblx0W2Jvb2xlYW5dXG5cdFx0XHRcdFx0Ly9uIC0gbmFtZVx0XHRcdFtzdHJpbmddXG5cdFx0XHRcdFx0Ly9wZyAtIGlzUGx1Z2luIFx0W2Jvb2xlYW5dXG5cdFx0XHRcdFx0Ly9wciAtIHByaW9yaXR5XHRcdFtudW1iZXJdXG5cdFx0XHRcdFx0Ly9tIC0gbW9kICAgICAgICAgICBbZnVuY3Rpb24gfCAwXVxuXHRcdFx0XHRcdHRoaXMuX2ZpcnN0UFQgPSBwdCA9IHtfbmV4dDp0aGlzLl9maXJzdFBULCB0OnBsdWdpbiwgcDpcInNldFJhdGlvXCIsIHM6MCwgYzoxLCBmOjEsIG46cCwgcGc6MSwgcHI6cGx1Z2luLl9wcmlvcml0eSwgbTowfTtcblx0XHRcdFx0XHRpID0gcGx1Z2luLl9vdmVyd3JpdGVQcm9wcy5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRwcm9wTG9va3VwW3BsdWdpbi5fb3ZlcndyaXRlUHJvcHNbaV1dID0gdGhpcy5fZmlyc3RQVDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHBsdWdpbi5fcHJpb3JpdHkgfHwgcGx1Z2luLl9vbkluaXRBbGxQcm9wcykge1xuXHRcdFx0XHRcdFx0aW5pdFBsdWdpbnMgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAocGx1Z2luLl9vbkRpc2FibGUgfHwgcGx1Z2luLl9vbkVuYWJsZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fbm90aWZ5UGx1Z2luc09mRW5hYmxlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChwdC5fbmV4dCkge1xuXHRcdFx0XHRcdFx0cHQuX25leHQuX3ByZXYgPSBwdDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwcm9wTG9va3VwW3BdID0gX2FkZFByb3BUd2Vlbi5jYWxsKHRoaXMsIHRhcmdldCwgcCwgXCJnZXRcIiwgdiwgcCwgMCwgbnVsbCwgdGhpcy52YXJzLnN0cmluZ0ZpbHRlciwgaW5kZXgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvdmVyd3JpdHRlblByb3BzKSBpZiAodGhpcy5fa2lsbChvdmVyd3JpdHRlblByb3BzLCB0YXJnZXQpKSB7IC8vYW5vdGhlciB0d2VlbiBtYXkgaGF2ZSB0cmllZCB0byBvdmVyd3JpdGUgcHJvcGVydGllcyBvZiB0aGlzIHR3ZWVuIGJlZm9yZSBpbml0KCkgd2FzIGNhbGxlZCAobGlrZSBpZiB0d28gdHdlZW5zIHN0YXJ0IGF0IHRoZSBzYW1lIHRpbWUsIHRoZSBvbmUgY3JlYXRlZCBzZWNvbmQgd2lsbCBydW4gZmlyc3QpXG5cdFx0XHRcdHJldHVybiB0aGlzLl9pbml0UHJvcHModGFyZ2V0LCBwcm9wTG9va3VwLCBzaWJsaW5ncywgb3ZlcndyaXR0ZW5Qcm9wcywgaW5kZXgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX292ZXJ3cml0ZSA+IDEpIGlmICh0aGlzLl9maXJzdFBUKSBpZiAoc2libGluZ3MubGVuZ3RoID4gMSkgaWYgKF9hcHBseU92ZXJ3cml0ZSh0YXJnZXQsIHRoaXMsIHByb3BMb29rdXAsIHRoaXMuX292ZXJ3cml0ZSwgc2libGluZ3MpKSB7XG5cdFx0XHRcdHRoaXMuX2tpbGwocHJvcExvb2t1cCwgdGFyZ2V0KTtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2luaXRQcm9wcyh0YXJnZXQsIHByb3BMb29rdXAsIHNpYmxpbmdzLCBvdmVyd3JpdHRlblByb3BzLCBpbmRleCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5fZmlyc3RQVCkgaWYgKCh0aGlzLnZhcnMubGF6eSAhPT0gZmFsc2UgJiYgdGhpcy5fZHVyYXRpb24pIHx8ICh0aGlzLnZhcnMubGF6eSAmJiAhdGhpcy5fZHVyYXRpb24pKSB7IC8vemVybyBkdXJhdGlvbiB0d2VlbnMgZG9uJ3QgbGF6eSByZW5kZXIgYnkgZGVmYXVsdDsgZXZlcnl0aGluZyBlbHNlIGRvZXMuXG5cdFx0XHRcdF9sYXp5TG9va3VwW3RhcmdldC5fZ3NUd2VlbklEXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gaW5pdFBsdWdpbnM7XG5cdFx0fTtcblxuXHRcdHAucmVuZGVyID0gZnVuY3Rpb24odGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB7XG5cdFx0XHR2YXIgcHJldlRpbWUgPSB0aGlzLl90aW1lLFxuXHRcdFx0XHRkdXJhdGlvbiA9IHRoaXMuX2R1cmF0aW9uLFxuXHRcdFx0XHRwcmV2UmF3UHJldlRpbWUgPSB0aGlzLl9yYXdQcmV2VGltZSxcblx0XHRcdFx0aXNDb21wbGV0ZSwgY2FsbGJhY2ssIHB0LCByYXdQcmV2VGltZTtcblx0XHRcdGlmICh0aW1lID49IGR1cmF0aW9uIC0gMC4wMDAwMDAxICYmIHRpbWUgPj0gMCkgeyAvL3RvIHdvcmsgYXJvdW5kIG9jY2FzaW9uYWwgZmxvYXRpbmcgcG9pbnQgbWF0aCBhcnRpZmFjdHMuXG5cdFx0XHRcdHRoaXMuX3RvdGFsVGltZSA9IHRoaXMuX3RpbWUgPSBkdXJhdGlvbjtcblx0XHRcdFx0dGhpcy5yYXRpbyA9IHRoaXMuX2Vhc2UuX2NhbGNFbmQgPyB0aGlzLl9lYXNlLmdldFJhdGlvKDEpIDogMTtcblx0XHRcdFx0aWYgKCF0aGlzLl9yZXZlcnNlZCApIHtcblx0XHRcdFx0XHRpc0NvbXBsZXRlID0gdHJ1ZTtcblx0XHRcdFx0XHRjYWxsYmFjayA9IFwib25Db21wbGV0ZVwiO1xuXHRcdFx0XHRcdGZvcmNlID0gKGZvcmNlIHx8IHRoaXMuX3RpbWVsaW5lLmF1dG9SZW1vdmVDaGlsZHJlbik7IC8vb3RoZXJ3aXNlLCBpZiB0aGUgYW5pbWF0aW9uIGlzIHVucGF1c2VkL2FjdGl2YXRlZCBhZnRlciBpdCdzIGFscmVhZHkgZmluaXNoZWQsIGl0IGRvZXNuJ3QgZ2V0IHJlbW92ZWQgZnJvbSB0aGUgcGFyZW50IHRpbWVsaW5lLlxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChkdXJhdGlvbiA9PT0gMCkgaWYgKHRoaXMuX2luaXR0ZWQgfHwgIXRoaXMudmFycy5sYXp5IHx8IGZvcmNlKSB7IC8vemVyby1kdXJhdGlvbiB0d2VlbnMgYXJlIHRyaWNreSBiZWNhdXNlIHdlIG11c3QgZGlzY2VybiB0aGUgbW9tZW50dW0vZGlyZWN0aW9uIG9mIHRpbWUgaW4gb3JkZXIgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIHN0YXJ0aW5nIHZhbHVlcyBzaG91bGQgYmUgcmVuZGVyZWQgb3IgdGhlIGVuZGluZyB2YWx1ZXMuIElmIHRoZSBcInBsYXloZWFkXCIgb2YgaXRzIHRpbWVsaW5lIGdvZXMgcGFzdCB0aGUgemVyby1kdXJhdGlvbiB0d2VlbiBpbiB0aGUgZm9yd2FyZCBkaXJlY3Rpb24gb3IgbGFuZHMgZGlyZWN0bHkgb24gaXQsIHRoZSBlbmQgdmFsdWVzIHNob3VsZCBiZSByZW5kZXJlZCwgYnV0IGlmIHRoZSB0aW1lbGluZSdzIFwicGxheWhlYWRcIiBtb3ZlcyBwYXN0IGl0IGluIHRoZSBiYWNrd2FyZCBkaXJlY3Rpb24gKGZyb20gYSBwb3N0aXRpdmUgdGltZSB0byBhIG5lZ2F0aXZlIHRpbWUpLCB0aGUgc3RhcnRpbmcgdmFsdWVzIG11c3QgYmUgcmVuZGVyZWQuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3N0YXJ0VGltZSA9PT0gdGhpcy5fdGltZWxpbmUuX2R1cmF0aW9uKSB7IC8vaWYgYSB6ZXJvLWR1cmF0aW9uIHR3ZWVuIGlzIGF0IHRoZSBWRVJZIGVuZCBvZiBhIHRpbWVsaW5lIGFuZCB0aGF0IHRpbWVsaW5lIHJlbmRlcnMgYXQgaXRzIGVuZCwgaXQgd2lsbCB0eXBpY2FsbHkgYWRkIGEgdGlueSBiaXQgb2YgY3VzaGlvbiB0byB0aGUgcmVuZGVyIHRpbWUgdG8gcHJldmVudCByb3VuZGluZyBlcnJvcnMgZnJvbSBnZXR0aW5nIGluIHRoZSB3YXkgb2YgdHdlZW5zIHJlbmRlcmluZyB0aGVpciBWRVJZIGVuZC4gSWYgd2UgdGhlbiByZXZlcnNlKCkgdGhhdCB0aW1lbGluZSwgdGhlIHplcm8tZHVyYXRpb24gdHdlZW4gd2lsbCB0cmlnZ2VyIGl0cyBvblJldmVyc2VDb21wbGV0ZSBldmVuIHRob3VnaCB0ZWNobmljYWxseSB0aGUgcGxheWhlYWQgZGlkbid0IHBhc3Mgb3ZlciBpdCBhZ2Fpbi4gSXQncyBhIHZlcnkgc3BlY2lmaWMgZWRnZSBjYXNlIHdlIG11c3QgYWNjb21tb2RhdGUuXG5cdFx0XHRcdFx0XHR0aW1lID0gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHByZXZSYXdQcmV2VGltZSA8IDAgfHwgKHRpbWUgPD0gMCAmJiB0aW1lID49IC0wLjAwMDAwMDEpIHx8IChwcmV2UmF3UHJldlRpbWUgPT09IF90aW55TnVtICYmIHRoaXMuZGF0YSAhPT0gXCJpc1BhdXNlXCIpKSBpZiAocHJldlJhd1ByZXZUaW1lICE9PSB0aW1lKSB7IC8vbm90ZTogd2hlbiB0aGlzLmRhdGEgaXMgXCJpc1BhdXNlXCIsIGl0J3MgYSBjYWxsYmFjayBhZGRlZCBieSBhZGRQYXVzZSgpIG9uIGEgdGltZWxpbmUgdGhhdCB3ZSBzaG91bGQgbm90IGJlIHRyaWdnZXJlZCB3aGVuIExFQVZJTkcgaXRzIGV4YWN0IHN0YXJ0IHRpbWUuIEluIG90aGVyIHdvcmRzLCB0bC5hZGRQYXVzZSgxKS5wbGF5KDEpIHNob3VsZG4ndCBwYXVzZS5cblx0XHRcdFx0XHRcdGZvcmNlID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGlmIChwcmV2UmF3UHJldlRpbWUgPiBfdGlueU51bSkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayA9IFwib25SZXZlcnNlQ29tcGxldGVcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5fcmF3UHJldlRpbWUgPSByYXdQcmV2VGltZSA9ICghc3VwcHJlc3NFdmVudHMgfHwgdGltZSB8fCBwcmV2UmF3UHJldlRpbWUgPT09IHRpbWUpID8gdGltZSA6IF90aW55TnVtOyAvL3doZW4gdGhlIHBsYXloZWFkIGFycml2ZXMgYXQgRVhBQ1RMWSB0aW1lIDAgKHJpZ2h0IG9uIHRvcCkgb2YgYSB6ZXJvLWR1cmF0aW9uIHR3ZWVuLCB3ZSBuZWVkIHRvIGRpc2Nlcm4gaWYgZXZlbnRzIGFyZSBzdXBwcmVzc2VkIHNvIHRoYXQgd2hlbiB0aGUgcGxheWhlYWQgbW92ZXMgYWdhaW4gKG5leHQgdGltZSksIGl0J2xsIHRyaWdnZXIgdGhlIGNhbGxiYWNrLiBJZiBldmVudHMgYXJlIE5PVCBzdXBwcmVzc2VkLCBvYnZpb3VzbHkgdGhlIGNhbGxiYWNrIHdvdWxkIGJlIHRyaWdnZXJlZCBpbiB0aGlzIHJlbmRlci4gQmFzaWNhbGx5LCB0aGUgY2FsbGJhY2sgc2hvdWxkIGZpcmUgZWl0aGVyIHdoZW4gdGhlIHBsYXloZWFkIEFSUklWRVMgb3IgTEVBVkVTIHRoaXMgZXhhY3Qgc3BvdCwgbm90IGJvdGguIEltYWdpbmUgZG9pbmcgYSB0aW1lbGluZS5zZWVrKDApIGFuZCB0aGVyZSdzIGEgY2FsbGJhY2sgdGhhdCBzaXRzIGF0IDAuIFNpbmNlIGV2ZW50cyBhcmUgc3VwcHJlc3NlZCBvbiB0aGF0IHNlZWsoKSBieSBkZWZhdWx0LCBub3RoaW5nIHdpbGwgZmlyZSwgYnV0IHdoZW4gdGhlIHBsYXloZWFkIG1vdmVzIG9mZiBvZiB0aGF0IHBvc2l0aW9uLCB0aGUgY2FsbGJhY2sgc2hvdWxkIGZpcmUuIFRoaXMgYmVoYXZpb3IgaXMgd2hhdCBwZW9wbGUgaW50dWl0aXZlbHkgZXhwZWN0LiBXZSBzZXQgdGhlIF9yYXdQcmV2VGltZSB0byBiZSBhIHByZWNpc2UgdGlueSBudW1iZXIgdG8gaW5kaWNhdGUgdGhpcyBzY2VuYXJpbyByYXRoZXIgdGhhbiB1c2luZyBhbm90aGVyIHByb3BlcnR5L3ZhcmlhYmxlIHdoaWNoIHdvdWxkIGluY3JlYXNlIG1lbW9yeSB1c2FnZS4gVGhpcyB0ZWNobmlxdWUgaXMgbGVzcyByZWFkYWJsZSwgYnV0IG1vcmUgZWZmaWNpZW50LlxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSBpZiAodGltZSA8IDAuMDAwMDAwMSkgeyAvL3RvIHdvcmsgYXJvdW5kIG9jY2FzaW9uYWwgZmxvYXRpbmcgcG9pbnQgbWF0aCBhcnRpZmFjdHMsIHJvdW5kIHN1cGVyIHNtYWxsIHZhbHVlcyB0byAwLlxuXHRcdFx0XHR0aGlzLl90b3RhbFRpbWUgPSB0aGlzLl90aW1lID0gMDtcblx0XHRcdFx0dGhpcy5yYXRpbyA9IHRoaXMuX2Vhc2UuX2NhbGNFbmQgPyB0aGlzLl9lYXNlLmdldFJhdGlvKDApIDogMDtcblx0XHRcdFx0aWYgKHByZXZUaW1lICE9PSAwIHx8IChkdXJhdGlvbiA9PT0gMCAmJiBwcmV2UmF3UHJldlRpbWUgPiAwKSkge1xuXHRcdFx0XHRcdGNhbGxiYWNrID0gXCJvblJldmVyc2VDb21wbGV0ZVwiO1xuXHRcdFx0XHRcdGlzQ29tcGxldGUgPSB0aGlzLl9yZXZlcnNlZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGltZSA8IDApIHtcblx0XHRcdFx0XHR0aGlzLl9hY3RpdmUgPSBmYWxzZTtcblx0XHRcdFx0XHRpZiAoZHVyYXRpb24gPT09IDApIGlmICh0aGlzLl9pbml0dGVkIHx8ICF0aGlzLnZhcnMubGF6eSB8fCBmb3JjZSkgeyAvL3plcm8tZHVyYXRpb24gdHdlZW5zIGFyZSB0cmlja3kgYmVjYXVzZSB3ZSBtdXN0IGRpc2Nlcm4gdGhlIG1vbWVudHVtL2RpcmVjdGlvbiBvZiB0aW1lIGluIG9yZGVyIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSBzdGFydGluZyB2YWx1ZXMgc2hvdWxkIGJlIHJlbmRlcmVkIG9yIHRoZSBlbmRpbmcgdmFsdWVzLiBJZiB0aGUgXCJwbGF5aGVhZFwiIG9mIGl0cyB0aW1lbGluZSBnb2VzIHBhc3QgdGhlIHplcm8tZHVyYXRpb24gdHdlZW4gaW4gdGhlIGZvcndhcmQgZGlyZWN0aW9uIG9yIGxhbmRzIGRpcmVjdGx5IG9uIGl0LCB0aGUgZW5kIHZhbHVlcyBzaG91bGQgYmUgcmVuZGVyZWQsIGJ1dCBpZiB0aGUgdGltZWxpbmUncyBcInBsYXloZWFkXCIgbW92ZXMgcGFzdCBpdCBpbiB0aGUgYmFja3dhcmQgZGlyZWN0aW9uIChmcm9tIGEgcG9zdGl0aXZlIHRpbWUgdG8gYSBuZWdhdGl2ZSB0aW1lKSwgdGhlIHN0YXJ0aW5nIHZhbHVlcyBtdXN0IGJlIHJlbmRlcmVkLlxuXHRcdFx0XHRcdFx0aWYgKHByZXZSYXdQcmV2VGltZSA+PSAwICYmICEocHJldlJhd1ByZXZUaW1lID09PSBfdGlueU51bSAmJiB0aGlzLmRhdGEgPT09IFwiaXNQYXVzZVwiKSkge1xuXHRcdFx0XHRcdFx0XHRmb3JjZSA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aGlzLl9yYXdQcmV2VGltZSA9IHJhd1ByZXZUaW1lID0gKCFzdXBwcmVzc0V2ZW50cyB8fCB0aW1lIHx8IHByZXZSYXdQcmV2VGltZSA9PT0gdGltZSkgPyB0aW1lIDogX3RpbnlOdW07IC8vd2hlbiB0aGUgcGxheWhlYWQgYXJyaXZlcyBhdCBFWEFDVExZIHRpbWUgMCAocmlnaHQgb24gdG9wKSBvZiBhIHplcm8tZHVyYXRpb24gdHdlZW4sIHdlIG5lZWQgdG8gZGlzY2VybiBpZiBldmVudHMgYXJlIHN1cHByZXNzZWQgc28gdGhhdCB3aGVuIHRoZSBwbGF5aGVhZCBtb3ZlcyBhZ2FpbiAobmV4dCB0aW1lKSwgaXQnbGwgdHJpZ2dlciB0aGUgY2FsbGJhY2suIElmIGV2ZW50cyBhcmUgTk9UIHN1cHByZXNzZWQsIG9idmlvdXNseSB0aGUgY2FsbGJhY2sgd291bGQgYmUgdHJpZ2dlcmVkIGluIHRoaXMgcmVuZGVyLiBCYXNpY2FsbHksIHRoZSBjYWxsYmFjayBzaG91bGQgZmlyZSBlaXRoZXIgd2hlbiB0aGUgcGxheWhlYWQgQVJSSVZFUyBvciBMRUFWRVMgdGhpcyBleGFjdCBzcG90LCBub3QgYm90aC4gSW1hZ2luZSBkb2luZyBhIHRpbWVsaW5lLnNlZWsoMCkgYW5kIHRoZXJlJ3MgYSBjYWxsYmFjayB0aGF0IHNpdHMgYXQgMC4gU2luY2UgZXZlbnRzIGFyZSBzdXBwcmVzc2VkIG9uIHRoYXQgc2VlaygpIGJ5IGRlZmF1bHQsIG5vdGhpbmcgd2lsbCBmaXJlLCBidXQgd2hlbiB0aGUgcGxheWhlYWQgbW92ZXMgb2ZmIG9mIHRoYXQgcG9zaXRpb24sIHRoZSBjYWxsYmFjayBzaG91bGQgZmlyZS4gVGhpcyBiZWhhdmlvciBpcyB3aGF0IHBlb3BsZSBpbnR1aXRpdmVseSBleHBlY3QuIFdlIHNldCB0aGUgX3Jhd1ByZXZUaW1lIHRvIGJlIGEgcHJlY2lzZSB0aW55IG51bWJlciB0byBpbmRpY2F0ZSB0aGlzIHNjZW5hcmlvIHJhdGhlciB0aGFuIHVzaW5nIGFub3RoZXIgcHJvcGVydHkvdmFyaWFibGUgd2hpY2ggd291bGQgaW5jcmVhc2UgbWVtb3J5IHVzYWdlLiBUaGlzIHRlY2huaXF1ZSBpcyBsZXNzIHJlYWRhYmxlLCBidXQgbW9yZSBlZmZpY2llbnQuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghdGhpcy5faW5pdHRlZCB8fCAodGhpcy5fc3RhcnRBdCAmJiB0aGlzLl9zdGFydEF0LnByb2dyZXNzKCkpKSB7IC8vaWYgd2UgcmVuZGVyIHRoZSB2ZXJ5IGJlZ2lubmluZyAodGltZSA9PSAwKSBvZiBhIGZyb21UbygpLCB3ZSBtdXN0IGZvcmNlIHRoZSByZW5kZXIgKG5vcm1hbCB0d2VlbnMgd291bGRuJ3QgbmVlZCB0byByZW5kZXIgYXQgYSB0aW1lIG9mIDAgd2hlbiB0aGUgcHJldlRpbWUgd2FzIGFsc28gMCkuIFRoaXMgaXMgYWxzbyBtYW5kYXRvcnkgdG8gbWFrZSBzdXJlIG92ZXJ3cml0aW5nIGtpY2tzIGluIGltbWVkaWF0ZWx5LiBBbHNvLCB3ZSBjaGVjayBwcm9ncmVzcygpIGJlY2F1c2UgaWYgc3RhcnRBdCBoYXMgYWxyZWFkeSByZW5kZXJlZCBhdCBpdHMgZW5kLCB3ZSBzaG91bGQgZm9yY2UgYSByZW5kZXIgYXQgaXRzIGJlZ2lubmluZy4gT3RoZXJ3aXNlLCBpZiB5b3UgcHV0IHRoZSBwbGF5aGVhZCBkaXJlY3RseSBvbiB0b3Agb2Ygd2hlcmUgYSBmcm9tVG8oe2ltbWVkaWF0ZVJlbmRlcjpmYWxzZX0pIHN0YXJ0cywgYW5kIHRoZW4gbW92ZSBpdCBiYWNrd2FyZHMsIHRoZSBmcm9tKCkgd29uJ3QgcmV2ZXJ0IGl0cyB2YWx1ZXMuXG5cdFx0XHRcdFx0Zm9yY2UgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl90b3RhbFRpbWUgPSB0aGlzLl90aW1lID0gdGltZTtcblxuXHRcdFx0XHRpZiAodGhpcy5fZWFzZVR5cGUpIHtcblx0XHRcdFx0XHR2YXIgciA9IHRpbWUgLyBkdXJhdGlvbiwgdHlwZSA9IHRoaXMuX2Vhc2VUeXBlLCBwb3cgPSB0aGlzLl9lYXNlUG93ZXI7XG5cdFx0XHRcdFx0aWYgKHR5cGUgPT09IDEgfHwgKHR5cGUgPT09IDMgJiYgciA+PSAwLjUpKSB7XG5cdFx0XHRcdFx0XHRyID0gMSAtIHI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0eXBlID09PSAzKSB7XG5cdFx0XHRcdFx0XHRyICo9IDI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChwb3cgPT09IDEpIHtcblx0XHRcdFx0XHRcdHIgKj0gcjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHBvdyA9PT0gMikge1xuXHRcdFx0XHRcdFx0ciAqPSByICogcjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHBvdyA9PT0gMykge1xuXHRcdFx0XHRcdFx0ciAqPSByICogciAqIHI7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwb3cgPT09IDQpIHtcblx0XHRcdFx0XHRcdHIgKj0gciAqIHIgKiByICogcjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gMSkge1xuXHRcdFx0XHRcdFx0dGhpcy5yYXRpbyA9IDEgLSByO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gMikge1xuXHRcdFx0XHRcdFx0dGhpcy5yYXRpbyA9IHI7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aW1lIC8gZHVyYXRpb24gPCAwLjUpIHtcblx0XHRcdFx0XHRcdHRoaXMucmF0aW8gPSByIC8gMjtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5yYXRpbyA9IDEgLSAociAvIDIpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMucmF0aW8gPSB0aGlzLl9lYXNlLmdldFJhdGlvKHRpbWUgLyBkdXJhdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX3RpbWUgPT09IHByZXZUaW1lICYmICFmb3JjZSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGVsc2UgaWYgKCF0aGlzLl9pbml0dGVkKSB7XG5cdFx0XHRcdHRoaXMuX2luaXQoKTtcblx0XHRcdFx0aWYgKCF0aGlzLl9pbml0dGVkIHx8IHRoaXMuX2djKSB7IC8vaW1tZWRpYXRlUmVuZGVyIHR3ZWVucyB0eXBpY2FsbHkgd29uJ3QgaW5pdGlhbGl6ZSB1bnRpbCB0aGUgcGxheWhlYWQgYWR2YW5jZXMgKF90aW1lIGlzIGdyZWF0ZXIgdGhhbiAwKSBpbiBvcmRlciB0byBlbnN1cmUgdGhhdCBvdmVyd3JpdGluZyBvY2N1cnMgcHJvcGVybHkuIEFsc28sIGlmIGFsbCBvZiB0aGUgdHdlZW5pbmcgcHJvcGVydGllcyBoYXZlIGJlZW4gb3ZlcndyaXR0ZW4gKHdoaWNoIHdvdWxkIGNhdXNlIF9nYyB0byBiZSB0cnVlLCBhcyBzZXQgaW4gX2luaXQoKSksIHdlIHNob3VsZG4ndCBjb250aW51ZSBvdGhlcndpc2UgYW4gb25TdGFydCBjYWxsYmFjayBjb3VsZCBiZSBjYWxsZWQgZm9yIGV4YW1wbGUuXG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFmb3JjZSAmJiB0aGlzLl9maXJzdFBUICYmICgodGhpcy52YXJzLmxhenkgIT09IGZhbHNlICYmIHRoaXMuX2R1cmF0aW9uKSB8fCAodGhpcy52YXJzLmxhenkgJiYgIXRoaXMuX2R1cmF0aW9uKSkpIHtcblx0XHRcdFx0XHR0aGlzLl90aW1lID0gdGhpcy5fdG90YWxUaW1lID0gcHJldlRpbWU7XG5cdFx0XHRcdFx0dGhpcy5fcmF3UHJldlRpbWUgPSBwcmV2UmF3UHJldlRpbWU7XG5cdFx0XHRcdFx0X2xhenlUd2VlbnMucHVzaCh0aGlzKTtcblx0XHRcdFx0XHR0aGlzLl9sYXp5ID0gW3RpbWUsIHN1cHByZXNzRXZlbnRzXTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly9fZWFzZSBpcyBpbml0aWFsbHkgc2V0IHRvIGRlZmF1bHRFYXNlLCBzbyBub3cgdGhhdCBpbml0KCkgaGFzIHJ1biwgX2Vhc2UgaXMgc2V0IHByb3Blcmx5IGFuZCB3ZSBuZWVkIHRvIHJlY2FsY3VsYXRlIHRoZSByYXRpby4gT3ZlcmFsbCB0aGlzIGlzIGZhc3RlciB0aGFuIHVzaW5nIGNvbmRpdGlvbmFsIGxvZ2ljIGVhcmxpZXIgaW4gdGhlIG1ldGhvZCB0byBhdm9pZCBoYXZpbmcgdG8gc2V0IHJhdGlvIHR3aWNlIGJlY2F1c2Ugd2Ugb25seSBpbml0KCkgb25jZSBidXQgcmVuZGVyVGltZSgpIGdldHMgY2FsbGVkIFZFUlkgZnJlcXVlbnRseS5cblx0XHRcdFx0aWYgKHRoaXMuX3RpbWUgJiYgIWlzQ29tcGxldGUpIHtcblx0XHRcdFx0XHR0aGlzLnJhdGlvID0gdGhpcy5fZWFzZS5nZXRSYXRpbyh0aGlzLl90aW1lIC8gZHVyYXRpb24pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGlzQ29tcGxldGUgJiYgdGhpcy5fZWFzZS5fY2FsY0VuZCkge1xuXHRcdFx0XHRcdHRoaXMucmF0aW8gPSB0aGlzLl9lYXNlLmdldFJhdGlvKCh0aGlzLl90aW1lID09PSAwKSA/IDAgOiAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX2xhenkgIT09IGZhbHNlKSB7IC8vaW4gY2FzZSBhIGxhenkgcmVuZGVyIGlzIHBlbmRpbmcsIHdlIHNob3VsZCBmbHVzaCBpdCBiZWNhdXNlIHRoZSBuZXcgcmVuZGVyIGlzIG9jY3VycmluZyBub3cgKGltYWdpbmUgYSBsYXp5IHR3ZWVuIGluc3RhbnRpYXRpbmcgYW5kIHRoZW4gaW1tZWRpYXRlbHkgdGhlIHVzZXIgY2FsbHMgdHdlZW4uc2Vlayh0d2Vlbi5kdXJhdGlvbigpKSwgc2tpcHBpbmcgdG8gdGhlIGVuZCAtIHRoZSBlbmQgcmVuZGVyIHdvdWxkIGJlIGZvcmNlZCwgYW5kIHRoZW4gaWYgd2UgZGlkbid0IGZsdXNoIHRoZSBsYXp5IHJlbmRlciwgaXQnZCBmaXJlIEFGVEVSIHRoZSBzZWVrKCksIHJlbmRlcmluZyBpdCBhdCB0aGUgd3JvbmcgdGltZS5cblx0XHRcdFx0dGhpcy5fbGF6eSA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCF0aGlzLl9hY3RpdmUpIGlmICghdGhpcy5fcGF1c2VkICYmIHRoaXMuX3RpbWUgIT09IHByZXZUaW1lICYmIHRpbWUgPj0gMCkge1xuXHRcdFx0XHR0aGlzLl9hY3RpdmUgPSB0cnVlOyAgLy9zbyB0aGF0IGlmIHRoZSB1c2VyIHJlbmRlcnMgYSB0d2VlbiAoYXMgb3Bwb3NlZCB0byB0aGUgdGltZWxpbmUgcmVuZGVyaW5nIGl0KSwgdGhlIHRpbWVsaW5lIGlzIGZvcmNlZCB0byByZS1yZW5kZXIgYW5kIGFsaWduIGl0IHdpdGggdGhlIHByb3BlciB0aW1lL2ZyYW1lIG9uIHRoZSBuZXh0IHJlbmRlcmluZyBjeWNsZS4gTWF5YmUgdGhlIHR3ZWVuIGFscmVhZHkgZmluaXNoZWQgYnV0IHRoZSB1c2VyIG1hbnVhbGx5IHJlLXJlbmRlcnMgaXQgYXMgaGFsZndheSBkb25lLlxuXHRcdFx0fVxuXHRcdFx0aWYgKHByZXZUaW1lID09PSAwKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9zdGFydEF0KSB7XG5cdFx0XHRcdFx0aWYgKHRpbWUgPj0gMCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fc3RhcnRBdC5yZW5kZXIodGltZSwgdHJ1ZSwgZm9yY2UpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIWNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRjYWxsYmFjayA9IFwiX2R1bW15R1NcIjsgLy9pZiBubyBjYWxsYmFjayBpcyBkZWZpbmVkLCB1c2UgYSBkdW1teSB2YWx1ZSBqdXN0IHNvIHRoYXQgdGhlIGNvbmRpdGlvbiBhdCB0aGUgZW5kIGV2YWx1YXRlcyBhcyB0cnVlIGJlY2F1c2UgX3N0YXJ0QXQgc2hvdWxkIHJlbmRlciBBRlRFUiB0aGUgbm9ybWFsIHJlbmRlciBsb29wIHdoZW4gdGhlIHRpbWUgaXMgbmVnYXRpdmUuIFdlIGNvdWxkIGhhbmRsZSB0aGlzIGluIGEgbW9yZSBpbnR1aXRpdmUgd2F5LCBvZiBjb3Vyc2UsIGJ1dCB0aGUgcmVuZGVyIGxvb3AgaXMgdGhlIE1PU1QgaW1wb3J0YW50IHRoaW5nIHRvIG9wdGltaXplLCBzbyB0aGlzIHRlY2huaXF1ZSBhbGxvd3MgdXMgdG8gYXZvaWQgYWRkaW5nIGV4dHJhIGNvbmRpdGlvbmFsIGxvZ2ljIGluIGEgaGlnaC1mcmVxdWVuY3kgYXJlYS5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMudmFycy5vblN0YXJ0KSBpZiAodGhpcy5fdGltZSAhPT0gMCB8fCBkdXJhdGlvbiA9PT0gMCkgaWYgKCFzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0XHRcdHRoaXMuX2NhbGxiYWNrKFwib25TdGFydFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cHQgPSB0aGlzLl9maXJzdFBUO1xuXHRcdFx0d2hpbGUgKHB0KSB7XG5cdFx0XHRcdGlmIChwdC5mKSB7XG5cdFx0XHRcdFx0cHQudFtwdC5wXShwdC5jICogdGhpcy5yYXRpbyArIHB0LnMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHB0LnRbcHQucF0gPSBwdC5jICogdGhpcy5yYXRpbyArIHB0LnM7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHQgPSBwdC5fbmV4dDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX29uVXBkYXRlKSB7XG5cdFx0XHRcdGlmICh0aW1lIDwgMCkgaWYgKHRoaXMuX3N0YXJ0QXQgJiYgdGltZSAhPT0gLTAuMDAwMSkgeyAvL2lmIHRoZSB0d2VlbiBpcyBwb3NpdGlvbmVkIGF0IHRoZSBWRVJZIGJlZ2lubmluZyAoX3N0YXJ0VGltZSAwKSBvZiBpdHMgcGFyZW50IHRpbWVsaW5lLCBpdCdzIGlsbGVnYWwgZm9yIHRoZSBwbGF5aGVhZCB0byBnbyBiYWNrIGZ1cnRoZXIsIHNvIHdlIHNob3VsZCBub3QgcmVuZGVyIHRoZSByZWNvcmRlZCBzdGFydEF0IHZhbHVlcy5cblx0XHRcdFx0XHR0aGlzLl9zdGFydEF0LnJlbmRlcih0aW1lLCB0cnVlLCBmb3JjZSk7IC8vbm90ZTogZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIHdlIHR1Y2sgdGhpcyBjb25kaXRpb25hbCBsb2dpYyBpbnNpZGUgbGVzcyB0cmF2ZWxlZCBhcmVhcyAobW9zdCB0d2VlbnMgZG9uJ3QgaGF2ZSBhbiBvblVwZGF0ZSkuIFdlJ2QganVzdCBoYXZlIGl0IGF0IHRoZSBlbmQgYmVmb3JlIHRoZSBvbkNvbXBsZXRlLCBidXQgdGhlIHZhbHVlcyBzaG91bGQgYmUgdXBkYXRlZCBiZWZvcmUgYW55IG9uVXBkYXRlIGlzIGNhbGxlZCwgc28gd2UgQUxTTyBwdXQgaXQgaGVyZSBhbmQgdGhlbiBpZiBpdCdzIG5vdCBjYWxsZWQsIHdlIGRvIHNvIGxhdGVyIG5lYXIgdGhlIG9uQ29tcGxldGUuXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFzdXBwcmVzc0V2ZW50cykgaWYgKHRoaXMuX3RpbWUgIT09IHByZXZUaW1lIHx8IGlzQ29tcGxldGUgfHwgZm9yY2UpIHtcblx0XHRcdFx0XHR0aGlzLl9jYWxsYmFjayhcIm9uVXBkYXRlXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoY2FsbGJhY2spIGlmICghdGhpcy5fZ2MgfHwgZm9yY2UpIHsgLy9jaGVjayBfZ2MgYmVjYXVzZSB0aGVyZSdzIGEgY2hhbmNlIHRoYXQga2lsbCgpIGNvdWxkIGJlIGNhbGxlZCBpbiBhbiBvblVwZGF0ZVxuXHRcdFx0XHRpZiAodGltZSA8IDAgJiYgdGhpcy5fc3RhcnRBdCAmJiAhdGhpcy5fb25VcGRhdGUgJiYgdGltZSAhPT0gLTAuMDAwMSkgeyAvLy0wLjAwMDEgaXMgYSBzcGVjaWFsIHZhbHVlIHRoYXQgd2UgdXNlIHdoZW4gbG9vcGluZyBiYWNrIHRvIHRoZSBiZWdpbm5pbmcgb2YgYSByZXBlYXRlZCBUaW1lbGluZU1heCwgaW4gd2hpY2ggY2FzZSB3ZSBzaG91bGRuJ3QgcmVuZGVyIHRoZSBfc3RhcnRBdCB2YWx1ZXMuXG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRBdC5yZW5kZXIodGltZSwgdHJ1ZSwgZm9yY2UpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChpc0NvbXBsZXRlKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX3RpbWVsaW5lLmF1dG9SZW1vdmVDaGlsZHJlbikge1xuXHRcdFx0XHRcdFx0dGhpcy5fZW5hYmxlZChmYWxzZSwgZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLl9hY3RpdmUgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXN1cHByZXNzRXZlbnRzICYmIHRoaXMudmFyc1tjYWxsYmFja10pIHtcblx0XHRcdFx0XHR0aGlzLl9jYWxsYmFjayhjYWxsYmFjayk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGR1cmF0aW9uID09PSAwICYmIHRoaXMuX3Jhd1ByZXZUaW1lID09PSBfdGlueU51bSAmJiByYXdQcmV2VGltZSAhPT0gX3RpbnlOdW0pIHsgLy90aGUgb25Db21wbGV0ZSBvciBvblJldmVyc2VDb21wbGV0ZSBjb3VsZCB0cmlnZ2VyIG1vdmVtZW50IG9mIHRoZSBwbGF5aGVhZCBhbmQgZm9yIHplcm8tZHVyYXRpb24gdHdlZW5zICh3aGljaCBtdXN0IGRpc2Nlcm4gZGlyZWN0aW9uKSB0aGF0IGxhbmQgZGlyZWN0bHkgYmFjayBvbiB0aGVpciBzdGFydCB0aW1lLCB3ZSBkb24ndCB3YW50IHRvIGZpcmUgYWdhaW4gb24gdGhlIG5leHQgcmVuZGVyLiBUaGluayBvZiBzZXZlcmFsIGFkZFBhdXNlKCkncyBpbiBhIHRpbWVsaW5lIHRoYXQgZm9yY2VzIHRoZSBwbGF5aGVhZCB0byBhIGNlcnRhaW4gc3BvdCwgYnV0IHdoYXQgaWYgaXQncyBhbHJlYWR5IHBhdXNlZCBhbmQgYW5vdGhlciB0d2VlbiBpcyB0d2VlbmluZyB0aGUgXCJ0aW1lXCIgb2YgdGhlIHRpbWVsaW5lPyBFYWNoIHRpbWUgaXQgbW92ZXMgW2ZvcndhcmRdIHBhc3QgdGhhdCBzcG90LCBpdCB3b3VsZCBtb3ZlIGJhY2ssIGFuZCBzaW5jZSBzdXBwcmVzc0V2ZW50cyBpcyB0cnVlLCBpdCdkIHJlc2V0IF9yYXdQcmV2VGltZSB0byBfdGlueU51bSBzbyB0aGF0IHdoZW4gaXQgYmVnaW5zIGFnYWluLCB0aGUgY2FsbGJhY2sgd291bGQgZmlyZSAoc28gdWx0aW1hdGVseSBpdCBjb3VsZCBib3VuY2UgYmFjayBhbmQgZm9ydGggZHVyaW5nIHRoYXQgdHdlZW4pLiBBZ2FpbiwgdGhpcyBpcyBhIHZlcnkgdW5jb21tb24gc2NlbmFyaW8sIGJ1dCBwb3NzaWJsZSBub25ldGhlbGVzcy5cblx0XHRcdFx0XHR0aGlzLl9yYXdQcmV2VGltZSA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cC5fa2lsbCA9IGZ1bmN0aW9uKHZhcnMsIHRhcmdldCwgb3ZlcndyaXRpbmdUd2Vlbikge1xuXHRcdFx0aWYgKHZhcnMgPT09IFwiYWxsXCIpIHtcblx0XHRcdFx0dmFycyA9IG51bGw7XG5cdFx0XHR9XG5cdFx0XHRpZiAodmFycyA9PSBudWxsKSBpZiAodGFyZ2V0ID09IG51bGwgfHwgdGFyZ2V0ID09PSB0aGlzLnRhcmdldCkge1xuXHRcdFx0XHR0aGlzLl9sYXp5ID0gZmFsc2U7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9lbmFibGVkKGZhbHNlLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHR0YXJnZXQgPSAodHlwZW9mKHRhcmdldCkgIT09IFwic3RyaW5nXCIpID8gKHRhcmdldCB8fCB0aGlzLl90YXJnZXRzIHx8IHRoaXMudGFyZ2V0KSA6IFR3ZWVuTGl0ZS5zZWxlY3Rvcih0YXJnZXQpIHx8IHRhcmdldDtcblx0XHRcdHZhciBzaW11bHRhbmVvdXNPdmVyd3JpdGUgPSAob3ZlcndyaXRpbmdUd2VlbiAmJiB0aGlzLl90aW1lICYmIG92ZXJ3cml0aW5nVHdlZW4uX3N0YXJ0VGltZSA9PT0gdGhpcy5fc3RhcnRUaW1lICYmIHRoaXMuX3RpbWVsaW5lID09PSBvdmVyd3JpdGluZ1R3ZWVuLl90aW1lbGluZSksXG5cdFx0XHRcdGksIG92ZXJ3cml0dGVuUHJvcHMsIHAsIHB0LCBwcm9wTG9va3VwLCBjaGFuZ2VkLCBraWxsUHJvcHMsIHJlY29yZCwga2lsbGVkO1xuXHRcdFx0aWYgKChfaXNBcnJheSh0YXJnZXQpIHx8IF9pc1NlbGVjdG9yKHRhcmdldCkpICYmIHR5cGVvZih0YXJnZXRbMF0pICE9PSBcIm51bWJlclwiKSB7XG5cdFx0XHRcdGkgPSB0YXJnZXQubGVuZ3RoO1xuXHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5fa2lsbCh2YXJzLCB0YXJnZXRbaV0sIG92ZXJ3cml0aW5nVHdlZW4pKSB7XG5cdFx0XHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLl90YXJnZXRzKSB7XG5cdFx0XHRcdFx0aSA9IHRoaXMuX3RhcmdldHMubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdFx0aWYgKHRhcmdldCA9PT0gdGhpcy5fdGFyZ2V0c1tpXSkge1xuXHRcdFx0XHRcdFx0XHRwcm9wTG9va3VwID0gdGhpcy5fcHJvcExvb2t1cFtpXSB8fCB7fTtcblx0XHRcdFx0XHRcdFx0dGhpcy5fb3ZlcndyaXR0ZW5Qcm9wcyA9IHRoaXMuX292ZXJ3cml0dGVuUHJvcHMgfHwgW107XG5cdFx0XHRcdFx0XHRcdG92ZXJ3cml0dGVuUHJvcHMgPSB0aGlzLl9vdmVyd3JpdHRlblByb3BzW2ldID0gdmFycyA/IHRoaXMuX292ZXJ3cml0dGVuUHJvcHNbaV0gfHwge30gOiBcImFsbFwiO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAodGFyZ2V0ICE9PSB0aGlzLnRhcmdldCkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwcm9wTG9va3VwID0gdGhpcy5fcHJvcExvb2t1cDtcblx0XHRcdFx0XHRvdmVyd3JpdHRlblByb3BzID0gdGhpcy5fb3ZlcndyaXR0ZW5Qcm9wcyA9IHZhcnMgPyB0aGlzLl9vdmVyd3JpdHRlblByb3BzIHx8IHt9IDogXCJhbGxcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChwcm9wTG9va3VwKSB7XG5cdFx0XHRcdFx0a2lsbFByb3BzID0gdmFycyB8fCBwcm9wTG9va3VwO1xuXHRcdFx0XHRcdHJlY29yZCA9ICh2YXJzICE9PSBvdmVyd3JpdHRlblByb3BzICYmIG92ZXJ3cml0dGVuUHJvcHMgIT09IFwiYWxsXCIgJiYgdmFycyAhPT0gcHJvcExvb2t1cCAmJiAodHlwZW9mKHZhcnMpICE9PSBcIm9iamVjdFwiIHx8ICF2YXJzLl90ZW1wS2lsbCkpOyAvL190ZW1wS2lsbCBpcyBhIHN1cGVyLXNlY3JldCB3YXkgdG8gZGVsZXRlIGEgcGFydGljdWxhciB0d2VlbmluZyBwcm9wZXJ0eSBidXQgTk9UIGhhdmUgaXQgcmVtZW1iZXJlZCBhcyBhbiBvZmZpY2lhbCBvdmVyd3JpdHRlbiBwcm9wZXJ0eSAobGlrZSBpbiBCZXppZXJQbHVnaW4pXG5cdFx0XHRcdFx0aWYgKG92ZXJ3cml0aW5nVHdlZW4gJiYgKFR3ZWVuTGl0ZS5vbk92ZXJ3cml0ZSB8fCB0aGlzLnZhcnMub25PdmVyd3JpdGUpKSB7XG5cdFx0XHRcdFx0XHRmb3IgKHAgaW4ga2lsbFByb3BzKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChwcm9wTG9va3VwW3BdKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFraWxsZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGtpbGxlZCA9IFtdO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRraWxsZWQucHVzaChwKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKChraWxsZWQgfHwgIXZhcnMpICYmICFfb25PdmVyd3JpdGUodGhpcywgb3ZlcndyaXRpbmdUd2VlbiwgdGFyZ2V0LCBraWxsZWQpKSB7IC8vaWYgdGhlIG9uT3ZlcndyaXRlIHJldHVybmVkIGZhbHNlLCB0aGF0IG1lYW5zIHRoZSB1c2VyIHdhbnRzIHRvIG92ZXJyaWRlIHRoZSBvdmVyd3JpdGluZyAoY2FuY2VsIGl0KS5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvciAocCBpbiBraWxsUHJvcHMpIHtcblx0XHRcdFx0XHRcdGlmICgocHQgPSBwcm9wTG9va3VwW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoc2ltdWx0YW5lb3VzT3ZlcndyaXRlKSB7IC8vaWYgYW5vdGhlciB0d2VlbiBvdmVyd3JpdGVzIHRoaXMgb25lIGFuZCB0aGV5IGJvdGggc3RhcnQgYXQgZXhhY3RseSB0aGUgc2FtZSB0aW1lLCB5ZXQgdGhpcyB0d2VlbiBoYXMgYWxyZWFkeSByZW5kZXJlZCBvbmNlIChmb3IgZXhhbXBsZSwgYXQgMC4wMDEpIGJlY2F1c2UgaXQncyBmaXJzdCBpbiB0aGUgcXVldWUsIHdlIHNob3VsZCByZXZlcnQgdGhlIHZhbHVlcyB0byB3aGVyZSB0aGV5IHdlcmUgYXQgMCBzbyB0aGF0IHRoZSBzdGFydGluZyB2YWx1ZXMgYXJlbid0IGNvbnRhbWluYXRlZCBvbiB0aGUgb3ZlcndyaXRpbmcgdHdlZW4uXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHB0LmYpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHB0LnRbcHQucF0ocHQucyk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdHB0LnRbcHQucF0gPSBwdC5zO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAocHQucGcgJiYgcHQudC5fa2lsbChraWxsUHJvcHMpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7IC8vc29tZSBwbHVnaW5zIG5lZWQgdG8gYmUgbm90aWZpZWQgc28gdGhleSBjYW4gcGVyZm9ybSBjbGVhbnVwIHRhc2tzIGZpcnN0XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCFwdC5wZyB8fCBwdC50Ll9vdmVyd3JpdGVQcm9wcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAocHQuX3ByZXYpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHB0Ll9wcmV2Ll9uZXh0ID0gcHQuX25leHQ7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChwdCA9PT0gdGhpcy5fZmlyc3RQVCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fZmlyc3RQVCA9IHB0Ll9uZXh0O1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZiAocHQuX25leHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHB0Ll9uZXh0Ll9wcmV2ID0gcHQuX3ByZXY7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHB0Ll9uZXh0ID0gcHQuX3ByZXYgPSBudWxsO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBwcm9wTG9va3VwW3BdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKHJlY29yZCkge1xuXHRcdFx0XHRcdFx0XHRvdmVyd3JpdHRlblByb3BzW3BdID0gMTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCF0aGlzLl9maXJzdFBUICYmIHRoaXMuX2luaXR0ZWQpIHsgLy9pZiBhbGwgdHdlZW5pbmcgcHJvcGVydGllcyBhcmUga2lsbGVkLCBraWxsIHRoZSB0d2Vlbi4gV2l0aG91dCB0aGlzIGxpbmUsIGlmIHRoZXJlJ3MgYSB0d2VlbiB3aXRoIG11bHRpcGxlIHRhcmdldHMgYW5kIHRoZW4geW91IGtpbGxUd2VlbnNPZigpIGVhY2ggdGFyZ2V0IGluZGl2aWR1YWxseSwgdGhlIHR3ZWVuIHdvdWxkIHRlY2huaWNhbGx5IHN0aWxsIHJlbWFpbiBhY3RpdmUgYW5kIGZpcmUgaXRzIG9uQ29tcGxldGUgZXZlbiB0aG91Z2ggdGhlcmUgYXJlbid0IGFueSBtb3JlIHByb3BlcnRpZXMgdHdlZW5pbmcuXG5cdFx0XHRcdFx0XHR0aGlzLl9lbmFibGVkKGZhbHNlLCBmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY2hhbmdlZDtcblx0XHR9O1xuXG5cdFx0cC5pbnZhbGlkYXRlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAodGhpcy5fbm90aWZ5UGx1Z2luc09mRW5hYmxlZCkge1xuXHRcdFx0XHRUd2VlbkxpdGUuX29uUGx1Z2luRXZlbnQoXCJfb25EaXNhYmxlXCIsIHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fZmlyc3RQVCA9IHRoaXMuX292ZXJ3cml0dGVuUHJvcHMgPSB0aGlzLl9zdGFydEF0ID0gdGhpcy5fb25VcGRhdGUgPSBudWxsO1xuXHRcdFx0dGhpcy5fbm90aWZ5UGx1Z2luc09mRW5hYmxlZCA9IHRoaXMuX2FjdGl2ZSA9IHRoaXMuX2xhenkgPSBmYWxzZTtcblx0XHRcdHRoaXMuX3Byb3BMb29rdXAgPSAodGhpcy5fdGFyZ2V0cykgPyB7fSA6IFtdO1xuXHRcdFx0QW5pbWF0aW9uLnByb3RvdHlwZS5pbnZhbGlkYXRlLmNhbGwodGhpcyk7XG5cdFx0XHRpZiAodGhpcy52YXJzLmltbWVkaWF0ZVJlbmRlcikge1xuXHRcdFx0XHR0aGlzLl90aW1lID0gLV90aW55TnVtOyAvL2ZvcmNlcyBhIHJlbmRlciB3aXRob3V0IGhhdmluZyB0byBzZXQgdGhlIHJlbmRlcigpIFwiZm9yY2VcIiBwYXJhbWV0ZXIgdG8gdHJ1ZSBiZWNhdXNlIHdlIHdhbnQgdG8gYWxsb3cgbGF6eWluZyBieSBkZWZhdWx0ICh1c2luZyB0aGUgXCJmb3JjZVwiIHBhcmFtZXRlciBhbHdheXMgZm9yY2VzIGFuIGltbWVkaWF0ZSBmdWxsIHJlbmRlcilcblx0XHRcdFx0dGhpcy5yZW5kZXIoTWF0aC5taW4oMCwgLXRoaXMuX2RlbGF5KSk7IC8vaW4gY2FzZSBkZWxheSBpcyBuZWdhdGl2ZS5cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cblx0XHRwLl9lbmFibGVkID0gZnVuY3Rpb24oZW5hYmxlZCwgaWdub3JlVGltZWxpbmUpIHtcblx0XHRcdGlmICghX3RpY2tlckFjdGl2ZSkge1xuXHRcdFx0XHRfdGlja2VyLndha2UoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlbmFibGVkICYmIHRoaXMuX2djKSB7XG5cdFx0XHRcdHZhciB0YXJnZXRzID0gdGhpcy5fdGFyZ2V0cyxcblx0XHRcdFx0XHRpO1xuXHRcdFx0XHRpZiAodGFyZ2V0cykge1xuXHRcdFx0XHRcdGkgPSB0YXJnZXRzLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3NpYmxpbmdzW2ldID0gX3JlZ2lzdGVyKHRhcmdldHNbaV0sIHRoaXMsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9zaWJsaW5ncyA9IF9yZWdpc3Rlcih0aGlzLnRhcmdldCwgdGhpcywgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdEFuaW1hdGlvbi5wcm90b3R5cGUuX2VuYWJsZWQuY2FsbCh0aGlzLCBlbmFibGVkLCBpZ25vcmVUaW1lbGluZSk7XG5cdFx0XHRpZiAodGhpcy5fbm90aWZ5UGx1Z2luc09mRW5hYmxlZCkgaWYgKHRoaXMuX2ZpcnN0UFQpIHtcblx0XHRcdFx0cmV0dXJuIFR3ZWVuTGl0ZS5fb25QbHVnaW5FdmVudCgoZW5hYmxlZCA/IFwiX29uRW5hYmxlXCIgOiBcIl9vbkRpc2FibGVcIiksIHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblxuLy8tLS0tVHdlZW5MaXRlIHN0YXRpYyBtZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRUd2VlbkxpdGUudG8gPSBmdW5jdGlvbih0YXJnZXQsIGR1cmF0aW9uLCB2YXJzKSB7XG5cdFx0XHRyZXR1cm4gbmV3IFR3ZWVuTGl0ZSh0YXJnZXQsIGR1cmF0aW9uLCB2YXJzKTtcblx0XHR9O1xuXG5cdFx0VHdlZW5MaXRlLmZyb20gPSBmdW5jdGlvbih0YXJnZXQsIGR1cmF0aW9uLCB2YXJzKSB7XG5cdFx0XHR2YXJzLnJ1bkJhY2t3YXJkcyA9IHRydWU7XG5cdFx0XHR2YXJzLmltbWVkaWF0ZVJlbmRlciA9ICh2YXJzLmltbWVkaWF0ZVJlbmRlciAhPSBmYWxzZSk7XG5cdFx0XHRyZXR1cm4gbmV3IFR3ZWVuTGl0ZSh0YXJnZXQsIGR1cmF0aW9uLCB2YXJzKTtcblx0XHR9O1xuXG5cdFx0VHdlZW5MaXRlLmZyb21UbyA9IGZ1bmN0aW9uKHRhcmdldCwgZHVyYXRpb24sIGZyb21WYXJzLCB0b1ZhcnMpIHtcblx0XHRcdHRvVmFycy5zdGFydEF0ID0gZnJvbVZhcnM7XG5cdFx0XHR0b1ZhcnMuaW1tZWRpYXRlUmVuZGVyID0gKHRvVmFycy5pbW1lZGlhdGVSZW5kZXIgIT0gZmFsc2UgJiYgZnJvbVZhcnMuaW1tZWRpYXRlUmVuZGVyICE9IGZhbHNlKTtcblx0XHRcdHJldHVybiBuZXcgVHdlZW5MaXRlKHRhcmdldCwgZHVyYXRpb24sIHRvVmFycyk7XG5cdFx0fTtcblxuXHRcdFR3ZWVuTGl0ZS5kZWxheWVkQ2FsbCA9IGZ1bmN0aW9uKGRlbGF5LCBjYWxsYmFjaywgcGFyYW1zLCBzY29wZSwgdXNlRnJhbWVzKSB7XG5cdFx0XHRyZXR1cm4gbmV3IFR3ZWVuTGl0ZShjYWxsYmFjaywgMCwge2RlbGF5OmRlbGF5LCBvbkNvbXBsZXRlOmNhbGxiYWNrLCBvbkNvbXBsZXRlUGFyYW1zOnBhcmFtcywgY2FsbGJhY2tTY29wZTpzY29wZSwgb25SZXZlcnNlQ29tcGxldGU6Y2FsbGJhY2ssIG9uUmV2ZXJzZUNvbXBsZXRlUGFyYW1zOnBhcmFtcywgaW1tZWRpYXRlUmVuZGVyOmZhbHNlLCBsYXp5OmZhbHNlLCB1c2VGcmFtZXM6dXNlRnJhbWVzLCBvdmVyd3JpdGU6MH0pO1xuXHRcdH07XG5cblx0XHRUd2VlbkxpdGUuc2V0ID0gZnVuY3Rpb24odGFyZ2V0LCB2YXJzKSB7XG5cdFx0XHRyZXR1cm4gbmV3IFR3ZWVuTGl0ZSh0YXJnZXQsIDAsIHZhcnMpO1xuXHRcdH07XG5cblx0XHRUd2VlbkxpdGUuZ2V0VHdlZW5zT2YgPSBmdW5jdGlvbih0YXJnZXQsIG9ubHlBY3RpdmUpIHtcblx0XHRcdGlmICh0YXJnZXQgPT0gbnVsbCkgeyByZXR1cm4gW107IH1cblx0XHRcdHRhcmdldCA9ICh0eXBlb2YodGFyZ2V0KSAhPT0gXCJzdHJpbmdcIikgPyB0YXJnZXQgOiBUd2VlbkxpdGUuc2VsZWN0b3IodGFyZ2V0KSB8fCB0YXJnZXQ7XG5cdFx0XHR2YXIgaSwgYSwgaiwgdDtcblx0XHRcdGlmICgoX2lzQXJyYXkodGFyZ2V0KSB8fCBfaXNTZWxlY3Rvcih0YXJnZXQpKSAmJiB0eXBlb2YodGFyZ2V0WzBdKSAhPT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHRpID0gdGFyZ2V0Lmxlbmd0aDtcblx0XHRcdFx0YSA9IFtdO1xuXHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHRhID0gYS5jb25jYXQoVHdlZW5MaXRlLmdldFR3ZWVuc09mKHRhcmdldFtpXSwgb25seUFjdGl2ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGkgPSBhLmxlbmd0aDtcblx0XHRcdFx0Ly9ub3cgZ2V0IHJpZCBvZiBhbnkgZHVwbGljYXRlcyAodHdlZW5zIG9mIGFycmF5cyBvZiBvYmplY3RzIGNvdWxkIGNhdXNlIGR1cGxpY2F0ZXMpXG5cdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdHQgPSBhW2ldO1xuXHRcdFx0XHRcdGogPSBpO1xuXHRcdFx0XHRcdHdoaWxlICgtLWogPiAtMSkge1xuXHRcdFx0XHRcdFx0aWYgKHQgPT09IGFbal0pIHtcblx0XHRcdFx0XHRcdFx0YS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRhcmdldC5fZ3NUd2VlbklEKSB7XG5cdFx0XHRcdGEgPSBfcmVnaXN0ZXIodGFyZ2V0KS5jb25jYXQoKTtcblx0XHRcdFx0aSA9IGEubGVuZ3RoO1xuXHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHRpZiAoYVtpXS5fZ2MgfHwgKG9ubHlBY3RpdmUgJiYgIWFbaV0uaXNBY3RpdmUoKSkpIHtcblx0XHRcdFx0XHRcdGEuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGEgfHwgW107XG5cdFx0fTtcblxuXHRcdFR3ZWVuTGl0ZS5raWxsVHdlZW5zT2YgPSBUd2VlbkxpdGUua2lsbERlbGF5ZWRDYWxsc1RvID0gZnVuY3Rpb24odGFyZ2V0LCBvbmx5QWN0aXZlLCB2YXJzKSB7XG5cdFx0XHRpZiAodHlwZW9mKG9ubHlBY3RpdmUpID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdHZhcnMgPSBvbmx5QWN0aXZlOyAvL2ZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSAoYmVmb3JlIFwib25seUFjdGl2ZVwiIHBhcmFtZXRlciB3YXMgaW5zZXJ0ZWQpXG5cdFx0XHRcdG9ubHlBY3RpdmUgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHZhciBhID0gVHdlZW5MaXRlLmdldFR3ZWVuc09mKHRhcmdldCwgb25seUFjdGl2ZSksXG5cdFx0XHRcdGkgPSBhLmxlbmd0aDtcblx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRhW2ldLl9raWxsKHZhcnMsIHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUd2VlblBsdWdpbiAgIChjb3VsZCBlYXNpbHkgYmUgc3BsaXQgb3V0IGFzIGEgc2VwYXJhdGUgZmlsZS9jbGFzcywgYnV0IGluY2x1ZGVkIGZvciBlYXNlIG9mIHVzZSAoc28gdGhhdCBwZW9wbGUgZG9uJ3QgbmVlZCB0byBpbmNsdWRlIGFub3RoZXIgc2NyaXB0IGNhbGwgYmVmb3JlIGxvYWRpbmcgcGx1Z2lucyB3aGljaCBpcyBlYXN5IHRvIGZvcmdldClcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXHRcdHZhciBUd2VlblBsdWdpbiA9IF9jbGFzcyhcInBsdWdpbnMuVHdlZW5QbHVnaW5cIiwgZnVuY3Rpb24ocHJvcHMsIHByaW9yaXR5KSB7XG5cdFx0XHRcdFx0dGhpcy5fb3ZlcndyaXRlUHJvcHMgPSAocHJvcHMgfHwgXCJcIikuc3BsaXQoXCIsXCIpO1xuXHRcdFx0XHRcdHRoaXMuX3Byb3BOYW1lID0gdGhpcy5fb3ZlcndyaXRlUHJvcHNbMF07XG5cdFx0XHRcdFx0dGhpcy5fcHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdFx0XHRcdHRoaXMuX3N1cGVyID0gVHdlZW5QbHVnaW4ucHJvdG90eXBlO1xuXHRcdFx0XHR9LCB0cnVlKTtcblxuXHRcdHAgPSBUd2VlblBsdWdpbi5wcm90b3R5cGU7XG5cdFx0VHdlZW5QbHVnaW4udmVyc2lvbiA9IFwiMS4xOS4wXCI7XG5cdFx0VHdlZW5QbHVnaW4uQVBJID0gMjtcblx0XHRwLl9maXJzdFBUID0gbnVsbDtcblx0XHRwLl9hZGRUd2VlbiA9IF9hZGRQcm9wVHdlZW47XG5cdFx0cC5zZXRSYXRpbyA9IF9zZXRSYXRpbztcblxuXHRcdHAuX2tpbGwgPSBmdW5jdGlvbihsb29rdXApIHtcblx0XHRcdHZhciBhID0gdGhpcy5fb3ZlcndyaXRlUHJvcHMsXG5cdFx0XHRcdHB0ID0gdGhpcy5fZmlyc3RQVCxcblx0XHRcdFx0aTtcblx0XHRcdGlmIChsb29rdXBbdGhpcy5fcHJvcE5hbWVdICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fb3ZlcndyaXRlUHJvcHMgPSBbXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGkgPSBhLmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0aWYgKGxvb2t1cFthW2ldXSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRhLnNwbGljZShpLCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHdoaWxlIChwdCkge1xuXHRcdFx0XHRpZiAobG9va3VwW3B0Lm5dICE9IG51bGwpIHtcblx0XHRcdFx0XHRpZiAocHQuX25leHQpIHtcblx0XHRcdFx0XHRcdHB0Ll9uZXh0Ll9wcmV2ID0gcHQuX3ByZXY7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChwdC5fcHJldikge1xuXHRcdFx0XHRcdFx0cHQuX3ByZXYuX25leHQgPSBwdC5fbmV4dDtcblx0XHRcdFx0XHRcdHB0Ll9wcmV2ID0gbnVsbDtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2ZpcnN0UFQgPT09IHB0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9maXJzdFBUID0gcHQuX25leHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHB0ID0gcHQuX25leHQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHRcdHAuX21vZCA9IHAuX3JvdW5kUHJvcHMgPSBmdW5jdGlvbihsb29rdXApIHtcblx0XHRcdHZhciBwdCA9IHRoaXMuX2ZpcnN0UFQsXG5cdFx0XHRcdHZhbDtcblx0XHRcdHdoaWxlIChwdCkge1xuXHRcdFx0XHR2YWwgPSBsb29rdXBbdGhpcy5fcHJvcE5hbWVdIHx8IChwdC5uICE9IG51bGwgJiYgbG9va3VwWyBwdC5uLnNwbGl0KHRoaXMuX3Byb3BOYW1lICsgXCJfXCIpLmpvaW4oXCJcIikgXSk7XG5cdFx0XHRcdGlmICh2YWwgJiYgdHlwZW9mKHZhbCkgPT09IFwiZnVuY3Rpb25cIikgeyAvL3NvbWUgcHJvcGVydGllcyB0aGF0IGFyZSB2ZXJ5IHBsdWdpbi1zcGVjaWZpYyBhZGQgYSBwcmVmaXggbmFtZWQgYWZ0ZXIgdGhlIF9wcm9wTmFtZSBwbHVzIGFuIHVuZGVyc2NvcmUsIHNvIHdlIG5lZWQgdG8gaWdub3JlIHRoYXQgZXh0cmEgc3R1ZmYgaGVyZS5cblx0XHRcdFx0XHRpZiAocHQuZiA9PT0gMikge1xuXHRcdFx0XHRcdFx0cHQudC5fYXBwbHlQVC5tID0gdmFsO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRwdC5tID0gdmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRwdCA9IHB0Ll9uZXh0O1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRUd2VlbkxpdGUuX29uUGx1Z2luRXZlbnQgPSBmdW5jdGlvbih0eXBlLCB0d2Vlbikge1xuXHRcdFx0dmFyIHB0ID0gdHdlZW4uX2ZpcnN0UFQsXG5cdFx0XHRcdGNoYW5nZWQsIHB0MiwgZmlyc3QsIGxhc3QsIG5leHQ7XG5cdFx0XHRpZiAodHlwZSA9PT0gXCJfb25Jbml0QWxsUHJvcHNcIikge1xuXHRcdFx0XHQvL3NvcnRzIHRoZSBQcm9wVHdlZW4gbGlua2VkIGxpc3QgaW4gb3JkZXIgb2YgcHJpb3JpdHkgYmVjYXVzZSBzb21lIHBsdWdpbnMgbmVlZCB0byByZW5kZXIgZWFybGllci9sYXRlciB0aGFuIG90aGVycywgbGlrZSBNb3Rpb25CbHVyUGx1Z2luIGFwcGxpZXMgaXRzIGVmZmVjdHMgYWZ0ZXIgYWxsIHgveS9hbHBoYSB0d2VlbnMgaGF2ZSByZW5kZXJlZCBvbiBlYWNoIGZyYW1lLlxuXHRcdFx0XHR3aGlsZSAocHQpIHtcblx0XHRcdFx0XHRuZXh0ID0gcHQuX25leHQ7XG5cdFx0XHRcdFx0cHQyID0gZmlyc3Q7XG5cdFx0XHRcdFx0d2hpbGUgKHB0MiAmJiBwdDIucHIgPiBwdC5wcikge1xuXHRcdFx0XHRcdFx0cHQyID0gcHQyLl9uZXh0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoKHB0Ll9wcmV2ID0gcHQyID8gcHQyLl9wcmV2IDogbGFzdCkpIHtcblx0XHRcdFx0XHRcdHB0Ll9wcmV2Ll9uZXh0ID0gcHQ7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGZpcnN0ID0gcHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICgocHQuX25leHQgPSBwdDIpKSB7XG5cdFx0XHRcdFx0XHRwdDIuX3ByZXYgPSBwdDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bGFzdCA9IHB0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwdCA9IG5leHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHQgPSB0d2Vlbi5fZmlyc3RQVCA9IGZpcnN0O1xuXHRcdFx0fVxuXHRcdFx0d2hpbGUgKHB0KSB7XG5cdFx0XHRcdGlmIChwdC5wZykgaWYgKHR5cGVvZihwdC50W3R5cGVdKSA9PT0gXCJmdW5jdGlvblwiKSBpZiAocHQudFt0eXBlXSgpKSB7XG5cdFx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHQgPSBwdC5fbmV4dDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBjaGFuZ2VkO1xuXHRcdH07XG5cblx0XHRUd2VlblBsdWdpbi5hY3RpdmF0ZSA9IGZ1bmN0aW9uKHBsdWdpbnMpIHtcblx0XHRcdHZhciBpID0gcGx1Z2lucy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0aWYgKHBsdWdpbnNbaV0uQVBJID09PSBUd2VlblBsdWdpbi5BUEkpIHtcblx0XHRcdFx0XHRfcGx1Z2luc1sobmV3IHBsdWdpbnNbaV0oKSkuX3Byb3BOYW1lXSA9IHBsdWdpbnNbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH07XG5cblx0XHQvL3Byb3ZpZGVzIGEgbW9yZSBjb25jaXNlIHdheSB0byBkZWZpbmUgcGx1Z2lucyB0aGF0IGhhdmUgbm8gZGVwZW5kZW5jaWVzIGJlc2lkZXMgVHdlZW5QbHVnaW4gYW5kIFR3ZWVuTGl0ZSwgd3JhcHBpbmcgY29tbW9uIGJvaWxlcnBsYXRlIHN0dWZmIGludG8gb25lIGZ1bmN0aW9uIChhZGRlZCBpbiAxLjkuMCkuIFlvdSBkb24ndCBORUVEIHRvIHVzZSB0aGlzIHRvIGRlZmluZSBhIHBsdWdpbiAtIHRoZSBvbGQgd2F5IHN0aWxsIHdvcmtzIGFuZCBjYW4gYmUgdXNlZnVsIGluIGNlcnRhaW4gKHJhcmUpIHNpdHVhdGlvbnMuXG5cdFx0X2dzRGVmaW5lLnBsdWdpbiA9IGZ1bmN0aW9uKGNvbmZpZykge1xuXHRcdFx0aWYgKCFjb25maWcgfHwgIWNvbmZpZy5wcm9wTmFtZSB8fCAhY29uZmlnLmluaXQgfHwgIWNvbmZpZy5BUEkpIHsgdGhyb3cgXCJpbGxlZ2FsIHBsdWdpbiBkZWZpbml0aW9uLlwiOyB9XG5cdFx0XHR2YXIgcHJvcE5hbWUgPSBjb25maWcucHJvcE5hbWUsXG5cdFx0XHRcdHByaW9yaXR5ID0gY29uZmlnLnByaW9yaXR5IHx8IDAsXG5cdFx0XHRcdG92ZXJ3cml0ZVByb3BzID0gY29uZmlnLm92ZXJ3cml0ZVByb3BzLFxuXHRcdFx0XHRtYXAgPSB7aW5pdDpcIl9vbkluaXRUd2VlblwiLCBzZXQ6XCJzZXRSYXRpb1wiLCBraWxsOlwiX2tpbGxcIiwgcm91bmQ6XCJfbW9kXCIsIG1vZDpcIl9tb2RcIiwgaW5pdEFsbDpcIl9vbkluaXRBbGxQcm9wc1wifSxcblx0XHRcdFx0UGx1Z2luID0gX2NsYXNzKFwicGx1Z2lucy5cIiArIHByb3BOYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcE5hbWUuc3Vic3RyKDEpICsgXCJQbHVnaW5cIixcblx0XHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFR3ZWVuUGx1Z2luLmNhbGwodGhpcywgcHJvcE5hbWUsIHByaW9yaXR5KTtcblx0XHRcdFx0XHRcdHRoaXMuX292ZXJ3cml0ZVByb3BzID0gb3ZlcndyaXRlUHJvcHMgfHwgW107XG5cdFx0XHRcdFx0fSwgKGNvbmZpZy5nbG9iYWwgPT09IHRydWUpKSxcblx0XHRcdFx0cCA9IFBsdWdpbi5wcm90b3R5cGUgPSBuZXcgVHdlZW5QbHVnaW4ocHJvcE5hbWUpLFxuXHRcdFx0XHRwcm9wO1xuXHRcdFx0cC5jb25zdHJ1Y3RvciA9IFBsdWdpbjtcblx0XHRcdFBsdWdpbi5BUEkgPSBjb25maWcuQVBJO1xuXHRcdFx0Zm9yIChwcm9wIGluIG1hcCkge1xuXHRcdFx0XHRpZiAodHlwZW9mKGNvbmZpZ1twcm9wXSkgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdHBbbWFwW3Byb3BdXSA9IGNvbmZpZ1twcm9wXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0UGx1Z2luLnZlcnNpb24gPSBjb25maWcudmVyc2lvbjtcblx0XHRcdFR3ZWVuUGx1Z2luLmFjdGl2YXRlKFtQbHVnaW5dKTtcblx0XHRcdHJldHVybiBQbHVnaW47XG5cdFx0fTtcblxuXG5cdFx0Ly9ub3cgcnVuIHRocm91Z2ggYWxsIHRoZSBkZXBlbmRlbmNpZXMgZGlzY292ZXJlZCBhbmQgaWYgYW55IGFyZSBtaXNzaW5nLCBsb2cgdGhhdCB0byB0aGUgY29uc29sZSBhcyBhIHdhcm5pbmcuIFRoaXMgaXMgd2h5IGl0J3MgYmVzdCB0byBoYXZlIFR3ZWVuTGl0ZSBsb2FkIGxhc3QgLSBpdCBjYW4gY2hlY2sgYWxsIHRoZSBkZXBlbmRlbmNpZXMgZm9yIHlvdS5cblx0XHRhID0gd2luZG93Ll9nc1F1ZXVlO1xuXHRcdGlmIChhKSB7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRhW2ldKCk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKHAgaW4gX2RlZkxvb2t1cCkge1xuXHRcdFx0XHRpZiAoIV9kZWZMb29rdXBbcF0uZnVuYykge1xuXHRcdFx0XHRcdHdpbmRvdy5jb25zb2xlLmxvZyhcIkdTQVAgZW5jb3VudGVyZWQgbWlzc2luZyBkZXBlbmRlbmN5OiBcIiArIHApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0X3RpY2tlckFjdGl2ZSA9IGZhbHNlOyAvL2Vuc3VyZXMgdGhhdCB0aGUgZmlyc3Qgb2ZmaWNpYWwgYW5pbWF0aW9uIGZvcmNlcyBhIHRpY2tlci50aWNrKCkgdG8gdXBkYXRlIHRoZSB0aW1lIHdoZW4gaXQgaXMgaW5zdGFudGlhdGVkXG5cbn0pKCh0eXBlb2YobW9kdWxlKSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cyAmJiB0eXBlb2YoZ2xvYmFsKSAhPT0gXCJ1bmRlZmluZWRcIikgPyBnbG9iYWwgOiB0aGlzIHx8IHdpbmRvdywgXCJUd2VlbkxpdGVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ3NhcC9Ud2VlbkxpdGUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gU3R5bGVzXG5pbXBvcnQgJ3N0eWxlcy9hcHAuc2Nzcyc7IFxuXG4vLyBTY3JpcHRzXG5pbXBvcnQgJy4vbWFpbi5qcyc7XG5pbXBvcnQgJy4vdHdlZW5zLmpzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZXMvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gTUFJTlxuXG4vLyBNb2JpbGUgbmF2XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgdmFyIHRyaWdnZXIgPSAkKCcjanMtbmF2LXRvZ2dsZScpO1xuICB2YXIgaXNDbG9zZWQgPSBmYWxzZTtcbiAgdHJpZ2dlci5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAkKCcjanMtbmF2LW1vYmlsZScpLnRvZ2dsZUNsYXNzKCduYXYtb3BlbicpO1xuICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbmF2LW9wZW4nKTtcblx0XHQkKCcjanMtbmF2LXRvZ2dsZScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgfSk7XG59KTtcblxuLy8gc2Nyb2xsIG9uIGNsaWNrIG9mIGFuY2hvciBsaW5rIChhIGhyZWY9XCIjXCIpXG4kKGZ1bmN0aW9uKCkge1xuICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgICAgICB9LCA5MDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vLyB2YWxpZGF0ZSBvbiBmb3Jtc3VibWl0XG52YXIgZm9ybVN1Ym1pdCA9ICQoJyNqcy1mb3JtLXN1Ym1pdCcpO1xuZm9ybVN1Ym1pdC5jbGljayhmdW5jdGlvbigpIHtcblx0dmFsaWRhdGVGb3JtKCk7XG5cdHJldHVybiBmYWxzZTtcbn0pO1xuXG4vLyBmb3JtIHZhbGlkYXRpb25cbmZ1bmN0aW9uIHZhbGlkYXRlRm9ybSgpIHtcblx0dmFyIGVtYWlsLCBhdHBvcywgZG90cG9zLCB1c2VybmFtZTtcblxuXHRuYW1lID0gJCgnI25hbWUnKS52YWwoKTtcblx0ZW1haWwgPSAkKCcjZW1haWwnKS52YWwoKTtcblx0YXRwb3MgPSBlbWFpbC5pbmRleE9mKCdAJyk7XG5cdGRvdHBvcyA9IGVtYWlsLmxhc3RJbmRleE9mKCcuJyk7XG5cdG1lc3NhZ2UgPSAkKCcjbWVzc2FnZScpLnZhbCgpO1xuXG5cdGlmIChuYW1lID09IG51bGwgfHwgbmFtZSA9PSAnJykge1xuXHQkKCcjanMtZm9ybS1tZXNzYWdlJykuYWRkQ2xhc3MoJ3RleHQtZXJyb3IgdGV4dC1sYXJnZScpLnRleHQoJyogUGxlYXNlIGVudGVyIHlvdXIgbmFtZS4nKTtcblx0JCgnI25hbWUnKS5mb2N1cygpO1xuXHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYoZW1haWwgPT0gbnVsbCB8fCBlbWFpbCA9PSAnJykge1xuXHQkKCcjanMtZm9ybS1tZXNzYWdlJykuYWRkQ2xhc3MoJ3RleHQtZXJyb3IgdGV4dC1sYXJnZScpLnRleHQoJyogUGxlYXNlIGVudGVyIHlvdXIgZW1haWwuJyk7XG5cdCQoJyNlbWFpbCcpLmZvY3VzKCk7XG5cdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZihhdHBvcyA8IDEgfHwgZG90cG9zIDwgYXRwb3MrMiB8fCBkb3Rwb3MrMiA+PSBlbWFpbC5sZW5ndGgpIHtcblx0JCgnI2pzLWZvcm0tbWVzc2FnZScpLmFkZENsYXNzKCd0ZXh0LWVycm9yIHRleHQtbGFyZ2UnKS50ZXh0KCcqIFBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuJyk7XG5cdCQoJyNlbWFpbCcpLmZvY3VzKCk7XG5cdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAobWVzc2FnZSA9PSBudWxsIHx8IG1lc3NhZ2UgPT0gJycpIHtcblx0JCgnI2pzLWZvcm0tbWVzc2FnZScpLmFkZENsYXNzKCd0ZXh0LWVycm9yIHRleHQtbGFyZ2UnKS50ZXh0KCcqIFBsZWFzZSBlbnRlciB5b3VyIG1lc3NhZ2UuJyk7XG5cdCQoJyNtZXNzYWdlJykuZm9jdXMoKTtcblx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGVsc2Uge1xuXHQgIHZhciBkYXRhc3RyaW5nID0gJChcIiNqcy1mb3JtXCIpLnNlcmlhbGl6ZSgpO1xuXHQgICQuYWpheCh7XG5cdCAgICAvL3NlbmQgdGhlIGZvcm0gdXNpbmcgZm9ybXNwcmVlXG5cdCAgICB1cmw6IFwiaHR0cHM6Ly9mb3Jtc3ByZWUuaW8vYm90b29sZTUxOEBnbWFpbC5jb21cIiwgXG5cdCAgICBtZXRob2Q6IFwiUE9TVFwiLFxuXHQgICAgZGF0YTogZGF0YXN0cmluZyxcblx0ICAgIGRhdGFUeXBlOiBcImpzb25cIlxuXHQgIH0pO1xuXHQgICQoJyNqcy1mb3JtLW1lc3NhZ2UnKS5hZGRDbGFzcygndGV4dC1zdWNjZXNzIHRleHQtbGFyZ2UnKS50ZXh0KCdUaGFua3MgZm9yIHJlYWNoaW5nIG91dCEgWW91ciBtZXNzYWdlIGhhcyBiZWVuIHNlbnQgc3VjY2Vzc2Z1bGx5LiBJXFwnbGwgYmUgaW4gdG91Y2ggYXMgc29vbiBhcyBwb3NzaWJsZS4nKTtcblx0ICByZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuLy8gYWRkIGRpZmZlcmVudCBiZyBjbGFzcyBuYW1lXG4vLyBleCAtICcuYmctYWx0MScgdG8gZWFjaCBwb3N0IGl0ZW1cbiQoJy5wb3N0LWl0ZW0nKS5lYWNoKGZ1bmN0aW9uKGkpIHtcblx0dmFyIG51bSA9IChpICUgNCkgKyAxOyAvL3N0YXJ0IGluZGV4IGF0IDFcblx0JCh0aGlzKS5hZGRDbGFzcygnYmctYWx0JyArIG51bSk7XG5cdCQodGhpcykuYXR0cignZGF0YS1pdGVtJywgaSk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tYWluLmpzIiwiLy9UaW1lbGluZU1heCAmIFNjcm9sbE1hZ2ljXG5pbXBvcnQgU2Nyb2xsTWFnaWMgZnJvbSAnc2Nyb2xsbWFnaWMvc2Nyb2xsbWFnaWMvdW5jb21wcmVzc2VkL1Njcm9sbE1hZ2ljJzsgICBcbmltcG9ydCBUaW1lbGluZU1heCBmcm9tIFwiZ3NhcC9UaW1lbGluZU1heFwiO1xuLy8gVHdlZW5NYXhcbi8vdGwubWV0aG9kKGVsZW1lbnQsIGR1cmF0aW9uLCB2YXJzKSwgZGVsYXlcbnZhciB0bCA9IG5ldyBUaW1lbGluZU1heCh7fSk7XG50bFxuICAvLyBuZXdzIHBhZ2U6IHRpbWVsaW5lIFxuXHQuc3RhZ2dlckZyb20oJy5wb3N0LWl0ZW0nLCAwLjUsIHt5OiA1LGF1dG9BbHBoYTowLGVhc2U6IFBvd2VyMS5lYXNlT3V0fSwgMC4xNSlcblx0XG5cbi8vIFNjcm9sbE1hZ2ljXG4vLyBJbml0XG52YXIgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cbi8vcGluIHRoZSBpbnRyb1xudmFyIHBpbkludHJvU2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xuXHR0cmlnZ2VyRWxlbWVudDogJy5zZWN0aW9uLWhlcm8nLFxuXHR0cmlnZ2VySG9vazogMCxcblx0ZHVyYXRpb246ICcxMDAlJ1xufSlcbi5zZXRQaW4oJy5zZWN0aW9uLWhlcm8nLCB7cHVzaEZvbGxvd2VyczogZmFsc2V9KVxuLmFkZFRvKGNvbnRyb2xsZXIpO1xuXG4vL2xvb3AgdGhyb3VnaCBlYWNoIGVsIGFuZCBidWlsZCBzY2VuZVxuJCgnLnByb2plY3QtYmxvY2ssIC5oZXJvLWNvbnRlbnQnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHQvL2J1aWxkIGEgc2NlbmVcblx0dmFyIHByb2plY3RTY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XG5cdFx0Ly9zY2VuZSBvcHRpb25zXG5cdFx0dHJpZ2dlckVsZW1lbnQ6IHRoaXMuY2hpbGRyZW5bMF0sXG5cdFx0dHJpZ2dlckhvb2s6IDAuOSxcblx0XHRyZXZlcnNlOiBmYWxzZVxuXHR9KVxuXHQuc2V0Q2xhc3NUb2dnbGUodGhpcywgJ2ZhZGVJbicpIC8vYWRkIGNsYXNzIHRvIGVsXG5cdC8vLmFkZEluZGljYXRvcnMoe25hbWU6ICdmYWRlIHNjZW5lJyx9KSAvL2luZGljYXRvcnM7IHVzZXMgcGx1Z2luXG5cdC5hZGRUbyhjb250cm9sbGVyKTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy90d2VlbnMuanMiLCIvKiFcbiAqIFZFUlNJT046IDEuMjAuM1xuICogREFURTogMjAxNy0xMC0wMlxuICogVVBEQVRFUyBBTkQgRE9DUyBBVDogaHR0cDovL2dyZWVuc29jay5jb21cbiAqXG4gKiBAbGljZW5zZSBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxNywgR3JlZW5Tb2NrLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyB3b3JrIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHA6Ly9ncmVlbnNvY2suY29tL3N0YW5kYXJkLWxpY2Vuc2Ugb3IgZm9yXG4gKiBDbHViIEdyZWVuU29jayBtZW1iZXJzLCB0aGUgc29mdHdhcmUgYWdyZWVtZW50IHRoYXQgd2FzIGlzc3VlZCB3aXRoIHlvdXIgbWVtYmVyc2hpcC5cbiAqIFxuICogQGF1dGhvcjogSmFjayBEb3lsZSwgamFja0BncmVlbnNvY2suY29tXG4gKi9cbnZhciBfZ3NTY29wZSA9ICh0eXBlb2YobW9kdWxlKSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cyAmJiB0eXBlb2YoZ2xvYmFsKSAhPT0gXCJ1bmRlZmluZWRcIikgPyBnbG9iYWwgOiB0aGlzIHx8IHdpbmRvdzsgLy9oZWxwcyBlbnN1cmUgY29tcGF0aWJpbGl0eSB3aXRoIEFNRC9SZXF1aXJlSlMgYW5kIENvbW1vbkpTL05vZGVcbihfZ3NTY29wZS5fZ3NRdWV1ZSB8fCAoX2dzU2NvcGUuX2dzUXVldWUgPSBbXSkpLnB1c2goIGZ1bmN0aW9uKCkge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdF9nc1Njb3BlLl9nc0RlZmluZShcIlRpbWVsaW5lTWF4XCIsIFtcIlRpbWVsaW5lTGl0ZVwiLFwiVHdlZW5MaXRlXCIsXCJlYXNpbmcuRWFzZVwiXSwgZnVuY3Rpb24oVGltZWxpbmVMaXRlLCBUd2VlbkxpdGUsIEVhc2UpIHtcblx0XHRcblx0XHR2YXIgVGltZWxpbmVNYXggPSBmdW5jdGlvbih2YXJzKSB7XG5cdFx0XHRcdFRpbWVsaW5lTGl0ZS5jYWxsKHRoaXMsIHZhcnMpO1xuXHRcdFx0XHR0aGlzLl9yZXBlYXQgPSB0aGlzLnZhcnMucmVwZWF0IHx8IDA7XG5cdFx0XHRcdHRoaXMuX3JlcGVhdERlbGF5ID0gdGhpcy52YXJzLnJlcGVhdERlbGF5IHx8IDA7XG5cdFx0XHRcdHRoaXMuX2N5Y2xlID0gMDtcblx0XHRcdFx0dGhpcy5feW95byA9ICh0aGlzLnZhcnMueW95byA9PT0gdHJ1ZSk7XG5cdFx0XHRcdHRoaXMuX2RpcnR5ID0gdHJ1ZTtcblx0XHRcdH0sXG5cdFx0XHRfdGlueU51bSA9IDAuMDAwMDAwMDAwMSxcblx0XHRcdFR3ZWVuTGl0ZUludGVybmFscyA9IFR3ZWVuTGl0ZS5faW50ZXJuYWxzLFxuXHRcdFx0X2xhenlUd2VlbnMgPSBUd2VlbkxpdGVJbnRlcm5hbHMubGF6eVR3ZWVucyxcblx0XHRcdF9sYXp5UmVuZGVyID0gVHdlZW5MaXRlSW50ZXJuYWxzLmxhenlSZW5kZXIsXG5cdFx0XHRfZ2xvYmFscyA9IF9nc1Njb3BlLl9nc0RlZmluZS5nbG9iYWxzLFxuXHRcdFx0X2Vhc2VOb25lID0gbmV3IEVhc2UobnVsbCwgbnVsbCwgMSwgMCksXG5cdFx0XHRwID0gVGltZWxpbmVNYXgucHJvdG90eXBlID0gbmV3IFRpbWVsaW5lTGl0ZSgpO1xuXHRcdFx0XG5cdFx0cC5jb25zdHJ1Y3RvciA9IFRpbWVsaW5lTWF4O1xuXHRcdHAua2lsbCgpLl9nYyA9IGZhbHNlO1xuXHRcdFRpbWVsaW5lTWF4LnZlcnNpb24gPSBcIjEuMjAuM1wiO1xuXHRcdFxuXHRcdHAuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5feW95byA9ICh0aGlzLnZhcnMueW95byA9PT0gdHJ1ZSk7XG5cdFx0XHR0aGlzLl9yZXBlYXQgPSB0aGlzLnZhcnMucmVwZWF0IHx8IDA7XG5cdFx0XHR0aGlzLl9yZXBlYXREZWxheSA9IHRoaXMudmFycy5yZXBlYXREZWxheSB8fCAwO1xuXHRcdFx0dGhpcy5fdW5jYWNoZSh0cnVlKTtcblx0XHRcdHJldHVybiBUaW1lbGluZUxpdGUucHJvdG90eXBlLmludmFsaWRhdGUuY2FsbCh0aGlzKTtcblx0XHR9O1xuXHRcdFxuXHRcdHAuYWRkQ2FsbGJhY2sgPSBmdW5jdGlvbihjYWxsYmFjaywgcG9zaXRpb24sIHBhcmFtcywgc2NvcGUpIHtcblx0XHRcdHJldHVybiB0aGlzLmFkZCggVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKDAsIGNhbGxiYWNrLCBwYXJhbXMsIHNjb3BlKSwgcG9zaXRpb24pO1xuXHRcdH07XG5cdFx0XG5cdFx0cC5yZW1vdmVDYWxsYmFjayA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBwb3NpdGlvbikge1xuXHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdGlmIChwb3NpdGlvbiA9PSBudWxsKSB7XG5cdFx0XHRcdFx0dGhpcy5fa2lsbChudWxsLCBjYWxsYmFjayk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGEgPSB0aGlzLmdldFR3ZWVuc09mKGNhbGxiYWNrLCBmYWxzZSksXG5cdFx0XHRcdFx0XHRpID0gYS5sZW5ndGgsXG5cdFx0XHRcdFx0XHR0aW1lID0gdGhpcy5fcGFyc2VUaW1lT3JMYWJlbChwb3NpdGlvbik7XG5cdFx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRpZiAoYVtpXS5fc3RhcnRUaW1lID09PSB0aW1lKSB7XG5cdFx0XHRcdFx0XHRcdGFbaV0uX2VuYWJsZWQoZmFsc2UsIGZhbHNlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cblx0XHRwLnJlbW92ZVBhdXNlID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcblx0XHRcdHJldHVybiB0aGlzLnJlbW92ZUNhbGxiYWNrKFRpbWVsaW5lTGl0ZS5faW50ZXJuYWxzLnBhdXNlQ2FsbGJhY2ssIHBvc2l0aW9uKTtcblx0XHR9O1xuXHRcdFxuXHRcdHAudHdlZW5UbyA9IGZ1bmN0aW9uKHBvc2l0aW9uLCB2YXJzKSB7XG5cdFx0XHR2YXJzID0gdmFycyB8fCB7fTtcblx0XHRcdHZhciBjb3B5ID0ge2Vhc2U6X2Vhc2VOb25lLCB1c2VGcmFtZXM6dGhpcy51c2VzRnJhbWVzKCksIGltbWVkaWF0ZVJlbmRlcjpmYWxzZX0sXG5cdFx0XHRcdEVuZ2luZSA9ICh2YXJzLnJlcGVhdCAmJiBfZ2xvYmFscy5Ud2Vlbk1heCkgfHwgVHdlZW5MaXRlLFxuXHRcdFx0XHRkdXJhdGlvbiwgcCwgdDtcblx0XHRcdGZvciAocCBpbiB2YXJzKSB7XG5cdFx0XHRcdGNvcHlbcF0gPSB2YXJzW3BdO1xuXHRcdFx0fVxuXHRcdFx0Y29weS50aW1lID0gdGhpcy5fcGFyc2VUaW1lT3JMYWJlbChwb3NpdGlvbik7XG5cdFx0XHRkdXJhdGlvbiA9IChNYXRoLmFicyhOdW1iZXIoY29weS50aW1lKSAtIHRoaXMuX3RpbWUpIC8gdGhpcy5fdGltZVNjYWxlKSB8fCAwLjAwMTtcblx0XHRcdHQgPSBuZXcgRW5naW5lKHRoaXMsIGR1cmF0aW9uLCBjb3B5KTtcblx0XHRcdGNvcHkub25TdGFydCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0LnRhcmdldC5wYXVzZWQodHJ1ZSk7XG5cdFx0XHRcdGlmICh0LnZhcnMudGltZSAhPT0gdC50YXJnZXQudGltZSgpICYmIGR1cmF0aW9uID09PSB0LmR1cmF0aW9uKCkpIHsgLy9kb24ndCBtYWtlIHRoZSBkdXJhdGlvbiB6ZXJvIC0gaWYgaXQncyBzdXBwb3NlZCB0byBiZSB6ZXJvLCBkb24ndCB3b3JyeSBiZWNhdXNlIGl0J3MgYWxyZWFkeSBpbml0dGluZyB0aGUgdHdlZW4gYW5kIHdpbGwgY29tcGxldGUgaW1tZWRpYXRlbHksIGVmZmVjdGl2ZWx5IG1ha2luZyB0aGUgZHVyYXRpb24gemVybyBhbnl3YXkuIElmIHdlIG1ha2UgZHVyYXRpb24gemVybywgdGhlIHR3ZWVuIHdvbid0IHJ1biBhdCBhbGwuXG5cdFx0XHRcdFx0dC5kdXJhdGlvbiggTWF0aC5hYnMoIHQudmFycy50aW1lIC0gdC50YXJnZXQudGltZSgpKSAvIHQudGFyZ2V0Ll90aW1lU2NhbGUgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodmFycy5vblN0YXJ0KSB7IC8vaW4gY2FzZSB0aGUgdXNlciBoYWQgYW4gb25TdGFydCBpbiB0aGUgdmFycyAtIHdlIGRvbid0IHdhbnQgdG8gb3ZlcndyaXRlIGl0LlxuXHRcdFx0XHRcdHZhcnMub25TdGFydC5hcHBseSh2YXJzLm9uU3RhcnRTY29wZSB8fCB2YXJzLmNhbGxiYWNrU2NvcGUgfHwgdCwgdmFycy5vblN0YXJ0UGFyYW1zIHx8IFtdKTsgLy9kb24ndCB1c2UgdC5fY2FsbGJhY2soXCJvblN0YXJ0XCIpIG9yIGl0J2xsIHBvaW50IHRvIHRoZSBjb3B5Lm9uU3RhcnQgYW5kIHdlJ2xsIGdldCBhIHJlY3Vyc2lvbiBlcnJvci5cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJldHVybiB0O1xuXHRcdH07XG5cdFx0XG5cdFx0cC50d2VlbkZyb21UbyA9IGZ1bmN0aW9uKGZyb21Qb3NpdGlvbiwgdG9Qb3NpdGlvbiwgdmFycykge1xuXHRcdFx0dmFycyA9IHZhcnMgfHwge307XG5cdFx0XHRmcm9tUG9zaXRpb24gPSB0aGlzLl9wYXJzZVRpbWVPckxhYmVsKGZyb21Qb3NpdGlvbik7XG5cdFx0XHR2YXJzLnN0YXJ0QXQgPSB7b25Db21wbGV0ZTp0aGlzLnNlZWssIG9uQ29tcGxldGVQYXJhbXM6W2Zyb21Qb3NpdGlvbl0sIGNhbGxiYWNrU2NvcGU6dGhpc307XG5cdFx0XHR2YXJzLmltbWVkaWF0ZVJlbmRlciA9ICh2YXJzLmltbWVkaWF0ZVJlbmRlciAhPT0gZmFsc2UpO1xuXHRcdFx0dmFyIHQgPSB0aGlzLnR3ZWVuVG8odG9Qb3NpdGlvbiwgdmFycyk7XG5cdFx0XHRyZXR1cm4gdC5kdXJhdGlvbigoTWF0aC5hYnMoIHQudmFycy50aW1lIC0gZnJvbVBvc2l0aW9uKSAvIHRoaXMuX3RpbWVTY2FsZSkgfHwgMC4wMDEpO1xuXHRcdH07XG5cdFx0XG5cdFx0cC5yZW5kZXIgPSBmdW5jdGlvbih0aW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHtcblx0XHRcdGlmICh0aGlzLl9nYykge1xuXHRcdFx0XHR0aGlzLl9lbmFibGVkKHRydWUsIGZhbHNlKTtcblx0XHRcdH1cblx0XHRcdHZhciBwcmV2VGltZSA9IHRoaXMuX3RpbWUsXG5cdFx0XHRcdHRvdGFsRHVyID0gKCF0aGlzLl9kaXJ0eSkgPyB0aGlzLl90b3RhbER1cmF0aW9uIDogdGhpcy50b3RhbER1cmF0aW9uKCksXG5cdFx0XHRcdGR1ciA9IHRoaXMuX2R1cmF0aW9uLFxuXHRcdFx0XHRwcmV2VG90YWxUaW1lID0gdGhpcy5fdG90YWxUaW1lLFxuXHRcdFx0XHRwcmV2U3RhcnQgPSB0aGlzLl9zdGFydFRpbWUsIFxuXHRcdFx0XHRwcmV2VGltZVNjYWxlID0gdGhpcy5fdGltZVNjYWxlLCBcblx0XHRcdFx0cHJldlJhd1ByZXZUaW1lID0gdGhpcy5fcmF3UHJldlRpbWUsXG5cdFx0XHRcdHByZXZQYXVzZWQgPSB0aGlzLl9wYXVzZWQsIFxuXHRcdFx0XHRwcmV2Q3ljbGUgPSB0aGlzLl9jeWNsZSwgXG5cdFx0XHRcdHR3ZWVuLCBpc0NvbXBsZXRlLCBuZXh0LCBjYWxsYmFjaywgaW50ZXJuYWxGb3JjZSwgY3ljbGVEdXJhdGlvbiwgcGF1c2VUd2VlbiwgY3VyVGltZTtcblx0XHRcdGlmIChwcmV2VGltZSAhPT0gdGhpcy5fdGltZSkgeyAvL2lmIHRvdGFsRHVyYXRpb24oKSBmaW5kcyBhIGNoaWxkIHdpdGggYSBuZWdhdGl2ZSBzdGFydFRpbWUgYW5kIHNtb290aENoaWxkVGltaW5nIGlzIHRydWUsIHRoaW5ncyBnZXQgc2hpZnRlZCBhcm91bmQgaW50ZXJuYWxseSBzbyB3ZSBuZWVkIHRvIGFkanVzdCB0aGUgdGltZSBhY2NvcmRpbmdseS4gRm9yIGV4YW1wbGUsIGlmIGEgdHdlZW4gc3RhcnRzIGF0IC0zMCB3ZSBtdXN0IHNoaWZ0IEVWRVJZVEhJTkcgZm9yd2FyZCAzMCBzZWNvbmRzIGFuZCBtb3ZlIHRoaXMgdGltZWxpbmUncyBzdGFydFRpbWUgYmFja3dhcmQgYnkgMzAgc2Vjb25kcyBzbyB0aGF0IHRoaW5ncyBhbGlnbiB3aXRoIHRoZSBwbGF5aGVhZCAobm8ganVtcCkuXG5cdFx0XHRcdHRpbWUgKz0gdGhpcy5fdGltZSAtIHByZXZUaW1lO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRpbWUgPj0gdG90YWxEdXIgLSAwLjAwMDAwMDEgJiYgdGltZSA+PSAwKSB7IC8vdG8gd29yayBhcm91bmQgb2NjYXNpb25hbCBmbG9hdGluZyBwb2ludCBtYXRoIGFydGlmYWN0cy5cblx0XHRcdFx0aWYgKCF0aGlzLl9sb2NrZWQpIHtcblx0XHRcdFx0XHR0aGlzLl90b3RhbFRpbWUgPSB0b3RhbER1cjtcblx0XHRcdFx0XHR0aGlzLl9jeWNsZSA9IHRoaXMuX3JlcGVhdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXRoaXMuX3JldmVyc2VkKSBpZiAoIXRoaXMuX2hhc1BhdXNlZENoaWxkKCkpIHtcblx0XHRcdFx0XHRpc0NvbXBsZXRlID0gdHJ1ZTtcblx0XHRcdFx0XHRjYWxsYmFjayA9IFwib25Db21wbGV0ZVwiO1xuXHRcdFx0XHRcdGludGVybmFsRm9yY2UgPSAhIXRoaXMuX3RpbWVsaW5lLmF1dG9SZW1vdmVDaGlsZHJlbjsgLy9vdGhlcndpc2UsIGlmIHRoZSBhbmltYXRpb24gaXMgdW5wYXVzZWQvYWN0aXZhdGVkIGFmdGVyIGl0J3MgYWxyZWFkeSBmaW5pc2hlZCwgaXQgZG9lc24ndCBnZXQgcmVtb3ZlZCBmcm9tIHRoZSBwYXJlbnQgdGltZWxpbmUuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX2R1cmF0aW9uID09PSAwKSBpZiAoKHRpbWUgPD0gMCAmJiB0aW1lID49IC0wLjAwMDAwMDEpIHx8IHByZXZSYXdQcmV2VGltZSA8IDAgfHwgcHJldlJhd1ByZXZUaW1lID09PSBfdGlueU51bSkgaWYgKHByZXZSYXdQcmV2VGltZSAhPT0gdGltZSAmJiB0aGlzLl9maXJzdCkge1xuXHRcdFx0XHRcdFx0aW50ZXJuYWxGb3JjZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRpZiAocHJldlJhd1ByZXZUaW1lID4gX3RpbnlOdW0pIHtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSBcIm9uUmV2ZXJzZUNvbXBsZXRlXCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3Jhd1ByZXZUaW1lID0gKHRoaXMuX2R1cmF0aW9uIHx8ICFzdXBwcmVzc0V2ZW50cyB8fCB0aW1lIHx8IHRoaXMuX3Jhd1ByZXZUaW1lID09PSB0aW1lKSA/IHRpbWUgOiBfdGlueU51bTsgLy93aGVuIHRoZSBwbGF5aGVhZCBhcnJpdmVzIGF0IEVYQUNUTFkgdGltZSAwIChyaWdodCBvbiB0b3ApIG9mIGEgemVyby1kdXJhdGlvbiB0aW1lbGluZSBvciB0d2Vlbiwgd2UgbmVlZCB0byBkaXNjZXJuIGlmIGV2ZW50cyBhcmUgc3VwcHJlc3NlZCBzbyB0aGF0IHdoZW4gdGhlIHBsYXloZWFkIG1vdmVzIGFnYWluIChuZXh0IHRpbWUpLCBpdCdsbCB0cmlnZ2VyIHRoZSBjYWxsYmFjay4gSWYgZXZlbnRzIGFyZSBOT1Qgc3VwcHJlc3NlZCwgb2J2aW91c2x5IHRoZSBjYWxsYmFjayB3b3VsZCBiZSB0cmlnZ2VyZWQgaW4gdGhpcyByZW5kZXIuIEJhc2ljYWxseSwgdGhlIGNhbGxiYWNrIHNob3VsZCBmaXJlIGVpdGhlciB3aGVuIHRoZSBwbGF5aGVhZCBBUlJJVkVTIG9yIExFQVZFUyB0aGlzIGV4YWN0IHNwb3QsIG5vdCBib3RoLiBJbWFnaW5lIGRvaW5nIGEgdGltZWxpbmUuc2VlaygwKSBhbmQgdGhlcmUncyBhIGNhbGxiYWNrIHRoYXQgc2l0cyBhdCAwLiBTaW5jZSBldmVudHMgYXJlIHN1cHByZXNzZWQgb24gdGhhdCBzZWVrKCkgYnkgZGVmYXVsdCwgbm90aGluZyB3aWxsIGZpcmUsIGJ1dCB3aGVuIHRoZSBwbGF5aGVhZCBtb3ZlcyBvZmYgb2YgdGhhdCBwb3NpdGlvbiwgdGhlIGNhbGxiYWNrIHNob3VsZCBmaXJlLiBUaGlzIGJlaGF2aW9yIGlzIHdoYXQgcGVvcGxlIGludHVpdGl2ZWx5IGV4cGVjdC4gV2Ugc2V0IHRoZSBfcmF3UHJldlRpbWUgdG8gYmUgYSBwcmVjaXNlIHRpbnkgbnVtYmVyIHRvIGluZGljYXRlIHRoaXMgc2NlbmFyaW8gcmF0aGVyIHRoYW4gdXNpbmcgYW5vdGhlciBwcm9wZXJ0eS92YXJpYWJsZSB3aGljaCB3b3VsZCBpbmNyZWFzZSBtZW1vcnkgdXNhZ2UuIFRoaXMgdGVjaG5pcXVlIGlzIGxlc3MgcmVhZGFibGUsIGJ1dCBtb3JlIGVmZmljaWVudC5cblx0XHRcdFx0aWYgKHRoaXMuX3lveW8gJiYgKHRoaXMuX2N5Y2xlICYgMSkgIT09IDApIHtcblx0XHRcdFx0XHR0aGlzLl90aW1lID0gdGltZSA9IDA7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fdGltZSA9IGR1cjtcblx0XHRcdFx0XHR0aW1lID0gZHVyICsgMC4wMDAxOyAvL3RvIGF2b2lkIG9jY2FzaW9uYWwgZmxvYXRpbmcgcG9pbnQgcm91bmRpbmcgZXJyb3JzIC0gc29tZXRpbWVzIGNoaWxkIHR3ZWVucy90aW1lbGluZXMgd2VyZSBub3QgYmVpbmcgZnVsbHkgY29tcGxldGVkICh0aGVpciBwcm9ncmVzcyBtaWdodCBiZSAwLjk5OTk5OTk5OTk5OTk5OCBpbnN0ZWFkIG9mIDEgYmVjYXVzZSB3aGVuIF90aW1lIC0gdHdlZW4uX3N0YXJ0VGltZSBpcyBwZXJmb3JtZWQsIGZsb2F0aW5nIHBvaW50IGVycm9ycyB3b3VsZCByZXR1cm4gYSB2YWx1ZSB0aGF0IHdhcyBTTElHSFRMWSBvZmYpLiBUcnkgKDk5OTk5OTk5OTk5OS43IC0gOTk5OTk5OTk5OTk5KSAqIDEgPSAwLjY5OTk1MTE3MTg3NSBpbnN0ZWFkIG9mIDAuNy4gV2UgY2Fubm90IGRvIGxlc3MgdGhlbiAwLjAwMDEgYmVjYXVzZSB0aGUgc2FtZSBpc3N1ZSBjYW4gb2NjdXIgd2hlbiB0aGUgZHVyYXRpb24gaXMgZXh0cmVtZWx5IGxhcmdlIGxpa2UgOTk5OTk5OTk5OTk5IGluIHdoaWNoIGNhc2UgYWRkaW5nIDAuMDAwMDAwMDEsIGZvciBleGFtcGxlLCBjYXVzZXMgaXQgdG8gYWN0IGxpa2Ugbm90aGluZyB3YXMgYWRkZWQuXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9IGVsc2UgaWYgKHRpbWUgPCAwLjAwMDAwMDEpIHsgLy90byB3b3JrIGFyb3VuZCBvY2Nhc2lvbmFsIGZsb2F0aW5nIHBvaW50IG1hdGggYXJ0aWZhY3RzLCByb3VuZCBzdXBlciBzbWFsbCB2YWx1ZXMgdG8gMC5cblx0XHRcdFx0aWYgKCF0aGlzLl9sb2NrZWQpIHtcblx0XHRcdFx0XHR0aGlzLl90b3RhbFRpbWUgPSB0aGlzLl9jeWNsZSA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fdGltZSA9IDA7XG5cdFx0XHRcdGlmIChwcmV2VGltZSAhPT0gMCB8fCAoZHVyID09PSAwICYmIHByZXZSYXdQcmV2VGltZSAhPT0gX3RpbnlOdW0gJiYgKHByZXZSYXdQcmV2VGltZSA+IDAgfHwgKHRpbWUgPCAwICYmIHByZXZSYXdQcmV2VGltZSA+PSAwKSkgJiYgIXRoaXMuX2xvY2tlZCkpIHsgLy9lZGdlIGNhc2UgZm9yIGNoZWNraW5nIHRpbWUgPCAwICYmIHByZXZSYXdQcmV2VGltZSA+PSAwOiBhIHplcm8tZHVyYXRpb24gZnJvbVRvKCkgdHdlZW4gaW5zaWRlIGEgemVyby1kdXJhdGlvbiB0aW1lbGluZSAoeWVhaCwgdmVyeSByYXJlKVxuXHRcdFx0XHRcdGNhbGxiYWNrID0gXCJvblJldmVyc2VDb21wbGV0ZVwiO1xuXHRcdFx0XHRcdGlzQ29tcGxldGUgPSB0aGlzLl9yZXZlcnNlZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGltZSA8IDApIHtcblx0XHRcdFx0XHR0aGlzLl9hY3RpdmUgPSBmYWxzZTtcblx0XHRcdFx0XHRpZiAodGhpcy5fdGltZWxpbmUuYXV0b1JlbW92ZUNoaWxkcmVuICYmIHRoaXMuX3JldmVyc2VkKSB7XG5cdFx0XHRcdFx0XHRpbnRlcm5hbEZvcmNlID0gaXNDb21wbGV0ZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRjYWxsYmFjayA9IFwib25SZXZlcnNlQ29tcGxldGVcIjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByZXZSYXdQcmV2VGltZSA+PSAwICYmIHRoaXMuX2ZpcnN0KSB7IC8vd2hlbiBnb2luZyBiYWNrIGJleW9uZCB0aGUgc3RhcnQsIGZvcmNlIGEgcmVuZGVyIHNvIHRoYXQgemVyby1kdXJhdGlvbiB0d2VlbnMgdGhhdCBzaXQgYXQgdGhlIHZlcnkgYmVnaW5uaW5nIHJlbmRlciB0aGVpciBzdGFydCB2YWx1ZXMgcHJvcGVybHkuIE90aGVyd2lzZSwgaWYgdGhlIHBhcmVudCB0aW1lbGluZSdzIHBsYXloZWFkIGxhbmRzIGV4YWN0bHkgYXQgdGhpcyB0aW1lbGluZSdzIHN0YXJ0VGltZSwgYW5kIHRoZW4gbW92ZXMgYmFja3dhcmRzLCB0aGUgemVyby1kdXJhdGlvbiB0d2VlbnMgYXQgdGhlIGJlZ2lubmluZyB3b3VsZCBzdGlsbCBiZSBhdCB0aGVpciBlbmQgc3RhdGUuXG5cdFx0XHRcdFx0XHRpbnRlcm5hbEZvcmNlID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5fcmF3UHJldlRpbWUgPSB0aW1lO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX3Jhd1ByZXZUaW1lID0gKGR1ciB8fCAhc3VwcHJlc3NFdmVudHMgfHwgdGltZSB8fCB0aGlzLl9yYXdQcmV2VGltZSA9PT0gdGltZSkgPyB0aW1lIDogX3RpbnlOdW07IC8vd2hlbiB0aGUgcGxheWhlYWQgYXJyaXZlcyBhdCBFWEFDVExZIHRpbWUgMCAocmlnaHQgb24gdG9wKSBvZiBhIHplcm8tZHVyYXRpb24gdGltZWxpbmUgb3IgdHdlZW4sIHdlIG5lZWQgdG8gZGlzY2VybiBpZiBldmVudHMgYXJlIHN1cHByZXNzZWQgc28gdGhhdCB3aGVuIHRoZSBwbGF5aGVhZCBtb3ZlcyBhZ2FpbiAobmV4dCB0aW1lKSwgaXQnbGwgdHJpZ2dlciB0aGUgY2FsbGJhY2suIElmIGV2ZW50cyBhcmUgTk9UIHN1cHByZXNzZWQsIG9idmlvdXNseSB0aGUgY2FsbGJhY2sgd291bGQgYmUgdHJpZ2dlcmVkIGluIHRoaXMgcmVuZGVyLiBCYXNpY2FsbHksIHRoZSBjYWxsYmFjayBzaG91bGQgZmlyZSBlaXRoZXIgd2hlbiB0aGUgcGxheWhlYWQgQVJSSVZFUyBvciBMRUFWRVMgdGhpcyBleGFjdCBzcG90LCBub3QgYm90aC4gSW1hZ2luZSBkb2luZyBhIHRpbWVsaW5lLnNlZWsoMCkgYW5kIHRoZXJlJ3MgYSBjYWxsYmFjayB0aGF0IHNpdHMgYXQgMC4gU2luY2UgZXZlbnRzIGFyZSBzdXBwcmVzc2VkIG9uIHRoYXQgc2VlaygpIGJ5IGRlZmF1bHQsIG5vdGhpbmcgd2lsbCBmaXJlLCBidXQgd2hlbiB0aGUgcGxheWhlYWQgbW92ZXMgb2ZmIG9mIHRoYXQgcG9zaXRpb24sIHRoZSBjYWxsYmFjayBzaG91bGQgZmlyZS4gVGhpcyBiZWhhdmlvciBpcyB3aGF0IHBlb3BsZSBpbnR1aXRpdmVseSBleHBlY3QuIFdlIHNldCB0aGUgX3Jhd1ByZXZUaW1lIHRvIGJlIGEgcHJlY2lzZSB0aW55IG51bWJlciB0byBpbmRpY2F0ZSB0aGlzIHNjZW5hcmlvIHJhdGhlciB0aGFuIHVzaW5nIGFub3RoZXIgcHJvcGVydHkvdmFyaWFibGUgd2hpY2ggd291bGQgaW5jcmVhc2UgbWVtb3J5IHVzYWdlLiBUaGlzIHRlY2huaXF1ZSBpcyBsZXNzIHJlYWRhYmxlLCBidXQgbW9yZSBlZmZpY2llbnQuXG5cdFx0XHRcdFx0aWYgKHRpbWUgPT09IDAgJiYgaXNDb21wbGV0ZSkgeyAvL2lmIHRoZXJlJ3MgYSB6ZXJvLWR1cmF0aW9uIHR3ZWVuIGF0IHRoZSB2ZXJ5IGJlZ2lubmluZyBvZiBhIHRpbWVsaW5lIGFuZCB0aGUgcGxheWhlYWQgbGFuZHMgRVhBQ1RMWSBhdCB0aW1lIDAsIHRoYXQgdHdlZW4gd2lsbCBjb3JyZWN0bHkgcmVuZGVyIGl0cyBlbmQgdmFsdWVzLCBidXQgd2UgbmVlZCB0byBrZWVwIHRoZSB0aW1lbGluZSBhbGl2ZSBmb3Igb25lIG1vcmUgcmVuZGVyIHNvIHRoYXQgdGhlIGJlZ2lubmluZyB2YWx1ZXMgcmVuZGVyIHByb3Blcmx5IGFzIHRoZSBwYXJlbnQncyBwbGF5aGVhZCBrZWVwcyBtb3ZpbmcgYmV5b25kIHRoZSBiZWdpbmluZy4gSW1hZ2luZSBvYmoueCBzdGFydHMgYXQgMCBhbmQgdGhlbiB3ZSBkbyB0bC5zZXQob2JqLCB7eDoxMDB9KS50byhvYmosIDEsIHt4OjIwMH0pIGFuZCB0aGVuIGxhdGVyIHdlIHRsLnJldmVyc2UoKS4uLnRoZSBnb2FsIGlzIHRvIGhhdmUgb2JqLnggcmV2ZXJ0IHRvIDAuIElmIHRoZSBwbGF5aGVhZCBoYXBwZW5zIHRvIGxhbmQgb24gZXhhY3RseSAwLCB3aXRob3V0IHRoaXMgY2h1bmsgb2YgY29kZSwgaXQnZCBjb21wbGV0ZSB0aGUgdGltZWxpbmUgYW5kIHJlbW92ZSBpdCBmcm9tIHRoZSByZW5kZXJpbmcgcXVldWUgKG5vdCBnb29kKS5cblx0XHRcdFx0XHRcdHR3ZWVuID0gdGhpcy5fZmlyc3Q7XG5cdFx0XHRcdFx0XHR3aGlsZSAodHdlZW4gJiYgdHdlZW4uX3N0YXJ0VGltZSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIXR3ZWVuLl9kdXJhdGlvbikge1xuXHRcdFx0XHRcdFx0XHRcdGlzQ29tcGxldGUgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0d2VlbiA9IHR3ZWVuLl9uZXh0O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aW1lID0gMDsgLy90byBhdm9pZCBvY2Nhc2lvbmFsIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9ycyAoY291bGQgY2F1c2UgcHJvYmxlbXMgZXNwZWNpYWxseSB3aXRoIHplcm8tZHVyYXRpb24gdHdlZW5zIGF0IHRoZSB2ZXJ5IGJlZ2lubmluZyBvZiB0aGUgdGltZWxpbmUpXG5cdFx0XHRcdFx0aWYgKCF0aGlzLl9pbml0dGVkKSB7XG5cdFx0XHRcdFx0XHRpbnRlcm5hbEZvcmNlID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoZHVyID09PSAwICYmIHByZXZSYXdQcmV2VGltZSA8IDApIHsgLy93aXRob3V0IHRoaXMsIHplcm8tZHVyYXRpb24gcmVwZWF0aW5nIHRpbWVsaW5lcyAobGlrZSB3aXRoIGEgc2ltcGxlIGNhbGxiYWNrIG5lc3RlZCBhdCB0aGUgdmVyeSBiZWdpbm5pbmcgYW5kIGEgcmVwZWF0RGVsYXkpIHdvdWxkbid0IHJlbmRlciB0aGUgZmlyc3QgdGltZSB0aHJvdWdoLlxuXHRcdFx0XHRcdGludGVybmFsRm9yY2UgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3RpbWUgPSB0aGlzLl9yYXdQcmV2VGltZSA9IHRpbWU7XG5cdFx0XHRcdGlmICghdGhpcy5fbG9ja2VkKSB7XG5cdFx0XHRcdFx0dGhpcy5fdG90YWxUaW1lID0gdGltZTtcblx0XHRcdFx0XHRpZiAodGhpcy5fcmVwZWF0ICE9PSAwKSB7XG5cdFx0XHRcdFx0XHRjeWNsZUR1cmF0aW9uID0gZHVyICsgdGhpcy5fcmVwZWF0RGVsYXk7XG5cdFx0XHRcdFx0XHR0aGlzLl9jeWNsZSA9ICh0aGlzLl90b3RhbFRpbWUgLyBjeWNsZUR1cmF0aW9uKSA+PiAwOyAvL29yaWdpbmFsbHkgX3RvdGFsVGltZSAlIGN5Y2xlRHVyYXRpb24gYnV0IGZsb2F0aW5nIHBvaW50IGVycm9ycyBjYXVzZWQgcHJvYmxlbXMsIHNvIEkgbm9ybWFsaXplZCBpdC4gKDQgJSAwLjggc2hvdWxkIGJlIDAgYnV0IGl0IGdldHMgcmVwb3J0ZWQgYXMgMC43OTk5OTk5OSEpXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5fY3ljbGUgIT09IDApIGlmICh0aGlzLl9jeWNsZSA9PT0gdGhpcy5fdG90YWxUaW1lIC8gY3ljbGVEdXJhdGlvbiAmJiBwcmV2VG90YWxUaW1lIDw9IHRpbWUpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fY3ljbGUtLTsgLy9vdGhlcndpc2Ugd2hlbiByZW5kZXJlZCBleGFjdGx5IGF0IHRoZSBlbmQgdGltZSwgaXQgd2lsbCBhY3QgYXMgdGhvdWdoIGl0IGlzIHJlcGVhdGluZyAoYXQgdGhlIGJlZ2lubmluZylcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuX3RpbWUgPSB0aGlzLl90b3RhbFRpbWUgLSAodGhpcy5fY3ljbGUgKiBjeWNsZUR1cmF0aW9uKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl95b3lvKSBpZiAoKHRoaXMuX2N5Y2xlICYgMSkgIT09IDApIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fdGltZSA9IGR1ciAtIHRoaXMuX3RpbWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5fdGltZSA+IGR1cikge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl90aW1lID0gZHVyO1xuXHRcdFx0XHRcdFx0XHR0aW1lID0gZHVyICsgMC4wMDAxOyAvL3RvIGF2b2lkIG9jY2FzaW9uYWwgZmxvYXRpbmcgcG9pbnQgcm91bmRpbmcgZXJyb3Jcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5fdGltZSA8IDApIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fdGltZSA9IHRpbWUgPSAwO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGltZSA9IHRoaXMuX3RpbWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX2hhc1BhdXNlICYmICF0aGlzLl9mb3JjaW5nUGxheWhlYWQgJiYgIXN1cHByZXNzRXZlbnRzKSB7XG5cdFx0XHRcdFx0dGltZSA9IHRoaXMuX3RpbWU7XG5cdFx0XHRcdFx0aWYgKHRpbWUgPj0gcHJldlRpbWUgfHwgKHRoaXMuX3JlcGVhdCAmJiBwcmV2Q3ljbGUgIT09IHRoaXMuX2N5Y2xlKSkge1xuXHRcdFx0XHRcdFx0dHdlZW4gPSB0aGlzLl9maXJzdDtcblx0XHRcdFx0XHRcdHdoaWxlICh0d2VlbiAmJiB0d2Vlbi5fc3RhcnRUaW1lIDw9IHRpbWUgJiYgIXBhdXNlVHdlZW4pIHtcblx0XHRcdFx0XHRcdFx0aWYgKCF0d2Vlbi5fZHVyYXRpb24pIGlmICh0d2Vlbi5kYXRhID09PSBcImlzUGF1c2VcIiAmJiAhdHdlZW4ucmF0aW8gJiYgISh0d2Vlbi5fc3RhcnRUaW1lID09PSAwICYmIHRoaXMuX3Jhd1ByZXZUaW1lID09PSAwKSkge1xuXHRcdFx0XHRcdFx0XHRcdHBhdXNlVHdlZW4gPSB0d2Vlbjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0d2VlbiA9IHR3ZWVuLl9uZXh0O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0d2VlbiA9IHRoaXMuX2xhc3Q7XG5cdFx0XHRcdFx0XHR3aGlsZSAodHdlZW4gJiYgdHdlZW4uX3N0YXJ0VGltZSA+PSB0aW1lICYmICFwYXVzZVR3ZWVuKSB7XG5cdFx0XHRcdFx0XHRcdGlmICghdHdlZW4uX2R1cmF0aW9uKSBpZiAodHdlZW4uZGF0YSA9PT0gXCJpc1BhdXNlXCIgJiYgdHdlZW4uX3Jhd1ByZXZUaW1lID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdHBhdXNlVHdlZW4gPSB0d2Vlbjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0d2VlbiA9IHR3ZWVuLl9wcmV2O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAocGF1c2VUd2VlbiAmJiBwYXVzZVR3ZWVuLl9zdGFydFRpbWUgPCBkdXIpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3RpbWUgPSB0aW1lID0gcGF1c2VUd2Vlbi5fc3RhcnRUaW1lO1xuXHRcdFx0XHRcdFx0dGhpcy5fdG90YWxUaW1lID0gdGltZSArICh0aGlzLl9jeWNsZSAqICh0aGlzLl90b3RhbER1cmF0aW9uICsgdGhpcy5fcmVwZWF0RGVsYXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAodGhpcy5fY3ljbGUgIT09IHByZXZDeWNsZSkgaWYgKCF0aGlzLl9sb2NrZWQpIHtcblx0XHRcdFx0Lypcblx0XHRcdFx0bWFrZSBzdXJlIGNoaWxkcmVuIGF0IHRoZSBlbmQvYmVnaW5uaW5nIG9mIHRoZSB0aW1lbGluZSBhcmUgcmVuZGVyZWQgcHJvcGVybHkuIElmLCBmb3IgZXhhbXBsZSwgXG5cdFx0XHRcdGEgMy1zZWNvbmQgbG9uZyB0aW1lbGluZSByZW5kZXJlZCBhdCAyLjkgc2Vjb25kcyBwcmV2aW91c2x5LCBhbmQgbm93IHJlbmRlcnMgYXQgMy4yIHNlY29uZHMgKHdoaWNoXG5cdFx0XHRcdHdvdWxkIGdldCB0cmFuc2F0ZWQgdG8gMi44IHNlY29uZHMgaWYgdGhlIHRpbWVsaW5lIHlveW9zIG9yIDAuMiBzZWNvbmRzIGlmIGl0IGp1c3QgcmVwZWF0cyksIHRoZXJlXG5cdFx0XHRcdGNvdWxkIGJlIGEgY2FsbGJhY2sgb3IgYSBzaG9ydCB0d2VlbiB0aGF0J3MgYXQgMi45NSBvciAzIHNlY29uZHMgaW4gd2hpY2ggd291bGRuJ3QgcmVuZGVyLiBTbyBcblx0XHRcdFx0d2UgbmVlZCB0byBwdXNoIHRoZSB0aW1lbGluZSB0byB0aGUgZW5kIChhbmQvb3IgYmVnaW5uaW5nIGRlcGVuZGluZyBvbiBpdHMgeW95byB2YWx1ZSkuIEFsc28gd2UgbXVzdFxuXHRcdFx0XHRlbnN1cmUgdGhhdCB6ZXJvLWR1cmF0aW9uIHR3ZWVucyBhdCB0aGUgdmVyeSBiZWdpbm5pbmcgb3IgZW5kIG9mIHRoZSBUaW1lbGluZU1heCB3b3JrLiBcblx0XHRcdFx0Ki9cblx0XHRcdFx0dmFyIGJhY2t3YXJkcyA9ICh0aGlzLl95b3lvICYmIChwcmV2Q3ljbGUgJiAxKSAhPT0gMCksXG5cdFx0XHRcdFx0d3JhcCA9IChiYWNrd2FyZHMgPT09ICh0aGlzLl95b3lvICYmICh0aGlzLl9jeWNsZSAmIDEpICE9PSAwKSksXG5cdFx0XHRcdFx0cmVjVG90YWxUaW1lID0gdGhpcy5fdG90YWxUaW1lLFxuXHRcdFx0XHRcdHJlY0N5Y2xlID0gdGhpcy5fY3ljbGUsXG5cdFx0XHRcdFx0cmVjUmF3UHJldlRpbWUgPSB0aGlzLl9yYXdQcmV2VGltZSxcblx0XHRcdFx0XHRyZWNUaW1lID0gdGhpcy5fdGltZTtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMuX3RvdGFsVGltZSA9IHByZXZDeWNsZSAqIGR1cjtcblx0XHRcdFx0aWYgKHRoaXMuX2N5Y2xlIDwgcHJldkN5Y2xlKSB7XG5cdFx0XHRcdFx0YmFja3dhcmRzID0gIWJhY2t3YXJkcztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl90b3RhbFRpbWUgKz0gZHVyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3RpbWUgPSBwcmV2VGltZTsgLy90ZW1wb3JhcmlseSByZXZlcnQgX3RpbWUgc28gdGhhdCByZW5kZXIoKSByZW5kZXJzIHRoZSBjaGlsZHJlbiBpbiB0aGUgY29ycmVjdCBvcmRlci4gV2l0aG91dCB0aGlzLCB0d2VlbnMgd29uJ3QgcmV3aW5kIGNvcnJlY3RseS4gV2UgY291bGQgYXJoaWN0ZWN0IHRoaW5ncyBpbiBhIFwiY2xlYW5lclwiIHdheSBieSBzcGxpdHRpbmcgb3V0IHRoZSByZW5kZXJpbmcgcXVldWUgaW50byBhIHNlcGFyYXRlIG1ldGhvZCBidXQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIHdlIGtlcHQgaXQgYWxsIGluc2lkZSB0aGlzIG1ldGhvZC5cblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMuX3Jhd1ByZXZUaW1lID0gKGR1ciA9PT0gMCkgPyBwcmV2UmF3UHJldlRpbWUgLSAwLjAwMDEgOiBwcmV2UmF3UHJldlRpbWU7XG5cdFx0XHRcdHRoaXMuX2N5Y2xlID0gcHJldkN5Y2xlO1xuXHRcdFx0XHR0aGlzLl9sb2NrZWQgPSB0cnVlOyAvL3ByZXZlbnRzIGNoYW5nZXMgdG8gdG90YWxUaW1lIGFuZCBza2lwcyByZXBlYXQveW95byBiZWhhdmlvciB3aGVuIHdlIHJlY3Vyc2l2ZWx5IGNhbGwgcmVuZGVyKClcblx0XHRcdFx0cHJldlRpbWUgPSAoYmFja3dhcmRzKSA/IDAgOiBkdXI7XG5cdFx0XHRcdHRoaXMucmVuZGVyKHByZXZUaW1lLCBzdXBwcmVzc0V2ZW50cywgKGR1ciA9PT0gMCkpO1xuXHRcdFx0XHRpZiAoIXN1cHByZXNzRXZlbnRzKSBpZiAoIXRoaXMuX2djKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMudmFycy5vblJlcGVhdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fY3ljbGUgPSByZWNDeWNsZTsgLy9pbiBjYXNlIHRoZSBvblJlcGVhdCBhbHRlcnMgdGhlIHBsYXloZWFkIG9yIGludmFsaWRhdGVzKCksIHdlIHNob3VsZG4ndCBzdGF5IGxvY2tlZCBvciB1c2UgdGhlIHByZXZpb3VzIGN5Y2xlLlxuXHRcdFx0XHRcdFx0dGhpcy5fbG9ja2VkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR0aGlzLl9jYWxsYmFjayhcIm9uUmVwZWF0XCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAocHJldlRpbWUgIT09IHRoaXMuX3RpbWUpIHsgLy9pbiBjYXNlIHRoZXJlJ3MgYSBjYWxsYmFjayBsaWtlIG9uQ29tcGxldGUgaW4gYSBuZXN0ZWQgdHdlZW4vdGltZWxpbmUgdGhhdCBjaGFuZ2VzIHRoZSBwbGF5aGVhZCBwb3NpdGlvbiwgbGlrZSB2aWEgc2VlaygpLCB3ZSBzaG91bGQganVzdCBhYm9ydC5cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHdyYXApIHtcblx0XHRcdFx0XHR0aGlzLl9jeWNsZSA9IHByZXZDeWNsZTsgLy9pZiB0aGVyZSdzIGFuIG9uUmVwZWF0LCB3ZSByZXZlcnRlZCB0aGlzIGFib3ZlLCBzbyBtYWtlIHN1cmUgaXQncyBzZXQgcHJvcGVybHkgYWdhaW4uIFdlIGFsc28gdW5sb2NrZWQgaW4gdGhhdCBzY2VuYXJpbywgc28gcmVzZXQgdGhhdCB0b28uXG5cdFx0XHRcdFx0dGhpcy5fbG9ja2VkID0gdHJ1ZTtcblx0XHRcdFx0XHRwcmV2VGltZSA9IChiYWNrd2FyZHMpID8gZHVyICsgMC4wMDAxIDogLTAuMDAwMTtcblx0XHRcdFx0XHR0aGlzLnJlbmRlcihwcmV2VGltZSwgdHJ1ZSwgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZiAodGhpcy5fcGF1c2VkICYmICFwcmV2UGF1c2VkKSB7IC8vaWYgdGhlIHJlbmRlcigpIHRyaWdnZXJlZCBjYWxsYmFjayB0aGF0IHBhdXNlZCB0aGlzIHRpbWVsaW5lLCB3ZSBzaG91bGQgYWJvcnQgKHZlcnkgcmFyZSwgYnV0IHBvc3NpYmxlKVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl90aW1lID0gcmVjVGltZTtcblx0XHRcdFx0dGhpcy5fdG90YWxUaW1lID0gcmVjVG90YWxUaW1lO1xuXHRcdFx0XHR0aGlzLl9jeWNsZSA9IHJlY0N5Y2xlO1xuXHRcdFx0XHR0aGlzLl9yYXdQcmV2VGltZSA9IHJlY1Jhd1ByZXZUaW1lO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoKHRoaXMuX3RpbWUgPT09IHByZXZUaW1lIHx8ICF0aGlzLl9maXJzdCkgJiYgIWZvcmNlICYmICFpbnRlcm5hbEZvcmNlICYmICFwYXVzZVR3ZWVuKSB7XG5cdFx0XHRcdGlmIChwcmV2VG90YWxUaW1lICE9PSB0aGlzLl90b3RhbFRpbWUpIGlmICh0aGlzLl9vblVwZGF0ZSkgaWYgKCFzdXBwcmVzc0V2ZW50cykgeyAvL3NvIHRoYXQgb25VcGRhdGUgZmlyZXMgZXZlbiBkdXJpbmcgdGhlIHJlcGVhdERlbGF5IC0gYXMgbG9uZyBhcyB0aGUgdG90YWxUaW1lIGNoYW5nZWQsIHdlIHNob3VsZCB0cmlnZ2VyIG9uVXBkYXRlLlxuXHRcdFx0XHRcdHRoaXMuX2NhbGxiYWNrKFwib25VcGRhdGVcIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fSBlbHNlIGlmICghdGhpcy5faW5pdHRlZCkge1xuXHRcdFx0XHR0aGlzLl9pbml0dGVkID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCF0aGlzLl9hY3RpdmUpIGlmICghdGhpcy5fcGF1c2VkICYmIHRoaXMuX3RvdGFsVGltZSAhPT0gcHJldlRvdGFsVGltZSAmJiB0aW1lID4gMCkge1xuXHRcdFx0XHR0aGlzLl9hY3RpdmUgPSB0cnVlOyAgLy9zbyB0aGF0IGlmIHRoZSB1c2VyIHJlbmRlcnMgdGhlIHRpbWVsaW5lIChhcyBvcHBvc2VkIHRvIHRoZSBwYXJlbnQgdGltZWxpbmUgcmVuZGVyaW5nIGl0KSwgaXQgaXMgZm9yY2VkIHRvIHJlLXJlbmRlciBhbmQgYWxpZ24gaXQgd2l0aCB0aGUgcHJvcGVyIHRpbWUvZnJhbWUgb24gdGhlIG5leHQgcmVuZGVyaW5nIGN5Y2xlLiBNYXliZSB0aGUgdGltZWxpbmUgYWxyZWFkeSBmaW5pc2hlZCBidXQgdGhlIHVzZXIgbWFudWFsbHkgcmUtcmVuZGVycyBpdCBhcyBoYWxmd2F5IGRvbmUsIGZvciBleGFtcGxlLlxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAocHJldlRvdGFsVGltZSA9PT0gMCkgaWYgKHRoaXMudmFycy5vblN0YXJ0KSBpZiAodGhpcy5fdG90YWxUaW1lICE9PSAwIHx8ICF0aGlzLl90b3RhbER1cmF0aW9uKSBpZiAoIXN1cHByZXNzRXZlbnRzKSB7XG5cdFx0XHRcdHRoaXMuX2NhbGxiYWNrKFwib25TdGFydFwiKTtcblx0XHRcdH1cblxuXHRcdFx0Y3VyVGltZSA9IHRoaXMuX3RpbWU7XG5cdFx0XHRpZiAoY3VyVGltZSA+PSBwcmV2VGltZSkge1xuXHRcdFx0XHR0d2VlbiA9IHRoaXMuX2ZpcnN0O1xuXHRcdFx0XHR3aGlsZSAodHdlZW4pIHtcblx0XHRcdFx0XHRuZXh0ID0gdHdlZW4uX25leHQ7IC8vcmVjb3JkIGl0IGhlcmUgYmVjYXVzZSB0aGUgdmFsdWUgY291bGQgY2hhbmdlIGFmdGVyIHJlbmRlcmluZy4uLlxuXHRcdFx0XHRcdGlmIChjdXJUaW1lICE9PSB0aGlzLl90aW1lIHx8ICh0aGlzLl9wYXVzZWQgJiYgIXByZXZQYXVzZWQpKSB7IC8vaW4gY2FzZSBhIHR3ZWVuIHBhdXNlcyBvciBzZWVrcyB0aGUgdGltZWxpbmUgd2hlbiByZW5kZXJpbmcsIGxpa2UgaW5zaWRlIG9mIGFuIG9uVXBkYXRlL29uQ29tcGxldGVcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHdlZW4uX2FjdGl2ZSB8fCAodHdlZW4uX3N0YXJ0VGltZSA8PSB0aGlzLl90aW1lICYmICF0d2Vlbi5fcGF1c2VkICYmICF0d2Vlbi5fZ2MpKSB7XG5cdFx0XHRcdFx0XHRpZiAocGF1c2VUd2VlbiA9PT0gdHdlZW4pIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5wYXVzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCF0d2Vlbi5fcmV2ZXJzZWQpIHtcblx0XHRcdFx0XHRcdFx0dHdlZW4ucmVuZGVyKCh0aW1lIC0gdHdlZW4uX3N0YXJ0VGltZSkgKiB0d2Vlbi5fdGltZVNjYWxlLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dHdlZW4ucmVuZGVyKCgoIXR3ZWVuLl9kaXJ0eSkgPyB0d2Vlbi5fdG90YWxEdXJhdGlvbiA6IHR3ZWVuLnRvdGFsRHVyYXRpb24oKSkgLSAoKHRpbWUgLSB0d2Vlbi5fc3RhcnRUaW1lKSAqIHR3ZWVuLl90aW1lU2NhbGUpLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0d2VlbiA9IG5leHQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHR3ZWVuID0gdGhpcy5fbGFzdDtcblx0XHRcdFx0d2hpbGUgKHR3ZWVuKSB7XG5cdFx0XHRcdFx0bmV4dCA9IHR3ZWVuLl9wcmV2OyAvL3JlY29yZCBpdCBoZXJlIGJlY2F1c2UgdGhlIHZhbHVlIGNvdWxkIGNoYW5nZSBhZnRlciByZW5kZXJpbmcuLi5cblx0XHRcdFx0XHRpZiAoY3VyVGltZSAhPT0gdGhpcy5fdGltZSB8fCAodGhpcy5fcGF1c2VkICYmICFwcmV2UGF1c2VkKSkgeyAvL2luIGNhc2UgYSB0d2VlbiBwYXVzZXMgb3Igc2Vla3MgdGhlIHRpbWVsaW5lIHdoZW4gcmVuZGVyaW5nLCBsaWtlIGluc2lkZSBvZiBhbiBvblVwZGF0ZS9vbkNvbXBsZXRlXG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR3ZWVuLl9hY3RpdmUgfHwgKHR3ZWVuLl9zdGFydFRpbWUgPD0gcHJldlRpbWUgJiYgIXR3ZWVuLl9wYXVzZWQgJiYgIXR3ZWVuLl9nYykpIHtcblx0XHRcdFx0XHRcdGlmIChwYXVzZVR3ZWVuID09PSB0d2Vlbikge1xuXHRcdFx0XHRcdFx0XHRwYXVzZVR3ZWVuID0gdHdlZW4uX3ByZXY7IC8vdGhlIGxpbmtlZCBsaXN0IGlzIG9yZ2FuaXplZCBieSBfc3RhcnRUaW1lLCB0aHVzIGl0J3MgcG9zc2libGUgdGhhdCBhIHR3ZWVuIGNvdWxkIHN0YXJ0IEJFRk9SRSB0aGUgcGF1c2UgYW5kIGVuZCBhZnRlciBpdCwgaW4gd2hpY2ggY2FzZSBpdCB3b3VsZCBiZSBwb3NpdGlvbmVkIGJlZm9yZSB0aGUgcGF1c2UgdHdlZW4gaW4gdGhlIGxpbmtlZCBsaXN0LCBidXQgd2Ugc2hvdWxkIHJlbmRlciBpdCBiZWZvcmUgd2UgcGF1c2UoKSB0aGUgdGltZWxpbmUgYW5kIGNlYXNlIHJlbmRlcmluZy4gVGhpcyBpcyBvbmx5IGEgY29uY2VybiB3aGVuIGdvaW5nIGluIHJldmVyc2UuXG5cdFx0XHRcdFx0XHRcdHdoaWxlIChwYXVzZVR3ZWVuICYmIHBhdXNlVHdlZW4uZW5kVGltZSgpID4gdGhpcy5fdGltZSkge1xuXHRcdFx0XHRcdFx0XHRcdHBhdXNlVHdlZW4ucmVuZGVyKCAocGF1c2VUd2Vlbi5fcmV2ZXJzZWQgPyBwYXVzZVR3ZWVuLnRvdGFsRHVyYXRpb24oKSAtICgodGltZSAtIHBhdXNlVHdlZW4uX3N0YXJ0VGltZSkgKiBwYXVzZVR3ZWVuLl90aW1lU2NhbGUpIDogKHRpbWUgLSBwYXVzZVR3ZWVuLl9zdGFydFRpbWUpICogcGF1c2VUd2Vlbi5fdGltZVNjYWxlKSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcblx0XHRcdFx0XHRcdFx0XHRwYXVzZVR3ZWVuID0gcGF1c2VUd2Vlbi5fcHJldjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRwYXVzZVR3ZWVuID0gbnVsbDtcblx0XHRcdFx0XHRcdFx0dGhpcy5wYXVzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCF0d2Vlbi5fcmV2ZXJzZWQpIHtcblx0XHRcdFx0XHRcdFx0dHdlZW4ucmVuZGVyKCh0aW1lIC0gdHdlZW4uX3N0YXJ0VGltZSkgKiB0d2Vlbi5fdGltZVNjYWxlLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dHdlZW4ucmVuZGVyKCgoIXR3ZWVuLl9kaXJ0eSkgPyB0d2Vlbi5fdG90YWxEdXJhdGlvbiA6IHR3ZWVuLnRvdGFsRHVyYXRpb24oKSkgLSAoKHRpbWUgLSB0d2Vlbi5fc3RhcnRUaW1lKSAqIHR3ZWVuLl90aW1lU2NhbGUpLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0d2VlbiA9IG5leHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKHRoaXMuX29uVXBkYXRlKSBpZiAoIXN1cHByZXNzRXZlbnRzKSB7XG5cdFx0XHRcdGlmIChfbGF6eVR3ZWVucy5sZW5ndGgpIHsgLy9pbiBjYXNlIHJlbmRlcmluZyBjYXVzZWQgYW55IHR3ZWVucyB0byBsYXp5LWluaXQsIHdlIHNob3VsZCByZW5kZXIgdGhlbSBiZWNhdXNlIHR5cGljYWxseSB3aGVuIGEgdGltZWxpbmUgZmluaXNoZXMsIHVzZXJzIGV4cGVjdCB0aGluZ3MgdG8gaGF2ZSByZW5kZXJlZCBmdWxseS4gSW1hZ2luZSBhbiBvblVwZGF0ZSBvbiBhIHRpbWVsaW5lIHRoYXQgcmVwb3J0cy9jaGVja3MgdHdlZW5lZCB2YWx1ZXMuXG5cdFx0XHRcdFx0X2xhenlSZW5kZXIoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9jYWxsYmFjayhcIm9uVXBkYXRlXCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGNhbGxiYWNrKSBpZiAoIXRoaXMuX2xvY2tlZCkgaWYgKCF0aGlzLl9nYykgaWYgKHByZXZTdGFydCA9PT0gdGhpcy5fc3RhcnRUaW1lIHx8IHByZXZUaW1lU2NhbGUgIT09IHRoaXMuX3RpbWVTY2FsZSkgaWYgKHRoaXMuX3RpbWUgPT09IDAgfHwgdG90YWxEdXIgPj0gdGhpcy50b3RhbER1cmF0aW9uKCkpIHsgLy9pZiBvbmUgb2YgdGhlIHR3ZWVucyB0aGF0IHdhcyByZW5kZXJlZCBhbHRlcmVkIHRoaXMgdGltZWxpbmUncyBzdGFydFRpbWUgKGxpa2UgaWYgYW4gb25Db21wbGV0ZSByZXZlcnNlZCB0aGUgdGltZWxpbmUpLCBpdCBwcm9iYWJseSBpc24ndCBjb21wbGV0ZS4gSWYgaXQgaXMsIGRvbid0IHdvcnJ5LCBiZWNhdXNlIHdoYXRldmVyIGNhbGwgYWx0ZXJlZCB0aGUgc3RhcnRUaW1lIHdvdWxkIGNvbXBsZXRlIGlmIGl0IHdhcyBuZWNlc3NhcnkgYXQgdGhlIG5ldyB0aW1lLiBUaGUgb25seSBleGNlcHRpb24gaXMgdGhlIHRpbWVTY2FsZSBwcm9wZXJ0eS4gQWxzbyBjaGVjayBfZ2MgYmVjYXVzZSB0aGVyZSdzIGEgY2hhbmNlIHRoYXQga2lsbCgpIGNvdWxkIGJlIGNhbGxlZCBpbiBhbiBvblVwZGF0ZVxuXHRcdFx0XHRpZiAoaXNDb21wbGV0ZSkge1xuXHRcdFx0XHRcdGlmIChfbGF6eVR3ZWVucy5sZW5ndGgpIHsgLy9pbiBjYXNlIHJlbmRlcmluZyBjYXVzZWQgYW55IHR3ZWVucyB0byBsYXp5LWluaXQsIHdlIHNob3VsZCByZW5kZXIgdGhlbSBiZWNhdXNlIHR5cGljYWxseSB3aGVuIGEgdGltZWxpbmUgZmluaXNoZXMsIHVzZXJzIGV4cGVjdCB0aGluZ3MgdG8gaGF2ZSByZW5kZXJlZCBmdWxseS4gSW1hZ2luZSBhbiBvbkNvbXBsZXRlIG9uIGEgdGltZWxpbmUgdGhhdCByZXBvcnRzL2NoZWNrcyB0d2VlbmVkIHZhbHVlcy5cblx0XHRcdFx0XHRcdF9sYXp5UmVuZGVyKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0aGlzLl90aW1lbGluZS5hdXRvUmVtb3ZlQ2hpbGRyZW4pIHtcblx0XHRcdFx0XHRcdHRoaXMuX2VuYWJsZWQoZmFsc2UsIGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5fYWN0aXZlID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFzdXBwcmVzc0V2ZW50cyAmJiB0aGlzLnZhcnNbY2FsbGJhY2tdKSB7XG5cdFx0XHRcdFx0dGhpcy5fY2FsbGJhY2soY2FsbGJhY2spO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRcblx0XHRwLmdldEFjdGl2ZSA9IGZ1bmN0aW9uKG5lc3RlZCwgdHdlZW5zLCB0aW1lbGluZXMpIHtcblx0XHRcdGlmIChuZXN0ZWQgPT0gbnVsbCkge1xuXHRcdFx0XHRuZXN0ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR3ZWVucyA9PSBudWxsKSB7XG5cdFx0XHRcdHR3ZWVucyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGltZWxpbmVzID09IG51bGwpIHtcblx0XHRcdFx0dGltZWxpbmVzID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR2YXIgYSA9IFtdLCBcblx0XHRcdFx0YWxsID0gdGhpcy5nZXRDaGlsZHJlbihuZXN0ZWQsIHR3ZWVucywgdGltZWxpbmVzKSwgXG5cdFx0XHRcdGNudCA9IDAsIFxuXHRcdFx0XHRsID0gYWxsLmxlbmd0aCxcblx0XHRcdFx0aSwgdHdlZW47XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdHR3ZWVuID0gYWxsW2ldO1xuXHRcdFx0XHRpZiAodHdlZW4uaXNBY3RpdmUoKSkge1xuXHRcdFx0XHRcdGFbY250KytdID0gdHdlZW47XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBhO1xuXHRcdH07XG5cdFx0XG5cdFx0XG5cdFx0cC5nZXRMYWJlbEFmdGVyID0gZnVuY3Rpb24odGltZSkge1xuXHRcdFx0aWYgKCF0aW1lKSBpZiAodGltZSAhPT0gMCkgeyAvL2Zhc3RlciB0aGFuIGlzTmFuKClcblx0XHRcdFx0dGltZSA9IHRoaXMuX3RpbWU7XG5cdFx0XHR9XG5cdFx0XHR2YXIgbGFiZWxzID0gdGhpcy5nZXRMYWJlbHNBcnJheSgpLFxuXHRcdFx0XHRsID0gbGFiZWxzLmxlbmd0aCxcblx0XHRcdFx0aTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0aWYgKGxhYmVsc1tpXS50aW1lID4gdGltZSkge1xuXHRcdFx0XHRcdHJldHVybiBsYWJlbHNbaV0ubmFtZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fTtcblx0XHRcblx0XHRwLmdldExhYmVsQmVmb3JlID0gZnVuY3Rpb24odGltZSkge1xuXHRcdFx0aWYgKHRpbWUgPT0gbnVsbCkge1xuXHRcdFx0XHR0aW1lID0gdGhpcy5fdGltZTtcblx0XHRcdH1cblx0XHRcdHZhciBsYWJlbHMgPSB0aGlzLmdldExhYmVsc0FycmF5KCksXG5cdFx0XHRcdGkgPSBsYWJlbHMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdGlmIChsYWJlbHNbaV0udGltZSA8IHRpbWUpIHtcblx0XHRcdFx0XHRyZXR1cm4gbGFiZWxzW2ldLm5hbWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH07XG5cdFx0XG5cdFx0cC5nZXRMYWJlbHNBcnJheSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGEgPSBbXSxcblx0XHRcdFx0Y250ID0gMCxcblx0XHRcdFx0cDtcblx0XHRcdGZvciAocCBpbiB0aGlzLl9sYWJlbHMpIHtcblx0XHRcdFx0YVtjbnQrK10gPSB7dGltZTp0aGlzLl9sYWJlbHNbcF0sIG5hbWU6cH07XG5cdFx0XHR9XG5cdFx0XHRhLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG5cdFx0XHRcdHJldHVybiBhLnRpbWUgLSBiLnRpbWU7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBhO1xuXHRcdH07XG5cblx0XHRwLmludmFsaWRhdGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuX2xvY2tlZCA9IGZhbHNlOyAvL3VubG9jayBhbmQgc2V0IGN5Y2xlIGluIGNhc2UgaW52YWxpZGF0ZSgpIGlzIGNhbGxlZCBmcm9tIGluc2lkZSBhbiBvblJlcGVhdFxuXHRcdFx0cmV0dXJuIFRpbWVsaW5lTGl0ZS5wcm90b3R5cGUuaW52YWxpZGF0ZS5jYWxsKHRoaXMpO1xuXHRcdH07XG5cblx0XHRcbi8vLS0tLSBHRVRURVJTIC8gU0VUVEVSUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XG5cdFx0cC5wcm9ncmVzcyA9IGZ1bmN0aW9uKHZhbHVlLCBzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0cmV0dXJuICghYXJndW1lbnRzLmxlbmd0aCkgPyAodGhpcy5fdGltZSAvIHRoaXMuZHVyYXRpb24oKSkgfHwgMCA6IHRoaXMudG90YWxUaW1lKCB0aGlzLmR1cmF0aW9uKCkgKiAoKHRoaXMuX3lveW8gJiYgKHRoaXMuX2N5Y2xlICYgMSkgIT09IDApID8gMSAtIHZhbHVlIDogdmFsdWUpICsgKHRoaXMuX2N5Y2xlICogKHRoaXMuX2R1cmF0aW9uICsgdGhpcy5fcmVwZWF0RGVsYXkpKSwgc3VwcHJlc3NFdmVudHMpO1xuXHRcdH07XG5cdFx0XG5cdFx0cC50b3RhbFByb2dyZXNzID0gZnVuY3Rpb24odmFsdWUsIHN1cHByZXNzRXZlbnRzKSB7XG5cdFx0XHRyZXR1cm4gKCFhcmd1bWVudHMubGVuZ3RoKSA/ICh0aGlzLl90b3RhbFRpbWUgLyB0aGlzLnRvdGFsRHVyYXRpb24oKSkgfHwgMCA6IHRoaXMudG90YWxUaW1lKCB0aGlzLnRvdGFsRHVyYXRpb24oKSAqIHZhbHVlLCBzdXBwcmVzc0V2ZW50cyk7XG5cdFx0fTtcblxuXHRcdHAudG90YWxEdXJhdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2RpcnR5KSB7XG5cdFx0XHRcdFx0VGltZWxpbmVMaXRlLnByb3RvdHlwZS50b3RhbER1cmF0aW9uLmNhbGwodGhpcyk7IC8vanVzdCBmb3JjZXMgcmVmcmVzaFxuXHRcdFx0XHRcdC8vSW5zdGVhZCBvZiBJbmZpbml0eSwgd2UgdXNlIDk5OTk5OTk5OTk5OSBzbyB0aGF0IHdlIGNhbiBhY2NvbW1vZGF0ZSByZXZlcnNlcy5cblx0XHRcdFx0XHR0aGlzLl90b3RhbER1cmF0aW9uID0gKHRoaXMuX3JlcGVhdCA9PT0gLTEpID8gOTk5OTk5OTk5OTk5IDogdGhpcy5fZHVyYXRpb24gKiAodGhpcy5fcmVwZWF0ICsgMSkgKyAodGhpcy5fcmVwZWF0RGVsYXkgKiB0aGlzLl9yZXBlYXQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzLl90b3RhbER1cmF0aW9uO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICh0aGlzLl9yZXBlYXQgPT09IC0xIHx8ICF2YWx1ZSkgPyB0aGlzIDogdGhpcy50aW1lU2NhbGUoIHRoaXMudG90YWxEdXJhdGlvbigpIC8gdmFsdWUgKTtcblx0XHR9O1xuXHRcdFxuXHRcdHAudGltZSA9IGZ1bmN0aW9uKHZhbHVlLCBzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl90aW1lO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX2RpcnR5KSB7XG5cdFx0XHRcdHRoaXMudG90YWxEdXJhdGlvbigpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHZhbHVlID4gdGhpcy5fZHVyYXRpb24pIHtcblx0XHRcdFx0dmFsdWUgPSB0aGlzLl9kdXJhdGlvbjtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLl95b3lvICYmICh0aGlzLl9jeWNsZSAmIDEpICE9PSAwKSB7XG5cdFx0XHRcdHZhbHVlID0gKHRoaXMuX2R1cmF0aW9uIC0gdmFsdWUpICsgKHRoaXMuX2N5Y2xlICogKHRoaXMuX2R1cmF0aW9uICsgdGhpcy5fcmVwZWF0RGVsYXkpKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fcmVwZWF0ICE9PSAwKSB7XG5cdFx0XHRcdHZhbHVlICs9IHRoaXMuX2N5Y2xlICogKHRoaXMuX2R1cmF0aW9uICsgdGhpcy5fcmVwZWF0RGVsYXkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMudG90YWxUaW1lKHZhbHVlLCBzdXBwcmVzc0V2ZW50cyk7XG5cdFx0fTtcblx0XHRcblx0XHRwLnJlcGVhdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGVhdDtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3JlcGVhdCA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXMuX3VuY2FjaGUodHJ1ZSk7XG5cdFx0fTtcblx0XHRcblx0XHRwLnJlcGVhdERlbGF5ID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwZWF0RGVsYXk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9yZXBlYXREZWxheSA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXMuX3VuY2FjaGUodHJ1ZSk7XG5cdFx0fTtcblx0XHRcblx0XHRwLnlveW8gPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl95b3lvO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5feW95byA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblx0XHRcblx0XHRwLmN1cnJlbnRMYWJlbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0TGFiZWxCZWZvcmUodGhpcy5fdGltZSArIDAuMDAwMDAwMDEpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMuc2Vlayh2YWx1ZSwgdHJ1ZSk7XG5cdFx0fTtcblx0XHRcblx0XHRyZXR1cm4gVGltZWxpbmVNYXg7XG5cdFx0XG5cdH0sIHRydWUpO1xuXG5cblxuXG5cblxuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVGltZWxpbmVMaXRlXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXHRfZ3NTY29wZS5fZ3NEZWZpbmUoXCJUaW1lbGluZUxpdGVcIiwgW1wiY29yZS5BbmltYXRpb25cIixcImNvcmUuU2ltcGxlVGltZWxpbmVcIixcIlR3ZWVuTGl0ZVwiXSwgZnVuY3Rpb24oQW5pbWF0aW9uLCBTaW1wbGVUaW1lbGluZSwgVHdlZW5MaXRlKSB7XG5cblx0XHR2YXIgVGltZWxpbmVMaXRlID0gZnVuY3Rpb24odmFycykge1xuXHRcdFx0XHRTaW1wbGVUaW1lbGluZS5jYWxsKHRoaXMsIHZhcnMpO1xuXHRcdFx0XHR0aGlzLl9sYWJlbHMgPSB7fTtcblx0XHRcdFx0dGhpcy5hdXRvUmVtb3ZlQ2hpbGRyZW4gPSAodGhpcy52YXJzLmF1dG9SZW1vdmVDaGlsZHJlbiA9PT0gdHJ1ZSk7XG5cdFx0XHRcdHRoaXMuc21vb3RoQ2hpbGRUaW1pbmcgPSAodGhpcy52YXJzLnNtb290aENoaWxkVGltaW5nID09PSB0cnVlKTtcblx0XHRcdFx0dGhpcy5fc29ydENoaWxkcmVuID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fb25VcGRhdGUgPSB0aGlzLnZhcnMub25VcGRhdGU7XG5cdFx0XHRcdHZhciB2ID0gdGhpcy52YXJzLFxuXHRcdFx0XHRcdHZhbCwgcDtcblx0XHRcdFx0Zm9yIChwIGluIHYpIHtcblx0XHRcdFx0XHR2YWwgPSB2W3BdO1xuXHRcdFx0XHRcdGlmIChfaXNBcnJheSh2YWwpKSBpZiAodmFsLmpvaW4oXCJcIikuaW5kZXhPZihcIntzZWxmfVwiKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdHZbcF0gPSB0aGlzLl9zd2FwU2VsZkluUGFyYW1zKHZhbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChfaXNBcnJheSh2LnR3ZWVucykpIHtcblx0XHRcdFx0XHR0aGlzLmFkZCh2LnR3ZWVucywgMCwgdi5hbGlnbiwgdi5zdGFnZ2VyKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdF90aW55TnVtID0gMC4wMDAwMDAwMDAxLFxuXHRcdFx0VHdlZW5MaXRlSW50ZXJuYWxzID0gVHdlZW5MaXRlLl9pbnRlcm5hbHMsXG5cdFx0XHRfaW50ZXJuYWxzID0gVGltZWxpbmVMaXRlLl9pbnRlcm5hbHMgPSB7fSxcblx0XHRcdF9pc1NlbGVjdG9yID0gVHdlZW5MaXRlSW50ZXJuYWxzLmlzU2VsZWN0b3IsXG5cdFx0XHRfaXNBcnJheSA9IFR3ZWVuTGl0ZUludGVybmFscy5pc0FycmF5LFxuXHRcdFx0X2xhenlUd2VlbnMgPSBUd2VlbkxpdGVJbnRlcm5hbHMubGF6eVR3ZWVucyxcblx0XHRcdF9sYXp5UmVuZGVyID0gVHdlZW5MaXRlSW50ZXJuYWxzLmxhenlSZW5kZXIsXG5cdFx0XHRfZ2xvYmFscyA9IF9nc1Njb3BlLl9nc0RlZmluZS5nbG9iYWxzLFxuXHRcdFx0X2NvcHkgPSBmdW5jdGlvbih2YXJzKSB7XG5cdFx0XHRcdHZhciBjb3B5ID0ge30sIHA7XG5cdFx0XHRcdGZvciAocCBpbiB2YXJzKSB7XG5cdFx0XHRcdFx0Y29weVtwXSA9IHZhcnNbcF07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGNvcHk7XG5cdFx0XHR9LFxuXHRcdFx0X2FwcGx5Q3ljbGUgPSBmdW5jdGlvbih2YXJzLCB0YXJnZXRzLCBpKSB7XG5cdFx0XHRcdHZhciBhbHQgPSB2YXJzLmN5Y2xlLFxuXHRcdFx0XHRcdHAsIHZhbDtcblx0XHRcdFx0Zm9yIChwIGluIGFsdCkge1xuXHRcdFx0XHRcdHZhbCA9IGFsdFtwXTtcblx0XHRcdFx0XHR2YXJzW3BdID0gKHR5cGVvZih2YWwpID09PSBcImZ1bmN0aW9uXCIpID8gdmFsKGksIHRhcmdldHNbaV0pIDogdmFsW2kgJSB2YWwubGVuZ3RoXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWxldGUgdmFycy5jeWNsZTtcblx0XHRcdH0sXG5cdFx0XHRfcGF1c2VDYWxsYmFjayA9IF9pbnRlcm5hbHMucGF1c2VDYWxsYmFjayA9IGZ1bmN0aW9uKCkge30sXG5cdFx0XHRfc2xpY2UgPSBmdW5jdGlvbihhKSB7IC8vZG9uJ3QgdXNlIFtdLnNsaWNlIGJlY2F1c2UgdGhhdCBkb2Vzbid0IHdvcmsgaW4gSUU4IHdpdGggYSBOb2RlTGlzdCB0aGF0J3MgcmV0dXJuZWQgYnkgcXVlcnlTZWxlY3RvckFsbCgpXG5cdFx0XHRcdHZhciBiID0gW10sXG5cdFx0XHRcdFx0bCA9IGEubGVuZ3RoLFxuXHRcdFx0XHRcdGk7XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgIT09IGw7IGIucHVzaChhW2krK10pKTtcblx0XHRcdFx0cmV0dXJuIGI7XG5cdFx0XHR9LFxuXHRcdFx0cCA9IFRpbWVsaW5lTGl0ZS5wcm90b3R5cGUgPSBuZXcgU2ltcGxlVGltZWxpbmUoKTtcblxuXHRcdFRpbWVsaW5lTGl0ZS52ZXJzaW9uID0gXCIxLjIwLjNcIjtcblx0XHRwLmNvbnN0cnVjdG9yID0gVGltZWxpbmVMaXRlO1xuXHRcdHAua2lsbCgpLl9nYyA9IHAuX2ZvcmNpbmdQbGF5aGVhZCA9IHAuX2hhc1BhdXNlID0gZmFsc2U7XG5cblx0XHQvKiBtaWdodCB1c2UgbGF0ZXIuLi5cblx0XHQvL3RyYW5zbGF0ZXMgYSBsb2NhbCB0aW1lIGluc2lkZSBhbiBhbmltYXRpb24gdG8gdGhlIGNvcnJlc3BvbmRpbmcgdGltZSBvbiB0aGUgcm9vdC9nbG9iYWwgdGltZWxpbmUsIGZhY3RvcmluZyBpbiBhbGwgbmVzdGluZyBhbmQgdGltZVNjYWxlcy5cblx0XHRmdW5jdGlvbiBsb2NhbFRvR2xvYmFsKHRpbWUsIGFuaW1hdGlvbikge1xuXHRcdFx0d2hpbGUgKGFuaW1hdGlvbikge1xuXHRcdFx0XHR0aW1lID0gKHRpbWUgLyBhbmltYXRpb24uX3RpbWVTY2FsZSkgKyBhbmltYXRpb24uX3N0YXJ0VGltZTtcblx0XHRcdFx0YW5pbWF0aW9uID0gYW5pbWF0aW9uLnRpbWVsaW5lO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRpbWU7XG5cdFx0fVxuXG5cdFx0Ly90cmFuc2xhdGVzIHRoZSBzdXBwbGllZCB0aW1lIG9uIHRoZSByb290L2dsb2JhbCB0aW1lbGluZSBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIGxvY2FsIHRpbWUgaW5zaWRlIGEgcGFydGljdWxhciBhbmltYXRpb24sIGZhY3RvcmluZyBpbiBhbGwgbmVzdGluZyBhbmQgdGltZVNjYWxlc1xuXHRcdGZ1bmN0aW9uIGdsb2JhbFRvTG9jYWwodGltZSwgYW5pbWF0aW9uKSB7XG5cdFx0XHR2YXIgc2NhbGUgPSAxO1xuXHRcdFx0dGltZSAtPSBsb2NhbFRvR2xvYmFsKDAsIGFuaW1hdGlvbik7XG5cdFx0XHR3aGlsZSAoYW5pbWF0aW9uKSB7XG5cdFx0XHRcdHNjYWxlICo9IGFuaW1hdGlvbi5fdGltZVNjYWxlO1xuXHRcdFx0XHRhbmltYXRpb24gPSBhbmltYXRpb24udGltZWxpbmU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGltZSAqIHNjYWxlO1xuXHRcdH1cblx0XHQqL1xuXG5cdFx0cC50byA9IGZ1bmN0aW9uKHRhcmdldCwgZHVyYXRpb24sIHZhcnMsIHBvc2l0aW9uKSB7XG5cdFx0XHR2YXIgRW5naW5lID0gKHZhcnMucmVwZWF0ICYmIF9nbG9iYWxzLlR3ZWVuTWF4KSB8fCBUd2VlbkxpdGU7XG5cdFx0XHRyZXR1cm4gZHVyYXRpb24gPyB0aGlzLmFkZCggbmV3IEVuZ2luZSh0YXJnZXQsIGR1cmF0aW9uLCB2YXJzKSwgcG9zaXRpb24pIDogdGhpcy5zZXQodGFyZ2V0LCB2YXJzLCBwb3NpdGlvbik7XG5cdFx0fTtcblxuXHRcdHAuZnJvbSA9IGZ1bmN0aW9uKHRhcmdldCwgZHVyYXRpb24sIHZhcnMsIHBvc2l0aW9uKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hZGQoICgodmFycy5yZXBlYXQgJiYgX2dsb2JhbHMuVHdlZW5NYXgpIHx8IFR3ZWVuTGl0ZSkuZnJvbSh0YXJnZXQsIGR1cmF0aW9uLCB2YXJzKSwgcG9zaXRpb24pO1xuXHRcdH07XG5cblx0XHRwLmZyb21UbyA9IGZ1bmN0aW9uKHRhcmdldCwgZHVyYXRpb24sIGZyb21WYXJzLCB0b1ZhcnMsIHBvc2l0aW9uKSB7XG5cdFx0XHR2YXIgRW5naW5lID0gKHRvVmFycy5yZXBlYXQgJiYgX2dsb2JhbHMuVHdlZW5NYXgpIHx8IFR3ZWVuTGl0ZTtcblx0XHRcdHJldHVybiBkdXJhdGlvbiA/IHRoaXMuYWRkKCBFbmdpbmUuZnJvbVRvKHRhcmdldCwgZHVyYXRpb24sIGZyb21WYXJzLCB0b1ZhcnMpLCBwb3NpdGlvbikgOiB0aGlzLnNldCh0YXJnZXQsIHRvVmFycywgcG9zaXRpb24pO1xuXHRcdH07XG5cblx0XHRwLnN0YWdnZXJUbyA9IGZ1bmN0aW9uKHRhcmdldHMsIGR1cmF0aW9uLCB2YXJzLCBzdGFnZ2VyLCBwb3NpdGlvbiwgb25Db21wbGV0ZUFsbCwgb25Db21wbGV0ZUFsbFBhcmFtcywgb25Db21wbGV0ZUFsbFNjb3BlKSB7XG5cdFx0XHR2YXIgdGwgPSBuZXcgVGltZWxpbmVMaXRlKHtvbkNvbXBsZXRlOm9uQ29tcGxldGVBbGwsIG9uQ29tcGxldGVQYXJhbXM6b25Db21wbGV0ZUFsbFBhcmFtcywgY2FsbGJhY2tTY29wZTpvbkNvbXBsZXRlQWxsU2NvcGUsIHNtb290aENoaWxkVGltaW5nOnRoaXMuc21vb3RoQ2hpbGRUaW1pbmd9KSxcblx0XHRcdFx0Y3ljbGUgPSB2YXJzLmN5Y2xlLFxuXHRcdFx0XHRjb3B5LCBpO1xuXHRcdFx0aWYgKHR5cGVvZih0YXJnZXRzKSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHR0YXJnZXRzID0gVHdlZW5MaXRlLnNlbGVjdG9yKHRhcmdldHMpIHx8IHRhcmdldHM7XG5cdFx0XHR9XG5cdFx0XHR0YXJnZXRzID0gdGFyZ2V0cyB8fCBbXTtcblx0XHRcdGlmIChfaXNTZWxlY3Rvcih0YXJnZXRzKSkgeyAvL3NlbnNlcyBpZiB0aGUgdGFyZ2V0cyBvYmplY3QgaXMgYSBzZWxlY3Rvci4gSWYgaXQgaXMsIHdlIHNob3VsZCB0cmFuc2xhdGUgaXQgaW50byBhbiBhcnJheS5cblx0XHRcdFx0dGFyZ2V0cyA9IF9zbGljZSh0YXJnZXRzKTtcblx0XHRcdH1cblx0XHRcdHN0YWdnZXIgPSBzdGFnZ2VyIHx8IDA7XG5cdFx0XHRpZiAoc3RhZ2dlciA8IDApIHtcblx0XHRcdFx0dGFyZ2V0cyA9IF9zbGljZSh0YXJnZXRzKTtcblx0XHRcdFx0dGFyZ2V0cy5yZXZlcnNlKCk7XG5cdFx0XHRcdHN0YWdnZXIgKj0gLTE7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb3B5ID0gX2NvcHkodmFycyk7XG5cdFx0XHRcdGlmIChjb3B5LnN0YXJ0QXQpIHtcblx0XHRcdFx0XHRjb3B5LnN0YXJ0QXQgPSBfY29weShjb3B5LnN0YXJ0QXQpO1xuXHRcdFx0XHRcdGlmIChjb3B5LnN0YXJ0QXQuY3ljbGUpIHtcblx0XHRcdFx0XHRcdF9hcHBseUN5Y2xlKGNvcHkuc3RhcnRBdCwgdGFyZ2V0cywgaSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjeWNsZSkge1xuXHRcdFx0XHRcdF9hcHBseUN5Y2xlKGNvcHksIHRhcmdldHMsIGkpO1xuXHRcdFx0XHRcdGlmIChjb3B5LmR1cmF0aW9uICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdGR1cmF0aW9uID0gY29weS5kdXJhdGlvbjtcblx0XHRcdFx0XHRcdGRlbGV0ZSBjb3B5LmR1cmF0aW9uO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0bC50byh0YXJnZXRzW2ldLCBkdXJhdGlvbiwgY29weSwgaSAqIHN0YWdnZXIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMuYWRkKHRsLCBwb3NpdGlvbik7XG5cdFx0fTtcblxuXHRcdHAuc3RhZ2dlckZyb20gPSBmdW5jdGlvbih0YXJnZXRzLCBkdXJhdGlvbiwgdmFycywgc3RhZ2dlciwgcG9zaXRpb24sIG9uQ29tcGxldGVBbGwsIG9uQ29tcGxldGVBbGxQYXJhbXMsIG9uQ29tcGxldGVBbGxTY29wZSkge1xuXHRcdFx0dmFycy5pbW1lZGlhdGVSZW5kZXIgPSAodmFycy5pbW1lZGlhdGVSZW5kZXIgIT0gZmFsc2UpO1xuXHRcdFx0dmFycy5ydW5CYWNrd2FyZHMgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIHRoaXMuc3RhZ2dlclRvKHRhcmdldHMsIGR1cmF0aW9uLCB2YXJzLCBzdGFnZ2VyLCBwb3NpdGlvbiwgb25Db21wbGV0ZUFsbCwgb25Db21wbGV0ZUFsbFBhcmFtcywgb25Db21wbGV0ZUFsbFNjb3BlKTtcblx0XHR9O1xuXG5cdFx0cC5zdGFnZ2VyRnJvbVRvID0gZnVuY3Rpb24odGFyZ2V0cywgZHVyYXRpb24sIGZyb21WYXJzLCB0b1ZhcnMsIHN0YWdnZXIsIHBvc2l0aW9uLCBvbkNvbXBsZXRlQWxsLCBvbkNvbXBsZXRlQWxsUGFyYW1zLCBvbkNvbXBsZXRlQWxsU2NvcGUpIHtcblx0XHRcdHRvVmFycy5zdGFydEF0ID0gZnJvbVZhcnM7XG5cdFx0XHR0b1ZhcnMuaW1tZWRpYXRlUmVuZGVyID0gKHRvVmFycy5pbW1lZGlhdGVSZW5kZXIgIT0gZmFsc2UgJiYgZnJvbVZhcnMuaW1tZWRpYXRlUmVuZGVyICE9IGZhbHNlKTtcblx0XHRcdHJldHVybiB0aGlzLnN0YWdnZXJUbyh0YXJnZXRzLCBkdXJhdGlvbiwgdG9WYXJzLCBzdGFnZ2VyLCBwb3NpdGlvbiwgb25Db21wbGV0ZUFsbCwgb25Db21wbGV0ZUFsbFBhcmFtcywgb25Db21wbGV0ZUFsbFNjb3BlKTtcblx0XHR9O1xuXG5cdFx0cC5jYWxsID0gZnVuY3Rpb24oY2FsbGJhY2ssIHBhcmFtcywgc2NvcGUsIHBvc2l0aW9uKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hZGQoIFR3ZWVuTGl0ZS5kZWxheWVkQ2FsbCgwLCBjYWxsYmFjaywgcGFyYW1zLCBzY29wZSksIHBvc2l0aW9uKTtcblx0XHR9O1xuXG5cdFx0cC5zZXQgPSBmdW5jdGlvbih0YXJnZXQsIHZhcnMsIHBvc2l0aW9uKSB7XG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuX3BhcnNlVGltZU9yTGFiZWwocG9zaXRpb24sIDAsIHRydWUpO1xuXHRcdFx0aWYgKHZhcnMuaW1tZWRpYXRlUmVuZGVyID09IG51bGwpIHtcblx0XHRcdFx0dmFycy5pbW1lZGlhdGVSZW5kZXIgPSAocG9zaXRpb24gPT09IHRoaXMuX3RpbWUgJiYgIXRoaXMuX3BhdXNlZCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5hZGQoIG5ldyBUd2VlbkxpdGUodGFyZ2V0LCAwLCB2YXJzKSwgcG9zaXRpb24pO1xuXHRcdH07XG5cblx0XHRUaW1lbGluZUxpdGUuZXhwb3J0Um9vdCA9IGZ1bmN0aW9uKHZhcnMsIGlnbm9yZURlbGF5ZWRDYWxscykge1xuXHRcdFx0dmFycyA9IHZhcnMgfHwge307XG5cdFx0XHRpZiAodmFycy5zbW9vdGhDaGlsZFRpbWluZyA9PSBudWxsKSB7XG5cdFx0XHRcdHZhcnMuc21vb3RoQ2hpbGRUaW1pbmcgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHRsID0gbmV3IFRpbWVsaW5lTGl0ZSh2YXJzKSxcblx0XHRcdFx0cm9vdCA9IHRsLl90aW1lbGluZSxcblx0XHRcdFx0aGFzTmVnYXRpdmVTdGFydCwgdGltZSxcdHR3ZWVuLCBuZXh0O1xuXHRcdFx0aWYgKGlnbm9yZURlbGF5ZWRDYWxscyA9PSBudWxsKSB7XG5cdFx0XHRcdGlnbm9yZURlbGF5ZWRDYWxscyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRyb290Ll9yZW1vdmUodGwsIHRydWUpO1xuXHRcdFx0dGwuX3N0YXJ0VGltZSA9IDA7XG5cdFx0XHR0bC5fcmF3UHJldlRpbWUgPSB0bC5fdGltZSA9IHRsLl90b3RhbFRpbWUgPSByb290Ll90aW1lO1xuXHRcdFx0dHdlZW4gPSByb290Ll9maXJzdDtcblx0XHRcdHdoaWxlICh0d2Vlbikge1xuXHRcdFx0XHRuZXh0ID0gdHdlZW4uX25leHQ7XG5cdFx0XHRcdGlmICghaWdub3JlRGVsYXllZENhbGxzIHx8ICEodHdlZW4gaW5zdGFuY2VvZiBUd2VlbkxpdGUgJiYgdHdlZW4udGFyZ2V0ID09PSB0d2Vlbi52YXJzLm9uQ29tcGxldGUpKSB7XG5cdFx0XHRcdFx0dGltZSA9IHR3ZWVuLl9zdGFydFRpbWUgLSB0d2Vlbi5fZGVsYXk7XG5cdFx0XHRcdFx0aWYgKHRpbWUgPCAwKSB7XG5cdFx0XHRcdFx0XHRoYXNOZWdhdGl2ZVN0YXJ0ID0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGwuYWRkKHR3ZWVuLCB0aW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0d2VlbiA9IG5leHQ7XG5cdFx0XHR9XG5cdFx0XHRyb290LmFkZCh0bCwgMCk7XG5cdFx0XHRpZiAoaGFzTmVnYXRpdmVTdGFydCkgeyAvL2NhbGxpbmcgdG90YWxEdXJhdGlvbigpIHdpbGwgZm9yY2UgdGhlIGFkanVzdG1lbnQgbmVjZXNzYXJ5IHRvIHNoaWZ0IHRoZSBjaGlsZHJlbiBmb3J3YXJkIHNvIG5vbmUgb2YgdGhlbSBzdGFydCBiZWZvcmUgemVybywgYW5kIG1vdmVzIHRoZSB0aW1lbGluZSBiYWNrd2FyZHMgdGhlIHNhbWUgYW1vdW50LCBzbyB0aGUgcGxheWhlYWQgaXMgc3RpbGwgYWxpZ25lZCB3aGVyZSBpdCBzaG91bGQgYmUgZ2xvYmFsbHksIGJ1dCB0aGUgdGltZWxpbmUgZG9lc24ndCBoYXZlIGlsbGVnYWwgY2hpbGRyZW4gdGhhdCBzdGFydCBiZWZvcmUgemVyby5cblx0XHRcdFx0dGwudG90YWxEdXJhdGlvbigpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRsO1xuXHRcdH07XG5cblx0XHRwLmFkZCA9IGZ1bmN0aW9uKHZhbHVlLCBwb3NpdGlvbiwgYWxpZ24sIHN0YWdnZXIpIHtcblx0XHRcdHZhciBjdXJUaW1lLCBsLCBpLCBjaGlsZCwgdGwsIGJlZm9yZVJhd1RpbWU7XG5cdFx0XHRpZiAodHlwZW9mKHBvc2l0aW9uKSAhPT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHRwb3NpdGlvbiA9IHRoaXMuX3BhcnNlVGltZU9yTGFiZWwocG9zaXRpb24sIDAsIHRydWUsIHZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgQW5pbWF0aW9uKSkge1xuXHRcdFx0XHRpZiAoKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHx8ICh2YWx1ZSAmJiB2YWx1ZS5wdXNoICYmIF9pc0FycmF5KHZhbHVlKSkpIHtcblx0XHRcdFx0XHRhbGlnbiA9IGFsaWduIHx8IFwibm9ybWFsXCI7XG5cdFx0XHRcdFx0c3RhZ2dlciA9IHN0YWdnZXIgfHwgMDtcblx0XHRcdFx0XHRjdXJUaW1lID0gcG9zaXRpb247XG5cdFx0XHRcdFx0bCA9IHZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkoY2hpbGQgPSB2YWx1ZVtpXSkpIHtcblx0XHRcdFx0XHRcdFx0Y2hpbGQgPSBuZXcgVGltZWxpbmVMaXRlKHt0d2VlbnM6Y2hpbGR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuYWRkKGNoaWxkLCBjdXJUaW1lKTtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YoY2hpbGQpICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZihjaGlsZCkgIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRpZiAoYWxpZ24gPT09IFwic2VxdWVuY2VcIikge1xuXHRcdFx0XHRcdFx0XHRcdGN1clRpbWUgPSBjaGlsZC5fc3RhcnRUaW1lICsgKGNoaWxkLnRvdGFsRHVyYXRpb24oKSAvIGNoaWxkLl90aW1lU2NhbGUpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGFsaWduID09PSBcInN0YXJ0XCIpIHtcblx0XHRcdFx0XHRcdFx0XHRjaGlsZC5fc3RhcnRUaW1lIC09IGNoaWxkLmRlbGF5KCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGN1clRpbWUgKz0gc3RhZ2dlcjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3VuY2FjaGUodHJ1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mKHZhbHVlKSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmFkZExhYmVsKHZhbHVlLCBwb3NpdGlvbik7XG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mKHZhbHVlKSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBUd2VlbkxpdGUuZGVsYXllZENhbGwoMCwgdmFsdWUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93KFwiQ2Fubm90IGFkZCBcIiArIHZhbHVlICsgXCIgaW50byB0aGUgdGltZWxpbmU7IGl0IGlzIG5vdCBhIHR3ZWVuLCB0aW1lbGluZSwgZnVuY3Rpb24sIG9yIHN0cmluZy5cIik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0U2ltcGxlVGltZWxpbmUucHJvdG90eXBlLmFkZC5jYWxsKHRoaXMsIHZhbHVlLCBwb3NpdGlvbik7XG5cblx0XHRcdGlmICh2YWx1ZS5fdGltZSkgeyAvL2luIGNhc2UsIGZvciBleGFtcGxlLCB0aGUgX3N0YXJ0VGltZSBpcyBtb3ZlZCBvbiBhIHR3ZWVuIHRoYXQgaGFzIGFscmVhZHkgcmVuZGVyZWQuIEltYWdpbmUgaXQncyBhdCBpdHMgZW5kIHN0YXRlLCB0aGVuIHRoZSBzdGFydFRpbWUgaXMgbW92ZWQgV0FZIGxhdGVyIChhZnRlciB0aGUgZW5kIG9mIHRoaXMgdGltZWxpbmUpLCBpdCBzaG91bGQgcmVuZGVyIGF0IGl0cyBiZWdpbm5pbmcuXG5cdFx0XHRcdHZhbHVlLnJlbmRlcigodGhpcy5yYXdUaW1lKCkgLSB2YWx1ZS5fc3RhcnRUaW1lKSAqIHZhbHVlLl90aW1lU2NhbGUsIGZhbHNlLCBmYWxzZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vaWYgdGhlIHRpbWVsaW5lIGhhcyBhbHJlYWR5IGVuZGVkIGJ1dCB0aGUgaW5zZXJ0ZWQgdHdlZW4vdGltZWxpbmUgZXh0ZW5kcyB0aGUgZHVyYXRpb24sIHdlIHNob3VsZCBlbmFibGUgdGhpcyB0aW1lbGluZSBhZ2FpbiBzbyB0aGF0IGl0IHJlbmRlcnMgcHJvcGVybHkuIFdlIHNob3VsZCBhbHNvIGFsaWduIHRoZSBwbGF5aGVhZCB3aXRoIHRoZSBwYXJlbnQgdGltZWxpbmUncyB3aGVuIGFwcHJvcHJpYXRlLlxuXHRcdFx0aWYgKHRoaXMuX2djIHx8IHRoaXMuX3RpbWUgPT09IHRoaXMuX2R1cmF0aW9uKSBpZiAoIXRoaXMuX3BhdXNlZCkgaWYgKHRoaXMuX2R1cmF0aW9uIDwgdGhpcy5kdXJhdGlvbigpKSB7XG5cdFx0XHRcdC8vaW4gY2FzZSBhbnkgb2YgdGhlIGFuY2VzdG9ycyBoYWQgY29tcGxldGVkIGJ1dCBzaG91bGQgbm93IGJlIGVuYWJsZWQuLi5cblx0XHRcdFx0dGwgPSB0aGlzO1xuXHRcdFx0XHRiZWZvcmVSYXdUaW1lID0gKHRsLnJhd1RpbWUoKSA+IHZhbHVlLl9zdGFydFRpbWUpOyAvL2lmIHRoZSB0d2VlbiBpcyBwbGFjZWQgb24gdGhlIHRpbWVsaW5lIHNvIHRoYXQgaXQgc3RhcnRzIEJFRk9SRSB0aGUgY3VycmVudCByYXdUaW1lLCB3ZSBzaG91bGQgYWxpZ24gdGhlIHBsYXloZWFkIChtb3ZlIHRoZSB0aW1lbGluZSkuIFRoaXMgaXMgYmVjYXVzZSBzb21ldGltZXMgdXNlcnMgd2lsbCBjcmVhdGUgYSB0aW1lbGluZSwgbGV0IGl0IGZpbmlzaCwgYW5kIG11Y2ggbGF0ZXIgYXBwZW5kIGEgdHdlZW4gYW5kIGV4cGVjdCBpdCB0byBydW4gaW5zdGVhZCBvZiBqdW1waW5nIHRvIGl0cyBlbmQgc3RhdGUuIFdoaWxlIHRlY2huaWNhbGx5IG9uZSBjb3VsZCBhcmd1ZSB0aGF0IGl0IHNob3VsZCBqdW1wIHRvIGl0cyBlbmQgc3RhdGUsIHRoYXQncyBub3Qgd2hhdCB1c2VycyBpbnR1aXRpdmVseSBleHBlY3QuXG5cdFx0XHRcdHdoaWxlICh0bC5fdGltZWxpbmUpIHtcblx0XHRcdFx0XHRpZiAoYmVmb3JlUmF3VGltZSAmJiB0bC5fdGltZWxpbmUuc21vb3RoQ2hpbGRUaW1pbmcpIHtcblx0XHRcdFx0XHRcdHRsLnRvdGFsVGltZSh0bC5fdG90YWxUaW1lLCB0cnVlKTsgLy9tb3ZlcyB0aGUgdGltZWxpbmUgKHNoaWZ0cyBpdHMgc3RhcnRUaW1lKSBpZiBuZWNlc3NhcnksIGFuZCBhbHNvIGVuYWJsZXMgaXQuXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0bC5fZ2MpIHtcblx0XHRcdFx0XHRcdHRsLl9lbmFibGVkKHRydWUsIGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGwgPSB0bC5fdGltZWxpbmU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdHAucmVtb3ZlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFuaW1hdGlvbikge1xuXHRcdFx0XHR0aGlzLl9yZW1vdmUodmFsdWUsIGZhbHNlKTtcblx0XHRcdFx0dmFyIHRsID0gdmFsdWUuX3RpbWVsaW5lID0gdmFsdWUudmFycy51c2VGcmFtZXMgPyBBbmltYXRpb24uX3Jvb3RGcmFtZXNUaW1lbGluZSA6IEFuaW1hdGlvbi5fcm9vdFRpbWVsaW5lOyAvL25vdyB0aGF0IGl0J3MgcmVtb3ZlZCwgZGVmYXVsdCBpdCB0byB0aGUgcm9vdCB0aW1lbGluZSBzbyB0aGF0IGlmIGl0IGdldHMgcGxheWVkIGFnYWluLCBpdCBkb2Vzbid0IGp1bXAgYmFjayBpbnRvIHRoaXMgdGltZWxpbmUuXG5cdFx0XHRcdHZhbHVlLl9zdGFydFRpbWUgPSAodmFsdWUuX3BhdXNlZCA/IHZhbHVlLl9wYXVzZVRpbWUgOiB0bC5fdGltZSkgLSAoKCF2YWx1ZS5fcmV2ZXJzZWQgPyB2YWx1ZS5fdG90YWxUaW1lIDogdmFsdWUudG90YWxEdXJhdGlvbigpIC0gdmFsdWUuX3RvdGFsVGltZSkgLyB2YWx1ZS5fdGltZVNjYWxlKTsgLy9lbnN1cmUgdGhhdCBpZiBpdCBnZXRzIHBsYXllZCBhZ2FpbiwgdGhlIHRpbWluZyBpcyBjb3JyZWN0LlxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSB8fCAodmFsdWUgJiYgdmFsdWUucHVzaCAmJiBfaXNBcnJheSh2YWx1ZSkpKSB7XG5cdFx0XHRcdHZhciBpID0gdmFsdWUubGVuZ3RoO1xuXHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHR0aGlzLnJlbW92ZSh2YWx1ZVtpXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZih2YWx1ZSkgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMucmVtb3ZlTGFiZWwodmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMua2lsbChudWxsLCB2YWx1ZSk7XG5cdFx0fTtcblxuXHRcdHAuX3JlbW92ZSA9IGZ1bmN0aW9uKHR3ZWVuLCBza2lwRGlzYWJsZSkge1xuXHRcdFx0U2ltcGxlVGltZWxpbmUucHJvdG90eXBlLl9yZW1vdmUuY2FsbCh0aGlzLCB0d2Vlbiwgc2tpcERpc2FibGUpO1xuXHRcdFx0dmFyIGxhc3QgPSB0aGlzLl9sYXN0O1xuXHRcdFx0aWYgKCFsYXN0KSB7XG5cdFx0XHRcdHRoaXMuX3RpbWUgPSB0aGlzLl90b3RhbFRpbWUgPSB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX3RvdGFsRHVyYXRpb24gPSAwO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLl90aW1lID4gdGhpcy5kdXJhdGlvbigpKSB7XG5cdFx0XHRcdHRoaXMuX3RpbWUgPSB0aGlzLl9kdXJhdGlvbjtcblx0XHRcdFx0dGhpcy5fdG90YWxUaW1lID0gdGhpcy5fdG90YWxEdXJhdGlvbjtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cblx0XHRwLmFwcGVuZCA9IGZ1bmN0aW9uKHZhbHVlLCBvZmZzZXRPckxhYmVsKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hZGQodmFsdWUsIHRoaXMuX3BhcnNlVGltZU9yTGFiZWwobnVsbCwgb2Zmc2V0T3JMYWJlbCwgdHJ1ZSwgdmFsdWUpKTtcblx0XHR9O1xuXG5cdFx0cC5pbnNlcnQgPSBwLmluc2VydE11bHRpcGxlID0gZnVuY3Rpb24odmFsdWUsIHBvc2l0aW9uLCBhbGlnbiwgc3RhZ2dlcikge1xuXHRcdFx0cmV0dXJuIHRoaXMuYWRkKHZhbHVlLCBwb3NpdGlvbiB8fCAwLCBhbGlnbiwgc3RhZ2dlcik7XG5cdFx0fTtcblxuXHRcdHAuYXBwZW5kTXVsdGlwbGUgPSBmdW5jdGlvbih0d2VlbnMsIG9mZnNldE9yTGFiZWwsIGFsaWduLCBzdGFnZ2VyKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hZGQodHdlZW5zLCB0aGlzLl9wYXJzZVRpbWVPckxhYmVsKG51bGwsIG9mZnNldE9yTGFiZWwsIHRydWUsIHR3ZWVucyksIGFsaWduLCBzdGFnZ2VyKTtcblx0XHR9O1xuXG5cdFx0cC5hZGRMYWJlbCA9IGZ1bmN0aW9uKGxhYmVsLCBwb3NpdGlvbikge1xuXHRcdFx0dGhpcy5fbGFiZWxzW2xhYmVsXSA9IHRoaXMuX3BhcnNlVGltZU9yTGFiZWwocG9zaXRpb24pO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdHAuYWRkUGF1c2UgPSBmdW5jdGlvbihwb3NpdGlvbiwgY2FsbGJhY2ssIHBhcmFtcywgc2NvcGUpIHtcblx0XHRcdHZhciB0ID0gVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKDAsIF9wYXVzZUNhbGxiYWNrLCBwYXJhbXMsIHNjb3BlIHx8IHRoaXMpO1xuXHRcdFx0dC52YXJzLm9uQ29tcGxldGUgPSB0LnZhcnMub25SZXZlcnNlQ29tcGxldGUgPSBjYWxsYmFjaztcblx0XHRcdHQuZGF0YSA9IFwiaXNQYXVzZVwiO1xuXHRcdFx0dGhpcy5faGFzUGF1c2UgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIHRoaXMuYWRkKHQsIHBvc2l0aW9uKTtcblx0XHR9O1xuXG5cdFx0cC5yZW1vdmVMYWJlbCA9IGZ1bmN0aW9uKGxhYmVsKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5fbGFiZWxzW2xhYmVsXTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cblx0XHRwLmdldExhYmVsVGltZSA9IGZ1bmN0aW9uKGxhYmVsKSB7XG5cdFx0XHRyZXR1cm4gKHRoaXMuX2xhYmVsc1tsYWJlbF0gIT0gbnVsbCkgPyB0aGlzLl9sYWJlbHNbbGFiZWxdIDogLTE7XG5cdFx0fTtcblxuXHRcdHAuX3BhcnNlVGltZU9yTGFiZWwgPSBmdW5jdGlvbih0aW1lT3JMYWJlbCwgb2Zmc2V0T3JMYWJlbCwgYXBwZW5kSWZBYnNlbnQsIGlnbm9yZSkge1xuXHRcdFx0dmFyIGNsaXBwZWREdXJhdGlvbiwgaTtcblx0XHRcdC8vaWYgd2UncmUgYWJvdXQgdG8gYWRkIGEgdHdlZW4vdGltZWxpbmUgKG9yIGFuIGFycmF5IG9mIHRoZW0pIHRoYXQncyBhbHJlYWR5IGEgY2hpbGQgb2YgdGhpcyB0aW1lbGluZSwgd2Ugc2hvdWxkIHJlbW92ZSBpdCBmaXJzdCBzbyB0aGF0IGl0IGRvZXNuJ3QgY29udGFtaW5hdGUgdGhlIGR1cmF0aW9uKCkuXG5cdFx0XHRpZiAoaWdub3JlIGluc3RhbmNlb2YgQW5pbWF0aW9uICYmIGlnbm9yZS50aW1lbGluZSA9PT0gdGhpcykge1xuXHRcdFx0XHR0aGlzLnJlbW92ZShpZ25vcmUpO1xuXHRcdFx0fSBlbHNlIGlmIChpZ25vcmUgJiYgKChpZ25vcmUgaW5zdGFuY2VvZiBBcnJheSkgfHwgKGlnbm9yZS5wdXNoICYmIF9pc0FycmF5KGlnbm9yZSkpKSkge1xuXHRcdFx0XHRpID0gaWdub3JlLmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0aWYgKGlnbm9yZVtpXSBpbnN0YW5jZW9mIEFuaW1hdGlvbiAmJiBpZ25vcmVbaV0udGltZWxpbmUgPT09IHRoaXMpIHtcblx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlKGlnbm9yZVtpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjbGlwcGVkRHVyYXRpb24gPSAodHlwZW9mKHRpbWVPckxhYmVsKSA9PT0gXCJudW1iZXJcIiAmJiAhb2Zmc2V0T3JMYWJlbCkgPyAwIDogKHRoaXMuZHVyYXRpb24oKSA+IDk5OTk5OTk5OTk5KSA/IHRoaXMucmVjZW50KCkuZW5kVGltZShmYWxzZSkgOiB0aGlzLl9kdXJhdGlvbjsgLy9pbiBjYXNlIHRoZXJlJ3MgYSBjaGlsZCB0aGF0IGluZmluaXRlbHkgcmVwZWF0cywgdXNlcnMgYWxtb3N0IG5ldmVyIGludGVuZCBmb3IgdGhlIGluc2VydGlvbiBwb2ludCBvZiBhIG5ldyBjaGlsZCB0byBiZSBiYXNlZCBvbiBhIFNVUEVSIGxvbmcgdmFsdWUgbGlrZSB0aGF0IHNvIHdlIGNsaXAgaXQgYW5kIGFzc3VtZSB0aGUgbW9zdCByZWNlbnRseS1hZGRlZCBjaGlsZCdzIGVuZFRpbWUgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC5cblx0XHRcdGlmICh0eXBlb2Yob2Zmc2V0T3JMYWJlbCkgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3BhcnNlVGltZU9yTGFiZWwob2Zmc2V0T3JMYWJlbCwgKGFwcGVuZElmQWJzZW50ICYmIHR5cGVvZih0aW1lT3JMYWJlbCkgPT09IFwibnVtYmVyXCIgJiYgdGhpcy5fbGFiZWxzW29mZnNldE9yTGFiZWxdID09IG51bGwpID8gdGltZU9yTGFiZWwgLSBjbGlwcGVkRHVyYXRpb24gOiAwLCBhcHBlbmRJZkFic2VudCk7XG5cdFx0XHR9XG5cdFx0XHRvZmZzZXRPckxhYmVsID0gb2Zmc2V0T3JMYWJlbCB8fCAwO1xuXHRcdFx0aWYgKHR5cGVvZih0aW1lT3JMYWJlbCkgPT09IFwic3RyaW5nXCIgJiYgKGlzTmFOKHRpbWVPckxhYmVsKSB8fCB0aGlzLl9sYWJlbHNbdGltZU9yTGFiZWxdICE9IG51bGwpKSB7IC8vaWYgdGhlIHN0cmluZyBpcyBhIG51bWJlciBsaWtlIFwiMVwiLCBjaGVjayB0byBzZWUgaWYgdGhlcmUncyBhIGxhYmVsIHdpdGggdGhhdCBuYW1lLCBvdGhlcndpc2UgaW50ZXJwcmV0IGl0IGFzIGEgbnVtYmVyIChhYnNvbHV0ZSB2YWx1ZSkuXG5cdFx0XHRcdGkgPSB0aW1lT3JMYWJlbC5pbmRleE9mKFwiPVwiKTtcblx0XHRcdFx0aWYgKGkgPT09IC0xKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2xhYmVsc1t0aW1lT3JMYWJlbF0gPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGFwcGVuZElmQWJzZW50ID8gKHRoaXMuX2xhYmVsc1t0aW1lT3JMYWJlbF0gPSBjbGlwcGVkRHVyYXRpb24gKyBvZmZzZXRPckxhYmVsKSA6IG9mZnNldE9yTGFiZWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9sYWJlbHNbdGltZU9yTGFiZWxdICsgb2Zmc2V0T3JMYWJlbDtcblx0XHRcdFx0fVxuXHRcdFx0XHRvZmZzZXRPckxhYmVsID0gcGFyc2VJbnQodGltZU9yTGFiZWwuY2hhckF0KGktMSkgKyBcIjFcIiwgMTApICogTnVtYmVyKHRpbWVPckxhYmVsLnN1YnN0cihpKzEpKTtcblx0XHRcdFx0dGltZU9yTGFiZWwgPSAoaSA+IDEpID8gdGhpcy5fcGFyc2VUaW1lT3JMYWJlbCh0aW1lT3JMYWJlbC5zdWJzdHIoMCwgaS0xKSwgMCwgYXBwZW5kSWZBYnNlbnQpIDogY2xpcHBlZER1cmF0aW9uO1xuXHRcdFx0fSBlbHNlIGlmICh0aW1lT3JMYWJlbCA9PSBudWxsKSB7XG5cdFx0XHRcdHRpbWVPckxhYmVsID0gY2xpcHBlZER1cmF0aW9uO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIE51bWJlcih0aW1lT3JMYWJlbCkgKyBvZmZzZXRPckxhYmVsO1xuXHRcdH07XG5cblx0XHRwLnNlZWsgPSBmdW5jdGlvbihwb3NpdGlvbiwgc3VwcHJlc3NFdmVudHMpIHtcblx0XHRcdHJldHVybiB0aGlzLnRvdGFsVGltZSgodHlwZW9mKHBvc2l0aW9uKSA9PT0gXCJudW1iZXJcIikgPyBwb3NpdGlvbiA6IHRoaXMuX3BhcnNlVGltZU9yTGFiZWwocG9zaXRpb24pLCAoc3VwcHJlc3NFdmVudHMgIT09IGZhbHNlKSk7XG5cdFx0fTtcblxuXHRcdHAuc3RvcCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGF1c2VkKHRydWUpO1xuXHRcdH07XG5cblx0XHRwLmdvdG9BbmRQbGF5ID0gZnVuY3Rpb24ocG9zaXRpb24sIHN1cHByZXNzRXZlbnRzKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wbGF5KHBvc2l0aW9uLCBzdXBwcmVzc0V2ZW50cyk7XG5cdFx0fTtcblxuXHRcdHAuZ290b0FuZFN0b3AgPSBmdW5jdGlvbihwb3NpdGlvbiwgc3VwcHJlc3NFdmVudHMpIHtcblx0XHRcdHJldHVybiB0aGlzLnBhdXNlKHBvc2l0aW9uLCBzdXBwcmVzc0V2ZW50cyk7XG5cdFx0fTtcblxuXHRcdHAucmVuZGVyID0gZnVuY3Rpb24odGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB7XG5cdFx0XHRpZiAodGhpcy5fZ2MpIHtcblx0XHRcdFx0dGhpcy5fZW5hYmxlZCh0cnVlLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgdG90YWxEdXIgPSAoIXRoaXMuX2RpcnR5KSA/IHRoaXMuX3RvdGFsRHVyYXRpb24gOiB0aGlzLnRvdGFsRHVyYXRpb24oKSxcblx0XHRcdFx0cHJldlRpbWUgPSB0aGlzLl90aW1lLFxuXHRcdFx0XHRwcmV2U3RhcnQgPSB0aGlzLl9zdGFydFRpbWUsXG5cdFx0XHRcdHByZXZUaW1lU2NhbGUgPSB0aGlzLl90aW1lU2NhbGUsXG5cdFx0XHRcdHByZXZQYXVzZWQgPSB0aGlzLl9wYXVzZWQsXG5cdFx0XHRcdHR3ZWVuLCBpc0NvbXBsZXRlLCBuZXh0LCBjYWxsYmFjaywgaW50ZXJuYWxGb3JjZSwgcGF1c2VUd2VlbiwgY3VyVGltZTtcblx0XHRcdGlmICh0aW1lID49IHRvdGFsRHVyIC0gMC4wMDAwMDAxICYmIHRpbWUgPj0gMCkgeyAvL3RvIHdvcmsgYXJvdW5kIG9jY2FzaW9uYWwgZmxvYXRpbmcgcG9pbnQgbWF0aCBhcnRpZmFjdHMuXG5cdFx0XHRcdHRoaXMuX3RvdGFsVGltZSA9IHRoaXMuX3RpbWUgPSB0b3RhbER1cjtcblx0XHRcdFx0aWYgKCF0aGlzLl9yZXZlcnNlZCkgaWYgKCF0aGlzLl9oYXNQYXVzZWRDaGlsZCgpKSB7XG5cdFx0XHRcdFx0aXNDb21wbGV0ZSA9IHRydWU7XG5cdFx0XHRcdFx0Y2FsbGJhY2sgPSBcIm9uQ29tcGxldGVcIjtcblx0XHRcdFx0XHRpbnRlcm5hbEZvcmNlID0gISF0aGlzLl90aW1lbGluZS5hdXRvUmVtb3ZlQ2hpbGRyZW47IC8vb3RoZXJ3aXNlLCBpZiB0aGUgYW5pbWF0aW9uIGlzIHVucGF1c2VkL2FjdGl2YXRlZCBhZnRlciBpdCdzIGFscmVhZHkgZmluaXNoZWQsIGl0IGRvZXNuJ3QgZ2V0IHJlbW92ZWQgZnJvbSB0aGUgcGFyZW50IHRpbWVsaW5lLlxuXHRcdFx0XHRcdGlmICh0aGlzLl9kdXJhdGlvbiA9PT0gMCkgaWYgKCh0aW1lIDw9IDAgJiYgdGltZSA+PSAtMC4wMDAwMDAxKSB8fCB0aGlzLl9yYXdQcmV2VGltZSA8IDAgfHwgdGhpcy5fcmF3UHJldlRpbWUgPT09IF90aW55TnVtKSBpZiAodGhpcy5fcmF3UHJldlRpbWUgIT09IHRpbWUgJiYgdGhpcy5fZmlyc3QpIHtcblx0XHRcdFx0XHRcdGludGVybmFsRm9yY2UgPSB0cnVlO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX3Jhd1ByZXZUaW1lID4gX3RpbnlOdW0pIHtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSBcIm9uUmV2ZXJzZUNvbXBsZXRlXCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3Jhd1ByZXZUaW1lID0gKHRoaXMuX2R1cmF0aW9uIHx8ICFzdXBwcmVzc0V2ZW50cyB8fCB0aW1lIHx8IHRoaXMuX3Jhd1ByZXZUaW1lID09PSB0aW1lKSA/IHRpbWUgOiBfdGlueU51bTsgLy93aGVuIHRoZSBwbGF5aGVhZCBhcnJpdmVzIGF0IEVYQUNUTFkgdGltZSAwIChyaWdodCBvbiB0b3ApIG9mIGEgemVyby1kdXJhdGlvbiB0aW1lbGluZSBvciB0d2Vlbiwgd2UgbmVlZCB0byBkaXNjZXJuIGlmIGV2ZW50cyBhcmUgc3VwcHJlc3NlZCBzbyB0aGF0IHdoZW4gdGhlIHBsYXloZWFkIG1vdmVzIGFnYWluIChuZXh0IHRpbWUpLCBpdCdsbCB0cmlnZ2VyIHRoZSBjYWxsYmFjay4gSWYgZXZlbnRzIGFyZSBOT1Qgc3VwcHJlc3NlZCwgb2J2aW91c2x5IHRoZSBjYWxsYmFjayB3b3VsZCBiZSB0cmlnZ2VyZWQgaW4gdGhpcyByZW5kZXIuIEJhc2ljYWxseSwgdGhlIGNhbGxiYWNrIHNob3VsZCBmaXJlIGVpdGhlciB3aGVuIHRoZSBwbGF5aGVhZCBBUlJJVkVTIG9yIExFQVZFUyB0aGlzIGV4YWN0IHNwb3QsIG5vdCBib3RoLiBJbWFnaW5lIGRvaW5nIGEgdGltZWxpbmUuc2VlaygwKSBhbmQgdGhlcmUncyBhIGNhbGxiYWNrIHRoYXQgc2l0cyBhdCAwLiBTaW5jZSBldmVudHMgYXJlIHN1cHByZXNzZWQgb24gdGhhdCBzZWVrKCkgYnkgZGVmYXVsdCwgbm90aGluZyB3aWxsIGZpcmUsIGJ1dCB3aGVuIHRoZSBwbGF5aGVhZCBtb3ZlcyBvZmYgb2YgdGhhdCBwb3NpdGlvbiwgdGhlIGNhbGxiYWNrIHNob3VsZCBmaXJlLiBUaGlzIGJlaGF2aW9yIGlzIHdoYXQgcGVvcGxlIGludHVpdGl2ZWx5IGV4cGVjdC4gV2Ugc2V0IHRoZSBfcmF3UHJldlRpbWUgdG8gYmUgYSBwcmVjaXNlIHRpbnkgbnVtYmVyIHRvIGluZGljYXRlIHRoaXMgc2NlbmFyaW8gcmF0aGVyIHRoYW4gdXNpbmcgYW5vdGhlciBwcm9wZXJ0eS92YXJpYWJsZSB3aGljaCB3b3VsZCBpbmNyZWFzZSBtZW1vcnkgdXNhZ2UuIFRoaXMgdGVjaG5pcXVlIGlzIGxlc3MgcmVhZGFibGUsIGJ1dCBtb3JlIGVmZmljaWVudC5cblx0XHRcdFx0dGltZSA9IHRvdGFsRHVyICsgMC4wMDAxOyAvL3RvIGF2b2lkIG9jY2FzaW9uYWwgZmxvYXRpbmcgcG9pbnQgcm91bmRpbmcgZXJyb3JzIC0gc29tZXRpbWVzIGNoaWxkIHR3ZWVucy90aW1lbGluZXMgd2VyZSBub3QgYmVpbmcgZnVsbHkgY29tcGxldGVkICh0aGVpciBwcm9ncmVzcyBtaWdodCBiZSAwLjk5OTk5OTk5OTk5OTk5OCBpbnN0ZWFkIG9mIDEgYmVjYXVzZSB3aGVuIF90aW1lIC0gdHdlZW4uX3N0YXJ0VGltZSBpcyBwZXJmb3JtZWQsIGZsb2F0aW5nIHBvaW50IGVycm9ycyB3b3VsZCByZXR1cm4gYSB2YWx1ZSB0aGF0IHdhcyBTTElHSFRMWSBvZmYpLiBUcnkgKDk5OTk5OTk5OTk5OS43IC0gOTk5OTk5OTk5OTk5KSAqIDEgPSAwLjY5OTk1MTE3MTg3NSBpbnN0ZWFkIG9mIDAuNy5cblxuXHRcdFx0fSBlbHNlIGlmICh0aW1lIDwgMC4wMDAwMDAxKSB7IC8vdG8gd29yayBhcm91bmQgb2NjYXNpb25hbCBmbG9hdGluZyBwb2ludCBtYXRoIGFydGlmYWN0cywgcm91bmQgc3VwZXIgc21hbGwgdmFsdWVzIHRvIDAuXG5cdFx0XHRcdHRoaXMuX3RvdGFsVGltZSA9IHRoaXMuX3RpbWUgPSAwO1xuXHRcdFx0XHRpZiAocHJldlRpbWUgIT09IDAgfHwgKHRoaXMuX2R1cmF0aW9uID09PSAwICYmIHRoaXMuX3Jhd1ByZXZUaW1lICE9PSBfdGlueU51bSAmJiAodGhpcy5fcmF3UHJldlRpbWUgPiAwIHx8ICh0aW1lIDwgMCAmJiB0aGlzLl9yYXdQcmV2VGltZSA+PSAwKSkpKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2sgPSBcIm9uUmV2ZXJzZUNvbXBsZXRlXCI7XG5cdFx0XHRcdFx0aXNDb21wbGV0ZSA9IHRoaXMuX3JldmVyc2VkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aW1lIDwgMCkge1xuXHRcdFx0XHRcdHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0XHRcdGlmICh0aGlzLl90aW1lbGluZS5hdXRvUmVtb3ZlQ2hpbGRyZW4gJiYgdGhpcy5fcmV2ZXJzZWQpIHsgLy9lbnN1cmVzIHByb3BlciBHQyBpZiBhIHRpbWVsaW5lIGlzIHJlc3VtZWQgYWZ0ZXIgaXQncyBmaW5pc2hlZCByZXZlcnNpbmcuXG5cdFx0XHRcdFx0XHRpbnRlcm5hbEZvcmNlID0gaXNDb21wbGV0ZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRjYWxsYmFjayA9IFwib25SZXZlcnNlQ29tcGxldGVcIjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuX3Jhd1ByZXZUaW1lID49IDAgJiYgdGhpcy5fZmlyc3QpIHsgLy93aGVuIGdvaW5nIGJhY2sgYmV5b25kIHRoZSBzdGFydCwgZm9yY2UgYSByZW5kZXIgc28gdGhhdCB6ZXJvLWR1cmF0aW9uIHR3ZWVucyB0aGF0IHNpdCBhdCB0aGUgdmVyeSBiZWdpbm5pbmcgcmVuZGVyIHRoZWlyIHN0YXJ0IHZhbHVlcyBwcm9wZXJseS4gT3RoZXJ3aXNlLCBpZiB0aGUgcGFyZW50IHRpbWVsaW5lJ3MgcGxheWhlYWQgbGFuZHMgZXhhY3RseSBhdCB0aGlzIHRpbWVsaW5lJ3Mgc3RhcnRUaW1lLCBhbmQgdGhlbiBtb3ZlcyBiYWNrd2FyZHMsIHRoZSB6ZXJvLWR1cmF0aW9uIHR3ZWVucyBhdCB0aGUgYmVnaW5uaW5nIHdvdWxkIHN0aWxsIGJlIGF0IHRoZWlyIGVuZCBzdGF0ZS5cblx0XHRcdFx0XHRcdGludGVybmFsRm9yY2UgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLl9yYXdQcmV2VGltZSA9IHRpbWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fcmF3UHJldlRpbWUgPSAodGhpcy5fZHVyYXRpb24gfHwgIXN1cHByZXNzRXZlbnRzIHx8IHRpbWUgfHwgdGhpcy5fcmF3UHJldlRpbWUgPT09IHRpbWUpID8gdGltZSA6IF90aW55TnVtOyAvL3doZW4gdGhlIHBsYXloZWFkIGFycml2ZXMgYXQgRVhBQ1RMWSB0aW1lIDAgKHJpZ2h0IG9uIHRvcCkgb2YgYSB6ZXJvLWR1cmF0aW9uIHRpbWVsaW5lIG9yIHR3ZWVuLCB3ZSBuZWVkIHRvIGRpc2Nlcm4gaWYgZXZlbnRzIGFyZSBzdXBwcmVzc2VkIHNvIHRoYXQgd2hlbiB0aGUgcGxheWhlYWQgbW92ZXMgYWdhaW4gKG5leHQgdGltZSksIGl0J2xsIHRyaWdnZXIgdGhlIGNhbGxiYWNrLiBJZiBldmVudHMgYXJlIE5PVCBzdXBwcmVzc2VkLCBvYnZpb3VzbHkgdGhlIGNhbGxiYWNrIHdvdWxkIGJlIHRyaWdnZXJlZCBpbiB0aGlzIHJlbmRlci4gQmFzaWNhbGx5LCB0aGUgY2FsbGJhY2sgc2hvdWxkIGZpcmUgZWl0aGVyIHdoZW4gdGhlIHBsYXloZWFkIEFSUklWRVMgb3IgTEVBVkVTIHRoaXMgZXhhY3Qgc3BvdCwgbm90IGJvdGguIEltYWdpbmUgZG9pbmcgYSB0aW1lbGluZS5zZWVrKDApIGFuZCB0aGVyZSdzIGEgY2FsbGJhY2sgdGhhdCBzaXRzIGF0IDAuIFNpbmNlIGV2ZW50cyBhcmUgc3VwcHJlc3NlZCBvbiB0aGF0IHNlZWsoKSBieSBkZWZhdWx0LCBub3RoaW5nIHdpbGwgZmlyZSwgYnV0IHdoZW4gdGhlIHBsYXloZWFkIG1vdmVzIG9mZiBvZiB0aGF0IHBvc2l0aW9uLCB0aGUgY2FsbGJhY2sgc2hvdWxkIGZpcmUuIFRoaXMgYmVoYXZpb3IgaXMgd2hhdCBwZW9wbGUgaW50dWl0aXZlbHkgZXhwZWN0LiBXZSBzZXQgdGhlIF9yYXdQcmV2VGltZSB0byBiZSBhIHByZWNpc2UgdGlueSBudW1iZXIgdG8gaW5kaWNhdGUgdGhpcyBzY2VuYXJpbyByYXRoZXIgdGhhbiB1c2luZyBhbm90aGVyIHByb3BlcnR5L3ZhcmlhYmxlIHdoaWNoIHdvdWxkIGluY3JlYXNlIG1lbW9yeSB1c2FnZS4gVGhpcyB0ZWNobmlxdWUgaXMgbGVzcyByZWFkYWJsZSwgYnV0IG1vcmUgZWZmaWNpZW50LlxuXHRcdFx0XHRcdGlmICh0aW1lID09PSAwICYmIGlzQ29tcGxldGUpIHsgLy9pZiB0aGVyZSdzIGEgemVyby1kdXJhdGlvbiB0d2VlbiBhdCB0aGUgdmVyeSBiZWdpbm5pbmcgb2YgYSB0aW1lbGluZSBhbmQgdGhlIHBsYXloZWFkIGxhbmRzIEVYQUNUTFkgYXQgdGltZSAwLCB0aGF0IHR3ZWVuIHdpbGwgY29ycmVjdGx5IHJlbmRlciBpdHMgZW5kIHZhbHVlcywgYnV0IHdlIG5lZWQgdG8ga2VlcCB0aGUgdGltZWxpbmUgYWxpdmUgZm9yIG9uZSBtb3JlIHJlbmRlciBzbyB0aGF0IHRoZSBiZWdpbm5pbmcgdmFsdWVzIHJlbmRlciBwcm9wZXJseSBhcyB0aGUgcGFyZW50J3MgcGxheWhlYWQga2VlcHMgbW92aW5nIGJleW9uZCB0aGUgYmVnaW5pbmcuIEltYWdpbmUgb2JqLnggc3RhcnRzIGF0IDAgYW5kIHRoZW4gd2UgZG8gdGwuc2V0KG9iaiwge3g6MTAwfSkudG8ob2JqLCAxLCB7eDoyMDB9KSBhbmQgdGhlbiBsYXRlciB3ZSB0bC5yZXZlcnNlKCkuLi50aGUgZ29hbCBpcyB0byBoYXZlIG9iai54IHJldmVydCB0byAwLiBJZiB0aGUgcGxheWhlYWQgaGFwcGVucyB0byBsYW5kIG9uIGV4YWN0bHkgMCwgd2l0aG91dCB0aGlzIGNodW5rIG9mIGNvZGUsIGl0J2QgY29tcGxldGUgdGhlIHRpbWVsaW5lIGFuZCByZW1vdmUgaXQgZnJvbSB0aGUgcmVuZGVyaW5nIHF1ZXVlIChub3QgZ29vZCkuXG5cdFx0XHRcdFx0XHR0d2VlbiA9IHRoaXMuX2ZpcnN0O1xuXHRcdFx0XHRcdFx0d2hpbGUgKHR3ZWVuICYmIHR3ZWVuLl9zdGFydFRpbWUgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCF0d2Vlbi5fZHVyYXRpb24pIHtcblx0XHRcdFx0XHRcdFx0XHRpc0NvbXBsZXRlID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dHdlZW4gPSB0d2Vlbi5fbmV4dDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGltZSA9IDA7IC8vdG8gYXZvaWQgb2NjYXNpb25hbCBmbG9hdGluZyBwb2ludCByb3VuZGluZyBlcnJvcnMgKGNvdWxkIGNhdXNlIHByb2JsZW1zIGVzcGVjaWFsbHkgd2l0aCB6ZXJvLWR1cmF0aW9uIHR3ZWVucyBhdCB0aGUgdmVyeSBiZWdpbm5pbmcgb2YgdGhlIHRpbWVsaW5lKVxuXHRcdFx0XHRcdGlmICghdGhpcy5faW5pdHRlZCkge1xuXHRcdFx0XHRcdFx0aW50ZXJuYWxGb3JjZSA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2hhc1BhdXNlICYmICF0aGlzLl9mb3JjaW5nUGxheWhlYWQgJiYgIXN1cHByZXNzRXZlbnRzKSB7XG5cdFx0XHRcdFx0aWYgKHRpbWUgPj0gcHJldlRpbWUpIHtcblx0XHRcdFx0XHRcdHR3ZWVuID0gdGhpcy5fZmlyc3Q7XG5cdFx0XHRcdFx0XHR3aGlsZSAodHdlZW4gJiYgdHdlZW4uX3N0YXJ0VGltZSA8PSB0aW1lICYmICFwYXVzZVR3ZWVuKSB7XG5cdFx0XHRcdFx0XHRcdGlmICghdHdlZW4uX2R1cmF0aW9uKSBpZiAodHdlZW4uZGF0YSA9PT0gXCJpc1BhdXNlXCIgJiYgIXR3ZWVuLnJhdGlvICYmICEodHdlZW4uX3N0YXJ0VGltZSA9PT0gMCAmJiB0aGlzLl9yYXdQcmV2VGltZSA9PT0gMCkpIHtcblx0XHRcdFx0XHRcdFx0XHRwYXVzZVR3ZWVuID0gdHdlZW47XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dHdlZW4gPSB0d2Vlbi5fbmV4dDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dHdlZW4gPSB0aGlzLl9sYXN0O1xuXHRcdFx0XHRcdFx0d2hpbGUgKHR3ZWVuICYmIHR3ZWVuLl9zdGFydFRpbWUgPj0gdGltZSAmJiAhcGF1c2VUd2Vlbikge1xuXHRcdFx0XHRcdFx0XHRpZiAoIXR3ZWVuLl9kdXJhdGlvbikgaWYgKHR3ZWVuLmRhdGEgPT09IFwiaXNQYXVzZVwiICYmIHR3ZWVuLl9yYXdQcmV2VGltZSA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRwYXVzZVR3ZWVuID0gdHdlZW47XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dHdlZW4gPSB0d2Vlbi5fcHJldjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHBhdXNlVHdlZW4pIHtcblx0XHRcdFx0XHRcdHRoaXMuX3RpbWUgPSB0aW1lID0gcGF1c2VUd2Vlbi5fc3RhcnRUaW1lO1xuXHRcdFx0XHRcdFx0dGhpcy5fdG90YWxUaW1lID0gdGltZSArICh0aGlzLl9jeWNsZSAqICh0aGlzLl90b3RhbER1cmF0aW9uICsgdGhpcy5fcmVwZWF0RGVsYXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl90b3RhbFRpbWUgPSB0aGlzLl90aW1lID0gdGhpcy5fcmF3UHJldlRpbWUgPSB0aW1lO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCh0aGlzLl90aW1lID09PSBwcmV2VGltZSB8fCAhdGhpcy5fZmlyc3QpICYmICFmb3JjZSAmJiAhaW50ZXJuYWxGb3JjZSAmJiAhcGF1c2VUd2Vlbikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGVsc2UgaWYgKCF0aGlzLl9pbml0dGVkKSB7XG5cdFx0XHRcdHRoaXMuX2luaXR0ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXRoaXMuX2FjdGl2ZSkgaWYgKCF0aGlzLl9wYXVzZWQgJiYgdGhpcy5fdGltZSAhPT0gcHJldlRpbWUgJiYgdGltZSA+IDApIHtcblx0XHRcdFx0dGhpcy5fYWN0aXZlID0gdHJ1ZTsgIC8vc28gdGhhdCBpZiB0aGUgdXNlciByZW5kZXJzIHRoZSB0aW1lbGluZSAoYXMgb3Bwb3NlZCB0byB0aGUgcGFyZW50IHRpbWVsaW5lIHJlbmRlcmluZyBpdCksIGl0IGlzIGZvcmNlZCB0byByZS1yZW5kZXIgYW5kIGFsaWduIGl0IHdpdGggdGhlIHByb3BlciB0aW1lL2ZyYW1lIG9uIHRoZSBuZXh0IHJlbmRlcmluZyBjeWNsZS4gTWF5YmUgdGhlIHRpbWVsaW5lIGFscmVhZHkgZmluaXNoZWQgYnV0IHRoZSB1c2VyIG1hbnVhbGx5IHJlLXJlbmRlcnMgaXQgYXMgaGFsZndheSBkb25lLCBmb3IgZXhhbXBsZS5cblx0XHRcdH1cblxuXHRcdFx0aWYgKHByZXZUaW1lID09PSAwKSBpZiAodGhpcy52YXJzLm9uU3RhcnQpIGlmICh0aGlzLl90aW1lICE9PSAwIHx8ICF0aGlzLl9kdXJhdGlvbikgaWYgKCFzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0XHR0aGlzLl9jYWxsYmFjayhcIm9uU3RhcnRcIik7XG5cdFx0XHR9XG5cblx0XHRcdGN1clRpbWUgPSB0aGlzLl90aW1lO1xuXHRcdFx0aWYgKGN1clRpbWUgPj0gcHJldlRpbWUpIHtcblx0XHRcdFx0dHdlZW4gPSB0aGlzLl9maXJzdDtcblx0XHRcdFx0d2hpbGUgKHR3ZWVuKSB7XG5cdFx0XHRcdFx0bmV4dCA9IHR3ZWVuLl9uZXh0OyAvL3JlY29yZCBpdCBoZXJlIGJlY2F1c2UgdGhlIHZhbHVlIGNvdWxkIGNoYW5nZSBhZnRlciByZW5kZXJpbmcuLi5cblx0XHRcdFx0XHRpZiAoY3VyVGltZSAhPT0gdGhpcy5fdGltZSB8fCAodGhpcy5fcGF1c2VkICYmICFwcmV2UGF1c2VkKSkgeyAvL2luIGNhc2UgYSB0d2VlbiBwYXVzZXMgb3Igc2Vla3MgdGhlIHRpbWVsaW5lIHdoZW4gcmVuZGVyaW5nLCBsaWtlIGluc2lkZSBvZiBhbiBvblVwZGF0ZS9vbkNvbXBsZXRlXG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR3ZWVuLl9hY3RpdmUgfHwgKHR3ZWVuLl9zdGFydFRpbWUgPD0gY3VyVGltZSAmJiAhdHdlZW4uX3BhdXNlZCAmJiAhdHdlZW4uX2djKSkge1xuXHRcdFx0XHRcdFx0aWYgKHBhdXNlVHdlZW4gPT09IHR3ZWVuKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucGF1c2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICghdHdlZW4uX3JldmVyc2VkKSB7XG5cdFx0XHRcdFx0XHRcdHR3ZWVuLnJlbmRlcigodGltZSAtIHR3ZWVuLl9zdGFydFRpbWUpICogdHdlZW4uX3RpbWVTY2FsZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHR3ZWVuLnJlbmRlcigoKCF0d2Vlbi5fZGlydHkpID8gdHdlZW4uX3RvdGFsRHVyYXRpb24gOiB0d2Vlbi50b3RhbER1cmF0aW9uKCkpIC0gKCh0aW1lIC0gdHdlZW4uX3N0YXJ0VGltZSkgKiB0d2Vlbi5fdGltZVNjYWxlKSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dHdlZW4gPSBuZXh0O1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0d2VlbiA9IHRoaXMuX2xhc3Q7XG5cdFx0XHRcdHdoaWxlICh0d2Vlbikge1xuXHRcdFx0XHRcdG5leHQgPSB0d2Vlbi5fcHJldjsgLy9yZWNvcmQgaXQgaGVyZSBiZWNhdXNlIHRoZSB2YWx1ZSBjb3VsZCBjaGFuZ2UgYWZ0ZXIgcmVuZGVyaW5nLi4uXG5cdFx0XHRcdFx0aWYgKGN1clRpbWUgIT09IHRoaXMuX3RpbWUgfHwgKHRoaXMuX3BhdXNlZCAmJiAhcHJldlBhdXNlZCkpIHsgLy9pbiBjYXNlIGEgdHdlZW4gcGF1c2VzIG9yIHNlZWtzIHRoZSB0aW1lbGluZSB3aGVuIHJlbmRlcmluZywgbGlrZSBpbnNpZGUgb2YgYW4gb25VcGRhdGUvb25Db21wbGV0ZVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0d2Vlbi5fYWN0aXZlIHx8ICh0d2Vlbi5fc3RhcnRUaW1lIDw9IHByZXZUaW1lICYmICF0d2Vlbi5fcGF1c2VkICYmICF0d2Vlbi5fZ2MpKSB7XG5cdFx0XHRcdFx0XHRpZiAocGF1c2VUd2VlbiA9PT0gdHdlZW4pIHtcblx0XHRcdFx0XHRcdFx0cGF1c2VUd2VlbiA9IHR3ZWVuLl9wcmV2OyAvL3RoZSBsaW5rZWQgbGlzdCBpcyBvcmdhbml6ZWQgYnkgX3N0YXJ0VGltZSwgdGh1cyBpdCdzIHBvc3NpYmxlIHRoYXQgYSB0d2VlbiBjb3VsZCBzdGFydCBCRUZPUkUgdGhlIHBhdXNlIGFuZCBlbmQgYWZ0ZXIgaXQsIGluIHdoaWNoIGNhc2UgaXQgd291bGQgYmUgcG9zaXRpb25lZCBiZWZvcmUgdGhlIHBhdXNlIHR3ZWVuIGluIHRoZSBsaW5rZWQgbGlzdCwgYnV0IHdlIHNob3VsZCByZW5kZXIgaXQgYmVmb3JlIHdlIHBhdXNlKCkgdGhlIHRpbWVsaW5lIGFuZCBjZWFzZSByZW5kZXJpbmcuIFRoaXMgaXMgb25seSBhIGNvbmNlcm4gd2hlbiBnb2luZyBpbiByZXZlcnNlLlxuXHRcdFx0XHRcdFx0XHR3aGlsZSAocGF1c2VUd2VlbiAmJiBwYXVzZVR3ZWVuLmVuZFRpbWUoKSA+IHRoaXMuX3RpbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRwYXVzZVR3ZWVuLnJlbmRlciggKHBhdXNlVHdlZW4uX3JldmVyc2VkID8gcGF1c2VUd2Vlbi50b3RhbER1cmF0aW9uKCkgLSAoKHRpbWUgLSBwYXVzZVR3ZWVuLl9zdGFydFRpbWUpICogcGF1c2VUd2Vlbi5fdGltZVNjYWxlKSA6ICh0aW1lIC0gcGF1c2VUd2Vlbi5fc3RhcnRUaW1lKSAqIHBhdXNlVHdlZW4uX3RpbWVTY2FsZSksIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG5cdFx0XHRcdFx0XHRcdFx0cGF1c2VUd2VlbiA9IHBhdXNlVHdlZW4uX3ByZXY7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cGF1c2VUd2VlbiA9IG51bGw7XG5cdFx0XHRcdFx0XHRcdHRoaXMucGF1c2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICghdHdlZW4uX3JldmVyc2VkKSB7XG5cdFx0XHRcdFx0XHRcdHR3ZWVuLnJlbmRlcigodGltZSAtIHR3ZWVuLl9zdGFydFRpbWUpICogdHdlZW4uX3RpbWVTY2FsZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHR3ZWVuLnJlbmRlcigoKCF0d2Vlbi5fZGlydHkpID8gdHdlZW4uX3RvdGFsRHVyYXRpb24gOiB0d2Vlbi50b3RhbER1cmF0aW9uKCkpIC0gKCh0aW1lIC0gdHdlZW4uX3N0YXJ0VGltZSkgKiB0d2Vlbi5fdGltZVNjYWxlKSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dHdlZW4gPSBuZXh0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9vblVwZGF0ZSkgaWYgKCFzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0XHRpZiAoX2xhenlUd2VlbnMubGVuZ3RoKSB7IC8vaW4gY2FzZSByZW5kZXJpbmcgY2F1c2VkIGFueSB0d2VlbnMgdG8gbGF6eS1pbml0LCB3ZSBzaG91bGQgcmVuZGVyIHRoZW0gYmVjYXVzZSB0eXBpY2FsbHkgd2hlbiBhIHRpbWVsaW5lIGZpbmlzaGVzLCB1c2VycyBleHBlY3QgdGhpbmdzIHRvIGhhdmUgcmVuZGVyZWQgZnVsbHkuIEltYWdpbmUgYW4gb25VcGRhdGUgb24gYSB0aW1lbGluZSB0aGF0IHJlcG9ydHMvY2hlY2tzIHR3ZWVuZWQgdmFsdWVzLlxuXHRcdFx0XHRcdF9sYXp5UmVuZGVyKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fY2FsbGJhY2soXCJvblVwZGF0ZVwiKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNhbGxiYWNrKSBpZiAoIXRoaXMuX2djKSBpZiAocHJldlN0YXJ0ID09PSB0aGlzLl9zdGFydFRpbWUgfHwgcHJldlRpbWVTY2FsZSAhPT0gdGhpcy5fdGltZVNjYWxlKSBpZiAodGhpcy5fdGltZSA9PT0gMCB8fCB0b3RhbER1ciA+PSB0aGlzLnRvdGFsRHVyYXRpb24oKSkgeyAvL2lmIG9uZSBvZiB0aGUgdHdlZW5zIHRoYXQgd2FzIHJlbmRlcmVkIGFsdGVyZWQgdGhpcyB0aW1lbGluZSdzIHN0YXJ0VGltZSAobGlrZSBpZiBhbiBvbkNvbXBsZXRlIHJldmVyc2VkIHRoZSB0aW1lbGluZSksIGl0IHByb2JhYmx5IGlzbid0IGNvbXBsZXRlLiBJZiBpdCBpcywgZG9uJ3Qgd29ycnksIGJlY2F1c2Ugd2hhdGV2ZXIgY2FsbCBhbHRlcmVkIHRoZSBzdGFydFRpbWUgd291bGQgY29tcGxldGUgaWYgaXQgd2FzIG5lY2Vzc2FyeSBhdCB0aGUgbmV3IHRpbWUuIFRoZSBvbmx5IGV4Y2VwdGlvbiBpcyB0aGUgdGltZVNjYWxlIHByb3BlcnR5LiBBbHNvIGNoZWNrIF9nYyBiZWNhdXNlIHRoZXJlJ3MgYSBjaGFuY2UgdGhhdCBraWxsKCkgY291bGQgYmUgY2FsbGVkIGluIGFuIG9uVXBkYXRlXG5cdFx0XHRcdGlmIChpc0NvbXBsZXRlKSB7XG5cdFx0XHRcdFx0aWYgKF9sYXp5VHdlZW5zLmxlbmd0aCkgeyAvL2luIGNhc2UgcmVuZGVyaW5nIGNhdXNlZCBhbnkgdHdlZW5zIHRvIGxhenktaW5pdCwgd2Ugc2hvdWxkIHJlbmRlciB0aGVtIGJlY2F1c2UgdHlwaWNhbGx5IHdoZW4gYSB0aW1lbGluZSBmaW5pc2hlcywgdXNlcnMgZXhwZWN0IHRoaW5ncyB0byBoYXZlIHJlbmRlcmVkIGZ1bGx5LiBJbWFnaW5lIGFuIG9uQ29tcGxldGUgb24gYSB0aW1lbGluZSB0aGF0IHJlcG9ydHMvY2hlY2tzIHR3ZWVuZWQgdmFsdWVzLlxuXHRcdFx0XHRcdFx0X2xhenlSZW5kZXIoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRoaXMuX3RpbWVsaW5lLmF1dG9SZW1vdmVDaGlsZHJlbikge1xuXHRcdFx0XHRcdFx0dGhpcy5fZW5hYmxlZChmYWxzZSwgZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLl9hY3RpdmUgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXN1cHByZXNzRXZlbnRzICYmIHRoaXMudmFyc1tjYWxsYmFja10pIHtcblx0XHRcdFx0XHR0aGlzLl9jYWxsYmFjayhjYWxsYmFjayk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cC5faGFzUGF1c2VkQ2hpbGQgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0d2VlbiA9IHRoaXMuX2ZpcnN0O1xuXHRcdFx0d2hpbGUgKHR3ZWVuKSB7XG5cdFx0XHRcdGlmICh0d2Vlbi5fcGF1c2VkIHx8ICgodHdlZW4gaW5zdGFuY2VvZiBUaW1lbGluZUxpdGUpICYmIHR3ZWVuLl9oYXNQYXVzZWRDaGlsZCgpKSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHR3ZWVuID0gdHdlZW4uX25leHQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHRcdHAuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbihuZXN0ZWQsIHR3ZWVucywgdGltZWxpbmVzLCBpZ25vcmVCZWZvcmVUaW1lKSB7XG5cdFx0XHRpZ25vcmVCZWZvcmVUaW1lID0gaWdub3JlQmVmb3JlVGltZSB8fCAtOTk5OTk5OTk5OTtcblx0XHRcdHZhciBhID0gW10sXG5cdFx0XHRcdHR3ZWVuID0gdGhpcy5fZmlyc3QsXG5cdFx0XHRcdGNudCA9IDA7XG5cdFx0XHR3aGlsZSAodHdlZW4pIHtcblx0XHRcdFx0aWYgKHR3ZWVuLl9zdGFydFRpbWUgPCBpZ25vcmVCZWZvcmVUaW1lKSB7XG5cdFx0XHRcdFx0Ly9kbyBub3RoaW5nXG5cdFx0XHRcdH0gZWxzZSBpZiAodHdlZW4gaW5zdGFuY2VvZiBUd2VlbkxpdGUpIHtcblx0XHRcdFx0XHRpZiAodHdlZW5zICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0YVtjbnQrK10gPSB0d2Vlbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHRpbWVsaW5lcyAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdGFbY250KytdID0gdHdlZW47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChuZXN0ZWQgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRhID0gYS5jb25jYXQodHdlZW4uZ2V0Q2hpbGRyZW4odHJ1ZSwgdHdlZW5zLCB0aW1lbGluZXMpKTtcblx0XHRcdFx0XHRcdGNudCA9IGEubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0d2VlbiA9IHR3ZWVuLl9uZXh0O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGE7XG5cdFx0fTtcblxuXHRcdHAuZ2V0VHdlZW5zT2YgPSBmdW5jdGlvbih0YXJnZXQsIG5lc3RlZCkge1xuXHRcdFx0dmFyIGRpc2FibGVkID0gdGhpcy5fZ2MsXG5cdFx0XHRcdGEgPSBbXSxcblx0XHRcdFx0Y250ID0gMCxcblx0XHRcdFx0dHdlZW5zLCBpO1xuXHRcdFx0aWYgKGRpc2FibGVkKSB7XG5cdFx0XHRcdHRoaXMuX2VuYWJsZWQodHJ1ZSwgdHJ1ZSk7IC8vZ2V0VHdlZW5zT2YoKSBmaWx0ZXJzIG91dCBkaXNhYmxlZCB0d2VlbnMsIGFuZCB3ZSBoYXZlIHRvIG1hcmsgdGhlbSBhcyBfZ2MgPSB0cnVlIHdoZW4gdGhlIHRpbWVsaW5lIGNvbXBsZXRlcyBpbiBvcmRlciB0byBhbGxvdyBjbGVhbiBnYXJiYWdlIGNvbGxlY3Rpb24sIHNvIHRlbXBvcmFyaWx5IHJlLWVuYWJsZSB0aGUgdGltZWxpbmUgaGVyZS5cblx0XHRcdH1cblx0XHRcdHR3ZWVucyA9IFR3ZWVuTGl0ZS5nZXRUd2VlbnNPZih0YXJnZXQpO1xuXHRcdFx0aSA9IHR3ZWVucy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0aWYgKHR3ZWVuc1tpXS50aW1lbGluZSA9PT0gdGhpcyB8fCAobmVzdGVkICYmIHRoaXMuX2NvbnRhaW5zKHR3ZWVuc1tpXSkpKSB7XG5cdFx0XHRcdFx0YVtjbnQrK10gPSB0d2VlbnNbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChkaXNhYmxlZCkge1xuXHRcdFx0XHR0aGlzLl9lbmFibGVkKGZhbHNlLCB0cnVlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBhO1xuXHRcdH07XG5cblx0XHRwLnJlY2VudCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3JlY2VudDtcblx0XHR9O1xuXG5cdFx0cC5fY29udGFpbnMgPSBmdW5jdGlvbih0d2Vlbikge1xuXHRcdFx0dmFyIHRsID0gdHdlZW4udGltZWxpbmU7XG5cdFx0XHR3aGlsZSAodGwpIHtcblx0XHRcdFx0aWYgKHRsID09PSB0aGlzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGwgPSB0bC50aW1lbGluZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0cC5zaGlmdENoaWxkcmVuID0gZnVuY3Rpb24oYW1vdW50LCBhZGp1c3RMYWJlbHMsIGlnbm9yZUJlZm9yZVRpbWUpIHtcblx0XHRcdGlnbm9yZUJlZm9yZVRpbWUgPSBpZ25vcmVCZWZvcmVUaW1lIHx8IDA7XG5cdFx0XHR2YXIgdHdlZW4gPSB0aGlzLl9maXJzdCxcblx0XHRcdFx0bGFiZWxzID0gdGhpcy5fbGFiZWxzLFxuXHRcdFx0XHRwO1xuXHRcdFx0d2hpbGUgKHR3ZWVuKSB7XG5cdFx0XHRcdGlmICh0d2Vlbi5fc3RhcnRUaW1lID49IGlnbm9yZUJlZm9yZVRpbWUpIHtcblx0XHRcdFx0XHR0d2Vlbi5fc3RhcnRUaW1lICs9IGFtb3VudDtcblx0XHRcdFx0fVxuXHRcdFx0XHR0d2VlbiA9IHR3ZWVuLl9uZXh0O1xuXHRcdFx0fVxuXHRcdFx0aWYgKGFkanVzdExhYmVscykge1xuXHRcdFx0XHRmb3IgKHAgaW4gbGFiZWxzKSB7XG5cdFx0XHRcdFx0aWYgKGxhYmVsc1twXSA+PSBpZ25vcmVCZWZvcmVUaW1lKSB7XG5cdFx0XHRcdFx0XHRsYWJlbHNbcF0gKz0gYW1vdW50O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMuX3VuY2FjaGUodHJ1ZSk7XG5cdFx0fTtcblxuXHRcdHAuX2tpbGwgPSBmdW5jdGlvbih2YXJzLCB0YXJnZXQpIHtcblx0XHRcdGlmICghdmFycyAmJiAhdGFyZ2V0KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9lbmFibGVkKGZhbHNlLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgdHdlZW5zID0gKCF0YXJnZXQpID8gdGhpcy5nZXRDaGlsZHJlbih0cnVlLCB0cnVlLCBmYWxzZSkgOiB0aGlzLmdldFR3ZWVuc09mKHRhcmdldCksXG5cdFx0XHRcdGkgPSB0d2VlbnMubGVuZ3RoLFxuXHRcdFx0XHRjaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0aWYgKHR3ZWVuc1tpXS5fa2lsbCh2YXJzLCB0YXJnZXQpKSB7XG5cdFx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBjaGFuZ2VkO1xuXHRcdH07XG5cblx0XHRwLmNsZWFyID0gZnVuY3Rpb24obGFiZWxzKSB7XG5cdFx0XHR2YXIgdHdlZW5zID0gdGhpcy5nZXRDaGlsZHJlbihmYWxzZSwgdHJ1ZSwgdHJ1ZSksXG5cdFx0XHRcdGkgPSB0d2VlbnMubGVuZ3RoO1xuXHRcdFx0dGhpcy5fdGltZSA9IHRoaXMuX3RvdGFsVGltZSA9IDA7XG5cdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0dHdlZW5zW2ldLl9lbmFibGVkKGZhbHNlLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAobGFiZWxzICE9PSBmYWxzZSkge1xuXHRcdFx0XHR0aGlzLl9sYWJlbHMgPSB7fTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLl91bmNhY2hlKHRydWUpO1xuXHRcdH07XG5cblx0XHRwLmludmFsaWRhdGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0d2VlbiA9IHRoaXMuX2ZpcnN0O1xuXHRcdFx0d2hpbGUgKHR3ZWVuKSB7XG5cdFx0XHRcdHR3ZWVuLmludmFsaWRhdGUoKTtcblx0XHRcdFx0dHdlZW4gPSB0d2Vlbi5fbmV4dDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBBbmltYXRpb24ucHJvdG90eXBlLmludmFsaWRhdGUuY2FsbCh0aGlzKTs7XG5cdFx0fTtcblxuXHRcdHAuX2VuYWJsZWQgPSBmdW5jdGlvbihlbmFibGVkLCBpZ25vcmVUaW1lbGluZSkge1xuXHRcdFx0aWYgKGVuYWJsZWQgPT09IHRoaXMuX2djKSB7XG5cdFx0XHRcdHZhciB0d2VlbiA9IHRoaXMuX2ZpcnN0O1xuXHRcdFx0XHR3aGlsZSAodHdlZW4pIHtcblx0XHRcdFx0XHR0d2Vlbi5fZW5hYmxlZChlbmFibGVkLCB0cnVlKTtcblx0XHRcdFx0XHR0d2VlbiA9IHR3ZWVuLl9uZXh0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gU2ltcGxlVGltZWxpbmUucHJvdG90eXBlLl9lbmFibGVkLmNhbGwodGhpcywgZW5hYmxlZCwgaWdub3JlVGltZWxpbmUpO1xuXHRcdH07XG5cblx0XHRwLnRvdGFsVGltZSA9IGZ1bmN0aW9uKHRpbWUsIHN1cHByZXNzRXZlbnRzLCB1bmNhcHBlZCkge1xuXHRcdFx0dGhpcy5fZm9yY2luZ1BsYXloZWFkID0gdHJ1ZTtcblx0XHRcdHZhciB2YWwgPSBBbmltYXRpb24ucHJvdG90eXBlLnRvdGFsVGltZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0dGhpcy5fZm9yY2luZ1BsYXloZWFkID0gZmFsc2U7XG5cdFx0XHRyZXR1cm4gdmFsO1xuXHRcdH07XG5cblx0XHRwLmR1cmF0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHRpZiAodGhpcy5fZGlydHkpIHtcblx0XHRcdFx0XHR0aGlzLnRvdGFsRHVyYXRpb24oKTsgLy9qdXN0IHRyaWdnZXJzIHJlY2FsY3VsYXRpb25cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZHVyYXRpb247XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5kdXJhdGlvbigpICE9PSAwICYmIHZhbHVlICE9PSAwKSB7XG5cdFx0XHRcdHRoaXMudGltZVNjYWxlKHRoaXMuX2R1cmF0aW9uIC8gdmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdHAudG90YWxEdXJhdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2RpcnR5KSB7XG5cdFx0XHRcdFx0dmFyIG1heCA9IDAsXG5cdFx0XHRcdFx0XHR0d2VlbiA9IHRoaXMuX2xhc3QsXG5cdFx0XHRcdFx0XHRwcmV2U3RhcnQgPSA5OTk5OTk5OTk5OTksXG5cdFx0XHRcdFx0XHRwcmV2LCBlbmQ7XG5cdFx0XHRcdFx0d2hpbGUgKHR3ZWVuKSB7XG5cdFx0XHRcdFx0XHRwcmV2ID0gdHdlZW4uX3ByZXY7IC8vcmVjb3JkIGl0IGhlcmUgaW4gY2FzZSB0aGUgdHdlZW4gY2hhbmdlcyBwb3NpdGlvbiBpbiB0aGUgc2VxdWVuY2UuLi5cblx0XHRcdFx0XHRcdGlmICh0d2Vlbi5fZGlydHkpIHtcblx0XHRcdFx0XHRcdFx0dHdlZW4udG90YWxEdXJhdGlvbigpOyAvL2NvdWxkIGNoYW5nZSB0aGUgdHdlZW4uX3N0YXJ0VGltZSwgc28gbWFrZSBzdXJlIHRoZSB0d2VlbidzIGNhY2hlIGlzIGNsZWFuIGJlZm9yZSBhbmFseXppbmcgaXQuXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAodHdlZW4uX3N0YXJ0VGltZSA+IHByZXZTdGFydCAmJiB0aGlzLl9zb3J0Q2hpbGRyZW4gJiYgIXR3ZWVuLl9wYXVzZWQgJiYgIXRoaXMuX2NhbGN1bGF0aW5nRHVyYXRpb24pIHsgLy9pbiBjYXNlIG9uZSBvZiB0aGUgdHdlZW5zIHNoaWZ0ZWQgb3V0IG9mIG9yZGVyLCBpdCBuZWVkcyB0byBiZSByZS1pbnNlcnRlZCBpbnRvIHRoZSBjb3JyZWN0IHBvc2l0aW9uIGluIHRoZSBzZXF1ZW5jZVxuXHRcdFx0XHRcdFx0XHR0aGlzLl9jYWxjdWxhdGluZ0R1cmF0aW9uID0gMTsgLy9wcmV2ZW50IGVuZGxlc3MgcmVjdXJzaXZlIGNhbGxzIC0gdGhlcmUgYXJlIG1ldGhvZHMgdGhhdCBnZXQgdHJpZ2dlcmVkIHRoYXQgY2hlY2sgZHVyYXRpb24vdG90YWxEdXJhdGlvbiB3aGVuIHdlIGFkZCgpLCBsaWtlIF9wYXJzZVRpbWVPckxhYmVsKCkuXG5cdFx0XHRcdFx0XHRcdHRoaXMuYWRkKHR3ZWVuLCB0d2Vlbi5fc3RhcnRUaW1lIC0gdHdlZW4uX2RlbGF5KTtcblx0XHRcdFx0XHRcdFx0dGhpcy5fY2FsY3VsYXRpbmdEdXJhdGlvbiA9IDA7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRwcmV2U3RhcnQgPSB0d2Vlbi5fc3RhcnRUaW1lO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKHR3ZWVuLl9zdGFydFRpbWUgPCAwICYmICF0d2Vlbi5fcGF1c2VkKSB7IC8vY2hpbGRyZW4gYXJlbid0IGFsbG93ZWQgdG8gaGF2ZSBuZWdhdGl2ZSBzdGFydFRpbWVzIHVubGVzcyBzbW9vdGhDaGlsZFRpbWluZyBpcyB0cnVlLCBzbyBhZGp1c3QgaGVyZSBpZiBvbmUgaXMgZm91bmQuXG5cdFx0XHRcdFx0XHRcdG1heCAtPSB0d2Vlbi5fc3RhcnRUaW1lO1xuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy5fdGltZWxpbmUuc21vb3RoQ2hpbGRUaW1pbmcpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgKz0gdHdlZW4uX3N0YXJ0VGltZSAvIHRoaXMuX3RpbWVTY2FsZTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl90aW1lIC09IHR3ZWVuLl9zdGFydFRpbWU7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fdG90YWxUaW1lIC09IHR3ZWVuLl9zdGFydFRpbWU7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcmF3UHJldlRpbWUgLT0gdHdlZW4uX3N0YXJ0VGltZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0aGlzLnNoaWZ0Q2hpbGRyZW4oLXR3ZWVuLl9zdGFydFRpbWUsIGZhbHNlLCAtOTk5OTk5OTk5OSk7XG5cdFx0XHRcdFx0XHRcdHByZXZTdGFydCA9IDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbmQgPSB0d2Vlbi5fc3RhcnRUaW1lICsgKHR3ZWVuLl90b3RhbER1cmF0aW9uIC8gdHdlZW4uX3RpbWVTY2FsZSk7XG5cdFx0XHRcdFx0XHRpZiAoZW5kID4gbWF4KSB7XG5cdFx0XHRcdFx0XHRcdG1heCA9IGVuZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHR3ZWVuID0gcHJldjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5fZHVyYXRpb24gPSB0aGlzLl90b3RhbER1cmF0aW9uID0gbWF4O1xuXHRcdFx0XHRcdHRoaXMuX2RpcnR5ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXMuX3RvdGFsRHVyYXRpb247XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKHZhbHVlICYmIHRoaXMudG90YWxEdXJhdGlvbigpKSA/IHRoaXMudGltZVNjYWxlKHRoaXMuX3RvdGFsRHVyYXRpb24gLyB2YWx1ZSkgOiB0aGlzO1xuXHRcdH07XG5cblx0XHRwLnBhdXNlZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRpZiAoIXZhbHVlKSB7IC8vaWYgdGhlcmUncyBhIHBhdXNlIGRpcmVjdGx5IGF0IHRoZSBzcG90IGZyb20gd2hlcmUgd2UncmUgdW5wYXVzaW5nLCBza2lwIGl0LlxuXHRcdFx0XHR2YXIgdHdlZW4gPSB0aGlzLl9maXJzdCxcblx0XHRcdFx0XHR0aW1lID0gdGhpcy5fdGltZTtcblx0XHRcdFx0d2hpbGUgKHR3ZWVuKSB7XG5cdFx0XHRcdFx0aWYgKHR3ZWVuLl9zdGFydFRpbWUgPT09IHRpbWUgJiYgdHdlZW4uZGF0YSA9PT0gXCJpc1BhdXNlXCIpIHtcblx0XHRcdFx0XHRcdHR3ZWVuLl9yYXdQcmV2VGltZSA9IDA7IC8vcmVtZW1iZXIsIF9yYXdQcmV2VGltZSBpcyBob3cgemVyby1kdXJhdGlvbiB0d2VlbnMvY2FsbGJhY2tzIHNlbnNlIGRpcmVjdGlvbmFsaXR5IGFuZCBkZXRlcm1pbmUgd2hldGhlciBvciBub3QgdG8gZmlyZS4gSWYgX3Jhd1ByZXZUaW1lIGlzIHRoZSBzYW1lIGFzIF9zdGFydFRpbWUgb24gdGhlIG5leHQgcmVuZGVyLCBpdCB3b24ndCBmaXJlLlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0d2VlbiA9IHR3ZWVuLl9uZXh0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gQW5pbWF0aW9uLnByb3RvdHlwZS5wYXVzZWQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9O1xuXG5cdFx0cC51c2VzRnJhbWVzID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdGwgPSB0aGlzLl90aW1lbGluZTtcblx0XHRcdHdoaWxlICh0bC5fdGltZWxpbmUpIHtcblx0XHRcdFx0dGwgPSB0bC5fdGltZWxpbmU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKHRsID09PSBBbmltYXRpb24uX3Jvb3RGcmFtZXNUaW1lbGluZSk7XG5cdFx0fTtcblxuXHRcdHAucmF3VGltZSA9IGZ1bmN0aW9uKHdyYXBSZXBlYXRzKSB7XG5cdFx0XHRyZXR1cm4gKHdyYXBSZXBlYXRzICYmICh0aGlzLl9wYXVzZWQgfHwgKHRoaXMuX3JlcGVhdCAmJiB0aGlzLnRpbWUoKSA+IDAgJiYgdGhpcy50b3RhbFByb2dyZXNzKCkgPCAxKSkpID8gdGhpcy5fdG90YWxUaW1lICUgKHRoaXMuX2R1cmF0aW9uICsgdGhpcy5fcmVwZWF0RGVsYXkpIDogdGhpcy5fcGF1c2VkID8gdGhpcy5fdG90YWxUaW1lIDogKHRoaXMuX3RpbWVsaW5lLnJhd1RpbWUod3JhcFJlcGVhdHMpIC0gdGhpcy5fc3RhcnRUaW1lKSAqIHRoaXMuX3RpbWVTY2FsZTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIFRpbWVsaW5lTGl0ZTtcblxuXHR9LCB0cnVlKTtcblxufSk7IGlmIChfZ3NTY29wZS5fZ3NEZWZpbmUpIHsgX2dzU2NvcGUuX2dzUXVldWUucG9wKCkoKTsgfVxuXG4vL2V4cG9ydCB0byBBTUQvUmVxdWlyZUpTIGFuZCBDb21tb25KUy9Ob2RlIChwcmVjdXJzb3IgdG8gZnVsbCBtb2R1bGFyIGJ1aWxkIHN5c3RlbSBjb21pbmcgYXQgYSBsYXRlciBkYXRlKVxuKGZ1bmN0aW9uKG5hbWUpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdHZhciBnZXRHbG9iYWwgPSBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKF9nc1Njb3BlLkdyZWVuU29ja0dsb2JhbHMgfHwgX2dzU2NvcGUpW25hbWVdO1xuXHR9O1xuXHRpZiAodHlwZW9mKG1vZHVsZSkgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlLmV4cG9ydHMpIHsgLy9ub2RlXG5cdFx0cmVxdWlyZShcImdzYXAvVHdlZW5MaXRlXCIpOyAvL2RlcGVuZGVuY3lcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGdldEdsb2JhbCgpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZihkZWZpbmUpID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkgeyAvL0FNRFxuXHRcdGRlZmluZShbXCJnc2FwL1R3ZWVuTGl0ZVwiXSwgZ2V0R2xvYmFsKTtcblx0fVxufShcIlRpbWVsaW5lTWF4XCIpKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nc2FwL1RpbWVsaW5lTWF4LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogU2Nyb2xsTWFnaWMgdjIuMC41ICgyMDE1LTA0LTI5KVxuICogVGhlIGphdmFzY3JpcHQgbGlicmFyeSBmb3IgbWFnaWNhbCBzY3JvbGwgaW50ZXJhY3Rpb25zLlxuICogKGMpIDIwMTUgSmFuIFBhZXBrZSAoQGphbnBhZXBrZSlcbiAqIFByb2plY3QgV2Vic2l0ZTogaHR0cDovL3Njcm9sbG1hZ2ljLmlvXG4gKiBcbiAqIEB2ZXJzaW9uIDIuMC41XG4gKiBAbGljZW5zZSBEdWFsIGxpY2Vuc2VkIHVuZGVyIE1JVCBsaWNlbnNlIGFuZCBHUEwuXG4gKiBAYXV0aG9yIEphbiBQYWVwa2UgLSBlLW1haWxAamFucGFlcGtlLmRlXG4gKlxuICogQGZpbGUgU2Nyb2xsTWFnaWMgbWFpbiBsaWJyYXJ5LlxuICovXG4vKipcbiAqIEBuYW1lc3BhY2UgU2Nyb2xsTWFnaWNcbiAqL1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gQnJvd3NlciBnbG9iYWxcblx0XHRyb290LlNjcm9sbE1hZ2ljID0gZmFjdG9yeSgpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIFNjcm9sbE1hZ2ljID0gZnVuY3Rpb24gKCkge1xuXHRcdF91dGlsLmxvZygyLCAnKENPTVBBVElCSUxJVFkgTk9USUNFKSAtPiBBcyBvZiBTY3JvbGxNYWdpYyAyLjAuMCB5b3UgbmVlZCB0byB1c2UgXFwnbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKVxcJyB0byBjcmVhdGUgYSBuZXcgY29udHJvbGxlciBpbnN0YW5jZS4gVXNlIFxcJ25ldyBTY3JvbGxNYWdpYy5TY2VuZSgpXFwnIHRvIGluc3RhbmNlIGEgc2NlbmUuJyk7XG5cdH07XG5cblx0U2Nyb2xsTWFnaWMudmVyc2lvbiA9IFwiMi4wLjVcIjtcblxuXHQvLyBUT0RPOiB0ZW1wb3Jhcnkgd29ya2Fyb3VuZCBmb3IgY2hyb21lJ3Mgc2Nyb2xsIGppdHRlciBidWdcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIGZ1bmN0aW9uICgpIHt9KTtcblxuXHQvLyBnbG9iYWwgY29uc3Rcblx0dmFyIFBJTl9TUEFDRVJfQVRUUklCVVRFID0gXCJkYXRhLXNjcm9sbG1hZ2ljLXBpbi1zcGFjZXJcIjtcblxuXHQvKipcblx0ICogVGhlIG1haW4gY2xhc3MgdGhhdCBpcyBuZWVkZWQgb25jZSBwZXIgc2Nyb2xsIGNvbnRhaW5lci5cblx0ICpcblx0ICogQGNsYXNzXG5cdCAqXG5cdCAqIEBleGFtcGxlXG5cdCAqIC8vIGJhc2ljIGluaXRpYWxpemF0aW9uXG5cdCAqIHZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblx0ICpcblx0ICogLy8gcGFzc2luZyBvcHRpb25zXG5cdCAqIHZhciBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoe2NvbnRhaW5lcjogXCIjbXlDb250YWluZXJcIiwgbG9nbGV2ZWw6IDN9KTtcblx0ICpcblx0ICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIEFuIG9iamVjdCBjb250YWluaW5nIG9uZSBvciBtb3JlIG9wdGlvbnMgZm9yIHRoZSBjb250cm9sbGVyLlxuXHQgKiBAcGFyYW0geyhzdHJpbmd8b2JqZWN0KX0gW29wdGlvbnMuY29udGFpbmVyPXdpbmRvd10gLSBBIHNlbGVjdG9yLCBET00gb2JqZWN0IHRoYXQgcmVmZXJlbmNlcyB0aGUgbWFpbiBjb250YWluZXIgZm9yIHNjcm9sbGluZy5cblx0ICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy52ZXJ0aWNhbD10cnVlXSAtIFNldHMgdGhlIHNjcm9sbCBtb2RlIHRvIHZlcnRpY2FsIChgdHJ1ZWApIG9yIGhvcml6b250YWwgKGBmYWxzZWApIHNjcm9sbGluZy5cblx0ICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLmdsb2JhbFNjZW5lT3B0aW9ucz17fV0gLSBUaGVzZSBvcHRpb25zIHdpbGwgYmUgcGFzc2VkIHRvIGV2ZXJ5IFNjZW5lIHRoYXQgaXMgYWRkZWQgdG8gdGhlIGNvbnRyb2xsZXIgdXNpbmcgdGhlIGFkZFNjZW5lIG1ldGhvZC4gRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gU2NlbmUgb3B0aW9ucyBzZWUge0BsaW5rIFNjcm9sbE1hZ2ljLlNjZW5lfS5cblx0ICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmxvZ2xldmVsPTJdIExvZ2xldmVsIGZvciBkZWJ1Z2dpbmcuIE5vdGUgdGhhdCBsb2dnaW5nIGlzIGRpc2FibGVkIGluIHRoZSBtaW5pZmllZCB2ZXJzaW9uIG9mIFNjcm9sbE1hZ2ljLlxuXHQgKiogYDBgID0+IHNpbGVudFxuXHQgKiogYDFgID0+IGVycm9yc1xuXHQgKiogYDJgID0+IGVycm9ycywgd2FybmluZ3Ncblx0ICoqIGAzYCA9PiBlcnJvcnMsIHdhcm5pbmdzLCBkZWJ1Z2luZm9cblx0ICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZWZyZXNoSW50ZXJ2YWw9MTAwXSAtIFNvbWUgY2hhbmdlcyBkb24ndCBjYWxsIGV2ZW50cyBieSBkZWZhdWx0LCBsaWtlIGNoYW5naW5nIHRoZSBjb250YWluZXIgc2l6ZSBvciBtb3ZpbmcgYSBzY2VuZSB0cmlnZ2VyIGVsZW1lbnQuICBcblx0IFRoaXMgaW50ZXJ2YWwgcG9sbHMgdGhlc2UgcGFyYW1ldGVycyB0byBmaXJlIHRoZSBuZWNlc3NhcnkgZXZlbnRzLiAgXG5cdCBJZiB5b3UgZG9uJ3QgdXNlIGN1c3RvbSBjb250YWluZXJzLCB0cmlnZ2VyIGVsZW1lbnRzIG9yIGhhdmUgc3RhdGljIGxheW91dHMsIHdoZXJlIHRoZSBwb3NpdGlvbnMgb2YgdGhlIHRyaWdnZXIgZWxlbWVudHMgZG9uJ3QgY2hhbmdlLCB5b3UgY2FuIHNldCB0aGlzIHRvIDAgZGlzYWJsZSBpbnRlcnZhbCBjaGVja2luZyBhbmQgaW1wcm92ZSBwZXJmb3JtYW5jZS5cblx0ICpcblx0ICovXG5cdFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuLypcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKiBzZXR0aW5nc1xuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqL1xuXHRcdHZhclxuXHRcdE5BTUVTUEFDRSA9ICdTY3JvbGxNYWdpYy5Db250cm9sbGVyJyxcblx0XHRcdFNDUk9MTF9ESVJFQ1RJT05fRk9SV0FSRCA9ICdGT1JXQVJEJyxcblx0XHRcdFNDUk9MTF9ESVJFQ1RJT05fUkVWRVJTRSA9ICdSRVZFUlNFJyxcblx0XHRcdFNDUk9MTF9ESVJFQ1RJT05fUEFVU0VEID0gJ1BBVVNFRCcsXG5cdFx0XHRERUZBVUxUX09QVElPTlMgPSBDT05UUk9MTEVSX09QVElPTlMuZGVmYXVsdHM7XG5cbi8qXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICogcHJpdmF0ZSB2YXJzXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICovXG5cdFx0dmFyXG5cdFx0Q29udHJvbGxlciA9IHRoaXMsXG5cdFx0XHRfb3B0aW9ucyA9IF91dGlsLmV4dGVuZCh7fSwgREVGQVVMVF9PUFRJT05TLCBvcHRpb25zKSxcblx0XHRcdF9zY2VuZU9iamVjdHMgPSBbXSxcblx0XHRcdF91cGRhdGVTY2VuZXNPbk5leHRDeWNsZSA9IGZhbHNlLFxuXHRcdFx0Ly8gY2FuIGJlIGJvb2xlYW4gKHRydWUgPT4gYWxsIHNjZW5lcykgb3IgYW4gYXJyYXkgb2Ygc2NlbmVzIHRvIGJlIHVwZGF0ZWRcblx0XHRcdF9zY3JvbGxQb3MgPSAwLFxuXHRcdFx0X3Njcm9sbERpcmVjdGlvbiA9IFNDUk9MTF9ESVJFQ1RJT05fUEFVU0VELFxuXHRcdFx0X2lzRG9jdW1lbnQgPSB0cnVlLFxuXHRcdFx0X3ZpZXdQb3J0U2l6ZSA9IDAsXG5cdFx0XHRfZW5hYmxlZCA9IHRydWUsXG5cdFx0XHRfdXBkYXRlVGltZW91dCwgX3JlZnJlc2hUaW1lb3V0O1xuXG4vKlxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqIHByaXZhdGUgZnVuY3Rpb25zXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICovXG5cblx0XHQvKipcblx0XHQgKiBJbnRlcm5hbCBjb25zdHJ1Y3RvciBmdW5jdGlvbiBvZiB0aGUgU2Nyb2xsTWFnaWMgQ29udHJvbGxlclxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIGNvbnN0cnVjdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBfb3B0aW9ucykge1xuXHRcdFx0XHRpZiAoIURFRkFVTFRfT1BUSU9OUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0bG9nKDIsIFwiV0FSTklORzogVW5rbm93biBvcHRpb24gXFxcIlwiICsga2V5ICsgXCJcXFwiXCIpO1xuXHRcdFx0XHRcdGRlbGV0ZSBfb3B0aW9uc1trZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRfb3B0aW9ucy5jb250YWluZXIgPSBfdXRpbC5nZXQuZWxlbWVudHMoX29wdGlvbnMuY29udGFpbmVyKVswXTtcblx0XHRcdC8vIGNoZWNrIFNjcm9sbENvbnRhaW5lclxuXHRcdFx0aWYgKCFfb3B0aW9ucy5jb250YWluZXIpIHtcblx0XHRcdFx0bG9nKDEsIFwiRVJST1IgY3JlYXRpbmcgb2JqZWN0IFwiICsgTkFNRVNQQUNFICsgXCI6IE5vIHZhbGlkIHNjcm9sbCBjb250YWluZXIgc3VwcGxpZWRcIik7XG5cdFx0XHRcdHRocm93IE5BTUVTUEFDRSArIFwiIGluaXQgZmFpbGVkLlwiOyAvLyBjYW5jZWxcblx0XHRcdH1cblx0XHRcdF9pc0RvY3VtZW50ID0gX29wdGlvbnMuY29udGFpbmVyID09PSB3aW5kb3cgfHwgX29wdGlvbnMuY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5IHx8ICFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKF9vcHRpb25zLmNvbnRhaW5lcik7XG5cdFx0XHQvLyBub3JtYWxpemUgdG8gd2luZG93XG5cdFx0XHRpZiAoX2lzRG9jdW1lbnQpIHtcblx0XHRcdFx0X29wdGlvbnMuY29udGFpbmVyID0gd2luZG93O1xuXHRcdFx0fVxuXHRcdFx0Ly8gdXBkYXRlIGNvbnRhaW5lciBzaXplIGltbWVkaWF0ZWx5XG5cdFx0XHRfdmlld1BvcnRTaXplID0gZ2V0Vmlld3BvcnRTaXplKCk7XG5cdFx0XHQvLyBzZXQgZXZlbnQgaGFuZGxlcnNcblx0XHRcdF9vcHRpb25zLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uQ2hhbmdlKTtcblx0XHRcdF9vcHRpb25zLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uQ2hhbmdlKTtcblxuXHRcdFx0X29wdGlvbnMucmVmcmVzaEludGVydmFsID0gcGFyc2VJbnQoX29wdGlvbnMucmVmcmVzaEludGVydmFsKSB8fCBERUZBVUxUX09QVElPTlMucmVmcmVzaEludGVydmFsO1xuXHRcdFx0c2NoZWR1bGVSZWZyZXNoKCk7XG5cblx0XHRcdGxvZygzLCBcImFkZGVkIG5ldyBcIiArIE5BTUVTUEFDRSArIFwiIGNvbnRyb2xsZXIgKHZcIiArIFNjcm9sbE1hZ2ljLnZlcnNpb24gKyBcIilcIik7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFNjaGVkdWxlIHRoZSBuZXh0IGV4ZWN1dGlvbiBvZiB0aGUgcmVmcmVzaCBmdW5jdGlvblxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIHNjaGVkdWxlUmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChfb3B0aW9ucy5yZWZyZXNoSW50ZXJ2YWwgPiAwKSB7XG5cdFx0XHRcdF9yZWZyZXNoVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KHJlZnJlc2gsIF9vcHRpb25zLnJlZnJlc2hJbnRlcnZhbCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIERlZmF1bHQgZnVuY3Rpb24gdG8gZ2V0IHNjcm9sbCBwb3MgLSBvdmVyd3JpdGVhYmxlIHVzaW5nIGBDb250cm9sbGVyLnNjcm9sbFBvcyhuZXdGdW5jdGlvbilgXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgZ2V0U2Nyb2xsUG9zID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIF9vcHRpb25zLnZlcnRpY2FsID8gX3V0aWwuZ2V0LnNjcm9sbFRvcChfb3B0aW9ucy5jb250YWluZXIpIDogX3V0aWwuZ2V0LnNjcm9sbExlZnQoX29wdGlvbnMuY29udGFpbmVyKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0aGUgY3VycmVudCB2aWV3cG9ydCBTaXplICh3aWR0aCB2b3IgaG9yaXpvbnRhbCwgaGVpZ2h0IGZvciB2ZXJ0aWNhbClcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBnZXRWaWV3cG9ydFNpemUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gX29wdGlvbnMudmVydGljYWwgPyBfdXRpbC5nZXQuaGVpZ2h0KF9vcHRpb25zLmNvbnRhaW5lcikgOiBfdXRpbC5nZXQud2lkdGgoX29wdGlvbnMuY29udGFpbmVyKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogRGVmYXVsdCBmdW5jdGlvbiB0byBzZXQgc2Nyb2xsIHBvcyAtIG92ZXJ3cml0ZWFibGUgdXNpbmcgYENvbnRyb2xsZXIuc2Nyb2xsVG8obmV3RnVuY3Rpb24pYFxuXHRcdCAqIE1ha2UgYXZhaWxhYmxlIHB1YmxpY2x5IGZvciBwaW5uZWQgbW91c2V3aGVlbCB3b3JrYXJvdW5kLlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIHNldFNjcm9sbFBvcyA9IHRoaXMuX3NldFNjcm9sbFBvcyA9IGZ1bmN0aW9uIChwb3MpIHtcblx0XHRcdGlmIChfb3B0aW9ucy52ZXJ0aWNhbCkge1xuXHRcdFx0XHRpZiAoX2lzRG9jdW1lbnQpIHtcblx0XHRcdFx0XHR3aW5kb3cuc2Nyb2xsVG8oX3V0aWwuZ2V0LnNjcm9sbExlZnQoKSwgcG9zKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRfb3B0aW9ucy5jb250YWluZXIuc2Nyb2xsVG9wID0gcG9zO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoX2lzRG9jdW1lbnQpIHtcblx0XHRcdFx0XHR3aW5kb3cuc2Nyb2xsVG8ocG9zLCBfdXRpbC5nZXQuc2Nyb2xsVG9wKCkpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdF9vcHRpb25zLmNvbnRhaW5lci5zY3JvbGxMZWZ0ID0gcG9zO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhhbmRsZSB1cGRhdGVzIGluIGN5Y2xlcyBpbnN0ZWFkIG9mIG9uIHNjcm9sbCAocGVyZm9ybWFuY2UpXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgdXBkYXRlU2NlbmVzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKF9lbmFibGVkICYmIF91cGRhdGVTY2VuZXNPbk5leHRDeWNsZSkge1xuXHRcdFx0XHQvLyBkZXRlcm1pbmUgc2NlbmVzIHRvIHVwZGF0ZVxuXHRcdFx0XHR2YXIgc2NlbmVzVG9VcGRhdGUgPSBfdXRpbC50eXBlLkFycmF5KF91cGRhdGVTY2VuZXNPbk5leHRDeWNsZSkgPyBfdXBkYXRlU2NlbmVzT25OZXh0Q3ljbGUgOiBfc2NlbmVPYmplY3RzLnNsaWNlKDApO1xuXHRcdFx0XHQvLyByZXNldCBzY2VuZXNcblx0XHRcdFx0X3VwZGF0ZVNjZW5lc09uTmV4dEN5Y2xlID0gZmFsc2U7XG5cdFx0XHRcdHZhciBvbGRTY3JvbGxQb3MgPSBfc2Nyb2xsUG9zO1xuXHRcdFx0XHQvLyB1cGRhdGUgc2Nyb2xsIHBvcyBub3cgaW5zdGVhZCBvZiBvbkNoYW5nZSwgYXMgaXQgbWlnaHQgaGF2ZSBjaGFuZ2VkIHNpbmNlIHNjaGVkdWxpbmcgKGkuZS4gaW4tYnJvd3NlciBzbW9vdGggc2Nyb2xsKVxuXHRcdFx0XHRfc2Nyb2xsUG9zID0gQ29udHJvbGxlci5zY3JvbGxQb3MoKTtcblx0XHRcdFx0dmFyIGRlbHRhU2Nyb2xsID0gX3Njcm9sbFBvcyAtIG9sZFNjcm9sbFBvcztcblx0XHRcdFx0aWYgKGRlbHRhU2Nyb2xsICE9PSAwKSB7IC8vIHNjcm9sbCBwb3NpdGlvbiBjaGFuZ2VkP1xuXHRcdFx0XHRcdF9zY3JvbGxEaXJlY3Rpb24gPSAoZGVsdGFTY3JvbGwgPiAwKSA/IFNDUk9MTF9ESVJFQ1RJT05fRk9SV0FSRCA6IFNDUk9MTF9ESVJFQ1RJT05fUkVWRVJTRTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyByZXZlcnNlIG9yZGVyIG9mIHNjZW5lcyBpZiBzY3JvbGxpbmcgcmV2ZXJzZVxuXHRcdFx0XHRpZiAoX3Njcm9sbERpcmVjdGlvbiA9PT0gU0NST0xMX0RJUkVDVElPTl9SRVZFUlNFKSB7XG5cdFx0XHRcdFx0c2NlbmVzVG9VcGRhdGUucmV2ZXJzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIHVwZGF0ZSBzY2VuZXNcblx0XHRcdFx0c2NlbmVzVG9VcGRhdGUuZm9yRWFjaChmdW5jdGlvbiAoc2NlbmUsIGluZGV4KSB7XG5cdFx0XHRcdFx0bG9nKDMsIFwidXBkYXRpbmcgU2NlbmUgXCIgKyAoaW5kZXggKyAxKSArIFwiL1wiICsgc2NlbmVzVG9VcGRhdGUubGVuZ3RoICsgXCIgKFwiICsgX3NjZW5lT2JqZWN0cy5sZW5ndGggKyBcIiB0b3RhbClcIik7XG5cdFx0XHRcdFx0c2NlbmUudXBkYXRlKHRydWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0aWYgKHNjZW5lc1RvVXBkYXRlLmxlbmd0aCA9PT0gMCAmJiBfb3B0aW9ucy5sb2dsZXZlbCA+PSAzKSB7XG5cdFx0XHRcdFx0bG9nKDMsIFwidXBkYXRpbmcgMCBTY2VuZXMgKG5vdGhpbmcgYWRkZWQgdG8gY29udHJvbGxlcilcIik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSW5pdGlhbGl6ZXMgckFGIGNhbGxiYWNrXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgZGVib3VuY2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRfdXBkYXRlVGltZW91dCA9IF91dGlsLnJBRih1cGRhdGVTY2VuZXMpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBIYW5kbGVzIENvbnRhaW5lciBjaGFuZ2VzXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgb25DaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0bG9nKDMsIFwiZXZlbnQgZmlyZWQgY2F1c2luZyBhbiB1cGRhdGU6XCIsIGUudHlwZSk7XG5cdFx0XHRpZiAoZS50eXBlID09IFwicmVzaXplXCIpIHtcblx0XHRcdFx0Ly8gcmVzaXplXG5cdFx0XHRcdF92aWV3UG9ydFNpemUgPSBnZXRWaWV3cG9ydFNpemUoKTtcblx0XHRcdFx0X3Njcm9sbERpcmVjdGlvbiA9IFNDUk9MTF9ESVJFQ1RJT05fUEFVU0VEO1xuXHRcdFx0fVxuXHRcdFx0Ly8gc2NoZWR1bGUgdXBkYXRlXG5cdFx0XHRpZiAoX3VwZGF0ZVNjZW5lc09uTmV4dEN5Y2xlICE9PSB0cnVlKSB7XG5cdFx0XHRcdF91cGRhdGVTY2VuZXNPbk5leHRDeWNsZSA9IHRydWU7XG5cdFx0XHRcdGRlYm91bmNlVXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciByZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCFfaXNEb2N1bWVudCkge1xuXHRcdFx0XHQvLyBzaW11bGF0ZSByZXNpemUgZXZlbnQuIE9ubHkgd29ya3MgZm9yIHZpZXdwb3J0IHJlbGV2YW50IHBhcmFtIChwZXJmb3JtYW5jZSlcblx0XHRcdFx0aWYgKF92aWV3UG9ydFNpemUgIT0gZ2V0Vmlld3BvcnRTaXplKCkpIHtcblx0XHRcdFx0XHR2YXIgcmVzaXplRXZlbnQ7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHJlc2l6ZUV2ZW50ID0gbmV3IEV2ZW50KCdyZXNpemUnLCB7XG5cdFx0XHRcdFx0XHRcdGJ1YmJsZXM6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRjYW5jZWxhYmxlOiBmYWxzZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkgeyAvLyBzdHVwaWQgSUVcblx0XHRcdFx0XHRcdHJlc2l6ZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJFdmVudFwiKTtcblx0XHRcdFx0XHRcdHJlc2l6ZUV2ZW50LmluaXRFdmVudChcInJlc2l6ZVwiLCBmYWxzZSwgZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRfb3B0aW9ucy5jb250YWluZXIuZGlzcGF0Y2hFdmVudChyZXNpemVFdmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdF9zY2VuZU9iamVjdHMuZm9yRWFjaChmdW5jdGlvbiAoc2NlbmUsIGluZGV4KSB7IC8vIHJlZnJlc2ggYWxsIHNjZW5lc1xuXHRcdFx0XHRzY2VuZS5yZWZyZXNoKCk7XG5cdFx0XHR9KTtcblx0XHRcdHNjaGVkdWxlUmVmcmVzaCgpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBTZW5kIGEgZGVidWcgbWVzc2FnZSB0byB0aGUgY29uc29sZS5cblx0XHQgKiBwcm92aWRlZCBwdWJsaWNseSB3aXRoIF9sb2cgZm9yIHBsdWdpbnNcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IGxvZ2xldmVsIC0gVGhlIGxvZ2xldmVsIHJlcXVpcmVkIHRvIGluaXRpYXRlIG91dHB1dCBmb3IgdGhlIG1lc3NhZ2UuXG5cdFx0ICogQHBhcmFtIHsuLi5taXhlZH0gb3V0cHV0IC0gT25lIG9yIG1vcmUgdmFyaWFibGVzIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCB0byB0aGUgY29uc29sZS5cblx0XHQgKi9cblx0XHR2YXIgbG9nID0gdGhpcy5fbG9nID0gZnVuY3Rpb24gKGxvZ2xldmVsLCBvdXRwdXQpIHtcblx0XHRcdGlmIChfb3B0aW9ucy5sb2dsZXZlbCA+PSBsb2dsZXZlbCkge1xuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUuc3BsaWNlLmNhbGwoYXJndW1lbnRzLCAxLCAwLCBcIihcIiArIE5BTUVTUEFDRSArIFwiKSAtPlwiKTtcblx0XHRcdFx0X3V0aWwubG9nLmFwcGx5KHdpbmRvdywgYXJndW1lbnRzKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdC8vIGZvciBzY2VuZXMgd2UgaGF2ZSBnZXR0ZXJzIGZvciBlYWNoIG9wdGlvbiwgYnV0IGZvciB0aGUgY29udHJvbGxlciB3ZSBkb24ndCwgc28gd2UgbmVlZCB0byBtYWtlIGl0IGF2YWlsYWJsZSBleHRlcm5hbGx5IGZvciBwbHVnaW5zXG5cdFx0dGhpcy5fb3B0aW9ucyA9IF9vcHRpb25zO1xuXG5cdFx0LyoqXG5cdFx0ICogU29ydCBzY2VuZXMgaW4gYXNjZW5kaW5nIG9yZGVyIG9mIHRoZWlyIHN0YXJ0IG9mZnNldC5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHthcnJheX0gU2NlbmVzQXJyYXkgLSBhbiBhcnJheSBvZiBTY3JvbGxNYWdpYyBTY2VuZXMgdGhhdCBzaG91bGQgYmUgc29ydGVkXG5cdFx0ICogQHJldHVybiB7YXJyYXl9IFRoZSBzb3J0ZWQgYXJyYXkgb2YgU2NlbmVzLlxuXHRcdCAqL1xuXHRcdHZhciBzb3J0U2NlbmVzID0gZnVuY3Rpb24gKFNjZW5lc0FycmF5KSB7XG5cdFx0XHRpZiAoU2NlbmVzQXJyYXkubGVuZ3RoIDw9IDEpIHtcblx0XHRcdFx0cmV0dXJuIFNjZW5lc0FycmF5O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIHNjZW5lcyA9IFNjZW5lc0FycmF5LnNsaWNlKDApO1xuXHRcdFx0XHRzY2VuZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0XHRcdHJldHVybiBhLnNjcm9sbE9mZnNldCgpID4gYi5zY3JvbGxPZmZzZXQoKSA/IDEgOiAtMTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBzY2VuZXM7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQgKiBwdWJsaWMgZnVuY3Rpb25zXG5cdFx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCAqL1xuXG5cdFx0LyoqXG5cdFx0ICogQWRkIG9uZSBvcmUgbW9yZSBzY2VuZShzKSB0byB0aGUgY29udHJvbGxlci4gIFxuXHRcdCAqIFRoaXMgaXMgdGhlIGVxdWl2YWxlbnQgdG8gYFNjZW5lLmFkZFRvKGNvbnRyb2xsZXIpYC5cblx0XHQgKiBAcHVibGljXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiAvLyB3aXRoIGEgcHJldmlvdXNseSBkZWZpbmVkIHNjZW5lXG5cdFx0ICogY29udHJvbGxlci5hZGRTY2VuZShzY2VuZSk7XG5cdFx0ICpcblx0XHQgKiAvLyB3aXRoIGEgbmV3bHkgY3JlYXRlZCBzY2VuZS5cblx0XHQgKiBjb250cm9sbGVyLmFkZFNjZW5lKG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7ZHVyYXRpb24gOiAwfSkpO1xuXHRcdCAqXG5cdFx0ICogLy8gYWRkaW5nIG11bHRpcGxlIHNjZW5lc1xuXHRcdCAqIGNvbnRyb2xsZXIuYWRkU2NlbmUoW3NjZW5lLCBzY2VuZTIsIG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7ZHVyYXRpb24gOiAwfSldKTtcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7KFNjcm9sbE1hZ2ljLlNjZW5lfGFycmF5KX0gbmV3U2NlbmUgLSBTY3JvbGxNYWdpYyBTY2VuZSBvciBBcnJheSBvZiBTY2VuZXMgdG8gYmUgYWRkZWQgdG8gdGhlIGNvbnRyb2xsZXIuXG5cdFx0ICogQHJldHVybiB7Q29udHJvbGxlcn0gUGFyZW50IG9iamVjdCBmb3IgY2hhaW5pbmcuXG5cdFx0ICovXG5cdFx0dGhpcy5hZGRTY2VuZSA9IGZ1bmN0aW9uIChuZXdTY2VuZSkge1xuXHRcdFx0aWYgKF91dGlsLnR5cGUuQXJyYXkobmV3U2NlbmUpKSB7XG5cdFx0XHRcdG5ld1NjZW5lLmZvckVhY2goZnVuY3Rpb24gKHNjZW5lLCBpbmRleCkge1xuXHRcdFx0XHRcdENvbnRyb2xsZXIuYWRkU2NlbmUoc2NlbmUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSBpZiAobmV3U2NlbmUgaW5zdGFuY2VvZiBTY3JvbGxNYWdpYy5TY2VuZSkge1xuXHRcdFx0XHRpZiAobmV3U2NlbmUuY29udHJvbGxlcigpICE9PSBDb250cm9sbGVyKSB7XG5cdFx0XHRcdFx0bmV3U2NlbmUuYWRkVG8oQ29udHJvbGxlcik7XG5cdFx0XHRcdH0gZWxzZSBpZiAoX3NjZW5lT2JqZWN0cy5pbmRleE9mKG5ld1NjZW5lKSA8IDApIHtcblx0XHRcdFx0XHQvLyBuZXcgc2NlbmVcblx0XHRcdFx0XHRfc2NlbmVPYmplY3RzLnB1c2gobmV3U2NlbmUpOyAvLyBhZGQgdG8gYXJyYXlcblx0XHRcdFx0XHRfc2NlbmVPYmplY3RzID0gc29ydFNjZW5lcyhfc2NlbmVPYmplY3RzKTsgLy8gc29ydFxuXHRcdFx0XHRcdG5ld1NjZW5lLm9uKFwic2hpZnQuY29udHJvbGxlcl9zb3J0XCIsIGZ1bmN0aW9uICgpIHsgLy8gcmVzb3J0IHdoZW5ldmVyIHNjZW5lIG1vdmVzXG5cdFx0XHRcdFx0XHRfc2NlbmVPYmplY3RzID0gc29ydFNjZW5lcyhfc2NlbmVPYmplY3RzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvLyBpbnNlcnQgR2xvYmFsIGRlZmF1bHRzLlxuXHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBfb3B0aW9ucy5nbG9iYWxTY2VuZU9wdGlvbnMpIHtcblx0XHRcdFx0XHRcdGlmIChuZXdTY2VuZVtrZXldKSB7XG5cdFx0XHRcdFx0XHRcdG5ld1NjZW5lW2tleV0uY2FsbChuZXdTY2VuZSwgX29wdGlvbnMuZ2xvYmFsU2NlbmVPcHRpb25zW2tleV0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsb2coMywgXCJhZGRpbmcgU2NlbmUgKG5vdyBcIiArIF9zY2VuZU9iamVjdHMubGVuZ3RoICsgXCIgdG90YWwpXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2coMSwgXCJFUlJPUjogaW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCBmb3IgJy5hZGRTY2VuZSgpJ1wiKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBDb250cm9sbGVyO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZW1vdmUgb25lIG9yZSBtb3JlIHNjZW5lKHMpIGZyb20gdGhlIGNvbnRyb2xsZXIuICBcblx0XHQgKiBUaGlzIGlzIHRoZSBlcXVpdmFsZW50IHRvIGBTY2VuZS5yZW1vdmUoKWAuXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gcmVtb3ZlIGEgc2NlbmUgZnJvbSB0aGUgY29udHJvbGxlclxuXHRcdCAqIGNvbnRyb2xsZXIucmVtb3ZlU2NlbmUoc2NlbmUpO1xuXHRcdCAqXG5cdFx0ICogLy8gcmVtb3ZlIG11bHRpcGxlIHNjZW5lcyBmcm9tIHRoZSBjb250cm9sbGVyXG5cdFx0ICogY29udHJvbGxlci5yZW1vdmVTY2VuZShbc2NlbmUsIHNjZW5lMiwgc2NlbmUzXSk7XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0geyhTY3JvbGxNYWdpYy5TY2VuZXxhcnJheSl9IFNjZW5lIC0gU2Nyb2xsTWFnaWMgU2NlbmUgb3IgQXJyYXkgb2YgU2NlbmVzIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgY29udHJvbGxlci5cblx0XHQgKiBAcmV0dXJucyB7Q29udHJvbGxlcn0gUGFyZW50IG9iamVjdCBmb3IgY2hhaW5pbmcuXG5cdFx0ICovXG5cdFx0dGhpcy5yZW1vdmVTY2VuZSA9IGZ1bmN0aW9uIChTY2VuZSkge1xuXHRcdFx0aWYgKF91dGlsLnR5cGUuQXJyYXkoU2NlbmUpKSB7XG5cdFx0XHRcdFNjZW5lLmZvckVhY2goZnVuY3Rpb24gKHNjZW5lLCBpbmRleCkge1xuXHRcdFx0XHRcdENvbnRyb2xsZXIucmVtb3ZlU2NlbmUoc2NlbmUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciBpbmRleCA9IF9zY2VuZU9iamVjdHMuaW5kZXhPZihTY2VuZSk7XG5cdFx0XHRcdGlmIChpbmRleCA+IC0xKSB7XG5cdFx0XHRcdFx0U2NlbmUub2ZmKFwic2hpZnQuY29udHJvbGxlcl9zb3J0XCIpO1xuXHRcdFx0XHRcdF9zY2VuZU9iamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRsb2coMywgXCJyZW1vdmluZyBTY2VuZSAobm93IFwiICsgX3NjZW5lT2JqZWN0cy5sZW5ndGggKyBcIiBsZWZ0KVwiKTtcblx0XHRcdFx0XHRTY2VuZS5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIENvbnRyb2xsZXI7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZSBvbmUgb3JlIG1vcmUgc2NlbmUocykgYWNjb3JkaW5nIHRvIHRoZSBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIGNvbnRhaW5lci4gIFxuXHRcdCAqIFRoaXMgaXMgdGhlIGVxdWl2YWxlbnQgdG8gYFNjZW5lLnVwZGF0ZSgpYC4gIFxuXHRcdCAqIFRoZSB1cGRhdGUgbWV0aG9kIGNhbGN1bGF0ZXMgdGhlIHNjZW5lJ3Mgc3RhcnQgYW5kIGVuZCBwb3NpdGlvbiAoYmFzZWQgb24gdGhlIHRyaWdnZXIgZWxlbWVudCwgdHJpZ2dlciBob29rLCBkdXJhdGlvbiBhbmQgb2Zmc2V0KSBhbmQgY2hlY2tzIGl0IGFnYWluc3QgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSBjb250YWluZXIuICBcblx0XHQgKiBJdCB0aGVuIHVwZGF0ZXMgdGhlIGN1cnJlbnQgc2NlbmUgc3RhdGUgYWNjb3JkaW5nbHkgKG9yIGRvZXMgbm90aGluZywgaWYgdGhlIHN0YXRlIGlzIGFscmVhZHkgY29ycmVjdCkg4oCTIFBpbnMgd2lsbCBiZSBzZXQgdG8gdGhlaXIgY29ycmVjdCBwb3NpdGlvbiBhbmQgdHdlZW5zIHdpbGwgYmUgdXBkYXRlZCB0byB0aGVpciBjb3JyZWN0IHByb2dyZXNzLiAgXG5cdFx0ICogXyoqTm90ZToqKiBUaGlzIG1ldGhvZCBnZXRzIGNhbGxlZCBjb25zdGFudGx5IHdoZW5ldmVyIENvbnRyb2xsZXIgZGV0ZWN0cyBhIGNoYW5nZS4gVGhlIG9ubHkgYXBwbGljYXRpb24gZm9yIHlvdSBpcyBpZiB5b3UgY2hhbmdlIHNvbWV0aGluZyBvdXRzaWRlIG9mIHRoZSByZWFsbSBvZiBTY3JvbGxNYWdpYywgbGlrZSBtb3ZpbmcgdGhlIHRyaWdnZXIgb3IgY2hhbmdpbmcgdHdlZW4gcGFyYW1ldGVycy5fXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gdXBkYXRlIGEgc3BlY2lmaWMgc2NlbmUgb24gbmV4dCBjeWNsZVxuXHRcdCAqIGNvbnRyb2xsZXIudXBkYXRlU2NlbmUoc2NlbmUpO1xuXHRcdCAqXG5cdFx0ICogLy8gdXBkYXRlIGEgc3BlY2lmaWMgc2NlbmUgaW1tZWRpYXRlbHlcblx0XHQgKiBjb250cm9sbGVyLnVwZGF0ZVNjZW5lKHNjZW5lLCB0cnVlKTtcblx0XHQgKlxuXHRcdCAqIC8vIHVwZGF0ZSBtdWx0aXBsZSBzY2VuZXMgc2NlbmUgb24gbmV4dCBjeWNsZVxuXHRcdCAqIGNvbnRyb2xsZXIudXBkYXRlU2NlbmUoW3NjZW5lMSwgc2NlbmUyLCBzY2VuZTNdKTtcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U2Nyb2xsTWFnaWMuU2NlbmV9IFNjZW5lIC0gU2Nyb2xsTWFnaWMgU2NlbmUgb3IgQXJyYXkgb2YgU2NlbmVzIHRoYXQgaXMvYXJlIHN1cHBvc2VkIHRvIGJlIHVwZGF0ZWQuXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbaW1tZWRpYXRlbHk9ZmFsc2VdIC0gSWYgYHRydWVgIHRoZSB1cGRhdGUgd2lsbCBiZSBpbnN0YW50LCBpZiBgZmFsc2VgIGl0IHdpbGwgd2FpdCB1bnRpbCBuZXh0IHVwZGF0ZSBjeWNsZS4gIFxuXHRcdCBUaGlzIGlzIHVzZWZ1bCB3aGVuIGNoYW5naW5nIG11bHRpcGxlIHByb3BlcnRpZXMgb2YgdGhlIHNjZW5lIC0gdGhpcyB3YXkgaXQgd2lsbCBvbmx5IGJlIHVwZGF0ZWQgb25jZSBhbGwgbmV3IHByb3BlcnRpZXMgYXJlIHNldCAodXBkYXRlU2NlbmVzKS5cblx0XHQgKiBAcmV0dXJuIHtDb250cm9sbGVyfSBQYXJlbnQgb2JqZWN0IGZvciBjaGFpbmluZy5cblx0XHQgKi9cblx0XHR0aGlzLnVwZGF0ZVNjZW5lID0gZnVuY3Rpb24gKFNjZW5lLCBpbW1lZGlhdGVseSkge1xuXHRcdFx0aWYgKF91dGlsLnR5cGUuQXJyYXkoU2NlbmUpKSB7XG5cdFx0XHRcdFNjZW5lLmZvckVhY2goZnVuY3Rpb24gKHNjZW5lLCBpbmRleCkge1xuXHRcdFx0XHRcdENvbnRyb2xsZXIudXBkYXRlU2NlbmUoc2NlbmUsIGltbWVkaWF0ZWx5KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoaW1tZWRpYXRlbHkpIHtcblx0XHRcdFx0XHRTY2VuZS51cGRhdGUodHJ1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoX3VwZGF0ZVNjZW5lc09uTmV4dEN5Y2xlICE9PSB0cnVlICYmIFNjZW5lIGluc3RhbmNlb2YgU2Nyb2xsTWFnaWMuU2NlbmUpIHsgLy8gaWYgX3VwZGF0ZVNjZW5lc09uTmV4dEN5Y2xlIGlzIHRydWUsIGFsbCBjb25uZWN0ZWQgc2NlbmVzIGFyZSBhbHJlYWR5IHNjaGVkdWxlZCBmb3IgdXBkYXRlXG5cdFx0XHRcdFx0Ly8gcHJlcCBhcnJheSBmb3IgbmV4dCB1cGRhdGUgY3ljbGVcblx0XHRcdFx0XHRfdXBkYXRlU2NlbmVzT25OZXh0Q3ljbGUgPSBfdXBkYXRlU2NlbmVzT25OZXh0Q3ljbGUgfHwgW107XG5cdFx0XHRcdFx0aWYgKF91cGRhdGVTY2VuZXNPbk5leHRDeWNsZS5pbmRleE9mKFNjZW5lKSA9PSAtMSkge1xuXHRcdFx0XHRcdFx0X3VwZGF0ZVNjZW5lc09uTmV4dEN5Y2xlLnB1c2goU2NlbmUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRfdXBkYXRlU2NlbmVzT25OZXh0Q3ljbGUgPSBzb3J0U2NlbmVzKF91cGRhdGVTY2VuZXNPbk5leHRDeWNsZSk7IC8vIHNvcnRcblx0XHRcdFx0XHRkZWJvdW5jZVVwZGF0ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gQ29udHJvbGxlcjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlcyB0aGUgY29udHJvbGxlciBwYXJhbXMgYW5kIGNhbGxzIHVwZGF0ZVNjZW5lIG9uIGV2ZXJ5IHNjZW5lLCB0aGF0IGlzIGF0dGFjaGVkIHRvIHRoZSBjb250cm9sbGVyLiAgXG5cdFx0ICogU2VlIGBDb250cm9sbGVyLnVwZGF0ZVNjZW5lKClgIGZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgdGhpcyBtZWFucy4gIFxuXHRcdCAqIEluIG1vc3QgY2FzZXMgeW91IHdpbGwgbm90IG5lZWQgdGhpcyBmdW5jdGlvbiwgYXMgaXQgaXMgY2FsbGVkIGNvbnN0YW50bHksIHdoZW5ldmVyIFNjcm9sbE1hZ2ljIGRldGVjdHMgYSBzdGF0ZSBjaGFuZ2UgZXZlbnQsIGxpa2UgcmVzaXplIG9yIHNjcm9sbC4gIFxuXHRcdCAqIFRoZSBvbmx5IGFwcGxpY2F0aW9uIGZvciB0aGlzIG1ldGhvZCBpcyB3aGVuIFNjcm9sbE1hZ2ljIGZhaWxzIHRvIGRldGVjdCB0aGVzZSBldmVudHMuICBcblx0XHQgKiBPbmUgYXBwbGljYXRpb24gaXMgd2l0aCBzb21lIGV4dGVybmFsIHNjcm9sbCBsaWJyYXJpZXMgKGxpa2UgaVNjcm9sbCkgdGhhdCBtb3ZlIGFuIGludGVybmFsIGNvbnRhaW5lciB0byBhIG5lZ2F0aXZlIG9mZnNldCBpbnN0ZWFkIG9mIGFjdHVhbGx5IHNjcm9sbGluZy4gSW4gdGhpcyBjYXNlIHRoZSB1cGRhdGUgb24gdGhlIGNvbnRyb2xsZXIgbmVlZHMgdG8gYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjaGlsZCBjb250YWluZXIncyBwb3NpdGlvbiBjaGFuZ2VzLlxuXHRcdCAqIEZvciB0aGlzIGNhc2UgdGhlcmUgd2lsbCBhbHNvIGJlIHRoZSBuZWVkIHRvIHByb3ZpZGUgYSBjdXN0b20gZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHRoZSBjb3JyZWN0IHNjcm9sbCBwb3NpdGlvbi4gU2VlIGBDb250cm9sbGVyLnNjcm9sbFBvcygpYCBmb3IgZGV0YWlscy5cblx0XHQgKiBAcHVibGljXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiAvLyB1cGRhdGUgdGhlIGNvbnRyb2xsZXIgb24gbmV4dCBjeWNsZSAoc2F2ZXMgcGVyZm9ybWFuY2UgZHVlIHRvIGVsaW1pbmF0aW9uIG9mIHJlZHVuZGFudCB1cGRhdGVzKVxuXHRcdCAqIGNvbnRyb2xsZXIudXBkYXRlKCk7XG5cdFx0ICpcblx0XHQgKiAvLyB1cGRhdGUgdGhlIGNvbnRyb2xsZXIgaW1tZWRpYXRlbHlcblx0XHQgKiBjb250cm9sbGVyLnVwZGF0ZSh0cnVlKTtcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ltbWVkaWF0ZWx5PWZhbHNlXSAtIElmIGB0cnVlYCB0aGUgdXBkYXRlIHdpbGwgYmUgaW5zdGFudCwgaWYgYGZhbHNlYCBpdCB3aWxsIHdhaXQgdW50aWwgbmV4dCB1cGRhdGUgY3ljbGUgKGJldHRlciBwZXJmb3JtYW5jZSlcblx0XHQgKiBAcmV0dXJuIHtDb250cm9sbGVyfSBQYXJlbnQgb2JqZWN0IGZvciBjaGFpbmluZy5cblx0XHQgKi9cblx0XHR0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uIChpbW1lZGlhdGVseSkge1xuXHRcdFx0b25DaGFuZ2Uoe1xuXHRcdFx0XHR0eXBlOiBcInJlc2l6ZVwiXG5cdFx0XHR9KTsgLy8gd2lsbCB1cGRhdGUgc2l6ZSBhbmQgc2V0IF91cGRhdGVTY2VuZXNPbk5leHRDeWNsZSB0byB0cnVlXG5cdFx0XHRpZiAoaW1tZWRpYXRlbHkpIHtcblx0XHRcdFx0dXBkYXRlU2NlbmVzKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gQ29udHJvbGxlcjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogU2Nyb2xsIHRvIGEgbnVtZXJpYyBzY3JvbGwgb2Zmc2V0LCBhIERPTSBlbGVtZW50LCB0aGUgc3RhcnQgb2YgYSBzY2VuZSBvciBwcm92aWRlIGFuIGFsdGVybmF0ZSBtZXRob2QgZm9yIHNjcm9sbGluZy4gIFxuXHRcdCAqIEZvciB2ZXJ0aWNhbCBjb250cm9sbGVycyBpdCB3aWxsIGNoYW5nZSB0aGUgdG9wIHNjcm9sbCBvZmZzZXQgYW5kIGZvciBob3Jpem9udGFsIGFwcGxpY2F0aW9ucyBpdCB3aWxsIGNoYW5nZSB0aGUgbGVmdCBvZmZzZXQuXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqXG5cdFx0ICogQHNpbmNlIDEuMS4wXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiAvLyBzY3JvbGwgdG8gYW4gb2Zmc2V0IG9mIDEwMFxuXHRcdCAqIGNvbnRyb2xsZXIuc2Nyb2xsVG8oMTAwKTtcblx0XHQgKlxuXHRcdCAqIC8vIHNjcm9sbCB0byBhIERPTSBlbGVtZW50XG5cdFx0ICogY29udHJvbGxlci5zY3JvbGxUbyhcIiNhbmNob3JcIik7XG5cdFx0ICpcblx0XHQgKiAvLyBzY3JvbGwgdG8gdGhlIGJlZ2lubmluZyBvZiBhIHNjZW5lXG5cdFx0ICogdmFyIHNjZW5lID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtvZmZzZXQ6IDIwMH0pO1xuXHRcdCAqIGNvbnRyb2xsZXIuc2Nyb2xsVG8oc2NlbmUpO1xuXHRcdCAqXG5cdFx0ICogLy8gZGVmaW5lIGEgbmV3IHNjcm9sbCBwb3NpdGlvbiBtb2RpZmljYXRpb24gZnVuY3Rpb24gKGpRdWVyeSBhbmltYXRlIGluc3RlYWQgb2YganVtcClcblx0XHQgKiBjb250cm9sbGVyLnNjcm9sbFRvKGZ1bmN0aW9uIChuZXdTY3JvbGxQb3MpIHtcblx0XHQgKlx0JChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBuZXdTY3JvbGxQb3N9KTtcblx0XHQgKiB9KTtcblx0XHQgKiBjb250cm9sbGVyLnNjcm9sbFRvKDEwMCk7IC8vIGNhbGwgYXMgdXN1YWwsIGJ1dCB0aGUgbmV3IGZ1bmN0aW9uIHdpbGwgYmUgdXNlZCBpbnN0ZWFkXG5cdFx0ICpcblx0XHQgKiAvLyBkZWZpbmUgYSBuZXcgc2Nyb2xsIGZ1bmN0aW9uIHdpdGggYW4gYWRkaXRpb25hbCBwYXJhbWV0ZXJcblx0XHQgKiBjb250cm9sbGVyLnNjcm9sbFRvKGZ1bmN0aW9uIChuZXdTY3JvbGxQb3MsIG1lc3NhZ2UpIHtcblx0XHQgKiAgY29uc29sZS5sb2cobWVzc2FnZSk7XG5cdFx0ICpcdCQodGhpcykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBuZXdTY3JvbGxQb3N9KTtcblx0XHQgKiB9KTtcblx0XHQgKiAvLyBjYWxsIGFzIHVzdWFsLCBidXQgc3VwcGx5IGFuIGV4dHJhIHBhcmFtZXRlciB0byB0aGUgZGVmaW5lZCBjdXN0b20gZnVuY3Rpb25cblx0XHQgKiBjb250cm9sbGVyLnNjcm9sbFRvKDEwMCwgXCJteSBtZXNzYWdlXCIpO1xuXHRcdCAqXG5cdFx0ICogLy8gZGVmaW5lIGEgbmV3IHNjcm9sbCBmdW5jdGlvbiB3aXRoIGFuIGFkZGl0aW9uYWwgcGFyYW1ldGVyIGNvbnRhaW5pbmcgbXVsdGlwbGUgdmFyaWFibGVzXG5cdFx0ICogY29udHJvbGxlci5zY3JvbGxUbyhmdW5jdGlvbiAobmV3U2Nyb2xsUG9zLCBvcHRpb25zKSB7XG5cdFx0ICogIHNvbWVHbG9iYWxWYXIgPSBvcHRpb25zLmEgKyBvcHRpb25zLmI7XG5cdFx0ICpcdCQodGhpcykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBuZXdTY3JvbGxQb3N9KTtcblx0XHQgKiB9KTtcblx0XHQgKiAvLyBjYWxsIGFzIHVzdWFsLCBidXQgc3VwcGx5IGFuIGV4dHJhIHBhcmFtZXRlciBjb250YWluaW5nIG11bHRpcGxlIG9wdGlvbnNcblx0XHQgKiBjb250cm9sbGVyLnNjcm9sbFRvKDEwMCwge2E6IDEsIGI6IDJ9KTtcblx0XHQgKlxuXHRcdCAqIC8vIGRlZmluZSBhIG5ldyBzY3JvbGwgZnVuY3Rpb24gd2l0aCBhIGNhbGxiYWNrIHN1cHBsaWVkIGFzIGFuIGFkZGl0aW9uYWwgcGFyYW1ldGVyXG5cdFx0ICogY29udHJvbGxlci5zY3JvbGxUbyhmdW5jdGlvbiAobmV3U2Nyb2xsUG9zLCBjYWxsYmFjaykge1xuXHRcdCAqXHQkKHRoaXMpLmFuaW1hdGUoe3Njcm9sbFRvcDogbmV3U2Nyb2xsUG9zfSwgNDAwLCBcInN3aW5nXCIsIGNhbGxiYWNrKTtcblx0XHQgKiB9KTtcblx0XHQgKiAvLyBjYWxsIGFzIHVzdWFsLCBidXQgc3VwcGx5IGFuIGV4dHJhIHBhcmFtZXRlciwgd2hpY2ggaXMgdXNlZCBhcyBhIGNhbGxiYWNrIGluIHRoZSBwcmV2aW91c2x5IGRlZmluZWQgY3VzdG9tIHNjcm9sbCBmdW5jdGlvblxuXHRcdCAqIGNvbnRyb2xsZXIuc2Nyb2xsVG8oMTAwLCBmdW5jdGlvbigpIHtcblx0XHQgKlx0Y29uc29sZS5sb2coXCJzY3JvbGwgaGFzIGZpbmlzaGVkLlwiKTtcblx0XHQgKiB9KTtcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IHNjcm9sbFRhcmdldCAtIFRoZSBzdXBwbGllZCBhcmd1bWVudCBjYW4gYmUgb25lIG9mIHRoZXNlIHR5cGVzOlxuXHRcdCAqIDEuIGBudW1iZXJgIC0+IFRoZSBjb250YWluZXIgd2lsbCBzY3JvbGwgdG8gdGhpcyBuZXcgc2Nyb2xsIG9mZnNldC5cblx0XHQgKiAyLiBgc3RyaW5nYCBvciBgb2JqZWN0YCAtPiBDYW4gYmUgYSBzZWxlY3RvciBvciBhIERPTSBvYmplY3QuICBcblx0XHQgKiAgVGhlIGNvbnRhaW5lciB3aWxsIHNjcm9sbCB0byB0aGUgcG9zaXRpb24gb2YgdGhpcyBlbGVtZW50LlxuXHRcdCAqIDMuIGBTY3JvbGxNYWdpYyBTY2VuZWAgLT4gVGhlIGNvbnRhaW5lciB3aWxsIHNjcm9sbCB0byB0aGUgc3RhcnQgb2YgdGhpcyBzY2VuZS5cblx0XHQgKiA0LiBgZnVuY3Rpb25gIC0+IFRoaXMgZnVuY3Rpb24gd2lsbCBiZSB1c2VkIGZvciBmdXR1cmUgc2Nyb2xsIHBvc2l0aW9uIG1vZGlmaWNhdGlvbnMuICBcblx0XHQgKiAgVGhpcyBwcm92aWRlcyBhIHdheSBmb3IgeW91IHRvIGNoYW5nZSB0aGUgYmVoYXZpb3VyIG9mIHNjcm9sbGluZyBhbmQgYWRkaW5nIG5ldyBiZWhhdmlvdXIgbGlrZSBhbmltYXRpb24uIFRoZSBmdW5jdGlvbiByZWNlaXZlcyB0aGUgbmV3IHNjcm9sbCBwb3NpdGlvbiBhcyBhIHBhcmFtZXRlciBhbmQgYSByZWZlcmVuY2UgdG8gdGhlIGNvbnRhaW5lciBlbGVtZW50IHVzaW5nIGB0aGlzYC4gIFxuXHRcdCAqICBJdCBtYXkgYWxzbyBvcHRpb25hbGx5IHJlY2VpdmUgYW4gb3B0aW9uYWwgYWRkaXRpb25hbCBwYXJhbWV0ZXIgKHNlZSBiZWxvdykgIFxuXHRcdCAqICBfKipOT1RFOioqICBcblx0XHQgKiAgQWxsIG90aGVyIG9wdGlvbnMgd2lsbCBzdGlsbCB3b3JrIGFzIGV4cGVjdGVkLCB1c2luZyB0aGUgbmV3IGZ1bmN0aW9uIHRvIHNjcm9sbC5fXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gW2FkZGl0aW9uYWxQYXJhbWV0ZXJdIC0gSWYgYSBjdXN0b20gc2Nyb2xsIGZ1bmN0aW9uIHdhcyBkZWZpbmVkIChzZWUgYWJvdmUgNC4pLCB5b3UgbWF5IHdhbnQgdG8gc3VwcGx5IGFkZGl0aW9uYWwgcGFyYW1ldGVycyB0byBpdCwgd2hlbiBjYWxsaW5nIGl0LiBZb3UgY2FuIGRvIHRoaXMgdXNpbmcgdGhpcyBwYXJhbWV0ZXIg4oCTIHNlZSBleGFtcGxlcyBmb3IgZGV0YWlscy4gUGxlYXNlIG5vdGUsIHRoYXQgdGhpcyBwYXJhbWV0ZXIgd2lsbCBoYXZlIG5vIGVmZmVjdCwgaWYgeW91IHVzZSB0aGUgZGVmYXVsdCBzY3JvbGxpbmcgZnVuY3Rpb24uXG5cdFx0ICogQHJldHVybnMge0NvbnRyb2xsZXJ9IFBhcmVudCBvYmplY3QgZm9yIGNoYWluaW5nLlxuXHRcdCAqL1xuXHRcdHRoaXMuc2Nyb2xsVG8gPSBmdW5jdGlvbiAoc2Nyb2xsVGFyZ2V0LCBhZGRpdGlvbmFsUGFyYW1ldGVyKSB7XG5cdFx0XHRpZiAoX3V0aWwudHlwZS5OdW1iZXIoc2Nyb2xsVGFyZ2V0KSkgeyAvLyBleGNlY3V0ZVxuXHRcdFx0XHRzZXRTY3JvbGxQb3MuY2FsbChfb3B0aW9ucy5jb250YWluZXIsIHNjcm9sbFRhcmdldCwgYWRkaXRpb25hbFBhcmFtZXRlcik7XG5cdFx0XHR9IGVsc2UgaWYgKHNjcm9sbFRhcmdldCBpbnN0YW5jZW9mIFNjcm9sbE1hZ2ljLlNjZW5lKSB7IC8vIHNjcm9sbCB0byBzY2VuZVxuXHRcdFx0XHRpZiAoc2Nyb2xsVGFyZ2V0LmNvbnRyb2xsZXIoKSA9PT0gQ29udHJvbGxlcikgeyAvLyBjaGVjayBpZiB0aGUgY29udHJvbGxlciBpcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBzY2VuZVxuXHRcdFx0XHRcdENvbnRyb2xsZXIuc2Nyb2xsVG8oc2Nyb2xsVGFyZ2V0LnNjcm9sbE9mZnNldCgpLCBhZGRpdGlvbmFsUGFyYW1ldGVyKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsb2coMiwgXCJzY3JvbGxUbygpOiBUaGUgc3VwcGxpZWQgc2NlbmUgZG9lcyBub3QgYmVsb25nIHRvIHRoaXMgY29udHJvbGxlci4gU2Nyb2xsIGNhbmNlbGxlZC5cIiwgc2Nyb2xsVGFyZ2V0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChfdXRpbC50eXBlLkZ1bmN0aW9uKHNjcm9sbFRhcmdldCkpIHsgLy8gYXNzaWduIG5ldyBzY3JvbGwgZnVuY3Rpb25cblx0XHRcdFx0c2V0U2Nyb2xsUG9zID0gc2Nyb2xsVGFyZ2V0O1xuXHRcdFx0fSBlbHNlIHsgLy8gc2Nyb2xsIHRvIGVsZW1lbnRcblx0XHRcdFx0dmFyIGVsZW0gPSBfdXRpbC5nZXQuZWxlbWVudHMoc2Nyb2xsVGFyZ2V0KVswXTtcblx0XHRcdFx0aWYgKGVsZW0pIHtcblx0XHRcdFx0XHQvLyBpZiBwYXJlbnQgaXMgcGluIHNwYWNlciwgdXNlIHNwYWNlciBwb3NpdGlvbiBpbnN0ZWFkIHNvIGNvcnJlY3Qgc3RhcnQgcG9zaXRpb24gaXMgcmV0dXJuZWQgZm9yIHBpbm5lZCBlbGVtZW50cy5cblx0XHRcdFx0XHR3aGlsZSAoZWxlbS5wYXJlbnROb2RlLmhhc0F0dHJpYnV0ZShQSU5fU1BBQ0VSX0FUVFJJQlVURSkpIHtcblx0XHRcdFx0XHRcdGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyXG5cdFx0XHRcdFx0cGFyYW0gPSBfb3B0aW9ucy52ZXJ0aWNhbCA/IFwidG9wXCIgOiBcImxlZnRcIixcblx0XHRcdFx0XHRcdC8vIHdoaWNoIHBhcmFtIGlzIG9mIGludGVyZXN0ID9cblx0XHRcdFx0XHRcdGNvbnRhaW5lck9mZnNldCA9IF91dGlsLmdldC5vZmZzZXQoX29wdGlvbnMuY29udGFpbmVyKSxcblx0XHRcdFx0XHRcdC8vIGNvbnRhaW5lciBwb3NpdGlvbiBpcyBuZWVkZWQgYmVjYXVzZSBlbGVtZW50IG9mZnNldCBpcyByZXR1cm5lZCBpbiByZWxhdGlvbiB0byBkb2N1bWVudCwgbm90IGluIHJlbGF0aW9uIHRvIGNvbnRhaW5lci5cblx0XHRcdFx0XHRcdGVsZW1lbnRPZmZzZXQgPSBfdXRpbC5nZXQub2Zmc2V0KGVsZW0pO1xuXG5cdFx0XHRcdFx0aWYgKCFfaXNEb2N1bWVudCkgeyAvLyBjb250YWluZXIgaXMgbm90IHRoZSBkb2N1bWVudCByb290LCBzbyBzdWJzdHJhY3Qgc2Nyb2xsIFBvc2l0aW9uIHRvIGdldCBjb3JyZWN0IHRyaWdnZXIgZWxlbWVudCBwb3NpdGlvbiByZWxhdGl2ZSB0byBzY3JvbGxjb250ZW50XG5cdFx0XHRcdFx0XHRjb250YWluZXJPZmZzZXRbcGFyYW1dIC09IENvbnRyb2xsZXIuc2Nyb2xsUG9zKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Q29udHJvbGxlci5zY3JvbGxUbyhlbGVtZW50T2Zmc2V0W3BhcmFtXSAtIGNvbnRhaW5lck9mZnNldFtwYXJhbV0sIGFkZGl0aW9uYWxQYXJhbWV0ZXIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxvZygyLCBcInNjcm9sbFRvKCk6IFRoZSBzdXBwbGllZCBhcmd1bWVudCBpcyBpbnZhbGlkLiBTY3JvbGwgY2FuY2VsbGVkLlwiLCBzY3JvbGxUYXJnZXQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gQ29udHJvbGxlcjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogKipHZXQqKiB0aGUgY3VycmVudCBzY3JvbGxQb3NpdGlvbiBvciAqKlNldCoqIGEgbmV3IG1ldGhvZCB0byBjYWxjdWxhdGUgaXQuICBcblx0XHQgKiAtPiAqKkdFVCoqOlxuXHRcdCAqIFdoZW4gdXNlZCBhcyBhIGdldHRlciB0aGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbi4gIFxuXHRcdCAqIFRvIGdldCBhIGNhY2hlZCB2YWx1ZSB1c2UgQ29udHJvbGxlci5pbmZvKFwic2Nyb2xsUG9zXCIpLCB3aGljaCB3aWxsIGJlIHVwZGF0ZWQgaW4gdGhlIHVwZGF0ZSBjeWNsZS4gIFxuXHRcdCAqIEZvciB2ZXJ0aWNhbCBjb250cm9sbGVycyBpdCB3aWxsIHJldHVybiB0aGUgdG9wIHNjcm9sbCBvZmZzZXQgYW5kIGZvciBob3Jpem9udGFsIGFwcGxpY2F0aW9ucyBpdCB3aWxsIHJldHVybiB0aGUgbGVmdCBvZmZzZXQuXG5cdFx0ICpcblx0XHQgKiAtPiAqKlNFVCoqOlxuXHRcdCAqIFdoZW4gdXNlZCBhcyBhIHNldHRlciB0aGlzIG1ldGhvZCBwcm9kZXMgYSB3YXkgdG8gcGVybWFuZW50bHkgb3ZlcndyaXRlIHRoZSBjb250cm9sbGVyJ3Mgc2Nyb2xsIHBvc2l0aW9uIGNhbGN1bGF0aW9uLiAgXG5cdFx0ICogQSB0eXBpY2FsIHVzZWNhc2UgaXMgd2hlbiB0aGUgc2Nyb2xsIHBvc2l0aW9uIGlzIG5vdCByZWZsZWN0ZWQgYnkgdGhlIGNvbnRhaW5lcnMgc2Nyb2xsVG9wIG9yIHNjcm9sbExlZnQgdmFsdWVzLCBidXQgZm9yIGV4YW1wbGUgYnkgdGhlIGlubmVyIG9mZnNldCBvZiBhIGNoaWxkIGNvbnRhaW5lci4gIFxuXHRcdCAqIE1vdmluZyBhIGNoaWxkIGNvbnRhaW5lciBpbnNpZGUgYSBwYXJlbnQgaXMgYSBjb21tb25seSB1c2VkIG1ldGhvZCBmb3Igc2V2ZXJhbCBzY3JvbGxpbmcgZnJhbWV3b3JrcywgaW5jbHVkaW5nIGlTY3JvbGwuICBcblx0XHQgKiBCeSBwcm92aWRpbmcgYW4gYWx0ZXJuYXRlIGNhbGN1bGF0aW9uIGZ1bmN0aW9uIHlvdSBjYW4gbWFrZSBzdXJlIFNjcm9sbE1hZ2ljIHJlY2VpdmVzIHRoZSBjb3JyZWN0IHNjcm9sbCBwb3NpdGlvbi4gIFxuXHRcdCAqIFBsZWFzZSBhbHNvIGJlYXIgaW4gbWluZCB0aGF0IHlvdXIgZnVuY3Rpb24gc2hvdWxkIHJldHVybiB5IHZhbHVlcyBmb3IgdmVydGljYWwgc2Nyb2xscyBhbiB4IGZvciBob3Jpem9udGFscy5cblx0XHQgKlxuXHRcdCAqIFRvIGNoYW5nZSB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gcGxlYXNlIHVzZSBgQ29udHJvbGxlci5zY3JvbGxUbygpYC5cblx0XHQgKiBAcHVibGljXG5cdFx0ICpcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIGdldCB0aGUgY3VycmVudCBzY3JvbGwgUG9zaXRpb25cblx0XHQgKiB2YXIgc2Nyb2xsUG9zID0gY29udHJvbGxlci5zY3JvbGxQb3MoKTtcblx0XHQgKlxuXHRcdCAqIC8vIHNldCBhIG5ldyBzY3JvbGwgcG9zaXRpb24gY2FsY3VsYXRpb24gbWV0aG9kXG5cdFx0ICogY29udHJvbGxlci5zY3JvbGxQb3MoZnVuY3Rpb24gKCkge1xuXHRcdCAqXHRyZXR1cm4gdGhpcy5pbmZvKFwidmVydGljYWxcIikgPyAtbXljaGlsZGNvbnRhaW5lci55IDogLW15Y2hpbGRjb250YWluZXIueFxuXHRcdCAqIH0pO1xuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbn0gW3Njcm9sbFBvc01ldGhvZF0gLSBUaGUgZnVuY3Rpb24gdG8gYmUgdXNlZCBmb3IgdGhlIHNjcm9sbCBwb3NpdGlvbiBjYWxjdWxhdGlvbiBvZiB0aGUgY29udGFpbmVyLlxuXHRcdCAqIEByZXR1cm5zIHsobnVtYmVyfENvbnRyb2xsZXIpfSBDdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBvciBwYXJlbnQgb2JqZWN0IGZvciBjaGFpbmluZy5cblx0XHQgKi9cblx0XHR0aGlzLnNjcm9sbFBvcyA9IGZ1bmN0aW9uIChzY3JvbGxQb3NNZXRob2QpIHtcblx0XHRcdGlmICghYXJndW1lbnRzLmxlbmd0aCkgeyAvLyBnZXRcblx0XHRcdFx0cmV0dXJuIGdldFNjcm9sbFBvcy5jYWxsKENvbnRyb2xsZXIpO1xuXHRcdFx0fSBlbHNlIHsgLy8gc2V0XG5cdFx0XHRcdGlmIChfdXRpbC50eXBlLkZ1bmN0aW9uKHNjcm9sbFBvc01ldGhvZCkpIHtcblx0XHRcdFx0XHRnZXRTY3JvbGxQb3MgPSBzY3JvbGxQb3NNZXRob2Q7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bG9nKDIsIFwiUHJvdmlkZWQgdmFsdWUgZm9yIG1ldGhvZCAnc2Nyb2xsUG9zJyBpcyBub3QgYSBmdW5jdGlvbi4gVG8gY2hhbmdlIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiB1c2UgJ3Njcm9sbFRvKCknLlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIENvbnRyb2xsZXI7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqICoqR2V0KiogYWxsIGluZm9zIG9yIG9uZSBpbiBwYXJ0aWN1bGFyIGFib3V0IHRoZSBjb250cm9sbGVyLlxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIHJldHVybnMgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIChudW1iZXIpXG5cdFx0ICogdmFyIHNjcm9sbFBvcyA9IGNvbnRyb2xsZXIuaW5mbyhcInNjcm9sbFBvc1wiKTtcblx0XHQgKlxuXHRcdCAqIC8vIHJldHVybnMgYWxsIGluZm9zIGFzIGFuIG9iamVjdFxuXHRcdCAqIHZhciBpbmZvcyA9IGNvbnRyb2xsZXIuaW5mbygpO1xuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IFthYm91dF0gLSBJZiBwYXNzZWQgb25seSB0aGlzIGluZm8gd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIGFuIG9iamVjdCBjb250YWluaW5nIGFsbC4gIFxuXHRcdCBWYWxpZCBvcHRpb25zIGFyZTpcblx0XHQgKiogYFwic2l6ZVwiYCA9PiB0aGUgY3VycmVudCB2aWV3cG9ydCBzaXplIG9mIHRoZSBjb250YWluZXJcblx0XHQgKiogYFwidmVydGljYWxcImAgPT4gdHJ1ZSBpZiB2ZXJ0aWNhbCBzY3JvbGxpbmcsIG90aGVyd2lzZSBmYWxzZVxuXHRcdCAqKiBgXCJzY3JvbGxQb3NcImAgPT4gdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uXG5cdFx0ICoqIGBcInNjcm9sbERpcmVjdGlvblwiYCA9PiB0aGUgbGFzdCBrbm93biBkaXJlY3Rpb24gb2YgdGhlIHNjcm9sbFxuXHRcdCAqKiBgXCJjb250YWluZXJcImAgPT4gdGhlIGNvbnRhaW5lciBlbGVtZW50XG5cdFx0ICoqIGBcImlzRG9jdW1lbnRcImAgPT4gdHJ1ZSBpZiBjb250YWluZXIgZWxlbWVudCBpcyB0aGUgZG9jdW1lbnQuXG5cdFx0ICogQHJldHVybnMgeyhtaXhlZHxvYmplY3QpfSBUaGUgcmVxdWVzdGVkIGluZm8ocykuXG5cdFx0ICovXG5cdFx0dGhpcy5pbmZvID0gZnVuY3Rpb24gKGFib3V0KSB7XG5cdFx0XHR2YXIgdmFsdWVzID0ge1xuXHRcdFx0XHRzaXplOiBfdmlld1BvcnRTaXplLFxuXHRcdFx0XHQvLyBjb250YWlucyBoZWlnaHQgb3Igd2lkdGggKGluIHJlZ2FyZCB0byBvcmllbnRhdGlvbik7XG5cdFx0XHRcdHZlcnRpY2FsOiBfb3B0aW9ucy52ZXJ0aWNhbCxcblx0XHRcdFx0c2Nyb2xsUG9zOiBfc2Nyb2xsUG9zLFxuXHRcdFx0XHRzY3JvbGxEaXJlY3Rpb246IF9zY3JvbGxEaXJlY3Rpb24sXG5cdFx0XHRcdGNvbnRhaW5lcjogX29wdGlvbnMuY29udGFpbmVyLFxuXHRcdFx0XHRpc0RvY3VtZW50OiBfaXNEb2N1bWVudFxuXHRcdFx0fTtcblx0XHRcdGlmICghYXJndW1lbnRzLmxlbmd0aCkgeyAvLyBnZXQgYWxsIGFzIGFuIG9iamVjdFxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fSBlbHNlIGlmICh2YWx1ZXNbYWJvdXRdICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlc1thYm91dF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2coMSwgXCJFUlJPUjogb3B0aW9uIFxcXCJcIiArIGFib3V0ICsgXCJcXFwiIGlzIG5vdCBhdmFpbGFibGVcIik7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogKipHZXQqKiBvciAqKlNldCoqIHRoZSBjdXJyZW50IGxvZ2xldmVsIG9wdGlvbiB2YWx1ZS5cblx0XHQgKiBAcHVibGljXG5cdFx0ICpcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIGdldCB0aGUgY3VycmVudCB2YWx1ZVxuXHRcdCAqIHZhciBsb2dsZXZlbCA9IGNvbnRyb2xsZXIubG9nbGV2ZWwoKTtcblx0XHQgKlxuXHRcdCAqIC8vIHNldCBhIG5ldyB2YWx1ZVxuXHRcdCAqIGNvbnRyb2xsZXIubG9nbGV2ZWwoMyk7XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gW25ld0xvZ2xldmVsXSAtIFRoZSBuZXcgbG9nbGV2ZWwgc2V0dGluZyBvZiB0aGUgQ29udHJvbGxlci4gYFswLTNdYFxuXHRcdCAqIEByZXR1cm5zIHsobnVtYmVyfENvbnRyb2xsZXIpfSBDdXJyZW50IGxvZ2xldmVsIG9yIHBhcmVudCBvYmplY3QgZm9yIGNoYWluaW5nLlxuXHRcdCAqL1xuXHRcdHRoaXMubG9nbGV2ZWwgPSBmdW5jdGlvbiAobmV3TG9nbGV2ZWwpIHtcblx0XHRcdGlmICghYXJndW1lbnRzLmxlbmd0aCkgeyAvLyBnZXRcblx0XHRcdFx0cmV0dXJuIF9vcHRpb25zLmxvZ2xldmVsO1xuXHRcdFx0fSBlbHNlIGlmIChfb3B0aW9ucy5sb2dsZXZlbCAhPSBuZXdMb2dsZXZlbCkgeyAvLyBzZXRcblx0XHRcdFx0X29wdGlvbnMubG9nbGV2ZWwgPSBuZXdMb2dsZXZlbDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBDb250cm9sbGVyO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiAqKkdldCoqIG9yICoqU2V0KiogdGhlIGN1cnJlbnQgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgY29udHJvbGxlci4gIFxuXHRcdCAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gZGlzYWJsZSBhbGwgU2NlbmVzIGNvbm5lY3RlZCB0byB0aGUgY29udHJvbGxlciB3aXRob3V0IGRlc3Ryb3lpbmcgb3IgcmVtb3ZpbmcgdGhlbS5cblx0XHQgKiBAcHVibGljXG5cdFx0ICpcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIGdldCB0aGUgY3VycmVudCB2YWx1ZVxuXHRcdCAqIHZhciBlbmFibGVkID0gY29udHJvbGxlci5lbmFibGVkKCk7XG5cdFx0ICpcblx0XHQgKiAvLyBkaXNhYmxlIHRoZSBjb250cm9sbGVyXG5cdFx0ICogY29udHJvbGxlci5lbmFibGVkKGZhbHNlKTtcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW25ld1N0YXRlXSAtIFRoZSBuZXcgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgY29udHJvbGxlciBgdHJ1ZWAgb3IgYGZhbHNlYC5cblx0XHQgKiBAcmV0dXJucyB7KGJvb2xlYW58Q29udHJvbGxlcil9IEN1cnJlbnQgZW5hYmxlZCBzdGF0ZSBvciBwYXJlbnQgb2JqZWN0IGZvciBjaGFpbmluZy5cblx0XHQgKi9cblx0XHR0aGlzLmVuYWJsZWQgPSBmdW5jdGlvbiAobmV3U3RhdGUpIHtcblx0XHRcdGlmICghYXJndW1lbnRzLmxlbmd0aCkgeyAvLyBnZXRcblx0XHRcdFx0cmV0dXJuIF9lbmFibGVkO1xuXHRcdFx0fSBlbHNlIGlmIChfZW5hYmxlZCAhPSBuZXdTdGF0ZSkgeyAvLyBzZXRcblx0XHRcdFx0X2VuYWJsZWQgPSAhISBuZXdTdGF0ZTtcblx0XHRcdFx0Q29udHJvbGxlci51cGRhdGVTY2VuZShfc2NlbmVPYmplY3RzLCB0cnVlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBDb250cm9sbGVyO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBEZXN0cm95IHRoZSBDb250cm9sbGVyLCBhbGwgU2NlbmVzIGFuZCBldmVyeXRoaW5nLlxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKlxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gd2l0aG91dCByZXNldHRpbmcgdGhlIHNjZW5lc1xuXHRcdCAqIGNvbnRyb2xsZXIgPSBjb250cm9sbGVyLmRlc3Ryb3koKTtcblx0XHQgKlxuXHRcdCAqIC8vIHdpdGggc2NlbmUgcmVzZXRcblx0XHQgKiBjb250cm9sbGVyID0gY29udHJvbGxlci5kZXN0cm95KHRydWUpO1xuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbcmVzZXRTY2VuZXM9ZmFsc2VdIC0gSWYgYHRydWVgIHRoZSBwaW5zIGFuZCB0d2VlbnMgKGlmIGV4aXN0ZW50KSBvZiBhbGwgc2NlbmVzIHdpbGwgYmUgcmVzZXQuXG5cdFx0ICogQHJldHVybnMge251bGx9IE51bGwgdG8gdW5zZXQgaGFuZGxlciB2YXJpYWJsZXMuXG5cdFx0ICovXG5cdFx0dGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKHJlc2V0U2NlbmVzKSB7XG5cdFx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KF9yZWZyZXNoVGltZW91dCk7XG5cdFx0XHR2YXIgaSA9IF9zY2VuZU9iamVjdHMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHRfc2NlbmVPYmplY3RzW2ldLmRlc3Ryb3kocmVzZXRTY2VuZXMpO1xuXHRcdFx0fVxuXHRcdFx0X29wdGlvbnMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgb25DaGFuZ2UpO1xuXHRcdFx0X29wdGlvbnMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25DaGFuZ2UpO1xuXHRcdFx0X3V0aWwuY0FGKF91cGRhdGVUaW1lb3V0KTtcblx0XHRcdGxvZygzLCBcImRlc3Ryb3llZCBcIiArIE5BTUVTUEFDRSArIFwiIChyZXNldDogXCIgKyAocmVzZXRTY2VuZXMgPyBcInRydWVcIiA6IFwiZmFsc2VcIikgKyBcIilcIik7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9O1xuXG5cdFx0Ly8gSU5JVFxuXHRcdGNvbnN0cnVjdCgpO1xuXHRcdHJldHVybiBDb250cm9sbGVyO1xuXHR9O1xuXG5cdC8vIHN0b3JlIHBhZ2V3aWRlIGNvbnRyb2xsZXIgb3B0aW9uc1xuXHR2YXIgQ09OVFJPTExFUl9PUFRJT05TID0ge1xuXHRcdGRlZmF1bHRzOiB7XG5cdFx0XHRjb250YWluZXI6IHdpbmRvdyxcblx0XHRcdHZlcnRpY2FsOiB0cnVlLFxuXHRcdFx0Z2xvYmFsU2NlbmVPcHRpb25zOiB7fSxcblx0XHRcdGxvZ2xldmVsOiAyLFxuXHRcdFx0cmVmcmVzaEludGVydmFsOiAxMDBcblx0XHR9XG5cdH07XG4vKlxuICogbWV0aG9kIHVzZWQgdG8gYWRkIGFuIG9wdGlvbiB0byBTY3JvbGxNYWdpYyBTY2VuZXMuXG4gKi9cblx0U2Nyb2xsTWFnaWMuQ29udHJvbGxlci5hZGRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSwgZGVmYXVsdFZhbHVlKSB7XG5cdFx0Q09OVFJPTExFUl9PUFRJT05TLmRlZmF1bHRzW25hbWVdID0gZGVmYXVsdFZhbHVlO1xuXHR9O1xuXHQvLyBpbnN0YW5jZSBleHRlbnNpb24gZnVuY3Rpb24gZm9yIHBsdWdpbnNcblx0U2Nyb2xsTWFnaWMuQ29udHJvbGxlci5leHRlbmQgPSBmdW5jdGlvbiAoZXh0ZW5zaW9uKSB7XG5cdFx0dmFyIG9sZENsYXNzID0gdGhpcztcblx0XHRTY3JvbGxNYWdpYy5Db250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0b2xkQ2xhc3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdHRoaXMuJHN1cGVyID0gX3V0aWwuZXh0ZW5kKHt9LCB0aGlzKTsgLy8gY29weSBwYXJlbnQgc3RhdGVcblx0XHRcdHJldHVybiBleHRlbnNpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuXHRcdH07XG5cdFx0X3V0aWwuZXh0ZW5kKFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIsIG9sZENsYXNzKTsgLy8gY29weSBwcm9wZXJ0aWVzXG5cdFx0U2Nyb2xsTWFnaWMuQ29udHJvbGxlci5wcm90b3R5cGUgPSBvbGRDbGFzcy5wcm90b3R5cGU7IC8vIGNvcHkgcHJvdG90eXBlXG5cdFx0U2Nyb2xsTWFnaWMuQ29udHJvbGxlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTY3JvbGxNYWdpYy5Db250cm9sbGVyOyAvLyByZXN0b3JlIGNvbnN0cnVjdG9yXG5cdH07XG5cblxuXHQvKipcblx0ICogQSBTY2VuZSBkZWZpbmVzIHdoZXJlIHRoZSBjb250cm9sbGVyIHNob3VsZCByZWFjdCBhbmQgaG93LlxuXHQgKlxuXHQgKiBAY2xhc3Ncblx0ICpcblx0ICogQGV4YW1wbGVcblx0ICogLy8gY3JlYXRlIGEgc3RhbmRhcmQgc2NlbmUgYW5kIGFkZCBpdCB0byBhIGNvbnRyb2xsZXJcblx0ICogbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKClcblx0ICpcdFx0LmFkZFRvKGNvbnRyb2xsZXIpO1xuXHQgKlxuXHQgKiAvLyBjcmVhdGUgYSBzY2VuZSB3aXRoIGN1c3RvbSBvcHRpb25zIGFuZCBhc3NpZ24gYSBoYW5kbGVyIHRvIGl0LlxuXHQgKiB2YXIgc2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xuXHQgKiBcdFx0ZHVyYXRpb246IDEwMCxcblx0ICpcdFx0b2Zmc2V0OiAyMDAsXG5cdCAqXHRcdHRyaWdnZXJIb29rOiBcIm9uRW50ZXJcIixcblx0ICpcdFx0cmV2ZXJzZTogZmFsc2Vcblx0ICogfSk7XG5cdCAqXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25zIGZvciB0aGUgU2NlbmUuIFRoZSBvcHRpb25zIGNhbiBiZSB1cGRhdGVkIGF0IGFueSB0aW1lLiAgXG5cdCBJbnN0ZWFkIG9mIHNldHRpbmcgdGhlIG9wdGlvbnMgZm9yIGVhY2ggc2NlbmUgaW5kaXZpZHVhbGx5IHlvdSBjYW4gYWxzbyBzZXQgdGhlbSBnbG9iYWxseSBpbiB0aGUgY29udHJvbGxlciBhcyB0aGUgY29udHJvbGxlcnMgYGdsb2JhbFNjZW5lT3B0aW9uc2Agb3B0aW9uLiBUaGUgb2JqZWN0IGFjY2VwdHMgdGhlIHNhbWUgcHJvcGVydGllcyBhcyB0aGUgb25lcyBiZWxvdy4gIFxuXHQgV2hlbiBhIHNjZW5lIGlzIGFkZGVkIHRvIHRoZSBjb250cm9sbGVyIHRoZSBvcHRpb25zIGRlZmluZWQgdXNpbmcgdGhlIFNjZW5lIGNvbnN0cnVjdG9yIHdpbGwgYmUgb3ZlcndyaXR0ZW4gYnkgdGhvc2Ugc2V0IGluIGBnbG9iYWxTY2VuZU9wdGlvbnNgLlxuXHQgKiBAcGFyYW0geyhudW1iZXJ8ZnVuY3Rpb24pfSBbb3B0aW9ucy5kdXJhdGlvbj0wXSAtIFRoZSBkdXJhdGlvbiBvZiB0aGUgc2NlbmUuIFxuXHQgSWYgYDBgIHR3ZWVucyB3aWxsIGF1dG8tcGxheSB3aGVuIHJlYWNoaW5nIHRoZSBzY2VuZSBzdGFydCBwb2ludCwgcGlucyB3aWxsIGJlIHBpbm5lZCBpbmRlZmluZXRseSBzdGFydGluZyBhdCB0aGUgc3RhcnQgcG9zaXRpb24uICBcblx0IEEgZnVuY3Rpb24gcmV0dW5pbmcgdGhlIGR1cmF0aW9uIHZhbHVlIGlzIGFsc28gc3VwcG9ydGVkLiBQbGVhc2Ugc2VlIGBTY2VuZS5kdXJhdGlvbigpYCBmb3IgZGV0YWlscy5cblx0ICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9mZnNldD0wXSAtIE9mZnNldCBWYWx1ZSBmb3IgdGhlIFRyaWdnZXIgUG9zaXRpb24uIElmIG5vIHRyaWdnZXJFbGVtZW50IGlzIGRlZmluZWQgdGhpcyB3aWxsIGJlIHRoZSBzY3JvbGwgZGlzdGFuY2UgZnJvbSB0aGUgc3RhcnQgb2YgdGhlIHBhZ2UsIGFmdGVyIHdoaWNoIHRoZSBzY2VuZSB3aWxsIHN0YXJ0LlxuXHQgKiBAcGFyYW0geyhzdHJpbmd8b2JqZWN0KX0gW29wdGlvbnMudHJpZ2dlckVsZW1lbnQ9bnVsbF0gLSBTZWxlY3RvciBvciBET00gb2JqZWN0IHRoYXQgZGVmaW5lcyB0aGUgc3RhcnQgb2YgdGhlIHNjZW5lLiBJZiB1bmRlZmluZWQgdGhlIHNjZW5lIHdpbGwgc3RhcnQgcmlnaHQgYXQgdGhlIHN0YXJ0IG9mIHRoZSBwYWdlICh1bmxlc3MgYW4gb2Zmc2V0IGlzIHNldCkuXG5cdCAqIEBwYXJhbSB7KG51bWJlcnxzdHJpbmcpfSBbb3B0aW9ucy50cmlnZ2VySG9vaz1cIm9uQ2VudGVyXCJdIC0gQ2FuIGJlIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMSBkZWZpbmluZyB0aGUgcG9zaXRpb24gb2YgdGhlIHRyaWdnZXIgSG9vayBpbiByZWxhdGlvbiB0byB0aGUgdmlld3BvcnQuICBcblx0IENhbiBhbHNvIGJlIGRlZmluZWQgdXNpbmcgYSBzdHJpbmc6XG5cdCAqKiBgXCJvbkVudGVyXCJgID0+IGAxYFxuXHQgKiogYFwib25DZW50ZXJcImAgPT4gYDAuNWBcblx0ICoqIGBcIm9uTGVhdmVcImAgPT4gYDBgXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmV2ZXJzZT10cnVlXSAtIFNob3VsZCB0aGUgc2NlbmUgcmV2ZXJzZSwgd2hlbiBzY3JvbGxpbmcgdXA/XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5sb2dsZXZlbD0yXSAtIExvZ2xldmVsIGZvciBkZWJ1Z2dpbmcuIE5vdGUgdGhhdCBsb2dnaW5nIGlzIGRpc2FibGVkIGluIHRoZSBtaW5pZmllZCB2ZXJzaW9uIG9mIFNjcm9sbE1hZ2ljLlxuXHQgKiogYDBgID0+IHNpbGVudFxuXHQgKiogYDFgID0+IGVycm9yc1xuXHQgKiogYDJgID0+IGVycm9ycywgd2FybmluZ3Ncblx0ICoqIGAzYCA9PiBlcnJvcnMsIHdhcm5pbmdzLCBkZWJ1Z2luZm9cblx0ICogXG5cdCAqL1xuXHRTY3JvbGxNYWdpYy5TY2VuZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbi8qXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICogc2V0dGluZ3Ncblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKi9cblxuXHRcdHZhclxuXHRcdE5BTUVTUEFDRSA9ICdTY3JvbGxNYWdpYy5TY2VuZScsXG5cdFx0XHRTQ0VORV9TVEFURV9CRUZPUkUgPSAnQkVGT1JFJyxcblx0XHRcdFNDRU5FX1NUQVRFX0RVUklORyA9ICdEVVJJTkcnLFxuXHRcdFx0U0NFTkVfU1RBVEVfQUZURVIgPSAnQUZURVInLFxuXHRcdFx0REVGQVVMVF9PUFRJT05TID0gU0NFTkVfT1BUSU9OUy5kZWZhdWx0cztcblxuLypcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKiBwcml2YXRlIHZhcnNcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKi9cblxuXHRcdHZhclxuXHRcdFNjZW5lID0gdGhpcyxcblx0XHRcdF9vcHRpb25zID0gX3V0aWwuZXh0ZW5kKHt9LCBERUZBVUxUX09QVElPTlMsIG9wdGlvbnMpLFxuXHRcdFx0X3N0YXRlID0gU0NFTkVfU1RBVEVfQkVGT1JFLFxuXHRcdFx0X3Byb2dyZXNzID0gMCxcblx0XHRcdF9zY3JvbGxPZmZzZXQgPSB7XG5cdFx0XHRcdHN0YXJ0OiAwLFxuXHRcdFx0XHRlbmQ6IDBcblx0XHRcdH0sXG5cdFx0XHQvLyByZWZsZWN0cyB0aGUgY29udHJvbGxlcnMncyBzY3JvbGwgcG9zaXRpb24gZm9yIHRoZSBzdGFydCBhbmQgZW5kIG9mIHRoZSBzY2VuZSByZXNwZWN0aXZlbHlcblx0XHRcdF90cmlnZ2VyUG9zID0gMCxcblx0XHRcdF9lbmFibGVkID0gdHJ1ZSxcblx0XHRcdF9kdXJhdGlvblVwZGF0ZU1ldGhvZCwgX2NvbnRyb2xsZXI7XG5cblx0XHQvKipcblx0XHQgKiBJbnRlcm5hbCBjb25zdHJ1Y3RvciBmdW5jdGlvbiBvZiB0aGUgU2Nyb2xsTWFnaWMgU2NlbmVcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBjb25zdHJ1Y3QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gX29wdGlvbnMpIHsgLy8gY2hlY2sgc3VwcGxpZWQgb3B0aW9uc1xuXHRcdFx0XHRpZiAoIURFRkFVTFRfT1BUSU9OUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0bG9nKDIsIFwiV0FSTklORzogVW5rbm93biBvcHRpb24gXFxcIlwiICsga2V5ICsgXCJcXFwiXCIpO1xuXHRcdFx0XHRcdGRlbGV0ZSBfb3B0aW9uc1trZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBhZGQgZ2V0dGVycy9zZXR0ZXJzIGZvciBhbGwgcG9zc2libGUgb3B0aW9uc1xuXHRcdFx0Zm9yICh2YXIgb3B0aW9uTmFtZSBpbiBERUZBVUxUX09QVElPTlMpIHtcblx0XHRcdFx0YWRkU2NlbmVPcHRpb24ob3B0aW9uTmFtZSk7XG5cdFx0XHR9XG5cdFx0XHQvLyB2YWxpZGF0ZSBhbGwgb3B0aW9uc1xuXHRcdFx0dmFsaWRhdGVPcHRpb24oKTtcblx0XHR9O1xuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRXZlbnQgTWFuYWdlbWVudFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cblx0XHR2YXIgX2xpc3RlbmVycyA9IHt9O1xuXHRcdC8qKlxuXHRcdCAqIFNjZW5lIHN0YXJ0IGV2ZW50LiAgXG5cdFx0ICogRmlyZXMgd2hlbmV2ZXIgdGhlIHNjcm9sbCBwb3NpdGlvbiBpdHMgdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBzY2VuZS4gIFxuXHRcdCAqIEl0IHdpbGwgYWxzbyBmaXJlIHdoZW4gc2Nyb2xsaW5nIGJhY2sgdXAgZ29pbmcgb3ZlciB0aGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHNjZW5lLiBJZiB5b3Ugd2FudCBzb21ldGhpbmcgdG8gaGFwcGVuIG9ubHkgd2hlbiBzY3JvbGxpbmcgZG93bi9yaWdodCwgdXNlIHRoZSBzY3JvbGxEaXJlY3Rpb24gcGFyYW1ldGVyIHBhc3NlZCB0byB0aGUgY2FsbGJhY2suXG5cdFx0ICpcblx0XHQgKiBGb3IgZGV0YWlscyBvbiB0aGlzIGV2ZW50IGFuZCB0aGUgb3JkZXIgaW4gd2hpY2ggaXQgaXMgZmlyZWQsIHBsZWFzZSByZXZpZXcgdGhlIHtAbGluayBTY2VuZS5wcm9ncmVzc30gbWV0aG9kLlxuXHRcdCAqXG5cdFx0ICogQGV2ZW50IFNjcm9sbE1hZ2ljLlNjZW5lI3N0YXJ0XG5cdFx0ICpcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIHNjZW5lLm9uKFwic3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0ICogXHRjb25zb2xlLmxvZyhcIkhpdCBzdGFydCBwb2ludCBvZiBzY2VuZS5cIik7XG5cdFx0ICogfSk7XG5cdFx0ICpcblx0XHQgKiBAcHJvcGVydHkge29iamVjdH0gZXZlbnQgLSBUaGUgZXZlbnQgT2JqZWN0IHBhc3NlZCB0byBlYWNoIGNhbGxiYWNrXG5cdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IGV2ZW50LnR5cGUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcblx0XHQgKiBAcHJvcGVydHkge1NjZW5lfSBldmVudC50YXJnZXQgLSBUaGUgU2NlbmUgb2JqZWN0IHRoYXQgdHJpZ2dlcmVkIHRoaXMgZXZlbnRcblx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gZXZlbnQucHJvZ3Jlc3MgLSBSZWZsZWN0cyB0aGUgY3VycmVudCBwcm9ncmVzcyBvZiB0aGUgc2NlbmVcblx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gZXZlbnQuc3RhdGUgLSBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgc2NlbmUgYFwiQkVGT1JFXCJgIG9yIGBcIkRVUklOR1wiYFxuXHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBldmVudC5zY3JvbGxEaXJlY3Rpb24gLSBJbmRpY2F0ZXMgd2hpY2ggd2F5IHdlIGFyZSBzY3JvbGxpbmcgYFwiUEFVU0VEXCJgLCBgXCJGT1JXQVJEXCJgIG9yIGBcIlJFVkVSU0VcImBcblx0XHQgKi9cblx0XHQvKipcblx0XHQgKiBTY2VuZSBlbmQgZXZlbnQuICBcblx0XHQgKiBGaXJlcyB3aGVuZXZlciB0aGUgc2Nyb2xsIHBvc2l0aW9uIGl0cyB0aGUgZW5kaW5nIHBvaW50IG9mIHRoZSBzY2VuZS4gIFxuXHRcdCAqIEl0IHdpbGwgYWxzbyBmaXJlIHdoZW4gc2Nyb2xsaW5nIGJhY2sgdXAgZnJvbSBhZnRlciB0aGUgc2NlbmUgYW5kIGdvaW5nIG92ZXIgaXRzIGVuZCBwb3NpdGlvbi4gSWYgeW91IHdhbnQgc29tZXRoaW5nIHRvIGhhcHBlbiBvbmx5IHdoZW4gc2Nyb2xsaW5nIGRvd24vcmlnaHQsIHVzZSB0aGUgc2Nyb2xsRGlyZWN0aW9uIHBhcmFtZXRlciBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrLlxuXHRcdCAqXG5cdFx0ICogRm9yIGRldGFpbHMgb24gdGhpcyBldmVudCBhbmQgdGhlIG9yZGVyIGluIHdoaWNoIGl0IGlzIGZpcmVkLCBwbGVhc2UgcmV2aWV3IHRoZSB7QGxpbmsgU2NlbmUucHJvZ3Jlc3N9IG1ldGhvZC5cblx0XHQgKlxuXHRcdCAqIEBldmVudCBTY3JvbGxNYWdpYy5TY2VuZSNlbmRcblx0XHQgKlxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogc2NlbmUub24oXCJlbmRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0ICogXHRjb25zb2xlLmxvZyhcIkhpdCBlbmQgcG9pbnQgb2Ygc2NlbmUuXCIpO1xuXHRcdCAqIH0pO1xuXHRcdCAqXG5cdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IGV2ZW50IC0gVGhlIGV2ZW50IE9iamVjdCBwYXNzZWQgdG8gZWFjaCBjYWxsYmFja1xuXHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBldmVudC50eXBlIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtTY2VuZX0gZXZlbnQudGFyZ2V0IC0gVGhlIFNjZW5lIG9iamVjdCB0aGF0IHRyaWdnZXJlZCB0aGlzIGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IGV2ZW50LnByb2dyZXNzIC0gUmVmbGVjdHMgdGhlIGN1cnJlbnQgcHJvZ3Jlc3Mgb2YgdGhlIHNjZW5lXG5cdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IGV2ZW50LnN0YXRlIC0gVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHNjZW5lIGBcIkRVUklOR1wiYCBvciBgXCJBRlRFUlwiYFxuXHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBldmVudC5zY3JvbGxEaXJlY3Rpb24gLSBJbmRpY2F0ZXMgd2hpY2ggd2F5IHdlIGFyZSBzY3JvbGxpbmcgYFwiUEFVU0VEXCJgLCBgXCJGT1JXQVJEXCJgIG9yIGBcIlJFVkVSU0VcImBcblx0XHQgKi9cblx0XHQvKipcblx0XHQgKiBTY2VuZSBlbnRlciBldmVudC4gIFxuXHRcdCAqIEZpcmVzIHdoZW5ldmVyIHRoZSBzY2VuZSBlbnRlcnMgdGhlIFwiRFVSSU5HXCIgc3RhdGUuICBcblx0XHQgKiBLZWVwIGluIG1pbmQgdGhhdCBpdCBkb2Vzbid0IG1hdHRlciBpZiB0aGUgc2NlbmUgcGxheXMgZm9yd2FyZCBvciBiYWNrd2FyZDogVGhpcyBldmVudCBhbHdheXMgZmlyZXMgd2hlbiB0aGUgc2NlbmUgZW50ZXJzIGl0cyBhY3RpdmUgc2Nyb2xsIHRpbWVmcmFtZSwgcmVnYXJkbGVzcyBvZiB0aGUgc2Nyb2xsLWRpcmVjdGlvbi5cblx0XHQgKlxuXHRcdCAqIEZvciBkZXRhaWxzIG9uIHRoaXMgZXZlbnQgYW5kIHRoZSBvcmRlciBpbiB3aGljaCBpdCBpcyBmaXJlZCwgcGxlYXNlIHJldmlldyB0aGUge0BsaW5rIFNjZW5lLnByb2dyZXNzfSBtZXRob2QuXG5cdFx0ICpcblx0XHQgKiBAZXZlbnQgU2Nyb2xsTWFnaWMuU2NlbmUjZW50ZXJcblx0XHQgKlxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogc2NlbmUub24oXCJlbnRlclwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHQgKiBcdGNvbnNvbGUubG9nKFwiU2NlbmUgZW50ZXJlZC5cIik7XG5cdFx0ICogfSk7XG5cdFx0ICpcblx0XHQgKiBAcHJvcGVydHkge29iamVjdH0gZXZlbnQgLSBUaGUgZXZlbnQgT2JqZWN0IHBhc3NlZCB0byBlYWNoIGNhbGxiYWNrXG5cdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IGV2ZW50LnR5cGUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcblx0XHQgKiBAcHJvcGVydHkge1NjZW5lfSBldmVudC50YXJnZXQgLSBUaGUgU2NlbmUgb2JqZWN0IHRoYXQgdHJpZ2dlcmVkIHRoaXMgZXZlbnRcblx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gZXZlbnQucHJvZ3Jlc3MgLSBSZWZsZWN0cyB0aGUgY3VycmVudCBwcm9ncmVzcyBvZiB0aGUgc2NlbmVcblx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gZXZlbnQuc3RhdGUgLSBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgc2NlbmUgLSBhbHdheXMgYFwiRFVSSU5HXCJgXG5cdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IGV2ZW50LnNjcm9sbERpcmVjdGlvbiAtIEluZGljYXRlcyB3aGljaCB3YXkgd2UgYXJlIHNjcm9sbGluZyBgXCJQQVVTRURcImAsIGBcIkZPUldBUkRcImAgb3IgYFwiUkVWRVJTRVwiYFxuXHRcdCAqL1xuXHRcdC8qKlxuXHRcdCAqIFNjZW5lIGxlYXZlIGV2ZW50LiAgXG5cdFx0ICogRmlyZXMgd2hlbmV2ZXIgdGhlIHNjZW5lJ3Mgc3RhdGUgZ29lcyBmcm9tIFwiRFVSSU5HXCIgdG8gZWl0aGVyIFwiQkVGT1JFXCIgb3IgXCJBRlRFUlwiLiAgXG5cdFx0ICogS2VlcCBpbiBtaW5kIHRoYXQgaXQgZG9lc24ndCBtYXR0ZXIgaWYgdGhlIHNjZW5lIHBsYXlzIGZvcndhcmQgb3IgYmFja3dhcmQ6IFRoaXMgZXZlbnQgYWx3YXlzIGZpcmVzIHdoZW4gdGhlIHNjZW5lIGxlYXZlcyBpdHMgYWN0aXZlIHNjcm9sbCB0aW1lZnJhbWUsIHJlZ2FyZGxlc3Mgb2YgdGhlIHNjcm9sbC1kaXJlY3Rpb24uXG5cdFx0ICpcblx0XHQgKiBGb3IgZGV0YWlscyBvbiB0aGlzIGV2ZW50IGFuZCB0aGUgb3JkZXIgaW4gd2hpY2ggaXQgaXMgZmlyZWQsIHBsZWFzZSByZXZpZXcgdGhlIHtAbGluayBTY2VuZS5wcm9ncmVzc30gbWV0aG9kLlxuXHRcdCAqXG5cdFx0ICogQGV2ZW50IFNjcm9sbE1hZ2ljLlNjZW5lI2xlYXZlXG5cdFx0ICpcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIHNjZW5lLm9uKFwibGVhdmVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0ICogXHRjb25zb2xlLmxvZyhcIlNjZW5lIGxlZnQuXCIpO1xuXHRcdCAqIH0pO1xuXHRcdCAqXG5cdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IGV2ZW50IC0gVGhlIGV2ZW50IE9iamVjdCBwYXNzZWQgdG8gZWFjaCBjYWxsYmFja1xuXHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBldmVudC50eXBlIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtTY2VuZX0gZXZlbnQudGFyZ2V0IC0gVGhlIFNjZW5lIG9iamVjdCB0aGF0IHRyaWdnZXJlZCB0aGlzIGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IGV2ZW50LnByb2dyZXNzIC0gUmVmbGVjdHMgdGhlIGN1cnJlbnQgcHJvZ3Jlc3Mgb2YgdGhlIHNjZW5lXG5cdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IGV2ZW50LnN0YXRlIC0gVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHNjZW5lIGBcIkJFRk9SRVwiYCBvciBgXCJBRlRFUlwiYFxuXHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBldmVudC5zY3JvbGxEaXJlY3Rpb24gLSBJbmRpY2F0ZXMgd2hpY2ggd2F5IHdlIGFyZSBzY3JvbGxpbmcgYFwiUEFVU0VEXCJgLCBgXCJGT1JXQVJEXCJgIG9yIGBcIlJFVkVSU0VcImBcblx0XHQgKi9cblx0XHQvKipcblx0XHQgKiBTY2VuZSB1cGRhdGUgZXZlbnQuICBcblx0XHQgKiBGaXJlcyB3aGVuZXZlciB0aGUgc2NlbmUgaXMgdXBkYXRlZCAoYnV0IG5vdCBuZWNlc3NhcmlseSBjaGFuZ2VzIHRoZSBwcm9ncmVzcykuXG5cdFx0ICpcblx0XHQgKiBAZXZlbnQgU2Nyb2xsTWFnaWMuU2NlbmUjdXBkYXRlXG5cdFx0ICpcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIHNjZW5lLm9uKFwidXBkYXRlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdCAqIFx0Y29uc29sZS5sb2coXCJTY2VuZSB1cGRhdGVkLlwiKTtcblx0XHQgKiB9KTtcblx0XHQgKlxuXHRcdCAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBldmVudCAtIFRoZSBldmVudCBPYmplY3QgcGFzc2VkIHRvIGVhY2ggY2FsbGJhY2tcblx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gZXZlbnQudHlwZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuXHRcdCAqIEBwcm9wZXJ0eSB7U2NlbmV9IGV2ZW50LnRhcmdldCAtIFRoZSBTY2VuZSBvYmplY3QgdGhhdCB0cmlnZ2VyZWQgdGhpcyBldmVudFxuXHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBldmVudC5zdGFydFBvcyAtIFRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgc2NlbmUgKGluIHJlbGF0aW9uIHRvIHRoZSBjb25haW5lcilcblx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gZXZlbnQuZW5kUG9zIC0gVGhlIGVuZGluZyBwb3NpdGlvbiBvZiB0aGUgc2NlbmUgKGluIHJlbGF0aW9uIHRvIHRoZSBjb25haW5lcilcblx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gZXZlbnQuc2Nyb2xsUG9zIC0gVGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSBjb250YWluZXJcblx0XHQgKi9cblx0XHQvKipcblx0XHQgKiBTY2VuZSBwcm9ncmVzcyBldmVudC4gIFxuXHRcdCAqIEZpcmVzIHdoZW5ldmVyIHRoZSBwcm9ncmVzcyBvZiB0aGUgc2NlbmUgY2hhbmdlcy5cblx0XHQgKlxuXHRcdCAqIEZvciBkZXRhaWxzIG9uIHRoaXMgZXZlbnQgYW5kIHRoZSBvcmRlciBpbiB3aGljaCBpdCBpcyBmaXJlZCwgcGxlYXNlIHJldmlldyB0aGUge0BsaW5rIFNjZW5lLnByb2dyZXNzfSBtZXRob2QuXG5cdFx0ICpcblx0XHQgKiBAZXZlbnQgU2Nyb2xsTWFnaWMuU2NlbmUjcHJvZ3Jlc3Ncblx0XHQgKlxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogc2NlbmUub24oXCJwcm9ncmVzc1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHQgKiBcdGNvbnNvbGUubG9nKFwiU2NlbmUgcHJvZ3Jlc3MgY2hhbmdlZCB0byBcIiArIGV2ZW50LnByb2dyZXNzKTtcblx0XHQgKiB9KTtcblx0XHQgKlxuXHRcdCAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBldmVudCAtIFRoZSBldmVudCBPYmplY3QgcGFzc2VkIHRvIGVhY2ggY2FsbGJhY2tcblx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gZXZlbnQudHlwZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuXHRcdCAqIEBwcm9wZXJ0eSB7U2NlbmV9IGV2ZW50LnRhcmdldCAtIFRoZSBTY2VuZSBvYmplY3QgdGhhdCB0cmlnZ2VyZWQgdGhpcyBldmVudFxuXHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBldmVudC5wcm9ncmVzcyAtIFJlZmxlY3RzIHRoZSBjdXJyZW50IHByb2dyZXNzIG9mIHRoZSBzY2VuZVxuXHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBldmVudC5zdGF0ZSAtIFRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBzY2VuZSBgXCJCRUZPUkVcImAsIGBcIkRVUklOR1wiYCBvciBgXCJBRlRFUlwiYFxuXHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBldmVudC5zY3JvbGxEaXJlY3Rpb24gLSBJbmRpY2F0ZXMgd2hpY2ggd2F5IHdlIGFyZSBzY3JvbGxpbmcgYFwiUEFVU0VEXCJgLCBgXCJGT1JXQVJEXCJgIG9yIGBcIlJFVkVSU0VcImBcblx0XHQgKi9cblx0XHQvKipcblx0XHQgKiBTY2VuZSBjaGFuZ2UgZXZlbnQuICBcblx0XHQgKiBGaXJlcyB3aGVudmV2ZXIgYSBwcm9wZXJ0eSBvZiB0aGUgc2NlbmUgaXMgY2hhbmdlZC5cblx0XHQgKlxuXHRcdCAqIEBldmVudCBTY3JvbGxNYWdpYy5TY2VuZSNjaGFuZ2Vcblx0XHQgKlxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogc2NlbmUub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0ICogXHRjb25zb2xlLmxvZyhcIlNjZW5lIFByb3BlcnR5IFxcXCJcIiArIGV2ZW50LndoYXQgKyBcIlxcXCIgY2hhbmdlZCB0byBcIiArIGV2ZW50Lm5ld3ZhbCk7XG5cdFx0ICogfSk7XG5cdFx0ICpcblx0XHQgKiBAcHJvcGVydHkge29iamVjdH0gZXZlbnQgLSBUaGUgZXZlbnQgT2JqZWN0IHBhc3NlZCB0byBlYWNoIGNhbGxiYWNrXG5cdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IGV2ZW50LnR5cGUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcblx0XHQgKiBAcHJvcGVydHkge1NjZW5lfSBldmVudC50YXJnZXQgLSBUaGUgU2NlbmUgb2JqZWN0IHRoYXQgdHJpZ2dlcmVkIHRoaXMgZXZlbnRcblx0XHQgKiBAcHJvcGVydHkge3N0cmluZ30gZXZlbnQud2hhdCAtIEluZGljYXRlcyB3aGF0IHZhbHVlIGhhcyBiZWVuIGNoYW5nZWRcblx0XHQgKiBAcHJvcGVydHkge21peGVkfSBldmVudC5uZXd2YWwgLSBUaGUgbmV3IHZhbHVlIG9mIHRoZSBjaGFuZ2VkIHByb3BlcnR5XG5cdFx0ICovXG5cdFx0LyoqXG5cdFx0ICogU2NlbmUgc2hpZnQgZXZlbnQuICBcblx0XHQgKiBGaXJlcyB3aGVudmV2ZXIgdGhlIHN0YXJ0IG9yIGVuZCAqKnNjcm9sbCBvZmZzZXQqKiBvZiB0aGUgc2NlbmUgY2hhbmdlLlxuXHRcdCAqIFRoaXMgaGFwcGVucyBleHBsaWNpdGVseSwgd2hlbiBvbmUgb2YgdGhlc2UgdmFsdWVzIGNoYW5nZTogYG9mZnNldGAsIGBkdXJhdGlvbmAgb3IgYHRyaWdnZXJIb29rYC5cblx0XHQgKiBJdCB3aWxsIGZpcmUgaW1wbGljaXRseSB3aGVuIHRoZSBgdHJpZ2dlckVsZW1lbnRgIGNoYW5nZXMsIGlmIHRoZSBuZXcgZWxlbWVudCBoYXMgYSBkaWZmZXJlbnQgcG9zaXRpb24gKG1vc3QgY2FzZXMpLlxuXHRcdCAqIEl0IHdpbGwgYWxzbyBmaXJlIGltcGxpY2l0bHkgd2hlbiB0aGUgc2l6ZSBvZiB0aGUgY29udGFpbmVyIGNoYW5nZXMgYW5kIHRoZSB0cmlnZ2VySG9vayBpcyBhbnl0aGluZyBvdGhlciB0aGFuIGBvbkxlYXZlYC5cblx0XHQgKlxuXHRcdCAqIEBldmVudCBTY3JvbGxNYWdpYy5TY2VuZSNzaGlmdFxuXHRcdCAqIEBzaW5jZSAxLjEuMFxuXHRcdCAqXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiBzY2VuZS5vbihcInNoaWZ0XCIsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdCAqIFx0Y29uc29sZS5sb2coXCJTY2VuZSBtb3ZlZCwgYmVjYXVzZSB0aGUgXCIgKyBldmVudC5yZWFzb24gKyBcIiBoYXMgY2hhbmdlZC4pXCIpO1xuXHRcdCAqIH0pO1xuXHRcdCAqXG5cdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IGV2ZW50IC0gVGhlIGV2ZW50IE9iamVjdCBwYXNzZWQgdG8gZWFjaCBjYWxsYmFja1xuXHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBldmVudC50eXBlIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtTY2VuZX0gZXZlbnQudGFyZ2V0IC0gVGhlIFNjZW5lIG9iamVjdCB0aGF0IHRyaWdnZXJlZCB0aGlzIGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IGV2ZW50LnJlYXNvbiAtIEluZGljYXRlcyB3aHkgdGhlIHNjZW5lIGhhcyBzaGlmdGVkXG5cdFx0ICovXG5cdFx0LyoqXG5cdFx0ICogU2NlbmUgZGVzdHJveSBldmVudC4gIFxuXHRcdCAqIEZpcmVzIHdoZW52ZXZlciB0aGUgc2NlbmUgaXMgZGVzdHJveWVkLlxuXHRcdCAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gdGlkeSB1cCBjdXN0b20gYmVoYXZpb3VyIHVzZWQgaW4gZXZlbnRzLlxuXHRcdCAqXG5cdFx0ICogQGV2ZW50IFNjcm9sbE1hZ2ljLlNjZW5lI2Rlc3Ryb3lcblx0XHQgKiBAc2luY2UgMS4xLjBcblx0XHQgKlxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogc2NlbmUub24oXCJlbnRlclwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHQgKiAgICAgICAgLy8gYWRkIGN1c3RvbSBhY3Rpb25cblx0XHQgKiAgICAgICAgJChcIiNteS1lbGVtXCIpLmxlZnQoXCIyMDBcIik7XG5cdFx0ICogICAgICB9KVxuXHRcdCAqICAgICAgLm9uKFwiZGVzdHJveVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHQgKiAgICAgICAgLy8gcmVzZXQgbXkgZWxlbWVudCB0byBzdGFydCBwb3NpdGlvblxuXHRcdCAqICAgICAgICBpZiAoZXZlbnQucmVzZXQpIHtcblx0XHQgKiAgICAgICAgICAkKFwiI215LWVsZW1cIikubGVmdChcIjBcIik7XG5cdFx0ICogICAgICAgIH1cblx0XHQgKiAgICAgIH0pO1xuXHRcdCAqXG5cdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IGV2ZW50IC0gVGhlIGV2ZW50IE9iamVjdCBwYXNzZWQgdG8gZWFjaCBjYWxsYmFja1xuXHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBldmVudC50eXBlIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtTY2VuZX0gZXZlbnQudGFyZ2V0IC0gVGhlIFNjZW5lIG9iamVjdCB0aGF0IHRyaWdnZXJlZCB0aGlzIGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtib29sZWFufSBldmVudC5yZXNldCAtIEluZGljYXRlcyBpZiB0aGUgZGVzdHJveSBtZXRob2Qgd2FzIGNhbGxlZCB3aXRoIHJlc2V0IGB0cnVlYCBvciBgZmFsc2VgLlxuXHRcdCAqL1xuXHRcdC8qKlxuXHRcdCAqIFNjZW5lIGFkZCBldmVudC4gIFxuXHRcdCAqIEZpcmVzIHdoZW4gdGhlIHNjZW5lIGlzIGFkZGVkIHRvIGEgY29udHJvbGxlci5cblx0XHQgKiBUaGlzIGlzIG1vc3RseSB1c2VkIGJ5IHBsdWdpbnMgdG8ga25vdyB0aGF0IGNoYW5nZSBtaWdodCBiZSBkdWUuXG5cdFx0ICpcblx0XHQgKiBAZXZlbnQgU2Nyb2xsTWFnaWMuU2NlbmUjYWRkXG5cdFx0ICogQHNpbmNlIDIuMC4wXG5cdFx0ICpcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIHNjZW5lLm9uKFwiYWRkXCIsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdCAqIFx0Y29uc29sZS5sb2coJ1NjZW5lIHdhcyBhZGRlZCB0byBhIG5ldyBjb250cm9sbGVyLicpO1xuXHRcdCAqIH0pO1xuXHRcdCAqXG5cdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IGV2ZW50IC0gVGhlIGV2ZW50IE9iamVjdCBwYXNzZWQgdG8gZWFjaCBjYWxsYmFja1xuXHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBldmVudC50eXBlIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtTY2VuZX0gZXZlbnQudGFyZ2V0IC0gVGhlIFNjZW5lIG9iamVjdCB0aGF0IHRyaWdnZXJlZCB0aGlzIGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtib29sZWFufSBldmVudC5jb250cm9sbGVyIC0gVGhlIGNvbnRyb2xsZXIgb2JqZWN0IHRoZSBzY2VuZSB3YXMgYWRkZWQgdG8uXG5cdFx0ICovXG5cdFx0LyoqXG5cdFx0ICogU2NlbmUgcmVtb3ZlIGV2ZW50LiAgXG5cdFx0ICogRmlyZXMgd2hlbiB0aGUgc2NlbmUgaXMgcmVtb3ZlZCBmcm9tIGEgY29udHJvbGxlci5cblx0XHQgKiBUaGlzIGlzIG1vc3RseSB1c2VkIGJ5IHBsdWdpbnMgdG8ga25vdyB0aGF0IGNoYW5nZSBtaWdodCBiZSBkdWUuXG5cdFx0ICpcblx0XHQgKiBAZXZlbnQgU2Nyb2xsTWFnaWMuU2NlbmUjcmVtb3ZlXG5cdFx0ICogQHNpbmNlIDIuMC4wXG5cdFx0ICpcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIHNjZW5lLm9uKFwicmVtb3ZlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdCAqIFx0Y29uc29sZS5sb2coJ1NjZW5lIHdhcyByZW1vdmVkIGZyb20gaXRzIGNvbnRyb2xsZXIuJyk7XG5cdFx0ICogfSk7XG5cdFx0ICpcblx0XHQgKiBAcHJvcGVydHkge29iamVjdH0gZXZlbnQgLSBUaGUgZXZlbnQgT2JqZWN0IHBhc3NlZCB0byBlYWNoIGNhbGxiYWNrXG5cdFx0ICogQHByb3BlcnR5IHtzdHJpbmd9IGV2ZW50LnR5cGUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcblx0XHQgKiBAcHJvcGVydHkge1NjZW5lfSBldmVudC50YXJnZXQgLSBUaGUgU2NlbmUgb2JqZWN0IHRoYXQgdHJpZ2dlcmVkIHRoaXMgZXZlbnRcblx0XHQgKi9cblxuXHRcdC8qKlxuXHRcdCAqIEFkZCBvbmUgb3JlIG1vcmUgZXZlbnQgbGlzdGVuZXIuICBcblx0XHQgKiBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2lsbCBiZSBmaXJlZCBhdCB0aGUgcmVzcGVjdGl2ZSBldmVudCwgYW5kIGFuIG9iamVjdCBjb250YWluaW5nIHJlbGV2YW50IGRhdGEgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrLlxuXHRcdCAqIEBtZXRob2QgU2Nyb2xsTWFnaWMuU2NlbmUjb25cblx0XHQgKlxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogZnVuY3Rpb24gY2FsbGJhY2sgKGV2ZW50KSB7XG5cdFx0ICogXHRcdGNvbnNvbGUubG9nKFwiRXZlbnQgZmlyZWQhIChcIiArIGV2ZW50LnR5cGUgKyBcIilcIik7XG5cdFx0ICogfVxuXHRcdCAqIC8vIGFkZCBsaXN0ZW5lcnNcblx0XHQgKiBzY2VuZS5vbihcImNoYW5nZSB1cGRhdGUgcHJvZ3Jlc3Mgc3RhcnQgZW5kIGVudGVyIGxlYXZlXCIsIGNhbGxiYWNrKTtcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lcyAtIFRoZSBuYW1lIG9yIG5hbWVzIG9mIHRoZSBldmVudCB0aGUgY2FsbGJhY2sgc2hvdWxkIGJlIGF0dGFjaGVkIHRvLlxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gQSBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCwgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC4gQW4gZXZlbnQgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBjYWxsYmFjay5cblx0XHQgKiBAcmV0dXJucyB7U2NlbmV9IFBhcmVudCBvYmplY3QgZm9yIGNoYWluaW5nLlxuXHRcdCAqL1xuXHRcdHRoaXMub24gPSBmdW5jdGlvbiAobmFtZXMsIGNhbGxiYWNrKSB7XG5cdFx0XHRpZiAoX3V0aWwudHlwZS5GdW5jdGlvbihjYWxsYmFjaykpIHtcblx0XHRcdFx0bmFtZXMgPSBuYW1lcy50cmltKCkuc3BsaXQoJyAnKTtcblx0XHRcdFx0bmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoZnVsbG5hbWUpIHtcblx0XHRcdFx0XHR2YXJcblx0XHRcdFx0XHRuYW1lcGFydHMgPSBmdWxsbmFtZS5zcGxpdCgnLicpLFxuXHRcdFx0XHRcdFx0ZXZlbnRuYW1lID0gbmFtZXBhcnRzWzBdLFxuXHRcdFx0XHRcdFx0bmFtZXNwYWNlID0gbmFtZXBhcnRzWzFdO1xuXHRcdFx0XHRcdGlmIChldmVudG5hbWUgIT0gXCIqXCIpIHsgLy8gZGlzYWxsb3cgd2lsZGNhcmRzXG5cdFx0XHRcdFx0XHRpZiAoIV9saXN0ZW5lcnNbZXZlbnRuYW1lXSkge1xuXHRcdFx0XHRcdFx0XHRfbGlzdGVuZXJzW2V2ZW50bmFtZV0gPSBbXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF9saXN0ZW5lcnNbZXZlbnRuYW1lXS5wdXNoKHtcblx0XHRcdFx0XHRcdFx0bmFtZXNwYWNlOiBuYW1lc3BhY2UgfHwgJycsXG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFja1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxvZygxLCBcIkVSUk9SIHdoZW4gY2FsbGluZyAnLm9uKCknOiBTdXBwbGllZCBjYWxsYmFjayBmb3IgJ1wiICsgbmFtZXMgKyBcIicgaXMgbm90IGEgdmFsaWQgZnVuY3Rpb24hXCIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFNjZW5lO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZW1vdmUgb25lIG9yIG1vcmUgZXZlbnQgbGlzdGVuZXIuXG5cdFx0ICogQG1ldGhvZCBTY3JvbGxNYWdpYy5TY2VuZSNvZmZcblx0XHQgKlxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogZnVuY3Rpb24gY2FsbGJhY2sgKGV2ZW50KSB7XG5cdFx0ICogXHRcdGNvbnNvbGUubG9nKFwiRXZlbnQgZmlyZWQhIChcIiArIGV2ZW50LnR5cGUgKyBcIilcIik7XG5cdFx0ICogfVxuXHRcdCAqIC8vIGFkZCBsaXN0ZW5lcnNcblx0XHQgKiBzY2VuZS5vbihcImNoYW5nZSB1cGRhdGVcIiwgY2FsbGJhY2spO1xuXHRcdCAqIC8vIHJlbW92ZSBsaXN0ZW5lcnNcblx0XHQgKiBzY2VuZS5vZmYoXCJjaGFuZ2UgdXBkYXRlXCIsIGNhbGxiYWNrKTtcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lcyAtIFRoZSBuYW1lIG9yIG5hbWVzIG9mIHRoZSBldmVudCB0aGF0IHNob3VsZCBiZSByZW1vdmVkLlxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja10gLSBBIHNwZWNpZmljIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIHJlbW92ZWQuIElmIG5vbmUgaXMgcGFzc2VkIGFsbCBjYWxsYmFja3MgdG8gdGhlIGV2ZW50IGxpc3RlbmVyIHdpbGwgYmUgcmVtb3ZlZC5cblx0XHQgKiBAcmV0dXJucyB7U2NlbmV9IFBhcmVudCBvYmplY3QgZm9yIGNoYWluaW5nLlxuXHRcdCAqL1xuXHRcdHRoaXMub2ZmID0gZnVuY3Rpb24gKG5hbWVzLCBjYWxsYmFjaykge1xuXHRcdFx0aWYgKCFuYW1lcykge1xuXHRcdFx0XHRsb2coMSwgXCJFUlJPUjogSW52YWxpZCBldmVudCBuYW1lIHN1cHBsaWVkLlwiKTtcblx0XHRcdFx0cmV0dXJuIFNjZW5lO1xuXHRcdFx0fVxuXHRcdFx0bmFtZXMgPSBuYW1lcy50cmltKCkuc3BsaXQoJyAnKTtcblx0XHRcdG5hbWVzLmZvckVhY2goZnVuY3Rpb24gKGZ1bGxuYW1lLCBrZXkpIHtcblx0XHRcdFx0dmFyXG5cdFx0XHRcdG5hbWVwYXJ0cyA9IGZ1bGxuYW1lLnNwbGl0KCcuJyksXG5cdFx0XHRcdFx0ZXZlbnRuYW1lID0gbmFtZXBhcnRzWzBdLFxuXHRcdFx0XHRcdG5hbWVzcGFjZSA9IG5hbWVwYXJ0c1sxXSB8fCAnJyxcblx0XHRcdFx0XHRyZW1vdmVMaXN0ID0gZXZlbnRuYW1lID09PSAnKicgPyBPYmplY3Qua2V5cyhfbGlzdGVuZXJzKSA6IFtldmVudG5hbWVdO1xuXHRcdFx0XHRyZW1vdmVMaXN0LmZvckVhY2goZnVuY3Rpb24gKHJlbW92ZSkge1xuXHRcdFx0XHRcdHZhclxuXHRcdFx0XHRcdGxpc3QgPSBfbGlzdGVuZXJzW3JlbW92ZV0gfHwgW10sXG5cdFx0XHRcdFx0XHRpID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHRcdFx0dmFyIGxpc3RlbmVyID0gbGlzdFtpXTtcblx0XHRcdFx0XHRcdGlmIChsaXN0ZW5lciAmJiAobmFtZXNwYWNlID09PSBsaXN0ZW5lci5uYW1lc3BhY2UgfHwgbmFtZXNwYWNlID09PSAnKicpICYmICghY2FsbGJhY2sgfHwgY2FsbGJhY2sgPT0gbGlzdGVuZXIuY2FsbGJhY2spKSB7XG5cdFx0XHRcdFx0XHRcdGxpc3Quc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIWxpc3QubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRkZWxldGUgX2xpc3RlbmVyc1tyZW1vdmVdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBTY2VuZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVHJpZ2dlciBhbiBldmVudC5cblx0XHQgKiBAbWV0aG9kIFNjcm9sbE1hZ2ljLlNjZW5lI3RyaWdnZXJcblx0XHQgKlxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogdGhpcy50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdGhhdCBzaG91bGQgYmUgdHJpZ2dlcmVkLlxuXHRcdCAqIEBwYXJhbSB7b2JqZWN0fSBbdmFyc10gLSBBbiBvYmplY3QgY29udGFpbmluZyBpbmZvIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCB0byB0aGUgY2FsbGJhY2suXG5cdFx0ICogQHJldHVybnMge1NjZW5lfSBQYXJlbnQgb2JqZWN0IGZvciBjaGFpbmluZy5cblx0XHQgKi9cblx0XHR0aGlzLnRyaWdnZXIgPSBmdW5jdGlvbiAobmFtZSwgdmFycykge1xuXHRcdFx0aWYgKG5hbWUpIHtcblx0XHRcdFx0dmFyXG5cdFx0XHRcdG5hbWVwYXJ0cyA9IG5hbWUudHJpbSgpLnNwbGl0KCcuJyksXG5cdFx0XHRcdFx0ZXZlbnRuYW1lID0gbmFtZXBhcnRzWzBdLFxuXHRcdFx0XHRcdG5hbWVzcGFjZSA9IG5hbWVwYXJ0c1sxXSxcblx0XHRcdFx0XHRsaXN0ZW5lcnMgPSBfbGlzdGVuZXJzW2V2ZW50bmFtZV07XG5cdFx0XHRcdGxvZygzLCAnZXZlbnQgZmlyZWQ6JywgZXZlbnRuYW1lLCB2YXJzID8gXCItPlwiIDogJycsIHZhcnMgfHwgJycpO1xuXHRcdFx0XHRpZiAobGlzdGVuZXJzKSB7XG5cdFx0XHRcdFx0bGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyLCBrZXkpIHtcblx0XHRcdFx0XHRcdGlmICghbmFtZXNwYWNlIHx8IG5hbWVzcGFjZSA9PT0gbGlzdGVuZXIubmFtZXNwYWNlKSB7XG5cdFx0XHRcdFx0XHRcdGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwoU2NlbmUsIG5ldyBTY3JvbGxNYWdpYy5FdmVudChldmVudG5hbWUsIGxpc3RlbmVyLm5hbWVzcGFjZSwgU2NlbmUsIHZhcnMpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bG9nKDEsIFwiRVJST1I6IEludmFsaWQgZXZlbnQgbmFtZSBzdXBwbGllZC5cIik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gU2NlbmU7XG5cdFx0fTtcblxuXHRcdC8vIHNldCBldmVudCBsaXN0ZW5lcnNcblx0XHRTY2VuZS5vbihcImNoYW5nZS5pbnRlcm5hbFwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0aWYgKGUud2hhdCAhPT0gXCJsb2dsZXZlbFwiICYmIGUud2hhdCAhPT0gXCJ0d2VlbkNoYW5nZXNcIikgeyAvLyBubyBuZWVkIGZvciBhIHNjZW5lIHVwZGF0ZSBzY2VuZSB3aXRoIHRoZXNlIG9wdGlvbnMuLi5cblx0XHRcdFx0aWYgKGUud2hhdCA9PT0gXCJ0cmlnZ2VyRWxlbWVudFwiKSB7XG5cdFx0XHRcdFx0dXBkYXRlVHJpZ2dlckVsZW1lbnRQb3NpdGlvbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGUud2hhdCA9PT0gXCJyZXZlcnNlXCIpIHsgLy8gdGhlIG9ubHkgcHJvcGVydHkgbGVmdCB0aGF0IG1heSBoYXZlIGFuIGltcGFjdCBvbiB0aGUgY3VycmVudCBzY2VuZSBzdGF0ZS4gRXZlcnl0aGluZyBlbHNlIGlzIGhhbmRsZWQgYnkgdGhlIHNoaWZ0IGV2ZW50LlxuXHRcdFx0XHRcdFNjZW5lLnVwZGF0ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkub24oXCJzaGlmdC5pbnRlcm5hbFwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dXBkYXRlU2Nyb2xsT2Zmc2V0KCk7XG5cdFx0XHRTY2VuZS51cGRhdGUoKTsgLy8gdXBkYXRlIHNjZW5lIHRvIHJlZmxlY3QgbmV3IHBvc2l0aW9uXG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKiBTZW5kIGEgZGVidWcgbWVzc2FnZSB0byB0aGUgY29uc29sZS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIGJ1dCBwcm92aWRlZCBwdWJsaWNseSB3aXRoIF9sb2cgZm9yIHBsdWdpbnNcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBsb2dsZXZlbCAtIFRoZSBsb2dsZXZlbCByZXF1aXJlZCB0byBpbml0aWF0ZSBvdXRwdXQgZm9yIHRoZSBtZXNzYWdlLlxuXHRcdCAqIEBwYXJhbSB7Li4ubWl4ZWR9IG91dHB1dCAtIE9uZSBvciBtb3JlIHZhcmlhYmxlcyB0aGF0IHNob3VsZCBiZSBwYXNzZWQgdG8gdGhlIGNvbnNvbGUuXG5cdFx0ICovXG5cdFx0dmFyIGxvZyA9IHRoaXMuX2xvZyA9IGZ1bmN0aW9uIChsb2dsZXZlbCwgb3V0cHV0KSB7XG5cdFx0XHRpZiAoX29wdGlvbnMubG9nbGV2ZWwgPj0gbG9nbGV2ZWwpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLnNwbGljZS5jYWxsKGFyZ3VtZW50cywgMSwgMCwgXCIoXCIgKyBOQU1FU1BBQ0UgKyBcIikgLT5cIik7XG5cdFx0XHRcdF91dGlsLmxvZy5hcHBseSh3aW5kb3csIGFyZ3VtZW50cyk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEFkZCB0aGUgc2NlbmUgdG8gYSBjb250cm9sbGVyLiAgXG5cdFx0ICogVGhpcyBpcyB0aGUgZXF1aXZhbGVudCB0byBgQ29udHJvbGxlci5hZGRTY2VuZShzY2VuZSlgLlxuXHRcdCAqIEBtZXRob2QgU2Nyb2xsTWFnaWMuU2NlbmUjYWRkVG9cblx0XHQgKlxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gYWRkIGEgc2NlbmUgdG8gYSBTY3JvbGxNYWdpYyBDb250cm9sbGVyXG5cdFx0ICogc2NlbmUuYWRkVG8oY29udHJvbGxlcik7XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1Njcm9sbE1hZ2ljLkNvbnRyb2xsZXJ9IGNvbnRyb2xsZXIgLSBUaGUgY29udHJvbGxlciB0byB3aGljaCB0aGUgc2NlbmUgc2hvdWxkIGJlIGFkZGVkLlxuXHRcdCAqIEByZXR1cm5zIHtTY2VuZX0gUGFyZW50IG9iamVjdCBmb3IgY2hhaW5pbmcuXG5cdFx0ICovXG5cdFx0dGhpcy5hZGRUbyA9IGZ1bmN0aW9uIChjb250cm9sbGVyKSB7XG5cdFx0XHRpZiAoIShjb250cm9sbGVyIGluc3RhbmNlb2YgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcikpIHtcblx0XHRcdFx0bG9nKDEsIFwiRVJST1I6IHN1cHBsaWVkIGFyZ3VtZW50IG9mICdhZGRUbygpJyBpcyBub3QgYSB2YWxpZCBTY3JvbGxNYWdpYyBDb250cm9sbGVyXCIpO1xuXHRcdFx0fSBlbHNlIGlmIChfY29udHJvbGxlciAhPSBjb250cm9sbGVyKSB7XG5cdFx0XHRcdC8vIG5ldyBjb250cm9sbGVyXG5cdFx0XHRcdGlmIChfY29udHJvbGxlcikgeyAvLyB3YXMgYXNzb2NpYXRlZCB0byBhIGRpZmZlcmVudCBjb250cm9sbGVyIGJlZm9yZSwgc28gcmVtb3ZlIGl0Li4uXG5cdFx0XHRcdFx0X2NvbnRyb2xsZXIucmVtb3ZlU2NlbmUoU2NlbmUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF9jb250cm9sbGVyID0gY29udHJvbGxlcjtcblx0XHRcdFx0dmFsaWRhdGVPcHRpb24oKTtcblx0XHRcdFx0dXBkYXRlRHVyYXRpb24odHJ1ZSk7XG5cdFx0XHRcdHVwZGF0ZVRyaWdnZXJFbGVtZW50UG9zaXRpb24odHJ1ZSk7XG5cdFx0XHRcdHVwZGF0ZVNjcm9sbE9mZnNldCgpO1xuXHRcdFx0XHRfY29udHJvbGxlci5pbmZvKFwiY29udGFpbmVyXCIpLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uQ29udGFpbmVyUmVzaXplKTtcblx0XHRcdFx0Y29udHJvbGxlci5hZGRTY2VuZShTY2VuZSk7XG5cdFx0XHRcdFNjZW5lLnRyaWdnZXIoXCJhZGRcIiwge1xuXHRcdFx0XHRcdGNvbnRyb2xsZXI6IF9jb250cm9sbGVyXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRsb2coMywgXCJhZGRlZCBcIiArIE5BTUVTUEFDRSArIFwiIHRvIGNvbnRyb2xsZXJcIik7XG5cdFx0XHRcdFNjZW5lLnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFNjZW5lO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiAqKkdldCoqIG9yICoqU2V0KiogdGhlIGN1cnJlbnQgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgc2NlbmUuICBcblx0XHQgKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGRpc2FibGUgdGhpcyBzY2VuZSB3aXRob3V0IHJlbW92aW5nIG9yIGRlc3Ryb3lpbmcgaXQuXG5cdFx0ICogQG1ldGhvZCBTY3JvbGxNYWdpYy5TY2VuZSNlbmFibGVkXG5cdFx0ICpcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIGdldCB0aGUgY3VycmVudCB2YWx1ZVxuXHRcdCAqIHZhciBlbmFibGVkID0gc2NlbmUuZW5hYmxlZCgpO1xuXHRcdCAqXG5cdFx0ICogLy8gZGlzYWJsZSB0aGUgc2NlbmVcblx0XHQgKiBzY2VuZS5lbmFibGVkKGZhbHNlKTtcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW25ld1N0YXRlXSAtIFRoZSBuZXcgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgc2NlbmUgYHRydWVgIG9yIGBmYWxzZWAuXG5cdFx0ICogQHJldHVybnMgeyhib29sZWFufFNjZW5lKX0gQ3VycmVudCBlbmFibGVkIHN0YXRlIG9yIHBhcmVudCBvYmplY3QgZm9yIGNoYWluaW5nLlxuXHRcdCAqL1xuXHRcdHRoaXMuZW5hYmxlZCA9IGZ1bmN0aW9uIChuZXdTdGF0ZSkge1xuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7IC8vIGdldFxuXHRcdFx0XHRyZXR1cm4gX2VuYWJsZWQ7XG5cdFx0XHR9IGVsc2UgaWYgKF9lbmFibGVkICE9IG5ld1N0YXRlKSB7IC8vIHNldFxuXHRcdFx0XHRfZW5hYmxlZCA9ICEhIG5ld1N0YXRlO1xuXHRcdFx0XHRTY2VuZS51cGRhdGUodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gU2NlbmU7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZSB0aGUgc2NlbmUgZnJvbSB0aGUgY29udHJvbGxlci4gIFxuXHRcdCAqIFRoaXMgaXMgdGhlIGVxdWl2YWxlbnQgdG8gYENvbnRyb2xsZXIucmVtb3ZlU2NlbmUoc2NlbmUpYC5cblx0XHQgKiBUaGUgc2NlbmUgd2lsbCBub3QgYmUgdXBkYXRlZCBhbnltb3JlIHVudGlsIHlvdSByZWFkZCBpdCB0byBhIGNvbnRyb2xsZXIuXG5cdFx0ICogVG8gcmVtb3ZlIHRoZSBwaW4gb3IgdGhlIHR3ZWVuIHlvdSBuZWVkIHRvIGNhbGwgcmVtb3ZlVHdlZW4oKSBvciByZW1vdmVQaW4oKSByZXNwZWN0aXZlbHkuXG5cdFx0ICogQG1ldGhvZCBTY3JvbGxNYWdpYy5TY2VuZSNyZW1vdmVcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIHJlbW92ZSB0aGUgc2NlbmUgZnJvbSBpdHMgY29udHJvbGxlclxuXHRcdCAqIHNjZW5lLnJlbW92ZSgpO1xuXHRcdCAqXG5cdFx0ICogQHJldHVybnMge1NjZW5lfSBQYXJlbnQgb2JqZWN0IGZvciBjaGFpbmluZy5cblx0XHQgKi9cblx0XHR0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChfY29udHJvbGxlcikge1xuXHRcdFx0XHRfY29udHJvbGxlci5pbmZvKFwiY29udGFpbmVyXCIpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uQ29udGFpbmVyUmVzaXplKTtcblx0XHRcdFx0dmFyIHRtcFBhcmVudCA9IF9jb250cm9sbGVyO1xuXHRcdFx0XHRfY29udHJvbGxlciA9IHVuZGVmaW5lZDtcblx0XHRcdFx0dG1wUGFyZW50LnJlbW92ZVNjZW5lKFNjZW5lKTtcblx0XHRcdFx0U2NlbmUudHJpZ2dlcihcInJlbW92ZVwiKTtcblx0XHRcdFx0bG9nKDMsIFwicmVtb3ZlZCBcIiArIE5BTUVTUEFDRSArIFwiIGZyb20gY29udHJvbGxlclwiKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBTY2VuZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogRGVzdHJveSB0aGUgc2NlbmUgYW5kIGV2ZXJ5dGhpbmcuXG5cdFx0ICogQG1ldGhvZCBTY3JvbGxNYWdpYy5TY2VuZSNkZXN0cm95XG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiAvLyBkZXN0cm95IHRoZSBzY2VuZSB3aXRob3V0IHJlc2V0dGluZyB0aGUgcGluIGFuZCB0d2VlbiB0byB0aGVpciBpbml0aWFsIHBvc2l0aW9uc1xuXHRcdCAqIHNjZW5lID0gc2NlbmUuZGVzdHJveSgpO1xuXHRcdCAqXG5cdFx0ICogLy8gZGVzdHJveSB0aGUgc2NlbmUgYW5kIHJlc2V0IHRoZSBwaW4gYW5kIHR3ZWVuXG5cdFx0ICogc2NlbmUgPSBzY2VuZS5kZXN0cm95KHRydWUpO1xuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbcmVzZXQ9ZmFsc2VdIC0gSWYgYHRydWVgIHRoZSBwaW4gYW5kIHR3ZWVuIChpZiBleGlzdGVudCkgd2lsbCBiZSByZXNldC5cblx0XHQgKiBAcmV0dXJucyB7bnVsbH0gTnVsbCB0byB1bnNldCBoYW5kbGVyIHZhcmlhYmxlcy5cblx0XHQgKi9cblx0XHR0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAocmVzZXQpIHtcblx0XHRcdFNjZW5lLnRyaWdnZXIoXCJkZXN0cm95XCIsIHtcblx0XHRcdFx0cmVzZXQ6IHJlc2V0XG5cdFx0XHR9KTtcblx0XHRcdFNjZW5lLnJlbW92ZSgpO1xuXHRcdFx0U2NlbmUub2ZmKFwiKi4qXCIpO1xuXHRcdFx0bG9nKDMsIFwiZGVzdHJveWVkIFwiICsgTkFNRVNQQUNFICsgXCIgKHJlc2V0OiBcIiArIChyZXNldCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKSArIFwiKVwiKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH07XG5cblxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZXMgdGhlIFNjZW5lIHRvIHJlZmxlY3QgdGhlIGN1cnJlbnQgc3RhdGUuICBcblx0XHQgKiBUaGlzIGlzIHRoZSBlcXVpdmFsZW50IHRvIGBDb250cm9sbGVyLnVwZGF0ZVNjZW5lKHNjZW5lLCBpbW1lZGlhdGVseSlgLiAgXG5cdFx0ICogVGhlIHVwZGF0ZSBtZXRob2QgY2FsY3VsYXRlcyB0aGUgc2NlbmUncyBzdGFydCBhbmQgZW5kIHBvc2l0aW9uIChiYXNlZCBvbiB0aGUgdHJpZ2dlciBlbGVtZW50LCB0cmlnZ2VyIGhvb2ssIGR1cmF0aW9uIGFuZCBvZmZzZXQpIGFuZCBjaGVja3MgaXQgYWdhaW5zdCB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIGNvbnRhaW5lci4gIFxuXHRcdCAqIEl0IHRoZW4gdXBkYXRlcyB0aGUgY3VycmVudCBzY2VuZSBzdGF0ZSBhY2NvcmRpbmdseSAob3IgZG9lcyBub3RoaW5nLCBpZiB0aGUgc3RhdGUgaXMgYWxyZWFkeSBjb3JyZWN0KSDigJMgUGlucyB3aWxsIGJlIHNldCB0byB0aGVpciBjb3JyZWN0IHBvc2l0aW9uIGFuZCB0d2VlbnMgd2lsbCBiZSB1cGRhdGVkIHRvIHRoZWlyIGNvcnJlY3QgcHJvZ3Jlc3MuXG5cdFx0ICogVGhpcyBtZWFucyBhbiB1cGRhdGUgZG9lc24ndCBuZWNlc3NhcmlseSByZXN1bHQgaW4gYSBwcm9ncmVzcyBjaGFuZ2UuIFRoZSBgcHJvZ3Jlc3NgIGV2ZW50IHdpbGwgYmUgZmlyZWQgaWYgdGhlIHByb2dyZXNzIGhhcyBpbmRlZWQgY2hhbmdlZCBiZXR3ZWVuIHRoaXMgdXBkYXRlIGFuZCB0aGUgbGFzdC4gIFxuXHRcdCAqIF8qKk5PVEU6KiogVGhpcyBtZXRob2QgZ2V0cyBjYWxsZWQgY29uc3RhbnRseSB3aGVuZXZlciBTY3JvbGxNYWdpYyBkZXRlY3RzIGEgY2hhbmdlLiBUaGUgb25seSBhcHBsaWNhdGlvbiBmb3IgeW91IGlzIGlmIHlvdSBjaGFuZ2Ugc29tZXRoaW5nIG91dHNpZGUgb2YgdGhlIHJlYWxtIG9mIFNjcm9sbE1hZ2ljLCBsaWtlIG1vdmluZyB0aGUgdHJpZ2dlciBvciBjaGFuZ2luZyB0d2VlbiBwYXJhbWV0ZXJzLl9cblx0XHQgKiBAbWV0aG9kIFNjcm9sbE1hZ2ljLlNjZW5lI3VwZGF0ZVxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gdXBkYXRlIHRoZSBzY2VuZSBvbiBuZXh0IHRpY2tcblx0XHQgKiBzY2VuZS51cGRhdGUoKTtcblx0XHQgKlxuXHRcdCAqIC8vIHVwZGF0ZSB0aGUgc2NlbmUgaW1tZWRpYXRlbHlcblx0XHQgKiBzY2VuZS51cGRhdGUodHJ1ZSk7XG5cdFx0ICpcblx0XHQgKiBAZmlyZXMgU2NlbmUudXBkYXRlXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtpbW1lZGlhdGVseT1mYWxzZV0gLSBJZiBgdHJ1ZWAgdGhlIHVwZGF0ZSB3aWxsIGJlIGluc3RhbnQsIGlmIGBmYWxzZWAgaXQgd2lsbCB3YWl0IHVudGlsIG5leHQgdXBkYXRlIGN5Y2xlIChiZXR0ZXIgcGVyZm9ybWFuY2UpLlxuXHRcdCAqIEByZXR1cm5zIHtTY2VuZX0gUGFyZW50IG9iamVjdCBmb3IgY2hhaW5pbmcuXG5cdFx0ICovXG5cdFx0dGhpcy51cGRhdGUgPSBmdW5jdGlvbiAoaW1tZWRpYXRlbHkpIHtcblx0XHRcdGlmIChfY29udHJvbGxlcikge1xuXHRcdFx0XHRpZiAoaW1tZWRpYXRlbHkpIHtcblx0XHRcdFx0XHRpZiAoX2NvbnRyb2xsZXIuZW5hYmxlZCgpICYmIF9lbmFibGVkKSB7XG5cdFx0XHRcdFx0XHR2YXJcblx0XHRcdFx0XHRcdHNjcm9sbFBvcyA9IF9jb250cm9sbGVyLmluZm8oXCJzY3JvbGxQb3NcIiksXG5cdFx0XHRcdFx0XHRcdG5ld1Byb2dyZXNzO1xuXG5cdFx0XHRcdFx0XHRpZiAoX29wdGlvbnMuZHVyYXRpb24gPiAwKSB7XG5cdFx0XHRcdFx0XHRcdG5ld1Byb2dyZXNzID0gKHNjcm9sbFBvcyAtIF9zY3JvbGxPZmZzZXQuc3RhcnQpIC8gKF9zY3JvbGxPZmZzZXQuZW5kIC0gX3Njcm9sbE9mZnNldC5zdGFydCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRuZXdQcm9ncmVzcyA9IHNjcm9sbFBvcyA+PSBfc2Nyb2xsT2Zmc2V0LnN0YXJ0ID8gMSA6IDA7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFNjZW5lLnRyaWdnZXIoXCJ1cGRhdGVcIiwge1xuXHRcdFx0XHRcdFx0XHRzdGFydFBvczogX3Njcm9sbE9mZnNldC5zdGFydCxcblx0XHRcdFx0XHRcdFx0ZW5kUG9zOiBfc2Nyb2xsT2Zmc2V0LmVuZCxcblx0XHRcdFx0XHRcdFx0c2Nyb2xsUG9zOiBzY3JvbGxQb3Ncblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRTY2VuZS5wcm9ncmVzcyhuZXdQcm9ncmVzcyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChfcGluICYmIF9zdGF0ZSA9PT0gU0NFTkVfU1RBVEVfRFVSSU5HKSB7XG5cdFx0XHRcdFx0XHR1cGRhdGVQaW5TdGF0ZSh0cnVlKTsgLy8gdW5waW4gaW4gcG9zaXRpb25cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0X2NvbnRyb2xsZXIudXBkYXRlU2NlbmUoU2NlbmUsIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFNjZW5lO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBVcGRhdGVzIGR5bmFtaWMgc2NlbmUgdmFyaWFibGVzIGxpa2UgdGhlIHRyaWdnZXIgZWxlbWVudCBwb3NpdGlvbiBvciB0aGUgZHVyYXRpb24uXG5cdFx0ICogVGhpcyBtZXRob2QgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgaW4gcmVndWxhciBpbnRlcnZhbHMgZnJvbSB0aGUgY29udHJvbGxlci4gU2VlIHtAbGluayBTY3JvbGxNYWdpYy5Db250cm9sbGVyfSBvcHRpb24gYHJlZnJlc2hJbnRlcnZhbGAuXG5cdFx0ICogXG5cdFx0ICogWW91IGNhbiBjYWxsIGl0IHRvIG1pbmltaXplIGxhZywgZm9yIGV4YW1wbGUgd2hlbiB5b3UgaW50ZW50aW9uYWxseSBjaGFuZ2UgdGhlIHBvc2l0aW9uIG9mIHRoZSB0cmlnZ2VyRWxlbWVudC5cblx0XHQgKiBJZiB5b3UgZG9uJ3QgaXQgd2lsbCBzaW1wbHkgYmUgdXBkYXRlZCBpbiB0aGUgbmV4dCByZWZyZXNoIGludGVydmFsIG9mIHRoZSBjb250YWluZXIsIHdoaWNoIGlzIHVzdWFsbHkgc3VmZmljaWVudC5cblx0XHQgKlxuXHRcdCAqIEBtZXRob2QgU2Nyb2xsTWFnaWMuU2NlbmUjcmVmcmVzaFxuXHRcdCAqIEBzaW5jZSAxLjEuMFxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogc2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe3RyaWdnZXJFbGVtZW50OiBcIiN0cmlnZ2VyXCJ9KTtcblx0XHQgKiBcblx0XHQgKiAvLyBjaGFuZ2UgdGhlIHBvc2l0aW9uIG9mIHRoZSB0cmlnZ2VyXG5cdFx0ICogJChcIiN0cmlnZ2VyXCIpLmNzcyhcInRvcFwiLCA1MDApO1xuXHRcdCAqIC8vIGltbWVkaWF0ZWx5IGxldCB0aGUgc2NlbmUga25vdyBvZiB0aGlzIGNoYW5nZVxuXHRcdCAqIHNjZW5lLnJlZnJlc2goKTtcblx0XHQgKlxuXHRcdCAqIEBmaXJlcyB7QGxpbmsgU2NlbmUuc2hpZnR9LCBpZiB0aGUgdHJpZ2dlciBlbGVtZW50IHBvc2l0aW9uIG9yIHRoZSBkdXJhdGlvbiBjaGFuZ2VkXG5cdFx0ICogQGZpcmVzIHtAbGluayBTY2VuZS5jaGFuZ2V9LCBpZiB0aGUgZHVyYXRpb24gY2hhbmdlZFxuXHRcdCAqXG5cdFx0ICogQHJldHVybnMge1NjZW5lfSBQYXJlbnQgb2JqZWN0IGZvciBjaGFpbmluZy5cblx0XHQgKi9cblx0XHR0aGlzLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR1cGRhdGVEdXJhdGlvbigpO1xuXHRcdFx0dXBkYXRlVHJpZ2dlckVsZW1lbnRQb3NpdGlvbigpO1xuXHRcdFx0Ly8gdXBkYXRlIHRyaWdnZXIgZWxlbWVudCBwb3NpdGlvblxuXHRcdFx0cmV0dXJuIFNjZW5lO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiAqKkdldCoqIG9yICoqU2V0KiogdGhlIHNjZW5lJ3MgcHJvZ3Jlc3MuICBcblx0XHQgKiBVc3VhbGx5IGl0IHNob3VsZG4ndCBiZSBuZWNlc3NhcnkgdG8gdXNlIHRoaXMgYXMgYSBzZXR0ZXIsIGFzIGl0IGlzIHNldCBhdXRvbWF0aWNhbGx5IGJ5IHNjZW5lLnVwZGF0ZSgpLiAgXG5cdFx0ICogVGhlIG9yZGVyIGluIHdoaWNoIHRoZSBldmVudHMgYXJlIGZpcmVkIGRlcGVuZHMgb24gdGhlIGR1cmF0aW9uIG9mIHRoZSBzY2VuZTpcblx0XHQgKiAgMS4gU2NlbmVzIHdpdGggYGR1cmF0aW9uID09IDBgOiAgXG5cdFx0ICogIFNjZW5lcyB0aGF0IGhhdmUgbm8gZHVyYXRpb24gYnkgZGVmaW5pdGlvbiBoYXZlIG5vIGVuZGluZy4gVGh1cyB0aGUgYGVuZGAgZXZlbnQgd2lsbCBuZXZlciBiZSBmaXJlZC4gIFxuXHRcdCAqICBXaGVuIHRoZSB0cmlnZ2VyIHBvc2l0aW9uIG9mIHRoZSBzY2VuZSBpcyBwYXNzZWQgdGhlIGV2ZW50cyBhcmUgYWx3YXlzIGZpcmVkIGluIHRoaXMgb3JkZXI6ICBcblx0XHQgKiAgYGVudGVyYCwgYHN0YXJ0YCwgYHByb2dyZXNzYCB3aGVuIHNjcm9sbGluZyBmb3J3YXJkICBcblx0XHQgKiAgYW5kICBcblx0XHQgKiAgYHByb2dyZXNzYCwgYHN0YXJ0YCwgYGxlYXZlYCB3aGVuIHNjcm9sbGluZyBpbiByZXZlcnNlXG5cdFx0ICogIDIuIFNjZW5lcyB3aXRoIGBkdXJhdGlvbiA+IDBgOiAgXG5cdFx0ICogIFNjZW5lcyB3aXRoIGEgc2V0IGR1cmF0aW9uIGhhdmUgYSBkZWZpbmVkIHN0YXJ0IGFuZCBlbmQgcG9pbnQuICBcblx0XHQgKiAgV2hlbiBzY3JvbGxpbmcgcGFzdCB0aGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHNjZW5lIGl0IHdpbGwgZmlyZSB0aGVzZSBldmVudHMgaW4gdGhpcyBvcmRlcjogIFxuXHRcdCAqICBgZW50ZXJgLCBgc3RhcnRgLCBgcHJvZ3Jlc3NgICBcblx0XHQgKiAgV2hlbiBjb250aW51aW5nIHRvIHNjcm9sbCBhbmQgcGFzc2luZyB0aGUgZW5kIHBvaW50IGl0IHdpbGwgZmlyZSB0aGVzZSBldmVudHM6ICBcblx0XHQgKiAgYHByb2dyZXNzYCwgYGVuZGAsIGBsZWF2ZWAgIFxuXHRcdCAqICBXaGVuIHJldmVyc2luZyB0aHJvdWdoIHRoZSBlbmQgcG9pbnQgdGhlc2UgZXZlbnRzIGFyZSBmaXJlZDogIFxuXHRcdCAqICBgZW50ZXJgLCBgZW5kYCwgYHByb2dyZXNzYCAgXG5cdFx0ICogIEFuZCB3aGVuIGNvbnRpbnVpbmcgdG8gc2Nyb2xsIHBhc3QgdGhlIHN0YXJ0IHBvc2l0aW9uIGluIHJldmVyc2UgaXQgd2lsbCBmaXJlOiAgXG5cdFx0ICogIGBwcm9ncmVzc2AsIGBzdGFydGAsIGBsZWF2ZWAgIFxuXHRcdCAqICBJbiBiZXR3ZWVuIHN0YXJ0IGFuZCBlbmQgdGhlIGBwcm9ncmVzc2AgZXZlbnQgd2lsbCBiZSBjYWxsZWQgY29uc3RhbnRseSwgd2hlbmV2ZXIgdGhlIHByb2dyZXNzIGNoYW5nZXMuXG5cdFx0ICogXG5cdFx0ICogSW4gc2hvcnQ6ICBcblx0XHQgKiBgZW50ZXJgIGV2ZW50cyB3aWxsIGFsd2F5cyB0cmlnZ2VyICoqYmVmb3JlKiogdGhlIHByb2dyZXNzIHVwZGF0ZSBhbmQgYGxlYXZlYCBlbnZlbnRzIHdpbGwgdHJpZ2dlciAqKmFmdGVyKiogdGhlIHByb2dyZXNzIHVwZGF0ZS4gIFxuXHRcdCAqIGBzdGFydGAgYW5kIGBlbmRgIHdpbGwgYWx3YXlzIHRyaWdnZXIgYXQgdGhlaXIgcmVzcGVjdGl2ZSBwb3NpdGlvbi5cblx0XHQgKiBcblx0XHQgKiBQbGVhc2UgcmV2aWV3IHRoZSBldmVudCBkZXNjcmlwdGlvbnMgZm9yIGRldGFpbHMgb24gdGhlIGV2ZW50cyBhbmQgdGhlIGV2ZW50IG9iamVjdCB0aGF0IGlzIHBhc3NlZCB0byB0aGUgY2FsbGJhY2suXG5cdFx0ICogXG5cdFx0ICogQG1ldGhvZCBTY3JvbGxNYWdpYy5TY2VuZSNwcm9ncmVzc1xuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gZ2V0IHRoZSBjdXJyZW50IHNjZW5lIHByb2dyZXNzXG5cdFx0ICogdmFyIHByb2dyZXNzID0gc2NlbmUucHJvZ3Jlc3MoKTtcblx0XHQgKlxuXHRcdCAqIC8vIHNldCBuZXcgc2NlbmUgcHJvZ3Jlc3Ncblx0XHQgKiBzY2VuZS5wcm9ncmVzcygwLjMpO1xuXHRcdCAqXG5cdFx0ICogQGZpcmVzIHtAbGluayBTY2VuZS5lbnRlcn0sIHdoZW4gdXNlZCBhcyBzZXR0ZXJcblx0XHQgKiBAZmlyZXMge0BsaW5rIFNjZW5lLnN0YXJ0fSwgd2hlbiB1c2VkIGFzIHNldHRlclxuXHRcdCAqIEBmaXJlcyB7QGxpbmsgU2NlbmUucHJvZ3Jlc3N9LCB3aGVuIHVzZWQgYXMgc2V0dGVyXG5cdFx0ICogQGZpcmVzIHtAbGluayBTY2VuZS5lbmR9LCB3aGVuIHVzZWQgYXMgc2V0dGVyXG5cdFx0ICogQGZpcmVzIHtAbGluayBTY2VuZS5sZWF2ZX0sIHdoZW4gdXNlZCBhcyBzZXR0ZXJcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBbcHJvZ3Jlc3NdIC0gVGhlIG5ldyBwcm9ncmVzcyB2YWx1ZSBvZiB0aGUgc2NlbmUgYFswLTFdYC5cblx0XHQgKiBAcmV0dXJucyB7bnVtYmVyfSBgZ2V0YCAtICBDdXJyZW50IHNjZW5lIHByb2dyZXNzLlxuXHRcdCAqIEByZXR1cm5zIHtTY2VuZX0gYHNldGAgLSAgUGFyZW50IG9iamVjdCBmb3IgY2hhaW5pbmcuXG5cdFx0ICovXG5cdFx0dGhpcy5wcm9ncmVzcyA9IGZ1bmN0aW9uIChwcm9ncmVzcykge1xuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7IC8vIGdldFxuXHRcdFx0XHRyZXR1cm4gX3Byb2dyZXNzO1xuXHRcdFx0fSBlbHNlIHsgLy8gc2V0XG5cdFx0XHRcdHZhclxuXHRcdFx0XHRkb1VwZGF0ZSA9IGZhbHNlLFxuXHRcdFx0XHRcdG9sZFN0YXRlID0gX3N0YXRlLFxuXHRcdFx0XHRcdHNjcm9sbERpcmVjdGlvbiA9IF9jb250cm9sbGVyID8gX2NvbnRyb2xsZXIuaW5mbyhcInNjcm9sbERpcmVjdGlvblwiKSA6ICdQQVVTRUQnLFxuXHRcdFx0XHRcdHJldmVyc2VPckZvcndhcmQgPSBfb3B0aW9ucy5yZXZlcnNlIHx8IHByb2dyZXNzID49IF9wcm9ncmVzcztcblx0XHRcdFx0aWYgKF9vcHRpb25zLmR1cmF0aW9uID09PSAwKSB7XG5cdFx0XHRcdFx0Ly8gemVybyBkdXJhdGlvbiBzY2VuZXNcblx0XHRcdFx0XHRkb1VwZGF0ZSA9IF9wcm9ncmVzcyAhPSBwcm9ncmVzcztcblx0XHRcdFx0XHRfcHJvZ3Jlc3MgPSBwcm9ncmVzcyA8IDEgJiYgcmV2ZXJzZU9yRm9yd2FyZCA/IDAgOiAxO1xuXHRcdFx0XHRcdF9zdGF0ZSA9IF9wcm9ncmVzcyA9PT0gMCA/IFNDRU5FX1NUQVRFX0JFRk9SRSA6IFNDRU5FX1NUQVRFX0RVUklORztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBzY2VuZXMgd2l0aCBzdGFydCBhbmQgZW5kXG5cdFx0XHRcdFx0aWYgKHByb2dyZXNzIDwgMCAmJiBfc3RhdGUgIT09IFNDRU5FX1NUQVRFX0JFRk9SRSAmJiByZXZlcnNlT3JGb3J3YXJkKSB7XG5cdFx0XHRcdFx0XHQvLyBnbyBiYWNrIHRvIGluaXRpYWwgc3RhdGVcblx0XHRcdFx0XHRcdF9wcm9ncmVzcyA9IDA7XG5cdFx0XHRcdFx0XHRfc3RhdGUgPSBTQ0VORV9TVEFURV9CRUZPUkU7XG5cdFx0XHRcdFx0XHRkb1VwZGF0ZSA9IHRydWU7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcm9ncmVzcyA+PSAwICYmIHByb2dyZXNzIDwgMSAmJiByZXZlcnNlT3JGb3J3YXJkKSB7XG5cdFx0XHRcdFx0XHRfcHJvZ3Jlc3MgPSBwcm9ncmVzcztcblx0XHRcdFx0XHRcdF9zdGF0ZSA9IFNDRU5FX1NUQVRFX0RVUklORztcblx0XHRcdFx0XHRcdGRvVXBkYXRlID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb2dyZXNzID49IDEgJiYgX3N0YXRlICE9PSBTQ0VORV9TVEFURV9BRlRFUikge1xuXHRcdFx0XHRcdFx0X3Byb2dyZXNzID0gMTtcblx0XHRcdFx0XHRcdF9zdGF0ZSA9IFNDRU5FX1NUQVRFX0FGVEVSO1xuXHRcdFx0XHRcdFx0ZG9VcGRhdGUgPSB0cnVlO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoX3N0YXRlID09PSBTQ0VORV9TVEFURV9EVVJJTkcgJiYgIXJldmVyc2VPckZvcndhcmQpIHtcblx0XHRcdFx0XHRcdHVwZGF0ZVBpblN0YXRlKCk7IC8vIGluIGNhc2Ugd2Ugc2Nyb2xsZWQgYmFja3dhcmRzIG1pZC1zY2VuZSBhbmQgcmV2ZXJzZSBpcyBkaXNhYmxlZCA9PiB1cGRhdGUgdGhlIHBpbiBwb3NpdGlvbiwgc28gaXQgZG9lc24ndCBtb3ZlIGJhY2sgYXMgd2VsbC5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGRvVXBkYXRlKSB7XG5cdFx0XHRcdFx0Ly8gZmlyZSBldmVudHNcblx0XHRcdFx0XHR2YXJcblx0XHRcdFx0XHRldmVudFZhcnMgPSB7XG5cdFx0XHRcdFx0XHRwcm9ncmVzczogX3Byb2dyZXNzLFxuXHRcdFx0XHRcdFx0c3RhdGU6IF9zdGF0ZSxcblx0XHRcdFx0XHRcdHNjcm9sbERpcmVjdGlvbjogc2Nyb2xsRGlyZWN0aW9uXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHN0YXRlQ2hhbmdlZCA9IF9zdGF0ZSAhPSBvbGRTdGF0ZTtcblxuXHRcdFx0XHRcdHZhciB0cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkgeyAvLyB0bXAgaGVscGVyIHRvIHNpbXBsaWZ5IGNvZGVcblx0XHRcdFx0XHRcdFNjZW5lLnRyaWdnZXIoZXZlbnROYW1lLCBldmVudFZhcnMpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRpZiAoc3RhdGVDaGFuZ2VkKSB7IC8vIGVudGVyIGV2ZW50c1xuXHRcdFx0XHRcdFx0aWYgKG9sZFN0YXRlICE9PSBTQ0VORV9TVEFURV9EVVJJTkcpIHtcblx0XHRcdFx0XHRcdFx0dHJpZ2dlcihcImVudGVyXCIpO1xuXHRcdFx0XHRcdFx0XHR0cmlnZ2VyKG9sZFN0YXRlID09PSBTQ0VORV9TVEFURV9CRUZPUkUgPyBcInN0YXJ0XCIgOiBcImVuZFwiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dHJpZ2dlcihcInByb2dyZXNzXCIpO1xuXHRcdFx0XHRcdGlmIChzdGF0ZUNoYW5nZWQpIHsgLy8gbGVhdmUgZXZlbnRzXG5cdFx0XHRcdFx0XHRpZiAoX3N0YXRlICE9PSBTQ0VORV9TVEFURV9EVVJJTkcpIHtcblx0XHRcdFx0XHRcdFx0dHJpZ2dlcihfc3RhdGUgPT09IFNDRU5FX1NUQVRFX0JFRk9SRSA/IFwic3RhcnRcIiA6IFwiZW5kXCIpO1xuXHRcdFx0XHRcdFx0XHR0cmlnZ2VyKFwibGVhdmVcIik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFNjZW5lO1xuXHRcdFx0fVxuXHRcdH07XG5cblxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZSB0aGUgc3RhcnQgYW5kIGVuZCBzY3JvbGxPZmZzZXQgb2YgdGhlIGNvbnRhaW5lci5cblx0XHQgKiBUaGUgcG9zaXRpb25zIHJlZmxlY3Qgd2hhdCB0aGUgY29udHJvbGxlcidzIHNjcm9sbCBwb3NpdGlvbiB3aWxsIGJlIGF0IHRoZSBzdGFydCBhbmQgZW5kIHJlc3BlY3RpdmVseS5cblx0XHQgKiBJcyBjYWxsZWQsIHdoZW46XG5cdFx0ICogICAtIFNjZW5lIGV2ZW50IFwiY2hhbmdlXCIgaXMgY2FsbGVkIHdpdGg6IG9mZnNldCwgdHJpZ2dlckhvb2ssIGR1cmF0aW9uIFxuXHRcdCAqICAgLSBzY3JvbGwgY29udGFpbmVyIGV2ZW50IFwicmVzaXplXCIgaXMgY2FsbGVkXG5cdFx0ICogICAtIHRoZSBwb3NpdGlvbiBvZiB0aGUgdHJpZ2dlckVsZW1lbnQgY2hhbmdlc1xuXHRcdCAqICAgLSB0aGUgY29udHJvbGxlciBjaGFuZ2VzIC0+IGFkZFRvKClcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciB1cGRhdGVTY3JvbGxPZmZzZXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRfc2Nyb2xsT2Zmc2V0ID0ge1xuXHRcdFx0XHRzdGFydDogX3RyaWdnZXJQb3MgKyBfb3B0aW9ucy5vZmZzZXRcblx0XHRcdH07XG5cdFx0XHRpZiAoX2NvbnRyb2xsZXIgJiYgX29wdGlvbnMudHJpZ2dlckVsZW1lbnQpIHtcblx0XHRcdFx0Ly8gdGFrZSBhd2F5IHRyaWdnZXJIb29rIHBvcnRpb24gdG8gZ2V0IHJlbGF0aXZlIHRvIHRvcFxuXHRcdFx0XHRfc2Nyb2xsT2Zmc2V0LnN0YXJ0IC09IF9jb250cm9sbGVyLmluZm8oXCJzaXplXCIpICogX29wdGlvbnMudHJpZ2dlckhvb2s7XG5cdFx0XHR9XG5cdFx0XHRfc2Nyb2xsT2Zmc2V0LmVuZCA9IF9zY3JvbGxPZmZzZXQuc3RhcnQgKyBfb3B0aW9ucy5kdXJhdGlvbjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlcyB0aGUgZHVyYXRpb24gaWYgc2V0IHRvIGEgZHluYW1pYyBmdW5jdGlvbi5cblx0XHQgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgd2hlbiB0aGUgc2NlbmUgaXMgYWRkZWQgdG8gYSBjb250cm9sbGVyIGFuZCBpbiByZWd1bGFyIGludGVydmFscyBmcm9tIHRoZSBjb250cm9sbGVyIHRocm91Z2ggc2NlbmUucmVmcmVzaCgpLlxuXHRcdCAqIFxuXHRcdCAqIEBmaXJlcyB7QGxpbmsgU2NlbmUuY2hhbmdlfSwgaWYgdGhlIGR1cmF0aW9uIGNoYW5nZWRcblx0XHQgKiBAZmlyZXMge0BsaW5rIFNjZW5lLnNoaWZ0fSwgaWYgdGhlIGR1cmF0aW9uIGNoYW5nZWRcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3N1cHByZXNzRXZlbnRzPWZhbHNlXSAtIElmIHRydWUgdGhlIHNoaWZ0IGV2ZW50IHdpbGwgYmUgc3VwcHJlc3NlZC5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciB1cGRhdGVEdXJhdGlvbiA9IGZ1bmN0aW9uIChzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0Ly8gdXBkYXRlIGR1cmF0aW9uXG5cdFx0XHRpZiAoX2R1cmF0aW9uVXBkYXRlTWV0aG9kKSB7XG5cdFx0XHRcdHZhciB2YXJuYW1lID0gXCJkdXJhdGlvblwiO1xuXHRcdFx0XHRpZiAoY2hhbmdlT3B0aW9uKHZhcm5hbWUsIF9kdXJhdGlvblVwZGF0ZU1ldGhvZC5jYWxsKFNjZW5lKSkgJiYgIXN1cHByZXNzRXZlbnRzKSB7IC8vIHNldFxuXHRcdFx0XHRcdFNjZW5lLnRyaWdnZXIoXCJjaGFuZ2VcIiwge1xuXHRcdFx0XHRcdFx0d2hhdDogdmFybmFtZSxcblx0XHRcdFx0XHRcdG5ld3ZhbDogX29wdGlvbnNbdmFybmFtZV1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRTY2VuZS50cmlnZ2VyKFwic2hpZnRcIiwge1xuXHRcdFx0XHRcdFx0cmVhc29uOiB2YXJuYW1lXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIHRyaWdnZXJFbGVtZW50LCBpZiBwcmVzZW50LlxuXHRcdCAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCAuLi5cblx0XHQgKiAgLSAuLi4gd2hlbiB0aGUgdHJpZ2dlckVsZW1lbnQgaXMgY2hhbmdlZFxuXHRcdCAqICAtIC4uLiB3aGVuIHRoZSBzY2VuZSBpcyBhZGRlZCB0byBhIChuZXcpIGNvbnRyb2xsZXJcblx0XHQgKiAgLSAuLi4gaW4gcmVndWxhciBpbnRlcnZhbHMgZnJvbSB0aGUgY29udHJvbGxlciB0aHJvdWdoIHNjZW5lLnJlZnJlc2goKS5cblx0XHQgKiBcblx0XHQgKiBAZmlyZXMge0BsaW5rIFNjZW5lLnNoaWZ0fSwgaWYgdGhlIHBvc2l0aW9uIGNoYW5nZWRcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3N1cHByZXNzRXZlbnRzPWZhbHNlXSAtIElmIHRydWUgdGhlIHNoaWZ0IGV2ZW50IHdpbGwgYmUgc3VwcHJlc3NlZC5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciB1cGRhdGVUcmlnZ2VyRWxlbWVudFBvc2l0aW9uID0gZnVuY3Rpb24gKHN1cHByZXNzRXZlbnRzKSB7XG5cdFx0XHR2YXJcblx0XHRcdGVsZW1lbnRQb3MgPSAwLFxuXHRcdFx0XHR0ZWxlbSA9IF9vcHRpb25zLnRyaWdnZXJFbGVtZW50O1xuXHRcdFx0aWYgKF9jb250cm9sbGVyICYmIHRlbGVtKSB7XG5cdFx0XHRcdHZhclxuXHRcdFx0XHRjb250cm9sbGVySW5mbyA9IF9jb250cm9sbGVyLmluZm8oKSxcblx0XHRcdFx0XHRjb250YWluZXJPZmZzZXQgPSBfdXRpbC5nZXQub2Zmc2V0KGNvbnRyb2xsZXJJbmZvLmNvbnRhaW5lciksXG5cdFx0XHRcdFx0Ly8gY29udGFpbmVyIHBvc2l0aW9uIGlzIG5lZWRlZCBiZWNhdXNlIGVsZW1lbnQgb2Zmc2V0IGlzIHJldHVybmVkIGluIHJlbGF0aW9uIHRvIGRvY3VtZW50LCBub3QgaW4gcmVsYXRpb24gdG8gY29udGFpbmVyLlxuXHRcdFx0XHRcdHBhcmFtID0gY29udHJvbGxlckluZm8udmVydGljYWwgPyBcInRvcFwiIDogXCJsZWZ0XCI7IC8vIHdoaWNoIHBhcmFtIGlzIG9mIGludGVyZXN0ID9cblx0XHRcdFx0Ly8gaWYgcGFyZW50IGlzIHNwYWNlciwgdXNlIHNwYWNlciBwb3NpdGlvbiBpbnN0ZWFkIHNvIGNvcnJlY3Qgc3RhcnQgcG9zaXRpb24gaXMgcmV0dXJuZWQgZm9yIHBpbm5lZCBlbGVtZW50cy5cblx0XHRcdFx0d2hpbGUgKHRlbGVtLnBhcmVudE5vZGUuaGFzQXR0cmlidXRlKFBJTl9TUEFDRVJfQVRUUklCVVRFKSkge1xuXHRcdFx0XHRcdHRlbGVtID0gdGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBlbGVtZW50T2Zmc2V0ID0gX3V0aWwuZ2V0Lm9mZnNldCh0ZWxlbSk7XG5cblx0XHRcdFx0aWYgKCFjb250cm9sbGVySW5mby5pc0RvY3VtZW50KSB7IC8vIGNvbnRhaW5lciBpcyBub3QgdGhlIGRvY3VtZW50IHJvb3QsIHNvIHN1YnN0cmFjdCBzY3JvbGwgUG9zaXRpb24gdG8gZ2V0IGNvcnJlY3QgdHJpZ2dlciBlbGVtZW50IHBvc2l0aW9uIHJlbGF0aXZlIHRvIHNjcm9sbGNvbnRlbnRcblx0XHRcdFx0XHRjb250YWluZXJPZmZzZXRbcGFyYW1dIC09IF9jb250cm9sbGVyLnNjcm9sbFBvcygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxlbWVudFBvcyA9IGVsZW1lbnRPZmZzZXRbcGFyYW1dIC0gY29udGFpbmVyT2Zmc2V0W3BhcmFtXTtcblx0XHRcdH1cblx0XHRcdHZhciBjaGFuZ2VkID0gZWxlbWVudFBvcyAhPSBfdHJpZ2dlclBvcztcblx0XHRcdF90cmlnZ2VyUG9zID0gZWxlbWVudFBvcztcblx0XHRcdGlmIChjaGFuZ2VkICYmICFzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0XHRTY2VuZS50cmlnZ2VyKFwic2hpZnRcIiwge1xuXHRcdFx0XHRcdHJlYXNvbjogXCJ0cmlnZ2VyRWxlbWVudFBvc2l0aW9uXCJcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFRyaWdnZXIgYSBzaGlmdCBldmVudCwgd2hlbiB0aGUgY29udGFpbmVyIGlzIHJlc2l6ZWQgYW5kIHRoZSB0cmlnZ2VySG9vayBpcyA+IDEuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgb25Db250YWluZXJSZXNpemUgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0aWYgKF9vcHRpb25zLnRyaWdnZXJIb29rID4gMCkge1xuXHRcdFx0XHRTY2VuZS50cmlnZ2VyKFwic2hpZnRcIiwge1xuXHRcdFx0XHRcdHJlYXNvbjogXCJjb250YWluZXJSZXNpemVcIlxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIF92YWxpZGF0ZSA9IF91dGlsLmV4dGVuZChTQ0VORV9PUFRJT05TLnZhbGlkYXRlLCB7XG5cdFx0XHQvLyB2YWxpZGF0aW9uIGZvciBkdXJhdGlvbiBoYW5kbGVkIGludGVybmFsbHkgZm9yIHJlZmVyZW5jZSB0byBwcml2YXRlIHZhciBfZHVyYXRpb25NZXRob2Rcblx0XHRcdGR1cmF0aW9uOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0XHRcdGlmIChfdXRpbC50eXBlLlN0cmluZyh2YWwpICYmIHZhbC5tYXRjaCgvXihcXC58XFxkKSpcXGQrJSQvKSkge1xuXHRcdFx0XHRcdC8vIHBlcmNlbnRhZ2UgdmFsdWVcblx0XHRcdFx0XHR2YXIgcGVyYyA9IHBhcnNlRmxvYXQodmFsKSAvIDEwMDtcblx0XHRcdFx0XHR2YWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX2NvbnRyb2xsZXIgPyBfY29udHJvbGxlci5pbmZvKFwic2l6ZVwiKSAqIHBlcmMgOiAwO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKF91dGlsLnR5cGUuRnVuY3Rpb24odmFsKSkge1xuXHRcdFx0XHRcdC8vIGZ1bmN0aW9uXG5cdFx0XHRcdFx0X2R1cmF0aW9uVXBkYXRlTWV0aG9kID0gdmFsO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHR2YWwgPSBwYXJzZUZsb2F0KF9kdXJhdGlvblVwZGF0ZU1ldGhvZCgpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHR2YWwgPSAtMTsgLy8gd2lsbCBjYXVzZSBlcnJvciBiZWxvd1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyB2YWwgaGFzIHRvIGJlIGZsb2F0XG5cdFx0XHRcdHZhbCA9IHBhcnNlRmxvYXQodmFsKTtcblx0XHRcdFx0aWYgKCFfdXRpbC50eXBlLk51bWJlcih2YWwpIHx8IHZhbCA8IDApIHtcblx0XHRcdFx0XHRpZiAoX2R1cmF0aW9uVXBkYXRlTWV0aG9kKSB7XG5cdFx0XHRcdFx0XHRfZHVyYXRpb25VcGRhdGVNZXRob2QgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHR0aHJvdyBbXCJJbnZhbGlkIHJldHVybiB2YWx1ZSBvZiBzdXBwbGllZCBmdW5jdGlvbiBmb3Igb3B0aW9uIFxcXCJkdXJhdGlvblxcXCI6XCIsIHZhbF07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IFtcIkludmFsaWQgdmFsdWUgZm9yIG9wdGlvbiBcXFwiZHVyYXRpb25cXFwiOlwiLCB2YWxdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hlY2tzIHRoZSB2YWxpZGl0eSBvZiBhIHNwZWNpZmljIG9yIGFsbCBvcHRpb25zIGFuZCByZXNldCB0byBkZWZhdWx0IGlmIG5lY2Nlc3NhcnkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgdmFsaWRhdGVPcHRpb24gPSBmdW5jdGlvbiAoY2hlY2spIHtcblx0XHRcdGNoZWNrID0gYXJndW1lbnRzLmxlbmd0aCA/IFtjaGVja10gOiBPYmplY3Qua2V5cyhfdmFsaWRhdGUpO1xuXHRcdFx0Y2hlY2suZm9yRWFjaChmdW5jdGlvbiAob3B0aW9uTmFtZSwga2V5KSB7XG5cdFx0XHRcdHZhciB2YWx1ZTtcblx0XHRcdFx0aWYgKF92YWxpZGF0ZVtvcHRpb25OYW1lXSkgeyAvLyB0aGVyZSBpcyBhIHZhbGlkYXRpb24gbWV0aG9kIGZvciB0aGlzIG9wdGlvblxuXHRcdFx0XHRcdHRyeSB7IC8vIHZhbGlkYXRlIHZhbHVlXG5cdFx0XHRcdFx0XHR2YWx1ZSA9IF92YWxpZGF0ZVtvcHRpb25OYW1lXShfb3B0aW9uc1tvcHRpb25OYW1lXSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkgeyAvLyB2YWxpZGF0aW9uIGZhaWxlZCAtPiByZXNldCB0byBkZWZhdWx0XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IERFRkFVTFRfT1BUSU9OU1tvcHRpb25OYW1lXTtcblx0XHRcdFx0XHRcdHZhciBsb2dNU0cgPSBfdXRpbC50eXBlLlN0cmluZyhlKSA/IFtlXSA6IGU7XG5cdFx0XHRcdFx0XHRpZiAoX3V0aWwudHlwZS5BcnJheShsb2dNU0cpKSB7XG5cdFx0XHRcdFx0XHRcdGxvZ01TR1swXSA9IFwiRVJST1I6IFwiICsgbG9nTVNHWzBdO1xuXHRcdFx0XHRcdFx0XHRsb2dNU0cudW5zaGlmdCgxKTsgLy8gbG9nbGV2ZWwgMSBmb3IgZXJyb3IgbXNnXG5cdFx0XHRcdFx0XHRcdGxvZy5hcHBseSh0aGlzLCBsb2dNU0cpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0bG9nKDEsIFwiRVJST1I6IFByb2JsZW0gZXhlY3V0aW5nIHZhbGlkYXRpb24gY2FsbGJhY2sgZm9yIG9wdGlvbiAnXCIgKyBvcHRpb25OYW1lICsgXCInOlwiLCBlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdFx0XHRfb3B0aW9uc1tvcHRpb25OYW1lXSA9IHZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciB1c2VkIGJ5IHRoZSBzZXR0ZXIvZ2V0dGVycyBmb3Igc2NlbmUgb3B0aW9uc1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIGNoYW5nZU9wdGlvbiA9IGZ1bmN0aW9uICh2YXJuYW1lLCBuZXd2YWwpIHtcblx0XHRcdHZhclxuXHRcdFx0Y2hhbmdlZCA9IGZhbHNlLFxuXHRcdFx0XHRvbGR2YWwgPSBfb3B0aW9uc1t2YXJuYW1lXTtcblx0XHRcdGlmIChfb3B0aW9uc1t2YXJuYW1lXSAhPSBuZXd2YWwpIHtcblx0XHRcdFx0X29wdGlvbnNbdmFybmFtZV0gPSBuZXd2YWw7XG5cdFx0XHRcdHZhbGlkYXRlT3B0aW9uKHZhcm5hbWUpOyAvLyByZXNldHMgdG8gZGVmYXVsdCBpZiBuZWNlc3Nhcnlcblx0XHRcdFx0Y2hhbmdlZCA9IG9sZHZhbCAhPSBfb3B0aW9uc1t2YXJuYW1lXTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBjaGFuZ2VkO1xuXHRcdH07XG5cblx0XHQvLyBnZW5lcmF0ZSBnZXR0ZXJzL3NldHRlcnMgZm9yIGFsbCBvcHRpb25zXG5cdFx0dmFyIGFkZFNjZW5lT3B0aW9uID0gZnVuY3Rpb24gKG9wdGlvbk5hbWUpIHtcblx0XHRcdGlmICghU2NlbmVbb3B0aW9uTmFtZV0pIHtcblx0XHRcdFx0U2NlbmVbb3B0aW9uTmFtZV0gPSBmdW5jdGlvbiAobmV3VmFsKSB7XG5cdFx0XHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7IC8vIGdldFxuXHRcdFx0XHRcdFx0cmV0dXJuIF9vcHRpb25zW29wdGlvbk5hbWVdO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9uTmFtZSA9PT0gXCJkdXJhdGlvblwiKSB7IC8vIG5ldyBkdXJhdGlvbiBpcyBzZXQsIHNvIGFueSBwcmV2aW91c2x5IHNldCBmdW5jdGlvbiBtdXN0IGJlIHVuc2V0XG5cdFx0XHRcdFx0XHRcdF9kdXJhdGlvblVwZGF0ZU1ldGhvZCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChjaGFuZ2VPcHRpb24ob3B0aW9uTmFtZSwgbmV3VmFsKSkgeyAvLyBzZXRcblx0XHRcdFx0XHRcdFx0U2NlbmUudHJpZ2dlcihcImNoYW5nZVwiLCB7XG5cdFx0XHRcdFx0XHRcdFx0d2hhdDogb3B0aW9uTmFtZSxcblx0XHRcdFx0XHRcdFx0XHRuZXd2YWw6IF9vcHRpb25zW29wdGlvbk5hbWVdXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRpZiAoU0NFTkVfT1BUSU9OUy5zaGlmdHMuaW5kZXhPZihvcHRpb25OYW1lKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0U2NlbmUudHJpZ2dlcihcInNoaWZ0XCIsIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJlYXNvbjogb3B0aW9uTmFtZVxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBTY2VuZTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogKipHZXQqKiBvciAqKlNldCoqIHRoZSBkdXJhdGlvbiBvcHRpb24gdmFsdWUuXG5cdFx0ICogQXMgYSBzZXR0ZXIgaXQgYWxzbyBhY2NlcHRzIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGEgbnVtZXJpYyB2YWx1ZS4gIFxuXHRcdCAqIFRoaXMgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3IgcmVzcG9uc2l2ZSBzZXR1cHMuXG5cdFx0ICpcblx0XHQgKiBUaGUgZHVyYXRpb24gaXMgdXBkYXRlZCB1c2luZyB0aGUgc3VwcGxpZWQgZnVuY3Rpb24gZXZlcnkgdGltZSBgU2NlbmUucmVmcmVzaCgpYCBpcyBjYWxsZWQsIHdoaWNoIGhhcHBlbnMgcGVyaW9kaWNhbGx5IGZyb20gdGhlIGNvbnRyb2xsZXIgKHNlZSBTY3JvbGxNYWdpYy5Db250cm9sbGVyIG9wdGlvbiBgcmVmcmVzaEludGVydmFsYCkuICBcblx0XHQgKiBfKipOT1RFOioqIEJlIGF3YXJlIHRoYXQgaXQncyBhbiBlYXN5IHdheSB0byBraWxsIHBlcmZvcm1hbmNlLCBpZiB5b3Ugc3VwcGx5IGEgZnVuY3Rpb24gdGhhdCBoYXMgaGlnaCBDUFUgZGVtYW5kLiAgXG5cdFx0ICogRXZlbiBmb3Igc2l6ZSBhbmQgcG9zaXRpb24gY2FsY3VsYXRpb25zIGl0IGlzIHJlY29tbWVuZGVkIHRvIHVzZSBhIHZhcmlhYmxlIHRvIGNhY2hlIHRoZSB2YWx1ZS4gKHNlZSBleGFtcGxlKSAgXG5cdFx0ICogVGhpcyBjb3VudHMgZG91YmxlIGlmIHlvdSB1c2UgdGhlIHNhbWUgZnVuY3Rpb24gZm9yIG11bHRpcGxlIHNjZW5lcy5fXG5cdFx0ICpcblx0XHQgKiBAbWV0aG9kIFNjcm9sbE1hZ2ljLlNjZW5lI2R1cmF0aW9uXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiAvLyBnZXQgdGhlIGN1cnJlbnQgZHVyYXRpb24gdmFsdWVcblx0XHQgKiB2YXIgZHVyYXRpb24gPSBzY2VuZS5kdXJhdGlvbigpO1xuXHRcdCAqXG5cdFx0ICogLy8gc2V0IGEgbmV3IGR1cmF0aW9uXG5cdFx0ICogc2NlbmUuZHVyYXRpb24oMzAwKTtcblx0XHQgKlxuXHRcdCAqIC8vIHVzZSBhIGZ1bmN0aW9uIHRvIGF1dG9tYXRpY2FsbHkgYWRqdXN0IHRoZSBkdXJhdGlvbiB0byB0aGUgd2luZG93IGhlaWdodC5cblx0XHQgKiB2YXIgZHVyYXRpb25WYWx1ZUNhY2hlO1xuXHRcdCAqIGZ1bmN0aW9uIGdldER1cmF0aW9uICgpIHtcblx0XHQgKiAgIHJldHVybiBkdXJhdGlvblZhbHVlQ2FjaGU7XG5cdFx0ICogfVxuXHRcdCAqIGZ1bmN0aW9uIHVwZGF0ZUR1cmF0aW9uIChlKSB7XG5cdFx0ICogICBkdXJhdGlvblZhbHVlQ2FjaGUgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0ICogfVxuXHRcdCAqICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB1cGRhdGVEdXJhdGlvbik7IC8vIHVwZGF0ZSB0aGUgZHVyYXRpb24gd2hlbiB0aGUgd2luZG93IHNpemUgY2hhbmdlc1xuXHRcdCAqICQod2luZG93KS50cmlnZ2VySGFuZGxlcihcInJlc2l6ZVwiKTsgLy8gc2V0IHRvIGluaXRpYWwgdmFsdWVcblx0XHQgKiBzY2VuZS5kdXJhdGlvbihnZXREdXJhdGlvbik7IC8vIHN1cHBseSBkdXJhdGlvbiBtZXRob2Rcblx0XHQgKlxuXHRcdCAqIEBmaXJlcyB7QGxpbmsgU2NlbmUuY2hhbmdlfSwgd2hlbiB1c2VkIGFzIHNldHRlclxuXHRcdCAqIEBmaXJlcyB7QGxpbmsgU2NlbmUuc2hpZnR9LCB3aGVuIHVzZWQgYXMgc2V0dGVyXG5cdFx0ICogQHBhcmFtIHsobnVtYmVyfGZ1bmN0aW9uKX0gW25ld0R1cmF0aW9uXSAtIFRoZSBuZXcgZHVyYXRpb24gb2YgdGhlIHNjZW5lLlxuXHRcdCAqIEByZXR1cm5zIHtudW1iZXJ9IGBnZXRgIC0gIEN1cnJlbnQgc2NlbmUgZHVyYXRpb24uXG5cdFx0ICogQHJldHVybnMge1NjZW5lfSBgc2V0YCAtICBQYXJlbnQgb2JqZWN0IGZvciBjaGFpbmluZy5cblx0XHQgKi9cblxuXHRcdC8qKlxuXHRcdCAqICoqR2V0Kiogb3IgKipTZXQqKiB0aGUgb2Zmc2V0IG9wdGlvbiB2YWx1ZS5cblx0XHQgKiBAbWV0aG9kIFNjcm9sbE1hZ2ljLlNjZW5lI29mZnNldFxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gZ2V0IHRoZSBjdXJyZW50IG9mZnNldFxuXHRcdCAqIHZhciBvZmZzZXQgPSBzY2VuZS5vZmZzZXQoKTtcblx0XHQgKlxuXHRcdCAqIC8vIHNldCBhIG5ldyBvZmZzZXRcblx0XHQgKiBzY2VuZS5vZmZzZXQoMTAwKTtcblx0XHQgKlxuXHRcdCAqIEBmaXJlcyB7QGxpbmsgU2NlbmUuY2hhbmdlfSwgd2hlbiB1c2VkIGFzIHNldHRlclxuXHRcdCAqIEBmaXJlcyB7QGxpbmsgU2NlbmUuc2hpZnR9LCB3aGVuIHVzZWQgYXMgc2V0dGVyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IFtuZXdPZmZzZXRdIC0gVGhlIG5ldyBvZmZzZXQgb2YgdGhlIHNjZW5lLlxuXHRcdCAqIEByZXR1cm5zIHtudW1iZXJ9IGBnZXRgIC0gIEN1cnJlbnQgc2NlbmUgb2Zmc2V0LlxuXHRcdCAqIEByZXR1cm5zIHtTY2VuZX0gYHNldGAgLSAgUGFyZW50IG9iamVjdCBmb3IgY2hhaW5pbmcuXG5cdFx0ICovXG5cblx0XHQvKipcblx0XHQgKiAqKkdldCoqIG9yICoqU2V0KiogdGhlIHRyaWdnZXJFbGVtZW50IG9wdGlvbiB2YWx1ZS5cblx0XHQgKiBEb2VzICoqbm90KiogZmlyZSBgU2NlbmUuc2hpZnRgLCBiZWNhdXNlIGNoYW5naW5nIHRoZSB0cmlnZ2VyIEVsZW1lbnQgZG9lc24ndCBuZWNlc3NhcmlseSBtZWFuIHRoZSBzdGFydCBwb3NpdGlvbiBjaGFuZ2VzLiBUaGlzIHdpbGwgYmUgZGV0ZXJtaW5lZCBpbiBgU2NlbmUucmVmcmVzaCgpYCwgd2hpY2ggaXMgYXV0b21hdGljYWxseSB0cmlnZ2VyZWQuXG5cdFx0ICogQG1ldGhvZCBTY3JvbGxNYWdpYy5TY2VuZSN0cmlnZ2VyRWxlbWVudFxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gZ2V0IHRoZSBjdXJyZW50IHRyaWdnZXJFbGVtZW50XG5cdFx0ICogdmFyIHRyaWdnZXJFbGVtZW50ID0gc2NlbmUudHJpZ2dlckVsZW1lbnQoKTtcblx0XHQgKlxuXHRcdCAqIC8vIHNldCBhIG5ldyB0cmlnZ2VyRWxlbWVudCB1c2luZyBhIHNlbGVjdG9yXG5cdFx0ICogc2NlbmUudHJpZ2dlckVsZW1lbnQoXCIjdHJpZ2dlclwiKTtcblx0XHQgKiAvLyBzZXQgYSBuZXcgdHJpZ2dlckVsZW1lbnQgdXNpbmcgYSBET00gb2JqZWN0XG5cdFx0ICogc2NlbmUudHJpZ2dlckVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmlnZ2VyXCIpKTtcblx0XHQgKlxuXHRcdCAqIEBmaXJlcyB7QGxpbmsgU2NlbmUuY2hhbmdlfSwgd2hlbiB1c2VkIGFzIHNldHRlclxuXHRcdCAqIEBwYXJhbSB7KHN0cmluZ3xvYmplY3QpfSBbbmV3VHJpZ2dlckVsZW1lbnRdIC0gVGhlIG5ldyB0cmlnZ2VyIGVsZW1lbnQgZm9yIHRoZSBzY2VuZS5cblx0XHQgKiBAcmV0dXJucyB7KHN0cmluZ3xvYmplY3QpfSBgZ2V0YCAtICBDdXJyZW50IHRyaWdnZXJFbGVtZW50LlxuXHRcdCAqIEByZXR1cm5zIHtTY2VuZX0gYHNldGAgLSAgUGFyZW50IG9iamVjdCBmb3IgY2hhaW5pbmcuXG5cdFx0ICovXG5cblx0XHQvKipcblx0XHQgKiAqKkdldCoqIG9yICoqU2V0KiogdGhlIHRyaWdnZXJIb29rIG9wdGlvbiB2YWx1ZS5cblx0XHQgKiBAbWV0aG9kIFNjcm9sbE1hZ2ljLlNjZW5lI3RyaWdnZXJIb29rXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiAvLyBnZXQgdGhlIGN1cnJlbnQgdHJpZ2dlckhvb2sgdmFsdWVcblx0XHQgKiB2YXIgdHJpZ2dlckhvb2sgPSBzY2VuZS50cmlnZ2VySG9vaygpO1xuXHRcdCAqXG5cdFx0ICogLy8gc2V0IGEgbmV3IHRyaWdnZXJIb29rIHVzaW5nIGEgc3RyaW5nXG5cdFx0ICogc2NlbmUudHJpZ2dlckhvb2soXCJvbkxlYXZlXCIpO1xuXHRcdCAqIC8vIHNldCBhIG5ldyB0cmlnZ2VySG9vayB1c2luZyBhIG51bWJlclxuXHRcdCAqIHNjZW5lLnRyaWdnZXJIb29rKDAuNyk7XG5cdFx0ICpcblx0XHQgKiBAZmlyZXMge0BsaW5rIFNjZW5lLmNoYW5nZX0sIHdoZW4gdXNlZCBhcyBzZXR0ZXJcblx0XHQgKiBAZmlyZXMge0BsaW5rIFNjZW5lLnNoaWZ0fSwgd2hlbiB1c2VkIGFzIHNldHRlclxuXHRcdCAqIEBwYXJhbSB7KG51bWJlcnxzdHJpbmcpfSBbbmV3VHJpZ2dlckhvb2tdIC0gVGhlIG5ldyB0cmlnZ2VySG9vayBvZiB0aGUgc2NlbmUuIFNlZSB7QGxpbmsgU2NlbmV9IHBhcmFtZXRlciBkZXNjcmlwdGlvbiBmb3IgdmFsdWUgb3B0aW9ucy5cblx0XHQgKiBAcmV0dXJucyB7bnVtYmVyfSBgZ2V0YCAtICBDdXJyZW50IHRyaWdnZXJIb29rIChBTFdBWVMgbnVtZXJpY2FsKS5cblx0XHQgKiBAcmV0dXJucyB7U2NlbmV9IGBzZXRgIC0gIFBhcmVudCBvYmplY3QgZm9yIGNoYWluaW5nLlxuXHRcdCAqL1xuXG5cdFx0LyoqXG5cdFx0ICogKipHZXQqKiBvciAqKlNldCoqIHRoZSByZXZlcnNlIG9wdGlvbiB2YWx1ZS5cblx0XHQgKiBAbWV0aG9kIFNjcm9sbE1hZ2ljLlNjZW5lI3JldmVyc2Vcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIGdldCB0aGUgY3VycmVudCByZXZlcnNlIG9wdGlvblxuXHRcdCAqIHZhciByZXZlcnNlID0gc2NlbmUucmV2ZXJzZSgpO1xuXHRcdCAqXG5cdFx0ICogLy8gc2V0IG5ldyByZXZlcnNlIG9wdGlvblxuXHRcdCAqIHNjZW5lLnJldmVyc2UoZmFsc2UpO1xuXHRcdCAqXG5cdFx0ICogQGZpcmVzIHtAbGluayBTY2VuZS5jaGFuZ2V9LCB3aGVuIHVzZWQgYXMgc2V0dGVyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbbmV3UmV2ZXJzZV0gLSBUaGUgbmV3IHJldmVyc2Ugc2V0dGluZyBvZiB0aGUgc2NlbmUuXG5cdFx0ICogQHJldHVybnMge2Jvb2xlYW59IGBnZXRgIC0gIEN1cnJlbnQgcmV2ZXJzZSBvcHRpb24gdmFsdWUuXG5cdFx0ICogQHJldHVybnMge1NjZW5lfSBgc2V0YCAtICBQYXJlbnQgb2JqZWN0IGZvciBjaGFpbmluZy5cblx0XHQgKi9cblxuXHRcdC8qKlxuXHRcdCAqICoqR2V0Kiogb3IgKipTZXQqKiB0aGUgbG9nbGV2ZWwgb3B0aW9uIHZhbHVlLlxuXHRcdCAqIEBtZXRob2QgU2Nyb2xsTWFnaWMuU2NlbmUjbG9nbGV2ZWxcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIGdldCB0aGUgY3VycmVudCBsb2dsZXZlbFxuXHRcdCAqIHZhciBsb2dsZXZlbCA9IHNjZW5lLmxvZ2xldmVsKCk7XG5cdFx0ICpcblx0XHQgKiAvLyBzZXQgbmV3IGxvZ2xldmVsXG5cdFx0ICogc2NlbmUubG9nbGV2ZWwoMyk7XG5cdFx0ICpcblx0XHQgKiBAZmlyZXMge0BsaW5rIFNjZW5lLmNoYW5nZX0sIHdoZW4gdXNlZCBhcyBzZXR0ZXJcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gW25ld0xvZ2xldmVsXSAtIFRoZSBuZXcgbG9nbGV2ZWwgc2V0dGluZyBvZiB0aGUgc2NlbmUuIGBbMC0zXWBcblx0XHQgKiBAcmV0dXJucyB7bnVtYmVyfSBgZ2V0YCAtICBDdXJyZW50IGxvZ2xldmVsLlxuXHRcdCAqIEByZXR1cm5zIHtTY2VuZX0gYHNldGAgLSAgUGFyZW50IG9iamVjdCBmb3IgY2hhaW5pbmcuXG5cdFx0ICovXG5cblx0XHQvKipcblx0XHQgKiAqKkdldCoqIHRoZSBhc3NvY2lhdGVkIGNvbnRyb2xsZXIuXG5cdFx0ICogQG1ldGhvZCBTY3JvbGxNYWdpYy5TY2VuZSNjb250cm9sbGVyXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiAvLyBnZXQgdGhlIGNvbnRyb2xsZXIgb2YgYSBzY2VuZVxuXHRcdCAqIHZhciBjb250cm9sbGVyID0gc2NlbmUuY29udHJvbGxlcigpO1xuXHRcdCAqXG5cdFx0ICogQHJldHVybnMge1Njcm9sbE1hZ2ljLkNvbnRyb2xsZXJ9IFBhcmVudCBjb250cm9sbGVyIG9yIGB1bmRlZmluZWRgXG5cdFx0ICovXG5cdFx0dGhpcy5jb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIF9jb250cm9sbGVyO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiAqKkdldCoqIHRoZSBjdXJyZW50IHN0YXRlLlxuXHRcdCAqIEBtZXRob2QgU2Nyb2xsTWFnaWMuU2NlbmUjc3RhdGVcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIGdldCB0aGUgY3VycmVudCBzdGF0ZVxuXHRcdCAqIHZhciBzdGF0ZSA9IHNjZW5lLnN0YXRlKCk7XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfSBgXCJCRUZPUkVcImAsIGBcIkRVUklOR1wiYCBvciBgXCJBRlRFUlwiYFxuXHRcdCAqL1xuXHRcdHRoaXMuc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gX3N0YXRlO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiAqKkdldCoqIHRoZSBjdXJyZW50IHNjcm9sbCBvZmZzZXQgZm9yIHRoZSBzdGFydCBvZiB0aGUgc2NlbmUuICBcblx0XHQgKiBNaW5kLCB0aGF0IHRoZSBzY3JvbGxPZmZzZXQgaXMgcmVsYXRlZCB0byB0aGUgc2l6ZSBvZiB0aGUgY29udGFpbmVyLCBpZiBgdHJpZ2dlckhvb2tgIGlzIGJpZ2dlciB0aGFuIGAwYCAob3IgYFwib25MZWF2ZVwiYCkuICBcblx0XHQgKiBUaGlzIG1lYW5zLCB0aGF0IHJlc2l6aW5nIHRoZSBjb250YWluZXIgb3IgY2hhbmdpbmcgdGhlIGB0cmlnZ2VySG9va2Agd2lsbCBpbmZsdWVuY2UgdGhlIHNjZW5lJ3Mgc3RhcnQgb2Zmc2V0LlxuXHRcdCAqIEBtZXRob2QgU2Nyb2xsTWFnaWMuU2NlbmUjc2Nyb2xsT2Zmc2V0XG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiAvLyBnZXQgdGhlIGN1cnJlbnQgc2Nyb2xsIG9mZnNldCBmb3IgdGhlIHN0YXJ0IGFuZCBlbmQgb2YgdGhlIHNjZW5lLlxuXHRcdCAqIHZhciBzdGFydCA9IHNjZW5lLnNjcm9sbE9mZnNldCgpO1xuXHRcdCAqIHZhciBlbmQgPSBzY2VuZS5zY3JvbGxPZmZzZXQoKSArIHNjZW5lLmR1cmF0aW9uKCk7XG5cdFx0ICogY29uc29sZS5sb2coXCJ0aGUgc2NlbmUgc3RhcnRzIGF0XCIsIHN0YXJ0LCBcImFuZCBlbmRzIGF0XCIsIGVuZCk7XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgc2Nyb2xsIG9mZnNldCAob2YgdGhlIGNvbnRhaW5lcikgYXQgd2hpY2ggdGhlIHNjZW5lIHdpbGwgdHJpZ2dlci4gWSB2YWx1ZSBmb3IgdmVydGljYWwgYW5kIFggdmFsdWUgZm9yIGhvcml6b250YWwgc2Nyb2xscy5cblx0XHQgKi9cblx0XHR0aGlzLnNjcm9sbE9mZnNldCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBfc2Nyb2xsT2Zmc2V0LnN0YXJ0O1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiAqKkdldCoqIHRoZSB0cmlnZ2VyIHBvc2l0aW9uIG9mIHRoZSBzY2VuZSAoaW5jbHVkaW5nIHRoZSB2YWx1ZSBvZiB0aGUgYG9mZnNldGAgb3B0aW9uKS4gIFxuXHRcdCAqIEBtZXRob2QgU2Nyb2xsTWFnaWMuU2NlbmUjdHJpZ2dlclBvc2l0aW9uXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiAvLyBnZXQgdGhlIHNjZW5lJ3MgdHJpZ2dlciBwb3NpdGlvblxuXHRcdCAqIHZhciB0cmlnZ2VyUG9zaXRpb24gPSBzY2VuZS50cmlnZ2VyUG9zaXRpb24oKTtcblx0XHQgKlxuXHRcdCAqIEByZXR1cm5zIHtudW1iZXJ9IFN0YXJ0IHBvc2l0aW9uIG9mIHRoZSBzY2VuZS4gVG9wIHBvc2l0aW9uIHZhbHVlIGZvciB2ZXJ0aWNhbCBhbmQgbGVmdCBwb3NpdGlvbiB2YWx1ZSBmb3IgaG9yaXpvbnRhbCBzY3JvbGxzLlxuXHRcdCAqL1xuXHRcdHRoaXMudHJpZ2dlclBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHBvcyA9IF9vcHRpb25zLm9mZnNldDsgLy8gdGhlIG9mZnNldCBpcyB0aGUgYmFzaXNcblx0XHRcdGlmIChfY29udHJvbGxlcikge1xuXHRcdFx0XHQvLyBnZXQgdGhlIHRyaWdnZXIgcG9zaXRpb25cblx0XHRcdFx0aWYgKF9vcHRpb25zLnRyaWdnZXJFbGVtZW50KSB7XG5cdFx0XHRcdFx0Ly8gRWxlbWVudCBhcyB0cmlnZ2VyXG5cdFx0XHRcdFx0cG9zICs9IF90cmlnZ2VyUG9zO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSB0cmlnZ2VySG9vayB0byBzdGFydCBhdCB0aGUgYmVnaW5uaW5nXG5cdFx0XHRcdFx0cG9zICs9IF9jb250cm9sbGVyLmluZm8oXCJzaXplXCIpICogU2NlbmUudHJpZ2dlckhvb2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHBvcztcblx0XHR9O1xuXG5cdFx0dmFyXG5cdFx0X3BpbiwgX3Bpbk9wdGlvbnM7XG5cblx0XHRTY2VuZS5vbihcInNoaWZ0LmludGVybmFsXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR2YXIgZHVyYXRpb25DaGFuZ2VkID0gZS5yZWFzb24gPT09IFwiZHVyYXRpb25cIjtcblx0XHRcdGlmICgoX3N0YXRlID09PSBTQ0VORV9TVEFURV9BRlRFUiAmJiBkdXJhdGlvbkNoYW5nZWQpIHx8IChfc3RhdGUgPT09IFNDRU5FX1NUQVRFX0RVUklORyAmJiBfb3B0aW9ucy5kdXJhdGlvbiA9PT0gMCkpIHtcblx0XHRcdFx0Ly8gaWYgW2R1cmF0aW9uIGNoYW5nZWQgYWZ0ZXIgYSBzY2VuZSAoaW5zaWRlIHNjZW5lIHByb2dyZXNzIHVwZGF0ZXMgcGluIHBvc2l0aW9uKV0gb3IgW2R1cmF0aW9uIGlzIDAsIHdlIGFyZSBpbiBwaW4gcGhhc2UgYW5kIHNvbWUgb3RoZXIgdmFsdWUgY2hhbmdlZF0uXG5cdFx0XHRcdHVwZGF0ZVBpblN0YXRlKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZHVyYXRpb25DaGFuZ2VkKSB7XG5cdFx0XHRcdHVwZGF0ZVBpbkRpbWVuc2lvbnMoKTtcblx0XHRcdH1cblx0XHR9KS5vbihcInByb2dyZXNzLmludGVybmFsXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR1cGRhdGVQaW5TdGF0ZSgpO1xuXHRcdH0pLm9uKFwiYWRkLmludGVybmFsXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR1cGRhdGVQaW5EaW1lbnNpb25zKCk7XG5cdFx0fSkub24oXCJkZXN0cm95LmludGVybmFsXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRTY2VuZS5yZW1vdmVQaW4oZS5yZXNldCk7XG5cdFx0fSk7XG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlIHRoZSBwaW4gc3RhdGUuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgdXBkYXRlUGluU3RhdGUgPSBmdW5jdGlvbiAoZm9yY2VVbnBpbikge1xuXHRcdFx0aWYgKF9waW4gJiYgX2NvbnRyb2xsZXIpIHtcblx0XHRcdFx0dmFyXG5cdFx0XHRcdGNvbnRhaW5lckluZm8gPSBfY29udHJvbGxlci5pbmZvKCksXG5cdFx0XHRcdFx0cGluVGFyZ2V0ID0gX3Bpbk9wdGlvbnMuc3BhY2VyLmZpcnN0Q2hpbGQ7IC8vIG1heSBiZSBwaW4gZWxlbWVudCBvciBhbm90aGVyIHNwYWNlciwgaWYgY2FzY2FkaW5nIHBpbnNcblx0XHRcdFx0aWYgKCFmb3JjZVVucGluICYmIF9zdGF0ZSA9PT0gU0NFTkVfU1RBVEVfRFVSSU5HKSB7IC8vIGR1cmluZyBzY2VuZSBvciBpZiBkdXJhdGlvbiBpcyAwIGFuZCB3ZSBhcmUgcGFzdCB0aGUgdHJpZ2dlclxuXHRcdFx0XHRcdC8vIHBpbm5lZCBzdGF0ZVxuXHRcdFx0XHRcdGlmIChfdXRpbC5jc3MocGluVGFyZ2V0LCBcInBvc2l0aW9uXCIpICE9IFwiZml4ZWRcIikge1xuXHRcdFx0XHRcdFx0Ly8gY2hhbmdlIHN0YXRlIGJlZm9yZSB1cGRhdGluZyBwaW4gc3BhY2VyIChwb3NpdGlvbiBjaGFuZ2VzIGR1ZSB0byBmaXhlZCBjb2xsYXBzaW5nIG1pZ2h0IG9jY3VyLilcblx0XHRcdFx0XHRcdF91dGlsLmNzcyhwaW5UYXJnZXQsIHtcblx0XHRcdFx0XHRcdFx0XCJwb3NpdGlvblwiOiBcImZpeGVkXCJcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0Ly8gdXBkYXRlIHBpbiBzcGFjZXJcblx0XHRcdFx0XHRcdHVwZGF0ZVBpbkRpbWVuc2lvbnMoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXJcblx0XHRcdFx0XHRmaXhlZFBvcyA9IF91dGlsLmdldC5vZmZzZXQoX3Bpbk9wdGlvbnMuc3BhY2VyLCB0cnVlKSxcblx0XHRcdFx0XHRcdC8vIGdldCB2aWV3cG9ydCBwb3NpdGlvbiBvZiBzcGFjZXJcblx0XHRcdFx0XHRcdHNjcm9sbERpc3RhbmNlID0gX29wdGlvbnMucmV2ZXJzZSB8fCBfb3B0aW9ucy5kdXJhdGlvbiA9PT0gMCA/IGNvbnRhaW5lckluZm8uc2Nyb2xsUG9zIC0gX3Njcm9sbE9mZnNldC5zdGFydCAvLyBxdWlja2VyXG5cdFx0XHRcdFx0XHQ6IE1hdGgucm91bmQoX3Byb2dyZXNzICogX29wdGlvbnMuZHVyYXRpb24gKiAxMCkgLyAxMDsgLy8gaWYgbm8gcmV2ZXJzZSBhbmQgZHVyaW5nIHBpbiB0aGUgcG9zaXRpb24gbmVlZHMgdG8gYmUgcmVjYWxjdWxhdGVkIHVzaW5nIHRoZSBwcm9ncmVzc1xuXHRcdFx0XHRcdC8vIGFkZCBzY3JvbGxEaXN0YW5jZVxuXHRcdFx0XHRcdGZpeGVkUG9zW2NvbnRhaW5lckluZm8udmVydGljYWwgPyBcInRvcFwiIDogXCJsZWZ0XCJdICs9IHNjcm9sbERpc3RhbmNlO1xuXG5cdFx0XHRcdFx0Ly8gc2V0IG5ldyB2YWx1ZXNcblx0XHRcdFx0XHRfdXRpbC5jc3MoX3Bpbk9wdGlvbnMuc3BhY2VyLmZpcnN0Q2hpbGQsIHtcblx0XHRcdFx0XHRcdHRvcDogZml4ZWRQb3MudG9wLFxuXHRcdFx0XHRcdFx0bGVmdDogZml4ZWRQb3MubGVmdFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHVucGlubmVkIHN0YXRlXG5cdFx0XHRcdFx0dmFyXG5cdFx0XHRcdFx0bmV3Q1NTID0ge1xuXHRcdFx0XHRcdFx0cG9zaXRpb246IF9waW5PcHRpb25zLmluRmxvdyA/IFwicmVsYXRpdmVcIiA6IFwiYWJzb2x1dGVcIixcblx0XHRcdFx0XHRcdHRvcDogMCxcblx0XHRcdFx0XHRcdGxlZnQ6IDBcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0Y2hhbmdlID0gX3V0aWwuY3NzKHBpblRhcmdldCwgXCJwb3NpdGlvblwiKSAhPSBuZXdDU1MucG9zaXRpb247XG5cblx0XHRcdFx0XHRpZiAoIV9waW5PcHRpb25zLnB1c2hGb2xsb3dlcnMpIHtcblx0XHRcdFx0XHRcdG5ld0NTU1tjb250YWluZXJJbmZvLnZlcnRpY2FsID8gXCJ0b3BcIiA6IFwibGVmdFwiXSA9IF9vcHRpb25zLmR1cmF0aW9uICogX3Byb2dyZXNzO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoX29wdGlvbnMuZHVyYXRpb24gPiAwKSB7IC8vIG9ubHkgY29uY2VybnMgc2NlbmVzIHdpdGggZHVyYXRpb25cblx0XHRcdFx0XHRcdGlmIChfc3RhdGUgPT09IFNDRU5FX1NUQVRFX0FGVEVSICYmIHBhcnNlRmxvYXQoX3V0aWwuY3NzKF9waW5PcHRpb25zLnNwYWNlciwgXCJwYWRkaW5nLXRvcFwiKSkgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0Y2hhbmdlID0gdHJ1ZTsgLy8gaWYgaW4gYWZ0ZXIgc3RhdGUgYnV0IGhhdmVudCB1cGRhdGVkIHNwYWNlciB5ZXQgKGp1bXBlZCBwYXN0IHBpbilcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoX3N0YXRlID09PSBTQ0VORV9TVEFURV9CRUZPUkUgJiYgcGFyc2VGbG9hdChfdXRpbC5jc3MoX3Bpbk9wdGlvbnMuc3BhY2VyLCBcInBhZGRpbmctYm90dG9tXCIpKSA9PT0gMCkgeyAvLyBiZWZvcmVcblx0XHRcdFx0XHRcdFx0Y2hhbmdlID0gdHJ1ZTsgLy8ganVtcGVkIHBhc3QgZml4ZWQgc3RhdGUgdXB3YXJkIGRpcmVjdGlvblxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBzZXQgbmV3IHZhbHVlc1xuXHRcdFx0XHRcdF91dGlsLmNzcyhwaW5UYXJnZXQsIG5ld0NTUyk7XG5cdFx0XHRcdFx0aWYgKGNoYW5nZSkge1xuXHRcdFx0XHRcdFx0Ly8gdXBkYXRlIHBpbiBzcGFjZXIgaWYgc3RhdGUgY2hhbmdlZFxuXHRcdFx0XHRcdFx0dXBkYXRlUGluRGltZW5zaW9ucygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBVcGRhdGUgdGhlIHBpbiBzcGFjZXIgYW5kL29yIGVsZW1lbnQgc2l6ZS5cblx0XHQgKiBUaGUgc2l6ZSBvZiB0aGUgc3BhY2VyIG5lZWRzIHRvIGJlIHVwZGF0ZWQgd2hlbmV2ZXIgdGhlIGR1cmF0aW9uIG9mIHRoZSBzY2VuZSBjaGFuZ2VzLCBpZiBpdCBpcyB0byBwdXNoIGRvd24gZm9sbG93aW5nIGVsZW1lbnRzLlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIHVwZGF0ZVBpbkRpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoX3BpbiAmJiBfY29udHJvbGxlciAmJiBfcGluT3B0aW9ucy5pbkZsb3cpIHsgLy8gbm8gc3BhY2VycmVzaXplLCBpZiBvcmlnaW5hbCBwb3NpdGlvbiBpcyBhYnNvbHV0ZVxuXHRcdFx0XHR2YXJcblx0XHRcdFx0YWZ0ZXIgPSAoX3N0YXRlID09PSBTQ0VORV9TVEFURV9BRlRFUiksXG5cdFx0XHRcdFx0YmVmb3JlID0gKF9zdGF0ZSA9PT0gU0NFTkVfU1RBVEVfQkVGT1JFKSxcblx0XHRcdFx0XHRkdXJpbmcgPSAoX3N0YXRlID09PSBTQ0VORV9TVEFURV9EVVJJTkcpLFxuXHRcdFx0XHRcdHZlcnRpY2FsID0gX2NvbnRyb2xsZXIuaW5mbyhcInZlcnRpY2FsXCIpLFxuXHRcdFx0XHRcdHBpblRhcmdldCA9IF9waW5PcHRpb25zLnNwYWNlci5maXJzdENoaWxkLFxuXHRcdFx0XHRcdC8vIHVzdWFsbHkgdGhlIHBpbmVkIGVsZW1lbnQgYnV0IGNhbiBhbHNvIGJlIGFub3RoZXIgc3BhY2VyIChjYXNjYWRlZCBwaW5zKVxuXHRcdFx0XHRcdG1hcmdpbkNvbGxhcHNlID0gX3V0aWwuaXNNYXJnaW5Db2xsYXBzZVR5cGUoX3V0aWwuY3NzKF9waW5PcHRpb25zLnNwYWNlciwgXCJkaXNwbGF5XCIpKSxcblx0XHRcdFx0XHRjc3MgPSB7fTtcblxuXHRcdFx0XHQvLyBzZXQgbmV3IHNpemVcblx0XHRcdFx0Ly8gaWYgcmVsc2l6ZTogc3BhY2VyIC0+IHBpbiB8IGVsc2U6IHBpbiAtPiBzcGFjZXJcblx0XHRcdFx0aWYgKF9waW5PcHRpb25zLnJlbFNpemUud2lkdGggfHwgX3Bpbk9wdGlvbnMucmVsU2l6ZS5hdXRvRnVsbFdpZHRoKSB7XG5cdFx0XHRcdFx0aWYgKGR1cmluZykge1xuXHRcdFx0XHRcdFx0X3V0aWwuY3NzKF9waW4sIHtcblx0XHRcdFx0XHRcdFx0XCJ3aWR0aFwiOiBfdXRpbC5nZXQud2lkdGgoX3Bpbk9wdGlvbnMuc3BhY2VyKVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF91dGlsLmNzcyhfcGluLCB7XG5cdFx0XHRcdFx0XHRcdFwid2lkdGhcIjogXCIxMDAlXCJcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBtaW53aWR0aCBpcyBuZWVkZWQgZm9yIGNhc2NhZGVkIHBpbnMuXG5cdFx0XHRcdFx0Y3NzW1wibWluLXdpZHRoXCJdID0gX3V0aWwuZ2V0LndpZHRoKHZlcnRpY2FsID8gX3BpbiA6IHBpblRhcmdldCwgdHJ1ZSwgdHJ1ZSk7XG5cdFx0XHRcdFx0Y3NzLndpZHRoID0gZHVyaW5nID8gY3NzW1wibWluLXdpZHRoXCJdIDogXCJhdXRvXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKF9waW5PcHRpb25zLnJlbFNpemUuaGVpZ2h0KSB7XG5cdFx0XHRcdFx0aWYgKGR1cmluZykge1xuXHRcdFx0XHRcdFx0Ly8gdGhlIG9ubHkgcGFkZGluZyB0aGUgc3BhY2VyIHNob3VsZCBldmVyIGluY2x1ZGUgaXMgdGhlIGR1cmF0aW9uIChpZiBwdXNoRm9sbG93ZXJzID0gdHJ1ZSksIHNvIHdlIG5lZWQgdG8gc3Vic3RyYWN0IHRoYXQuXG5cdFx0XHRcdFx0XHRfdXRpbC5jc3MoX3Bpbiwge1xuXHRcdFx0XHRcdFx0XHRcImhlaWdodFwiOiBfdXRpbC5nZXQuaGVpZ2h0KF9waW5PcHRpb25zLnNwYWNlcikgLSAoX3Bpbk9wdGlvbnMucHVzaEZvbGxvd2VycyA/IF9vcHRpb25zLmR1cmF0aW9uIDogMClcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfdXRpbC5jc3MoX3Bpbiwge1xuXHRcdFx0XHRcdFx0XHRcImhlaWdodFwiOiBcIjEwMCVcIlxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIG1hcmdpbiBpcyBvbmx5IGluY2x1ZGVkIGlmIGl0J3MgYSBjYXNjYWRlZCBwaW4gdG8gcmVzb2x2ZSBhbiBJRTkgYnVnXG5cdFx0XHRcdFx0Y3NzW1wibWluLWhlaWdodFwiXSA9IF91dGlsLmdldC5oZWlnaHQodmVydGljYWwgPyBwaW5UYXJnZXQgOiBfcGluLCB0cnVlLCAhbWFyZ2luQ29sbGFwc2UpOyAvLyBuZWVkZWQgZm9yIGNhc2NhZGluZyBwaW5zXG5cdFx0XHRcdFx0Y3NzLmhlaWdodCA9IGR1cmluZyA/IGNzc1tcIm1pbi1oZWlnaHRcIl0gOiBcImF1dG9cIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGFkZCBzcGFjZSBmb3IgZHVyYXRpb24gaWYgcHVzaEZvbGxvd2VycyBpcyB0cnVlXG5cdFx0XHRcdGlmIChfcGluT3B0aW9ucy5wdXNoRm9sbG93ZXJzKSB7XG5cdFx0XHRcdFx0Y3NzW1wicGFkZGluZ1wiICsgKHZlcnRpY2FsID8gXCJUb3BcIiA6IFwiTGVmdFwiKV0gPSBfb3B0aW9ucy5kdXJhdGlvbiAqIF9wcm9ncmVzcztcblx0XHRcdFx0XHRjc3NbXCJwYWRkaW5nXCIgKyAodmVydGljYWwgPyBcIkJvdHRvbVwiIDogXCJSaWdodFwiKV0gPSBfb3B0aW9ucy5kdXJhdGlvbiAqICgxIC0gX3Byb2dyZXNzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfdXRpbC5jc3MoX3Bpbk9wdGlvbnMuc3BhY2VyLCBjc3MpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBVcGRhdGVzIHRoZSBQaW4gc3RhdGUgKGluIGNlcnRhaW4gc2NlbmFyaW9zKVxuXHRcdCAqIElmIHRoZSBjb250cm9sbGVyIGNvbnRhaW5lciBpcyBub3QgdGhlIGRvY3VtZW50IGFuZCB3ZSBhcmUgbWlkLXBpbi1waGFzZSBzY3JvbGxpbmcgb3IgcmVzaXppbmcgdGhlIG1haW4gZG9jdW1lbnQgY2FuIHJlc3VsdCB0byB3cm9uZyBwaW4gcG9zaXRpb25zLlxuXHRcdCAqIFNvIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIHJlc2l6ZSBhbmQgc2Nyb2xsIG9mIHRoZSBkb2N1bWVudC5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciB1cGRhdGVQaW5JbkNvbnRhaW5lciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChfY29udHJvbGxlciAmJiBfcGluICYmIF9zdGF0ZSA9PT0gU0NFTkVfU1RBVEVfRFVSSU5HICYmICFfY29udHJvbGxlci5pbmZvKFwiaXNEb2N1bWVudFwiKSkge1xuXHRcdFx0XHR1cGRhdGVQaW5TdGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBVcGRhdGVzIHRoZSBQaW4gc3BhY2VyIHNpemUgc3RhdGUgKGluIGNlcnRhaW4gc2NlbmFyaW9zKVxuXHRcdCAqIElmIGNvbnRhaW5lciBpcyByZXNpemVkIGR1cmluZyBwaW4gYW5kIHJlbGF0aXZlbHkgc2l6ZWQgdGhlIHNpemUgb2YgdGhlIHBpbiBtaWdodCBuZWVkIHRvIGJlIHVwZGF0ZWQuLi5cblx0XHQgKiBTbyB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiByZXNpemUgb2YgdGhlIGNvbnRhaW5lci5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciB1cGRhdGVSZWxhdGl2ZVBpblNwYWNlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChfY29udHJvbGxlciAmJiBfcGluICYmIC8vIHdlbGwsIGR1aFxuXHRcdFx0X3N0YXRlID09PSBTQ0VORV9TVEFURV9EVVJJTkcgJiYgLy8gZWxlbWVudCBpbiBwaW5uZWQgc3RhdGU/XG5cdFx0XHQoIC8vIGlzIHdpZHRoIG9yIGhlaWdodCByZWxhdGl2ZWx5IHNpemVkLCBidXQgbm90IGluIHJlbGF0aW9uIHRvIGJvZHk/IHRoZW4gd2UgbmVlZCB0byByZWNhbGMuXG5cdFx0XHQoKF9waW5PcHRpb25zLnJlbFNpemUud2lkdGggfHwgX3Bpbk9wdGlvbnMucmVsU2l6ZS5hdXRvRnVsbFdpZHRoKSAmJiBfdXRpbC5nZXQud2lkdGgod2luZG93KSAhPSBfdXRpbC5nZXQud2lkdGgoX3Bpbk9wdGlvbnMuc3BhY2VyLnBhcmVudE5vZGUpKSB8fCAoX3Bpbk9wdGlvbnMucmVsU2l6ZS5oZWlnaHQgJiYgX3V0aWwuZ2V0LmhlaWdodCh3aW5kb3cpICE9IF91dGlsLmdldC5oZWlnaHQoX3Bpbk9wdGlvbnMuc3BhY2VyLnBhcmVudE5vZGUpKSkpIHtcblx0XHRcdFx0dXBkYXRlUGluRGltZW5zaW9ucygpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBJcyBjYWxsZWQsIHdoZW4gdGhlIG1vdXNld2hlbCBpcyB1c2VkIHdoaWxlIG92ZXIgYSBwaW5uZWQgZWxlbWVudCBpbnNpZGUgYSBkaXYgY29udGFpbmVyLlxuXHRcdCAqIElmIHRoZSBzY2VuZSBpcyBpbiBmaXhlZCBzdGF0ZSBzY3JvbGwgZXZlbnRzIHdvdWxkIGJlIGNvdW50ZWQgdG93YXJkcyB0aGUgYm9keS4gVGhpcyBmb3J3YXJkcyB0aGUgZXZlbnQgdG8gdGhlIHNjcm9sbCBjb250YWluZXIuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgb25Nb3VzZXdoZWVsT3ZlclBpbiA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRpZiAoX2NvbnRyb2xsZXIgJiYgX3BpbiAmJiBfc3RhdGUgPT09IFNDRU5FX1NUQVRFX0RVUklORyAmJiAhX2NvbnRyb2xsZXIuaW5mbyhcImlzRG9jdW1lbnRcIikpIHsgLy8gaW4gcGluIHN0YXRlXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0X2NvbnRyb2xsZXIuX3NldFNjcm9sbFBvcyhfY29udHJvbGxlci5pbmZvKFwic2Nyb2xsUG9zXCIpIC0gKChlLndoZWVsRGVsdGEgfHwgZVtfY29udHJvbGxlci5pbmZvKFwidmVydGljYWxcIikgPyBcIndoZWVsRGVsdGFZXCIgOiBcIndoZWVsRGVsdGFYXCJdKSAvIDMgfHwgLWUuZGV0YWlsICogMzApKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUGluIGFuIGVsZW1lbnQgZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGUgdHdlZW4uICBcblx0XHQgKiBJZiB0aGUgc2NlbmUgZHVyYXRpb24gaXMgMCB0aGUgZWxlbWVudCB3aWxsIG9ubHkgYmUgdW5waW5uZWQsIGlmIHRoZSB1c2VyIHNjcm9sbHMgYmFjayBwYXN0IHRoZSBzdGFydCBwb3NpdGlvbi4gIFxuXHRcdCAqIE1ha2Ugc3VyZSBvbmx5IG9uZSBwaW4gaXMgYXBwbGllZCB0byBhbiBlbGVtZW50IGF0IHRoZSBzYW1lIHRpbWUuXG5cdFx0ICogQW4gZWxlbWVudCBjYW4gYmUgcGlubmVkIG11bHRpcGxlIHRpbWVzLCBidXQgb25seSBzdWNjZXNzaXZlbHkuXG5cdFx0ICogXyoqTk9URToqKiBUaGUgb3B0aW9uIGBwdXNoRm9sbG93ZXJzYCBoYXMgbm8gZWZmZWN0LCB3aGVuIHRoZSBzY2VuZSBkdXJhdGlvbiBpcyAwLl9cblx0XHQgKiBAbWV0aG9kIFNjcm9sbE1hZ2ljLlNjZW5lI3NldFBpblxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gcGluIGVsZW1lbnQgYW5kIHB1c2ggYWxsIGZvbGxvd2luZyBlbGVtZW50cyBkb3duIGJ5IHRoZSBhbW91bnQgb2YgdGhlIHBpbiBkdXJhdGlvbi5cblx0XHQgKiBzY2VuZS5zZXRQaW4oXCIjcGluXCIpO1xuXHRcdCAqXG5cdFx0ICogLy8gcGluIGVsZW1lbnQgYW5kIGtlZXBpbmcgYWxsIGZvbGxvd2luZyBlbGVtZW50cyBpbiB0aGVpciBwbGFjZS4gVGhlIHBpbm5lZCBlbGVtZW50IHdpbGwgbW92ZSBwYXN0IHRoZW0uXG5cdFx0ICogc2NlbmUuc2V0UGluKFwiI3BpblwiLCB7cHVzaEZvbGxvd2VyczogZmFsc2V9KTtcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7KHN0cmluZ3xvYmplY3QpfSBlbGVtZW50IC0gQSBTZWxlY3RvciB0YXJnZXRpbmcgYW4gZWxlbWVudCBvciBhIERPTSBvYmplY3QgdGhhdCBpcyBzdXBwb3NlZCB0byBiZSBwaW5uZWQuXG5cdFx0ICogQHBhcmFtIHtvYmplY3R9IFtzZXR0aW5nc10gLSBzZXR0aW5ncyBmb3IgdGhlIHBpblxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NldHRpbmdzLnB1c2hGb2xsb3dlcnM9dHJ1ZV0gLSBJZiBgdHJ1ZWAgZm9sbG93aW5nIGVsZW1lbnRzIHdpbGwgYmUgXCJwdXNoZWRcIiBkb3duIGZvciB0aGUgZHVyYXRpb24gb2YgdGhlIHBpbiwgaWYgYGZhbHNlYCB0aGUgcGlubmVkIGVsZW1lbnQgd2lsbCBqdXN0IHNjcm9sbCBwYXN0IHRoZW0uICBcblx0XHQgSWdub3JlZCwgd2hlbiBkdXJhdGlvbiBpcyBgMGAuXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IFtzZXR0aW5ncy5zcGFjZXJDbGFzcz1cInNjcm9sbG1hZ2ljLXBpbi1zcGFjZXJcIl0gLSBDbGFzc25hbWUgb2YgdGhlIHBpbiBzcGFjZXIgZWxlbWVudCwgd2hpY2ggaXMgdXNlZCB0byByZXBsYWNlIHRoZSBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybnMge1NjZW5lfSBQYXJlbnQgb2JqZWN0IGZvciBjaGFpbmluZy5cblx0XHQgKi9cblx0XHR0aGlzLnNldFBpbiA9IGZ1bmN0aW9uIChlbGVtZW50LCBzZXR0aW5ncykge1xuXHRcdFx0dmFyXG5cdFx0XHRkZWZhdWx0U2V0dGluZ3MgPSB7XG5cdFx0XHRcdHB1c2hGb2xsb3dlcnM6IHRydWUsXG5cdFx0XHRcdHNwYWNlckNsYXNzOiBcInNjcm9sbG1hZ2ljLXBpbi1zcGFjZXJcIlxuXHRcdFx0fTtcblx0XHRcdHNldHRpbmdzID0gX3V0aWwuZXh0ZW5kKHt9LCBkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcblxuXHRcdFx0Ly8gdmFsaWRhdGUgRWxlbWVudFxuXHRcdFx0ZWxlbWVudCA9IF91dGlsLmdldC5lbGVtZW50cyhlbGVtZW50KVswXTtcblx0XHRcdGlmICghZWxlbWVudCkge1xuXHRcdFx0XHRsb2coMSwgXCJFUlJPUiBjYWxsaW5nIG1ldGhvZCAnc2V0UGluKCknOiBJbnZhbGlkIHBpbiBlbGVtZW50IHN1cHBsaWVkLlwiKTtcblx0XHRcdFx0cmV0dXJuIFNjZW5lOyAvLyBjYW5jZWxcblx0XHRcdH0gZWxzZSBpZiAoX3V0aWwuY3NzKGVsZW1lbnQsIFwicG9zaXRpb25cIikgPT09IFwiZml4ZWRcIikge1xuXHRcdFx0XHRsb2coMSwgXCJFUlJPUiBjYWxsaW5nIG1ldGhvZCAnc2V0UGluKCknOiBQaW4gZG9lcyBub3Qgd29yayB3aXRoIGVsZW1lbnRzIHRoYXQgYXJlIHBvc2l0aW9uZWQgJ2ZpeGVkJy5cIik7XG5cdFx0XHRcdHJldHVybiBTY2VuZTsgLy8gY2FuY2VsXG5cdFx0XHR9XG5cblx0XHRcdGlmIChfcGluKSB7IC8vIHByZWV4aXN0aW5nIHBpbj9cblx0XHRcdFx0aWYgKF9waW4gPT09IGVsZW1lbnQpIHtcblx0XHRcdFx0XHQvLyBzYW1lIHBpbiB3ZSBhbHJlYWR5IGhhdmUgLT4gZG8gbm90aGluZ1xuXHRcdFx0XHRcdHJldHVybiBTY2VuZTsgLy8gY2FuY2VsXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8ga2lsbCBvbGQgcGluXG5cdFx0XHRcdFx0U2NlbmUucmVtb3ZlUGluKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdFx0X3BpbiA9IGVsZW1lbnQ7XG5cblx0XHRcdHZhclxuXHRcdFx0cGFyZW50RGlzcGxheSA9IF9waW4ucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5LFxuXHRcdFx0XHRib3VuZHNQYXJhbXMgPSBbXCJ0b3BcIiwgXCJsZWZ0XCIsIFwiYm90dG9tXCIsIFwicmlnaHRcIiwgXCJtYXJnaW5cIiwgXCJtYXJnaW5MZWZ0XCIsIFwibWFyZ2luUmlnaHRcIiwgXCJtYXJnaW5Ub3BcIiwgXCJtYXJnaW5Cb3R0b21cIl07XG5cblx0XHRcdF9waW4ucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyAvLyBoYWNrIHN0YXJ0IHRvIGZvcmNlIGNzcyB0byByZXR1cm4gc3R5bGVzaGVldCB2YWx1ZXMgaW5zdGVhZCBvZiBjYWxjdWxhdGVkIHB4IHZhbHVlcy5cblx0XHRcdHZhclxuXHRcdFx0aW5GbG93ID0gX3V0aWwuY3NzKF9waW4sIFwicG9zaXRpb25cIikgIT0gXCJhYnNvbHV0ZVwiLFxuXHRcdFx0XHRwaW5DU1MgPSBfdXRpbC5jc3MoX3BpbiwgYm91bmRzUGFyYW1zLmNvbmNhdChbXCJkaXNwbGF5XCJdKSksXG5cdFx0XHRcdHNpemVDU1MgPSBfdXRpbC5jc3MoX3BpbiwgW1wid2lkdGhcIiwgXCJoZWlnaHRcIl0pO1xuXHRcdFx0X3Bpbi5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSBwYXJlbnREaXNwbGF5OyAvLyBoYWNrIGVuZC5cblx0XHRcdGlmICghaW5GbG93ICYmIHNldHRpbmdzLnB1c2hGb2xsb3dlcnMpIHtcblx0XHRcdFx0bG9nKDIsIFwiV0FSTklORzogSWYgdGhlIHBpbm5lZCBlbGVtZW50IGlzIHBvc2l0aW9uZWQgYWJzb2x1dGVseSBwdXNoRm9sbG93ZXJzIHdpbGwgYmUgZGlzYWJsZWQuXCIpO1xuXHRcdFx0XHRzZXR0aW5ncy5wdXNoRm9sbG93ZXJzID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IC8vIHdhaXQgdW50aWwgYWxsIGZpbmlzaGVkLCBiZWNhdXNlIHdpdGggcmVzcG9uc2l2ZSBkdXJhdGlvbiBpdCB3aWxsIG9ubHkgYmUgc2V0IGFmdGVyIHNjZW5lIGlzIGFkZGVkIHRvIGNvbnRyb2xsZXJcblx0XHRcdFx0aWYgKF9waW4gJiYgX29wdGlvbnMuZHVyYXRpb24gPT09IDAgJiYgc2V0dGluZ3MucHVzaEZvbGxvd2Vycykge1xuXHRcdFx0XHRcdGxvZygyLCBcIldBUk5JTkc6IHB1c2hGb2xsb3dlcnMgPVwiLCB0cnVlLCBcImhhcyBubyBlZmZlY3QsIHdoZW4gc2NlbmUgZHVyYXRpb24gaXMgMC5cIik7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDApO1xuXG5cdFx0XHQvLyBjcmVhdGUgc3BhY2VyIGFuZCBpbnNlcnRcblx0XHRcdHZhclxuXHRcdFx0c3BhY2VyID0gX3Bpbi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSwgX3BpbiksXG5cdFx0XHRcdHNwYWNlckNTUyA9IF91dGlsLmV4dGVuZChwaW5DU1MsIHtcblx0XHRcdFx0XHRwb3NpdGlvbjogaW5GbG93ID8gXCJyZWxhdGl2ZVwiIDogXCJhYnNvbHV0ZVwiLFxuXHRcdFx0XHRcdGJveFNpemluZzogXCJjb250ZW50LWJveFwiLFxuXHRcdFx0XHRcdG1vekJveFNpemluZzogXCJjb250ZW50LWJveFwiLFxuXHRcdFx0XHRcdHdlYmtpdEJveFNpemluZzogXCJjb250ZW50LWJveFwiXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIWluRmxvdykgeyAvLyBjb3B5IHNpemUgaWYgcG9zaXRpb25lZCBhYnNvbHV0ZWx5LCB0byB3b3JrIGZvciBib3R0b20vcmlnaHQgcG9zaXRpb25lZCBlbGVtZW50cy5cblx0XHRcdFx0X3V0aWwuZXh0ZW5kKHNwYWNlckNTUywgX3V0aWwuY3NzKF9waW4sIFtcIndpZHRoXCIsIFwiaGVpZ2h0XCJdKSk7XG5cdFx0XHR9XG5cblx0XHRcdF91dGlsLmNzcyhzcGFjZXIsIHNwYWNlckNTUyk7XG5cdFx0XHRzcGFjZXIuc2V0QXR0cmlidXRlKFBJTl9TUEFDRVJfQVRUUklCVVRFLCBcIlwiKTtcblx0XHRcdF91dGlsLmFkZENsYXNzKHNwYWNlciwgc2V0dGluZ3Muc3BhY2VyQ2xhc3MpO1xuXG5cdFx0XHQvLyBzZXQgdGhlIHBpbiBPcHRpb25zXG5cdFx0XHRfcGluT3B0aW9ucyA9IHtcblx0XHRcdFx0c3BhY2VyOiBzcGFjZXIsXG5cdFx0XHRcdHJlbFNpemU6IHsgLy8gc2F2ZSBpZiBzaXplIGlzIGRlZmluZWQgdXNpbmcgJSB2YWx1ZXMuIGlmIHNvLCBoYW5kbGUgc3BhY2VyIHJlc2l6ZSBkaWZmZXJlbnRseS4uLlxuXHRcdFx0XHRcdHdpZHRoOiBzaXplQ1NTLndpZHRoLnNsaWNlKC0xKSA9PT0gXCIlXCIsXG5cdFx0XHRcdFx0aGVpZ2h0OiBzaXplQ1NTLmhlaWdodC5zbGljZSgtMSkgPT09IFwiJVwiLFxuXHRcdFx0XHRcdGF1dG9GdWxsV2lkdGg6IHNpemVDU1Mud2lkdGggPT09IFwiYXV0b1wiICYmIGluRmxvdyAmJiBfdXRpbC5pc01hcmdpbkNvbGxhcHNlVHlwZShwaW5DU1MuZGlzcGxheSlcblx0XHRcdFx0fSxcblx0XHRcdFx0cHVzaEZvbGxvd2Vyczogc2V0dGluZ3MucHVzaEZvbGxvd2Vycyxcblx0XHRcdFx0aW5GbG93OiBpbkZsb3csXG5cdFx0XHRcdC8vIHN0b3JlcyBpZiB0aGUgZWxlbWVudCB0YWtlcyB1cCBzcGFjZSBpbiB0aGUgZG9jdW1lbnQgZmxvd1xuXHRcdFx0fTtcblxuXHRcdFx0aWYgKCFfcGluLl9fX29yaWdTdHlsZSkge1xuXHRcdFx0XHRfcGluLl9fX29yaWdTdHlsZSA9IHt9O1xuXHRcdFx0XHR2YXJcblx0XHRcdFx0cGluSW5saW5lQ1NTID0gX3Bpbi5zdHlsZSxcblx0XHRcdFx0XHRjb3B5U3R5bGVzID0gYm91bmRzUGFyYW1zLmNvbmNhdChbXCJ3aWR0aFwiLCBcImhlaWdodFwiLCBcInBvc2l0aW9uXCIsIFwiYm94U2l6aW5nXCIsIFwibW96Qm94U2l6aW5nXCIsIFwid2Via2l0Qm94U2l6aW5nXCJdKTtcblx0XHRcdFx0Y29weVN0eWxlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdFx0XHRfcGluLl9fX29yaWdTdHlsZVt2YWxdID0gcGluSW5saW5lQ1NTW3ZhbF0gfHwgXCJcIjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIHJlbGF0aXZlIHNpemUsIHRyYW5zZmVyIGl0IHRvIHNwYWNlciBhbmQgbWFrZSBwaW4gY2FsY3VsYXRlIGl0Li4uXG5cdFx0XHRpZiAoX3Bpbk9wdGlvbnMucmVsU2l6ZS53aWR0aCkge1xuXHRcdFx0XHRfdXRpbC5jc3Moc3BhY2VyLCB7XG5cdFx0XHRcdFx0d2lkdGg6IHNpemVDU1Mud2lkdGhcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoX3Bpbk9wdGlvbnMucmVsU2l6ZS5oZWlnaHQpIHtcblx0XHRcdFx0X3V0aWwuY3NzKHNwYWNlciwge1xuXHRcdFx0XHRcdGhlaWdodDogc2l6ZUNTUy5oZWlnaHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIG5vdyBwbGFjZSB0aGUgcGluIGVsZW1lbnQgaW5zaWRlIHRoZSBzcGFjZXJcdFxuXHRcdFx0c3BhY2VyLmFwcGVuZENoaWxkKF9waW4pO1xuXHRcdFx0Ly8gYW5kIHNldCBuZXcgY3NzXG5cdFx0XHRfdXRpbC5jc3MoX3Bpbiwge1xuXHRcdFx0XHRwb3NpdGlvbjogaW5GbG93ID8gXCJyZWxhdGl2ZVwiIDogXCJhYnNvbHV0ZVwiLFxuXHRcdFx0XHRtYXJnaW46IFwiYXV0b1wiLFxuXHRcdFx0XHR0b3A6IFwiYXV0b1wiLFxuXHRcdFx0XHRsZWZ0OiBcImF1dG9cIixcblx0XHRcdFx0Ym90dG9tOiBcImF1dG9cIixcblx0XHRcdFx0cmlnaHQ6IFwiYXV0b1wiXG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKF9waW5PcHRpb25zLnJlbFNpemUud2lkdGggfHwgX3Bpbk9wdGlvbnMucmVsU2l6ZS5hdXRvRnVsbFdpZHRoKSB7XG5cdFx0XHRcdF91dGlsLmNzcyhfcGluLCB7XG5cdFx0XHRcdFx0Ym94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcblx0XHRcdFx0XHRtb3pCb3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuXHRcdFx0XHRcdHdlYmtpdEJveFNpemluZzogXCJib3JkZXItYm94XCJcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGFkZCBsaXN0ZW5lciB0byBkb2N1bWVudCB0byB1cGRhdGUgcGluIHBvc2l0aW9uIGluIGNhc2UgY29udHJvbGxlciBpcyBub3QgdGhlIGRvY3VtZW50LlxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHVwZGF0ZVBpbkluQ29udGFpbmVyKTtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVQaW5JbkNvbnRhaW5lcik7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlUmVsYXRpdmVQaW5TcGFjZXIpO1xuXHRcdFx0Ly8gYWRkIG1vdXNld2hlZWwgbGlzdGVuZXIgdG8gY2F0Y2ggc2Nyb2xscyBvdmVyIGZpeGVkIGVsZW1lbnRzXG5cdFx0XHRfcGluLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIG9uTW91c2V3aGVlbE92ZXJQaW4pO1xuXHRcdFx0X3Bpbi5hZGRFdmVudExpc3RlbmVyKFwiRE9NTW91c2VTY3JvbGxcIiwgb25Nb3VzZXdoZWVsT3ZlclBpbik7XG5cblx0XHRcdGxvZygzLCBcImFkZGVkIHBpblwiKTtcblxuXHRcdFx0Ly8gZmluYWxseSB1cGRhdGUgdGhlIHBpbiB0byBpbml0XG5cdFx0XHR1cGRhdGVQaW5TdGF0ZSgpO1xuXG5cdFx0XHRyZXR1cm4gU2NlbmU7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZSB0aGUgcGluIGZyb20gdGhlIHNjZW5lLlxuXHRcdCAqIEBtZXRob2QgU2Nyb2xsTWFnaWMuU2NlbmUjcmVtb3ZlUGluXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiAvLyByZW1vdmUgdGhlIHBpbiBmcm9tIHRoZSBzY2VuZSB3aXRob3V0IHJlc2V0dGluZyBpdCAodGhlIHNwYWNlciBpcyBub3QgcmVtb3ZlZClcblx0XHQgKiBzY2VuZS5yZW1vdmVQaW4oKTtcblx0XHQgKlxuXHRcdCAqIC8vIHJlbW92ZSB0aGUgcGluIGZyb20gdGhlIHNjZW5lIGFuZCByZXNldCB0aGUgcGluIGVsZW1lbnQgdG8gaXRzIGluaXRpYWwgcG9zaXRpb24gKHNwYWNlciBpcyByZW1vdmVkKVxuXHRcdCAqIHNjZW5lLnJlbW92ZVBpbih0cnVlKTtcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Jlc2V0PWZhbHNlXSAtIElmIGBmYWxzZWAgdGhlIHNwYWNlciB3aWxsIG5vdCBiZSByZW1vdmVkIGFuZCB0aGUgZWxlbWVudCdzIHBvc2l0aW9uIHdpbGwgbm90IGJlIHJlc2V0LlxuXHRcdCAqIEByZXR1cm5zIHtTY2VuZX0gUGFyZW50IG9iamVjdCBmb3IgY2hhaW5pbmcuXG5cdFx0ICovXG5cdFx0dGhpcy5yZW1vdmVQaW4gPSBmdW5jdGlvbiAocmVzZXQpIHtcblx0XHRcdGlmIChfcGluKSB7XG5cdFx0XHRcdGlmIChfc3RhdGUgPT09IFNDRU5FX1NUQVRFX0RVUklORykge1xuXHRcdFx0XHRcdHVwZGF0ZVBpblN0YXRlKHRydWUpOyAvLyBmb3JjZSB1bnBpbiBhdCBwb3NpdGlvblxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChyZXNldCB8fCAhX2NvbnRyb2xsZXIpIHsgLy8gaWYgdGhlcmUncyBubyBjb250cm9sbGVyIG5vIHByb2dyZXNzIHdhcyBtYWRlIGFueXdheS4uLlxuXHRcdFx0XHRcdHZhciBwaW5UYXJnZXQgPSBfcGluT3B0aW9ucy5zcGFjZXIuZmlyc3RDaGlsZDsgLy8gdXN1YWxseSB0aGUgcGluIGVsZW1lbnQsIGJ1dCBtYXkgYmUgYW5vdGhlciBzcGFjZXIgKGNhc2NhZGVkIHBpbnMpLi4uXG5cdFx0XHRcdFx0aWYgKHBpblRhcmdldC5oYXNBdHRyaWJ1dGUoUElOX1NQQUNFUl9BVFRSSUJVVEUpKSB7IC8vIGNvcHkgbWFyZ2lucyB0byBjaGlsZCBzcGFjZXJcblx0XHRcdFx0XHRcdHZhclxuXHRcdFx0XHRcdFx0c3R5bGUgPSBfcGluT3B0aW9ucy5zcGFjZXIuc3R5bGUsXG5cdFx0XHRcdFx0XHRcdHZhbHVlcyA9IFtcIm1hcmdpblwiLCBcIm1hcmdpbkxlZnRcIiwgXCJtYXJnaW5SaWdodFwiLCBcIm1hcmdpblRvcFwiLCBcIm1hcmdpbkJvdHRvbVwiXTtcblx0XHRcdFx0XHRcdG1hcmdpbnMgPSB7fTtcblx0XHRcdFx0XHRcdHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdFx0XHRcdFx0bWFyZ2luc1t2YWxdID0gc3R5bGVbdmFsXSB8fCBcIlwiO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRfdXRpbC5jc3MocGluVGFyZ2V0LCBtYXJnaW5zKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0X3Bpbk9wdGlvbnMuc3BhY2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHBpblRhcmdldCwgX3Bpbk9wdGlvbnMuc3BhY2VyKTtcblx0XHRcdFx0XHRfcGluT3B0aW9ucy5zcGFjZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfcGluT3B0aW9ucy5zcGFjZXIpO1xuXHRcdFx0XHRcdGlmICghX3Bpbi5wYXJlbnROb2RlLmhhc0F0dHJpYnV0ZShQSU5fU1BBQ0VSX0FUVFJJQlVURSkpIHsgLy8gaWYgaXQncyB0aGUgbGFzdCBwaW4gZm9yIHRoaXMgZWxlbWVudCAtPiByZXN0b3JlIGlubGluZSBzdHlsZXNcblx0XHRcdFx0XHRcdC8vIFRPRE86IG9ubHkgY29ycmVjdGx5IHNldCBmb3IgZmlyc3QgcGluICh3aGVuIGNhc2NhZGluZykgLSBob3cgdG8gZml4P1xuXHRcdFx0XHRcdFx0X3V0aWwuY3NzKF9waW4sIF9waW4uX19fb3JpZ1N0eWxlKTtcblx0XHRcdFx0XHRcdGRlbGV0ZSBfcGluLl9fX29yaWdTdHlsZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHVwZGF0ZVBpbkluQ29udGFpbmVyKTtcblx0XHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVBpbkluQ29udGFpbmVyKTtcblx0XHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVJlbGF0aXZlUGluU3BhY2VyKTtcblx0XHRcdFx0X3Bpbi5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBvbk1vdXNld2hlZWxPdmVyUGluKTtcblx0XHRcdFx0X3Bpbi5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NTW91c2VTY3JvbGxcIiwgb25Nb3VzZXdoZWVsT3ZlclBpbik7XG5cdFx0XHRcdF9waW4gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdGxvZygzLCBcInJlbW92ZWQgcGluIChyZXNldDogXCIgKyAocmVzZXQgPyBcInRydWVcIiA6IFwiZmFsc2VcIikgKyBcIilcIik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gU2NlbmU7XG5cdFx0fTtcblxuXG5cdFx0dmFyXG5cdFx0X2Nzc0NsYXNzZXMsIF9jc3NDbGFzc0VsZW1zID0gW107XG5cblx0XHRTY2VuZS5vbihcImRlc3Ryb3kuaW50ZXJuYWxcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFNjZW5lLnJlbW92ZUNsYXNzVG9nZ2xlKGUucmVzZXQpO1xuXHRcdH0pO1xuXHRcdC8qKlxuXHRcdCAqIERlZmluZSBhIGNzcyBjbGFzcyBtb2RpZmljYXRpb24gd2hpbGUgdGhlIHNjZW5lIGlzIGFjdGl2ZS4gIFxuXHRcdCAqIFdoZW4gdGhlIHNjZW5lIHRyaWdnZXJzIHRoZSBjbGFzc2VzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHN1cHBsaWVkIGVsZW1lbnQgYW5kIHJlbW92ZWQsIHdoZW4gdGhlIHNjZW5lIGlzIG92ZXIuXG5cdFx0ICogSWYgdGhlIHNjZW5lIGR1cmF0aW9uIGlzIDAgdGhlIGNsYXNzZXMgd2lsbCBvbmx5IGJlIHJlbW92ZWQgaWYgdGhlIHVzZXIgc2Nyb2xscyBiYWNrIHBhc3QgdGhlIHN0YXJ0IHBvc2l0aW9uLlxuXHRcdCAqIEBtZXRob2QgU2Nyb2xsTWFnaWMuU2NlbmUjc2V0Q2xhc3NUb2dnbGVcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIGFkZCB0aGUgY2xhc3MgJ215Y2xhc3MnIHRvIHRoZSBlbGVtZW50IHdpdGggdGhlIGlkICdteS1lbGVtJyBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoZSBzY2VuZVxuXHRcdCAqIHNjZW5lLnNldENsYXNzVG9nZ2xlKFwiI215LWVsZW1cIiwgXCJteWNsYXNzXCIpO1xuXHRcdCAqXG5cdFx0ICogLy8gYWRkIG11bHRpcGxlIGNsYXNzZXMgdG8gbXVsdGlwbGUgZWxlbWVudHMgZGVmaW5lZCBieSB0aGUgc2VsZWN0b3IgJy5jbGFzc0NoYW5nZSdcblx0XHQgKiBzY2VuZS5zZXRDbGFzc1RvZ2dsZShcIi5jbGFzc0NoYW5nZVwiLCBcImNsYXNzMSBjbGFzczIgY2xhc3MzXCIpO1xuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHsoc3RyaW5nfG9iamVjdCl9IGVsZW1lbnQgLSBBIFNlbGVjdG9yIHRhcmdldGluZyBvbmUgb3IgbW9yZSBlbGVtZW50cyBvciBhIERPTSBvYmplY3QgdGhhdCBpcyBzdXBwb3NlZCB0byBiZSBtb2RpZmllZC5cblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NlcyAtIE9uZSBvciBtb3JlIENsYXNzbmFtZXMgKHNlcGFyYXRlZCBieSBzcGFjZSkgdGhhdCBzaG91bGQgYmUgYWRkZWQgdG8gdGhlIGVsZW1lbnQgZHVyaW5nIHRoZSBzY2VuZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm5zIHtTY2VuZX0gUGFyZW50IG9iamVjdCBmb3IgY2hhaW5pbmcuXG5cdFx0ICovXG5cdFx0dGhpcy5zZXRDbGFzc1RvZ2dsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc2VzKSB7XG5cdFx0XHR2YXIgZWxlbXMgPSBfdXRpbC5nZXQuZWxlbWVudHMoZWxlbWVudCk7XG5cdFx0XHRpZiAoZWxlbXMubGVuZ3RoID09PSAwIHx8ICFfdXRpbC50eXBlLlN0cmluZyhjbGFzc2VzKSkge1xuXHRcdFx0XHRsb2coMSwgXCJFUlJPUiBjYWxsaW5nIG1ldGhvZCAnc2V0Q2xhc3NUb2dnbGUoKSc6IEludmFsaWQgXCIgKyAoZWxlbXMubGVuZ3RoID09PSAwID8gXCJlbGVtZW50XCIgOiBcImNsYXNzZXNcIikgKyBcIiBzdXBwbGllZC5cIik7XG5cdFx0XHRcdHJldHVybiBTY2VuZTtcblx0XHRcdH1cblx0XHRcdGlmIChfY3NzQ2xhc3NFbGVtcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdC8vIHJlbW92ZSBvbGQgb25lc1xuXHRcdFx0XHRTY2VuZS5yZW1vdmVDbGFzc1RvZ2dsZSgpO1xuXHRcdFx0fVxuXHRcdFx0X2Nzc0NsYXNzZXMgPSBjbGFzc2VzO1xuXHRcdFx0X2Nzc0NsYXNzRWxlbXMgPSBlbGVtcztcblx0XHRcdFNjZW5lLm9uKFwiZW50ZXIuaW50ZXJuYWxfY2xhc3MgbGVhdmUuaW50ZXJuYWxfY2xhc3NcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0dmFyIHRvZ2dsZSA9IGUudHlwZSA9PT0gXCJlbnRlclwiID8gX3V0aWwuYWRkQ2xhc3MgOiBfdXRpbC5yZW1vdmVDbGFzcztcblx0XHRcdFx0X2Nzc0NsYXNzRWxlbXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbSwga2V5KSB7XG5cdFx0XHRcdFx0dG9nZ2xlKGVsZW0sIF9jc3NDbGFzc2VzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBTY2VuZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVtb3ZlIHRoZSBjbGFzcyBiaW5kaW5nIGZyb20gdGhlIHNjZW5lLlxuXHRcdCAqIEBtZXRob2QgU2Nyb2xsTWFnaWMuU2NlbmUjcmVtb3ZlQ2xhc3NUb2dnbGVcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIHJlbW92ZSBjbGFzcyBiaW5kaW5nIGZyb20gdGhlIHNjZW5lIHdpdGhvdXQgcmVzZXRcblx0XHQgKiBzY2VuZS5yZW1vdmVDbGFzc1RvZ2dsZSgpO1xuXHRcdCAqXG5cdFx0ICogLy8gcmVtb3ZlIGNsYXNzIGJpbmRpbmcgYW5kIHJlbW92ZSB0aGUgY2hhbmdlcyBpdCBjYXVzZWRcblx0XHQgKiBzY2VuZS5yZW1vdmVDbGFzc1RvZ2dsZSh0cnVlKTtcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Jlc2V0PWZhbHNlXSAtIElmIGBmYWxzZWAgYW5kIHRoZSBjbGFzc2VzIGFyZSBjdXJyZW50bHkgYWN0aXZlLCB0aGV5IHdpbGwgcmVtYWluIG9uIHRoZSBlbGVtZW50LiBJZiBgdHJ1ZWAgdGhleSB3aWxsIGJlIHJlbW92ZWQuXG5cdFx0ICogQHJldHVybnMge1NjZW5lfSBQYXJlbnQgb2JqZWN0IGZvciBjaGFpbmluZy5cblx0XHQgKi9cblx0XHR0aGlzLnJlbW92ZUNsYXNzVG9nZ2xlID0gZnVuY3Rpb24gKHJlc2V0KSB7XG5cdFx0XHRpZiAocmVzZXQpIHtcblx0XHRcdFx0X2Nzc0NsYXNzRWxlbXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbSwga2V5KSB7XG5cdFx0XHRcdFx0X3V0aWwucmVtb3ZlQ2xhc3MoZWxlbSwgX2Nzc0NsYXNzZXMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdFNjZW5lLm9mZihcInN0YXJ0LmludGVybmFsX2NsYXNzIGVuZC5pbnRlcm5hbF9jbGFzc1wiKTtcblx0XHRcdF9jc3NDbGFzc2VzID0gdW5kZWZpbmVkO1xuXHRcdFx0X2Nzc0NsYXNzRWxlbXMgPSBbXTtcblx0XHRcdHJldHVybiBTY2VuZTtcblx0XHR9O1xuXG5cdFx0Ly8gSU5JVFxuXHRcdGNvbnN0cnVjdCgpO1xuXHRcdHJldHVybiBTY2VuZTtcblx0fTtcblxuXHQvLyBzdG9yZSBwYWdld2lkZSBzY2VuZSBvcHRpb25zXG5cdHZhciBTQ0VORV9PUFRJT05TID0ge1xuXHRcdGRlZmF1bHRzOiB7XG5cdFx0XHRkdXJhdGlvbjogMCxcblx0XHRcdG9mZnNldDogMCxcblx0XHRcdHRyaWdnZXJFbGVtZW50OiB1bmRlZmluZWQsXG5cdFx0XHR0cmlnZ2VySG9vazogMC41LFxuXHRcdFx0cmV2ZXJzZTogdHJ1ZSxcblx0XHRcdGxvZ2xldmVsOiAyXG5cdFx0fSxcblx0XHR2YWxpZGF0ZToge1xuXHRcdFx0b2Zmc2V0OiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0XHRcdHZhbCA9IHBhcnNlRmxvYXQodmFsKTtcblx0XHRcdFx0aWYgKCFfdXRpbC50eXBlLk51bWJlcih2YWwpKSB7XG5cdFx0XHRcdFx0dGhyb3cgW1wiSW52YWxpZCB2YWx1ZSBmb3Igb3B0aW9uIFxcXCJvZmZzZXRcXFwiOlwiLCB2YWxdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2YWw7XG5cdFx0XHR9LFxuXHRcdFx0dHJpZ2dlckVsZW1lbnQ6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdFx0dmFsID0gdmFsIHx8IHVuZGVmaW5lZDtcblx0XHRcdFx0aWYgKHZhbCkge1xuXHRcdFx0XHRcdHZhciBlbGVtID0gX3V0aWwuZ2V0LmVsZW1lbnRzKHZhbClbMF07XG5cdFx0XHRcdFx0aWYgKGVsZW0pIHtcblx0XHRcdFx0XHRcdHZhbCA9IGVsZW07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IFtcIkVsZW1lbnQgZGVmaW5lZCBpbiBvcHRpb24gXFxcInRyaWdnZXJFbGVtZW50XFxcIiB3YXMgbm90IGZvdW5kOlwiLCB2YWxdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsO1xuXHRcdFx0fSxcblx0XHRcdHRyaWdnZXJIb29rOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0XHRcdHZhciB0cmFuc2xhdGUgPSB7XG5cdFx0XHRcdFx0XCJvbkNlbnRlclwiOiAwLjUsXG5cdFx0XHRcdFx0XCJvbkVudGVyXCI6IDEsXG5cdFx0XHRcdFx0XCJvbkxlYXZlXCI6IDBcblx0XHRcdFx0fTtcblx0XHRcdFx0aWYgKF91dGlsLnR5cGUuTnVtYmVyKHZhbCkpIHtcblx0XHRcdFx0XHR2YWwgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihwYXJzZUZsb2F0KHZhbCksIDEpKTsgLy8gIG1ha2Ugc3VyZSBpdHMgYmV0d2VlZW4gMCBhbmQgMVxuXHRcdFx0XHR9IGVsc2UgaWYgKHZhbCBpbiB0cmFuc2xhdGUpIHtcblx0XHRcdFx0XHR2YWwgPSB0cmFuc2xhdGVbdmFsXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBbXCJJbnZhbGlkIHZhbHVlIGZvciBvcHRpb24gXFxcInRyaWdnZXJIb29rXFxcIjogXCIsIHZhbF07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZhbDtcblx0XHRcdH0sXG5cdFx0XHRyZXZlcnNlOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0XHRcdHJldHVybiAhIXZhbDsgLy8gZm9yY2UgYm9vbGVhblxuXHRcdFx0fSxcblx0XHRcdGxvZ2xldmVsOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0XHRcdHZhbCA9IHBhcnNlSW50KHZhbCk7XG5cdFx0XHRcdGlmICghX3V0aWwudHlwZS5OdW1iZXIodmFsKSB8fCB2YWwgPCAwIHx8IHZhbCA+IDMpIHtcblx0XHRcdFx0XHR0aHJvdyBbXCJJbnZhbGlkIHZhbHVlIGZvciBvcHRpb24gXFxcImxvZ2xldmVsXFxcIjpcIiwgdmFsXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Ly8gaG9sZGVyIGZvciAgdmFsaWRhdGlvbiBtZXRob2RzLiBkdXJhdGlvbiB2YWxpZGF0aW9uIGlzIGhhbmRsZWQgaW4gJ2dldHRlcnMtc2V0dGVycy5qcydcblx0XHRzaGlmdHM6IFtcImR1cmF0aW9uXCIsIFwib2Zmc2V0XCIsIFwidHJpZ2dlckhvb2tcIl0sXG5cdFx0Ly8gbGlzdCBvZiBvcHRpb25zIHRoYXQgdHJpZ2dlciBhIGBzaGlmdGAgZXZlbnRcblx0fTtcbi8qXG4gKiBtZXRob2QgdXNlZCB0byBhZGQgYW4gb3B0aW9uIHRvIFNjcm9sbE1hZ2ljIFNjZW5lcy5cbiAqIFRPRE86IERPQyAocHJpdmF0ZSBmb3IgZGV2KVxuICovXG5cdFNjcm9sbE1hZ2ljLlNjZW5lLmFkZE9wdGlvbiA9IGZ1bmN0aW9uIChuYW1lLCBkZWZhdWx0VmFsdWUsIHZhbGlkYXRpb25DYWxsYmFjaywgc2hpZnRzKSB7XG5cdFx0aWYgKCEobmFtZSBpbiBTQ0VORV9PUFRJT05TLmRlZmF1bHRzKSkge1xuXHRcdFx0U0NFTkVfT1BUSU9OUy5kZWZhdWx0c1tuYW1lXSA9IGRlZmF1bHRWYWx1ZTtcblx0XHRcdFNDRU5FX09QVElPTlMudmFsaWRhdGVbbmFtZV0gPSB2YWxpZGF0aW9uQ2FsbGJhY2s7XG5cdFx0XHRpZiAoc2hpZnRzKSB7XG5cdFx0XHRcdFNDRU5FX09QVElPTlMuc2hpZnRzLnB1c2gobmFtZSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdFNjcm9sbE1hZ2ljLl91dGlsLmxvZygxLCBcIltzdGF0aWNdIFNjcm9sbE1hZ2ljLlNjZW5lIC0+IENhbm5vdCBhZGQgU2NlbmUgb3B0aW9uICdcIiArIG5hbWUgKyBcIicsIGJlY2F1c2UgaXQgYWxyZWFkeSBleGlzdHMuXCIpO1xuXHRcdH1cblx0fTtcblx0Ly8gaW5zdGFuY2UgZXh0ZW5zaW9uIGZ1bmN0aW9uIGZvciBwbHVnaW5zXG5cdC8vIFRPRE86IERPQyAocHJpdmF0ZSBmb3IgZGV2KVxuXHRTY3JvbGxNYWdpYy5TY2VuZS5leHRlbmQgPSBmdW5jdGlvbiAoZXh0ZW5zaW9uKSB7XG5cdFx0dmFyIG9sZENsYXNzID0gdGhpcztcblx0XHRTY3JvbGxNYWdpYy5TY2VuZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdG9sZENsYXNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHR0aGlzLiRzdXBlciA9IF91dGlsLmV4dGVuZCh7fSwgdGhpcyk7IC8vIGNvcHkgcGFyZW50IHN0YXRlXG5cdFx0XHRyZXR1cm4gZXh0ZW5zaW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcblx0XHR9O1xuXHRcdF91dGlsLmV4dGVuZChTY3JvbGxNYWdpYy5TY2VuZSwgb2xkQ2xhc3MpOyAvLyBjb3B5IHByb3BlcnRpZXNcblx0XHRTY3JvbGxNYWdpYy5TY2VuZS5wcm90b3R5cGUgPSBvbGRDbGFzcy5wcm90b3R5cGU7IC8vIGNvcHkgcHJvdG90eXBlXG5cdFx0U2Nyb2xsTWFnaWMuU2NlbmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2Nyb2xsTWFnaWMuU2NlbmU7IC8vIHJlc3RvcmUgY29uc3RydWN0b3Jcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBUT0RPOiBET0NTIChwcml2YXRlIGZvciBkZXYpXG5cdCAqIEBjbGFzc1xuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblxuXHRTY3JvbGxNYWdpYy5FdmVudCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lc3BhY2UsIHRhcmdldCwgdmFycykge1xuXHRcdHZhcnMgPSB2YXJzIHx8IHt9O1xuXHRcdGZvciAodmFyIGtleSBpbiB2YXJzKSB7XG5cdFx0XHR0aGlzW2tleV0gPSB2YXJzW2tleV07XG5cdFx0fVxuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cdFx0dGhpcy50YXJnZXQgPSB0aGlzLmN1cnJlbnRUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0dGhpcy5uYW1lc3BhY2UgPSBuYW1lc3BhY2UgfHwgJyc7XG5cdFx0dGhpcy50aW1lU3RhbXAgPSB0aGlzLnRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cbi8qXG4gKiBUT0RPOiBET0NTIChwcml2YXRlIGZvciBkZXYpXG4gKi9cblxuXHR2YXIgX3V0aWwgPSBTY3JvbGxNYWdpYy5fdXRpbCA9IChmdW5jdGlvbiAod2luZG93KSB7XG5cdFx0dmFyIFUgPSB7fSxcblx0XHRcdGk7XG5cblx0XHQvKipcblx0XHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQgKiBpbnRlcm5hbCBoZWxwZXJzXG5cdFx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0ICovXG5cblx0XHQvLyBwYXJzZSBmbG9hdCBhbmQgZmFsbCBiYWNrIHRvIDAuXG5cdFx0dmFyIGZsb2F0dmFsID0gZnVuY3Rpb24gKG51bWJlcikge1xuXHRcdFx0cmV0dXJuIHBhcnNlRmxvYXQobnVtYmVyKSB8fCAwO1xuXHRcdH07XG5cdFx0Ly8gZ2V0IGN1cnJlbnQgc3R5bGUgSUUgc2FmZSAob3RoZXJ3aXNlIElFIHdvdWxkIHJldHVybiBjYWxjdWxhdGVkIHZhbHVlcyBmb3IgJ2F1dG8nKVxuXHRcdHZhciBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGZ1bmN0aW9uIChlbGVtKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5jdXJyZW50U3R5bGUgPyBlbGVtLmN1cnJlbnRTdHlsZSA6IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuXHRcdH07XG5cblx0XHQvLyBnZXQgZWxlbWVudCBkaW1lbnNpb24gKHdpZHRoIG9yIGhlaWdodClcblx0XHR2YXIgX2RpbWVuc2lvbiA9IGZ1bmN0aW9uICh3aGljaCwgZWxlbSwgb3V0ZXIsIGluY2x1ZGVNYXJnaW4pIHtcblx0XHRcdGVsZW0gPSAoZWxlbSA9PT0gZG9jdW1lbnQpID8gd2luZG93IDogZWxlbTtcblx0XHRcdGlmIChlbGVtID09PSB3aW5kb3cpIHtcblx0XHRcdFx0aW5jbHVkZU1hcmdpbiA9IGZhbHNlO1xuXHRcdFx0fSBlbHNlIGlmICghX3R5cGUuRG9tRWxlbWVudChlbGVtKSkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblx0XHRcdHdoaWNoID0gd2hpY2guY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3aGljaC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcblx0XHRcdHZhciBkaW1lbnNpb24gPSAob3V0ZXIgPyBlbGVtWydvZmZzZXQnICsgd2hpY2hdIHx8IGVsZW1bJ291dGVyJyArIHdoaWNoXSA6IGVsZW1bJ2NsaWVudCcgKyB3aGljaF0gfHwgZWxlbVsnaW5uZXInICsgd2hpY2hdKSB8fCAwO1xuXHRcdFx0aWYgKG91dGVyICYmIGluY2x1ZGVNYXJnaW4pIHtcblx0XHRcdFx0dmFyIHN0eWxlID0gX2dldENvbXB1dGVkU3R5bGUoZWxlbSk7XG5cdFx0XHRcdGRpbWVuc2lvbiArPSB3aGljaCA9PT0gJ0hlaWdodCcgPyBmbG9hdHZhbChzdHlsZS5tYXJnaW5Ub3ApICsgZmxvYXR2YWwoc3R5bGUubWFyZ2luQm90dG9tKSA6IGZsb2F0dmFsKHN0eWxlLm1hcmdpbkxlZnQpICsgZmxvYXR2YWwoc3R5bGUubWFyZ2luUmlnaHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRpbWVuc2lvbjtcblx0XHR9O1xuXHRcdC8vIGNvbnZlcnRzICdtYXJnaW4tdG9wJyBpbnRvICdtYXJnaW5Ub3AnXG5cdFx0dmFyIF9jYW1lbENhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdFx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL15bXmEtel0rKFthLXpdKS9nLCAnJDEnKS5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbiAoZykge1xuXHRcdFx0XHRyZXR1cm4gZ1sxXS50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCAqIGV4dGVybmFsIGhlbHBlcnNcblx0XHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQgKi9cblxuXHRcdC8vIGV4dGVuZCBvYmog4oCTIHNhbWUgYXMgalF1ZXJ5LmV4dGVuZCh7fSwgb2JqQSwgb2JqQilcblx0XHRVLmV4dGVuZCA9IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IG9iaiB8fCB7fTtcblx0XHRcdGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKCFhcmd1bWVudHNbaV0pIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJndW1lbnRzW2ldKSB7XG5cdFx0XHRcdFx0aWYgKGFyZ3VtZW50c1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRvYmpba2V5XSA9IGFyZ3VtZW50c1tpXVtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9O1xuXG5cdFx0Ly8gY2hlY2sgaWYgYSBjc3MgZGlzcGxheSB0eXBlIHJlc3VsdHMgaW4gbWFyZ2luLWNvbGxhcHNlIG9yIG5vdFxuXHRcdFUuaXNNYXJnaW5Db2xsYXBzZVR5cGUgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdFx0XHRyZXR1cm4gW1wiYmxvY2tcIiwgXCJmbGV4XCIsIFwibGlzdC1pdGVtXCIsIFwidGFibGVcIiwgXCItd2Via2l0LWJveFwiXS5pbmRleE9mKHN0cikgPiAtMTtcblx0XHR9O1xuXG5cdFx0Ly8gaW1wbGVtZW50YXRpb24gb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cdFx0Ly8gYmFzZWQgb24gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzE1Nzk2NzFcblx0XHR2YXJcblx0XHRsYXN0VGltZSA9IDAsXG5cdFx0XHR2ZW5kb3JzID0gWydtcycsICdtb3onLCAnd2Via2l0JywgJ28nXTtcblx0XHR2YXIgX3JlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cdFx0dmFyIF9jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZTtcblx0XHQvLyB0cnkgdmVuZG9yIHByZWZpeGVzIGlmIHRoZSBhYm92ZSBkb2Vzbid0IHdvcmtcblx0XHRmb3IgKGkgPSAwOyAhX3JlcXVlc3RBbmltYXRpb25GcmFtZSAmJiBpIDwgdmVuZG9ycy5sZW5ndGg7ICsraSkge1xuXHRcdFx0X3JlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW2ldICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuXHRcdFx0X2NhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbaV0gKyAnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSB8fCB3aW5kb3dbdmVuZG9yc1tpXSArICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcblx0XHR9XG5cblx0XHQvLyBmYWxsYmFja3Ncblx0XHRpZiAoIV9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcblx0XHRcdF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdFx0dmFyXG5cdFx0XHRcdGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG5cdFx0XHRcdFx0dGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKSxcblx0XHRcdFx0XHRpZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG5cdFx0XHRcdFx0fSwgdGltZVRvQ2FsbCk7XG5cdFx0XHRcdGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuXHRcdFx0XHRyZXR1cm4gaWQ7XG5cdFx0XHR9O1xuXHRcdH1cblx0XHRpZiAoIV9jYW5jZWxBbmltYXRpb25GcmFtZSkge1xuXHRcdFx0X2NhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoaWQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdFx0VS5yQUYgPSBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQod2luZG93KTtcblx0XHRVLmNBRiA9IF9jYW5jZWxBbmltYXRpb25GcmFtZS5iaW5kKHdpbmRvdyk7XG5cblx0XHR2YXJcblx0XHRsb2dsZXZlbHMgPSBbXCJlcnJvclwiLCBcIndhcm5cIiwgXCJsb2dcIl0sXG5cdFx0XHRjb25zb2xlID0gd2luZG93LmNvbnNvbGUgfHwge307XG5cblx0XHRjb25zb2xlLmxvZyA9IGNvbnNvbGUubG9nIHx8XG5cdFx0ZnVuY3Rpb24gKCkge307IC8vIG5vIGNvbnNvbGUgbG9nLCB3ZWxsIC0gZG8gbm90aGluZyB0aGVuLi4uXG5cdFx0Ly8gbWFrZSBzdXJlIG1ldGhvZHMgZm9yIGFsbCBsZXZlbHMgZXhpc3QuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxvZ2xldmVscy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG1ldGhvZCA9IGxvZ2xldmVsc1tpXTtcblx0XHRcdGlmICghY29uc29sZVttZXRob2RdKSB7XG5cdFx0XHRcdGNvbnNvbGVbbWV0aG9kXSA9IGNvbnNvbGUubG9nOyAvLyBwcmVmZXIgLmxvZyBvdmVyIG5vdGhpbmdcblx0XHRcdH1cblx0XHR9XG5cdFx0VS5sb2cgPSBmdW5jdGlvbiAobG9nbGV2ZWwpIHtcblx0XHRcdGlmIChsb2dsZXZlbCA+IGxvZ2xldmVscy5sZW5ndGggfHwgbG9nbGV2ZWwgPD0gMCkgbG9nbGV2ZWwgPSBsb2dsZXZlbHMubGVuZ3RoO1xuXHRcdFx0dmFyIG5vdyA9IG5ldyBEYXRlKCksXG5cdFx0XHRcdHRpbWUgPSAoXCIwXCIgKyBub3cuZ2V0SG91cnMoKSkuc2xpY2UoLTIpICsgXCI6XCIgKyAoXCIwXCIgKyBub3cuZ2V0TWludXRlcygpKS5zbGljZSgtMikgKyBcIjpcIiArIChcIjBcIiArIG5vdy5nZXRTZWNvbmRzKCkpLnNsaWNlKC0yKSArIFwiOlwiICsgKFwiMDBcIiArIG5vdy5nZXRNaWxsaXNlY29uZHMoKSkuc2xpY2UoLTMpLFxuXHRcdFx0XHRtZXRob2QgPSBsb2dsZXZlbHNbbG9nbGV2ZWwgLSAxXSxcblx0XHRcdFx0YXJncyA9IEFycmF5LnByb3RvdHlwZS5zcGxpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuXHRcdFx0XHRmdW5jID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbChjb25zb2xlW21ldGhvZF0sIGNvbnNvbGUpO1xuXHRcdFx0YXJncy51bnNoaWZ0KHRpbWUpO1xuXHRcdFx0ZnVuYy5hcHBseShjb25zb2xlLCBhcmdzKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0ICogdHlwZSB0ZXN0aW5nXG5cdFx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0ICovXG5cblx0XHR2YXIgX3R5cGUgPSBVLnR5cGUgPSBmdW5jdGlvbiAodikge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KS5yZXBsYWNlKC9eXFxbb2JqZWN0ICguKylcXF0kLywgXCIkMVwiKS50b0xvd2VyQ2FzZSgpO1xuXHRcdH07XG5cdFx0X3R5cGUuU3RyaW5nID0gZnVuY3Rpb24gKHYpIHtcblx0XHRcdHJldHVybiBfdHlwZSh2KSA9PT0gJ3N0cmluZyc7XG5cdFx0fTtcblx0XHRfdHlwZS5GdW5jdGlvbiA9IGZ1bmN0aW9uICh2KSB7XG5cdFx0XHRyZXR1cm4gX3R5cGUodikgPT09ICdmdW5jdGlvbic7XG5cdFx0fTtcblx0XHRfdHlwZS5BcnJheSA9IGZ1bmN0aW9uICh2KSB7XG5cdFx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheSh2KTtcblx0XHR9O1xuXHRcdF90eXBlLk51bWJlciA9IGZ1bmN0aW9uICh2KSB7XG5cdFx0XHRyZXR1cm4gIV90eXBlLkFycmF5KHYpICYmICh2IC0gcGFyc2VGbG9hdCh2KSArIDEpID49IDA7XG5cdFx0fTtcblx0XHRfdHlwZS5Eb21FbGVtZW50ID0gZnVuY3Rpb24gKG8pIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHR0eXBlb2YgSFRNTEVsZW1lbnQgPT09IFwib2JqZWN0XCIgPyBvIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgOiAvL0RPTTJcblx0XHRcdG8gJiYgdHlwZW9mIG8gPT09IFwib2JqZWN0XCIgJiYgbyAhPT0gbnVsbCAmJiBvLm5vZGVUeXBlID09PSAxICYmIHR5cGVvZiBvLm5vZGVOYW1lID09PSBcInN0cmluZ1wiKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0ICogRE9NIEVsZW1lbnQgaW5mb1xuXHRcdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCAqL1xuXHRcdC8vIGFsd2F5cyByZXR1cm5zIGEgbGlzdCBvZiBtYXRjaGluZyBET00gZWxlbWVudHMsIGZyb20gYSBzZWxlY3RvciwgYSBET00gZWxlbWVudCBvciBhbiBsaXN0IG9mIGVsZW1lbnRzIG9yIGV2ZW4gYW4gYXJyYXkgb2Ygc2VsZWN0b3JzXG5cdFx0dmFyIF9nZXQgPSBVLmdldCA9IHt9O1xuXHRcdF9nZXQuZWxlbWVudHMgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcblx0XHRcdHZhciBhcnIgPSBbXTtcblx0XHRcdGlmIChfdHlwZS5TdHJpbmcoc2VsZWN0b3IpKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0c2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdFx0fSBjYXRjaCAoZSkgeyAvLyBpbnZhbGlkIHNlbGVjdG9yXG5cdFx0XHRcdFx0cmV0dXJuIGFycjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKF90eXBlKHNlbGVjdG9yKSA9PT0gJ25vZGVsaXN0JyB8fCBfdHlwZS5BcnJheShzZWxlY3RvcikpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIHJlZiA9IGFyci5sZW5ndGggPSBzZWxlY3Rvci5sZW5ndGg7IGkgPCByZWY7IGkrKykgeyAvLyBsaXN0IG9mIGVsZW1lbnRzXG5cdFx0XHRcdFx0dmFyIGVsZW0gPSBzZWxlY3RvcltpXTtcblx0XHRcdFx0XHRhcnJbaV0gPSBfdHlwZS5Eb21FbGVtZW50KGVsZW0pID8gZWxlbSA6IF9nZXQuZWxlbWVudHMoZWxlbSk7IC8vIGlmIG5vdCBhbiBlbGVtZW50LCB0cnkgdG8gcmVzb2x2ZSByZWN1cnNpdmVseVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKF90eXBlLkRvbUVsZW1lbnQoc2VsZWN0b3IpIHx8IHNlbGVjdG9yID09PSBkb2N1bWVudCB8fCBzZWxlY3RvciA9PT0gd2luZG93KSB7XG5cdFx0XHRcdGFyciA9IFtzZWxlY3Rvcl07IC8vIG9ubHkgdGhlIGVsZW1lbnRcblx0XHRcdH1cblx0XHRcdHJldHVybiBhcnI7XG5cdFx0fTtcblx0XHQvLyBnZXQgc2Nyb2xsIHRvcCB2YWx1ZVxuXHRcdF9nZXQuc2Nyb2xsVG9wID0gZnVuY3Rpb24gKGVsZW0pIHtcblx0XHRcdHJldHVybiAoZWxlbSAmJiB0eXBlb2YgZWxlbS5zY3JvbGxUb3AgPT09ICdudW1iZXInKSA/IGVsZW0uc2Nyb2xsVG9wIDogd2luZG93LnBhZ2VZT2Zmc2V0IHx8IDA7XG5cdFx0fTtcblx0XHQvLyBnZXQgc2Nyb2xsIGxlZnQgdmFsdWVcblx0XHRfZ2V0LnNjcm9sbExlZnQgPSBmdW5jdGlvbiAoZWxlbSkge1xuXHRcdFx0cmV0dXJuIChlbGVtICYmIHR5cGVvZiBlbGVtLnNjcm9sbExlZnQgPT09ICdudW1iZXInKSA/IGVsZW0uc2Nyb2xsTGVmdCA6IHdpbmRvdy5wYWdlWE9mZnNldCB8fCAwO1xuXHRcdH07XG5cdFx0Ly8gZ2V0IGVsZW1lbnQgaGVpZ2h0XG5cdFx0X2dldC53aWR0aCA9IGZ1bmN0aW9uIChlbGVtLCBvdXRlciwgaW5jbHVkZU1hcmdpbikge1xuXHRcdFx0cmV0dXJuIF9kaW1lbnNpb24oJ3dpZHRoJywgZWxlbSwgb3V0ZXIsIGluY2x1ZGVNYXJnaW4pO1xuXHRcdH07XG5cdFx0Ly8gZ2V0IGVsZW1lbnQgd2lkdGhcblx0XHRfZ2V0LmhlaWdodCA9IGZ1bmN0aW9uIChlbGVtLCBvdXRlciwgaW5jbHVkZU1hcmdpbikge1xuXHRcdFx0cmV0dXJuIF9kaW1lbnNpb24oJ2hlaWdodCcsIGVsZW0sIG91dGVyLCBpbmNsdWRlTWFyZ2luKTtcblx0XHR9O1xuXG5cdFx0Ly8gZ2V0IGVsZW1lbnQgcG9zaXRpb24gKG9wdGlvbmFsbHkgcmVsYXRpdmUgdG8gdmlld3BvcnQpXG5cdFx0X2dldC5vZmZzZXQgPSBmdW5jdGlvbiAoZWxlbSwgcmVsYXRpdmVUb1ZpZXdwb3J0KSB7XG5cdFx0XHR2YXIgb2Zmc2V0ID0ge1xuXHRcdFx0XHR0b3A6IDAsXG5cdFx0XHRcdGxlZnQ6IDBcblx0XHRcdH07XG5cdFx0XHRpZiAoZWxlbSAmJiBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkgeyAvLyBjaGVjayBpZiBhdmFpbGFibGVcblx0XHRcdFx0dmFyIHJlY3QgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRvZmZzZXQudG9wID0gcmVjdC50b3A7XG5cdFx0XHRcdG9mZnNldC5sZWZ0ID0gcmVjdC5sZWZ0O1xuXHRcdFx0XHRpZiAoIXJlbGF0aXZlVG9WaWV3cG9ydCkgeyAvLyBjbGllbnRSZWN0IGlzIGJ5IGRlZmF1bHQgcmVsYXRpdmUgdG8gdmlld3BvcnQuLi5cblx0XHRcdFx0XHRvZmZzZXQudG9wICs9IF9nZXQuc2Nyb2xsVG9wKCk7XG5cdFx0XHRcdFx0b2Zmc2V0LmxlZnQgKz0gX2dldC5zY3JvbGxMZWZ0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBvZmZzZXQ7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCAqIERPTSBFbGVtZW50IG1hbmlwdWxhdGlvblxuXHRcdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCAqL1xuXG5cdFx0VS5hZGRDbGFzcyA9IGZ1bmN0aW9uIChlbGVtLCBjbGFzc25hbWUpIHtcblx0XHRcdGlmIChjbGFzc25hbWUpIHtcblx0XHRcdFx0aWYgKGVsZW0uY2xhc3NMaXN0KSBlbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NuYW1lKTtcblx0XHRcdFx0ZWxzZSBlbGVtLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc25hbWU7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRVLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGVsZW0sIGNsYXNzbmFtZSkge1xuXHRcdFx0aWYgKGNsYXNzbmFtZSkge1xuXHRcdFx0XHRpZiAoZWxlbS5jbGFzc0xpc3QpIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc25hbWUpO1xuXHRcdFx0XHRlbHNlIGVsZW0uY2xhc3NOYW1lID0gZWxlbS5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xhc3NuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0Ly8gaWYgb3B0aW9ucyBpcyBzdHJpbmcgLT4gcmV0dXJucyBjc3MgdmFsdWVcblx0XHQvLyBpZiBvcHRpb25zIGlzIGFycmF5IC0+IHJldHVybnMgb2JqZWN0IHdpdGggY3NzIHZhbHVlIHBhaXJzXG5cdFx0Ly8gaWYgb3B0aW9ucyBpcyBvYmplY3QgLT4gc2V0IG5ldyBjc3MgdmFsdWVzXG5cdFx0VS5jc3MgPSBmdW5jdGlvbiAoZWxlbSwgb3B0aW9ucykge1xuXHRcdFx0aWYgKF90eXBlLlN0cmluZyhvcHRpb25zKSkge1xuXHRcdFx0XHRyZXR1cm4gX2dldENvbXB1dGVkU3R5bGUoZWxlbSlbX2NhbWVsQ2FzZShvcHRpb25zKV07XG5cdFx0XHR9IGVsc2UgaWYgKF90eXBlLkFycmF5KG9wdGlvbnMpKSB7XG5cdFx0XHRcdHZhclxuXHRcdFx0XHRvYmogPSB7fSxcblx0XHRcdFx0XHRzdHlsZSA9IF9nZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuXHRcdFx0XHRvcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKG9wdGlvbiwga2V5KSB7XG5cdFx0XHRcdFx0b2JqW29wdGlvbl0gPSBzdHlsZVtfY2FtZWxDYXNlKG9wdGlvbildO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIG9iajtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAodmFyIG9wdGlvbiBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdFx0dmFyIHZhbCA9IG9wdGlvbnNbb3B0aW9uXTtcblx0XHRcdFx0XHRpZiAodmFsID09IHBhcnNlRmxvYXQodmFsKSkgeyAvLyBhc3N1bWUgcGl4ZWwgZm9yIHNlZW1pbmdseSBudW1lcmljYWwgdmFsdWVzXG5cdFx0XHRcdFx0XHR2YWwgKz0gJ3B4Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxlbS5zdHlsZVtfY2FtZWxDYXNlKG9wdGlvbildID0gdmFsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBVO1xuXHR9KHdpbmRvdyB8fCB7fSkpO1xuXG5cdFNjcm9sbE1hZ2ljLlNjZW5lLnByb3RvdHlwZS5hZGRJbmRpY2F0b3JzID0gZnVuY3Rpb24gKCkge1xuXHRcdFNjcm9sbE1hZ2ljLl91dGlsLmxvZygxLCAnKFNjcm9sbE1hZ2ljLlNjZW5lKSAtPiBFUlJPUiBjYWxsaW5nIGFkZEluZGljYXRvcnMoKSBkdWUgdG8gbWlzc2luZyBQbHVnaW4gXFwnZGVidWcuYWRkSW5kaWNhdG9yc1xcJy4gUGxlYXNlIG1ha2Ugc3VyZSB0byBpbmNsdWRlIHBsdWdpbnMvZGVidWcuYWRkSW5kaWNhdG9ycy5qcycpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFNjcm9sbE1hZ2ljLlNjZW5lLnByb3RvdHlwZS5yZW1vdmVJbmRpY2F0b3JzID0gZnVuY3Rpb24gKCkge1xuXHRcdFNjcm9sbE1hZ2ljLl91dGlsLmxvZygxLCAnKFNjcm9sbE1hZ2ljLlNjZW5lKSAtPiBFUlJPUiBjYWxsaW5nIHJlbW92ZUluZGljYXRvcnMoKSBkdWUgdG8gbWlzc2luZyBQbHVnaW4gXFwnZGVidWcuYWRkSW5kaWNhdG9yc1xcJy4gUGxlYXNlIG1ha2Ugc3VyZSB0byBpbmNsdWRlIHBsdWdpbnMvZGVidWcuYWRkSW5kaWNhdG9ycy5qcycpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFNjcm9sbE1hZ2ljLlNjZW5lLnByb3RvdHlwZS5zZXRUd2VlbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRTY3JvbGxNYWdpYy5fdXRpbC5sb2coMSwgJyhTY3JvbGxNYWdpYy5TY2VuZSkgLT4gRVJST1IgY2FsbGluZyBzZXRUd2VlbigpIGR1ZSB0byBtaXNzaW5nIFBsdWdpbiBcXCdhbmltYXRpb24uZ3NhcFxcJy4gUGxlYXNlIG1ha2Ugc3VyZSB0byBpbmNsdWRlIHBsdWdpbnMvYW5pbWF0aW9uLmdzYXAuanMnKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRTY3JvbGxNYWdpYy5TY2VuZS5wcm90b3R5cGUucmVtb3ZlVHdlZW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0U2Nyb2xsTWFnaWMuX3V0aWwubG9nKDEsICcoU2Nyb2xsTWFnaWMuU2NlbmUpIC0+IEVSUk9SIGNhbGxpbmcgcmVtb3ZlVHdlZW4oKSBkdWUgdG8gbWlzc2luZyBQbHVnaW4gXFwnYW5pbWF0aW9uLmdzYXBcXCcuIFBsZWFzZSBtYWtlIHN1cmUgdG8gaW5jbHVkZSBwbHVnaW5zL2FuaW1hdGlvbi5nc2FwLmpzJyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0U2Nyb2xsTWFnaWMuU2NlbmUucHJvdG90eXBlLnNldFZlbG9jaXR5ID0gZnVuY3Rpb24gKCkge1xuXHRcdFNjcm9sbE1hZ2ljLl91dGlsLmxvZygxLCAnKFNjcm9sbE1hZ2ljLlNjZW5lKSAtPiBFUlJPUiBjYWxsaW5nIHNldFZlbG9jaXR5KCkgZHVlIHRvIG1pc3NpbmcgUGx1Z2luIFxcJ2FuaW1hdGlvbi52ZWxvY2l0eVxcJy4gUGxlYXNlIG1ha2Ugc3VyZSB0byBpbmNsdWRlIHBsdWdpbnMvYW5pbWF0aW9uLnZlbG9jaXR5LmpzJyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0U2Nyb2xsTWFnaWMuU2NlbmUucHJvdG90eXBlLnJlbW92ZVZlbG9jaXR5ID0gZnVuY3Rpb24gKCkge1xuXHRcdFNjcm9sbE1hZ2ljLl91dGlsLmxvZygxLCAnKFNjcm9sbE1hZ2ljLlNjZW5lKSAtPiBFUlJPUiBjYWxsaW5nIHJlbW92ZVZlbG9jaXR5KCkgZHVlIHRvIG1pc3NpbmcgUGx1Z2luIFxcJ2FuaW1hdGlvbi52ZWxvY2l0eVxcJy4gUGxlYXNlIG1ha2Ugc3VyZSB0byBpbmNsdWRlIHBsdWdpbnMvYW5pbWF0aW9uLnZlbG9jaXR5LmpzJyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXR1cm4gU2Nyb2xsTWFnaWM7XG59KSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2Nyb2xsbWFnaWMvc2Nyb2xsbWFnaWMvdW5jb21wcmVzc2VkL1Njcm9sbE1hZ2ljLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=