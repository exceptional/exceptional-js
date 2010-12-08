var Exceptional = {
  KEY : null,
  HOST : 'api.getexceptional.com',
  handle: function (msg,url,line) {
    if (Exceptional.KEY) {
      var request = document.createElement('iframe');
      var protocol_version = 5;
      request.style.width   = '1px';
      request.style.height  = '1px';
      request.style.display = 'none';
      var api_url     = document.location.protocol + '//' + Exceptional.HOST + '/api/errors/new?protocol_version=' + protocol_version + '&msg=' + escape(msg) + '&url=' + escape(url) + '&line=' + escape(line) + '&api_key=' + Exceptional.KEY;
      request.src = api_url;
      if (document.body) {
        document.body.appendChild(request);
      } else{
        addLoadEvent(function() {
          document.body.appendChild(request);
        });
      };
      
    };
    return api_url;
  },
  setKey: function (key) {
    Exceptional.KEY = key;
  },
  setHost: function (host) {
    Exceptional.HOST = host;
  }
};

window.onerror = function(msg, url, line) {
  Exceptional.handle(msg,url,line);
};

// nice way to register the execution of some code when  the page has finished loading - from http://simonwillison.net/2004/May/26/addLoadEvent/
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    };
  }
}
