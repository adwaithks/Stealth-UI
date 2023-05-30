// Create a new style element
const styleElement = document.createElement("style");
document.head.appendChild(styleElement);
// Get the stylesheet object
const styleSheet = styleElement.sheet;
// Create the CSS rule
const cssRule = "* { box-sizing: border-box; margin: 0; padding: 0; }";
// Add the CSS rule to the stylesheet
styleSheet.insertRule(cssRule, 0);

const chatHeader = document.createElement("div");
chatHeader.style.width = "100%";
chatHeader.style.height = "15%";
chatHeader.style.backgroundColor = "black";
chatHeader.style.color = "white";
chatHeader.style.borderRadius = "5px";
chatHeader.style.borderTopLeftRadius = "5px";
chatHeader.style.display = "flex";
chatHeader.style.flexDirection = "column";
chatHeader.style.justifyContent = "center";
chatHeader.style.padding = "0 15px 0 15px";

const chatSubHeader = document.createElement("p");
chatSubHeader.style.width = "100%";
chatSubHeader.style.height = "15%";
chatSubHeader.textContent =
	"Ask any questions related to the company or product";
chatSubHeader.style.fontSize = "13px";
chatSubHeader.style.fontFamily = "sans-serif";
chatSubHeader.style.color = "rgba(255,255,255,0.8)";
chatSubHeader.style.backgroundColor = "black";

const chatAgentName = document.createElement("p");
chatAgentName.textContent = "Customer Service Bot";
chatAgentName.style.fontFamily = "sans-serif";
chatAgentName.style.fontWeight = 800;
chatHeader.appendChild(chatAgentName);
chatHeader.appendChild(chatSubHeader);

// Inner circle (white)
const chatIconCustom = document.createElement("div");
const chatIconInnerCircle = document.createElement("div");
chatIconInnerCircle.style.borderRadius = "50%";
chatIconInnerCircle.style.border = "white solid 2px";
chatIconInnerCircle.style.height = "60px";
chatIconInnerCircle.style.width = "60px";
chatIconCustom.appendChild(chatIconInnerCircle);

// Chatbot icon black
chatIconCustom.id = "chat-icon";
chatIconCustom.style.height = "70px";
chatIconCustom.style.width = "70px";
chatIconCustom.style.borderRadius = "50%";
chatIconCustom.style.position = "absolute";
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
document.body.appendChild(chatIconCustom);

// Chat window
const chatWindow = document.createElement("div");
chatWindow.id = "chat-window";
chatWindow.style.marginLeft = "20px";
chatWindow.style.border = "solid 0.5px gray";
chatWindow.style.height = "450px";
chatWindow.style.boxShadow = "0 0 3px rgba(0,0,0,0.3)";
chatWindow.style.position = "absolute";
chatWindow.style.bottom = "95px";
chatWindow.style.right = "10px";
chatWindow.style.width = "345px";
chatWindow.style.borderRadius = "5px";
chatWindow.style.padding = "5px";
chatIconCustom.style.zIndex = 100;
chatWindow.style.visibility = "hidden";
document.body.appendChild(chatWindow);
chatWindow.appendChild(chatHeader);

// message display area
const messageContainer = document.createElement("div");
messageContainer.className = "message-container";
messageContainer.style.width = "100%";
messageContainer.style.height = "75%";
messageContainer.style.borderRadius = "5px";
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

// Send button
const sendButton = document.createElement("button");
sendButton.textContent = "Send";
sendButton.style.height = "100%";
sendButton.style.width = "70px";
sendButton.style.backgroundColor = "black";
sendButton.style.color = "white";
sendButton.style.borderRadius = "5px";
sendButton.style.border = "none";
sendButton.style.cursor = "pointer";
sendButton.style.fontSize = "13px";
sendButton.addEventListener("click", () => {
	const message = messageInput.value.trim();
	if (message.length === 0) return;
	displayMessage("user", message);
	messageInput.value = "";
});

// Send container - input + button
const sendContainer = document.createElement("div");
sendContainer.appendChild(messageInput);
sendContainer.appendChild(sendButton);
sendContainer.style.height = "10%";
sendContainer.style.border = "gray solid 0.5px";
sendContainer.style.display = "flex";
sendContainer.style.padding = "3px";
sendContainer.style.width = "100%";
sendContainer.style.borderRadius = "5px";
sendContainer.style.bottom = "0px";
chatWindow.appendChild(sendContainer);

// Toggle chat window visibility on icon click
chatIconCustom.addEventListener("click", function () {
	chatWindow.style.visibility =
		chatWindow.style.visibility === "hidden" ? "visible" : "hidden";
});

// Send message on pressing Enter key
messageInput.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		const message = messageInput.value.trim();
		if (message !== "" || message.length === 0) {
			displayMessage("user", message);
			// TODO: Process the user message here
			messageInput.value = "";

			// fetch("http://localhost:8000/api/v1/chatbot/message", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({
			// 		question: message,
			// 		chatbot_id: 1,
			// 	}),
			// })
			// 	.then((res) => res.json())
			// 	.then((data) => {
			// 		displayMessage("bot", data.message);
			// 	})
			// 	.catch((err) => {
			// 		displayMessage(
			// 			"bot",
			// 			"Something unexpected happened :( We are fixing it! Don't worry :) "
			// 		);
			// 	});
		}
	}
});

// Function to display a message in the chat window
function displayMessage(sender, message) {
	const messageElement = document.createElement("div");
	messageElement.style.width = "fit-content";
	messageElement.style.backgroundColor = "black";
	messageElement.style.padding = "8px";
	messageElement.style.color = "white";
	messageElement.style.marginTop = "10px";
	messageElement.style.maxWidth = "280px";
	messageElement.style.fontSize = "15px";
	if (sender === "bot") {
		messageElement.style.marginLeft = "auto"; // align right
		messageElement.style.borderTopLeftRadius = "5px";
		messageElement.style.borderBottomRightRadius = "5px";
		messageElement.style.borderBottomLeftRadius = "5px";
	} else {
		messageElement.style.borderTopRightRadius = "5px";
		messageElement.style.borderBottomRightRadius = "5px";
		messageElement.style.borderBottomLeftRadius = "5px";
	}

	messageElement.style.fontFamily = "sans-serif";

	messageElement.classList.add("message");
	const origin = document.createElement("p");
	const message_ = document.createElement("p");

	origin.textContent = `${sender}`;
	message_.textContent = `${message}`;

	origin.style.fontWeight = "bold";
	origin.style.marginBottom = "5px";

	messageElement.appendChild(origin);
	messageElement.appendChild(message_);

	messageContainer.appendChild(messageElement);
	messageContainer.scrollTop = messageContainer.scrollHeight;
}
