var assert = require('assert'),
    Model  = require('./model');

var person, output, output_1, output_2;

before(function () {
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

describe('version', function () {
  describe('format version default (1)', function () {
    it('should match first name', function () {
      assert.equal(output.name.first, person.name.first);
    });
    it('should match last name', function () {
      assert.equal(output.name.last, person.name.last);
    });
    it('should match age', function () {
      assert.equal(output.age, person.age);
    });
  });

  describe('format version 2', function () {
    it('should match full name', function () {
      assert.equal(output_2.name, person.name.first + ' ' + person.name.last);
    });
    it('should match age', function () {
      assert.equal(output_2.age, person.age);
    });
  });
});
