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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! styles/app.scss */ 1);

__webpack_require__(/*! ./main.js */ 2);

/***/ }),
/* 1 */
/*!*****************************!*\
  !*** ./src/styles/app.scss ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
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
}); //tl.method(element, duration, vars), delay

var tl = new TimelineMax({});
tl // hero: timeline
.from('.hero-title', 0.5, {
  y: 0,
  autoAlpha: 0,
  ease: Power2.easeOut
}).from('.hero-scroll', 0.5, {
  autoAlpha: 0,
  ease: Power1.easeOut
}) // news page: timeline 
.staggerFrom('.post-item', 0.5, {
  y: 5,
  autoAlpha: 0,
  ease: Power1.easeOut
}, 0.25);

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2Y2MjcxMzFkYWM0NjM3NDVlZjciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5IiwidHJpZ2dlciIsImlzQ2xvc2VkIiwib24iLCJ0b2dnbGVDbGFzcyIsImNsaWNrIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInJlcGxhY2UiLCJob3N0bmFtZSIsInRhcmdldCIsImhhc2giLCJsZW5ndGgiLCJzbGljZSIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJmb3JtU3VibWl0IiwidmFsaWRhdGVGb3JtIiwiZW1haWwiLCJhdHBvcyIsImRvdHBvcyIsInVzZXJuYW1lIiwibmFtZSIsInZhbCIsImluZGV4T2YiLCJsYXN0SW5kZXhPZiIsIm1lc3NhZ2UiLCJhZGRDbGFzcyIsInRleHQiLCJmb2N1cyIsImRhdGFzdHJpbmciLCJzZXJpYWxpemUiLCJhamF4IiwidXJsIiwibWV0aG9kIiwiZGF0YSIsImRhdGFUeXBlIiwiZWFjaCIsImkiLCJudW0iLCJhdHRyIiwidGwiLCJUaW1lbGluZU1heCIsImZyb20iLCJ5IiwiYXV0b0FscGhhIiwiZWFzZSIsIlBvd2VyMiIsImVhc2VPdXQiLCJQb3dlcjEiLCJzdGFnZ2VyRnJvbSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1REE7O0FBR0Esd0M7Ozs7Ozs7Ozs7O0FDSkEseUM7Ozs7Ozs7Ozs7O0FDQUE7QUFFQTtBQUNBQSxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVztBQUMzQixNQUFJQyxVQUFVSCxFQUFFLGdCQUFGLENBQWQ7QUFDQSxNQUFJSSxXQUFXLEtBQWY7QUFDQUQsVUFBUUUsRUFBUixDQUFXLE9BQVgsRUFBb0IsWUFBVztBQUM3QkwsTUFBRSxnQkFBRixFQUFvQk0sV0FBcEIsQ0FBZ0MsVUFBaEM7QUFDQU4sTUFBRSxNQUFGLEVBQVVNLFdBQVYsQ0FBc0IsVUFBdEI7QUFDRk4sTUFBRSxnQkFBRixFQUFvQk0sV0FBcEIsQ0FBZ0MsUUFBaEM7QUFDQyxHQUpEO0FBS0QsQ0FSRCxFLENBVUE7O0FBQ0FOLEVBQUUsWUFBVztBQUNYQSxJQUFFLDhCQUFGLEVBQWtDTyxLQUFsQyxDQUF3QyxZQUFXO0FBQ2pELFFBQUlDLFNBQVNDLFFBQVQsQ0FBa0JDLE9BQWxCLENBQTBCLEtBQTFCLEVBQWdDLEVBQWhDLEtBQXVDLEtBQUtELFFBQUwsQ0FBY0MsT0FBZCxDQUFzQixLQUF0QixFQUE0QixFQUE1QixDQUF2QyxJQUEwRUYsU0FBU0csUUFBVCxJQUFxQixLQUFLQSxRQUF4RyxFQUFrSDtBQUNoSCxVQUFJQyxTQUFTWixFQUFFLEtBQUthLElBQVAsQ0FBYjtBQUNBRCxlQUFTQSxPQUFPRSxNQUFQLEdBQWdCRixNQUFoQixHQUF5QlosRUFBRSxXQUFXLEtBQUthLElBQUwsQ0FBVUUsS0FBVixDQUFnQixDQUFoQixDQUFYLEdBQStCLEdBQWpDLENBQWxDOztBQUNBLFVBQUlILE9BQU9FLE1BQVgsRUFBbUI7QUFDakJkLFVBQUUsWUFBRixFQUFnQmdCLE9BQWhCLENBQXdCO0FBQ3RCQyxxQkFBV0wsT0FBT00sTUFBUCxHQUFnQkM7QUFETCxTQUF4QixFQUVHLEdBRkg7QUFHQSxlQUFPLEtBQVA7QUFDRDtBQUNGO0FBQ0YsR0FYRDtBQVlELENBYkQsRSxDQWVBOztBQUNBLElBQUlDLGFBQWFwQixFQUFFLGlCQUFGLENBQWpCO0FBQ0FvQixXQUFXYixLQUFYLENBQWlCLFlBQVc7QUFDM0JjO0FBQ0EsU0FBTyxLQUFQO0FBQ0EsQ0FIRCxFLENBS0E7O0FBQ0EsU0FBU0EsWUFBVCxHQUF3QjtBQUN2QixNQUFJQyxLQUFKLEVBQVdDLEtBQVgsRUFBa0JDLE1BQWxCLEVBQTBCQyxRQUExQjtBQUVBQyxTQUFPMUIsRUFBRSxPQUFGLEVBQVcyQixHQUFYLEVBQVA7QUFDQUwsVUFBUXRCLEVBQUUsUUFBRixFQUFZMkIsR0FBWixFQUFSO0FBQ0FKLFVBQVFELE1BQU1NLE9BQU4sQ0FBYyxHQUFkLENBQVI7QUFDQUosV0FBU0YsTUFBTU8sV0FBTixDQUFrQixHQUFsQixDQUFUO0FBQ0FDLFlBQVU5QixFQUFFLFVBQUYsRUFBYzJCLEdBQWQsRUFBVjs7QUFFQSxNQUFJRCxRQUFRLElBQVIsSUFBZ0JBLFFBQVEsRUFBNUIsRUFBZ0M7QUFDaEMxQixNQUFFLGtCQUFGLEVBQXNCK0IsUUFBdEIsQ0FBK0IsdUJBQS9CLEVBQXdEQyxJQUF4RCxDQUE2RCwyQkFBN0Q7QUFDQWhDLE1BQUUsT0FBRixFQUFXaUMsS0FBWDtBQUNBLFdBQU8sS0FBUDtBQUNDOztBQUNELE1BQUdYLFNBQVMsSUFBVCxJQUFpQkEsU0FBUyxFQUE3QixFQUFpQztBQUNqQ3RCLE1BQUUsa0JBQUYsRUFBc0IrQixRQUF0QixDQUErQix1QkFBL0IsRUFBd0RDLElBQXhELENBQTZELDRCQUE3RDtBQUNBaEMsTUFBRSxRQUFGLEVBQVlpQyxLQUFaO0FBQ0EsV0FBTyxLQUFQO0FBQ0M7O0FBQ0QsTUFBR1YsUUFBUSxDQUFSLElBQWFDLFNBQVNELFFBQU0sQ0FBNUIsSUFBaUNDLFNBQU8sQ0FBUCxJQUFZRixNQUFNUixNQUF0RCxFQUE4RDtBQUM5RGQsTUFBRSxrQkFBRixFQUFzQitCLFFBQXRCLENBQStCLHVCQUEvQixFQUF3REMsSUFBeEQsQ0FBNkQsdUNBQTdEO0FBQ0FoQyxNQUFFLFFBQUYsRUFBWWlDLEtBQVo7QUFDQSxXQUFPLEtBQVA7QUFDQzs7QUFDRCxNQUFJSCxXQUFXLElBQVgsSUFBbUJBLFdBQVcsRUFBbEMsRUFBc0M7QUFDdEM5QixNQUFFLGtCQUFGLEVBQXNCK0IsUUFBdEIsQ0FBK0IsdUJBQS9CLEVBQXdEQyxJQUF4RCxDQUE2RCw4QkFBN0Q7QUFDQWhDLE1BQUUsVUFBRixFQUFjaUMsS0FBZDtBQUNBLFdBQU8sS0FBUDtBQUNDLEdBSkQsTUFLSztBQUNILFFBQUlDLGFBQWFsQyxFQUFFLFVBQUYsRUFBY21DLFNBQWQsRUFBakI7QUFDQW5DLE1BQUVvQyxJQUFGLENBQU87QUFDTDtBQUNBQyxXQUFLLDJDQUZBO0FBR0xDLGNBQVEsTUFISDtBQUlMQyxZQUFNTCxVQUpEO0FBS0xNLGdCQUFVO0FBTEwsS0FBUDtBQU9BeEMsTUFBRSxrQkFBRixFQUFzQitCLFFBQXRCLENBQStCLHlCQUEvQixFQUEwREMsSUFBMUQsQ0FBK0QsMEdBQS9EO0FBQ0EsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxDLENBRUQ7QUFDQTs7O0FBQ0FoQyxFQUFFLFlBQUYsRUFBZ0J5QyxJQUFoQixDQUFxQixVQUFTQyxDQUFULEVBQVk7QUFDaEMsTUFBSUMsTUFBT0QsSUFBSSxDQUFMLEdBQVUsQ0FBcEIsQ0FEZ0MsQ0FDVDs7QUFDdkIxQyxJQUFFLElBQUYsRUFBUStCLFFBQVIsQ0FBaUIsV0FBV1ksR0FBNUI7QUFDQTNDLElBQUUsSUFBRixFQUFRNEMsSUFBUixDQUFhLFdBQWIsRUFBMEJGLENBQTFCO0FBQ0EsQ0FKRCxFLENBTUE7O0FBQ0EsSUFBSUcsS0FBSyxJQUFJQyxXQUFKLENBQWdCLEVBQWhCLENBQVQ7QUFDQUQsR0FDRTtBQURGLENBRUVFLElBRkYsQ0FFTyxhQUZQLEVBRXFCLEdBRnJCLEVBRTBCO0FBQUNDLEtBQUcsQ0FBSjtBQUFNQyxhQUFVLENBQWhCO0FBQWtCQyxRQUFNQyxPQUFPQztBQUEvQixDQUYxQixFQUdFTCxJQUhGLENBR08sY0FIUCxFQUdzQixHQUh0QixFQUcyQjtBQUFDRSxhQUFXLENBQVo7QUFBY0MsUUFBTUcsT0FBT0Q7QUFBM0IsQ0FIM0IsRUFJRTtBQUpGLENBS0dFLFdBTEgsQ0FLZSxZQUxmLEVBSzZCLEdBTDdCLEVBS2tDO0FBQUNOLEtBQUcsQ0FBSjtBQUFNQyxhQUFVLENBQWhCO0FBQWtCQyxRQUFNRyxPQUFPRDtBQUEvQixDQUxsQyxFQUsyRSxJQUwzRSxFIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdmNjI3MTMxZGFjNDYzNzQ1ZWY3IiwiLy8gU3R5bGVzXG5pbXBvcnQgJ3N0eWxlcy9hcHAuc2Nzcyc7IFxuXG4vLyBTY3JpcHRzXG5pbXBvcnQgJy4vbWFpbi5qcyc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3R5bGVzL2FwcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIE1BSU5cblxuLy8gTW9iaWxlIG5hdlxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIHZhciB0cmlnZ2VyID0gJCgnI2pzLW5hdi10b2dnbGUnKTtcbiAgdmFyIGlzQ2xvc2VkID0gZmFsc2U7XG4gIHRyaWdnZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJCgnI2pzLW5hdi1tb2JpbGUnKS50b2dnbGVDbGFzcygnbmF2LW9wZW4nKTtcbiAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ25hdi1vcGVuJyk7XG5cdFx0JCgnI2pzLW5hdi10b2dnbGUnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gIH0pO1xufSk7XG5cbi8vIHNjcm9sbCBvbiBjbGljayBvZiBhbmNob3IgbGluayAoYSBocmVmPVwiI1wiKVxuJChmdW5jdGlvbigpIHtcbiAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArJ10nKTtcbiAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgOTAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcblxuLy8gdmFsaWRhdGUgb24gZm9ybXN1Ym1pdFxudmFyIGZvcm1TdWJtaXQgPSAkKCcjanMtZm9ybS1zdWJtaXQnKTtcbmZvcm1TdWJtaXQuY2xpY2soZnVuY3Rpb24oKSB7XG5cdHZhbGlkYXRlRm9ybSgpO1xuXHRyZXR1cm4gZmFsc2U7XG59KTtcblxuLy8gZm9ybSB2YWxpZGF0aW9uXG5mdW5jdGlvbiB2YWxpZGF0ZUZvcm0oKSB7XG5cdHZhciBlbWFpbCwgYXRwb3MsIGRvdHBvcywgdXNlcm5hbWU7XG5cblx0bmFtZSA9ICQoJyNuYW1lJykudmFsKCk7XG5cdGVtYWlsID0gJCgnI2VtYWlsJykudmFsKCk7XG5cdGF0cG9zID0gZW1haWwuaW5kZXhPZignQCcpO1xuXHRkb3Rwb3MgPSBlbWFpbC5sYXN0SW5kZXhPZignLicpO1xuXHRtZXNzYWdlID0gJCgnI21lc3NhZ2UnKS52YWwoKTtcblxuXHRpZiAobmFtZSA9PSBudWxsIHx8IG5hbWUgPT0gJycpIHtcblx0JCgnI2pzLWZvcm0tbWVzc2FnZScpLmFkZENsYXNzKCd0ZXh0LWVycm9yIHRleHQtbGFyZ2UnKS50ZXh0KCcqIFBsZWFzZSBlbnRlciB5b3VyIG5hbWUuJyk7XG5cdCQoJyNuYW1lJykuZm9jdXMoKTtcblx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmKGVtYWlsID09IG51bGwgfHwgZW1haWwgPT0gJycpIHtcblx0JCgnI2pzLWZvcm0tbWVzc2FnZScpLmFkZENsYXNzKCd0ZXh0LWVycm9yIHRleHQtbGFyZ2UnKS50ZXh0KCcqIFBsZWFzZSBlbnRlciB5b3VyIGVtYWlsLicpO1xuXHQkKCcjZW1haWwnKS5mb2N1cygpO1xuXHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYoYXRwb3MgPCAxIHx8IGRvdHBvcyA8IGF0cG9zKzIgfHwgZG90cG9zKzIgPj0gZW1haWwubGVuZ3RoKSB7XG5cdCQoJyNqcy1mb3JtLW1lc3NhZ2UnKS5hZGRDbGFzcygndGV4dC1lcnJvciB0ZXh0LWxhcmdlJykudGV4dCgnKiBQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLicpO1xuXHQkKCcjZW1haWwnKS5mb2N1cygpO1xuXHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKG1lc3NhZ2UgPT0gbnVsbCB8fCBtZXNzYWdlID09ICcnKSB7XG5cdCQoJyNqcy1mb3JtLW1lc3NhZ2UnKS5hZGRDbGFzcygndGV4dC1lcnJvciB0ZXh0LWxhcmdlJykudGV4dCgnKiBQbGVhc2UgZW50ZXIgeW91ciBtZXNzYWdlLicpO1xuXHQkKCcjbWVzc2FnZScpLmZvY3VzKCk7XG5cdHJldHVybiBmYWxzZTtcblx0fVxuXHRlbHNlIHtcblx0ICB2YXIgZGF0YXN0cmluZyA9ICQoXCIjanMtZm9ybVwiKS5zZXJpYWxpemUoKTtcblx0ICAkLmFqYXgoe1xuXHQgICAgLy9zZW5kIHRoZSBmb3JtIHVzaW5nIGZvcm1zcHJlZVxuXHQgICAgdXJsOiBcImh0dHBzOi8vZm9ybXNwcmVlLmlvL2JvdG9vbGU1MThAZ21haWwuY29tXCIsIFxuXHQgICAgbWV0aG9kOiBcIlBPU1RcIixcblx0ICAgIGRhdGE6IGRhdGFzdHJpbmcsXG5cdCAgICBkYXRhVHlwZTogXCJqc29uXCJcblx0ICB9KTtcblx0ICAkKCcjanMtZm9ybS1tZXNzYWdlJykuYWRkQ2xhc3MoJ3RleHQtc3VjY2VzcyB0ZXh0LWxhcmdlJykudGV4dCgnVGhhbmtzIGZvciByZWFjaGluZyBvdXQhIFlvdXIgbWVzc2FnZSBoYXMgYmVlbiBzZW50IHN1Y2Nlc3NmdWxseS4gSVxcJ2xsIGJlIGluIHRvdWNoIGFzIHNvb24gYXMgcG9zc2libGUuJyk7XG5cdCAgcmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbi8vIGFkZCBkaWZmZXJlbnQgYmcgY2xhc3MgbmFtZVxuLy8gZXggLSAnLmJnLWFsdDEnIHRvIGVhY2ggcG9zdCBpdGVtXG4kKCcucG9zdC1pdGVtJykuZWFjaChmdW5jdGlvbihpKSB7XG5cdHZhciBudW0gPSAoaSAlIDQpICsgMTsgLy9zdGFydCBpbmRleCBhdCAxXG5cdCQodGhpcykuYWRkQ2xhc3MoJ2JnLWFsdCcgKyBudW0pO1xuXHQkKHRoaXMpLmF0dHIoJ2RhdGEtaXRlbScsIGkpO1xufSk7XG5cbi8vdGwubWV0aG9kKGVsZW1lbnQsIGR1cmF0aW9uLCB2YXJzKSwgZGVsYXlcbnZhciB0bCA9IG5ldyBUaW1lbGluZU1heCh7fSk7XG50bFxuICAvLyBoZXJvOiB0aW1lbGluZVxuXHQuZnJvbSgnLmhlcm8tdGl0bGUnLDAuNSwge3k6IDAsYXV0b0FscGhhOjAsZWFzZTogUG93ZXIyLmVhc2VPdXR9KVxuXHQuZnJvbSgnLmhlcm8tc2Nyb2xsJywwLjUsIHthdXRvQWxwaGE6IDAsZWFzZTogUG93ZXIxLmVhc2VPdXR9KVxuICAvLyBuZXdzIHBhZ2U6IHRpbWVsaW5lIFxuICAuc3RhZ2dlckZyb20oJy5wb3N0LWl0ZW0nLCAwLjUsIHt5OiA1LGF1dG9BbHBoYTowLGVhc2U6IFBvd2VyMS5lYXNlT3V0fSwgMC4yNSlcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21haW4uanMiXSwic291cmNlUm9vdCI6IiJ9