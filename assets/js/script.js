document.addEventListener("DOMContentLoaded", async () => {
    try {
        // --- Load Components ---
        const navbar = await fetch("components/navbar.html").then(res => res.text());
        document.getElementById("navbar-container").innerHTML = navbar;

        const hero = await fetch("components/hero.html").then(res => res.text());
        document.getElementById("hero-container").innerHTML = hero;

        document.getElementById("cards-container").innerHTML = renderCards(cardsData);

        const requestDishButton = await fetch("components/requestdishButton.html").then(res => res.text());
        document.getElementById("request-dish-button-container").innerHTML = requestDishButton;

        const videoSection = await fetch("components/video-section.html").then(res => res.text());
        document.getElementById("video-section-container").innerHTML = videoSection;

        const contactUs = await fetch("components/ContactUs.html").then(res => res.text());
        document.getElementById("contact-us-container").innerHTML = contactUs;

        const footer = await fetch("components/footer.html").then(res => res.text());
        document.body.insertAdjacentHTML("beforeend", footer);

        // --- Play/Pause Video Functionality ---
        document.addEventListener("DOMContentLoaded", () => {
            const playButton = document.getElementById("play-button");
            const video = document.getElementById("promo-video");
        
            // Function to toggle play/pause
            const togglePlayPause = () => {
                if (video.paused) {
                    video.play();
                    playButton.textContent = "⏸"; // Change button to pause icon
                } else {
                    video.pause();
                    playButton.textContent = "▶"; // Change button to play icon
                }
            };
        
            // Add event listener to the button
            playButton.addEventListener("click", togglePlayPause);
        
            // Add event listener to the video itself
            video.addEventListener("click", togglePlayPause);
        
            // Update play button state on video pause/play events
            video.addEventListener("play", () => {
                playButton.textContent = "⏸"; // Pause icon when video plays
            });
        
            video.addEventListener("pause", () => {
                playButton.textContent = "▶"; // Play icon when video pauses
            });
        });
        

        // --- Add event listeners for the request dish modal ---
        const requestDishModal = document.getElementById("request-dish-modal");
        const requestDishButtonElement = document.getElementById("request-dish-button");
        const cancelRequestButton = document.getElementById("cancel-request-button");
        const requestDishForm = document.getElementById("request-dish-form");

        const body = document.body;

        // Open Request Dish Modal
        requestDishButtonElement?.addEventListener("click", () => {
            requestDishModal.style.display = "block";
            body.classList.add("no-scroll"); // Disable scrolling
        });

        // Close Request Dish Modal
        cancelRequestButton?.addEventListener("click", () => {
            requestDishModal.style.display = "none";
            body.classList.remove("no-scroll"); // Re-enable scrolling
        });

        requestDishForm?.addEventListener("submit", (e) => {
            e.preventDefault();
            // ...process form data if needed...
            requestDishModal.style.display = "none";
            body.classList.remove("no-scroll"); // Re-enable scrolling
        });

        // --- Import and Initialize Menu Toggle ---
        const { initializeMenuToggle } = await import('./menu-toggle.js');
        initializeMenuToggle();

        // --- Cart Modal Functionality ---
        const cartButton = document.querySelector(".bag-icon");

        // Wait for the cart modal to be loaded
        const cartModal = document.getElementById("cartModal");

        // Open Cart Modal
        cartButton?.addEventListener("click", function () {
            cartModal.classList.add("active");
            body.classList.add("no-scroll"); // Disable scrolling
        });

        // Close Cart Modal
        document.getElementById("closeCart")?.addEventListener("click", function () {
            cartModal.classList.remove("active");
            body.classList.remove("no-scroll"); // Enable scrolling
        });

    } catch (error) {
        console.error("Error loading components:", error);
    }
});

function renderCards(cards) {
    let cardsHTML = `
        <section class="cards-section">
            <div class="container">
                <h2>Home Kitchen</h2>
                <div class="cards-grid">
    `;
    cards.forEach(card => {
        cardsHTML += `
            <div class="food-card">
                <div class="card-image">
                    ${card.discount ? `<div class="discount-badge">${card.discount}</div>` : ''}
                    <img src="${card.image}" alt="${card.alt}">
                </div>
                <div class="card-body">
                    <div class="food-name-price">
                        <h3 class="food-name">${card.name}</h3>
                        <div class="price">
                            ${
                                card.discount 
                                ? `<span class="discounted-price">${card.discountedPrice}</span>
                                   <span class="original-price strike">${card.originalPrice}</span>`
                                : `<span class="original-price">${card.originalPrice}</span>`
                            }
                        </div>
                    </div>
                    <div class="rating-delivery">
                        <span class="rating">${card.rating}</span>
                        <span class="delivery-time">${card.deliveryTime}</span>
                        <button class="add-button">+</button>
                    </div>
                </div>
            </div>
        `;
    });
    cardsHTML += `
                </div>
            </div>
        </section>
    `;
    return cardsHTML;
}
