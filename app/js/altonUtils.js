$(document).ready(function() {
	$('body').animate({scrollLeft: 760});
	
    var $step = $(".month-width-column"),
    $body = $('body'),
    pos = 0;

	$("#arrow-right").click(function () {
		var $nextStep = $step.first();

		pos += 3;
		$step.length > pos ? $nextStep = $($step[pos]) : pos = 0;

		$body.animate({
			scrollLeft: $nextStep.offset().left + $body.scrollLeft()
		}, 500);
		
		console.log('arrow right clicked');
	});
	
    $('#toggle-info').click(function() {
    	$('.infopanel').animate({left: 0});
	});
	$('#toggle-close-infopanel').click(function() {
    	$('.infopanel').animate({left: -200});
	});
	$('#toggle-movies').click(function() {
  		$('.border-movie').fadeToggle();
  		$('br.movie').fadeToggle();
  		console.log('movies toggle clicked');
	});
	$('#toggle-tv').click(function() {
  		$('.border-tv').fadeToggle();
  		$('br.tv').fadeToggle();
  		console.log('tv toggle clicked');
	});
	$('#toggle-games').click(function() {
  		$('.border-game').fadeToggle();
  		$('br.game').fadeToggle();
  		console.log('games toggle clicked');
	});
	$('#toggle-showall').click(function() {
  		$('.border-movie').fadeIn();
  		$('br.movie').fadeIn();
  		$('.border-tv').fadeIn();
  		$('br.tv').fadeIn();
  		$('.border-game').fadeIn();
  		$('br.game').fadeIn();
  		console.log('showall toggle clicked');
	});
	
	$('#main').on('click', function (e) {
		$('[data-toggle="popover"]').each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				$(this).popover('hide');
			}
		});
	});
	
	$('.column-scroll-content.top').ready(function() {
		$('.column-scroll-content.top').animate({scrollRight:1000});
	});
});

var initTooltips = function () {
	$('.event-tooltip-top').tooltipsy({
		offset: [0, -10],
		css: {
			'margin-right':'-38px',
			'padding': '3px 8px',
			'max-width': '200px',
			'color': '#fff',
			'background-color': '#000000',
			'border-radius': '4px',
			'font-family': 'Source Sans Pro',
			'font-size': '12px'
		}
	});
	$('.event-tooltip-bottom').tooltipsy({
		offset: [0, 34],
		css: {
			'margin-right':'-38px',
			'padding': '3px 8px',
			'max-width': '200px',
			'color': '#fff',
			'background-color': '#000000',
			'border-radius': '4px',
			'font-family': 'Source Sans Pro',
			'font-size': '12px'
		}
	});
};
