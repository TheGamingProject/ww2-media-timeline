$(function() {
	$('.column-scroll-content.top').css({
		'margin-top' : $('.column-scroll-container').height()-$('.column-scroll-content').innerHeight()
	});
		
	$('.popover').css({
		'width' : $('.popover-content').innerWidth()
	});
});
	
	
$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip({'placement': 'top'});
    $('[data-toggle="popover"]').popover({html: true, trigger: 'click','placement': 'right'});
});