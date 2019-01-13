class ImgPopup extends Popup {
    constructor (src, id) {
            super(null);
            this.src = src;
            this.id=id;
    }

    build () {
        super.build();
        var slideshowContainer = $('<div>', {
            class:"slideshow-container"
        }).appendTo(this.popup.find('#popup_container'));

        var dotContainer = $('<div>', {
            class:"dotContainer"
        }).appendTo(this.popup.find('#popup_container'));

        const subGalleryItemImg = $('.subGalleryItem img');
        for (let i = 0; i<subGalleryItemImg.length; i++){
            var mySlides = $('<div>', {
                class:"mySlides"
            }).appendTo(slideshowContainer);

            $('<div>', {
                text: i+1+' / '+subGalleryItemImg.length,
                class:"numbertext"
            }).appendTo(mySlides);

            $('<img>', {
                src: subGalleryItemImg[i].src,
                class:"popupGalleryImg"
            }).appendTo(mySlides);

            $('<span>', {
                class:"dot",
                click: function(){
                        var index = this.currentSlide(i+1, slideIndex);
                        slideIndex = index;
                    }.bind(this),
            }).appendTo(dotContainer);

        }
        var slideIndex = this.id;
        this.showSlides(slideIndex);

        $('<a>', {
            class:"next",
            click: function(){
				var index = this.plusSlides(1, slideIndex);
				slideIndex = index;
			}.bind(this),
            text:'\u276F'
        }).appendTo(slideshowContainer);

        $('<a>', {
            class:"prev",
            click: function(){
				var index = this.plusSlides(-1, slideIndex);
				slideIndex = index;
			}.bind(this),
            text: '\u276E'
        }).appendTo(slideshowContainer);
		
		
		console.log(slideIndex+"main");
		this.popup.keydown(function (e) {
			slideIndex = this.keySlide(slideIndex,e);
		}.bind(this));
		// slideIndex = this.touchSlide(slideIndex);
		console.log(slideIndex+"touch");
		var x1;
		var x2;
		var isChage = false;
		var slideshowContainer = $('.slideshow-container');
		slideshowContainer.on('touchstart', function(e) {
			 x1 = e.touches[0].clientX;
			 var touchlist = e.touches;
			 console.log(touchlist);
		});
		slideshowContainer.on('touchmove', function(e) {
			 x2 = e.changedTouches[0].clientX;
			 isChage = true;
			 console.log(x2+"ed");
			 e.preventDefault()
		});
		slideshowContainer.on('touchend', function() {
			 console.log(x2+""+"OOO");
			 if((x1 < x2)&& isChage){
				var index = this.plusSlides(-1, slideIndex);
				slideIndex = index;
				isChage = false;
			 }
			 else if((x1 > x2)&& isChage){
				var index = this.plusSlides(1, slideIndex);
				slideIndex = index;
				isChage = false;
				 
			 }
		}.bind(this));
		
		

    }
	
	keySlide(slideIndex,e){
		if (e.keyCode === 39) {
			var index = this.plusSlides(1, slideIndex);
			slideIndex = index;
			return slideIndex;
		}
		if (e.keyCode === 37) {
			var index = this.plusSlides(-1, slideIndex);
			slideIndex = index;
			return slideIndex;
		}
	}
	
    plusSlides(n,slideIndex) {
		var currentSlideIndex = parseInt(slideIndex)+parseInt(n);
        return ( this.showSlides(currentSlideIndex));
    }

    currentSlide(n, slideIndex) {
        return this.showSlides(slideIndex = n);
    }

    showSlides(n){
        var slideIndex = n;
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1;}
        if (n < 1) {slideIndex = slides.length;}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; 
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block"; 
        dots[slideIndex-1].className += " active";
        return slideIndex;
    }
        
        
}