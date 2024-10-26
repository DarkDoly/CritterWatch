// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
    const firebaseConfig = {
        // Your Firebase configuration here
    };
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// Get the postId from the URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

// Function to fetch and display post details
function displayPost() {
    const postRef = db.collection('post').doc(postId);

    postRef.get().then((doc) => {
        if (doc.exists) {
            const postData = doc.data();

            // Populate the post container with data
            document.getElementById('postImage').src = postData.imageUrl;
            document.getElementById('postTitle').textContent = postData.title;
            document.getElementById('postContent').textContent = postData.content;
        } else {
            console.error("No such document!");
            document.getElementById('postContainer').innerHTML = "<p>Post not found.</p>";
        }
    }).catch((error) => {
        console.error("Error fetching post: ", error);
        document.getElementById('postContainer').innerHTML = "<p>Error fetching post.</p>";
    });
}

// Call the function to display the post
displayPost();
