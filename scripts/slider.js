class slider {
    hasFocus = false;
    mouseStartPos = undefined;
    scrollLastPos = this.scrollStartPos;

    constructor(sliderContainer, scrollStartPos = 20) {
        this.container = sliderContainer;
        this.scrollStartPos = scrollStartPos;
        this.setCardWitdh();
        this.cardStartArea = this.getCardArea();
        this.loadCardImages();

        this.sliderRefs = this.getSliderRefs();
        this.setSliderRefs();

        this.setContainerWidth();
        this.setContainerHeight();
        this.setContainerSize();
        this.setScroll({left: this.scrollStartPos});

        this.setLeftActionButtonEvent();
        this.setRightActionButtonEvent();
        
        this.setSliderMouseDownEvent();
        this.setSliderMouseUpEvent();
        this.setSliderMouseMoveEvent();
        this.setWindowResizeEvent();
        this.setNewCardDisposition();

        this.setDisabledActionButtons({auto: true});
    }

    setCardWitdh() {
        this.getCards().forEach(card => {
            card.style.setProperty("min-width", this.container.getAttribute("data-slider-card-width"));  
        });
    }

    setNewCardDisposition() {
        if (!this.isAutoCardDisposition()) return;

        const currentCardIndex = this.getCurrentCardIndex();
        this.getCards().forEach(card => {
            const cardsVisibles = Math.floor(this.container.clientWidth/this.cardStartArea);
            if(cardsVisibles > 0){
                card.style.setProperty("min-width", `${(this.container.clientWidth/ cardsVisibles) - this.getCardMargins()}px`, "important");
            }else{
                card.style.setProperty("min-width", "100%", "important");
            }

        });
        this.setScroll({left: this.getCardArea() * currentCardIndex});
    }

    setWindowResizeEvent(){
        const slider = this;
        window.addEventListener("resize", function() {
            slider.setNewCardDisposition();

            slider.setScroll({left: slider.getCurrentCardPos()});
        });
    }

    getSliderRefs() {
        const sliderRefs = []
        document.querySelectorAll(".slider-ref").forEach(ref => {
            if (`${ref.getAttribute("data-slider-ref")}` == this.container.id) sliderRefs.push(ref);
        });
        return sliderRefs;
    }

    setSliderRefs(adjust = 0) {
        if(!this.isEndless()) return;
        if(this.sliderRefs.length == 0) return;

        this.sliderRefs.forEach(ref => {
            ref.querySelectorAll(".slider-image-ref").forEach(imageRef => {
                const image = this.getCards()[this.getCurrentCardIndex() + adjust].querySelector(`${imageRef.getAttribute("data-slider-item-ref")}`);
                const url = image.style.getPropertyValue("background-image");
                imageRef.style.setProperty("background-image", url);
            });

            ref.querySelectorAll(".slider-content-ref").forEach(contentRef => {
                const content = this.getCards()[this.getCurrentCardIndex() + adjust].querySelector(`${contentRef.getAttribute("data-slider-item-ref")}`);
                contentRef.innerText = content.innerText;
            });
        });
        
    }

    isEndless() {
        return Boolean(this.container.getAttribute("data-slider-endless") == "true");
    }

    isAutoCardDisposition() {
        return Boolean(this.container.getAttribute("data-auto-card-disposition") == "true");
    }

    loadCardImages() {
        const cardImages = this.container.querySelectorAll(".card-image");
        cardImages.forEach((cardImage, index) => {
            cardImage.style.setProperty("background-image", `url(${this.container.getAttribute("data-slider-image-src").replace("{id}", index)})`, "important");
        });
    }

    getSliderElement() {
        return this.container.querySelector(".slider");
    }

    getActionButtons() {
        return {
            left: this.container.querySelector(".slider-btn-left button"),
            right: this.container.querySelector(".slider-btn-right button")
        };
    }

    getCards() {
        return this.getSliderElement().querySelectorAll(".card-wrapper");
    }

    getCardArea() {
        return this.getCards()[0].clientWidth + (parseFloat(getComputedStyle(this.getCards()[0]).marginLeft) + (parseFloat(getComputedStyle(this.getCards()[0]).marginRight)));
    }

    getCardMargins() {
        return parseFloat(getComputedStyle(this.getCards()[0]).marginLeft) + (parseFloat(getComputedStyle(this.getCards()[0]).marginRight));
    }

    getCurrentCardPos() {
        return (this.getCardArea() * this.getCurrentCardIndex()) + this.scrollStartPos;
    }

    getCurrentCardIndex() {
        return Math.round(this.getSliderElement().scrollLeft / this.getCardArea());
    }

    getScrollArea() {
        return this.getSliderElement().scrollWidth - this.getSliderElement().clientWidth;
    }

    setScroll({left = 100, isSmooth = false, scrollLastPosUpdate = true}) {
        this.getSliderElement().scrollTo({left: left, behavior: Boolean(isSmooth == true) ? "smooth" : "auto"});
        if (scrollLastPosUpdate) this.scrollLastPos = left;
    }

    setContainerWidth() {
        this.container.style.setProperty("width", this.container.getAttribute("data-slider-width"));
    }

    setContainerHeight() {
        this.container.style.setProperty("height", this.container.getAttribute("data-slider-height"));
    }

    setContainerSize() {
        if(this.container.getAttribute("data-slider-size") == null) return;
        const size = this.container.getAttribute("data-slider-size").split(" ");

        this.container.style.setProperty("width", size[0]);
        this.container.style.setProperty("height", size[1]);
    }

    setDisabledActionButtons({left = false, right = false, auto = false}) {
        if(auto && !this.isEndless()) {
            if(this.getSliderElement().scrollLeft <= this.scrollStartPos) left = true;
            if(this.getSliderElement().scrollLeft >= this.getScrollArea()) right = true;
        }
        this.getActionButtons().left.style.setProperty("opacity",(!left ? "100%" : "20%"));
        this.getActionButtons().right.style.setProperty("opacity",(!right ? "100%" : "20%"));
    }

    setLeftActionButtonEvent() {
        const slider = this;

        this.getActionButtons().left.addEventListener("click", function() {
            let scrollLeft = 0;
            if(slider.isEndless()) {
                if(slider.getSliderElement().scrollLeft - slider.getCardArea() < slider.scrollStartPos) {
                    slider.moveCardsToLeft();
                }
                scrollLeft = slider.getCurrentCardPos() - slider.getCardArea();
                slider.setSliderRefs(-1);

            }else {
                scrollLeft = Math.max(slider.getCurrentCardPos() - slider.getCardArea(), slider.scrollStartPos);
    
                let actionButtons = {left: false, right: false};
                if(slider.getSliderElement().scrollLeft - slider.getCardArea() <= slider.scrollStartPos) actionButtons.left = true;
                if(slider.getSliderElement().scrollLeft - slider.getCardArea() < slider.getScrollArea()) actionButtons.right = false;
                slider.setDisabledActionButtons(actionButtons);
            }
    
            slider.setScroll({left: scrollLeft, isSmooth: true});
            
        });
    }

    setRightActionButtonEvent() {
        const slider = this;

        this.getActionButtons().right.addEventListener("click", function() {
            let scrollLeft = 0;

            if(slider.isEndless()) {
                if(slider.getSliderElement().scrollLeft + slider.getCardArea() >= slider.getScrollArea()) {
                    slider.moveCardsToRight();
                    scrollLeft -= slider.scrollStartPos;
                }
                scrollLeft += slider.getSliderElement().scrollLeft + slider.getCardArea();
                slider.setSliderRefs(1);

            }else {
                scrollLeft = Math.min((slider.getCurrentCardPos() + slider.getCardArea()), slider.getScrollArea());
    
                let actionButtons = {left: false, right: false};
                if(slider.getSliderElement().scrollLeft + slider.getCardArea() >= slider.getScrollArea()) actionButtons.right = true;
                if(slider.getSliderElement().scrollLeft + slider.getCardArea() > this.scrollStartPos) actionButtons.left = false;
                slider.setDisabledActionButtons(actionButtons);
            }
    
            slider.setScroll({left: scrollLeft, isSmooth: true});
        });
    }

    setSliderMouseDownEvent(){
        const slider = this;

        this.container.addEventListener("mousedown", function(e) {
            slider.hasFocus = true;
            slider.mouseStartPos = e.clientX;
            slider.getSliderElement().style.setProperty("cursor", "grabbing");
        });
    }

    setSliderMouseUpEvent(){
        const slider = this;

        document.addEventListener("mouseup", function() {
            if(!slider.hasFocus) return;
    
            if(slider.getSliderElement().scrollLeft < slider.getScrollArea()){  
                slider.setScroll({left: slider.getCurrentCardPos(), isSmooth: true});
            }else {
                slider.scrollLastPos = slider.getSliderElement().scrollLeft;
            }
    
            if(!slider.isEndless()) {
                let actionButtons = {left: false, right: false};
                if(slider.getCurrentCardPos() <= slider.scrollStartPos) actionButtons.left = true;
                if(slider.getSliderElement().scrollLeft >= slider.getScrollArea(slider)) actionButtons.right = true;
                slider.setDisabledActionButtons(actionButtons);
            }
    
            slider.getSliderElement().style.setProperty("cursor", "grab");
            slider.hasFocus = false;
        });
    }

    setSliderMouseMoveEvent(){
        const slider = this;

        document.addEventListener("mousemove", function(e) {
            if (!slider.hasFocus) return;

            slider.setScroll({
                left: slider.scrollLastPos + (slider.mouseStartPos - e.clientX), 
                scrollLastPosUpdate: false
            });
            
            if(!slider.isEndless()) {
                slider.setDisabledActionButtons({auto: true});
                return;
            }
            
            slider.moveCardsToLeft(e);
            slider.moveCardsToRight(e);
            slider.setSliderRefs();
        });
    }

    moveCardsToLeft(mouseElement = null){
        if(this.getSliderElement().scrollLeft <= this.scrollStartPos/2 || !this.hasFocus) {
            const cards = this.getCards();
            const lastCard = cards[cards.length - 1].cloneNode(true);
    
            this.setScroll({left: this.getCardArea()});
            this.scrollLastPos = this.getCardArea();
            if(this.hasFocus) this.mouseStartPos = mouseElement.clientX;
    
            cards[cards.length - 1].remove();
            this.getSliderElement().prepend(lastCard);
        }
    }

    moveCardsToRight(mouseElement = null){
        if(this.getSliderElement().scrollLeft >= this.getScrollArea() || !this.hasFocus) {
            const cards = this.getCards();
            const firstCard = cards[0].cloneNode(true);
            
            this.setScroll({left: this.getScrollArea() - this.getCardArea()});
            this.scrollLastPos = this.getScrollArea() - this.getCardArea();
            if(this.hasFocus) this.mouseStartPos = mouseElement.clientX;

            cards[0].remove();
            this.getSliderElement().appendChild(firstCard);
        }
    }


}





const sliderContainers = document.querySelectorAll(".slider-container");

sliderContainers.forEach((sliderContainer) => {
    new slider(sliderContainer, 15);
});
