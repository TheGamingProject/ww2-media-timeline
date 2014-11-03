$(function() {
	//$('.column-scroll-content.top').css({
	//	'top' : ($('.column-scroll-content').height()-$('.column-scroll-content').innerHeight())
	//});
		
	$('.popover').css({
		'width' : $('.popover-content').innerWidth()
	});
});
	
	
$(document).ready(function() {
    $('#toggle-info').click(function() {
    	$('.infopanel').animate({left: 0});
	});
	$('#toggle-close-infopanel').click(function() {
    	$('.infopanel').animate({left: -200});
	});
	$('#toggle-movies').click(function() {
  		$('.border-movie').fadeToggle();
  		console.log('movies toggle clicked');
	});
	$('#toggle-tv').click(function() {
  		$('.border-tv').fadeToggle();
  		console.log('tv toggle clicked');
	});
	$('#toggle-games').click(function() {
  		$('.border-game').fadeToggle();
  		console.log('games toggle clicked');
	});
	$('#toggle-showall').click(function() {
  		$('.border-movie').fadeIn();
  		$('.border-tv').fadeIn();
  		$('.border-game').fadeIn();
  		console.log('showall toggle clicked');
	});
});