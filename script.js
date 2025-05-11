// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0x888888, size: 0.5 });
const starsCount = 10000;
const positions = [];

for (let i = 0; i < starsCount; i++) {
    positions.push(
        Math.random() * 2000 - 1000, // x
        Math.random() * 2000 - 1000, // y
        Math.random() * 2000 - 1000  // z
    );
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Camera Position
camera.position.z = 0;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    stars.rotation.x += 0.001;
    stars.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Adjust Canvas Size on Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Console Interaction
function processCommand() {
    const input = document.getElementById("userInput").value;
    const output = document.getElementById("output");

    // Create div for user command
    const userCommand = document.createElement("div");
    userCommand.className = "line user";
    userCommand.textContent = `> ${input}`;
    output.appendChild(userCommand);

    // Create div for AI response
    const response = document.createElement("div");
    response.className = "line ai";

    let reply;
    switch (input.toLowerCase()) {
        case "whoami":
            reply = "Hemanth is a Postgraduate studying Integrated MTech CSE at VITAP.";
            break;    
        case "hobbies":
            reply = "Coding Side Projects, Competitive Programming, Reading Research Papers, Web Development.";
            break;
        case "open resume":
            reply = "You can download the resume here: <a href='#' class='resume-link'>[Download Resume]</a>";
            break;
        case "contact":
            reply = `
                    Gmail: <a>keepudihemanth6329@gmail.com</a><br>
                    You can check my GitHub here: <a href="https://github.com/hemanthkeepudi" target="_blank">GitHub</a><br>
                    You can check my LinkedIn here: <a href="https://www.linkedin.com/in/hemanth-keepudi/" target="_blank">LinkedIn</a>
    `;
    break;

        default:
            reply = "Unknown command. Try 'whoami', 'hobbies', 'contact' or 'open resume'.";
    }

    response.innerHTML = `AI: ${reply}`;
    output.appendChild(response);
    document.getElementById("userInput").value = "";
}