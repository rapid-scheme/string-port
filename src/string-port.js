import SourceLocation from 'source-location';

export default class StringPort {
	constructor(string) {
		this.source = 'data:text/plain;charset=utf-8,' + encodeURIComponent(string);
		this.string = string;
		this.index = 0;
		this.line = 1;
		this.column = 0;
	}

	peekChar() {
        if (this.index < this.string.length) {
            return this.string[this.index];
        }
        return '';
    }

    readChar() {
        if (this.index < this.string.length) {
            const char = this.string[this.index++];
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
   	}

	getPosition() {
		return {line: this.line, column: this.column};
	}

	location(start, end) {
		return new SourceLocation(this.source, start, end);
	}
}