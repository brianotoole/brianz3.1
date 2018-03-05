// Uses GSAP (TweenMax) + ScrollMagic
import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import TweenMax from 'gsap/src/uncompressed/TweenMax';
import TimelineMax from 'gsap/src/uncompressed/TimelineMax'; 


// init GSAP TimelineMax & ScrollMagic controllers
var tl = new TimelineMax();
var tl1 = new TimelineMax();
var controller = new ScrollMagic.Controller();


$(document).ready(function () {
	tl
	  .set('.pre-loader', {className:"+=is-loading"})
		.fromTo('.is-loading', 0.25, {width:"0%"}, {width: "100%", ease: Power0.easeNone })
		//.fromTo('.is-loading', 0.25, {width: "100%"}, {backgroundColor: "white",width: "0%", ease: Power0.easeNone})
		.set('.pre-loader', {className:"-=is-loading"})
});


//Pin Intro Hero
var pinIntroScene = new ScrollMagic.Scene({
	triggerElement: '.section-hero',
	triggerHook: 0,
	duration: '100%'
})
.setPin('.section-hero', {pushFollowers: false})
.addTo(controller);

// FadeInNav
// when scrolled to triggerElement return a tween to timeline
/*
function fadeInNavItems() {
	tl.add(
		TweenMax.from('.logo-container', 0.2, {
			autoAlpha: 0,
			x: -5,
			ease: Power1.easeOut
		})
	);
	tl.add(
		TweenMax.from('.header-contact-btn', 0.2, {
			autoAlpha: 0,
			x: 5,
			ease: Power1.easeOut
		})
	);
}
*/

function fadeInHero() {
	//loop through each el and build scene
	$('.hero-content').each(function() {
		//build a scene
		var projectScene = new ScrollMagic.Scene({
			//scene options
			triggerElement: this.children[0],
			triggerHook: 0.9,
			reverse: false
		})
		.setTween(tl)
		//.setClassToggle(this, 'fadeIn') //add class to el
		//.addIndicators({name: 'fade scene',}) //indicators; uses plugin
		.addTo(controller);
		return tl
		//.set('body', {className:'+=loading'})
		//.set('body', {className:'-=loading'})
		.from(this, 0.8, {y: 5,autoAlpha:0,ease: Linear.easeNone})
		.from('.hero-scroll', 0.8, {autoAlpha:0,ease: Linear.easeNone})
	});
}

// Stagger News Items
// when scrolled to triggerElement return a tween to timeline
function staggerNewsItems() {
	var newsScene = new ScrollMagic.Scene({
		//scene options
		triggerElement: '.post-item',
		triggerHook: 0.9,
		reverse: false
	})
		.setTween(tl1)
		//.addIndicators() //debug only
		.addTo(controller);
	return tl1.staggerFrom('.post-item', 0.5, {y: 5,autoAlpha:0,ease: Power1.easeOut}, 0.15)
}


function drawSvg() {
  //loop through each el and build scene
	$('.svg').each(function() {
		//build a scene
		var projectScene = new ScrollMagic.Scene({
			//scene options
			triggerElement: this,
			triggerHook: 0.9,
			reverse: false
		})
		.setClassToggle(this, 'active') //add class to el
		//.addIndicators({name: 'svg scene',}) //indicators; uses plugin
		.addTo(controller);
	});
}

// On ready
$(function () {
	//fadeInNavItems();
	fadeInHero();
	drawSvg();
  // If News page
	if ($(".page-news").length > 0) {
		staggerNewsItems();
	}
});

