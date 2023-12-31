/*
Slider.js by Leonardo Delgado
*/

class slider {
    constructor(sliderContainer) {
        this.container = sliderContainer;
        this.scrollStartPos = this.getScrollStartAdjust();
        this.scrollLastPos = this.scrollStartPos;

        // ====> General start up
        this.hasFocus = false;

        this.mouseStartPos = undefined;
    
        this.indicatorRefAutoScrollInterval = undefined;
    
        this.sliderAutoFlowInterval = undefined;
        this.sliderAutoFlowTimemOut = undefined;
        this.sliderAutoFlowCalledBtnClick = false;
    
        this.startCardsOrder = undefined;

        // ====> Cards config
        this.setCardWitdh();
        this.cardStartArea = this.getCardArea();
        this.loadCardImages();
        this.setCardIndexes();
        this.startCardsOrder = this.getCards();

        // ====> Indicator config
        this.indicatorRef = this.getIndicatorRef();
        this.setIndicatorRef();

        // ====> Slider Ref config
        this.sliderRefs = this.getSliderRefs();
        this.setSliderRefs();

        // ====> Container Size config
        this.setContainerWidth();
        this.setContainerHeight();
        this.setContainerSize();

        // ====> Button Events
        this.setLeftActionButtonEvent();
        this.setRightActionButtonEvent();
        
        // ====> Mouse Events
        this.setSliderMouseDownEvent();
        this.setSliderMouseUpEvent();
        this.setSliderMouseMoveEvent();

        // ====> Screen Events
        this.setWindowResizeEvent();
        this.setNewCardDisposition();

        // ====> Slider Auto Flow
        this.setSliderAutoFlow();

        this.setScroll({left: this.getScrollStart()}); // initial scroll
        this.setDisabledActionButtons({auto: true}); // set disabled buttons
    }

    // ================== Booleans ================================================================

    isEndless() {
        return Boolean(this.container.getAttribute("data-slider-endless") == "true");
    }

    isAutoCardDisposition() {
        return Boolean(this.container.getAttribute("data-auto-card-disposition") == "true");
    }

    isSliderAutoFlow() {
        const allowed = this.container.getAttribute("data-slider-auto-flow");
        return Boolean(allowed == undefined ? false : allowed.split(" ")[0] == "true");
    }

    isIndicatorRefAllowed() {
        const allowed = this.container.getAttribute("data-refs-indicator");
        return Boolean( (allowed == undefined ? "true" : allowed) == "true");
    }

    isSliderRefAllowed() {
        const allowed = this.container.getAttribute("data-refs-slider");
        return Boolean( (allowed == undefined ? "true" : allowed) == "true");
    }


    // ================== Getters ================================================================

    // ====> Slider Element getter

    getSliderElement() {
        return this.container.querySelector(".slider");
    }

    // ====> Scroll getters

    getScrollStartAdjust() {
        const scrollStart = this.container.getAttribute("data-slider-scroll-start");
        return scrollStart ? parseInt(scrollStart.split(" ")[0]) : 10;
    }

    getScrollStart() {
        const scrollStart = this.container.getAttribute("data-slider-scroll-start");
        return scrollStart ? parseInt(scrollStart.split(" ")[1]) : this.scrollStartPos;
    }

    getScrollArea() {
        return this.getSliderElement().scrollWidth - this.getSliderElement().clientWidth;
    }

    // ====> Action Button getter

    getActionButtons() {
        return {
            left: this.container.querySelector(".slider-btn-left button"),
            right: this.container.querySelector(".slider-btn-right button")
        };
    }

    // ====> Cards getters

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
        return (this.getCardArea() * this.getCurrentRelativeCardIndex()) + this.scrollStartPos;
    }

    getCurrentCardIndex(adjust = 0) {
        return parseInt(this.getCards()[this.getCurrentRelativeCardIndex() + adjust].getAttribute("data-card-index"));
    }

    getCurrentRelativeCardIndex() {
        return Math.round(this.getSliderElement().scrollLeft / this.getCardArea()); // index relative current scroll start
    }

    // ====> Slider Auto Flow getters

    getSliderAutoFlowInactivityDelay() {
        const delay = this.container.getAttribute("data-slider-auto-flow");
        return delay ? parseInt(delay.split(" ")[2]) : 0;
    }

    getSliderAutoFlowDelay() {
        const delay = this.container.getAttribute("data-slider-auto-flow");
        return delay ? parseInt(delay.split(" ")[1]) : 5000;
    }

    // ====> Inficator Ref getters

    getIndicatorRef() {
        let indicatorRef;
        document.querySelectorAll(".slider-indicator").forEach(ref => {
            if (`${ref.getAttribute("data-slider-ref")}` == this.container.id) indicatorRef = ref;
        });
        return indicatorRef;
    }

    getIndicatorPresetRef() {
        const indicatorPreset = {
            previous: this.indicatorRef.querySelector(".indicator-preset .indicator-previous"),
            aroundSelected: this.indicatorRef.querySelector(".indicator-preset .indicator-around-selected"),
            selected: this.indicatorRef.querySelector(".indicator-preset .indicator-selected"),
            next: this.indicatorRef.querySelector(".indicator-preset .indicator-next")
        };

        return indicatorPreset;
    }

    // ====> Slider Refs getter

    getSliderRefs() {
        const sliderRefs = [];
        document.querySelectorAll(".slider-ref").forEach(ref => {
            if (`${ref.getAttribute("data-slider-ref")}` == this.container.id) sliderRefs.push(ref);
        });
        return sliderRefs;
    }


    // ================== Setters ================================================================

    // ====> Container Size setters

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

    // ====> Scroll setters

    setScroll({left = 100, isSmooth = false, scrollLastPosUpdate = true}) {
        this.getSliderElement().scrollTo({left: left, behavior: Boolean(isSmooth == true) ? "smooth" : "auto"});
        if (scrollLastPosUpdate) this.scrollLastPos = left;
    }

    // ====> Card setters

    setCardIndexes() {
        this.getCards().forEach((card, index) => {
            card.setAttribute("data-card-index", index);
        });    
    }

    setCardWitdh() {
        this.getCards().forEach(card => {
            card.style.setProperty("min-width", this.container.getAttribute("data-slider-card-width"));  
        });
    }

    // ====> Slider Auto Flow Setters

    setSliderAutoFlow() {
        if(!this.isSliderAutoFlow()) return;
        if(!this.isEndless()) return;

        const slider = this;
        clearInterval(slider.sliderAutoFlowInterval);

        this.sliderAutoFlowInterval = setInterval(function() {
            if(slider.hasFocus) return;

            if(!slider.isSliderAutoFlow() || !slider.isEndless()) {
                clearInterval(slider.sliderAutoFlowInterval);
                return;
            }

            slider.sliderAutoFlowCalledBtnClick = true;
            slider.getActionButtons().right.click();
            slider.sliderAutoFlowCalledBtnClick = false;

        }, this.getSliderAutoFlowDelay());

    }

    setSliderAutoFlowActivity() {
        if(this.getSliderAutoFlowInactivityDelay() == 0) return;

        clearInterval(this.sliderAutoFlowInterval);
        clearTimeout(this.sliderAutoFlowTimemOut);

        const slider = this;

        this.sliderAutoFlowTimemOut = setTimeout(function() {
            slider.setSliderAutoFlow();
        }, this.getSliderAutoFlowInactivityDelay());
    }

    // ====> Indicator Ref Setter

    setIndicatorRef(adjust = 0) {
        if(!this.indicatorRef) return;
        if(!this.isEndless() ||  !this.isIndicatorRefAllowed()) {
            this.indicatorRef.style.setProperty("display", "none");
            return;
        }
        this.indicatorRef.style.setProperty("display", "inherit");

        const indicatorPreset = this.getIndicatorPresetRef();
        const indicatorWrapper = this.indicatorRef.querySelector(".indicator-wrapper");
        const fragment = document.createDocumentFragment();
        const cards = this.getCards();

        indicatorWrapper.querySelectorAll("button").forEach(e => e.remove());
        for(let i = 0; i < cards.length; i++){
            let clone;

            if (indicatorPreset.aroundSelected && (this.getCurrentCardIndex(adjust) == i + 1 || this.getCurrentCardIndex(adjust) == i - 1)) clone = indicatorPreset.aroundSelected.cloneNode(true);
            else if(this.getCurrentCardIndex(adjust) > i) clone = indicatorPreset.previous ? indicatorPreset.previous.cloneNode(true) : indicatorPreset.next.cloneNode(true);
            else if(this.getCurrentCardIndex(adjust) < i) clone = indicatorPreset.next.cloneNode(true);
            else clone = indicatorPreset.selected.cloneNode(true);

            // Merges element aroundSelected with the other elements
            if (clone.classList.contains("indicator-around-selected") && clone.classList.contains("indicator-around-merge")) {
                const addClass = this.getCurrentCardIndex(adjust) > i ? "indicator-previous" : "indicator-next";
                clone.classList.add(addClass);
            }

            clone.setAttribute("data-card-index-ref", i);
            fragment.append(clone);
        }
        indicatorWrapper.appendChild(fragment);


        this.setIndicatorRefButtonsEvent();
    }

    // ====> Slider Ref Setter

    setSliderRefs(adjust = 0) {
        if(!this.isEndless()) return;
        if(!this.isSliderRefAllowed()) return;
        if(this.sliderRefs.length == 0) return;

        this.sliderRefs.forEach(ref => {
            ref.querySelectorAll(".slider-image-ref").forEach(imageRef => {
                const image = this.getCards()[this.getCurrentRelativeCardIndex() + adjust].querySelector(`${imageRef.getAttribute("data-slider-item-ref")}`);
                const url = image.style.getPropertyValue("background-image");
                imageRef.style.setProperty("background-image", url);
            });

            ref.querySelectorAll(".slider-content-ref").forEach(contentRef => {
                const content = this.getCards()[this.getCurrentRelativeCardIndex() + adjust].querySelector(`${contentRef.getAttribute("data-slider-item-ref")}`);
                contentRef.innerText = content.innerText;
            });
        });
        
    }

    // ====> Window Events

    setNewCardDisposition() {
        const currentCardIndex = this.getCurrentRelativeCardIndex();
        this.getCards().forEach(card => {
            if (!this.isAutoCardDisposition()) {
                card.style.setProperty("min-width", this.cardStartArea, "important");
            }else{
                const cardsVisibles = Math.floor(this.container.clientWidth/this.cardStartArea);
                if(cardsVisibles > 0){
                    card.style.setProperty("min-width", `${(this.container.clientWidth/ cardsVisibles) - this.getCardMargins()}px`, "important");
                }else{
                    card.style.setProperty("min-width", "100%", "important");
                }
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

    // ====> Buttons Events

    // ================> Action Buttons

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
            slider.setIndicatorRef(-1);
            slider.setSliderAutoFlowActivity();
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
            slider.setIndicatorRef(1);
            if(!slider.sliderAutoFlowCalledBtnClick) slider.setSliderAutoFlowActivity();
        });
    }

    // ================> Indicator Ref Buttons

    setIndicatorRefButtonsEvent() {
        const slider = this;

        this.indicatorRef.querySelectorAll(".indicator-wrapper button").forEach(btn => {
            btn.addEventListener("click", function() {
                const toIndex = btn.getAttribute("data-card-index-ref");
                const index = slider.getCurrentCardIndex();
                const direction = Math.sign(toIndex - index);

                slider.indicatorRefAutoScrollInterval = setInterval(function() {
                    slider.hasFocus = true;
                    slider.getSliderElement().scrollLeft += (100 * direction);

                    if(slider.getCurrentCardIndex() == toIndex) {
                        clearInterval(slider.indicatorRefAutoScrollInterval);
                        
                        slider.hasFocus = false;
                        if(direction > 0 && !slider.isAutoCardDisposition()) slider.moveCardsToRight();

                        slider.setScroll({left: slider.getCurrentCardPos(), isSmooth: true});

                        slider.setIndicatorRef();
                        slider.setSliderRefs();
                        return;
                    }
                    slider.moveCardsToLeft();
                    slider.moveCardsToRight();
                    slider.setIndicatorRef();
                    slider.setSliderAutoFlowActivity();
                }, 10);                             
            });
        });
    }

    // ====> Mouse Events

    // ================> Mouse Down

    setSliderMouseDownEvent(){
        const slider = this;
        
        this.container.addEventListener("mousedown", function(e) {
            clearInterval(slider.indicatorRefAutoScrollInterval);
            slider.indicatorRefAutoScrollInterval = undefined;

            slider.hasFocus = true;
            slider.mouseStartPos = e.clientX;

            slider.getSliderElement().style.setProperty("cursor", "grabbing");
        });
    }

    // ================> Mouse Up

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

    // ================> Mouse Move

    setSliderMouseMoveEvent(){
        const slider = this;

        document.addEventListener("mousemove", function(e) {
            if (!slider.hasFocus) return;
            if(slider.indicatorRefAutoScrollInterval) return;

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
            slider.setIndicatorRef();
            slider.setSliderAutoFlowActivity();
        });
    }

    // ================== Move Cards ================================================================

    moveCardsToLeft(mouseElement = null){
        if(this.getSliderElement().scrollLeft <= this.scrollStartPos/2 || !this.hasFocus) {
            const cards = this.getCards();
            const lastCard = cards[cards.length - 1].cloneNode(true);

            this.setScroll({left: this.getCardArea()});
            this.scrollLastPos = this.getCardArea();
            if(mouseElement) this.mouseStartPos = mouseElement.clientX;

            cards[cards.length - 1].remove();
            this.getSliderElement().prepend(lastCard);
        }
    }

    moveCardsToRight(mouseElement = null){
        if(this.getSliderElement().scrollLeft >= this.getScrollArea() - this.scrollStartPos || !this.hasFocus) {
            const cards = this.getCards();
            const firstCard = cards[0].cloneNode(true);
            
            this.setScroll({left: this.getScrollArea() - this.getCardArea()});
            this.scrollLastPos = this.getScrollArea() - this.getCardArea();
            if(mouseElement) this.mouseStartPos = mouseElement.clientX;

            cards[0].remove();
            this.getSliderElement().appendChild(firstCard);
        }
    }

    // ================== Loaders ================================================================

    loadCardImages() {
        const cardImages = this.container.querySelectorAll(".card-image");
        if (cardImages.length < 1) return;
        if (!this.container.getAttribute("data-slider-image-src")) return;
        cardImages.forEach((cardImage, index) => {
            cardImage.style.setProperty("background-image", `url(${this.container.getAttribute("data-slider-image-src").replace("{id}", index)})`, "important");
        });
    }

    reloadConfigs() {
        this.resetScroll();
        this.setContainerSize();
        this.setCardWitdh();
        this.cardStartArea = this.getCardArea();
        this.sliderRefs = this.getSliderRefs();
        this.setNewCardDisposition();
        this.setSliderAutoFlow();
        this.setDisabledActionButtons({auto: true});
    }

    // ================== Resets ================================================================

    resetScroll() {
        const slider = this.getSliderElement();

        for(let i = slider.childNodes.length; i > 0; i--){
            slider.childNodes[i - 1].remove();
        }

        this.startCardsOrder.forEach(card => {
            slider.appendChild(card);
        });
        
        this.scrollLastPos = this.scrollStartPos;
        this.setIndicatorRef();
        this.setSliderRefs();
    }
}
