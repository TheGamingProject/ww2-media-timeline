$(document).ready(function() {
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
		$('.column-scroll-content.top').animate({scrollTop:2000});
	});
});