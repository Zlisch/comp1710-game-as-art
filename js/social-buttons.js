
/*
  Facebook:
  https://www.facebook.com/sharer.php?u=[post-url]

  Twitter:
  https://twitter.com/share?url=[post-url]&text=[post-title]&via=[via]&hashtags=[hashtags]

  Linkedin:
  https://www.linkedin.com/shareArticle?url=[post-url]&title=[post-title]

  Tumblr:
  https://www.tumblr.com/share/link?url=[post-url]&name=[post-title]&description=[post-desc]
 */

var facebookBtn = document.querySelector("facebook-button"),
    twitterBtn  = document.querySelector("twitter-button"),
    linkedinBtn = document.querySelector("linkedin-button"),
    tumblrBtn   = document.querySelector("tumblr-button");

function btClick (selectedBt) {
    let socialMedia = selectedBt.classList[1].split("-")[0];
    let openUrl;
    
    switch (socialMedia) {
        case "facebook":
        openUrl = "https://www.facebook.com/sharer.php?u=" + document.location.href;
        break;

        case "twitter":
        openUrl = "https://twitter.com/share?url=" + document.location.href;
        break;

        case "linkedin":
        openUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + document.location.href;
        break;

        case "tumblr":
        openUrl = "http://tumblr.com/widgets/share/tool?canonicalUrl=" 
                  + document.location.href
                  + "&posttype=link"
                  + "&caption=Post+From+Game+as+Art";
        break;
    }
    window.open(openUrl);
}