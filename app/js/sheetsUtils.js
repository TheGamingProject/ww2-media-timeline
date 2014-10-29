var cleanTheData = function (rawData) {
  var cleanData = [];

  _.each(rawData.feed.entry, function (row) {
    var cleanRow = {};

    _.each(row, function (value, key) {
      if (key.substring(0,4) === 'gsx$') {
        var cleanKey = key.substring(4, key.length);
        cleanRow[cleanKey] = value['$t'];
      }
    });

    cleanData.push(cleanRow);
  });

  return cleanData;
};

var getCleanSheetJSON = function (spreadSheetId, callback) {
  var rawJSONUrl = 'https://spreadsheets.google.com/feeds/list/' + spreadSheetId + '/od6/public/values?alt=json';

  $.getJSON(rawJSONUrl, function (data) {
    console.log('Raw Data:');
    console.log(data);


    var cleanData = cleanTheData(data);
    console.log('Clean Data:');
    console.log(cleanData);

    callback(cleanData);
  });
};
