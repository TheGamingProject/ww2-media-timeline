// sept 1939 - jan 1946

var startDate = {month: 5, year: 1939},
  endDate = {month: 3, year: 1946};

var months = ['january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];


$(document).ready(function() {
  // executes when HTML-Document is loaded and DOM is ready

  var monthColumnTemplateScript = $("#monthColumn").html(),
    monthColumnTemplate = Handlebars.compile(monthColumnTemplateScript);


  // Add a div for each month the specified range using templates
  var iDate = _.clone(startDate);
  while (!_.isEqual(iDate, endDate)) {
    var monthString = months[iDate.month];
    var contentObj = {
      month: monthString,
      isJanuary: monthString === 'january',
      monthShort: monthString.substring(0,3).toUpperCase(), 
      year: iDate.year
    };
    $('#main').append(monthColumnTemplate(contentObj));

    // increment iDate
    iDate.month++; 
    if (iDate.month === 12) {
      iDate.year++;
      iDate.month = 0;
    }
  }

  initNavigation();
  initGrabScroll();
});


$(window).load(function() {
  // executes when complete page is fully loaded, including all frames, objects and images

  var ww2SheetId = '1ds09zgAuPCyoVugEvmABaYhFIpuKELg67e_Q5dR3pJs',
     ww2EventsId = '1MRJm6mlkOga76Y590pbaguB3C3LjI6368MCUXBGbY24';

  // Get ww2 mediaEntrys from google sheets
  getCleanSheetJSON(ww2SheetId, function (resultJSON) {
    var ww2Info = [];
    var id = 0;

    _.each(resultJSON, function (resultRow) {
      var uniqueId = (id++) + ' - ' + resultRow.title;

      if (resultRow.episodechapter) {
        uniqueId += '-' + resultRow.episodechapter;
      }

      uniqueId = uniqueId.replace(/[#' :;\.!]/g,"");

      // Transforming the json data into our mediaEntry format,
      //   which will be consumed by the mediumButton, mediumPopover & mediumModal templates
      ww2Info.push({
        uniqueId: uniqueId,
        depicted: {
          date: resultRow.datesdepicted,
          location: resultRow.locations,
          event: resultRow.events,
          alliance: resultRow.sides,
          military: resultRow.military,
          division: resultRow.unitdivision,
          accuracy: resultRow.accuracy,
          theater: resultRow.theater,
          isPacific: resultRow.theater === 'Pacific',
          isEurope: resultRow.theater === 'Europe'
        }, 
        media: {
          title: resultRow.title,
          imgtitle: resultRow.title.replace(/[#' :;\.!]/g,"").toLowerCase(),
          episode: resultRow.episodechapter,
          medium: resultRow.medium.toLowerCase(),
          released: resultRow.releasedate,
          releasedYear: resultRow.releasedate.substring(resultRow.releasedate.length - 4),
          metacritic: resultRow.metacritic,
          amazon: resultRow.amazon,
          canistreamit: resultRow.canistreamit,
          wiki: resultRow.wikipage
        }
      });
    });

    var mediumButtonTemplateScript = $("#mediumButton").html(),
      mediumButtonTemplate = Handlebars.compile(mediumButtonTemplateScript),
      mediumModalTemplateScript = $("#mediumModal").html(),
      mediumModalTemplate = Handlebars.compile(mediumModalTemplateScript),
      mediumPopoverTemplateScript = $("#mediumPopover").html(),
      mediumPopoverTemplate = Handlebars.compile(mediumPopoverTemplateScript);

    // Generate a button, popover & modal for each mediaEntry
    _.each(ww2Info, function (mediaEntry) {
      var date = getDate(mediaEntry.depicted.date);

      if (!date) {
        console.log('skipping: no date');
        return;
      }

      var dateTopColId = '#' + date.year + "-" + date.month + "-month-col-top",
        dateBottomColId = '#' + date.year + "-" + date.month + "-month-col-bottom",
        popoverId = '#' + mediaEntry.uniqueId + '-popover';

      //console.log(mediaEntry);

      // Add button to month column div
      if (mediaEntry.depicted.isEurope) {
        $(dateTopColId).append(mediumButtonTemplate(mediaEntry));
      } else if (mediaEntry.depicted.isPacific) {
        $(dateBottomColId).append(mediumButtonTemplate(mediaEntry));
      }

      // Add modal to DOM
      $('#modalArea').append(mediumModalTemplate(mediaEntry));

      //set data-content of popover to handlbars template
      var generatedHtml = mediumPopoverTemplate(mediaEntry);
      $(popoverId).attr('data-content', generatedHtml);
    });

    // Initialize all Popovers
    //http://stackoverflow.com/questions/18410922/bootstrap-3-0-popovers-and-tooltips
    $('[data-toggle="popover"]').popover({html: true, trigger: 'click','placement': 'right'});
  });

  // Get ww2 eventEntrys from google sheets
  getCleanSheetJSON(ww2EventsId, function (resultJSON) {
    var ww2Events = [];
    var id = 1;

    _.each(resultJSON, function (resultRow) {
      var uniqueEventId = (id++) + ' - ' + resultRow.date;

      uniqueEventId = uniqueEventId.replace(/[#' :;\.]/g,"");

      // Transforming the json data into our eventEntry format which will be consumed by the eventTooltip template
      ww2Events.push({
        uniqueEventId: uniqueEventId,
        depicted: {
          date: resultRow.date,
          theater: resultRow.theater,
          type: resultRow.type,
          text: resultRow.text,
          pacificEventExists: resultRow.theater === 'Pacific',
          europeEventExists: resultRow.theater === 'Europe'
        }
      });
    });

    var eventTooltipTemplateScript = $("#eventTooltip").html(),
      eventTooltipTemplate = Handlebars.compile(eventTooltipTemplateScript);

    // Generate a image and a tooltip for each eventEntry
    _.each(ww2Events, function (eventEntry) {
      var date = getDate(eventEntry.depicted.date);

      if (!date) {
        console.log('skipping: no event date');
        return;
      }

      var dateTopTimelineId = '#' + date.year + "-" + date.month + "-event-timeline-top",
        dateBottomTimelineId = '#' + date.year + "-" + date.month + "-event-timeline-bottom";

      //console.log(eventEntry);

      //set html of month timeline event div to the generatedHtml
      //  note that if a #dateTopTimelineId already has a event-tooltip it will be overwritten
      var generatedHtml = eventTooltipTemplate(eventEntry);

      if (eventEntry.depicted.europeEventExists) {
        $(dateTopTimelineId).html(generatedHtml);
      } else if (eventEntry.depicted.pacificEventExists) {
        $(dateBottomTimelineId).html(generatedHtml);
      }
    });

    initTooltips();
  });

});
