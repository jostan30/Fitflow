const videosData = {
    "videos": [
        {
            "title": "Pull ups for beginners",
            "thumbnail": "../gallery/thumbails/1_Pull ups for beginners.jpg",
            "source": "../gallery/platformvideos/1_Pull ups for beginners.mp4"
        },
        
        {
            "title": "Archer pushups",
            "thumbnail": "../gallery/thumbails/2_Archer pushups.jpg",
            "source": "../gallery/platformvideos/2_Archer pushup.mp4"
        },
        {
            "title": "30 Days planned exercise",
            "thumbnail": "../gallery/thumbails/3_Days planned exercise.jpg",
            "source": "../gallery/platformvideos/3_Days planned exercise  (1).mp4"
        },
        {
            "title": "Belly fat reduce",
            "thumbnail": "../gallery/thumbails/4_Belly fat reduce.jpg",
            "source": "../gallery/platformvideos/4_Belly fat reduce.mp4"
        },
        {
            "title": "Yoga",
            "thumbnail": "../gallery/thumbails/5_Yoga.jpg",
            "source": "../gallery/platformvideos/5_Yoga.mp4"
        },
        
    ]
};
document.addEventListener('DOMContentLoaded', () => {
    // Function to display videos
    function displayVideos(data) {
        const videoContainer = document.getElementById('video-container');
        videoContainer.innerHTML = ''; // Clear existing content

        data.videos.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.classList.add('video');
            videoElement.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <p>${video.title}</p>
            `;
            videoContainer.appendChild(videoElement);

            // Add event listener to play the video when clicked
            videoElement.addEventListener('click', () => {
                playVideo(video.source);
            });
        });
    }

   // Play the video
function playVideo(videoSource) {
    const videoPlayer = document.createElement('video');
    videoPlayer.src = videoSource;
    videoPlayer.controls = true;
    videoPlayer.autoplay = true; // Autoplay the video
    videoPlayer.style.width = '80%'; // Set video width to 100%
    videoPlayer.style.height = '500px'; // Maintain aspect ratio
    videoPlayer.style.marginTop = '20px'; // Add some margin for spacing
    videoPlayer.style.border = '1px solid #ccc'; // Add border for style
    videoPlayer.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.1)'; // Add box shadow for style

    // Create a button to exit the video
    const exitButton = document.createElement('button');
    exitButton.textContent = 'Exit Video';
    exitButton.classList.add('exit-button'); // Add exit button class
    exitButton.addEventListener('click', () => {
        videoContainer.innerHTML = ''; // Clear the video container
        displayVideos(videosData); // Redisplay the video thumbnails
    });

    // Replace the video container content with the video player and exit button
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';
    videoContainer.appendChild(videoPlayer);
    videoContainer.appendChild(exitButton);
}


    // Filter videos by title
    function filterVideosByTitle(searchQuery) {
        const filteredVideos = videosData.videos.filter(video => {
            return video.title.toLowerCase().includes(searchQuery.toLowerCase());
        });
        displayVideos({ videos: filteredVideos });
    }

    // Display all videos when the page loads
    displayVideos(videosData);

    // Add event listener to search bar
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', () => {
        const searchQuery = searchBar.value.trim();
        filterVideosByTitle(searchQuery);
    });
});
