// Methods for stubbing HTTP requests and responses
module.exports = {

  response: function() {
    this._ended = false;
    this._responseCode = null;
    this._headers = null;
    this._data = null;

    this.writeHead = function(responseCode, headers) {
      this._responseCode = responseCode;
      this._headers = headers;
    }.bind(this);

    this.end = function(data) {
      this._ended = true;
      this._data = data;
    }.bind(this);
  },

  request: function(url, method, postdata) {
    this.url = url;
    this.method = method;
    this._postData = postdata;
    this.setEncoding = function() { /* noop */ };
    
    // This is how you collect and send back information on a request
    this.addListener = this.on = function(type, callback) {
      if (type === 'data') {
        // console.log('POSTDATA ', this._postData);
        callback(JSON.stringify(this._postData));
      }

      if (type === 'end') {
        callback();
      }

    }.bind(this);
  }

};
