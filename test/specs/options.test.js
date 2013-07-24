module("options");

/* Ignores specific columns */
test("ignores specific columns", function() {
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

  expect(2);
  
  // Init
  $('#test-table').filterable({
    ignoreColumns: [0]
  });
  
  // Click heading 1
  $('#heading1 > div').click();
  var heading1 = $('#heading1').find('input').length;
  
  // Click heading 2
  $('#heading2 > div').click();
  var heading2 = $('#heading2').find('input').length;
  
  // Validate
  strictEqual(heading1, 0, "Heading 1 is ignored");
  strictEqual(heading2, 1, "Heading 2 is not ignored");
});

/* Only filter specific columns */
test("only filter specific columns", function() {
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

  expect(3);
  
  // Init
  $('#test-table').filterable({
    onlyColumns: [1]
  });
  
  // Click heading 1
  $('#heading1 > div').click();
  var heading1 = $('#heading1').find('input').length;
  
  // Click heading 2
  $('#heading2 > div').click();
  var heading2 = $('#heading2').find('input').length;
  
   // Click heading 3
  $('#heading3 > div').click();
  var heading3 = $('#heading3').find('input').length;
  
  // Validate
  strictEqual(heading1, 0, "Heading 1 is ignored");
  strictEqual(heading2, 1, "Heading 2 is not ignored");
  strictEqual(heading3, 0, "Heading 3 is ignored");
});

/* Case sensitive */
test("case sensitive", function() {
  var rows = "";
  for(var i=1; i<100; i++){
    rows += "<tr>" +
              "<td>HeAding 1 Value " + i + "</td>" +
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
      "</tr>" +
      "<tr>" +
        "<td>Value 1</td>" +
        "<td>Value 1</td>" +
        "<td>Value 1</td>" +
        "<td>Value 1</td>" +
      "</tr>" +
      "<tr>" +
        "<td>VALUE 2</td>" +
        "<td>Value 2</td>" +
        "<td>Value 2</td>" +
        "<td>Value 2</td>" +
      "</tr>" +
      "<tr>" +
        "<td>value 3</td>" +
        "<td>Value 3</td>" +
        "<td>Value 3</td>" +
        "<td>Value 3</td>" +
      "</tr>" +
      "</table>"
  );

  expect(4);
  
  // Init
  $('#test-table').filterable({
    ignoreCase: false
  });
  
  // Fill out first filter
  $('#heading1 > div').click();
  $('#heading1').find('input').val('VALUE');
  $('#heading1').find('.editable-buttons > button[type="submit"]').click();
  
  // Validate
  var match = $('#test-table > tbody > tr.filterable-match').length;
  var noMatch = $('#test-table > tbody > tr.filterable-mismatch').length;
  var allRows = $('#test-table > tbody > tr').length;
  strictEqual(match, 1, "Finds 1 matche");
  strictEqual(noMatch, 2, "Finds 2 non-matches");
  strictEqual(allRows, 4, "Finds the expected number of rows");
  strictEqual(match + noMatch, 3, "Every row is either a match or no-match");
});