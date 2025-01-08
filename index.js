const slider = document.getElementById("slider");
    const dotsContainer = document.getElementById("dots-container");
    const totalSlides = slider.children.length;
    let currentIndex = 0; // Ensure it starts from the first image
    let startX = 0, endX = 0;
    let autoPlayInterval;

    // Create dots dynamically
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.onclick = () => moveToSlide(i);
      dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll(".dot");

    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.remove("active");
        if (index === currentIndex) {
          dot.classList.add("active");
        }
      });
    }

    function moveToSlide(index) {
      currentIndex = index;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    }

    function autoplay() {
      currentIndex = (currentIndex + 1) % totalSlides;
      moveToSlide(currentIndex);
    }

    // Add touch functionality for manual swipe
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      clearInterval(autoPlayInterval);  // Stop autoplay on swipe
    });

    slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      if (startX > endX + 50) {
        currentIndex = (currentIndex + 1) % totalSlides; // Swipe left
      } else if (startX < endX - 50) {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Swipe right
      }
      moveToSlide(currentIndex);
      startAutoplay(); // Restart autoplay after user interaction
    });

    // Initialize dots and autoplay
    updateDots();

    // Start autoplay
    function startAutoplay() {
      // Clear any existing interval
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }

      autoPlayInterval = setInterval(autoplay, 5000); // Change slide every 5 seconds
    }

    startAutoplay(); // Initialize autoplay