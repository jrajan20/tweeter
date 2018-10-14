$(document).ready(function() {
  // --- our code goes here ---
  

   
  	$(".text-box").bind('input propertychange',function(){
  		
  		let i = 140 - $(this).val().length;	
  		$(".counter").text(i);
  		if (i < 0){
  		$('.counter').css('color','red');
  		}
  		else{
  		$('.counter').css('color','black');
  		}
 	 });


  	
  			
        	

  
});