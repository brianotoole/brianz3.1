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
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGM0MzViZWY0MDczZTliMTc2MGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5IiwidHJpZ2dlciIsImlzQ2xvc2VkIiwib24iLCJ0b2dnbGVDbGFzcyIsImNsaWNrIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInJlcGxhY2UiLCJob3N0bmFtZSIsInRhcmdldCIsImhhc2giLCJsZW5ndGgiLCJzbGljZSIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJmb3JtU3VibWl0IiwidmFsaWRhdGVGb3JtIiwiZW1haWwiLCJhdHBvcyIsImRvdHBvcyIsInVzZXJuYW1lIiwibmFtZSIsInZhbCIsImluZGV4T2YiLCJsYXN0SW5kZXhPZiIsIm1lc3NhZ2UiLCJhZGRDbGFzcyIsInRleHQiLCJmb2N1cyIsImRhdGFzdHJpbmciLCJzZXJpYWxpemUiLCJhamF4IiwidXJsIiwibWV0aG9kIiwiZGF0YSIsImRhdGFUeXBlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7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QUNELE1BQUlILFdBQVcsSUFBWCxJQUFtQkEsV0FBVyxFQUFsQyxFQUFzQztBQUN0QzlCLE1BQUUsa0JBQUYsRUFBc0IrQixRQUF0QixDQUErQix1QkFBL0IsRUFBd0RDLElBQXhELENBQTZELDhCQUE3RDtBQUNBaEMsTUFBRSxVQUFGLEVBQWNpQyxLQUFkO0FBQ0EsV0FBTyxLQUFQO0FBQ0MsR0FKRCxNQUtLO0FBQ0gsUUFBSUMsYUFBYWxDLEVBQUUsVUFBRixFQUFjbUMsU0FBZCxFQUFqQjtBQUNBbkMsTUFBRW9DLElBQUYsQ0FBTztBQUNMO0FBQ0FDLFdBQUssMkNBRkE7QUFHTEMsY0FBUSxNQUhIO0FBSUxDLFlBQU1MLFVBSkQ7QUFLTE0sZ0JBQVU7QUFMTCxLQUFQO0FBT0F4QyxNQUFFLGtCQUFGLEVBQXNCK0IsUUFBdEIsQ0FBK0IseUJBQS9CLEVBQTBEQyxJQUExRCxDQUErRCwwR0FBL0Q7QUFDQSxXQUFPLEtBQVA7QUFDRDtBQUNELEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGM0MzViZWY0MDczZTliMTc2MGUiLCIvLyBTdHlsZXNcbmltcG9ydCAnc3R5bGVzL2FwcC5zY3NzJzsgXG5cbi8vIFNjcmlwdHNcbmltcG9ydCAnLi9tYWluLmpzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZXMvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gTUFJTlxuXG4vLyBNb2JpbGUgbmF2XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgdmFyIHRyaWdnZXIgPSAkKCcjanMtbmF2LXRvZ2dsZScpO1xuICB2YXIgaXNDbG9zZWQgPSBmYWxzZTtcbiAgdHJpZ2dlci5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAkKCcjanMtbmF2LW1vYmlsZScpLnRvZ2dsZUNsYXNzKCduYXYtb3BlbicpO1xuICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbmF2LW9wZW4nKTtcblx0XHQkKCcjanMtbmF2LXRvZ2dsZScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgfSk7XG59KTtcblxuLy8gc2Nyb2xsIG9uIGNsaWNrIG9mIGFuY2hvciBsaW5rIChhIGhyZWY9XCIjXCIpXG4kKGZ1bmN0aW9uKCkge1xuICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgICAgICB9LCA5MDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vLyB2YWxpZGF0ZSBvbiBmb3Jtc3VibWl0XG52YXIgZm9ybVN1Ym1pdCA9ICQoJyNqcy1mb3JtLXN1Ym1pdCcpO1xuZm9ybVN1Ym1pdC5jbGljayhmdW5jdGlvbigpIHtcblx0dmFsaWRhdGVGb3JtKCk7XG5cdHJldHVybiBmYWxzZTtcbn0pO1xuXG4vLyBmb3JtIHZhbGlkYXRpb25cbmZ1bmN0aW9uIHZhbGlkYXRlRm9ybSgpIHtcblx0dmFyIGVtYWlsLCBhdHBvcywgZG90cG9zLCB1c2VybmFtZTtcblxuXHRuYW1lID0gJCgnI25hbWUnKS52YWwoKTtcblx0ZW1haWwgPSAkKCcjZW1haWwnKS52YWwoKTtcblx0YXRwb3MgPSBlbWFpbC5pbmRleE9mKCdAJyk7XG5cdGRvdHBvcyA9IGVtYWlsLmxhc3RJbmRleE9mKCcuJyk7XG5cdG1lc3NhZ2UgPSAkKCcjbWVzc2FnZScpLnZhbCgpO1xuXG5cdGlmIChuYW1lID09IG51bGwgfHwgbmFtZSA9PSAnJykge1xuXHQkKCcjanMtZm9ybS1tZXNzYWdlJykuYWRkQ2xhc3MoJ3RleHQtZXJyb3IgdGV4dC1sYXJnZScpLnRleHQoJyogUGxlYXNlIGVudGVyIHlvdXIgbmFtZS4nKTtcblx0JCgnI25hbWUnKS5mb2N1cygpO1xuXHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYoZW1haWwgPT0gbnVsbCB8fCBlbWFpbCA9PSAnJykge1xuXHQkKCcjanMtZm9ybS1tZXNzYWdlJykuYWRkQ2xhc3MoJ3RleHQtZXJyb3IgdGV4dC1sYXJnZScpLnRleHQoJyogUGxlYXNlIGVudGVyIHlvdXIgZW1haWwuJyk7XG5cdCQoJyNlbWFpbCcpLmZvY3VzKCk7XG5cdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZihhdHBvcyA8IDEgfHwgZG90cG9zIDwgYXRwb3MrMiB8fCBkb3Rwb3MrMiA+PSBlbWFpbC5sZW5ndGgpIHtcblx0JCgnI2pzLWZvcm0tbWVzc2FnZScpLmFkZENsYXNzKCd0ZXh0LWVycm9yIHRleHQtbGFyZ2UnKS50ZXh0KCcqIFBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuJyk7XG5cdCQoJyNlbWFpbCcpLmZvY3VzKCk7XG5cdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAobWVzc2FnZSA9PSBudWxsIHx8IG1lc3NhZ2UgPT0gJycpIHtcblx0JCgnI2pzLWZvcm0tbWVzc2FnZScpLmFkZENsYXNzKCd0ZXh0LWVycm9yIHRleHQtbGFyZ2UnKS50ZXh0KCcqIFBsZWFzZSBlbnRlciB5b3VyIG1lc3NhZ2UuJyk7XG5cdCQoJyNtZXNzYWdlJykuZm9jdXMoKTtcblx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGVsc2Uge1xuXHQgIHZhciBkYXRhc3RyaW5nID0gJChcIiNqcy1mb3JtXCIpLnNlcmlhbGl6ZSgpO1xuXHQgICQuYWpheCh7XG5cdCAgICAvL3NlbmQgdGhlIGZvcm0gdXNpbmcgZm9ybXNwcmVlXG5cdCAgICB1cmw6IFwiaHR0cHM6Ly9mb3Jtc3ByZWUuaW8vYm90b29sZTUxOEBnbWFpbC5jb21cIiwgXG5cdCAgICBtZXRob2Q6IFwiUE9TVFwiLFxuXHQgICAgZGF0YTogZGF0YXN0cmluZyxcblx0ICAgIGRhdGFUeXBlOiBcImpzb25cIlxuXHQgIH0pO1xuXHQgICQoJyNqcy1mb3JtLW1lc3NhZ2UnKS5hZGRDbGFzcygndGV4dC1zdWNjZXNzIHRleHQtbGFyZ2UnKS50ZXh0KCdUaGFua3MgZm9yIHJlYWNoaW5nIG91dCEgWW91ciBtZXNzYWdlIGhhcyBiZWVuIHNlbnQgc3VjY2Vzc2Z1bGx5LiBJXFwnbGwgYmUgaW4gdG91Y2ggYXMgc29vbiBhcyBwb3NzaWJsZS4nKTtcblx0ICByZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbWFpbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=