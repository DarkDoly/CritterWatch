// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyCFJuRK6w7ygGN2MWA7SAZWK8o4nWpX0rU",
        authDomain: "critter-watch-7d415.firebaseapp.com",
        projectId: "critter-watch-7d415",
        storageBucket: "critter-watch-7d415.appspot.com",
        messagingSenderId: "500266994887",
        appId: "1:500266994887:web:33b58e0edc40a7bb6002e2",
        measurementId: "G-629HTWWVCN"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const storage = firebase.storage(); // Initialize Firebase Storage

const postForm = document.getElementById('postForm');
const messageDiv = document.getElementById('message');
const postImage = document.getElementById('postImage');
const imagePreview = document.getElementById('imagePreview');

// Preview the selected image
postImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = 'none'; // Hide preview if no file is selected
    }
});

// Handle form submission
postForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value; // Description can be empty

    // Check if title is provided
    if (!title) {
        alert("Please enter a title for the post.");
        return; // Exit the function if no title is entered
    }

    // Check if an image is selected
    if (!postImage.files.length) {
        alert("Please select an image before creating a post.");
        return; // Exit the function if no image is selected
    }

    const createPostButton = postForm.querySelector('button[type="submit"]');
    createPostButton.disabled = true; // Disable the button to prevent multiple submissions

    const file = postImage.files[0];
    const storageRef = firebase.storage().ref(`images/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            // Optional: You can add progress monitoring here if needed
        }, 
        (error) => {
            console.error("Error uploading file: ", error);
            messageDiv.textContent = "Error uploading file: " + error.message;
            createPostButton.disabled = false; // Re-enable the button
        }, 
        () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const user = firebase.auth().currentUser;
                
                if (!user) {
                    alert("You must be logged in to create a post.");
                    createPostButton.disabled = false;
                    return;
                }

                // Save the post data to Firestore, including the image URL and user ID
                return db.collection('post').add({
                    title: title,
                    content: content,
                    imageUrl: downloadURL,
                    likes: [], // Initialize likes array
                    userId: user.uid, // Store user ID
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    comments: [] // Initialize empty comments array (if desired for easier retrieval)
                });
            })
            .then(() => {
                messageDiv.textContent = "Post created successfully!";
                postForm.reset(); // Reset the form
                imagePreview.style.display = 'none'; // Hide the image preview
                createPostButton.disabled = false; // Re-enable the button

                // Redirect to the main page
                window.location.href = 'index.html'; // Redirect to your main page
            })
            .catch((error) => {
                console.error("Error creating post: ", error);
                messageDiv.textContent = "Error creating post: " + error.message;
                createPostButton.disabled = false; // Re-enable the button
            });
        }
    );
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, you can access user.uid here
        console.log("User is logged in:", user.uid);
    } else {
        // No user is signed in
        console.log("No user is logged in.");
    }
});
