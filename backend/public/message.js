const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage(); 

// Fetch the current user
auth.onAuthStateChanged(user => {
    if (user) {
        // Get the current user's ID
        const userId = user.uid;
        
        // Get the current user's document from Firestore
        db.collection('user').doc(userId).get()
            .then(doc => {
                if (doc.exists) {
                    // Access the 'friends_ID' array from the current user's document
                    const friendsID = doc.data().friends_ID;

                    // Fetch friends' usernames based on their IDs
                    if (Array.isArray(friendsID) && friendsID.length > 0) {
                        const friendsList = document.getElementById('friends-list');
                        if (friendsList) {
                            friendsList.innerHTML = ''; // Clear any previous content

                            const friendPromises = friendsID.map(friendId => {
                                return db.collection('user').doc(friendId).get()
                                    .then(friendDoc => {
                                        if (friendDoc.exists) {
                                            // Get friend's username
                                            const friendUsername = friendDoc.data().UserName;
                                            
                                            // Create a clickable element for the friend's username
                                            const friendItem = document.createElement('div');
                                            const friendLink = document.createElement('a');
                                            friendLink.href = 'javascript:void(0);';
                                            friendLink.textContent = friendUsername;
                                            
                                            // Add event listener for when a friend is clicked
                                            friendLink.addEventListener('click', () => {
                                                // Fetch and display chat history from both sides
                                                fetchChatHistory(userId, friendDoc.data().UserID);
                                                showChatBox(friendDoc.data().UserID, friendUsername);  // Show the chat box when clicked
                                            });
                                            
                                            // Append the link to the friend item
                                            friendItem.appendChild(friendLink);
                                            
                                            // Append the friend item to the friends list
                                            friendsList.appendChild(friendItem);
                                        }
                                    })
                                    .catch(error => console.error("Error fetching friend data: ", error));
                            });

                            // Wait for all friend data to be fetched and then log success
                            Promise.all(friendPromises)
                                .then(() => {
                                    console.log("All friends have been loaded.");
                                })
                                .catch(error => {
                                    console.error("Error loading friends: ", error);
                                });
                        }
                    } else {
                        const friendsList = document.getElementById('friends-list');
                        if (friendsList) {
                            friendsList.innerHTML = '<p>You have no friends yet.</p>';
                        }
                    }
                }
            })
            .catch(error => console.error("Error fetching user data: ", error));
    } else {
        console.log('No user is signed in.');
    }
});

// Show the chat box when a friend is clicked
async function showChatBox(friendId, friendUsername) {
    const chatBox = document.getElementById('chat-box');
    if (chatBox.hidden == true) {
        chatBox.hidden = false;
    }
    const chatHeader = document.getElementById('chat-header');
    const chatMessages = document.getElementById('chat-messages');

    // Set the data-friendId to the chat header
    chatHeader.dataset.friendId = friendId;
    
    if (chatBox && chatHeader && chatMessages) {
        try {
            // Update the chat header with the friend's name
            chatHeader.textContent = `Chat with ${friendUsername}`;

            // Show the chat box
            chatBox.style.visibility = 'visible'; // Show the chat box

            // Clear previous messages
            chatMessages.innerHTML = '';

            // Set up real-time listener for new messages in the chat
            listenForNewMessages(friendId);  // Start listening for new messages when the chat box is shown

            // Fetch previous chat history
            fetchChatHistory(friendId);
        } catch (error) {
            console.error("Error fetching friend's username:", error);
        }
    } else {
        console.error("Chat box elements not found in the DOM.");
    }
}

// Handle sending the message
document.getElementById('send-btn').addEventListener('click', () => {
    const messageInput = document.getElementById('message-input');
    const imageInput = document.getElementById('image-input');  // New input for images
    const messageContent = messageInput.value.trim();
    const imageFile = imageInput.files[0];  // Get the selected image file
    
    if (messageContent || imageFile) {
        const userId = firebase.auth().currentUser.uid;  // Get current user ID
        const friendId = document.getElementById('chat-header').dataset.friendId; // Get the friend's ID from the chat header
        
        submitMessage(userId, friendId, messageContent, imageFile);  // Send message with or without image
        messageInput.value = '';  // Clear input field
        imageInput.value = '';  // Clear image input
    }
});

function submitMessage(userId, friendId, messageContent, imageFile) {
    if (!messageContent.trim() && !imageFile) {
        alert("Message cannot be empty and no image selected!");
        return;
    }

    // Prepare the message data (with or without image)
    const messageData = {
        content: messageContent,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),  // Ensure the timestamp is added
        image: ''  // Image URL will be added after upload
    };

    // If an image is selected, upload it to Firebase Storage
    if (imageFile) {
        const storageRef = storage.ref(`friend_images/${userId}/${friendId}/${imageFile.name}`);
        const uploadTask = storageRef.put(imageFile);

        uploadTask.on('state_changed', (snapshot) => {
            // You can track the progress of the upload here if needed
        }, (error) => {
            console.error("Error uploading image: ", error);
            alert("Failed to upload image. Please try again.");
        }, () => {
            // Upload completed successfully, get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                // Set the image URL in the message data
                messageData.image = downloadURL;
                // Save the message to Firestore
                saveMessageToFirestore(userId, friendId, messageData);
            }).catch(error => {
                console.error("Error getting download URL: ", error);
                alert("Failed to get image URL.");
            });
        });
    } else {
        // If no image, just save the message to Firestore
        saveMessageToFirestore(userId, friendId, messageData);
    }
}

// Function to save the message to Firestore
function saveMessageToFirestore(userId, friendId, messageData) {
    // Save the message in the friend's collection under the current user's document
    db.collection('user').doc(userId)
        .collection(friendId)
        .add(messageData)
        .then(() => {
            console.log(`Message sent to ${friendId}'s collection!`);
            // Refresh the chat history to display the newly added message
            fetchChatHistory(friendId);
        })
        .catch(error => {
            console.error("Error sending message: ", error);
        });
}

function fetchChatHistory(friendId) {
    const chatContainer = document.getElementById('chat-messages');
    const userId = firebase.auth().currentUser.uid;

    // Fetch messages from both collections: user -> friend and friend -> user
    const userMessagesRef = db.collection('user').doc(userId).collection(friendId);
    const friendMessagesRef = db.collection('user').doc(friendId).collection(userId);

    // Fetch the usernames for both user and friend to display with messages
    const userPromise = db.collection('user').doc(userId).get();
    const friendPromise = db.collection('user').doc(friendId).get();

    // Get both user's messages and combine them
    Promise.all([
        userMessagesRef.orderBy('createdAt').get(),
        friendMessagesRef.orderBy('createdAt').get(),
        userPromise,
        friendPromise
    ]).then(([userMessagesSnapshot, friendMessagesSnapshot, userDoc, friendDoc]) => {
        const allMessages = [];

        // Get the current user's username
        const userUsername = userDoc.exists ? userDoc.data().UserName : 'Unknown User';

        // Get the friend's username
        const friendUsername = friendDoc.exists ? friendDoc.data().UserName : 'Unknown Friend';

        // Add user messages to the array
        userMessagesSnapshot.forEach(doc => {
            const messageData = doc.data();
            const messageCreatedAt = messageData.createdAt ? messageData.createdAt.toDate() : new Date();  // Default to current time if createdAt is missing
            allMessages.push({
                ...messageData,
                sender: 'me',  // Tag messages from the current user
                senderUsername: userUsername,  // Add sender's username
                createdAt: messageCreatedAt // Add timestamp
            });
        });

        // Add friend's messages to the array
        friendMessagesSnapshot.forEach(doc => {
            const messageData = doc.data();
            const messageCreatedAt = messageData.createdAt ? messageData.createdAt.toDate() : new Date();  // Default to current time if createdAt is missing
            allMessages.push({
                ...messageData,
                sender: 'friend',  // Tag messages from the friend
                senderUsername: friendUsername,  // Add sender's username
                createdAt: messageCreatedAt // Add timestamp
            });
        });

        // Sort messages by 'createdAt' (timestamp) in ascending order
        allMessages.sort((a, b) => {
            const aTimestamp = a.createdAt ? a.createdAt.getTime() : 0;
            const bTimestamp = b.createdAt ? b.createdAt.getTime() : 0;
            return aTimestamp - bTimestamp;
        });

        // Clear the chat container and display messages
        chatContainer.innerHTML = '';  // Clear any existing messages

        // Display each message in the chat box
        allMessages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            if (message.sender === 'me') {
                messageDiv.classList.add('me');  // Style messages from the current user
            } else {
                messageDiv.classList.add('friend');  // Style messages from the friend
            }

            // Add the sender's username above the message
            const usernameDiv = document.createElement('div');
            usernameDiv.classList.add('username');
            usernameDiv.textContent = message.senderUsername;

            // Format the createdAt timestamp to Month/Date/Year Time format
            const messageDate = message.createdAt;  // Message already has a Date object
            const formattedDate = `${messageDate.getMonth() + 1}/${messageDate.getDate()}/${messageDate.getFullYear()} ${messageDate.getHours()}:${messageDate.getMinutes()}`;

            // Add the timestamp next to the username
            const timestampDiv = document.createElement('span');
            timestampDiv.classList.add('timestamp');
            timestampDiv.textContent = ` (${formattedDate})`;

            // Append the timestamp next to the username
            usernameDiv.appendChild(timestampDiv);
            messageDiv.appendChild(usernameDiv);

            // Add the message content
            const messageContent = document.createElement('p');
            messageContent.textContent = message.content;
            messageDiv.appendChild(messageContent);

            // If the message contains an image, display it
            if (message.image) {
                const imageElement = document.createElement('img');
                imageElement.src = message.image;
                messageDiv.appendChild(imageElement);
            }

            // Append the message to the chat container
            chatContainer.appendChild(messageDiv);
        });

        // Scroll to the bottom of the chat container to show the latest message
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }).catch(error => {
        console.error("Error fetching chat history: ", error);
    });
}

// Add real-time listener for new messages
function listenForNewMessages(friendId) {
    const userId = firebase.auth().currentUser.uid;
    const userMessagesRef = db.collection('user').doc(userId).collection(friendId);
    const friendMessagesRef = db.collection('user').doc(friendId).collection(userId);

    // Listen for new messages from the current user
    userMessagesRef.orderBy('createdAt').onSnapshot(snapshot => {
        if (!snapshot.empty) {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    // New message from the user
                    fetchChatHistory(friendId);  // Refresh chat UI with the new message
                }
            });
        }
    });

    // Listen for new messages from the friend's collection
    friendMessagesRef.orderBy('createdAt').onSnapshot(snapshot => {
        if (!snapshot.empty) {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    // New message from the friend
                    fetchChatHistory(friendId);  // Refresh chat UI with the new message
                }
            });
        }
    });
}