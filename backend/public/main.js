//AUTH RELATED
const auth = firebase.auth();
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const signInSection = document.getElementById('signInSection');
const signUpSection = document.getElementById('signUpSection');
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signOutBtn = document.getElementById('signOutBtn');
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const backToSignInBtn = document.getElementById('backToSignInBtn');
const signUpFromSignInBtn = document.getElementById('signUpFromSignInBtn');
const backFromSignInBtn = document.getElementById('backFromSignInBtn');
const backFromFriendsSection = document.getElementById('backFromFriendsSection')

const signUpUsernameInput = document.getElementById('signUpUsername')
const signUpEmailInput = document.getElementById('signUpEmail');
const signUpPasswordInput = document.getElementById('signUpPassword');
const signUpConfirmPasswordInput = document.getElementById('signUpConfirmPassword');

const signInEmailInput = document.getElementById('signInEmail');
const signInPasswordInput = document.getElementById('signInPassword');

const userDetails = document.getElementById('userDetails');


// Function to clear input fields
function clearInputFields() {
    signUpEmailInput.value = '';
    signUpPasswordInput.value = '';
    signUpConfirmPasswordInput.value = '';
    signInEmailInput.value = '';
    signInPasswordInput.value = '';
}

// Show sign up section
signUpFromSignInBtn.onclick = () => {
    clearInputFields();  // Clear fields before showing sign-up
    signInSection.hidden = true;
    signUpSection.hidden = false;
};

backFromSignInBtn.onclick = () => {
    clearInputFields();  // Clear fields before showing sign-up
    signInSection.hidden = true;
    whenSignedOut.hidden = false;
};

// Show sign in section
backToSignInBtn.onclick = () => {
    clearInputFields();  // Clear fields before showing sign-in
    signUpSection.hidden = true;
    signInSection.hidden = false;
};

// Sign Up event handler
signUpBtn.onclick = () => {
    const username = signUpUsernameInput.value;
    const email = signUpEmailInput.value;
    const password = signUpPasswordInput.value;

    if (password !== signUpConfirmPasswordInput.value) {
        alert("Passwords do not match!");
        return;
    }

    // Check if the username contains '@'
    if (username.includes('@')) {
        alert("Username cannot include '@'.");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("Signed up:", userCredential.user);

            // Create user document in Firestore
            db.collection('user').doc(userCredential.user.uid).set({
                UserID: userCredential.user.uid,
                UserName: username, // Save the username
                UserEmail: email,   // Save the user email
                friends_ID: [],      // Initialize with an empty array of tuples
                friends_Names: []
            })
            .then(() => {
                console.log("User document created successfully.");
                showUserDetails(userCredential.user);
            })
            .catch(error => {
                console.error("Error creating user document:", error);
                alert(error.message);
            });
        })
        .catch(error => {
            console.error("Error signing up:", error);
            alert(error.message);
        });
};


//Sign in event handler
signInBtn.onclick = () => {
    const emailOrUsername = signInEmailInput.value;
    const password = signInPasswordInput.value;

    // Determine if the input is a username or an email
    let userDocRef;

    // Check for a valid email or username
    if (emailOrUsername.includes('@')) {
        // If it includes '@', treat it as an email
        userDocRef = db.collection('user').where("UserEmail", "==", emailOrUsername);
    } else {
        // Treat it as a username
        userDocRef = db.collection('user').where("UserName", "==", emailOrUsername);
    }

    userDocRef.get().then(snapshot => {
        if (snapshot.empty) {
            alert("No user found with that email or username.");
            return;
        }

        // Get the user document and user ID
        const userId = snapshot.docs[0].id;

        // Now, sign in using the email and password
        auth.signInWithEmailAndPassword(snapshot.docs[0].data().UserEmail, password)
            .then(userCredential => {
                console.log("Signed in:", userCredential.user);
                showUserDetails(userCredential.user);
            })
            .catch(error => {
                console.error("Error signing in:", error);
                alert(error.message);
            });
    }).catch(error => {
        console.error("Error searching for user:", error);
        alert(error.message);
    });
};

// Show sign in section when clicking "Sign in with Email"
document.getElementById('signinemail').onclick = () => {
    clearInputFields();  // Clear fields before showing sign-in
    whenSignedOut.hidden = true; // Hide main sign-out section
    signInSection.hidden = false; // Show sign-in section
};

// Sign in with Google
document.getElementById('signingoogle').onclick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(userCredential => {
            console.log("Signed in with Google:", userCredential.user);

            // Get the user's Google profile information
            const user = userCredential.user;
            const username = user.displayName || "User"; // Use Google nickname or default to "User"
            const email = user.email;

            // Reference to the user document
            const userDocRef = db.collection('user').doc(user.uid);

            // Check if the user document already exists
            userDocRef.get().then(doc => {
                if (doc.exists) {
                    console.log("User document already exists:", doc.data());
                    // You can update UI or perform other actions here
                } else {
                    // User document does not exist, create it
                    console.log("Creating new user document for:", user.uid);
                    return userDocRef.set({
                        UserID: user.uid,
                        UserName: username, // Save the Google nickname as username
                        UserEmail: email,   // Save the user email
                        friends_ID: [],      // Initialize with an empty array of tuples
                        friends_Names: []
                    });
                }
            })
            .then(() => {
                console.log("User document created successfully.");
                showUserDetails(user); // Update UI with user details
            })
            .catch(error => {
                console.error("Error accessing user document:", error);
                alert(error.message);
            });
        })
        .catch(error => {
            console.error("Error signing in with Google:", error);
            alert(error.message);
        });
};



// Sign Out event handler
signOutBtn.onclick = () => {
    auth.signOut().then(() => {
        console.log("Signed out");
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false; // Show main sign-in section
    });
};

// Show user details and switch to signed-in view
function showUserDetails(user) {
    const userDocRef = db.collection('user').doc(user.uid);
    userDocRef.get().then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            userDetails.innerHTML = `<h3>Hello ${userData.UserName}!</h3>`;
        } else {
            console.log("No user document found.");
        }
    }).catch(error => {
        console.error("Error fetching user document:", error);
    });
    whenSignedOut.hidden = true;
    signInSection.hidden = true;
    signUpSection.hidden = true;
    whenSignedIn.hidden = false;
}

backFromFriendsSection.onclick = () => {
    clearInputFields();  // Clear fields before showing sign-up
    friendsSection.hidden = true;
    whenSignedIn.hidden = false;
};






// ------------------------------------------------------------
// FRIENDS RELATED





// Function to add a friend
function addFriend(friendEmail) {
    const user = firebase.auth().currentUser;
    if (user) {
        // Check if the friend exists in the database using UserEmail
        db.collection('user').where("UserEmail", "==", friendEmail).get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        const friendId = doc.id; // Get the friend's ID
                        const friendName = doc.data().UserName; // Get the friend's username

                        // Update the user's document with the new friend's details
                        db.collection('user').doc(user.uid).update({
                            friends_ID: firebase.firestore.FieldValue.arrayUnion(friendId), // Add friend ID
                            friends_Names: firebase.firestore.FieldValue.arrayUnion(friendName) // Add friend's username
                        })
                        .then(() => {
                            console.log("Friend added:", friendName);
                            getFriends(); // Refresh the friends list
                        })
                        .catch(error => {
                            console.error("Error adding friend:", error);
                            alert(error.message);
                        });
                    });
                } else {
                    alert("No user found with that email.");
                }
            })
            .catch(error => {
                console.error("Error searching for friend:", error);
                alert(error.message);
            });
    } else {
        alert("No user signed in.");
    }
}

// Function to get friends list
function getFriends() {
    const user = firebase.auth().currentUser;
    if (user) {
        db.collection('user').doc(user.uid).get()
            .then(doc => {
                if (doc.exists) {
                    const friendsIDs = doc.data().friends_ID || [];
                    // Now fetch usernames for each friend ID
                    fetchFriendUsernames(friendsIDs);
                } else {
                    console.log("No friends found.");
                }
            })
            .catch(error => {
                console.error("Error getting friends:", error);
            });
    } else {
        alert("No user signed in.");
    }
}

// Function to fetch usernames for friend IDs
function fetchFriendUsernames(friendsIDs) {
    const friendsPromises = friendsIDs.map(friendId => {
        return db.collection('user').doc(friendId).get()
            .then(friendDoc => {
                if (friendDoc.exists) {
                    return { id: friendId, username: friendDoc.data().UserName };
                } else {
                    return null; // Friend not found
                }
            });
    });

    Promise.all(friendsPromises).then(friends => {
        // Filter out null values and display friends
        const validFriends = friends.filter(friend => friend !== null);
        displayFriends(validFriends);
    }).catch(error => {
        console.error("Error fetching friend usernames:", error);
    });
}

// Function to display friends
function displayFriends(friends) {
    const friendsList = document.getElementById('friendsList');
    friendsList.innerHTML = ''; // Clear previous friends

    friends.forEach(friend => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        listItem.textContent = `Username: ${friend.username}`; // Display the friend's username

        // Create a button for removing the friend
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger btn-sm float-right';
        removeButton.textContent = 'Remove';

        // Add click event for removing the friend
        removeButton.onclick = () => {
            const confirmRemove = confirm(`Are you sure you want to remove ${friend.username} from your friends list?`);
            if (confirmRemove) {
                removeFriend(friend.id);
            }
        };

        // Create a button for messaging the friend
        const messageButton = document.createElement('button');
        messageButton.className = 'btn btn-primary btn-sm float-right mr-2';
        messageButton.textContent = 'Message';

        // Add click event to navigate to the message page
        messageButton.onclick = () => {
            window.location.href = 'message.html'; // Redirect to message page
        };

        // Append the buttons to the list item
        listItem.appendChild(messageButton);
        listItem.appendChild(removeButton);
        friendsList.appendChild(listItem);
    });
}

// Function to remove a friend
function removeFriend(friendId) {
    const user = firebase.auth().currentUser;
    if (user) {
        // Get the friend's document to retrieve their username
        db.collection('user').doc(friendId).get().then(doc => {
            if (doc.exists) {
                const friendName = doc.data().UserName; // Get the friend's username
                
                // Update the user's document to remove the friend ID and name
                db.collection('user').doc(user.uid).update({
                    friends_ID: firebase.firestore.FieldValue.arrayRemove(friendId),
                    friends_Names: firebase.firestore.FieldValue.arrayRemove(friendName)
                })
                .then(() => {
                    console.log("Friend removed:", friendId);
                    getFriends(); // Refresh the friends list
                })
                .catch(error => {
                    console.error("Error removing friend:", error);
                    alert(error.message);
                });
            } else {
                console.error("Friend document not found:", friendId);
            }
        }).catch(error => {
            console.error("Error fetching friend document:", error);
        });
    } else {
        alert("No user signed in.");
    }
}

// Event listener for adding a friend
document.getElementById('addFriendBtn').onclick = () => {
    const friendEmail = prompt("Enter friend's email:");
    if (friendEmail) {
        addFriend(friendEmail); // Call the function to add a friend
    } else {
        alert("Email is required.");
    }
};

document.getElementById('friends').onclick = () => {
    document.getElementById('whenSignedIn').hidden = true; // Hide signed-in section
    document.getElementById('friendsSection').hidden = false; // Show friends section
    getFriends(); // Fetch friends when entering this section
};





//--------------------------------------------------------------------------------------------
// POST RELATED






function getPosts() {
    const postsRef = db.collection('post');
    postsRef.get().then(snapshot => {
        currentPosts = []; // Clear previous posts
        snapshot.forEach(doc => {
            const postData = { id: doc.id, ...doc.data() }; // Include doc ID
            currentPosts.push(postData); // Store each post in currentPosts
        });
        displaySortedPosts(); // Display posts initially
    }).catch(error => {
        console.error("Error fetching posts: ", error);
    });
}

// Event delegation for star button clicks
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('star-button')) {
        const postId = event.target.getAttribute('data-post-id');
        const userId = firebase.auth().currentUser.uid; // Get the current user ID
        const postRef = db.collection('post').doc(postId);

        postRef.get().then((doc) => {
            if (doc.exists) {
                const postData = doc.data();
                let likes = postData.likes || [];
                const likeCountElement = event.target.nextElementSibling; // Get the like count span

                if (likes.includes(userId)) {
                    // User has already liked this post, so remove the like
                    likes = likes.filter(id => id !== userId);
                    event.target.classList.remove('checked'); // Remove checked class
                    event.target.classList.add('unchecked'); // Add unchecked class
                } else {
                    // User has not liked this post, so add the like
                    likes.push(userId);
                    event.target.classList.add('checked'); // Add checked class
                    event.target.classList.remove('unchecked'); // Remove unchecked class
                }

                // Update the likes array in Firestore
                postRef.update({ likes })
                    .then(() => {
                        likeCountElement.textContent = likes.length; // Update like count
                    })
                    .catch(error => {
                        console.error("Error updating likes: ", error);
                    });
            }
        });
    }
});

// Function to display a single post
function displayPost(postData) {
    const postsContainer = document.getElementById('postsContainer');
    const postDiv = document.createElement('div');
    postDiv.className = 'col-md-4'; // Bootstrap column class

    // Create the post content
    postDiv.innerHTML = `
        <div class="card mb-4" style="position: relative;"> <!-- Set position relative -->
            <a href="specpost.html?postId=${postData.id}">
                <img src="${postData.imageUrl || ''}" class="card-img-top" alt="Post Image" style="max-height: 300px; object-fit: cover;">
            </a>
            <div class="card-body">
                <div class="like-container" style="display: flex; align-items: center;">
                    <button class="star-button ${postData.likes && postData.likes.includes(firebase.auth().currentUser.uid) ? 'checked' : 'unchecked'}" data-post-id="${postData.id}">
                        ★
                    </button>
                    <span class="likeCount">${postData.likes ? postData.likes.length : 0}</span>
                </div>
                <h5 class="card-title">${postData.title}</h5>
                <p class="card-text">${postData.content}</p>
            </div>
            <!-- Minus button -->
            <button class="minusBtn btn btn-danger" style="position: absolute; top: 10px; left: 10px; z-index: 10;">-</button>
        </div>
    `;

    postsContainer.appendChild(postDiv);
    return postsContainer;
}

function showMyPosts() {
    const userId = firebase.auth().currentUser.uid; // Get the current user ID
    const myPosts = currentPosts.filter(post => post.userId === userId); // Filter posts
    const postsContainer = document.getElementById('postsContainer');

    postsContainer.innerHTML = ''; // Clear previous posts
    document.getElementById('backToAllPostsBtn').hidden = false; // Show back button
    document.getElementById('removePost').hidden = false; // Show remove post button
    document.getElementById('myPost').hidden = true; // Hide the "My Posts" button

    // Reset visibility of minus buttons
    const minusButtons = document.querySelectorAll('.minusBtn');
    minusButtons.forEach(btn => {
        btn.classList.remove('visible'); // Ensure they are hidden when entering this view
    });

    if (myPosts.length === 0) {
        postsContainer.innerHTML = '<p>No posts found.</p>'; // Show message if no posts
        document.getElementById('removePost').hidden = true; // Hide remove post button
        return; // Exit the function if no posts
    }

    // Display user posts
    myPosts.forEach(postData => {
        displayPost(postData); // Display each post
    
        // Get the minus button after appending the post
        const minusButton = postsContainer.lastChild.querySelector('.minusBtn'); 
    
        // Add event listener for the minus button
        minusButton.addEventListener('click', () => {
            const confirmed = confirm('Are you sure you want to delete this post?');
            if (confirmed) {
                deletePost(postData.id); // Call delete function
            }
        });
    });
}

// Event listener to toggle visibility of minus buttons
document.getElementById('removePost').addEventListener('click', () => {
    const minusButtons = document.querySelectorAll('.minusBtn');
    minusButtons.forEach(btn => {
        // Toggle a class instead of changing display directly
        btn.classList.toggle('visible'); 
    });
});

document.getElementById('backToAllPostsBtn').addEventListener('click', () => {
    backToAllPostsBtn.hidden = true;
    document.getElementById('removePost').hidden = true; // Hide remove post button
    document.getElementById('myPost').hidden = false; // Show "My Posts" button
    getPosts(); // Fetch and display all posts again
});

// Delete post function
function deletePost(postId) {
    // Filter out the post from currentPosts immediately
    currentPosts = currentPosts.filter(post => post.id !== postId);
    // Proceed to delete the post from Firestore
    db.collection('post').doc(postId).delete()
        .then(() => {
            console.log("Post successfully deleted!");
            showMyPosts(); // Refresh to reflect changes in "My Posts"
        })
        .catch((error) => {
            console.error("Error removing post: ", error);
            // Optionally handle the error, e.g., revert UI state
        });
}
// Existing code for My Posts button
document.getElementById('myPost').addEventListener('click', showMyPosts);

// Sort posts by likes or creation date
function sortPosts(criteria, order) {
    if (criteria === 'likes') {
        currentPosts.sort((a, b) => (order === 'asc' ? a.likes.length - b.likes.length : b.likes.length - a.likes.length));
    } else if (criteria === 'date') {
        currentPosts.sort((a, b) => (order === 'asc' ? a.createdAt.seconds - b.createdAt.seconds : b.createdAt.seconds - a.createdAt.seconds));
    }
    displaySortedPosts();
}

// Display sorted posts
function displaySortedPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Clear previous posts
    currentPosts.forEach(postData => {
        displayPost(postData); // Re-display posts in sorted order
    });
}

// Event listener for sort options
document.getElementById('sortOptions').addEventListener('change', (event) => {
    const [criteria, order] = event.target.value.split('-');
    sortPosts(criteria, order);
});

let currentPosts = []; // Global array to hold all posts

auth.onAuthStateChanged(user => {
    if (user) {
        showUserDetails(user);
        getPosts(); // Fetch and display posts if signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true; // Hide sign-in section
    } else {
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false; // Show main sign-in section
    }
});