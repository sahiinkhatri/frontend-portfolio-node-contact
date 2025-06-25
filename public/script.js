const words = ["Frontend Developer", "Student", "Web Developer",];
let wordIndex = 0;
let letterIndex = 0;
const typingSpeed = 100; // Speed of typing
const eraseSpeed = 50;   // Speed of erasing
const delayBetweenWords = 2000; // Delay between words

const spanElement = document.querySelector(".typing-text span");

function typeWord() {
    if (letterIndex < words[wordIndex].length) {
        spanElement.textContent += words[wordIndex][letterIndex++];
        setTimeout(typeWord, typingSpeed);
    } else {
        setTimeout(eraseWord, delayBetweenWords);
    }
}

function eraseWord() {
    if (letterIndex > 0) {
        spanElement.textContent = words[wordIndex].substring(0, --letterIndex);
        setTimeout(eraseWord, eraseSpeed);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeWord, typingSpeed);
    }
}

// Start the typing effect after the page loads
document.addEventListener("DOMContentLoaded", () => setTimeout(typeWord, typingSpeed));
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

// Add click event listener to toggle the navbar
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active'); // Toggles the 'active' class
});
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form reload

    const data = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        subject: this.subject.value,
        message: this.message.value
    };

    fetch("/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((res) => {
        alert("✅ Message sent successfully!");
        this.reset(); // Clear the form
    })
    .catch((err) => {
        console.error(err);
        alert("❌ Failed to send message.");
    });
});
