// src/components/Toast.jsx (Using standard alert())

// No react or toast imports needed.

export const notifySuccess = (message) => {
    // Standard JavaScript alert ব্যবহার করা হয়েছে
    alert("SUCCESS: " + message);
};

export const notifyError = (message) => {
    // Standard JavaScript alert ব্যবহার করা হয়েছে
    alert("ERROR: " + message);
};