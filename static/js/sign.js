document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.signin-form');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
   
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Perform client-side validation (e.g., checking if fields are not empty)
        if (!username.value.trim() || !password.value.trim()) {
            alert('Please fill in all fields.');
            return;
        }

        // If validation passes, you can proceed with form submission
        // For example, you can send an AJAX request to the server
        fetch('/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // Send data as JSON
                username: username.value,
                password: password.value
            })
        })
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            // Handle response from server
            if (data.message === 'Login successful') {        
                // Redirect or perform other actions upon successful sign-in
                alert('Sign-in successful!');
                window.location.href = '/home'; // Redirect to homepage
                // Example: window.location.href = '/dashboard';
            } else {
                // Handle errors from server
                alert('Sign-in failed. Please try again.');
            }
        })
        .catch(error => {
            // Handle network errors
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    });
});
