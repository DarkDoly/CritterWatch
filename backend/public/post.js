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
const locationInput = document.getElementById('location'); // New location input

// Function to get the user's current location
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            }, (error) => {
                reject(error);
            });
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

// Initialize Google Places Autocomplete
function initAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(locationInput, {
        componentRestrictions: { country: 'all' } // Adjust as necessary
    });

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
            locationInput.value = place.formatted_address; // Set the input value to the selected place
        }
    });
}

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
postForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value; // Description can be empty
    const relativeLocation = locationInput.value.trim(); // Get the relative location from input

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
        async () => {
            // Handle successful uploads on complete
            try {
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                const user = firebase.auth().currentUser;

                if (!user) {
                    alert("You must be logged in to create a post.");
                    createPostButton.disabled = false;
                    return;
                }

                // Get user location
                const userLocation = await getUserLocation();

                // Save the post data to Firestore, including the image URL, user ID, and location data
                await db.collection('post').add({
                    title: title,
                    content: content,
                    imageUrl: downloadURL,
                    likes: [], // Initialize likes array
                    userId: user.uid, // Store user ID
                    coordinates: {
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                    },
                    relativeLocation: relativeLocation, // Save the selected relative location
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    comments: [] // Initialize empty comments array (if desired for easier retrieval)
                });

                messageDiv.textContent = "Post created successfully!";
                postForm.reset(); // Reset the form
                imagePreview.style.display = 'none'; // Hide the image preview
                createPostButton.disabled = false; // Re-enable the button

                // Redirect to the main page
                window.location.href = 'index.html'; // Redirect to your main page
            } catch (error) {
                console.error("Error creating post: ", error);
                messageDiv.textContent = "Error creating post: " + error.message;
                createPostButton.disabled = false; // Re-enable the button
            }
        }
    );
});

// Initialize the Google Places Autocomplete when the window loads
window.onload = () => {
    initAutocomplete();
};

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, you can access user.uid here
        console.log("User is logged in:", user.uid);
    } else {
        // No user is signed in
        console.log("No user is logged in.");
    }
});
