// sept 1939 - jan 1946

var startDate = {month: 8, year: 1939},
  endDate = {month: 0, year: 1946};

var months = ['january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];


$(document).ready(function() {
  // executes when HTML-Document is loaded and DOM is ready

  var monthColumnTemplateScript = $("#monthColumn").html(),
    monthColumnTemplate = Handlebars.compile(monthColumnTemplateScript);


  var iDate = _.clone(startDate);
  while (!_.isEqual(iDate, endDate)) {
    var contentObj = {
      month: months[iDate.month],
      year: iDate.year
    }
    $('#MEDIA-CONTAINER-TOP').append(monthColumnTemplate(contentObj));

    // increment iDate
    iDate.month++; 
    if (iDate.month === 12) {
      iDate.year++;
      iDate.month = 0;
    }
  }

});

var dateRegexp = /([\d|\d\d])\/[\d|\d\d]\/(\d\d\d\d)/;
var getDate = function (dateString) {
  var match = dateString.match(dateRegexp);

  if (match && match.length === 3) {
    return {
      month: months[Number(match[1]) - 1],
      year: match[2]
    };
  }
};

$(window).load(function() {
  // executes when complete page is fully loaded, including all frames, objects and images

  var ww2SheetId = '1ds09zgAuPCyoVugEvmABaYhFIpuKELg67e_Q5dR3pJs';

  getCleanSheetJSON(ww2SheetId, function (resultJSON) {
    var ww2Info = [];

    _.each(resultJSON, function (resultRow) {
      var uniqueId = resultRow.title;

      if (resultRow.episodechapter) {
        uniqueId += '-' + resultRow.episodechapter;
      }

      uniqueId = uniqueId.replace(/[#|'| ]/g,"");

      ww2Info.push({
        uniqueId: uniqueId,
        depicted: {
          date: resultRow.datesdepicted,
          location: resultRow.locations,
          event: resultRow.events,
          alliance: resultRow.sides,
          military: resultRow.military,
          division: resultRow.unitdivision,
          accuracy: resultRow.accuracy
        }, 
        media: {
          title: resultRow.title,
          episode: resultRow.episodechapter,
          medium: resultRow.medium.toLowerCase(),
          released: resultRow.released,
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

      var dateColId = '#' + date.year + "-" + date.month + "-month-col",
        popoverId = '#' + row.uniqueId + '-POPOVER';

      console.log(dateColId);
      console.log(popoverId);

      $(dateColId).prepend(mediumButtonTemplate(row));

      $('#modalArea').prepend(mediumModalTemplate(row));

      //set data-content of popover to handlbars template
      var htmlG = mediumPopoverTemplate(row);
      $(popoverId).attr('data-content', htmlG);
    });

    //http://stackoverflow.com/questions/18410922/bootstrap-3-0-popovers-and-tooltips
    $('[data-toggle="tooltip"]').tooltip({'placement': 'top'});
    $('[data-toggle="popover"]').popover({html: true, trigger: 'click','placement': 'right'});
  });


});