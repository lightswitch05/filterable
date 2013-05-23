/**
 * filterable
 * jQuery plugin that filters an HTML table based on column-specific values using x-editable
 *
 * @author Daniel White
 * @copyright Daniel White 2013
 * @license MIT <https://github.com/lightswitch05/filterable/blob/master/MIT-LICENSE>
 * @link https://github.com/lightswitch05/filterable
 * @module filterable
 * @version 0.0.1
 */

(function( $ ) {
  $.fn.filterable = function(opts) {

    // Set options
    var defaults = {
      ignoreColumns: [],
      onlyColumns: null
    };
    opts = $.extend(defaults, opts);

    var notNull = function(value) {
      if(value !== undefined && value !== null) {
        return true;
      }
      return false;
    };
    
    var isMatch = function(query, value) {
      var expression = new RegExp('.*' + query + '.*', 'i');
      return expression.test(value) === true;
    };
    
    var doFilter = function(value, element) {
      var table = element.closest('table');
      var index = element.data('name');
      table.children('tbody,*').children('tr').each(function(rowIndex, row) {
        if( rowIndex !== 0 ) {
          var cell = $(row).children('td').eq(index);
          var text = $.trim(cell.text());
          if(isMatch(value, text) ) {
            cell.closest('tr').show();
          } else {
            cell.closest('tr').hide();
          }
        }
      });
    };
    
    var popOver = function(icon) {
      $(icon).editable({
        send: 'never',
        type: 'text',
        emptytext: '',
        display: function() {
          $(this).text('');
        }
      });
    };

    var addListener = function(element) {
      element.on('save', function(e, params) {
        doFilter(params.newValue, element);
      });
    };

    var addFilter = function(heading, index) {
      var title = 'Enter filter for ' + heading.text();
      var icon = ' <i class="icon-filter" data-name="' + index + '" title="' + title + '"></i>';
      icon = heading.append(icon).find('i.icon-filter');
      popOver(icon);
      return icon;
    };
    
    var ignoredColumn = function(index) {
      if( notNull(opts.onlyColumns) ) {
        return $.inArray(index, opts.onlyColumns) === -1;
      }
      return $.inArray(index, opts.ignoreColumns) !== -1;
    };
    
    var getHeadings = function(table) {
      var firstRow = table.find('tr:first').first();
      var headings = {};
      $(firstRow).children('td,th').each(function(cellIndex, cell) {
        if( !ignoredColumn(cellIndex) ) {
          headings[ cellIndex ] = $(cell);
        }
      });
      return headings;
    };
    
    var headings = getHeadings(this);
    $.each(headings, function(index, heading) {
      var editable = addFilter(heading, index);
      addListener(editable);
    });
  };
})( jQuery );