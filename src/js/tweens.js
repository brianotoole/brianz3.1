//TimelineMax & ScrollMagic
import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';   
//import { TimelineMax } from 'gsap';
// TweenMax
//tl.method(element, duration, vars), delay
/*var tl = new TimelineMax({});
tl
  // news page: timeline 
	.staggerFrom('.post-item', 0.5, {y: 5,autoAlpha:0,ease: Power1.easeOut}, 0.15)
	.to(".svg-web-gear", 5, {rotation:360,transformOrigin:"center center", ease:Linear.easeNone, repeat:-1})
	*/

// ScrollMagic
// Init
var controller = new ScrollMagic.Controller();

//pin the intro
var pinIntroScene = new ScrollMagic.Scene({
	triggerElement: '.section-hero',
	triggerHook: 0,
	duration: '100%'
})
.setPin('.section-hero', {pushFollowers: false})
.addTo(controller);

//loop through each el and build scene
$('.project-block, .hero-content').each(function() {
	//build a scene
	var projectScene = new ScrollMagic.Scene({
		//scene options
		triggerElement: this.children[0],
		triggerHook: 0.9,
		reverse: false
	})
	.setClassToggle(this, 'fadeIn') //add class to el
	//.addIndicators({name: 'fade scene',}) //indicators; uses plugin
	.addTo(controller);
});

//loop through each el and build scene
$('.svg').each(function() {
	//build a scene
	var projectScene = new ScrollMagic.Scene({
		//scene options
		triggerElement: this,
		triggerHook: 0.9,
		reverse: true
	})
	.setClassToggle(this, 'active') //add class to el
	//.addIndicators({name: 'svg scene',}) //indicators; uses plugin
	.addTo(controller);
});