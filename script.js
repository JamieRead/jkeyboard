$(document).ready(function () {
	
	$('#jkeyboard').focus(function() {
	
		var keys = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
					['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
					['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'",'#'],
					['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']];
		
		var $keyboard = $('<div/>').addClass('jkeyboard-jk');
		var buttons = [];
		
		for(var i = 0; i < keys.length; i++){
			var $wrap = $('<div/>');
			
			for(var k = 0; k < keys[i].length; k++){
				var button = $('<button/>').text(keys[i][k]);
				$wrap.append(button);
			}
			buttons.push($wrap);
		}
		
		$keyboard.append(buttons);
		
		if(!$('.jkeyboard-jk').is('*')){
			$('body').append($keyboard);
		}
		
	});
	
	// button click functions
	
	function insertAtCaret(areaId,text) {
	debugger;
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
	
	$(document).on('click', '.jkeyboard-jk button', function(e){
		e.preventDefault();
		var key = $(this).text();
		
		insertAtCaret('jkeyboard', key);
	
	});
	
	/*$('.jkeyboard').blur(function(){
		$('.jkeyboard-jk').remove();
	});*/
	
});
