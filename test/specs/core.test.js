module("core");

/* Basic Usage */
test("basic usage", function() {
  var rows = "";
  for(var i=1; i<100; i++){
    rows += "<tr>" +
              "<td>Heading 1 Value " + i + "</td>" +
              "<td>Heading 2 Value " + i + "</td>" +
              "<td>Heading 3 Value " + i + "</td>" +
              "<td>Heading 4 Value " + i + "</td>" +
            "</tr>"
  }
  $("#qunit-fixture").html(
      "<table id='test-table'>" +
      "<tr>" +
        "<th id='heading1'>Heading 1</th>" +
        "<th id='heading2'>Heading 2</th>" +
        "<th id='heading3'>Heading 3</th>" +
        "<th id='heading4'>Heading 4</th>" +
      "</tr>" + rows + "</table>"
  );

  expect(3);
  
  // Init
  $('#test-table').filterable();
  
  // Fill out filter
  $('#heading1 > i').click();
  $('#heading1').find('input').val('heading 1 value 2');
  $('#heading1').find('.editable-buttons > button[type="submit"]').click();
  
  // Validate
  var match = $('#test-table > tbody > tr.filterable-match').length;
  var noMatch = $('#test-table > tbody > tr.filterable-no-match').length;
  var allRows = $('#test-table > tbody > tr').length;
  strictEqual(match, 11);
  strictEqual(noMatch, 88);
  strictEqual(allRows, 100);
});