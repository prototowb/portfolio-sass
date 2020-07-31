const menuBtn = document.querySelector('.menu-btn');
const hamburger = document.querySelector('.menu-btn__burger');
const nav = document.querySelector('.nav');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.menu-nav__item');

let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (!showMenu) {
        hamburger.classList.add('open');
        nav.classList.add('open');
        menuNav.classList.add('open');
        navItems.forEach(item => item.classList.add('open'));

        showMenu = true;
    } else {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        menuNav.classList.remove('open');
        navItems.forEach(item => item.classList.remove('open'));

        showMenu = false;
    }
}

window.onresize = function() {
    hideHamburger()
}

function hideHamburger() {
    if (window.innerWidth > 768) { menuBtn.style.visibility = "hidden"; }
}

//#################
//#    Lightbox
//#################

function openModal() {
    document.getElementById("pModal").style.display = "block";
    document.querySelector('nav').style.display = "none";
    if (window.innerWidth < 768) { menuBtn.style.visibility = "hidden"; }
}

function closeModal() {
    document.getElementById("pModal").style.display = "none";
    document.querySelector('nav').style.display = "block";
    if (window.innerWidth < 768) { menuBtn.style.visibility = "visible"; }
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    document.getElementById('pModal').scrollTop = 0;
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("content-slides");
    let dots = document.getElementsByClassName("demo-container__column--demo");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


//#################
//#    click-to-tweet
//#################

document.addEventListener("DOMContentLoaded", function() {
    // Step 1. Get all quote elements inside the article
    const articleBody = document.getElementById('article');
    const quotes = [...articleBody.querySelectorAll('quote, blockquote')];

    let tweetableUrl = "";
    let clickToTweetBtn = null;
    const currentPageUrl = window.location.href;

    quotes.forEach(function(quote) {
        // Create a tweetable url
        tweetableUrl = makeTweetableUrl(
            quote.innerText, currentPageUrl
        );

        // Create a 'click to tweet' button with appropriate attributes
        twitterBtn = document.createElement("i");
        twitterBtn.classList.add("fa\u200Bfa-twitter");
        clickToTweetBtn = document.createElement("a").appendChild(twitterBtn);
        clickToTweetBtn.innerHTML = '<br><br>...tweet_this...<br><br>';

        clickToTweetBtn.setAttribute("href", tweetableUrl);
        clickToTweetBtn.onclick = onClickToTweet;

        // Add button to every blockquote
        quote.appendChild(clickToTweetBtn);

    });
});

function makeTweetableUrl(text, pageUrl) {
    const tweetableText = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + encodeURIComponent(text);
    return tweetableText;
}

function onClickToTweet(e) {
    e.preventDefault();

    window.open(
        e.target.getAttribute("href"),
        "twitterwindow",
        "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0,scrollbars=0"
    );

}