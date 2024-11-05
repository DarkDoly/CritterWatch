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
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// Get the postId from the URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

// Function to fetch and display post details
function displayPost() {
    return new Promise((resolve, reject) => { // Return a promise
        const postRef = db.collection('post').doc(postId);
        const commentsList = document.getElementById("commentsList");
        
        // Clear the comments list each time displayPost is called
        commentsList.innerHTML = ""; 

        postRef.get().then((doc) => {
            if (doc.exists) {
                const postData = doc.data();

                // Populate the post container with data
                document.getElementById('postImage').src = postData.imageUrl;
                document.getElementById('postTitle').textContent = postData.title;
                document.getElementById('postContent').textContent = postData.content;

                resolve();
            } else {
                console.error("No such document!");
                document.getElementById('postContainer').innerHTML = "<p>Post not found.</p>";
            }
        }).catch((error) => {
            console.error("Error fetching post: ", error);
            document.getElementById('postContainer').innerHTML = "<p>Error fetching post.</p>";
        });
    });
}

// Call displayPost and then fetch comments
displayPost()
    .then(() => {
        fetchComments(); // Call fetchComments after displayPost finishes
    })
    .catch((error) => {
        console.error("Error in displaying post or fetching comments: ", error);
});

let commentsLoaded = false; // Track if comments have been loaded

function fetchComments() {
    const commentsList = document.getElementById("commentsList");

    // Fetch existing comments only if not loaded already
    if (!commentsLoaded) {
        db.collection("post").doc(postId).collection("comments")
            .get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    const commentData = doc.data();
                    // Check if the comment is already displayed before adding
                    if (!commentsList.querySelector(`[data-comment-id="${doc.id}"]`)) {
                        addCommentToList(doc.id, commentData); // Add comment to the list
                    }
                });
                commentsLoaded = true; // Set to true after loading
            })
            .catch((error) => {
                console.error("Error fetching comments: ", error);
            });
    }

    // Set up real-time updates for new comments
    db.collection("post").doc(postId).collection("comments")
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    const commentData = change.doc.data();
                    // Only add if the comment is not already displayed
                    if (!commentsList.querySelector(`[data-comment-id="${change.doc.id}"]`)) {
                        addCommentToList(change.doc.id, commentData); // Add new comment to the list
                    }
                }
            });
        });
}

function addCommentToList(commentId, commentData) {
    const commentsList = document.getElementById("commentsList");

    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    let createdAt;
    if (commentData.createdAt && commentData.createdAt.seconds) {
        createdAt = commentData.createdAt.seconds * 1000;
    } else {
        createdAt = Date.now();
    }

    commentElement.innerHTML = `
        <small>Posted by: <a href="profile_other.html?userId=${commentData.userId}">${commentData.username}</a> on ${new Date(createdAt).toLocaleString()}</small>
        <p>${commentData.content}</p>
        ${commentData.imageUrl ? `<img src="${commentData.imageUrl}" alt="Comment Image" style="max-width: 100%; height: auto;">` : ''}
        <div class="like-container">
            <button class="star-button ${commentData.likes && commentId && commentData.likes.includes(firebase.auth().currentUser?.uid) ? 'checked' : 'unchecked'}" data-comment-id="${commentId}" ${!firebase.auth().currentUser ? 'disabled' : ''}>
                ★
            </button>
            <span class="likeCount">${commentData.likes ? commentData.likes.length : 0}</span>
        </div>
        <button class="btn btn-secondary replyButton" data-comment-id="${commentId}">Reply</button>
        <div class="replies" id="replies-${commentId}"></div>
    `;

    commentsList.appendChild(commentElement);
    
    fetchReplies(commentId);
    
    commentElement.querySelector(".replyButton").addEventListener("click", () => {
        showReplyForm(commentId, commentElement.querySelector(`#replies-${commentId}`));
    });
}

function showReplyForm(commentId, repliesContainer) {
    const replyForm = document.createElement("form");
    replyForm.classList.add("replyForm");
    replyForm.innerHTML = `
        <div class="form-group">
            <textarea class="form-control" rows="2" placeholder="Add a reply..." required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit Reply</button>
        <button type="button" class="btn btn-light cancelReplyButton">Cancel</button>
    `;

    // Append reply form to replies container
    repliesContainer.appendChild(replyForm);

    // Handle reply submission
    replyForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const replyText = replyForm.querySelector("textarea").value.trim();
        if (replyText) {
            submitReply(commentId, replyText);
            repliesContainer.removeChild(replyForm); // Remove the reply form after submission
        }
    });

    // Cancel reply
    replyForm.querySelector(".cancelReplyButton").addEventListener("click", () => {
        repliesContainer.removeChild(replyForm); // Remove the reply form
    });
}

function fetchReplies(commentId) {
    const repliesContainer = document.getElementById(`replies-${commentId}`);
    
    // Clear previous replies
    repliesContainer.innerHTML = "";

    // Fetch replies from Firestore
    db.collection('post').doc(postId).collection('comments').doc(commentId).collection('replies').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const replyData = { ...doc.data(), replyId: doc.id }; // Ensure replyId is included
            addReplyToList(replyData, repliesContainer, commentId);
        });
    })
    .catch(error => {
        console.error("Error fetching replies: ", error);
    });
}

function addReplyToList(replyData, repliesContainer, commentId) {
    const replyElement = document.createElement("div");
    replyElement.classList.add("comment");

    let createdAt;
    if (replyData.createdAt && replyData.createdAt.seconds) {
        createdAt = replyData.createdAt.seconds * 1000;
    } else {
        createdAt = Date.now();
    }

    replyElement.innerHTML = `
        <small>Posted by: <a href="profile_other.html?userId=${replyData.userId}">${replyData.username}</a> on ${new Date(createdAt).toLocaleString()}</small>
        <p>${replyData.content}</p>
        <div class="like-container">
            <button class="star-button ${replyData.likes && replyData.likes.includes(firebase.auth().currentUser?.uid) ? 'checked' : 'unchecked'}" 
                    data-reply-id="${replyData.replyId || ''}" 
                    data-comment-id="${commentId}" 
                    ${!firebase.auth().currentUser ? 'disabled' : ''}>
                ★
            </button>
            <span class="likeCount">${replyData.likes ? replyData.likes.length : 0}</span>
        </div>
    `;

    repliesContainer.appendChild(replyElement);
}

function submitReply(commentId, replyText) {
    const user = firebase.auth().currentUser;
    if (!user) {
        console.error("No user signed in!");
        return; // Prevent submission if no user is signed in
    }

    const userId = user.uid; // Get user ID
    const userDocRef = db.collection("user").doc(userId);

    userDocRef.get().then(doc => {
        if (doc.exists) {
            const username = doc.data().UserName; // Get username

            // Add reply to Firestore
            db.collection("post").doc(postId).collection("comments").doc(commentId).collection("replies").add({
                content: replyText,
                userId: userId,
                username: username,
                likes: [], // Initialize likes array
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                console.log("Reply added successfully!");
                fetchReplies(commentId); // Refresh replies
            }).catch(error => {
                console.error("Error adding reply: ", error);
            });
        } else {
            console.error("User document not found!");
        }
    }).catch(error => {
        console.error("Error fetching user document: ", error);
    });
}

document.getElementById('commentsList').addEventListener('click', (event) => {
    if (event.target.classList.contains('star-button')) {
        const replyId = event.target.getAttribute('data-reply-id');
        const commentId = event.target.getAttribute('data-comment-id');
        const userId = firebase.auth().currentUser?.uid;

        // Ensure userId is not null or undefined
        if (!userId) {
            console.error("No user signed in!");
            return;
        }

        let replyRef;
        if (replyId) {
            // It's a reply
            replyRef = db.collection('post').doc(postId).collection('comments').doc(commentId).collection('replies').doc(replyId);
        } else {
            // It's a comment, use only the commentId
            replyRef = db.collection('post').doc(postId).collection('comments').doc(commentId);
        }

        replyRef.get().then((doc) => {
            if (doc.exists) {
                const replyData = doc.data();
                let likes = replyData.likes || [];
                const likeCountElement = event.target.nextElementSibling; // Get the like count span

                if (replyId) {
                    // Handling for reply
                    if (likes.includes(userId)) {
                        likes = likes.filter(id => id !== userId);
                        event.target.classList.remove('checked');
                    } else {
                        likes.push(userId);
                        event.target.classList.add('checked');
                    }
                } else {
                    // Handling for comment
                    if (likes.includes(userId)) {
                        likes = likes.filter(id => id !== userId);
                        event.target.classList.remove('checked');
                    } else {
                        likes.push(userId);
                        event.target.classList.add('checked');
                    }
                }

                // Update the likes array in Firestore
                replyRef.update({ likes })
                    .then(() => {
                        likeCountElement.textContent = likes.length;
                    })
                    .catch(error => {
                        console.error("Error updating likes: ", error);
                    });
            } else {
                console.error("Document does not exist");
            }
        }).catch(error => {
            console.error("Error fetching document: ", error);
        });
    }
});

document.getElementById("commentButton").addEventListener("click", function() {
    // Hide the comment button
    this.hidden = true;

    // Show the comments section
    document.getElementById("commentsSection").hidden = false;
});

document.getElementById("backButton").addEventListener("click", function() {
    // Show the comment button
    document.getElementById("commentButton").hidden = false;

    // Hide the comments section
    document.getElementById("commentsSection").hidden = true;
});

// Check if the user is signed in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, enable comment submission
        document.getElementById("commentForm").addEventListener("submit", submitComment);
    } else {
        // User is signed out, disable comment submission
        console.error("User is not signed in.");
    }
});

function submitComment(event) {
    event.preventDefault();

    const commentInput = document.getElementById("commentInput");
    const commentText = commentInput.value.trim();
    const commentImage = document.getElementById("commentImage").files[0];
    const submitButton = document.getElementById("submitButton");

    if (commentText === "") {
        console.error("Comment is empty!");
        return; // Prevent submission if the comment is empty
    }

    const user = firebase.auth().currentUser; // Get the currently signed-in user
    if (!user) {
        console.error("No user signed in!");
        return; // Prevent submission if no user is signed in
    }

    const userId = user.uid; // Get user ID
    const userDocRef = db.collection("user").doc(userId);

    submitButton.disabled = true; // Disable the button

    userDocRef.get().then(doc => {
        if (doc.exists) {
            const username = doc.data().UserName; // Get username

            let imageUrl = null; // Initialize image URL variable

            const uploadImage = (file) => {
                const storageRef = firebase.storage().ref(`comment_images/${file.name}`);
                return storageRef.put(file).then(() => {
                    return storageRef.getDownloadURL(); // Return the download URL
                });
            };

            // Check if an image is provided
            if (commentImage) {
                uploadImage(commentImage)
                    .then((url) => {
                        imageUrl = url; // Assign the image URL
                        return addCommentToFirestore(commentText, userId, username, imageUrl);
                    })
                    .then(() => {
                        console.log("Comment added successfully!");
                        resetCommentForm(commentInput);
                    })
                    .catch(handleError)
                    .finally(() => {
                        submitButton.disabled = false; // Re-enable the button
                    });
            } else {
                addCommentToFirestore(commentText, userId, username, null)
                    .then(() => {
                        console.log("Comment added successfully!");
                        resetCommentForm(commentInput);
                    })
                    .catch(handleError)
                    .finally(() => {
                        submitButton.disabled = false; // Re-enable the button
                    });
            }
        } else {
            console.error("User document not found!");
            submitButton.disabled = false; // Re-enable the button
        }
    }).catch((error) => {
        console.error("Error fetching user document: ", error);
        submitButton.disabled = false; // Re-enable the button
    });
}

function addCommentToFirestore(commentText, userId, username, imageUrl) {
    return db.collection("post").doc(postId).collection("comments").add({
        content: commentText,
        userId: userId,
        username: username,
        imageUrl: imageUrl,
        likes: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function resetCommentForm(commentInput) {
    commentInput.value = ""; // Clear input field
    document.getElementById("commentImage").value = ""; // Clear image input
    fetchComments(); // Fetch comments to refresh the list
}

function handleError(error) {
    console.error("Error adding comment: ", error);
}
