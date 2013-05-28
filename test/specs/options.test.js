module("options");

/* Ignores specific columns */
test("ignores specific columns", function() {
  var rows = "";
  for(var i=1; i<100; i++){
    rows += "<div class='tr'>" +
              "<div class='td'>Heading 1 Value " + i + "</div>" +
              "<div class='td'>Heading 2 Value " + i + "</div>" +
              "<div class='td'>Heading 3 Value " + i + "</div>" +
              "<div class='td'>Heading 4 Value " + i + "</div>" +
            "</div>";
  }
  $("#qunit-fixture").html(
      "<div class='table' id='test-table'>" +
      "<div class='tr'>" +
        "<div class='th' id='heading1'>Heading 1</div>" +
        "<div class='th' id='heading2'>Heading 2</div>" +
        "<div class='th' id='heading3'>Heading 3</div>" +
        "<div class='th' id='heading4'>Heading 4</div>" +
      "</div>" + rows + "</div>"
  );

  expect(2);
  
  // Init
  $('#test-table').filterable({
    ignoreColumns: [0]
  });
  
  // Click heading 1
  $('#heading1 > i').click();
  var heading1 = $('#heading1').find('input').length;
  
  // Click heading 2
  $('#heading2 > i').click();
  var heading2 = $('#heading2').find('input').length;
  
  // Validate
  strictEqual(heading1, 0, "Heading 1 is ignored");
  strictEqual(heading2, 1, "Heading 2 is not ignored");
});

/* Only filter specific columns */
test("only filter specific columns", function() {
  var rows = "";
  for(var i=1; i<100; i++){
    rows += "<div class='tr'>" +
              "<div class='td'>Heading 1 Value " + i + "</div>" +
              "<div class='td'>Heading 2 Value " + i + "</div>" +
              "<div class='td'>Heading 3 Value " + i + "</div>" +
              "<div class='td'>Heading 4 Value " + i + "</div>" +
            "</div>";
  }
  $("#qunit-fixture").html(
      "<div class='table' id='test-table'>" +
      "<div class='tr'>" +
        "<div class='th' id='heading1'>Heading 1</div>" +
        "<div class='th' id='heading2'>Heading 2</div>" +
        "<div class='th' id='heading3'>Heading 3</div>" +
        "<div class='th' id='heading4'>Heading 4</div>" +
      "</div>" + rows + "</div>"
  );

  expect(3);
  
  // Init
  $('#test-table').filterable({
    onlyColumns: [1]
  });
  
  // Click heading 1
  $('#heading1 > i').click();
  var heading1 = $('#heading1').find('input').length;
  
  // Click heading 2
  $('#heading2 > i').click();
  var heading2 = $('#heading2').find('input').length;
  
   // Click heading 3
  $('#heading3 > i').click();
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
    rows += "<div class='tr'>" +
              "<div class='td'>Heading 1 Value " + i + "</div>" +
              "<div class='td'>Heading 2 Value " + i + "</div>" +
              "<div class='td'>Heading 3 Value " + i + "</div>" +
              "<div class='td'>Heading 4 Value " + i + "</div>" +
            "</div>";
  }
  $("#qunit-fixture").html(
      "<div class='table' id='test-table'>" +
      "<div class='tr'>" +
        "<div class='th' id='heading1'>Heading 1</div>" +
        "<div class='th' id='heading2'>Heading 2</div>" +
        "<div class='th' id='heading3'>Heading 3</div>" +
        "<div class='th' id='heading4'>Heading 4</div>" +
      "</div>" +
      "<div class='tr'>" +
        "<div class='td'>Value 1</div>" +
        "<div class='td'>Value 1</div>" +
        "<div class='td'>Value 1</div>" +
        "<div class='td'>Value 1</div>" +
      "</div>" +
      "<div class='tr'>" +
        "<div class='td'>VALUE 2</div>" +
        "<div class='td'>Value 2</div>" +
        "<div class='td'>Value 2</div>" +
        "<div class='td'>Value 2</div>" +
      "</div>" +
      "<div class='tr'>" +
        "<div class='td'>value 3</div>" +
        "<div class='td'>Value 3</div>" +
        "<div class='td'>Value 3</div>" +
        "<div class='td'>Value 3</div>" +
      "</div>" +
      "</div>"
  );

  expect(4);
  
  // Init
  $('#test-table').filterable({
    ignoreCase: false
  });
  
  // Fill out first filter
  $('#heading1 > i').click();
  $('#heading1').find('input').val('VALUE');
  $('#heading1').find('.editable-buttons > button[type="submit"]').click();
  
  // Validate
  var match = $('#test-table > .tr.filterable-match').length;
  var noMatch = $('#test-table > .tr.filterable-no-match').length;
  var allRows = $('#test-table > .tr').length;
  strictEqual(match, 1, "Finds 1 matche");
  strictEqual(noMatch, 2, "Finds 2 non-matches");
  strictEqual(allRows, 4, "Finds the expected number of rows");
  strictEqual(match + noMatch, 3, "Every row is either a match or no-match");
});