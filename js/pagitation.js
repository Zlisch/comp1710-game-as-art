var allUl    = document.querySelectorAll("ul"),
    ulTag    = allUl[allUl.length-1],
    currPage = 0,
    prev     = 0,
    next     = 0,
    prevUrl  = "",
    blogUrl  = "../nav/blogs.html",
    nextUrl  = "";

function element (total) {
    let fileName = document.location.href.split("/")[document.location.href.split("/").length - 1]
    currPage = parseInt(fileName.split("-")[fileName.split("-").length - 1].split(".")[0]);
    prev     = currPage - 1;
    next     = currPage + 1;

    if (prev < 1) {
        ulTag.firstElementChild.classList.add("block-button");
        ulTag.firstElementChild.style.color = "#a3a3a3";
        if (ulTag.lastElementChild.classList.contains("block-button")) {
            ulTag.lastElementChild.classList.remove("block-button");
            ulTag.lastElementChild.style.color = "white";
        }
    } else {
        if (ulTag.firstElementChild.classList.contains("block-button")) {
            ulTag.firstElementChild.classList.remove("block-button");
            ulTag.firstElementChild.style.color = "white";
        }
        if (next > total) {
            ulTag.lastElementChild.classList.add("block-button");
            ulTag.lastElementChild.style.color = "#a3a3a3";
        } else {
            if (ulTag.lastElementChild.classList.contains("block-button")) {
                ulTag.lastElementChild.classList.remove("block-button");
                ulTag.lastElementChild.style.color = "white";
            }
        }
    }
}

function prevPage () {
    if (prev >= 1) {
        prevUrl = document.location.href.replace("post-" + String(currPage), "post-" + String(prev));
        window.open(prevUrl, "_self");
    }
}

function blogPage () {
    window.open(blogUrl, "_self");
}

function nextPage () {
    console.log(String(next));
    if (next <= 4) {
        nextUrl = document.location.href.replace("post-" + String(currPage), "post-" + String(next));
        window.open(nextUrl, "_self");
    }
}

// Total page.
// Pagitation begins from 1.
element (4);