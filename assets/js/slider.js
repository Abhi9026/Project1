document.addEventListener("DOMContentLoaded", async function() {
    try {
        // 1. Load the popular carousel markup
        const popularCarouselHTML = await fetch("components/popular-carousel.html").then(res => res.text());
        document.getElementById("popular-carousel-container").innerHTML = popularCarouselHTML;

        // 2. Wait a tick and initialize slider
        const sliderElement = document.querySelector(".slider");
        if (!sliderElement) {
            console.error("Slider element not found!");
            return;
        }

        // Populate slider with items from cardsData
        sliderElement.innerHTML = renderSliderItems(cardsData);

        // 3. Slider Navigation Logic (UPDATED for 3-item view and active-slide)
        const leftArrow = document.querySelector(".left-arrow");
        const rightArrow = document.querySelector(".right-arrow");
        let currentSlide = 0;
        const slideWidth = 250 + 15; // Card width + margin-right (UPDATED)
        const slides = sliderElement.children; // Get slider items as a collection


        function updateSlider() {
            sliderElement.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

            // Remove active-slide class from all items
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active-slide');
            }
            // Add active-slide class to the middle item in view
            if (slides[currentSlide + 1]) { // Check if middle slide exists
                slides[currentSlide + 1].classList.add('active-slide');
            }
        }

        // Initial slider setup
        updateSlider(); // Set initial active-slide and position

        rightArrow.addEventListener("click", function() {
            const maxSlide = slides.length - 3; // Calculate max slide to show 3 at a time (UPDATED)
            if (currentSlide < maxSlide) {
                currentSlide++;
                updateSlider();
            }
        });

        leftArrow.addEventListener("click", function() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
                }
        });

    } catch (error) {
        console.error("Error in slider.js:", error);
    }
});


// Updated renderSliderItems to reuse card HTML structure
function renderSliderItems(cards) {
    let sliderHTML = "";
    const popularCards = cards.slice(0, 5); // Take only the first 3 cards (QUICK FIX)
    popularCards.forEach(card => {
        sliderHTML += `
            <div class="slider-item">
                ${createCardHTML(card)}
            </div>
        `;
    });
    return sliderHTML;
}


// --- NEW HELPER FUNCTION: createCardHTML (used by both renderCards and renderSliderItems) ---
function createCardHTML(card) {
    return `
        <div class="food-card" style="box-shadow: none; border-radius: 0;">
            <div class="card-image">
                ${card.discountPercentage ? `<div class="discount-badge">${card.discountPercentage}%</div>` : ""}
                <img src="${card.image}" alt="${card.name}">
            </div>
            <div class="card-body">
                <div class="food-name-price">
                    <h3 class="food-name">${card.name}</h3>
                    <div class="price">
                        ${
                            card.originalPrice
                            ? `<span class="discounted-price">${card.discountedPrice}</span>
                               <span class="original-price strike">${card.originalPrice}</span>`
                            : `<span class="discounted-price">${card.discountedPrice}</span>`
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
}