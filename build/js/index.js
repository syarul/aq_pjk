$(".goSur").bind("touchstart", function(e) {
	var $target = $(e.target);
	/*for (var i = 1; i < 11; i++) {
		if ($target.is('"span#s' + i + '"')) {
			$target.addClass("bg-color-blueLight");
		}
	}*/
	if ($target.is("span#s1")) {
			$target.addClass("bg-color-blueLight");
			alert('do');
		}
});
