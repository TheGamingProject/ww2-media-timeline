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
