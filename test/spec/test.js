/*global describe, it */
'use strict';
(function () {
    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
            it('should run here few assertions', function () {

            });
        });
    });
})();

test("truthy", function() {
  ok(true, "true is truthy");
  equal(1, true, "1 is truthy");
  notEqual(0, true, "0 is NOT truthy");
});
