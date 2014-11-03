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
  		$('.border-movie').toggle( "slow" );
  		console.log('movies toggle clicked');
	});
	$('#toggle-tv').click(function() {
  		$('.border-tv').toggle( "slow" );
  		console.log('tv toggle clicked');
	});
	$('#toggle-games').click(function() {
  		$('.border-game').toggle( "slow" );
  		console.log('games toggle clicked');
	});
	$('#toggle-showall').click(function() {
  		$('.border-movie').show();
  		$('.border-tv').show();
  		$('.border-game').show();
  		console.log('showall toggle clicked');
	});
});