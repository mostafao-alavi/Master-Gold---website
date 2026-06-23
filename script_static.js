/**
 * Master Gold Iran - Landing Page Interactive Scripts
 * Author: Seyed Mostafa Alavi
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Sticky Navigation Scroll Effect ---
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("bg-zinc-950/95", "shadow-xl", "shadow-amber-500/5");
            header.classList.remove("bg-zinc-950/80");
        } else {
            header.classList.remove("bg-zinc-950/95", "shadow-xl", "shadow-amber-500/5");
            header.classList.add("bg-zinc-950/80");
        }
    });

    // --- 2. Mobile Burger Menu Toggle ---
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("menu-icon");

    mobileMenuBtn.addEventListener("click", () => {
        const isHidden = mobileMenu.classList.contains("hidden");
        if (isHidden) {
            mobileMenu.classList.remove("hidden");
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-xmark");
        } else {
            mobileMenu.classList.add("hidden");
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }
    });

    // Close mobile menu when clicking any item
    const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
    mobileNavItems.forEach(item => {
        item.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        });
    });

    // --- 3. Smooth Scrolling for Navigation Links ---
    const scrollLinks = document.querySelectorAll('.scroll-link, .nav-item, .mobile-nav-item');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // --- 4. Active Navigation Highlighting on Scroll ---
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    const highlightActiveNav = () => {
        let currentSection = "hero";
        const scrollPosition = window.scrollY + 120; // threshold

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            const itemSection = item.getAttribute("data-section");
            if (itemSection === currentSection) {
                item.classList.add("text-amber-400", "bg-zinc-900/60");
                item.classList.remove("text-zinc-400", "hover:text-zinc-100");
            } else {
                item.classList.remove("text-amber-400", "bg-zinc-900/60");
                item.classList.add("text-zinc-400", "hover:text-zinc-100");
            }
        });
    };

    window.addEventListener("scroll", highlightActiveNav);
    highlightActiveNav(); // run once on load

    // --- 5. Elements Scroll Fade-in (Slide-up Animation) ---
    const fadeSections = document.querySelectorAll(".fade-in-section");
    
    const revealOnScroll = () => {
        fadeSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 100;

            if (sectionTop < triggerPoint) {
                section.classList.add("is-visible");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // run once on load

    // --- 6. Testimonials Automatic & Manual Slider ---
    const slides = document.querySelectorAll(".testimonial-slide");
    const indicators = document.querySelectorAll(".indicator-btn");
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        slides.forEach((slide, idx) => {
            if (idx === index) {
                slide.classList.remove("hidden");
                slide.classList.add("block");
            } else {
                slide.classList.add("hidden");
                slide.classList.remove("block");
            }
        });

        indicators.forEach((indicator, idx) => {
            if (idx === index) {
                indicator.classList.add("bg-amber-400", "w-8");
                indicator.classList.remove("bg-zinc-700", "w-3");
            } else {
                indicator.classList.remove("bg-amber-400", "w-8");
                indicator.classList.add("bg-zinc-700", "w-3");
            }
        });

        currentSlide = index;
    };

    const nextSlide = () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    };

    const startSlideShow = () => {
        slideInterval = setInterval(nextSlide, 8000);
    };

    const resetSlideShow = () => {
        clearInterval(slideInterval);
        startSlideShow();
    };

    indicators.forEach(indicator => {
        indicator.addEventListener("click", function() {
            const index = parseInt(this.getAttribute("data-index"), 10);
            showSlide(index);
            resetSlideShow();
        });
    });

    startSlideShow(); // initialize slider autoplay

    // --- 7. FAQ Accordion Toggle ---
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const button = item.querySelector(".faq-btn");
        const content = item.querySelector(".faq-content");
        const icon = item.querySelector(".faq-icon");

        button.addEventListener("click", () => {
            const isOpen = !content.classList.contains("hidden");

            // Close all other FAQs
            faqItems.forEach(otherItem => {
                const otherContent = otherItem.querySelector(".faq-content");
                const otherIcon = otherItem.querySelector(".faq-icon");
                otherContent.classList.add("hidden");
                otherIcon.classList.remove("fa-minus");
                otherIcon.classList.add("fa-plus");
            });

            // Toggle clicked FAQ
            if (isOpen) {
                content.classList.add("hidden");
                icon.classList.remove("fa-minus");
                icon.classList.add("fa-plus");
            } else {
                content.classList.remove("hidden");
                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");
            }
        });
    });

    // --- 8. Contact Form Submit Handler & Validation ---
    const contactForm = document.getElementById("contact-form");
    const successFeedback = document.getElementById("success-feedback");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("form-name").value.trim();
            const email = document.getElementById("form-email").value.trim();
            const message = document.getElementById("form-message").value.trim();

            if (!name || !email || !message) return;

            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalBtnContent = submitBtn.innerHTML;

            // Loader status
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin ml-2"></i> در حال ارسال...`;

            setTimeout(() => {
                // Success trigger
                successFeedback.classList.remove("hidden");
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;

                // Hide feedback after 5 seconds
                setTimeout(() => {
                    successFeedback.classList.add("hidden");
                }, 5000);

            }, 1200);
        });
    }

    // --- 9. Dynamic Year in Footer ---
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
});
