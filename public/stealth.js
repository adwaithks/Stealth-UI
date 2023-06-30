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
var userId = scriptTag.getAttribute("data-user");
var chatbotHashId = scriptTag.getAttribute("data-bot");
var chatbotName = "";
let chatIconName = "lemuurchat.png";

const cookieName = "ASSISTDESK_CHATBOT";
// const BASE_URL = "https://api.assistdesk.in";
// const ASSETS_URL = "https://www.assistdesk.in";
const BASE_URL = "http://localhost:8000";
const ASSETS_URL = "http://localhost:5173";
let messages = [];
let isTabletOrBelow = window.innerWidth <= 820 ? true : false;
let quickReplies = [];
let ticketRaise = -1;
let primaryBgColor = "#000000";

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
let quickRepliesContainer = document.createElement("div");
let sendContainerWrapper = document.createElement("div");
let poweredByContainer = document.createElement("div");

function hideBottom(sendContainer, quickReplies, poweredBy) {
	sendContainerWrapper.style.display = sendContainer;
	quickRepliesContainer.style.display = quickReplies;
	poweredByContainer.style.display = poweredBy;
}

function displayMessage(sender, message) {
	const messageElement = document.createElement("div");
	messageElement.style.width = "fit-content";
	messageElement.style.padding = "8px";
	messageElement.style.whiteSpace = "pre-line";
	messageElement.style.marginTop = "10px";
	messageElement.style.maxWidth = isTabletOrBelow ? "90%" : "280px";
	messageElement.style.fontSize = isTabletOrBelow ? "18px" : "15px";
	if (sender === "bot") {
		messageElement.style.backgroundColor = "rgba(0,0,0, 0.03)";
		messageElement.style.color = "black";
		messageElement.style.borderTopRightRadius = "5px";
		messageElement.style.boxShadow = "0 0 2px rgba(0,0,0,0.3)";
		messageElement.style.borderBottomRightRadius = "5px";
		messageElement.style.borderBottomLeftRadius = "5px";
	} else {
		messageElement.style.backgroundColor = primaryBgColor;
		messageElement.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
		messageElement.style.color = "white";
		messageElement.style.marginLeft = "auto"; // align right
		messageElement.style.borderTopLeftRadius = "5px";
		messageElement.style.borderBottomRightRadius = "5px";
		messageElement.style.borderBottomLeftRadius = "5px";
	}

	messageElement.classList.add("message");
	const origin = document.createElement("p");
	const message_ = document.createElement("p");
	message_.style.whiteSpace = "pre-line";
	origin.textContent = `${sender === "bot" ? "AI Assistant" : "User"}`;
	message_.textContent = `${message.trim()}`;

	origin.style.fontWeight = "bold";
	origin.style.marginBottom = "5px";

	messageElement.appendChild(origin);
	messageElement.appendChild(message_);

	messageContainer.appendChild(messageElement);
	messageContainer.scrollTop = messageContainer.scrollHeight;
}

function ticketRaiseUI() {
	// Create the main container
	const ticketRaiseContainer = document.createElement("form");

	ticketRaiseContainer.style.width = "100%";
	ticketRaiseContainer.style.height = "100%";
	ticketRaiseContainer.style.borderRadius = "5px";
	ticketRaiseContainer.style.padding = "10px";
	ticketRaiseContainer.style.marginBottom = "2px";
	ticketRaiseContainer.style.overflowY = "auto";
	ticketRaiseContainer.style.display = "flex";
	ticketRaiseContainer.style.flexDirection = "column";

	// Create the email input
	const emailInputLabel = document.createElement("label");
	emailInputLabel.textContent = "Your Email Id";
	emailInputLabel.style = `
		font-weight: bold;
		font-size: 13px;
	`;
	ticketRaiseContainer.appendChild(emailInputLabel);
	const emailInput = document.createElement("input");
	emailInput.setAttribute("type", "email");
	emailInput.setAttribute("required", true);
	emailInput.setAttribute("placeholder", "Email");
	emailInput.style = `
		padding: 8px 5px;
		font-size: 16px;
		border-radius: 5px;
		border: lightgray solid 2px;
		margin-bottom: 10px;
	`;
	ticketRaiseContainer.appendChild(emailInput);

	// Create the question textarea
	const questionTextareaLabel = document.createElement("label");
	questionTextareaLabel.textContent = "Your enquiry";
	questionTextareaLabel.style = `
		font-weight: bold;
		font-size: 13px;
	`;
	ticketRaiseContainer.appendChild(questionTextareaLabel);
	const questionTextarea = document.createElement("textarea");
	questionTextarea.setAttribute("placeholder", "Your question / enquiry");
	questionTextarea.setAttribute("required", true);
	questionTextarea.style = `
		padding: 8px 5px;
		font-size: 16px;
		border-radius: 5px;
		border: lightgray solid 2px;
		width: 100%;
		height: 150px;
		margin-bottom: 10px;
	`;
	questionTextarea.setAttribute("required", true);
	ticketRaiseContainer.appendChild(questionTextarea);

	// Create the submit button
	const submitButton = document.createElement("button");
	submitButton.innerHTML = "Submit";
	submitButton.style = `
		padding: 8px 20px;
		cursor: pointer;
		background-color: ${primaryBgColor};
		color: white;
		width: 100%;
		border-radius: 5px;
		border: ${primaryBgColor} 2px black;
		outline: none;
		margin-bottom: 5px;
	`;
	submitButton.style.cursor = "pointer";
	submitButton.addEventListener("click", (e) => {
		e.preventDefault();
		if (emailInput.value.length > 0 && questionTextarea.value.length > 0) {
			cancelButton.style.display = "none";
			submitButton.textContent = "Creating ticket for you..";
			const email = emailInput.value;
			const enquiry = questionTextarea.value;

			const body = {
				name: chatbotName,
				chatbot_id: chatbotId,
				chatbot_hash: chatbotHashId,
				email,
				enquiry,
			};

			fetch(BASE_URL + "/api/v1/ticket/new", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((res) => {
					if (!res.ok) throw "Please try again :(";
					submitButton.textContent =
						"Thank you! We've received your message!";
					setTimeout(() => {
						ticketRaiseContainer.remove();
						messageContainer.style.display = "flex";
						hideBottom("block", "flex", "flex");
					}, 1500);
				})
				.catch(() => {
					submitButton.textContent = "Please try again :(";
					setTimeout(() => {
						submitButton.innerHTML = "Submit";
						emailInput.value = "";
						questionTextarea.value = "";
						cancelButton.style.display = "block";
					}, 1000);
				});
		}
	});
	ticketRaiseContainer.appendChild(submitButton);

	var cancelButton = document.createElement("button");
	cancelButton.innerHTML = "Cancel";
	cancelButton.style = `
		padding: 8px 20px;
		cursor: pointer;
		color: black;
		width: 100%;
		border-radius: 5px;
		border: solid 2px ${primaryBgColor};
		outline: none;
	`;
	cancelButton.style.cursor = "pointer";
	// Add event listener for mouseover (hover)
	cancelButton.addEventListener("mouseover", function () {
		// Apply hover styles
		cancelButton.style.backgroundColor = "rgba(0,0,0,0.05)";
	});

	// Add event listener for mouseout (hover off)
	cancelButton.addEventListener("mouseout", function () {
		// Remove hover styles
		cancelButton.style.backgroundColor = "white";
	});
	cancelButton.addEventListener("click", () => {
		ticketRaiseContainer.remove();
		hideBottom("block", "flex", "flex");
		messageContainer.style.display = "flex";
	});
	ticketRaiseContainer.appendChild(cancelButton);

	// Append the container to the document body
	return ticketRaiseContainer;
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
	chatHeader.style.backgroundColor = primaryBgColor;
	chatHeader.style.color = "white";
	if (!isTabletOrBelow) {
		chatHeader.style.borderTopLeftRadius = "5px";
		chatHeader.style.borderTopRightRadius = "5px";
	}
	chatHeader.style.display = "flex";
	chatHeader.style.alignItems = "center";
	chatHeader.style.justifyContent = "space-between";
	chatHeader.style.padding = "10px 20px 10px 20px";

	const chatHeaderTextBtnWrapper = document.createElement("div");
	chatHeaderTextBtnWrapper.style = `
		display: flex;
		align-items: center;
	`;
	const chatHeaderText = document.createElement("p");
	chatHeaderText.textContent = name;
	chatHeaderText.style.textTransform = "capitalize";
	chatHeaderText.style.marginRight = "10px";
	chatHeaderText.style.fontFamily = "sans-serif";
	chatHeaderText.style.fontSize = isTabletOrBelow ? "20px" : "18px";
	chatHeaderText.style.fontWeight = 800;
	chatHeaderTextBtnWrapper.appendChild(chatHeaderText);

	// Find the open button by its ID
	const ticketRaisingOpenBtn = document.createElement("button");
	ticketRaisingOpenBtn.textContent = "Raise Ticket";
	ticketRaisingOpenBtn.style = `
		font-weight: bold;
		background-color: ${primaryBgColor};
		border: white solid 1px;
		border-radius: 5px;
		padding: 0px 10px;
	`;

	// Add event listener for mouseover (hover)
	ticketRaisingOpenBtn.addEventListener("mouseover", function () {
		// Apply hover styles
		ticketRaisingOpenBtn.style.backgroundColor = "white";
		ticketRaisingOpenBtn.style.color = "black";
	});

	// Add event listener for mouseout (hover off)
	ticketRaisingOpenBtn.addEventListener("mouseout", function () {
		// remove hover styles
		ticketRaisingOpenBtn.style.backgroundColor = primaryBgColor;
		ticketRaisingOpenBtn.style.color = "white";
	});
	// Attach a click event listener to the open button
	ticketRaisingOpenBtn.addEventListener("click", function () {
		if (messageContainer.style.display === "flex") {
			messageContainer.style.display = "none";
			const parent = chatHeader.parentNode;
			const newEl = ticketRaiseUI(); // Open the ticket container
			parent.insertBefore(newEl, chatHeader.nextSibling);
			hideBottom("none", "none", "none");
		} else {
			return;
		}
	});

	chatHeaderTextBtnWrapper.appendChild(ticketRaisingOpenBtn);
	chatHeader.appendChild(chatHeaderTextBtnWrapper);

	const chatHeaderClose = document.createElement("div");
	chatHeaderClose.style = `
		display: flex;
		align-items: center;
		justify-content: center;
	`;
	chatHeaderClose.addEventListener("click", () => {
		chatWindow.style.display = "none";
		chatIcon.src = ASSETS_URL + "/" + chatIconName;
		chatIcon.style.height = "33px";
		chatIcon.style.width = "36px";
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
	chatIconCustom.style.height = isTabletOrBelow ? "53px" : "58px";
	chatIconCustom.style.width = isTabletOrBelow ? "53px" : "58px";
	chatIconCustom.style.borderRadius = "50%";
	chatIconCustom.style.position = "fixed";
	chatIconCustom.style.display = "flex";
	chatIconCustom.style.boxShadow = "0 0 5px lightgray";
	chatIconCustom.style.alignItems = "center";
	chatIconCustom.style.justifyContent = "center";
	chatIconCustom.style.bottom = "20px";
	chatIconCustom.style.textContent = "chat";
	chatIconCustom.style.border = "white solid 1px";
	chatIconCustom.style.cursor = "pointer";
	if (position === "bottomright") chatIconCustom.style.right = "20px";
	else chatIconCustom.style.left = "20px";
	chatIconCustom.style.zIndex = 90;
	chatIconCustom.style.backgroundColor = primaryBgColor;
	chatIconCustom.style.border = "white solid 2px";

	chatIcon.src = ASSETS_URL + "/" + chatIconName;
	chatIcon.style.height = "33px";
	chatIcon.style.width = "36px";
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
	chatWindow.style.display = "none";
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
	messageContainer.style.marginBottom = "2px";
	messageContainer.style.overflowY = "auto";
	messageContainer.style.display = "flex";
	messageContainer.style.flexDirection = "column";
	chatWindow.appendChild(messageContainer);

	// quickreplies
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
			border: ${primaryBgColor} solid 2px;
			color: ${primaryBgColor};
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

	// message typing input
	messageInput.type = "text";
	messageInput.style.padding = "5px";
	messageInput.style.borderTopLeftRadius = "5px";
	messageInput.style.borderBottomLeftRadius = "5px";
	messageInput.style.outline = "none";
	messageInput.style.border = "white solid 2px";
	messageInput.style.flex = 1;
	messageInput.style.fontSize = isTabletOrBelow ? "17px" : "14px";
	messageInput.placeholder = "Ask any question...";

	// Attach an event listener for the 'focus' event
	messageInput.addEventListener("focus", function () {
		// Apply a border color when the input is focused
		messageInput.style.border = `${primaryBgColor} solid 2px`;
	});

	// Attach an event listener for the 'blur' event
	messageInput.addEventListener("blur", function () {
		// Remove the border color when the input loses focus
		messageInput.style.border = "white solid 2px";
	});

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
	sendButton.style.backgroundColor = primaryBgColor;
	sendButton.style.color = "white";
	sendButton.style.borderTopRightRadius = "5px";
	sendButton.style.borderBottomRightRadius = "5px";
	sendButton.style.border = "none";
	sendButton.style.cursor = "pointer";
	sendButton.style.fontSize = "13px";
	sendButton.addEventListener("click", (e) => {
		const message = messageInput.value.trim();
		if (message.length === 0) return;
		sendMessage(e);
	});

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

	poweredByContainer.style.height = "5%";
	poweredByContainer.style.display = "flex";
	// poweredByContainer.style.border = "brown solid 1px";
	poweredByContainer.style.padding = "2px";
	poweredByContainer.style.alignItems = "center";
	// poweredByContainer.style.color = primaryBgColor;
	poweredByContainer.style.justifyContent = "center";
	const poweredByText = document.createElement("p");
	const poweredByCompanyName = document.createElement("a");
	poweredByCompanyName.style.fontWeight = 800;
	poweredByCompanyName.style.color = primaryBgColor;
	poweredByCompanyName.textContent = "Assist Desk";
	poweredByCompanyName.href = "https://www.assistdesk.in";
	poweredByCompanyName.target = "_blank";
	poweredByCompanyName.style.textDecoration = "underline";
	poweredByText.textContent = "Powered By ";
	poweredByText.style.fontFamily = "sans-serif";
	poweredByText.style.fontSize = "12px";
	poweredByText.style.marginRight = "5px";
	poweredByContainer.appendChild(poweredByText);
	poweredByContainer.appendChild(poweredByCompanyName);
	chatWindow.appendChild(poweredByContainer);

	// Toggle chat window visibility on icon click
	chatIconCustom.addEventListener("click", function () {
		chatWindow.style.display =
			chatWindow.style.display === "none" ? "block" : "none";
		chatIcon.src =
			chatWindow.style.display === "none"
				? ASSETS_URL + "/" + chatIconName
				: ASSETS_URL + "/close.png";
		if (chatWindow.style.display !== "none") {
			// close icon
			chatIcon.style.height = "20px";
			chatIcon.style.width = "20px";
		} else {
			// chatt icon
			chatIcon.style.height = "33px";
			chatIcon.style.width = "36px";
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
				} else if (messages.length > 5 && ticketRaise >= 1) {
					context = "";
					messages.slice(-6).forEach((m) => {
						context += `${m.origin}: ${m.message}`;
					});
				}
				messages.push({
					origin: "user",
					message: message,
				});
				displayMessage("user", message);
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
						user_id: userId,
						user_session_id: getCookie(cookieName),
						channel: getDeviceType(),
						context: context,
						ticket_raise: ticketRaise,
						name: chatbotName,
						chatbot_hash: chatbotHashId,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						let message = data.message.reply;
						messageContainer.removeChild(messageLoader);

						if (data.message.ticket_raise > 0) {
							ticketRaise = data.message.ticket_raise;
						} else {
							ticketRaise = -1;
						}

						if (message.includes("<TICKET_RAISE>")) {
							ticketRaise = 0;
							message = message.replaceAll("<TICKET_RAISE>", "");
						}

						// ticket raise complete
						if (data.message.ticket_raise >= 1) {
							ticketRaise = -1;
						}
						messages.push({
							origin: "AI Assistant",
							message,
						});

						displayMessage("bot", message);
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
			user_id: userId,
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
				chatbotName = data.message.name;
				quickReplies = data.message.quickreplies;
				primaryBgColor = data.message.primaryBgColor;

				if (quickReplies[0].keyword == null) {
					quickReplies = [
						{
							keyword: "Pricing",
							question:
								"List the pricing of the products in a list format.",
						},
						{
							keyword: "Products",
							question:
								"List the products and services offerings of the company in a list format.",
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
					console.log(
						"ASSIST DESK BOT FAILED TO LOAD BECAUSE OF WRONG WHITE LIST DOMAIN!"
					);
					return;
				}
			} catch {
				console.log("ASSIST DESK BOT FAILED TO LOAD");
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
					"I am your AI support agent. I can help you with any questions or inquiries you might have."
				);
			}
		})
		.catch((err) => {
			console.log("ASSIST DESK BOT FAILED TO LOAD, RELOAD", err);
		});
});
