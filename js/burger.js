document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('.burger');
    const xMarkButton = document.querySelector('.x_mark');
    const mobileNav = document.querySelector('.mobile_nav');
    const menuOverlay = document.querySelector('.menu_overlay');
    const body = document.body;

    function openMenu() {
        if (mobileNav && menuOverlay) {
            mobileNav.classList.add('active');
            menuOverlay.classList.add('active');
            body.classList.add('menu_open');
            if (burgerButton && xMarkButton) {
                burgerButton.style.display = 'none';
                xMarkButton.style.display = 'flex';
            }
        }
    }

    function closeMenu() {
        if (mobileNav && menuOverlay) {
            mobileNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu_open');
            if (burgerButton && xMarkButton) {
                burgerButton.style.display = 'flex';
                xMarkButton.style.display = 'none';
            }
        }
    }

    if (burgerButton) {
        burgerButton.addEventListener('click', function(e) {
            e.preventDefault();
            openMenu();
        });
    }

    if (xMarkButton) {
        xMarkButton.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                closeMenu();
            }
        });
    }

    const navLinks = document.querySelectorAll('.mobile_nav_a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024 && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });

    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref === currentPage) {
                link.classList.add('active');
            }
        });
    }

    function initializeMenu() {
        closeMenu();
        setActiveNavLink();
    }

    initializeMenu();
});
