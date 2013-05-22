module("core");

/* Basic Usage */
test("basic usage", function() {
  $("#qunit-fixture").html(
      "<table id='test-table'>" +
      "</table>"
    );

  expect(1);
  deepEqual(true, true);
});