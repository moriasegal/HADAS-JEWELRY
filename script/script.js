$(document).ready(function(){
    $(window).resize(expandCollapse);
	buildMain();
	navIcon();
});


function expandCollapse(){
	if ( $(window).outerWidth() > 768 ) {
		$(function(){
			$("#navHederLeft").css("display","block");
		});
	}
	else {
		$(function(){
			$("#navHederLeft").css("display","none");
		});
	}
}

        // header navbar icon
function navIcon(){
	let open = false;
	$('#nav-icon4').click(function(){
		$(this).toggleClass('open');
		$("#navHederLeft").slideToggle(400);
	});
	$('.HNavLCategory').click(function(e){
		if($(window).outerWidth() < 769){
			$('#nav-icon4').toggleClass('open');
			$("#navHederLeft").slideToggle(400);
		}		
	});
	
}



function buildMain(){
	buildMainCategory("home");
	$('.HNavLCategory').click(function(e){
		$('.HNavLCategory').removeClass('activButton');
		$(this).addClass('activButton');
		var category = e.target.id;
		buildMainCategory(category);
	});
}

function buildMainCategory(category){
		carousel(false);
	$('.mainContainer').html(' ');
	ajax(null, 'page/'+category+'.html', 'GET').then(function(data){
		$('.mainContainer').append(data);
	}).then(function(){
		buildMainSubSequent(category);
	});
}

function buildMainSubSequent(category){
	switch(category) {
		case 'home':
			carousel(true);
			break;
		case 'gallery':
			buildGallery("hairDecorations");
			gallerySelectCategory();
			break;
		case 'about':
			break;
		case 'contact':
			initMap();
			break;
	}
}

//          ajax & json
function ajax(data,url,method) {
   
    data = data || null;
    return new Promise(function (resolve) {
        $.ajax({
            type: method,
            url: url, 
            data: data,
            success: function (response) {
                resolve(response);
            }
        });
    });

}

function getJson(url) {
    return new Promise(function (resolve) {
        $.getJSON({
            url: url, 
            success: function(response) {
                resolve(response);
            }
        });
    });
}



/*   home    */

var myIndex = 0;
var timer = 0;
function carousel(n) {
	if((n)||(n==undefined)){
		
		var i;
		var x = document.getElementsByClassName("mySlides");
		for (i = 0; i < x.length; i++) {
		   x[i].style.display = "none";  
		}
		myIndex++;
		if (myIndex > x.length) {myIndex = 1}    
		x[myIndex-1].style.display = "block"; 
		timer = setTimeout(carousel, 3000); // Change image every 3 seconds
	}
	if((n == false)&&(timer)){
		clearTimeout(timer);
	}
}



//                         gallery
function gallerySelectCategory(){
	galleryOpenSelectCategory();
	galleryActiveCategory();
	
}

function galleryOpenSelectCategory(){
	$('#gGallery').click(function(){
			$("#selectGallery").slideToggle(400);
	});
}

function galleryActiveCategory(){
	$('.galleryOption:not(.activeGal)').click(function(e){
		$('.galleryOption').removeClass('activeGal');
		$(this).addClass('activeGal');
	});
	$('.galleryOption').click(function(e){
		$('#gGallery span:first-child').text($(e.target).text());
		$("#selectGallery").slideToggle(400);
		let category = e.currentTarget.id;
		buildGallery(category);
		
	});
}


function buildGallery(category){
    $('.galleryContainer').html("");
    getJson("json/data.json").then(function(data){
        var galleryImages = data[0].products[category];
        var subGalleryContainer = $('<div>', {
            class:"subGalleryContainer"
        }).appendTo($('.galleryContainer'));
        for(var i=0; i<galleryImages.length; i++){
            var subGalleryItem = $('<div>', {
                class:"subGalleryItem",
				name:i+1,
				css: { 
					"background-image":"url("+"img/products/"+category+"/"+galleryImages[i].img+")"
				}
            }).appendTo(subGalleryContainer);
            $('<img>', {
                src:"img/products/"+category+"/"+galleryImages[i].img
            }).appendTo(subGalleryItem);
        }
    }).then(function(){
		var subGalleryItem = $('.subGalleryItem'); 
			subGalleryItem.click(function(e){
				var popup = new ImgPopup(e.target.src,e.currentTarget.attributes[1].value);
				popup.build();
		   });
    });
}


//                 contact

// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = {lat: 31.6539396, lng: 35.2348847};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 11, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}

