(function() {
    const automodUI = document.createElement('div');
    automodUI.style.position = 'fixed';
    automodUI.style.top = '20%';
    automodUI.style.left = '50%';
    automodUI.style.transform = 'translateX(-50%)';
    automodUI.style.width = '320px';
    automodUI.style.height = '140px';
    automodUI.style.backgroundColor = '#2c2f33';
    automodUI.style.color = 'white';
    automodUI.style.borderRadius = '12px';
    automodUI.style.padding = '15px';
    automodUI.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    automodUI.style.zIndex = '10000';
    automodUI.style.cursor = 'move';
    automodUI.style.display = 'block';
    document.body.appendChild(automodUI);

    const header = document.createElement('h2');
    header.innerText = 'Automod Bypasser';
    header.style.margin = '0';
    header.style.fontSize = '20px';
    header.style.paddingBottom = '10px';
    header.style.borderBottom = '2px solid #ccc';
    header.style.textAlign = 'center';
    automodUI.appendChild(header);

    const closeButton = document.createElement('button');
    closeButton.innerText = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.backgroundColor = '#e74c3c';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '16px';
    closeButton.style.width = '25px';
    closeButton.style.height = '25px';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    automodUI.appendChild(closeButton);

    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Input the text to bypass';
    inputBox.style.width = '95%';
    inputBox.style.padding = '8px';
    inputBox.style.marginTop = '20px';
    inputBox.style.border = '1px solid #ccc';
    inputBox.style.borderRadius = '5px';
    inputBox.style.backgroundColor = '#36393f';
    inputBox.style.color = 'white';
    inputBox.style.fontSize = '14px';
    automodUI.appendChild(inputBox);

    const actionButton = document.createElement('button');
    actionButton.innerText = 'Run Command';
    actionButton.style.marginTop = '10px';
    actionButton.style.width = '100%';
    actionButton.style.padding = '10px';
    actionButton.style.backgroundColor = '#7289da';
    actionButton.style.border = 'none';
    actionButton.style.borderRadius = '5px';
    actionButton.style.color = 'white';
    actionButton.style.cursor = 'pointer';
    automodUI.appendChild(actionButton);

    let isDragging = false;
    let offsetX, offsetY;

    automodUI.addEventListener('mousedown', (event) => {
        if (event.target === inputBox || event.target === actionButton) return;
        isDragging = true;
        offsetX = event.clientX - automodUI.offsetLeft;
        offsetY = event.clientY - automodUI.offsetTop;
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const x = event.clientX - offsetX;
            const y = event.clientY - offsetY;
            automodUI.style.left = `${x}px`;
            automodUI.style.top = `${y}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    closeButton.addEventListener('click', () => {
        uiVisible = false;
        automodUI.style.display = 'none';
    });

    let uiVisible = true;
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Shift' && event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
            uiVisible = !uiVisible;
            if (uiVisible) {
                automodUI.style.display = 'block';
            } else {
                automodUI.style.display = 'none';
            }
        }
    });

    // Setting Defaults
    let token = (
        webpackChunkdiscord_app.push(
            [
                [''],
                {},
                e => {
                    m = [];
                    for (let c in e.c)
                        m.push(e.c[c])
                }
            ]
        ),
        m
    ).find(
        m => m?.exports?.default?.getToken !== void 0
    ).exports.default.getToken();

    let channel_id = "";
    // Setting Defaults

    function sendMessage(channelid, message) {
        let channel_url = `https://discord.com/api/v9/channels/${channelid}/messages`;

        let request = new XMLHttpRequest();
        request.withCredentials = true;

        request.open("POST", channel_url);

        request.setRequestHeader("Authorization", token);
        request.setRequestHeader("Content-Type", "application/json");

        request.send(JSON.stringify({ content: message }));

        request.onload = function () {
            if (request.status === 200) {
                console.log("Message sent successfully:", request.responseText);
            } else {
                console.log("Failed to send message. Status code:", request.status, request.responseText);
            }
        };

        request.onerror = function () {
            console.log("Network error or invalid request");
        };
    }

    actionButton.addEventListener('click', () => {
        const command = inputBox.value.trim();
        if (command) {
            if (window.location.pathname.startsWith('/channels/@me/')) {
                channel_id = window.location.pathname.split('/')[3];
            } else if (window.location.pathname.startsWith('/channels/')) {
                channel_id = window.location.pathname.split('/')[3];
            } else {
                console.log('Unable to find channel ID');
            }

            sendMessage(channel_id, command)
        } else {
            alert('Please input text to bypass..');
        }
    });
})();
