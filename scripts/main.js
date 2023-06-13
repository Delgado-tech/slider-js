const sliderContainers = document.querySelectorAll(".slider-container");

let sliderFocus = false;
let mouseStartPos;
let scrollStartPos = 20;
let scrollLastPos = scrollStartPos;

sliderContainers.forEach((sliderContainer) => {
    const buttons = {
        left: sliderContainer.querySelector(".slider-btn-left button"),
        right: sliderContainer.querySelector(".slider-btn-right button")
    };
    const slider = sliderContainer.querySelector(".slider");
    const isEndless = Boolean(sliderContainer.getAttribute("data-endless") == "true");
    
    const cards = slider.querySelectorAll(".card-wrapper");
    const cardArea = cards[0].clientWidth + (parseFloat(getComputedStyle(cards[0]).marginLeft) * 2);

    slider.scrollTo({left: scrollStartPos}); // Add little scroll space
    buttons.left.style.setProperty("opacity","20%")
    // Slider load images
    loadSliderCardImages(sliderContainer);

    // Button Events
    setSliderLeftBtnEvent(slider, buttons, cardArea, isEndless);
    setSliderRightBtnEvent(slider, buttons, cardArea, isEndless);

    // Slider events
    setSliderMouseDownEvent(slider);
    setSliderMouseUpEvent(slider, buttons, cardArea, isEndless);
    setSliderMouseMoveEvent(slider, buttons, cardArea, isEndless);
});
//#region 
function loadSliderCardImages(sliderContainer){
    const cardImages = sliderContainer.querySelectorAll(".card-image");
    cardImages.forEach((cardImage, index) => {
        cardImage.style.setProperty("background-image", `url(${sliderContainer.getAttribute("data-image-src").replace("{id}", index)})`, "important");
    });
}

function getSliderCurrentCardPos(slider, cardArea) {
    return (cardArea * Math.round(slider.scrollLeft / cardArea)) + scrollStartPos;
}

function getScrollArea(slider) {
    return slider.scrollWidth - slider.clientWidth;
}

function setSliderLeftBtnEvent(slider, buttons, cardArea, isEndless){
    buttons.left.addEventListener("click", function() {
        const cards = slider.querySelectorAll(".card-wrapper");
        let scrollLeft = Math.max(getSliderCurrentCardPos(slider, cardArea) - cardArea, scrollStartPos);

        if(isEndless) {
            if(slider.scrollLeft - cardArea <= scrollStartPos) moveCardsToLeft(slider, cards, cardArea);
            scrollLeft = getSliderCurrentCardPos(slider, cardArea) - cardArea;
        }else {
            if(slider.scrollLeft - cardArea <= scrollStartPos) buttons.left.style.setProperty("opacity", "20%");
            if(slider.scrollLeft - cardArea < getScrollArea(slider)) buttons.right.style.setProperty("opacity", "100%");
        }

        slider.scrollTo({
            left: scrollLeft, 
            behavior: "smooth"
        }); 
        scrollLastPos = scrollLeft;
    });
}

function setSliderRightBtnEvent(slider, buttons, cardArea, isEndless) {
    buttons.right.addEventListener("click", function() {
        const cards = slider.querySelectorAll(".card-wrapper");
        let scrollLeft = Math.min((getSliderCurrentCardPos(slider, cardArea) + cardArea), getScrollArea(slider));

        if(isEndless) {
            if(slider.scrollLeft + cardArea >= getScrollArea(slider)) moveCardsToRight(slider, cards, cardArea);
            scrollLeft = slider.scrollLeft + cardArea;
            console.log(slider.clientWidth/430)
        }else {
            if(slider.scrollLeft + cardArea >= getScrollArea(slider)) buttons.right.style.setProperty("opacity", "20%");
            if(slider.scrollLeft + cardArea > scrollStartPos) buttons.left.style.setProperty("opacity", "100%");
        }

        slider.scrollTo({
            left: scrollLeft, 
            behavior: "smooth"
        });
        scrollLastPos = scrollLeft;
    });
}

function setSliderMouseDownEvent(slider){
    document.addEventListener("mousedown", function(mouseElement) {
        sliderFocus = true;
        mouseStartPos = mouseElement.clientX;
        slider.style.setProperty("cursor", "grabbing");
    });
}

function setSliderMouseUpEvent(slider, buttons, cardArea, isEndless){
    document.addEventListener("mouseup", function() {
        const currentCardPos = getSliderCurrentCardPos(slider, cardArea);

        if(slider.scrollLeft < getScrollArea(slider)){  
            slider.scrollTo({
                left: currentCardPos,
                behavior: "smooth"
            });
            scrollLastPos = currentCardPos;
        }else {
            scrollLastPos = slider.scrollLeft;
        }

        if(!isEndless) {
            if(currentCardPos <= scrollStartPos) buttons.left.style.setProperty("opacity", "20%");
            else buttons.left.style.setProperty("opacity", "100%");

            if(slider.scrollLeft >= getScrollArea(slider)) buttons.right.style.setProperty("opacity", "20%");
            else buttons.right.style.setProperty("opacity", "100%");
        }

        slider.style.setProperty("cursor", "grab");
        sliderFocus = false;
    });
}
//#endregion
function setSliderMouseMoveEvent(slider, buttons, cardArea, isEndless){
    document.addEventListener("mousemove", function(mouseElement) {
        if (!sliderFocus) return;

        slider.scrollTo( {left: scrollLastPos + (mouseStartPos - mouseElement.clientX) });
        
        if(!isEndless) {
            if(slider.scrollLeft <= scrollStartPos) buttons.left.style.setProperty("opacity", "20%");
            else buttons.left.style.setProperty("opacity", "100%");

            if(slider.scrollLeft >= getScrollArea(slider)) buttons.right.style.setProperty("opacity", "20%");
            else buttons.right.style.setProperty("opacity", "100%");
            return;
        }
        
        const cards = slider.querySelectorAll(".card-wrapper");
        
        moveCardsToLeft(slider, cards, cardArea, mouseElement);
        moveCardsToRight(slider, cards, cardArea, mouseElement);

    });
}

function moveCardsToLeft(slider, cards, cardArea, mouseElement = null){
    if(slider.scrollLeft <= scrollStartPos/2 || mouseElement == null) {
        const lastCard = cards[cards.length - 1].cloneNode(true);

        slider.scrollTo({left: cardArea});
        scrollLastPos = cardArea;
        if(mouseElement != null) mouseStartPos = mouseElement.clientX;

        cards[cards.length - 1].remove();
        slider.prepend(lastCard);
    }
}

function moveCardsToRight(slider, cards, cardArea, mouseElement = null){
    if(slider.scrollLeft >= getScrollArea(slider) || mouseElement == null) {
        const firstCard = cards[0].cloneNode(true);

        slider.scrollTo({left: getScrollArea(slider) - cardArea});
        scrollLastPos = getScrollArea(slider) - cardArea;
        if(mouseElement != null) mouseStartPos = mouseElement.clientX;

        cards[0].remove();
        slider.appendChild(firstCard);
    }
}