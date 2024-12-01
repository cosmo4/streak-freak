// TypeScript function to handle form submission
function handleLoginForm(event: Event): void {
    // Prevent the default form submission behavior (page reload)
    event.preventDefault();

    // Get the username and password values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    // Basic validation
    if (!username || !password) {
        alert("Please fill in both username and password.");
        return;
    }

    // For now, log the username and password (In a real-world app, send them to a server)
    console.log("Username:", username);
    console.log("Password:", password);

    // Optionally, you could clear the form after submission
    (document.getElementById('loginForm') as HTMLFormElement).reset();
}

// Add an event listener to the form when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm') as HTMLFormElement;
    form.addEventListener('submit', handleLoginForm);
});
