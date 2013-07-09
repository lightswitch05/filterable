/**
 * filterable
 * jQuery plugin that filters an HTML table based on column-specific values using x-editable
 *
 * @author Daniel White
 * @copyright Daniel White 2013
 * @license MIT <https://github.com/lightswitch05/filterable/blob/master/MIT-LICENSE>
 * @link http://lightswitch05.github.io/filterable
 * @module filterable
 * @version 0.1.3
 */

(function( $ ) {
  $.fn.filterable = function(opts) {

    // Set options
    var defaults = {
      ignoreColumns: [],
      onlyColumns: null,
      prependWild: true,
      appendWild: true,
      ignoreCase: true
    };
    opts = $.extend(defaults, opts);

    var notNull = function(value) {
      if(value !== undefined && value !== null) {
        return true;
      }
      return false;
    };
    
    var setMatch = function(ele) {
      $(ele).addClass('filterable-match');
      $(ele).removeClass('filterable-no-match');
    };
    
    var setNoMatch = function(ele) {
      $(ele).addClass('filterable-no-match');
      $(ele).removeClass('filterable-match');
    };
    
    var buildRegex = function(query) {
      query = query.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, '\\$&');
      query = query.replace(/\*/, '.*');
      query = opts.prependWild ? '.*' + query : query;
      query += opts.appendWild ? '.*' : query;
      var options = opts.ignoreCase ? 'i' : '';
      return new RegExp(query, options);
    };
    
    var isMatch = function(expression, value) {
      return expression.test(value) === true;
    };
    
    var allMatches = function(row) { return $(row).find('td.filterable-no-match').length === 0; };
    var setFilterActive = function(element) { $(element).addClass('filterable-active'); };
    var clearFilter = function(element) { $(element).removeClass('filterable-active'); };
    
    var doFilter = function(value, element) {
      var table = element.closest('table');
      var index = element.data('name');
      var regex = buildRegex(value);
      if(value === ''){
        clearFilter(element);
      } else {
        setFilterActive(element);
      }
      
      table.children('tbody,*').children('tr').each(function(rowIndex, row) {
        if( rowIndex !== 0 ) {
          var cell = $(row).children('td').eq(index);
          var text = $.trim(cell.text());
          if( isMatch(regex, text) ) {
            setMatch(cell);
            if(allMatches(row)){
              setMatch(row);
            }
          } else {
            setNoMatch(cell);
            setNoMatch(row);
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
      var title = 'Enter filter for ' + $.trim(heading.text());
      var icon = ' <i class="icon-filter filterable" data-name="' + index + '" title="' + title + '"></i>';
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
    
    $(this).each(function(){
      var headings = getHeadings($(this));
      $.each(headings, function(index, heading) {
        var editable = addFilter(heading, index);
        addListener(editable);
      });
    });
  };
})( jQuery );