(function( $ ) {
  $.fn.filterable = function(opts) {

    // Set options
    var defaults = {};
    opts = $.extend(defaults, opts);

    var popOver = function(icon, name) {
      $(icon).editable({
        send: 'never',
        type: 'text',
        emptytext: '',
        display: function(value) {
          $(this).text('');
        }
      });
    }

    var addFilter = function(heading) {
      var icon = ' <i class="icon-filter"></i>';
      icon = heading.append(icon).find('i.icon-filter');
      popOver(icon, heading.text());
    }
    
    this.each(function(){
      addFilter($(this));
    });
  };
})( jQuery );