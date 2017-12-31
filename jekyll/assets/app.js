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
  trigger.click(function () {
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
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGQzODU5ZGZjMTE4NGY4M2Q0MWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5IiwidHJpZ2dlciIsImlzQ2xvc2VkIiwiY2xpY2siLCJ0b2dnbGVDbGFzcyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJyZXBsYWNlIiwiaG9zdG5hbWUiLCJ0YXJnZXQiLCJoYXNoIiwibGVuZ3RoIiwic2xpY2UiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwiZm9ybVN1Ym1pdCIsInZhbGlkYXRlRm9ybSIsImVtYWlsIiwiYXRwb3MiLCJkb3Rwb3MiLCJ1c2VybmFtZSIsIm5hbWUiLCJ2YWwiLCJpbmRleE9mIiwibGFzdEluZGV4T2YiLCJtZXNzYWdlIiwiYWRkQ2xhc3MiLCJ0ZXh0IiwiZm9jdXMiLCJkYXRhc3RyaW5nIiwic2VyaWFsaXplIiwiYWpheCIsInVybCIsIm1ldGhvZCIsImRhdGEiLCJkYXRhVHlwZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7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QSxXQUFXLEVBQWxDLEVBQXNDO0FBQ3RDN0IsTUFBRSxrQkFBRixFQUFzQjhCLFFBQXRCLENBQStCLHVCQUEvQixFQUF3REMsSUFBeEQsQ0FBNkQsOEJBQTdEO0FBQ0EvQixNQUFFLFVBQUYsRUFBY2dDLEtBQWQ7QUFDQSxXQUFPLEtBQVA7QUFDQyxHQUpELE1BS0s7QUFDSCxRQUFJQyxhQUFhakMsRUFBRSxVQUFGLEVBQWNrQyxTQUFkLEVBQWpCO0FBQ0FsQyxNQUFFbUMsSUFBRixDQUFPO0FBQ0w7QUFDQUMsV0FBSywyQ0FGQTtBQUdMQyxjQUFRLE1BSEg7QUFJTEMsWUFBTUwsVUFKRDtBQUtMTSxnQkFBVTtBQUxMLEtBQVA7QUFPQXZDLE1BQUUsa0JBQUYsRUFBc0I4QixRQUF0QixDQUErQix5QkFBL0IsRUFBMERDLElBQTFELENBQStELDBHQUEvRDtBQUNBLFdBQU8sS0FBUDtBQUNEO0FBQ0QsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0ZDM4NTlkZmMxMTg0ZjgzZDQxYSIsIi8vIFN0eWxlc1xuaW1wb3J0ICdzdHlsZXMvYXBwLnNjc3MnOyBcblxuLy8gU2NyaXB0c1xuaW1wb3J0ICcuL21haW4uanMnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hcHAuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlcy9hcHAuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBNQUlOXG5cbi8vIE1vYmlsZSBuYXZcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICB2YXIgdHJpZ2dlciA9ICQoJyNqcy1uYXYtdG9nZ2xlJyk7XG4gIHZhciBpc0Nsb3NlZCA9IGZhbHNlO1xuICB0cmlnZ2VyLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQoJyNqcy1uYXYtbW9iaWxlJykudG9nZ2xlQ2xhc3MoJ25hdi1vcGVuJyk7XG4gICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCduYXYtb3BlbicpO1xuICAgICQoJyNqcy1uYXYtdG9nZ2xlJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICB9KTtcbn0pO1xuXG4vLyBzY3JvbGwgb24gY2xpY2sgb2YgYW5jaG9yIGxpbmsgKGEgaHJlZj1cIiNcIilcbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDkwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBmb3JtU3VibWl0ID0gJCgnI2pzLWZvcm0tc3VibWl0Jyk7XG5mb3JtU3VibWl0LmNsaWNrKGZ1bmN0aW9uKCkge1xuXHR2YWxpZGF0ZUZvcm0oKTtcblx0cmV0dXJuIGZhbHNlO1xufSk7XG5cbi8vIGZvcm0gdmFsaWRhdGlvblxuZnVuY3Rpb24gdmFsaWRhdGVGb3JtKCkge1xuXHR2YXIgZW1haWwsIGF0cG9zLCBkb3Rwb3MsIHVzZXJuYW1lO1xuXG5cdG5hbWUgPSAkKCcjbmFtZScpLnZhbCgpO1xuXHRlbWFpbCA9ICQoJyNlbWFpbCcpLnZhbCgpO1xuXHRhdHBvcyA9IGVtYWlsLmluZGV4T2YoJ0AnKTtcblx0ZG90cG9zID0gZW1haWwubGFzdEluZGV4T2YoJy4nKTtcblx0bWVzc2FnZSA9ICQoJyNtZXNzYWdlJykudmFsKCk7XG5cblx0aWYgKG5hbWUgPT0gbnVsbCB8fCBuYW1lID09ICcnKSB7XG5cdCQoJyNqcy1mb3JtLW1lc3NhZ2UnKS5hZGRDbGFzcygndGV4dC1lcnJvciB0ZXh0LWxhcmdlJykudGV4dCgnKiBQbGVhc2UgZW50ZXIgeW91ciBuYW1lLicpO1xuXHQkKCcjbmFtZScpLmZvY3VzKCk7XG5cdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZihlbWFpbCA9PSBudWxsIHx8IGVtYWlsID09ICcnKSB7XG5cdCQoJyNqcy1mb3JtLW1lc3NhZ2UnKS5hZGRDbGFzcygndGV4dC1lcnJvciB0ZXh0LWxhcmdlJykudGV4dCgnKiBQbGVhc2UgZW50ZXIgeW91ciBlbWFpbC4nKTtcblx0JCgnI2VtYWlsJykuZm9jdXMoKTtcblx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmKGF0cG9zIDwgMSB8fCBkb3Rwb3MgPCBhdHBvcysyIHx8IGRvdHBvcysyID49IGVtYWlsLmxlbmd0aCkge1xuXHQkKCcjanMtZm9ybS1tZXNzYWdlJykuYWRkQ2xhc3MoJ3RleHQtZXJyb3IgdGV4dC1sYXJnZScpLnRleHQoJyogUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcy4nKTtcblx0JCgnI2VtYWlsJykuZm9jdXMoKTtcblx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChtZXNzYWdlID09IG51bGwgfHwgbWVzc2FnZSA9PSAnJykge1xuXHQkKCcjanMtZm9ybS1tZXNzYWdlJykuYWRkQ2xhc3MoJ3RleHQtZXJyb3IgdGV4dC1sYXJnZScpLnRleHQoJyogUGxlYXNlIGVudGVyIHlvdXIgbWVzc2FnZS4nKTtcblx0JCgnI21lc3NhZ2UnKS5mb2N1cygpO1xuXHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0ZWxzZSB7XG5cdCAgdmFyIGRhdGFzdHJpbmcgPSAkKFwiI2pzLWZvcm1cIikuc2VyaWFsaXplKCk7XG5cdCAgJC5hamF4KHtcblx0ICAgIC8vc2VuZCB0aGUgZm9ybSB1c2luZyBmb3Jtc3ByZWVcblx0ICAgIHVybDogXCJodHRwczovL2Zvcm1zcHJlZS5pby9ib3Rvb2xlNTE4QGdtYWlsLmNvbVwiLCBcblx0ICAgIG1ldGhvZDogXCJQT1NUXCIsXG5cdCAgICBkYXRhOiBkYXRhc3RyaW5nLFxuXHQgICAgZGF0YVR5cGU6IFwianNvblwiXG5cdCAgfSk7XG5cdCAgJCgnI2pzLWZvcm0tbWVzc2FnZScpLmFkZENsYXNzKCd0ZXh0LXN1Y2Nlc3MgdGV4dC1sYXJnZScpLnRleHQoJ1RoYW5rcyBmb3IgcmVhY2hpbmcgb3V0ISBZb3VyIG1lc3NhZ2UgaGFzIGJlZW4gc2VudCBzdWNjZXNzZnVsbHkuIElcXCdsbCBiZSBpbiB0b3VjaCBhcyBzb29uIGFzIHBvc3NpYmxlLicpO1xuXHQgIHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tYWluLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==