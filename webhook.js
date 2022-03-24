var body = {
    'app': kintone.app.getId()
  };
  
  kintone.api(kintone.api.url('/k/v1/app/customize.json', true), 'GET', body, function(resp) {
    // success
    console.log(resp);
  }, function(error) {
    // error
    console.log(error);
  });

  