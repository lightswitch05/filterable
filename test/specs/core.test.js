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
            "</tr>";
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

  expect(4);
  
  // Init
  $('#test-table').filterable();
  
  // Fill out filter
  $('#heading1 > i').click();
  $('#heading1').find('input').val('heading 1 value 20');
  $('#heading1').find('.editable-buttons > button[type="submit"]').click();
  
  // Validate
  var match = $('#test-table > tbody > tr.filterable-match').length;
  var noMatch = $('#test-table > tbody > tr.filterable-no-match').length;
  var allRows = $('#test-table > tbody > tr').length;
  strictEqual(match, 1, "Finds 1 matches");
  strictEqual(noMatch, 98, "Finds 98 non-matches");
  strictEqual(allRows, 100, "Finds the expected number of rows");
  strictEqual(match + noMatch, 99, "Every row is either a match or no-match");
});

/* Append wild card */
test("append wild card", function() {
  var rows = "";
  for(var i=1; i<100; i++){
    rows += "<tr>" +
              "<td>Heading 1 Value " + i + "</td>" +
              "<td>Heading 2 Value " + i + "</td>" +
              "<td>Heading 3 Value " + i + "</td>" +
              "<td>Heading 4 Value " + i + "</td>" +
            "</tr>";
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

  expect(4);
  
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
  strictEqual(match, 11, "Finds 11 matches");
  strictEqual(noMatch, 88, "Finds 88 non-matches");
  strictEqual(allRows, 100, "Finds the expected number of rows");
  strictEqual(match + noMatch, 99, "Every row is either a match or no-match");
});

/* Prepend wild card */
test("prepend wild card", function() {
  var rows = "";
  for(var i=1; i<100; i++){
    rows += "<tr>" +
              "<td>Heading 1 Value " + i + "</td>" +
              "<td>Heading 2 Value " + i + "</td>" +
              "<td>Heading 3 Value " + i + "</td>" +
              "<td>Heading 4 Value " + i + "</td>" +
            "</tr>";
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

  expect(4);
  
  // Init
  $('#test-table').filterable();
  
  // Fill out filter
  $('#heading1 > i').click();
  $('#heading1').find('input').val('1 value 2');
  $('#heading1').find('.editable-buttons > button[type="submit"]').click();
  
  // Validate
  var match = $('#test-table > tbody > tr.filterable-match').length;
  var noMatch = $('#test-table > tbody > tr.filterable-no-match').length;
  var allRows = $('#test-table > tbody > tr').length;
  strictEqual(match, 11, "Finds 11 matches");
  strictEqual(noMatch, 88, "Finds 88 non-matches");
  strictEqual(allRows, 100, "Finds the expected number of rows");
  strictEqual(match + noMatch, 99, "Every row is either a match or no-match");
});

/* Filters multiple columns */
test("filters multiple columns", function() {
  var rows = "";
  for(var i=1; i<100; i++){
    rows += "<tr>" +
              "<td>Heading 1 Value " + i + "</td>" +
              "<td>Heading 2 Value " + (i+1) + "</td>" +
              "<td>Heading 3 Value " + (i+2) + "</td>" +
              "<td>Heading 4 Value " + (i+3) + "</td>" +
            "</tr>";
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

  expect(4);
  
  // Init
  $('#test-table').filterable();
  
  // Fill out first filter
  $('#heading1 > i').click();
  $('#heading1').find('input').val('Heading 1 value 2');
  $('#heading1').find('.editable-buttons > button[type="submit"]').click();
  
  // Fill out second filter
  $('#heading2 > i').click();
  $('#heading2').find('input').val('Heading 2 value 2');
  $('#heading2').find('.editable-buttons > button[type="submit"]').click();
  
  // Validate
  var match = $('#test-table > tbody > tr.filterable-match').length;
  var noMatch = $('#test-table > tbody > tr.filterable-no-match').length;
  var allRows = $('#test-table > tbody > tr').length;
  strictEqual(match, 9, "Finds 9 matches");
  strictEqual(noMatch, 90, "Finds 90 non-matches");
  strictEqual(allRows, 100, "Finds the expected number of rows");
  strictEqual(match + noMatch, 99, "Every row is either a match or no-match");
});

/* Clears Filter */
test("clears filters", function() {
  var rows = "";
  for(var i=1; i<100; i++){
    rows += "<tr>" +
              "<td>Heading 1 Value " + i + "</td>" +
              "<td>Heading 2 Value " + (i+1) + "</td>" +
              "<td>Heading 3 Value " + (i+2) + "</td>" +
              "<td>Heading 4 Value " + (i+3) + "</td>" +
            "</tr>";
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

  expect(8);
  
  // Init
  $('#test-table').filterable();
  
  // Fill out first filter
  $('#heading1 > i').click();
  $('#heading1').find('input').val('Heading 1 value 2');
  $('#heading1').find('.editable-buttons > button[type="submit"]').click();
  
  // Fill out second filter
  $('#heading2 > i').click();
  $('#heading2').find('input').val('Heading 2 value 2');
  $('#heading2').find('.editable-buttons > button[type="submit"]').click();
  
  // Validate
  var match = $('#test-table > tbody > tr.filterable-match').length;
  var noMatch = $('#test-table > tbody > tr.filterable-no-match').length;
  var allRows = $('#test-table > tbody > tr').length;
  strictEqual(match, 9, "Finds 9 matches");
  strictEqual(noMatch, 90, "Finds 90 non-matches");
  strictEqual(allRows, 100, "Finds the expected number of rows");
  strictEqual(match + noMatch, 99, "Every row is either a match or no-match");
  
  // Clear Second Filter
  $('#heading2 > i').click();
  $('#heading2').find('input').val('');
  $('#heading2').find('.editable-buttons > button[type="submit"]').click();
  
  // Validate
  match = $('#test-table > tbody > tr.filterable-match').length;
  noMatch = $('#test-table > tbody > tr.filterable-no-match').length;
  allRows = $('#test-table > tbody > tr').length;
  strictEqual(match, 11, "Finds 11 matches");
  strictEqual(noMatch, 88, "Finds 88 non-matches");
  strictEqual(allRows, 100, "Finds the expected number of rows");
  strictEqual(match + noMatch, 99, "Every row is either a match or no-match");
});

/* Uses * as wild card */
test("uses * as wild card", function() {
  var rows = "";
  for(var i=1; i<100; i++){
    rows += "<tr>" +
              "<td>Heading 1 Value " + i + "</td>" +
              "<td>Heading 2 Value " + i + "</td>" +
              "<td>Heading 3 Value " + i + "</td>" +
              "<td>Heading 4 Value " + i + "</td>" +
            "</tr>";
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

  expect(4);
  
  // Init
  $('#test-table').filterable();
  
  // Fill out first filter
  $('#heading1 > i').click();
  $('#heading1').find('input').val('Heading 1 value *1');
  $('#heading1').find('.editable-buttons > button[type="submit"]').click();
  
  // Validate
  var match = $('#test-table > tbody > tr.filterable-match').length;
  var noMatch = $('#test-table > tbody > tr.filterable-no-match').length;
  var allRows = $('#test-table > tbody > tr').length;
  strictEqual(match, 19, "Finds 19 matches");
  strictEqual(noMatch, 80, "Finds 80 non-matches");
  strictEqual(allRows, 100, "Finds the expected number of rows");
  strictEqual(match + noMatch, 99, "Every row is either a match or no-match");
});

/* Uses column name as popup title */
test("uses coumn name as popup title", function() {
  var rows = "";
  for(var i=1; i<100; i++){
    rows += "<tr>" +
              "<td>Heading 1 Value " + i + "</td>" +
              "<td>Heading 2 Value " + i + "</td>" +
              "<td>Heading 3 Value " + i + "</td>" +
              "<td>Heading 4 Value " + i + "</td>" +
            "</tr>";
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

  expect(1);
  
  // Init
  $('#test-table').filterable();
  
  // Get value
  $('#heading1 > i').click();
  var actual = $('#heading1').find('.popover-title').text();

  // Validate
  strictEqual(actual, 'Enter filter for Heading 1', "Title is 'Enter filter for Heading 1'");
});