const sliderContainers = document.querySelectorAll(".slider-container");
const runBtn = document.querySelector("#run-btn");
const inputs = document.querySelectorAll("input"); 

let sliderObj;

sliderContainers.forEach((sliderContainer) => {
    sliderObj = new slider(sliderContainer);
});

inputs.forEach(input => {
    if(input.getAttribute("type") == "text") {
        input.addEventListener("input", function(e) {

            const prefix = e.target.getAttribute("data-input-prefix");
            const suffix = e.target.getAttribute("data-input-suffix");
            const regex = e.target.getAttribute("data-input-regex");
            
            let value = e.target.value;
            
            if(prefix && value.length > 1) value = value.substring(prefix.length, value.length);
            if(suffix && value.length > 1) value = value.substring(0, value.length - suffix.length);
            
            if(regex) value = value.replace(new RegExp(regex), "");

            e.target.value = !value ? value : `${(!prefix ? "" : prefix)}${value}${(!suffix ? "" : suffix)}`;

            const suffixStart = e.target.value.length - suffix.length;
            if(suffix) e.target.setSelectionRange(suffixStart, suffixStart);
        });


    }else if(input.getAttribute("type") == "checkbox") {
        input.addEventListener("input", function(e) {

            const checked = e.target.checked;
            let labelNode;

            document.querySelectorAll("label").forEach(label => {
                if (label.getAttribute("for") == e.target.id) labelNode = label;
            });

            if(!labelNode) return;

            const spans = labelNode.querySelectorAll(".input-checkbox span");
            spans.forEach(span => span.classList.remove("input-checkbox-checked"));

            if(!checked) spans[0].classList.add("input-checkbox-checked");
            else spans[1].classList.add("input-checkbox-checked");

        });
    }
});

runBtn.addEventListener("click", function() {
    
    const sliderWidth = document.querySelector("#input-slider-width").value.replaceAll("width: ", "");
    const sliderHeight = document.querySelector("#input-slider-height").value.replaceAll("height: ", "");

    const sliderEndless = document.querySelector("#input-slider-endless").checked;

    const sliderAutoFlow = document.querySelector("#input-slider-auto-flow").checked;
    const sliderAutoFlowDelay = document.querySelector("#input-slider-auto-flow-delay").value.replaceAll("delay: ", "").replaceAll("ms", "");
    const sliderAutoFlowInactivityDelay = document.querySelector("#input-slider-auto-flow-inact-delay").value.replaceAll("inatividade: ", "").replaceAll("ms", "");
    
    const cardWidth = document.querySelector("#input-slider-card-width").value.replaceAll("width: ", "");
    const cardAutoDisposition = document.querySelector("#input-slider-card-auto-disposition").checked;

    const indicatorRef = document.querySelector("#input-indicator-ref").checked;
    const sliderRef = document.querySelector("#input-slider-ref").checked;
    
    sliderContainers[0].setAttribute("data-slider-size", `${sliderWidth ? sliderWidth : "90%"} ${sliderHeight ? sliderHeight : "auto"}`);
    
    sliderContainers[0].setAttribute("data-slider-card-width", `${cardWidth ? cardWidth : "400px"}`);
    sliderContainers[0].setAttribute("data-auto-card-disposition", `${cardAutoDisposition}`);
    sliderContainers[0].setAttribute("data-auto-card-disposition", `${cardAutoDisposition}`);
    sliderContainers[0].setAttribute("data-slider-endless", `${sliderEndless}`);
    sliderContainers[0].setAttribute("data-slider-auto-flow", `${sliderAutoFlow} ${sliderAutoFlowDelay ? sliderAutoFlowDelay : "2000"} ${sliderAutoFlowInactivityDelay ? sliderAutoFlowInactivityDelay : "10000"}`);
    sliderContainers[0].setAttribute("data-refs-indicator", `${indicatorRef}`);
    sliderContainers[0].setAttribute("data-refs-slider", `${sliderRef}`);

    sliderObj.reloadConfigs();
    
});