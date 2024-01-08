const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let circleX = canvas.width / 2;
let circleY = canvas.height / 2;
let circleRadius = 20;
let ws = new WebSocket('wss://our-socket-server.onrender.com:443');
let selectValue = null;

function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function updateCircleSize(acceleration) {
    const accelerationMagnitude = Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2);
    if (accelerationMagnitude > 5) {
        circleRadius += 5;
    }
}

function sendAccelerationData(acceleration) {
    const dataToSend = {
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z,
        select: selectValue
    };
    ws.send(JSON.stringify(dataToSend));
}

function setupDeviceMotion() {
    window.addEventListener('devicemotion', (event) => {
        const acceleration = {
            x: event.acceleration.x,
            y: event.acceleration.y,
            z: event.acceleration.z
        };
        updateCircleSize(acceleration);
        sendAccelerationData(acceleration);
        drawCircle();
    });
}

function requestPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    setupDeviceMotion();
                    selectValue = 1;
                } else {
                    alert('加速度センサーへのアクセスが許可されていません。');
                }
            })
            .catch(console.error);
    } else {
        setupDeviceMotion();
        selectValue = 1;
    }
}

document.getElementById('permissionButton').addEventListener('click', function () {
    requestPermission();
});

document.getElementById('resetButton').addEventListener('click', function () {
    circleRadius = 20;
    drawCircle();
    selectValue = 0;
});

drawCircle();