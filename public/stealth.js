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
var chatbotHashId = scriptTag.getAttribute("data-bot");

const cookieName = "STEALTH_CHATBOT";
// const BASE_URL = "https://api.assistdesk.in";
// const ASSETS_URL = "https://www.assistdesk.in";
const BASE_URL = "http://localhost:8000";
const ASSETS_URL = "http://localhost:5173";
let messages = [];
let isTabletOrBelow = window.innerWidth <= 820 ? true : false;
let quickReplies = [];

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

function getMessageContainerHeight(isTabletOrBelow, quickReplies) {
	if (isTabletOrBelow && quickReplies.length > 0) {
		return "68%";
	}

	if (!isTabletOrBelow && quickReplies.length > 0) {
		return "68%";
	}
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
let sendButton = document.createElement("button");
let messageInput = document.createElement("input");

function displayMessage(sender, message) {
	const messageElement = document.createElement("div");
	messageElement.style.width = "fit-content";
	messageElement.style.padding = "8px";
	messageElement.style.marginTop = "10px";
	messageElement.style.maxWidth = isTabletOrBelow ? "90%" : "280px";
	messageElement.style.fontSize = isTabletOrBelow ? "18px" : "15px";
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

	messageElement.classList.add("message");
	const origin = document.createElement("p");
	const message_ = document.createElement("p");

	origin.textContent = `${sender === "bot" ? "AI Assistant" : "User"}`;
	message_.textContent = `${message}`;

	origin.style.fontWeight = "bold";
	origin.style.marginBottom = "5px";

	messageElement.appendChild(origin);
	messageElement.appendChild(message_);

	messageContainer.appendChild(messageElement);
	messageContainer.scrollTop = messageContainer.scrollHeight;
}

function app({
	position = "bottomright",
	name = "Customer Support",
	quickReplies = [
		{
			keyword: "Pricing",
			question: "What is the pricing of this product ?",
		},
		{
			keyword: "Products",
			question: "What are the products and services ?",
		},
	],
}) {
	const chatHeader = document.createElement("div");
	chatHeader.style.width = "100%";
	chatHeader.style.height = "10%";
	// chatHeader.style.border = "green solid 1px";
	chatHeader.style.backgroundColor = "black";
	chatHeader.style.color = "white";
	if (!isTabletOrBelow) {
		chatHeader.style.borderTopLeftRadius = "5px";
		chatHeader.style.borderTopRightRadius = "5px";
	}
	chatHeader.style.display = "flex";
	chatHeader.style.alignItems = "center";
	chatHeader.style.justifyContent = "space-between";
	chatHeader.style.padding = "10px 20px 10px 20px";

	const chatHeaderText = document.createElement("p");
	chatHeaderText.textContent = name;
	chatHeaderText.style.fontFamily = "sans-serif";
	chatHeaderText.style.fontSize = isTabletOrBelow ? "20px" : "18px";
	chatHeaderText.style.fontWeight = 800;
	chatHeader.appendChild(chatHeaderText);

	const chatHeaderClose = document.createElement("div");
	chatHeaderClose.style = `
		display: flex;
		align-items: center;
		justify-content: center;
	`;
	chatHeaderClose.addEventListener("click", () => {
		chatWindow.style.visibility = "hidden";
		chatIcon.src = ASSETS_URL + "/lemuurchat.png";
		chatIcon.style.height = "30px";
		chatIcon.style.width = "35px";
	});
	const chatHeaderCloseIcon = document.createElement("img");
	chatHeaderCloseIcon.src = ASSETS_URL + "/close.png";
	chatHeaderCloseIcon.style = `
		height: 15px;
		cursor: pointer;
	`;
	chatHeaderClose.appendChild(chatHeaderCloseIcon);
	chatHeader.appendChild(chatHeaderClose);

	// Chatbot icon black
	chatIconCustom.id = "chat-icon";
	chatIconCustom.style.height = isTabletOrBelow ? "65px" : "60px";
	chatIconCustom.style.width = isTabletOrBelow ? "65px" : "60px";
	chatIconCustom.style.borderRadius = "50%";
	chatIconCustom.style.position = "fixed";
	chatIconCustom.style.display = "flex";
	chatIconCustom.style.alignItems = "center";
	chatIconCustom.style.justifyContent = "center";
	chatIconCustom.style.bottom = "20px";
	chatIconCustom.style.textContent = "chat";
	chatIconCustom.style.border = "white solid 1px";
	chatIconCustom.style.cursor = "pointer";
	if (position === "bottomright") chatIconCustom.style.right = "20px";
	else chatIconCustom.style.left = "20px";
	chatIconCustom.style.zIndex = 90;
	chatIconCustom.style.backgroundColor = "black";

	chatIcon.src = ASSETS_URL + "/lemuurchat.png";
	chatIcon.style.height = "30px";
	chatIcon.style.width = "35px";
	chatIconCustom.appendChild(chatIcon);
	document.body.appendChild(chatIconCustom);

	// Chat window
	chatWindow.id = "chat-window";
	chatWindow.style.backgroundColor = "white";

	if (isTabletOrBelow) {
		chatWindow.style.height = "100vh";
		chatWindow.style.width = "100%";
		chatWindow.style.position = "fixed";
		chatWindow.style.top = "0";
		chatWindow.style.left = "0";
		chatWindow.style.borderRadius = "0px";
		chatWindow.style.border = "solid 1px";
	} else {
		chatWindow.style.border = "solid 0.5px lightgray";
		chatWindow.style.boxShadow = "0 0 3px rgba(0,0,0,0.3)";
		chatWindow.style.marginLeft = "20px";
		chatWindow.style.height = "500px";
		chatWindow.style.position = "fixed";
		chatWindow.style.bottom = "95px";
		if (position === "bottomright") chatWindow.style.right = "10px";
		else chatWindow.style.left = "10px";
		chatWindow.style.borderRadius = "5px";
		chatWindow.style.width = "390px";
	}
	chatWindow.style.zIndex = 200;
	chatWindow.style.visibility = "hidden";
	document.body.appendChild(chatWindow);
	chatWindow.appendChild(chatHeader);

	// message display area
	messageContainer.className = "message-container";
	// messageContainer.style.border = "brown solid 1px";
	messageContainer.style.width = "100%";
	messageContainer.style.height = getMessageContainerHeight(
		isTabletOrBelow,
		quickReplies
	);
	messageContainer.style.borderRadius = "5px";
	messageContainer.style.padding = "5px";
	messageContainer.style.backgroundColor = "white";
	messageContainer.style.marginBottom = "2px";
	messageContainer.style.overflowY = "auto";
	messageContainer.style.display = "flex";
	messageContainer.style.flexDirection = "column";
	chatWindow.appendChild(messageContainer);

	if (quickReplies.length > 0) {
		// quickreplies
		const quickRepliesContainer = document.createElement("div");
		quickRepliesContainer.style = `
		display: flex;
		gap: 5px;
		height: 5%;
		align-items: center;
		padding: 0 5px 0 5px;
		flex-wrap: wrap;
	`;

		quickReplies.forEach((qr) => {
			const quickReply = document.createElement("div");
			const text = document.createElement("p");
			text.textContent = qr.keyword; // qr.keyword
			text.style.fontSize = isTabletOrBelow ? "15px" : "13px";
			quickReply.appendChild(text);
			quickReply.style = `
			cursor: pointer;
			border: black solid 2px;
			height: fit-content;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 10px 0 10px;
			border-radius: 20px;
		`;

			// Add event listener for mouseover (hover)
			quickReply.addEventListener("mouseover", function () {
				// Apply hover styles
				quickReply.style.opacity = 0.5;
			});

			// Add event listener for mouseout (hover off)
			quickReply.addEventListener("mouseout", function () {
				// Remove hover styles
				quickReply.style.opacity = 1;
			});

			quickReply.addEventListener("click", (e) => {
				sendMessage(e, qr.question);
			});
			quickRepliesContainer.appendChild(quickReply);
		});

		chatWindow.appendChild(quickRepliesContainer);
	}

	// message typing input
	messageInput.type = "text";
	messageInput.style.padding = "5px";
	messageInput.style.borderRadius = "5px";
	messageInput.style.outline = "none";
	messageInput.style.border = "none";
	messageInput.style.flex = 1;
	messageInput.style.fontSize = isTabletOrBelow ? "17px" : "14px";
	messageInput.placeholder = "Ask any question...";

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
	sendButton.textContent = "Ask";
	sendButton.style.width = "70px";
	sendButton.style.backgroundColor = "black";
	sendButton.style.color = "white";
	sendButton.style.borderRadius = "5px";
	sendButton.style.border = "none";
	sendButton.style.cursor = "pointer";
	sendButton.style.fontSize = "13px";
	sendButton.addEventListener("click", (e) => {
		const message = messageInput.value.trim();
		if (message.length === 0) return;
		sendMessage(e);
	});

	const sendContainerWrapper = document.createElement("div");
	// sendContainerWrapper.style.border = "yellow solid 1px";
	sendContainerWrapper.style.height = isTabletOrBelow ? "7%" : "10%";
	sendContainerWrapper.style.padding = "5px";
	sendContainerWrapper.style.marginTop = isTabletOrBelow ? "10px" : "0px";

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
	poweredByContainer.style.height = "3%";
	poweredByContainer.style.display = "flex";
	// poweredByContainer.style.border = "brown solid 1px";
	poweredByContainer.style.padding = "2px";
	poweredByContainer.style.alignItems = "center";
	poweredByContainer.style.justifyContent = "center";
	const poweredByText = document.createElement("p");
	const poweredByCompanyName = document.createElement("span");
	poweredByCompanyName.style.fontWeight = 800;
	poweredByCompanyName.textContent = "Assist Desk";
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
		if (chatWindow.style.visibility !== "hidden") {
			// close icon
			chatIcon.style.height = "20px";
			chatIcon.style.width = "20px";
		} else {
			// chatt icon
			chatIcon.style.height = "30px";
			chatIcon.style.width = "35px";
		}
	});

	function scrollToBottom() {
		messageContainer.scrollTop = messageContainer.scrollHeight;
	}

	function sendMessage(event, mes = "") {
		if (event.key === "Enter" || event.type === "click") {
			const message = mes.length === 0 ? messageInput.value.trim() : mes;
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
				sendButton.disabled = true;
				messageInput.disabled = true;
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
							origin: "AI Assistant",
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
					})
					.finally(() => {
						sendButton.disabled = false;
						messageInput.disabled = false;
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
	fetch(BASE_URL + `/api/v1/chatbot/widgetstatus`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			chatbot_hash: chatbotHashId,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			let domains = [];
			let status = "";
			let match = false;
			let position = "bottomright";
			let name = "Customer Support";

			try {
				domains = data.message.domains;
				status = data.message.status;
				position = data.message.position;
				name = data.message.name;
				quickReplies = data.message.quickreplies;
				if (quickReplies[0].keyword == null) {
					quickReplies = [
						{
							keyword: "Pricing",
							question: "What is the pricing of this product ?",
						},
						{
							keyword: "Products",
							question: "What are the products and services ?",
						},
					];
				}

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

				app({
					position,
					name,
					quickReplies,
				});
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
