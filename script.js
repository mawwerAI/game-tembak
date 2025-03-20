const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let player = { x: 175, y: 550, width: 50, height: 50 };
let bullets = [];
let enemies = [];
let score = 0;

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && player.x > 0) player.x -= 20;
    if (event.key === "ArrowRight" && player.x < 350) player.x += 20;
    if (event.key === " ") shoot();
});

function shoot() {
    bullets.push({ x: player.x + 20, y: player.y });
}

function spawnEnemy() {
    enemies.push({ x: Math.random() * 350, y: 0, width: 40, height: 40 });
}

setInterval(spawnEnemy, 2000);

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    bullets.forEach((bullet, index) => {
        bullet.y -= 5;
        ctx.fillStyle = "red";
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
        if (bullet.y < 0) bullets.splice(index, 1);
    });

    enemies.forEach((enemy