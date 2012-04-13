(function( $ ){

  var defaults = {};
  var settings;
  
  var methods = {
    init : function( options ) { 
      settings = $.extend(defaults, options); 
      return this.each(function(){
        var opts = {
          el: this,
          width: $(this).width(),
          top: $(this).offset().top,
          height: $(this).height(),
          bottom: $(this).offset().top + $(this).height(),
          offset: parseInt($(this).css('margin-top'))
        };
        if(settings.obstacle) {
          opts['obstacle'] = {
            el: $(settings.obstacle),
            top: $(settings.obstacle).offset().top,
            bottom: $(settings.obstacle).offset().top - $(this).offset().top + $(this).outerHeight(true)
          };
        }
        $(this).wrap( $('<div></div>').css('height', $(this).outerHeight(true) - parseInt($(this).css('margin-top'))) ); 
        $(window).bind('scroll', opts, methods.persist);
      });
    },
    
    persist : function(event) {
      var el = event.data.el; 
      var y = $(this).scrollTop(); 
      
      if(y > event.data.top) {
        $(el).css({ position: 'fixed', top: 0 - event.data.offset, width: event.data.width }).addClass('persistent');

        if($(el).offset().top + $(el).height() > $(event.data.obstacle.el).offset().top) {
          $(el).css({ position: 'relative', top: $(event.data.obstacle.el).offset().top - $(el).offset().top + $(el).height() });
        } else if(y < $(el).offset().top) {
          $(el).css({ position: 'fixed', top: 0 - event.data.offset });
        }
        
      } else {
        $(el).css({ position: 'static' }).removeClass('persistent');
      }
    }
  };

  $.fn.persistent_element = function( method ) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.persistent_element' );
    }    
  };

})( jQuery );
