let currentIndex = {}; // Object to store the indices for each project 
let lastScrollY = 0;

function openModal(projectIndex) {
    // Save the current scroll position
    lastScrollY = window.scrollY;

    // Block scrolling and activate the modal specific to the project
    document.body.classList.add('modal-open');
    document.getElementById('modal' + projectIndex).style.display = 'block'; // Specific modal

    // Restore the scroll to prevent scrolling
    window.scrollTo(0, lastScrollY);

    // Initialize the image index if not defined
    if (!currentIndex[projectIndex]) {
        currentIndex[projectIndex] = 0; // Set initial index
    }

    showImage(projectIndex, currentIndex[projectIndex]);

    // Add the event for keyboard keys
    document.addEventListener('keydown', (e) => handleKeyPress(e, projectIndex));
}

function closeModal(projectIndex) {
    // Close the modal and restore the scroll position
    document.getElementById('modal' + projectIndex).style.display = 'none'; // Specific modal
    document.body.classList.remove('modal-open');
    window.scrollTo(0, lastScrollY); // Restore scroll position and go back to original position

    // Stop all videos in the modal and reset them
    let videos = document.querySelectorAll('#modal' + projectIndex + ' video'); // Select videos
    videos.forEach(video => {
        video.pause(); // Pause the video
        video.currentTime = 0; // Reset the video to the beginning
    });

    // Remove the keyboard key event listener
    document.removeEventListener('keydown', (e) => handleKeyPress(e, projectIndex));
}

function showImage(projectIndex, index) {
    let images = document.querySelectorAll('#modal' + projectIndex + ' .carousel-image'); // Specific modal

    images.forEach(image => {
        image.classList.remove('active');
        // If it's a video, pause it and reset it
        if (image.tagName.toLowerCase() === 'video') {
            image.pause();
            image.currentTime = 0; // Reset the video to the beginning
        }
    });

    if (images[index]) {
        images[index].classList.add('active');
        // Check if it's a video and play it
        if (images[index].tagName.toLowerCase() === 'video') {
            images[index].play();
        }
    }
}

function changeImage(direction, projectIndex) {
    let images = document.querySelectorAll('#modal' + projectIndex + ' .carousel-image'); // Specific modal
    currentIndex[projectIndex] += direction;

    if (currentIndex[projectIndex] < 0) {
        currentIndex[projectIndex] = images.length - 1;
    } else if (currentIndex[projectIndex] >= images.length) {
        currentIndex[projectIndex] = 0;
    }

    showImage(projectIndex, currentIndex[projectIndex]);
}

// Function to navigate using keyboard arrow keys
function handleKeyPress(event, projectIndex) {
    if (event.keyCode === 37) {
        // Left arrow (go back)
        changeImage(-1, projectIndex);
    } else if (event.keyCode === 39) {
        // Right arrow (go forward)
        changeImage(1, projectIndex);
    }
}
