$(document).ready(function() {
	$('body').animate({scrollLeft: 760});
	
    $('#toggle-info').click(function() {
    	$('.infopanel').animate({left: 0});
	});
	$('#toggle-close-infopanel').click(function() {
    	$('.infopanel').animate({left: -200});
	});
	$('#toggle-movies').click(function() {
		$(this).toggleClass('toggle-active');
  		$('.border-film').fadeToggle();
  		$('br.film').fadeToggle();
  		$('.column-scroll-content.top').animate({scrollTop:2000});
  		console.log('movies toggle clicked');
      setShowAll();
	});
	$('#toggle-tv').click(function() {
		$(this).toggleClass('toggle-active');
  		$('.border-television').fadeToggle();
  		$('br.television').fadeToggle();
  		$('.column-scroll-content.top').animate({scrollTop:2000});
  		console.log('tv toggle clicked');
      setShowAll();
	});
	$('#toggle-games').click(function() {
		$(this).toggleClass('toggle-active');
  		$('.border-videogame').fadeToggle();
  		$('br.videogame').fadeToggle();
  		$('.column-scroll-content.top').animate({scrollTop:2000});
  		console.log('games toggle clicked');
      setShowAll();
	});

  var showAll = function() {
    $('#toggle-movies').removeClass('toggle-active');
    $('.border-film').fadeIn();
    $('br.film').fadeIn();
    $('#toggle-tv').removeClass('toggle-active');
    $('.border-television').fadeIn();
    $('br.television').fadeIn();
    $('#toggle-games').removeClass('toggle-active');
    $('.border-videogame').fadeIn();
    $('br.videogame').fadeIn();
    $('.column-scroll-content.top').animate({scrollTop:2000});
    console.log('showall toggle clicked');
  };

  var hideAll = function() {
    $('#toggle-movies').addClass('toggle-active');
    $('.border-film').fadeOut();
    $('br.film').fadeOut();
    $('#toggle-tv').addClass('toggle-active');
    $('.border-television').fadeOut();
    $('br.television').fadeOut();
    $('#toggle-games').addClass('toggle-active');
    $('.border-videogame').fadeOut();
    $('br.videogame').fadeOut();
    $('.column-scroll-content.top').animate({scrollTop:2000});
    console.log('hideall toggle clicked');
  };

  var setHideAll = function () {
    $('#label-showhideall').html('HIDE ALL');
    toggleAll = 'hide';
  };

  var setShowAll = function () {
    $('#label-showhideall').html('SHOW ALL');
    toggleAll = 'show';
  };

  var toggleAll = 'hide';
  $('#toggle-showall').click(function () {
    if (toggleAll === 'show') {
      showAll();
      setHideAll();
    } else {
      hideAll();
      setShowAll();
    }
   });
	
	$('#main').on('click', function (e) {
		$('[data-toggle="popover"]').each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				$(this).popover('hide');
			}
		});
	});
	
});

var initNavigation = function () {
  var $body = $('body'),
    scrollPixelLength = 150,
    scrollTimeLength = 160;

  $("#arrow-right").click(function () {
    $body.animate({
      scrollLeft: $body.scrollLeft() + scrollPixelLength
    }, scrollTimeLength);
  });
  $("#arrow-left").click(function () {
    $body.animate({
      scrollLeft: $body.scrollLeft() - scrollPixelLength
    }, scrollTimeLength);
  });
};

var initTooltips = function () {
	$('.column-scroll-content.top').ready(function() {
		$('.column-scroll-content.top').animate({scrollTop:2000});
	});
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

var initGrabScroll = function () {
  var $monthWidthColumns = $('.month-width-column'),
    $body = $('body'),
    onMoveAndDown;

  $monthWidthColumns.on('mousedown',  function(e) {
    onMoveAndDown = function(evt) {
      $body.stop(false, true).animate({
        scrollLeft: e.pageX - evt.clientX
      });

      $body.on('mouseup', function (e) {
        $monthWidthColumns.off('mousemove', onMoveAndDown);
      });
    };

    $monthWidthColumns.on('mousemove', onMoveAndDown);
  });
};
