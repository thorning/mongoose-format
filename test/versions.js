var assert = require('assert');
var Model  = require('./model');
var person;
var output;
var output_1;
var output_2;

before(() => {
  person = new Model({
    name : {
      first : 'Christoffer',
      last  : 'Hallas'
    },
    age : 23
  });
  output = person.format('standard');
  output_2 = person.format('standard', 2);
});

describe('version', () => {
  describe('format version default (1)', () => {
    it('should match first name', () => {
      assert.equal(output.name.first, person.name.first);
    });
    it('should match last name', () => {
      assert.equal(output.name.last, person.name.last);
    });
    it('should match age', () => {
      assert.equal(output.age, person.age);
    });
  });

  describe('format version 2', () => {
    it('should match full name', () => {
      assert.equal(output_2.name, person.name.first + ' ' + person.name.last);
    });
    it('should match age', () => {
      assert.equal(output_2.age, person.age);
    });
  });
});
