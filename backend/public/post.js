// Make sure to remove the firebaseConfig declaration if it's already in main.js
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

// Image preview functionality
postImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block'; // Show the preview
        };
        reader.readAsDataURL(file);
    }
});

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
        }, 
        () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                // Save the post data to Firestore, including the image URL
                db.collection('post').add({
                    title: title,
                    content: content, // Description can be empty
                    imageUrl: downloadURL, // Store the image URL
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    messageDiv.textContent = "Post created successfully!";
                    postForm.reset(); // Reset the form
            
                    // Redirect to the main page
                    window.location.href = 'index.html'; // Redirect to your main page
                })
                .catch((error) => {
                    console.error("Error creating post: ", error);
                    messageDiv.textContent = "Error creating post: " + error.message;
                });
            });
        }
    );
});