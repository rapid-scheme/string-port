import StringPort from '../src/string-port';

const assert = require("assert");

describe('StringPort', () => {
	const text = 'Hello\nWorld';
	let stringPort;
	beforeEach(() => {
		stringPort = new StringPort(text);
	});

	describe('#readChar', () => {
		it('should read the characters sequentially', () => {
			for (let i = 0; i < text.length; ++i) {
				assert.equal(stringPort.readChar(), text[i]);
			}
		});

		it('should detect the end of the string', () => {
			for (let i = 0; i < text.length; ++i) {
				assert.notEqual(stringPort.readChar(), '');
			}
			assert.equal(stringPort.readChar(), '');
		});

		it('should keep track of the current column', () => {
			assert.equal(stringPort.column, 0);
			stringPort.readChar();
			assert.equal(stringPort.column, 1);
		});

		it('should keep track of the current line', () => {
			assert.equal(stringPort.line, 1);
			while (stringPort.readChar() != '\n');
			assert.equal(stringPort.line, 2);
			assert.equal(stringPort.column, 0);
		});
	})

	describe('#peekChar', () => {
		it('should not move forward the file pointer', () => {
			assert.equal(stringPort.peekChar(), text[0]);
			assert.equal(stringPort.peekChar(), text[0]);
		});
	});
});