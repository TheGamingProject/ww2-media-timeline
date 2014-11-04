// sept 1939 - jan 1946

var startDate = {month: 5, year: 1939},
  endDate = {month: 3, year: 1946};

var months = ['january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];


$(document).ready(function() {
  // executes when HTML-Document is loaded and DOM is ready

  var monthColumnTemplateScript = $("#monthColumn").html(),
    monthColumnTemplate = Handlebars.compile(monthColumnTemplateScript);


  var iDate = _.clone(startDate);
  while (!_.isEqual(iDate, endDate)) {
    var monthString = months[iDate.month];
    var contentObj = {
      month: monthString,
      isJanuary: monthString === 'january',
      monthShort: monthString.substring(0,3).toUpperCase(), 
      year: iDate.year
    }
    $('#main').append(monthColumnTemplate(contentObj));

    // increment iDate
    iDate.month++; 
    if (iDate.month === 12) {
      iDate.year++;
      iDate.month = 0;
    }
  }

});

var dateRegexp = /(\d|\d\d)\/(\d|\d\d)\/(\d\d\d\d)/;
var getDate = function (dateString) {
  var match = dateString.match(dateRegexp);

  if (match && match.length === 4) {
    return {
      month: months[Number(match[1]) - 1],
      year: match[2],
      year: match[3]
    };
  }
};



$(window).load(function() {
  // executes when complete page is fully loaded, including all frames, objects and images

  var ww2SheetId = '1ds09zgAuPCyoVugEvmABaYhFIpuKELg67e_Q5dR3pJs',
     ww2EventsId = '1MRJm6mlkOga76Y590pbaguB3C3LjI6368MCUXBGbY24';

  getCleanSheetJSON(ww2SheetId, function (resultJSON) {
    var ww2Info = [];
    var id = 0;

    _.each(resultJSON, function (resultRow) {
      var uniqueId = (id++) + ' - ' + resultRow.title;

      if (resultRow.episodechapter) {
        uniqueId += '-' + resultRow.episodechapter;
      }



      uniqueId = uniqueId.replace(/[#' :;\.]/g,"");

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
          episode: resultRow.episodechapter,
          medium: resultRow.medium.toLowerCase(),
          released: resultRow.releasedate,
          releasedYear: resultRow.releasedate.substring(resultRow.releasedate.length - 4),
          metacritic: resultRow.metacritic
        }
      });
    });

    var mediumButtonTemplateScript = $("#mediumButton").html(),
      mediumButtonTemplate = Handlebars.compile(mediumButtonTemplateScript),
      mediumModalTemplateScript = $("#mediumModal").html(),
      mediumModalTemplate = Handlebars.compile(mediumModalTemplateScript),
      mediumPopoverTemplateScript = $("#mediumPopover").html(),
      mediumPopoverTemplate = Handlebars.compile(mediumPopoverTemplateScript);


    _.each(ww2Info, function (row) {
      var date = getDate(row.depicted.date);

      if (!date) {
        console.log('skipping: no date');
        return;
      }

      var dateTopColId = '#' + date.year + "-" + date.month + "-month-col-top",
        dateBottomColId = '#' + date.year + "-" + date.month + "-month-col-bottom",
        popoverId = '#' + row.uniqueId + '-popover';

      //console.log(row);

      if (row.depicted.isEurope) {
        $(dateTopColId).prepend(mediumButtonTemplate(row));
      } else if (row.depicted.isPacific) {
        $(dateBottomColId).prepend(mediumButtonTemplate(row));
      }


      $('#modalArea').prepend(mediumModalTemplate(row));

      //set data-content of popover to handlbars template
      var htmlG = mediumPopoverTemplate(row);
      $(popoverId).attr('data-content', htmlG);
    });

    //http://stackoverflow.com/questions/18410922/bootstrap-3-0-popovers-and-tooltips
    $('[data-toggle="tooltip"]').tooltip({html: true, trigger: 'click', container: 'body'});
    $('[data-toggle="popover"]').popover({html: true, trigger: 'click','placement': 'right'});
  });
  getCleanSheetJSON(ww2EventsId, function (resultJSON) {
    var ww2Events = [];
    var id = 1;

    _.each(resultJSON, function (resultRow) {
      var uniqueEventId = (id++) + ' - ' + resultRow.date;



      uniqueEventId = uniqueEventId.replace(/[#' :;\.]/g,"");

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


    _.each(ww2Events, function (row) {
      var date = getDate(row.depicted.date);

      if (!date) {
        console.log('skipping: no event date');
        return;
      }

      var dateTopTimelineId = '#' + date.year + "-" + date.month + "-event-timeline-top",
        dateBottomTimelineId = '#' + date.year + "-" + date.month + "-event-timeline-bottom";

      //console.log(row);

      //set html of month timeline event div to the generatedHtml
      //  note that if a #dateTopTimelineId already has a event-tooltip it will be overwritten
      var generatedHtml = eventTooltipTemplate(row);

      if (row.depicted.europeEventExists) {
        $(dateTopTimelineId).html(generatedHtml);
      } else if (row.depicted.pacificEventExists) {
        $(dateBottomTimelineId).html(generatedHtml);
      }
    });

    //http://stackoverflow.com/questions/18410922/bootstrap-3-0-popovers-and-tooltips
    $('[data-toggle="tooltip"]').tooltip({html: true, trigger: 'click', container: 'body'});
    $('[data-toggle="popover"]').popover({html: true, trigger: 'click','placement': 'right'});

    initTooltips();
  });


});