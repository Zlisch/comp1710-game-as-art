var head     = document.querySelector("head"),
    cssTag   = "<link rel=\"stylesheet\" href=\"../css/main.css\" type=\"text/css\"/>",
    titleTag = "<title>Games as Art</title>",
    partTag  = "<meta charset=\"utf-8\">"
               + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
               + "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" type=\"text/css\">",
    headTag  = "";

function element () {
    headTag        = partTag + titleTag + cssTag;
    head.innerHTML = headTag;
}

function printClick () {
    titleTag = "<title>Print Preview</title>"
    cssTag   = "<link rel=\"stylesheet\" href=\"../css/print.css\" type=\"text/css\"/>";
    window.open(document.location.href);
    element();
}

element();