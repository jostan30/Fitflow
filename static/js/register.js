document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let formData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    fetch('/register', {
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
            if (data.message === 'Signup successful') {        
                // Redirect or perform other actions upon successful sign-in
                alert('successful registered!');
                window.location.href = '/'; // Redirect to homepage
                // Example: window.location.href = '/dashboard';
            } else {
                // Handle errors from server
                alert('Sign-up failed. Please try again.');
            }
        })
        .catch(error => {
            // Handle network errors
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
 
});
