(function() {
    'use strict';
  
    kintone.events.on('app.record.detail.show', function(event) {
      var record = event.record;
      var limitDay = record.LimitDay.value;
      var query = 'LimitDay = "' + limitDay + '"';
  
      var body = {
        'app': kintone.app.getId(),
        'query': query
      };
  
      kintone.api(kintone.api.url('/k/v1/records', true), 'GET', body, function(resp) {
        // success
        window.alert(resp);
      }, function(error) {
        // error
        window.alert(error);
      });
      return event;
    });
  })();