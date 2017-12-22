$('body').prepend($('<p>OLOLO</p>'));

$('button').on('click', function(){
	var monthCount = $('input').val();

	$('li').each(function(index, elem) {
		$('<p>'+$(elem).data('price') * monthCount+'</p>').appendTo(elem);
	});
});


$('li').on('click', 'p', function(){
	$(this).remove();
});