// friends.js

const db = firebase.firestore();

// Function to add a friend
function addFriend(friendEmail) {
    const user = firebase.auth().currentUser;
    if (user) {
        // Check if the friend exists in the database
        db.collection('user').where("email", "==", friendEmail).get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        const friendId = doc.id; // Get the friend's ID
                        // Update the user's document with the new friend's details
                        db.collection('user').doc(user.uid).update({
                            friends_ID: firebase.firestore.FieldValue.arrayUnion([friendId, friendEmail])
                        })
                        .then(() => {
                            console.log("Friend added:", friendEmail);
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
                    const friends = doc.data().friends || [];
                    displayFriends(friends);
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

// Function to display friends
function displayFriends(friends) {
    const friendsList = document.getElementById('friendsList');
    friendsList.innerHTML = ''; // Clear previous friends
    friends.forEach(friend => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `ID: ${friend[0]}, Email: ${friend[1]}`; // Display ID and email
        friendsList.appendChild(listItem);
    });
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

// Auth state change listener
auth.onAuthStateChanged(user => {
    if (user) {
        getFriends(); // Get friends if signed in
    }
});

document.getElementById('friends').onclick = () => {
    document.getElementById('whenSignedIn').hidden = true; // Hide signed-in section
    document.getElementById('friendsSection').hidden = false; // Show friends section
    getFriends(); // Fetch friends when entering this section
};