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


// This file is for posting a new post, the database is save in firestore and storage

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

// Preview selected images
postImage.addEventListener('change', (event) => {
    const files = event.target.files;
    imagePreview.innerHTML = ''; // Clear previous preview content

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.style.width = '100%';
            imgElement.style.marginTop = '10px';
            imagePreview.appendChild(imgElement); // Add each image to preview
        };
        reader.readAsDataURL(file);
    });
});

// Handle form submission with multiple image uploads
postForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value;
    const relativeLocation = locationInput.value.trim();
    const createPostButton = postForm.querySelector('button[type="submit"]');
    const files = postImage.files;
    
    if (!title || files.length === 0) {
        alert("Please enter a title and select at least one image.");
        return;
    }

    createPostButton.disabled = true;
    const user = firebase.auth().currentUser;

    if (!user) {
        alert("You must be logged in to create a post.");
        createPostButton.disabled = false;
        return;
    }

    try {
        const imageUrls = [];
        
        // Upload each image and store its URL in imageUrls array
        for (const file of files) {
            const storageRef = storage.ref(`images/${file.name}`);
            const uploadTask = await storageRef.put(file);
            const downloadURL = await uploadTask.ref.getDownloadURL();
            imageUrls.push(downloadURL);
        }

        // Get user location
        const userLocation = await getUserLocation();

        // Save the post data with an array of image URLs
        await db.collection('post').add({
            title: title,
            content: content,
            imageUrls: imageUrls, // Store the array of image URLs
            likes: [],
            userId: user.uid,
            coordinates: {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
            },
            relativeLocation: relativeLocation,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        messageDiv.textContent = "Post created successfully!";
        postForm.reset();
        imagePreview.innerHTML = ''; // Clear the preview area
        createPostButton.disabled = false;

        window.location.href = 'index.html'; // Redirect to main page
    } catch (error) {
        console.error("Error creating post: ", error);
        messageDiv.textContent = "Error creating post: " + error.message;
        createPostButton.disabled = false;
    }
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
