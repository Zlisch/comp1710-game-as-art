// Declare global variables and initialize.
var previewBox      = document.querySelector(".preview-box"),
    gallery         = document.querySelectorAll(".itemBox"),
    previewClose    = document.querySelectorAll(".preview-quit"),
    previewImgs     = [],
    buttonsAll      = document.querySelectorAll(".manual-button"),
    lastPreview     = 0,
    radios          = document.querySelectorAll("input"),
    currentImg      = previewBox.querySelector(".current-image"),
    shadowPreview   = document.querySelector(".shadow"),
    maps            = document.querySelectorAll("div.map-wrap"),
    imageMap        = 0, 
    imageMap2       = 0,
    coordinatesMap  = 0,
    circleMap       = 0,
    maskImg         = 0, 
    maskImg2        = 0,
    selectedIndex   = 0,
    maskClicked     = false, 
    maskClicked2    = false,
    left            = false,
    left2           = false,
    annotaImg       = 0, 
    annotaImg2      = 0,
    specialImgMap   = document.querySelector(".special-map"),
    filterDiv       = document.querySelector(".gallery-tags")
;

const testJson = coordinates;

// An responsive album contains exactly four images.
// Select all four div-elements. Each contains one image.
function setUp () {
    for (let j = 0; j < 4; j++) {
        previewImgs[j] = document.querySelector("div.slide-"+String(j+1)).querySelector(".real-slide");
    }
}

function clearButtons () {
    for (let i = 0; i < radios.length; i++) {
        if (i == 0) {
            radios[0].checked = true;
            buttonsAll[0].style.backgroundColor = "red";
        } else {
            radios[i].checked = false;
            buttonsAll[i].style.backgroundColor = "";
        }
    }
}

// When the browser window is loaded.
window.onload = () => {
    setUp();

    // Filter tags active
    // filterDiv.onclick = (selectedTag) => {
    //     if (selectedTag.target.classList.contains("gallery-list")) {
    //         filterDiv.querySelector(".active").classList.remove("active");
    //         selectedTag.target.classList.add("active");
    //     }
    // }

    // Image-preview system with responsively adjusted image urls;
    // Slider system for album with manual navigation bar;
    // Responsively adjust all previewed image urls and annotation image urls to the current album;
    for (let i = 0; i < gallery.length; i++) {
        gallery[i].querySelector("a").onclick = () => {
            imageMap                            = 0;
            imageMap2                           = 0;
            selectedIndex                       = i;
            previewBox.style.transition         = "all .2s ease";
            shadowPreview.style.transition      = "all .2s ease";

            clearButtons();

            // Image-preview system with responsively adjusted image urls.
            previewBox.classList.add("show");
            previewBox.classList.add("last-preview-" + String(i+1));
            if (lastPreview == 0) {
                buttonsAll[0].style.backgroundColor = "red";
            }
            shadowPreview.style.display = "block";

            // Set coordinates for each annotation image map.
            coordinatesMap = JSON.parse(testJson)[i].coordinates;
            circleMap = JSON.parse(testJson)[i].circle;

            // Adjust image urls to match the path of selected album.
            for (let j = 0; j < 4; j++) {
                let imageURL = document.querySelector("div.slide-"+String(j+1)).querySelector(".real-slide").src;
                let newURL;
                if (lastPreview == 0) {
                    newURL = imageURL.replace("gallery/1", "gallery/" + String(i+1));
                } else {
                    newURL = imageURL.replace("gallery/" + lastPreview, "gallery/" + String(i+1));
                }
                previewImgs[j].src = newURL;
            }

            for (let j = 0; j < 4; j++) {

                // Check if images in current preview box are annotated;
                // Initialize and display annotations;
                // otherwise only update image urls by the path of currently selected album
                if (JSON.parse(testJson)[i].annotation[j]) {

                    // imageMap: used to set the coords value for area element
                    imageMap            = maps[j].querySelector("area.map-circle");
                    imageMap.coords     = circleMap;
                    imageMap2           = maps[j].querySelector("area.map-poly");
                    imageMap2.coords    = coordinatesMap;

                    // Display the annotated image's image map by setting usemap value.
                    previewImgs[j].setAttribute('usemap', "#note-" + String(j+1));

                    // Display a mapped image map with annotated shapes when mouse hovering
                    // if the first image in current album is annotated.
                    maskImg             = maps[j].querySelector(".map-mask-" + String(j+1));
                    maskImg.setAttribute('usemap', "#note-" + String(j+1));
                    if (j == 0) {
                        maskImg.style.visibility = "visible";
                    } else {
                        maskImg.style.visibility = "hidden";
                    }
                    maskImg.style.transition    = "all .6s ease";

                    // Initialize the first annotation image element.
                    annotaImg                   = maps[j].querySelector(".map-annotation-" + String(j+1));
                    annotaImg.opacity           = 0;
                    annotaImg.style.visibility  = "visible";
                    annotaImg.style.transition  = "all .6s ease";

                    // Display a mapped image with annotated shapes when mouse hovering
                    // if the first image in current album is annotated.
                    maskImg2 = maps[j].querySelector(".map-mask-" + String(j+1) + "-2");
                    maskImg2.setAttribute('usemap', "#note-" + String(j+1));
                    if (j == 0) {
                        maskImg2.style.visibility = "visible";
                    } else {
                        maskImg2.style.visibility = "hidden";
                    }
                    maskImg2.style.transition   = "all .6s ease";

                    // Initialize the second annotation image element.
                    annotaImg2                  = maps[j].querySelector(".map-annotation-" + String(j+1) + "-2");
                    annotaImg2.opacity          = 0;
                    annotaImg2.style.visibility = "visible";
                    annotaImg2.style.transition = "all .6s ease";
                } else {

                    // Update the first un-mapped image element's url
                    let element     = maps[j].querySelector(".map-mask-" + String(j+1));
                    let preURL      = element.src;
                    let newlyURL;
                    if (lastPreview == 0) {
                        newlyURL = preURL.replace("gallery/1", "gallery/" + String(i+1));
                    } else {
                        newlyURL = preURL.replace("gallery/" + lastPreview, "gallery/" + String(i+1));
                    }
                    element.src     = newlyURL;

                    // Update the second un-mapped image element's url
                    let element2    = maps[j].querySelector(".map-mask-" + String(j+1) + "-2");
                    let preURL2     = element2.src;
                    let newlyURL2;
                    if (lastPreview == 0) {
                        newlyURL2 = preURL2.replace("gallery/1", "gallery/" + String(i+1));
                    } else {
                        newlyURL2 = preURL2.replace("gallery/" + lastPreview, "gallery/" + String(i+1));
                    }
                    element2.src    = newlyURL2;

                    // Update the first un-used annotation image's url
                    let aElement    = maps[j].querySelector(".map-annotation-" + String(j+1));
                    let aURL        = aElement.src;
                    let nURL;
                    if (lastPreview == 0) {
                        nURL = aURL.replace("gallery/1", "gallery/" + String(i+1));
                    } else {
                        nURL = aURL.replace("gallery/" + lastPreview, "gallery/" + String(i+1));
                    }
                    aElement.src    = nURL;

                    // Update the second un-used annotation image's url
                    let aElement2   = maps[j].querySelector(".map-annotation-" + String(j+1) + "-2");
                    let aURL2       = aElement2.src;
                    let nURL2;
                    if (lastPreview == 0) {
                        nURL2 = aURL2.replace("gallery/1", "gallery/" + String(i+1));
                    } else {
                        nURL2 = aURL2.replace("gallery/" + lastPreview, "gallery/" + String(i+1));
                    }
                    aElement2.src   = nURL2;

                    // Hide un-mapped images in order to show the mapped image
                    maps[j].querySelector(".map-annotation-" + String(j+1) + "-2").style.visibility = "hidden";
                    maps[j].querySelector(".map-mask-" + String(j+1) + "-2").style.visibility = "hidden";
                    maps[j].querySelector(".map-annotation-" + String(j+1)).style.visibility = "hidden";
                    maps[j].querySelector(".map-mask-" + String(j+1)).style.visibility = "hidden";
                }
            }

            // Update mapped imaged' urls
            for (let j = 0; j < 2; j++) {
                if (j == 0) {

                    // Update the first mapped image element's url
                    let maskURL     = maskImg.src;
                    let newURL;
                    if (lastPreview == 0) {
                        newURL = maskURL.replace("gallery/1", "gallery/" + String(i+1));
                    } else {
                        newURL = maskURL.replace("gallery/" + lastPreview, "gallery/" + String(i+1));
                    }
                    maskImg.src     = newURL;

                    // Update the second mapped image element's url
                    let maskURL2    = maskImg2.src;
                    let newURL2;
                    if (lastPreview == 0) {
                        newURL2 = maskURL2.replace("gallery/1", "gallery/" + String(i+1));
                    } else {
                        newURL2 = maskURL2.replace("gallery/" + lastPreview, "gallery/" + String(i+1));
                    }
                    maskImg2.src    = newURL2;
                }
                if (j == 1) {

                    // Update the first used annotation image's url
                    let annotaURL = annotaImg.src;
                    let newURL;
                    if (lastPreview == 0) {
                        newURL = annotaURL.replace("gallery/1", "gallery/" + String(i+1));
                    } else {
                        newURL = annotaURL.replace("gallery/" + lastPreview, "gallery/" + String(i+1));
                    }
                    annotaImg.src = newURL;

                    // Update the second used annotation image's url
                    let annotaURL2 = annotaImg2.src;
                    let newURL2;
                    if (lastPreview == 0) {
                        newURL2 = annotaURL2.replace("gallery/1", "gallery/" + String(i+1));
                    } else {
                        newURL2 = annotaURL2.replace("gallery/" + lastPreview, "gallery/" + String(i+1));
                    }
                    annotaImg2.src = newURL2;
                }
            }
        }
    }
}

// Display the hovering but unclicked shape of the first mapped annotation
function showMask () {
    for (let j = 0; j < 4; j++) {
        maskImg.style.opacity = 1;
        if (JSON.parse(testJson)[selectedIndex].annotation[j]) {
            // suppose every album has exactly one annotated image
            previewImgs[j].setAttribute('usemap', 0);
        }
    }
}

// Display the hovering but unclicked shape of the second mapped annotation
function showMask2 () {
    for (let j = 0; j < 4; j++) {
        maskImg2.style.opacity = 1;
        if (JSON.parse(testJson)[selectedIndex].annotation[j]) {
            // suppose every album has only one annotated image
            previewImgs[j].setAttribute('usemap', 0);
        }
    }
}

// Hide the shape of the first mapped annotation when mouse still unclicked and also not hovering
function hideMask () {
    if (maskImg != 0 && (!maskClicked)) {
        maskImg.style.opacity = 0;
    }
}
// Hide the shape of the second mapped annotation when mouse still unclicked and also not hovering
function hideMask2 () {
    if (maskImg2 != 0 && (!maskClicked2)) {
        maskImg2.style.opacity = 0;
    }
}

// Unclickible if both two mapped annotation are displayed
function showAnnotation () {
    maskClicked                 = true;
    maskImg.style.opacity       = 1;
    if (maskClicked && maskClicked2) {
        maskImg.setAttribute('usemap', 0);
        maskImg2.setAttribute('usemap', 0);
        if (selectedIndex == 0) {specialImgMap.style.visibility = "visible";}
    }
    annotaImg.style.opacity     = 1;
}

// Unclickible if both two mapped annotation are displayed
function showAnnotation2 () {
    maskClicked2                = true;
    maskImg2.style.opacity      = 1;
    if (maskClicked && maskClicked2) {
        maskImg.setAttribute('usemap', 0);
        maskImg2.setAttribute('usemap', 0);
        if (selectedIndex == 0) {specialImgMap.style.visibility = "visible";}
    }
    annotaImg2.style.opacity    = 1;
}

// Slider system to naviogate and display images in an album
// Clear all previous annotations
function changeImgText () {
    let current;
    for (let j = 0; j < radios.length; j++) {
        if (radios[j].checked) {
            current                             = j;
            buttonsAll[j].style.backgroundColor = "red";
            currentImg.textContent              = j + 1;
        } else {
            buttonsAll[j].style.backgroundColor = "";
        }
    }

    for (let j = 0; j < 4; j++) {
        if (JSON.parse(testJson)[selectedIndex].annotation[j]) {

            if (j == current) {

                // Prepare annotation images for display when
                // back to the annotated image in album
                if (left) {
                    annotaImg2.style.transition     = "all .6s ease";
                    maskImg2.style.transition       = "all .6s ease";

                    annotaImg.style.transition      = "all .6s ease";
                    maskImg.style.transition        = "all .6s ease";
                }
                if (maskImg.style.visibility == "hidden") {
                    annotaImg.style.visibility      = "visible";
                    maskImg.style.visibility = "visible";
                }
                if (maskImg2.style.visibility == "hidden") {
                    annotaImg2.style.visibility     = "visible";
                    maskImg2.style.visibility       = "visible";
                }
                left                                = false;
            } else {
                left                                = true;
            }
        }
    }

    if (left) {
        specialImgMap.style.visibility              = "hidden";
        // Just left and all two annotations need to be cleared
        annotaImg.style.opacity                     = 0;
        maskImg.style.opacity                       = 0;
        annotaImg2.style.opacity                    = 0;
        maskImg2.style.opacity                      = 0;

        // Prepare two annotations for the next display by restoring clickibility
        for (let j = 0; j < 4; j++) {
            if (JSON.parse(testJson)[selectedIndex].annotation[j]) {
                maskImg2.setAttribute('usemap', "#note-" + String(j+1));
                maskImg.setAttribute('usemap', "#note-" + String(j+1));
                previewImgs[j].setAttribute('usemap', "#note-" + String(j+1));
            }
        }

        // No delayed transition animation when clearing annotations
        if (maskImg.style.visibility == "visible") {
            annotaImg.style.transition             = "all 0s ease";
            maskImg.style.transition               = "all 0s ease";
            maskClicked = false;
        }
        if (maskImg2.style.visibility == "visible") {
            annotaImg2.style.transition            = "all 0s ease";
            maskImg2.style.transition              = "all 0s ease";
            maskClicked2                           = false;
        }

        // Hide annotations when browsering unannotated images in album
        annotaImg2.style.visibility                = "hidden";
        maskImg2.style.visibility                  = "hidden";
        annotaImg.style.visibility                 = "hidden";
        maskImg.style.visibility                   = "hidden";
    }
}

// Click close button and quit preview box;
function closePreview () {
    // Clear all annotations
    specialImgMap.style.visibility                 = "hidden";
    maskClicked                                    = false; 
    maskClicked2                                   = false;
    left                                           = false;

    annotaImg.style.transition                     = "all 0s ease";
    maskImg.style.transition                       = "all 0s ease";
    maskImg.style.opacity                          = 0;
    annotaImg.style.opacity                        = 0;

    annotaImg2.style.transition                    = "all 0s ease";
    maskImg2.style.transition                      = "all 0s ease";
    maskImg2.style.opacity                         = 0;
    annotaImg2.style.opacity                       = 0;

    maskImg                                        = 0;
    annotaImg                                      = 0;
    maskImg2                                       = 0;
    annotaImg2                                     = 0;
    imageMap                                       = 0; 
    imageMap2                                      = 0;
    coordinatesMap                                 = 0;
    circleMap                                      = 0;

    // Close current preview box and clear
    // for the next album preview.
    previewBox.classList.remove("show");
    let lastIndex = previewBox.className.lastIndexOf("last-preview-") + 13;
    let lastAlbum;
    if (lastIndex + 1 == previewBox.className.length) {
        lastAlbum = previewBox.className.charAt(lastIndex);
    } else {
        lastAlbum = previewBox.className.slice(lastIndex,previewBox.className.length);
    }
    lastPreview = lastAlbum;
    previewBox.classList.remove("last-preview-" + lastPreview);
    shadowPreview.style.display                 = "none";
    previewBox.style.transition                 = "all .8s ease";
    shadowPreview.style.transition              = "all .8s ease";
    setUp();
    currentImg.textContent                      = 1;
}