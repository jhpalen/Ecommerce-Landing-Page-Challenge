// scripts.js
$(document).ready(function() {
    $('#navigation').load('Sections/navigation.html', function() {
        // This callback runs after the content is loaded
        // Add event listeners or other code that relies on the loaded content
        const hamburger = document.querySelector('.hamburger');
        const mainMenu = document.querySelector('.main-menu');

        if (hamburger && mainMenu) {
            hamburger.addEventListener('click', () => {
                mainMenu.classList.toggle('active');
            });
        }
    });
    $('#benefits').load('Sections/benefits.html');
    $('#hero').load('Sections/hero.html');
    $('#sitewideDeals').load('Sections/sitewideDeals.html');
    $('#vipExclusive').load('Sections/vipExclusive.html');
    $('#trending').load('Sections/trending.html');
    $('#newIn').load('Sections/newIn.html');
    $('#recentlyBought').load('Sections/recentlyBought.html');
    $('#insta').load('Sections/insta.html');
    $('#newsletter').load('Sections/newsletter.html');
    $('#footer').load('Sections/footer.html');
});
