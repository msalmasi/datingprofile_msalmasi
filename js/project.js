//Sets variables equal to the offset of the element
var elementPosition1 = $('#box').offset();
var elementPosition2 = $('.portrait').offset();
var elementPosition3 = $('#bio').offset();

//This function will scroll to the top of the page before refreshing or unloading the page. This is here because most browsers like to force you to go back to the same spot on a page when you click refresh. This behaviour breaks the movement of certain elements which is dependant on scrolling from the top.
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

$(document).ready(function() {
//This function activates on scroll
    $(window).scroll(function () {
        
        //If the user scrolls down far enough, the fixed top-bar will be pushed up and out of the way.
        if ($(window).scrollTop() + 75 > elementPosition3.top) {    
            $('#box').css('position','relative').css('top','423px');
        }

        //If the user scrolls up from the bottom  of the page, this sets the top-bar position to fixed to emulate the reverse motion as scrolling from the top.
        else if ($(window).scrollTop() <= 423 && $(window).scrollTop() > elementPosition2.top) {
            $('#box').css('position','fixed').css('top',0); 
        } 

        //If the user scrolls down from the top, after a certain point the portrait will nest and lock itself into the top-bar.
        else if ($(window).scrollTop() + 75 < elementPosition3.top) {
            
                //If the portrait is at the top, lock it in place.
                if ($(window).scrollTop() > elementPosition2.top) {
                  $('.portrait').css('position','relative').css('top','5px');
                } 
                
                //If the portrait has not hit the top yet - The margin between the portrait and the top-bar will become increasingly negative as the user scrolls down from the top (i.e. the                       portrait moves towards the top-bar).
                else if ($(window).scrollTop() + 5 < elementPosition2.top) {
                    var fromTop = $(window).scrollTop();
                    $(".portrait").css('margin', '-' + (fromTop) + 'px auto');
                    $('.portait').css('position','relative');
                }
        }
    });
});

//This function produces a smooth scrolling action when clicking a navigation link
$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top-78
    }, 1000);
    return false;
});

