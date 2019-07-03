// scrolljump
$(function() { 
	$(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$('#scrollup').fadeIn();
		} else {
			$('#scrollup').fadeOut();
		}
	});
	$('#scrollup').click(function() {
		$('body,html').animate({scrollTop:0},300);
	});
});