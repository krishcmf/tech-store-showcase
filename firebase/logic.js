// firebase/logic.js

// 1. Import Realtime Database SDK using Browser URLs (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 2. YOUR SPECIFIC CONFIGURATION (I pasted your keys here)
const firebaseConfig = {
  apiKey: "AIzaSyCOfph1I3Cx0rOosZ0gArdT5yRC6HQm6gM",
  authDomain: "vibe-wishlist-db.firebaseapp.com",
  databaseURL: "https://vibe-wishlist-db-default-rtdb.firebaseio.com",
  projectId: "vibe-wishlist-db",
  storageBucket: "vibe-wishlist-db.firebasestorage.app",
  messagingSenderId: "687374705098",
  appId: "1:687374705098:web:6b0075d0205e5103da2f33",
  measurementId: "G-7ZPVDF8BSL"
};

// 3. Initialize App & Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("✅ Connected to Realtime Database at:", firebaseConfig.databaseURL);

// --- FUNCTION TO PLACE ORDER (Write Data) ---
// This function is called when you click "Buy Now" in the HTML
window.placeOrder = function(productName, price) {
    const userName = prompt("To confirm order, enter your name:");
    
    if(userName) {
        // Create a reference to the 'orders' list in the DB
        const ordersRef = ref(db, 'orders');
        
        // Push data to that list
        push(ordersRef, {
            customer: userName,
            item: productName,
            price: price,
            timestamp: new Date().toISOString()
        })
        .then(() => {
            alert(`✅ Order Confirmed! ${productName} will be shipped to ${userName}.`);
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("❌ Order Failed: " + error.message);
        });
    }
}

// --- FUNCTION TO ADD TO WISHLIST (Write Data) ---
window.addToWishlist = function(productName) {
    const userName = prompt("Enter your name to start a wishlist:");
    if(userName) {
        const wishlistRef = ref(db, 'wishlist');
        push(wishlistRef, {
            user: userName,
            item: productName,
            timestamp: new Date().toISOString()
        });
        alert(`❤️ Added ${productName} to ${userName}'s wishlist!`);
    }
}

// --- FUNCTION TO DISPLAY ORDERS (Read Data) ---
// This automatically updates the "Recent Live Orders" list
function loadOrders() {
    const listDiv = document.getElementById('orders-list');
    const ordersRef = ref(db, 'orders');

    // Listen for changes in real-time
    onValue(ordersRef, (snapshot) => {
        listDiv.innerHTML = ""; // Clear current list
        const data = snapshot.val();

        if (data) {
            // Convert object to array and reverse to show newest first
            const ordersArray = Object.values(data).reverse().slice(0, 5); 

            ordersArray.forEach((order) => {
                const itemHTML = `
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100 mb-2">
                        <div>
                            <span class="font-bold text-gray-800">${order.customer}</span> bought 
                            <span class="text-indigo-600 font-medium">${order.item}</span>
                        </div>
                        <span class="text-sm text-gray-500">$${order.price}</span>
                    </div>
                `;
                listDiv.innerHTML += itemHTML;
            });
        } else {
            listDiv.innerHTML = "<p class='text-gray-400 italic'>No orders yet...</p>";
        }
    });
}

// Start the listener immediately
loadOrders();