// Get the upload button
var uploadBtn = document.getElementById("uploadBtn");

// Get the popup
var popup = document.getElementById("popup");

// Get the close button
var closeBtn = document.getElementById("closeBtn");

// When the upload button is clicked, show the popup
uploadBtn.onclick = function() {
    popup.style.display = "block";
}

// When the close button is clicked, hide the popup
closeBtn.onclick = function() {
    popup.style.display = "none";
}


document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('uploadForm');
  const feedContainer = document.getElementById('feed');
  let userPosts = []; // Array to store user posts
  
  uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fileInput = document.getElementById('file');
      const captionInput = document.getElementById('caption');

      const formData = new FormData();
      formData.append('file', fileInput.files[0]);
      formData.append('caption', captionInput.value);

      try {
          // Mock API call to simulate backend upload
          const response = await fetch('/upload', {
              method: 'POST',
              body: formData // Use 'body' instead of 'file'
          });

          if (response.ok) {
              const post = await response.json();
              userPosts.push(post); // Push the new post to userPosts array
              displayPost(post); // Display the new post
              alert('Post uploaded successfully!');
              saveUserPosts(); // Save userPosts array to the server
          } else {
              throw new Error('Failed to upload post');
          }
      } catch (err) {
          console.error(err);
          alert('Error uploading post');
      }
  });

  async function fetchPosts() {
      try {
          const response = await fetch('/posts');
          const posts = await response.json();
          posts.forEach(post => displayPost(post));
      } catch (err) {
          console.error(err);
          alert('Error fetching posts');
      }
  }

  function displayPost(post) {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      const imageElement = document.createElement('img');
      imageElement.src = post.imageUrl;
      imageElement.alt = 'Post Image';
      postElement.appendChild(imageElement);

      const captionElement = document.createElement('p');
      captionElement.textContent = post.caption;
      postElement.appendChild(captionElement);

      feedContainer.appendChild(postElement);
  }

  // Function to save user posts to the server
  async function saveUserPosts() {
      try {
          const response = await fetch('/save-posts', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(userPosts)
          });
          if (response.ok) {
              console.log('User posts saved successfully');
          } else {
              throw new Error('Failed to save user posts');
          }
      } catch (error) {
          console.error('Error saving user posts:', error);
      }
  }

  fetchPosts(); // Fetch existing posts on page load
});
