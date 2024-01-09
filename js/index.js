let ws = new WebSocket('wss://our-socket-server.onrender.com:443');
let selectValue = null;

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
        sendAccelerationData(acceleration);
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
    selectValue = 0;
});