(function($) {
  'use strict';
  
  var FilterableRow = function (row, options) {
    this.$row = $(row);
    this.cells = [];
    //data-* has more priority over js options: because dynamically created elements may change data-*
    this.options = $.extend({}, $.fn.filterableRow.defaults, options);
    this.init();
  };
  
  FilterableRow.prototype = {
    constructor: FilterableRow,
    
    notNull: function(value) {
      if(value !== undefined && value !== null) {
        return true;
      }
      return false;
    },
    
    setMatch: function(match) {
      if(match){
        this.$row.addClass('filterable-match');
        this.$row.removeClass('filterable-mismatch');
      } else {
        this.$row.addClass('filterable-mismatch');
        this.$row.removeClass('filterable-match');
      }
    },
    
    hasMismatch: function() {
      var hasMatch = false;
      $.each(this.cells, $.proxy(function(index, cell) {
        if(this.notNull(cell) && cell.match !== true){
          hasMatch = true;
          return;
        }
      }, this));
      return hasMatch;
    },
    
    filter: function(query, index) {
      this.cells[index].isMatch(query);
      this.setMatch( !this.hasMismatch() );
    },
    
    ignoredColumn: function(index) {
      if( this.notNull(this.options.onlyColumns) ) {
        return $.inArray(index, this.options.onlyColumns) === -1;
      }
      return $.inArray(index, this.options.ignoreColumns) !== -1;
    },
    
    init: function () {
        //add 'filterable-row' class to every filterable row
        this.$row.addClass('filterable-row');
        
        // Init Cells
        var newCell;
        this.$row.children('td').each( $.proxy(function(index, cell) {
          if(!this.ignoredColumn(index)){
            $(cell).filterableCell(this.options);
            newCell = $(cell).data('filterableCell');
          } else {
            newCell = null;
          }
          this.cells.push( newCell );
        }, this));
        
        this.setMatch(this.hasMismatch());
        
        //finilize init
        $.proxy(function() {
           /**
           Fired when element was initialized by `$().filterable()` method.
           Please note that you should setup `init` handler **before** applying `filterable`.
                          
           @event init
           @param {Object} event event object
           @param {Object} editable filterable instance (as here it cannot accessed via data('editable'))
           **/
           this.$element.triggerHandler('init', this);
        }, this);
    },
    
    /**
    Removes filterable feature from element
    @method destroy()
    **/
    destroy: function() {
      this.$element.removeClass('filterable-row filterable-match filterable-mismatch');
      this.$element.removeData('fitlerableRow');
    }
  };
  
  // Initilize each filterable table
  $.fn.filterableRow = function (option) {
    //special API methods returning non-jquery object
    var args = arguments, datakey = 'filterableRow';
    
    //return jquery object
    return this.each(function () {
      var $this = $(this),
        data = $this.data(datakey),
        options = typeof option === 'object' && option;

      if (!data) {
        $this.data(datakey, (data = new FilterableRow(this, options)));
      }

      if (typeof option === 'string') { //call method
        data[option].apply(data, Array.prototype.slice.call(args, 1));
      }
    });
  };
  
  $.fn.filterableRow.defaults = {};
})(jQuery);