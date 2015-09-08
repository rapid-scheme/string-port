"use strict";
var $__source_45_location__;
var SourceLocation = ($__source_45_location__ = require("source-location"), $__source_45_location__ && $__source_45_location__.__esModule && $__source_45_location__ || {default: $__source_45_location__}).default;
var StringPort = function() {
  function StringPort(string) {
    this.source = 'data:text/plain;charset=utf-8,' + encodeURIComponent(string);
    this.string = string;
    this.index = 0;
    this.line = 1;
    this.column = 0;
  }
  return ($traceurRuntime.createClass)(StringPort, {
    peekChar: function() {
      if (this.index < this.string.length) {
        return this.string[this.index];
      }
      return '';
    },
    readChar: function() {
      if (this.index < this.string.length) {
        var char = this.string[this.index++];
        if (char === '\n') {
          this.column = 0;
          ++this.line;
        } else if (char === '\r') {
          this.column = 0;
        } else {
          ++this.column;
        }
        return char;
      }
      return "";
    },
    getPosition: function() {
      return {
        line: this.line,
        column: this.column
      };
    },
    location: function(start, end) {
      return new SourceLocation(this.source, start, end);
    }
  }, {});
}();
var $__default = StringPort;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
