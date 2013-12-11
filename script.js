(function ( $ ) {
	
	// setup function, pass in keys array
	var setupKeyboard = function(keys){
		var $keyboard = $('<div/>').addClass('jkeyboard-jk');
		var buttons = [];
		
		for(var i = 0; i < keys.length; i++){
			var $wrap = $('<div/>');
			
			for(var k = 0; k < keys[i].length; k++){
				var key = keys[i][k];
				var button = '';
				var isHtml = key.substring(0, 2);
				
				if(isHtml == '&#'){
					button = $('<button/>').html(key);
				} 
				else if(key == 'Shift'){
					button = $('<button/>').addClass('jkeyboard-shift').text(key);
				}
				else {
					button = $('<button/>').text(key);
				}
				
				$wrap.append(button);
			}
			buttons.push($wrap);
		}
		
		$keyboard.append(buttons);
		
		$('.jkeyboard-jk').remove();
		$('body').append($keyboard);
	}
	
	// insert key
	var insertAtCaret = function(areaId,text){
		var txtarea = document.getElementById(areaId);
		var scrollPos = txtarea.scrollTop;
		var strPos = 0;
		var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
			"ff" : (document.selection ? "ie" : false ) );
		if (br == "ie") { 
			txtarea.focus();
			var range = document.selection.createRange();
			range.moveStart ('character', -txtarea.value.length);
			strPos = range.text.length;
		}
		else if (br == "ff") strPos = txtarea.selectionStart;

		var front = (txtarea.value).substring(0,strPos);  
		var back = (txtarea.value).substring(strPos,txtarea.value.length); 
		txtarea.value=front+text+back;
		strPos = strPos + text.length;
		if (br == "ie") { 
			txtarea.focus();
			var range = document.selection.createRange();
			range.moveStart ('character', -txtarea.value.length);
			range.moveStart ('character', strPos);
			range.moveEnd ('character', 0);
			range.select();
		}
		else if (br == "ff") {
			txtarea.selectionStart = strPos;
			txtarea.selectionEnd = strPos;
			txtarea.focus();
		}
		txtarea.scrollTop = scrollPos;
	}
	
	// These are the defaults
	var defaults = {
		// keys array with sub arrays for rows
		lowerKeys: [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
				   ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
				   ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'",'#'],
				   ['Shift', '&#92;', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '&#47;', 'Shift']],
		upperKeys: [['&#172;', '!', '"', '&#163;', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
				   ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}'],
				   ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', "@",'~'],
				   ['Shift', '|', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift']],
	   keys: false
	};
	
    var methods = {
        init: function(options) {
            if(options) {
                $.extend(defaults,options);
            }
			
			this.focus(function(){
				var keys = defaults.keys ? defaults.keys : defaults.lowerKeys;
				setupKeyboard(keys);
			});
			
        },
        test: function(arg) {
            console.log("test: " + arg.args);
            console.log("args: " + defaults.lowerKeys + defaults.upperKeys);
        }
    };
	
	$.fn.jkeyboard = function(method) {
		
        var args = arguments;
        var $this = this;
        return this.each(function() {
            if ( methods[method] ) {
                return methods[method].apply( $this, Array.prototype.slice.call( args, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( $this, Array.prototype.slice.call( args, 0 ) );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.plugin' );
            }  
        });

		//return this.each(function() {
			// Do something to each element here.
		//});
	 
	};	
	
	// button click function
	$(document).on('click', '.jkeyboard-jk button:not(.jkeyboard-shift)', function(e){
		e.preventDefault();
		var key = $(this).text();
		
		insertAtCaret('jkeyboard', key);
	});
	
	$(document).on('click', '.jkeyboard-shift', function(e){
		e.preventDefault();
		var keys = [['&#172;', '!', '"', '&#163;', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
			  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}'],
			  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', "@",'~'],
			  ['Shift', '|', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift']];
		
		setupKeyboard(keys);
	});
	
	/*$('.jkeyboard').blur(function(){
		$('.jkeyboard-jk').remove();
	});*/
	
}( jQuery ));
