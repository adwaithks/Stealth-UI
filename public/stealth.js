// Create a new style element
const styleElement = document.createElement("style");
document.head.appendChild(styleElement);
// Get the stylesheet object
const styleSheet = styleElement.sheet;
// Create the CSS rule
const cssRule = "* { box-sizing: border-box; margin: 0; padding: 0; }";
// Add the CSS rule to the stylesheet
styleSheet.insertRule(cssRule, 0);

var scriptTag = document.getElementById("stealth-chatbot-widget");
var chatbotId = Number(scriptTag.getAttribute("data-id"));

let chatActive = true;
let sendButtonActive = true;
let sendInputActive = true;
let chatBotDisabled = true;
const cookieName = "STEALTH_CHATBOT";
const BASE_URL = "https://stealth-dashboard.onrender.com";
// const BASE_URL = "http://localhost:8000";
const ASSETS_URL = "https://grand-pastelito-e71d8f.netlify.app";
let messages = [];

function getDeviceType() {
	const userAgent = navigator.userAgent;
	if (/Mobi|Android/i.test(userAgent)) {
		return "Mobile";
	} else if (/iPad|Tablet|PlayBook|Windows NT|Macintosh/i.test(userAgent)) {
		return "Tablet";
	} else {
		return "Desktop";
	}
}

function generateRandomId() {
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var length = 8;
	var randomId = "";

	for (var i = 0; i < length; i++) {
		var randomIndex = Math.floor(Math.random() * characters.length);
		randomId += characters.charAt(randomIndex);
	}

	return randomId;
}

function getCookie(cookieName) {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i].trim();
		if (cookie.startsWith(cookieName + "=")) {
			return cookie.substring(cookieName.length + 1);
		}
	}
	return null;
}

let messageContainer = document.createElement("div");
let messageLoader = document.createElement("div");
let chatWindow = document.createElement("div");
let chatIconCustom = document.createElement("div");
let chatIcon = document.createElement("img");

function displayMessage(sender, message) {
	const messageElement = document.createElement("div");
	messageElement.style.width = "fit-content";
	messageElement.style.padding = "8px";
	messageElement.style.marginTop = "10px";
	messageElement.style.maxWidth = "280px";
	messageElement.style.fontSize = "15px";
	if (sender === "bot") {
		messageElement.style.backgroundColor = "rgba(0,0,0, 0.1)";
		messageElement.style.color = "black";
		messageElement.style.borderTopRightRadius = "5px";
		messageElement.style.boxShadow = "0 0 3px rgba(0,0,0,0.3)";
		messageElement.style.borderBottomRightRadius = "5px";
		messageElement.style.borderBottomLeftRadius = "5px";
	} else {
		messageElement.style.backgroundColor = "black";
		messageElement.style.boxShadow = "0 0 3px rgba(0,0,0,0.3)";
		messageElement.style.color = "white";
		messageElement.style.marginLeft = "auto"; // align right
		messageElement.style.borderTopLeftRadius = "5px";
		messageElement.style.borderBottomRightRadius = "5px";
		messageElement.style.borderBottomLeftRadius = "5px";
	}

	messageElement.style.fontFamily = "sans-serif";

	messageElement.classList.add("message");
	const origin = document.createElement("p");
	const message_ = document.createElement("p");

	origin.textContent = `${sender === "bot" ? "Lemuur AI" : "User"}`;
	message_.textContent = `${message}`;

	origin.style.fontWeight = "bold";
	origin.style.marginBottom = "5px";

	messageElement.appendChild(origin);
	messageElement.appendChild(message_);

	messageContainer.appendChild(messageElement);
	messageContainer.scrollTop = messageContainer.scrollHeight;
}

function app() {
	const chatHeader = document.createElement("div");
	chatHeader.style.width = "100%";
	chatHeader.style.height = "10%";
	chatHeader.style.backgroundColor = "black";
	chatHeader.style.color = "white";
	chatHeader.style.borderTopLeftRadius = "5px";
	chatHeader.style.borderTopRightRadius = "5px";
	chatHeader.style.display = "flex";
	chatHeader.style.flexDirection = "column";
	chatHeader.style.justifyContent = "center";
	chatHeader.style.padding = "10px";

	const chatHeaderText = document.createElement("p");
	chatHeaderText.textContent = "Customer Support";
	chatHeaderText.style.fontFamily = "sans-serif";
	chatHeaderText.style.fontWeight = 800;
	chatHeader.appendChild(chatHeaderText);

	// Inner circle (white)
	// const chatIconInnerCircle = document.createElement("div");
	// chatIconInnerCircle.style.borderRadius = "50%";
	// chatIconInnerCircle.style.border = "white solid 2px";
	// chatIconInnerCircle.style.height = "60px";
	// chatIconInnerCircle.style.width = "60px";
	// chatIconCustom.appendChild(chatIconInnerCircle);

	// Chatbot icon black
	chatIconCustom.id = "chat-icon";
	chatIconCustom.style.height = "60px";
	chatIconCustom.style.width = "60px";
	chatIconCustom.style.borderRadius = "50%";
	chatIconCustom.style.position = "fixed";
	chatIconCustom.style.display = "flex";
	chatIconCustom.style.alignItems = "center";
	chatIconCustom.style.justifyContent = "center";
	chatIconCustom.style.bottom = "20px";
	chatIconCustom.style.textContent = "chat";
	chatIconCustom.style.border = "white solid 1px";
	chatIconCustom.style.cursor = "pointer";
	chatIconCustom.style.right = "20px";
	chatIconCustom.style.zIndex = 100;
	chatIconCustom.style.backgroundColor = "black";

	chatIcon.src = ASSETS_URL + "/lemuurchat.png";
	chatIcon.style.height = "30px";
	chatIcon.style.width = "30px";
	chatIconCustom.appendChild(chatIcon);
	document.body.appendChild(chatIconCustom);

	// Chat window
	chatWindow.id = "chat-window";
	chatWindow.style.marginLeft = "20px";
	chatWindow.style.backgroundColor = "white";
	chatWindow.style.border = "solid 0.5px lightgray";
	chatWindow.style.height = "470px";
	chatWindow.style.boxShadow = "0 0 3px rgba(0,0,0,0.3)";
	chatWindow.style.position = "fixed";
	chatWindow.style.bottom = "95px";
	chatWindow.style.right = "10px";
	chatWindow.style.width = "345px";
	chatWindow.style.borderRadius = "5px";
	// chatWindow.style.padding = "5px";
	chatIconCustom.style.zIndex = 100;
	chatWindow.style.visibility = "hidden";
	document.body.appendChild(chatWindow);
	chatWindow.appendChild(chatHeader);

	// message display area
	messageContainer.className = "message-container";
	messageContainer.style.width = "100%";
	messageContainer.style.height = "75%";
	messageContainer.style.borderRadius = "5px";
	messageContainer.style.padding = "5px";
	messageContainer.style.backgroundColor = "white";
	messageContainer.style.marginBottom = "2px";
	messageContainer.style.overflowY = "auto";
	messageContainer.style.display = "flex";
	messageContainer.style.flexDirection = "column";
	chatWindow.appendChild(messageContainer);

	// message typing input
	const messageInput = document.createElement("input");
	messageInput.type = "text";
	messageInput.style.padding = "5px";
	messageInput.style.borderRadius = "5px";
	messageInput.style.outline = "none";
	messageInput.style.border = "none";
	messageInput.style.flex = 1;
	messageInput.style.fontSize = "14px";
	messageInput.placeholder = "Ask any question...";
	messageInput.disabled = !sendInputActive;

	messageLoader = document.createElement("div");
	messageLoader.className = "loader";
	messageLoader.style.backgroundColor = "rgba(0,0,0, 0.1)";
	messageLoader.style.width = "fit-content";
	messageLoader.style.padding = "10px";
	messageLoader.style.borderTopRightRadius = "5px";
	messageLoader.style.borderBottomRightRadius = "5px";
	messageLoader.style.marginTop = "10px";
	messageLoader.style.borderBottomLeftRadius = "5px";
	messageLoader.style.display = "flex"; // Hide the loader initially
	messageLoader.style.height = "10px";
	for (let i = 0; i < 3; i++) {
		const dot = document.createElement("div");
		const bounceAnimation = `
		@keyframes bounce-animation-${i} {
		  0% {
			transform: translateY(0);
		  }
		  100% {
			transform: translateY(-5px);
		  }
		}
		`;
		const style = document.createElement("style");
		style.appendChild(document.createTextNode(bounceAnimation));
		document.head.appendChild(style);

		dot.className = "dot";
		dot.style.width = "10px";
		dot.style.height = "10px";
		dot.style.marginRight = "3px";
		dot.style.backgroundColor = "gray";
		dot.style.borderRadius = "50%";
		dot.style.animationName = `bounce-animation-${i}`;
		dot.style.animationDuration = "0.3s";
		dot.style.animationIterationCount = "infinite";
		dot.style.animationDirection = "alternate";

		messageLoader.appendChild(dot);
	}

	// Send button
	const sendButton = document.createElement("button");
	sendButton.textContent = "Ask";
	sendButton.style.width = "70px";
	sendButton.style.backgroundColor = "black";
	sendButton.style.color = "white";
	sendButton.style.borderRadius = "5px";
	sendButton.style.border = "none";
	sendButton.style.cursor = "pointer";
	sendButton.style.fontSize = "13px";
	sendButton.disabled = !sendButtonActive;
	sendButton.addEventListener("click", () => {
		const message = messageInput.value.trim();
		if (message.length === 0) return;
		displayMessage("user", message);
		messageInput.value = "";
	});

	const sendContainerWrapper = document.createElement("div");
	sendContainerWrapper.style.height = "10%";
	sendContainerWrapper.style.padding = "5px";

	// Send container - input + button
	const sendContainer = document.createElement("div");
	sendContainer.appendChild(messageInput);
	sendContainer.appendChild(sendButton);
	sendContainer.style.border = "lightgray solid 0.5px";
	sendContainer.style.boxShadow = "0 0 3px rgba(0,0,0,0.1)";
	sendContainer.style.display = "flex";
	sendContainer.style.height = "100%";
	sendContainer.style.padding = "1px";
	sendContainer.style.width = "100%";
	sendContainer.style.borderRadius = "5px";
	sendContainerWrapper.appendChild(sendContainer);
	chatWindow.appendChild(sendContainerWrapper);

	const poweredByContainer = document.createElement("div");
	poweredByContainer.style.height = "5%";
	poweredByContainer.style.display = "flex";
	// poweredByContainer.style.marginBottom = "10px";
	// poweredByContainer.style.marginTop = "10px";
	poweredByContainer.style.padding = "2px";
	poweredByContainer.style.alignItems = "center";
	poweredByContainer.style.justifyContent = "center";
	const poweredByText = document.createElement("p");
	const poweredByCompanyName = document.createElement("span");
	poweredByCompanyName.style.fontWeight = 800;
	poweredByCompanyName.textContent = " Lemuur AI";
	poweredByText.textContent = "Powered By ";
	poweredByText.style.fontFamily = "sans-serif";
	poweredByText.style.fontSize = "12px";
	poweredByText.style.marginRight = "5px";
	poweredByContainer.appendChild(poweredByText);
	poweredByContainer.appendChild(poweredByCompanyName);
	chatWindow.appendChild(poweredByContainer);

	// Toggle chat window visibility on icon click
	chatIconCustom.addEventListener("click", function () {
		chatWindow.style.visibility =
			chatWindow.style.visibility === "hidden" ? "visible" : "hidden";
		chatIcon.src =
			chatWindow.style.visibility === "hidden"
				? ASSETS_URL + "/lemuurchat.png"
				: ASSETS_URL + "/close.png";
	});

	function scrollToBottom() {
		messageContainer.scrollTop = messageContainer.scrollHeight;
	}

	function sendMessage(event) {
		if (event.key === "Enter" || event.type === "click") {
			const message = messageInput.value.trim();
			if (message !== "" || message.length !== 0) {
				let context = "";
				if (messages.length > 1) {
					context = "";
					messages.slice(-2).forEach((m) => {
						context += `${m.origin}: ${m.message}`;
					});
				} else if (messages.length > 3) {
					context = "";
					messages.slice(-4).forEach((m) => {
						context += `${m.origin}: ${m.message}`;
					});
				}
				messages.push({
					origin: "user",
					message: message,
				});
				displayMessage("user", message);
				// TODO: Process the user message here
				messageInput.value = "";
				let cookieValue = getCookie(cookieName);
				if (!cookieValue) {
					cookieValue = generateRandomId();
					let expirationDate = new Date();
					expirationDate.setDate(expirationDate.getDate() + 2);

					// 2 day expiration
					let cookie =
						cookieName +
						"=" +
						cookieValue +
						"; expires=" +
						expirationDate.toUTCString() +
						"; path=/";
					document.cookie = cookie;
				}
				messageContainer.appendChild(messageLoader);
				scrollToBottom();
				fetch(BASE_URL + "/api/v1/chatbot/message", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						question: message,
						chatbot_id: chatbotId,
						user_session_id: getCookie(cookieName),
						channel: getDeviceType(),
						context: context,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						messageContainer.removeChild(messageLoader);
						messages.push({
							origin: "lemuurAI",
							message: data.message,
						});
						displayMessage("bot", data.message);
					})
					.catch((err) => {
						messageContainer.removeChild(messageLoader);
						displayMessage(
							"bot",
							"Something unexpected happened :( We are fixing it! Don't worry :) "
						);
					});
			}
		}
	}

	// Send message on pressing Enter key, or send button
	messageInput.addEventListener("keypress", sendMessage);
	sendButton.addEventListener("click", sendMessage);

	// Function to display a message in the chat window
}

document.addEventListener("DOMContentLoaded", () => {
	fetch(BASE_URL + `/api/v1/chatbot/${chatbotId}/widgetstatus`, {
		method: "GET",
	})
		.then((res) => res.json())
		.then((data) => {
			let domains = [];
			let status = "";
			let match = false;
			try {
				domains = data.message.domains;
				status = data.message.status;

				domains.forEach((domain) => {
					const host =
						window.location.protocol + "//" + window.location.host;
					if (domain.trim() == host.trim()) {
						match = true;
					}
				});
				if (!match) {
					return;
				}
			} catch {
				return;
			}

			if (domains.length > 0 && match && status == "active") {
				chatActive = true;
				sendButtonActive = true;
				sendInputActive = true;
				chatBotDisabled = false;
				let cookieValue = generateRandomId();

				if (!document.cookie.includes(cookieName)) {
					let expirationDate = new Date();
					expirationDate.setDate(expirationDate.getDate() + 2);

					// 2 day expiration
					let cookie =
						cookieName +
						"=" +
						cookieValue +
						"; expires=" +
						expirationDate.toUTCString() +
						"; path=/";
					document.cookie = cookie;
				}

				app();
				displayMessage(
					"bot",
					"I am your AI support agent.  I can help you with any questions or inquiries you might have."
				);
			}
		})
		.catch((err) => {
			// displayMessage(
			// 	"bot",
			// 	"Something unexpected happened :( We are fixing it! Don't worry :) "
			// );
		});
});
