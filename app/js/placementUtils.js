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
	$('.tooltip').css({
		'left' : ($('.tooltip').innerWidth())/2
	});
});