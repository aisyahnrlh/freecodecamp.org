const hamburger = document.querySelector('.ham');
const navLinks = document.querySelector('.nav__links');
const navLink = document.querySelectorAll('.nav__link');

const scrollY = document.body.style.top;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        navLink.forEach((navLink) => {
            navLink.classList.add('active');
        })
    } else {
        document.body.style.overflow = '';
        navLink.forEach((navLink) => {
            navLink.classList.remove('active');
        })
    }
})