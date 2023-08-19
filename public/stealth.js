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

function getMessageContainerHeight(isTabletOrBelow, quickReplies) {
	if (isTabletOrBelow && quickReplies.length === 0)
		return "calc(100vh - 200px)";
	if (isTabletOrBelow && quickReplies.length > 0) {
		return "calc(100vh - 220px)";
	}
	if (!isTabletOrBelow && quickReplies.length === 0) return "360px";
	if (!isTabletOrBelow && quickReplies.length > 0) {
		return "340px";
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
let assistDeskShadowDOM = document.createElement("div");
let emailContainer = document.createElement("div");
document.body.appendChild(assistDeskShadowDOM);
const shadow = assistDeskShadowDOM.attachShadow({ mode: "open" });

chatWindow.onanimationend = (e) => {
	if (e.animationName === "fade-out-to-bottom")
		chatWindow.style.display = "none";
};

// Create a new style element within the Shadow DOM
const styleElement = document.createElement("style");
shadow.appendChild(styleElement);

// Get the stylesheet object from the Shadow DOM style element
const styleSheet = styleElement.sheet;

// Create the CSS rule
const cssRule =
	"* { box-sizing: border-box; margin: 0; padding: 0; font-family: inherit; }";

// Add the CSS rule to the stylesheet in the Shadow DOM
styleSheet.insertRule(cssRule, 0);

const fadeInFromBottomAnimation = `
	@keyframes fade-in-from-bottom {
	  0% {
		opacity: 0;
		transform: translateY(10px);
	  }
	  100% {
		opacity: 1;
		transform: translateY(0);
	  }
	}
  `;

const pulsateAnimation = `
@keyframes pulsate {
	0% {
	  transform: scale(1);
	  opacity: 0.6;
	}
	50% {
	  transform: scale(1.2);
	  opacity: 1;
	}
	100% {
	  transform: scale(1);
	  opacity: 0.6;
	}`;

const fadeOutToBottomAnimation = `
  @keyframes fade-out-to-bottom {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
	  visibility: hidden;
      transform: translateY(10px);
    }
  }
`;

const pulsateRingAnimation = `
@keyframes pulsate-ring {
	0% {
	  transform: scale(1);
	  opacity: 1;
	}
	50% {
	  transform: scale(1.5);
	  opacity: 0;
	}
	100% {
	  transform: scale(1);
	  opacity: 1;
	}
}`;

const style = document.createElement("style");
style.appendChild(document.createTextNode(fadeInFromBottomAnimation));
style.appendChild(document.createTextNode(fadeOutToBottomAnimation));
style.appendChild(document.createTextNode(pulsateAnimation));
style.appendChild(document.createTextNode(pulsateRingAnimation));

shadow.appendChild(style);

function hideBottom(sendContainer, quickReplies, poweredBy) {
	sendContainerWrapper.style.display = sendContainer;
	quickRepliesContainer.style.display = quickReplies;
	poweredByContainer.style.display = poweredBy;
}

const insertContent = (content) => {
	messageContainer.appendChild(content);
};

function displayMessage(sender, message) {
	const messageElement = document.createElement("div");
	messageElement.style.width = "fit-content";
	messageElement.style.padding = "8px";
	messageElement.style.whiteSpace = "pre-line";
	messageElement.style.marginTop = "10px";
	messageElement.style.maxWidth = isTabletOrBelow ? "90%" : "300px";
	messageElement.style.fontSize = isTabletOrBelow ? "18px" : "15px";
	if (sender === "bot") {
		messageElement.style.backgroundColor = "rgba(0,0,0, 0.05)";
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

	// Regex to match the links
	const linkRegex = /\[(.*?)\]\((.*?)\)/g;

	const replacedText = message.replace(linkRegex, (_, text, link) => {
		return `<a style="text-decoration: underline; font-weight: bold;" href="${link}" target="_blank">${text}</a>`;
	});

	messageElement.classList.add("message");
	const origin = document.createElement("p");
	const message_ = document.createElement("p");
	message_.innerHTML = `<p style="white-space: pre-line;">${replacedText.trim()}</p>`;
	const email = window.localStorage.getItem("AD_EMAIL");
	let user = "User";
	if (email) {
		user = email.split("@")[0];
		user = user.slice(0, 1).toUpperCase() + user.slice(1);
	}
	origin.textContent = `${sender === "bot" ? "AI Assistant" : user}`;
	// message_.textContent = `${message.trim()}`;

	origin.style.fontWeight = "bold";
	origin.style.marginBottom = "5px";

	messageElement.appendChild(origin);
	messageElement.append(message_);

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
		padding: 10px 5px;
		font-size: 16px;
		border-radius: 5px;
		border: rgba(0,0,0,0.05) solid 2px;
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
		padding: 10px 5px;
		font-size: 16px;
		border-radius: 5px;
		border: rgba(0,0,0,0.05) solid 2px;
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
	padding: 11px 20px;
	cursor: pointer;
		background-color: ${primaryBgColor};
		color: white;
		width: 100%;
		border-radius: 5px;
		border: solid 2px ${primaryBgColor};
		outline: none;
		font-size: 15px;
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
				user_id: userId,
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
		padding: 11px 20px;
		cursor: pointer;
		color: black;
		font-size: 15px;
        background-color: white;
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
	quickReplies = [],
}) {
	const chatHeader = document.createElement("div");
	chatHeader.style.width = "100%";
	// chatHeader.style.boxShadow = "0 1px 10px black";
	chatHeader.style.height = isTabletOrBelow ? "70px" : "50px"; // 500 - 50 = 450
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
		color: white;
		font-size: ${isTabletOrBelow ? "18px" : "15px"};
		border: white solid 2px;
		border-radius: 5px;
		cursor: pointer;
		padding: 3px 10px;
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
		chatWindow.style.animationName = `fade-out-to-bottom`;
		chatWindow.style.animationDuration = "0.2s";
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

	// chaticon welcome

	const emailContainerCloseIconContainer = document.createElement("div");
	const emailContainerCloseIcon = document.createElement("img");
	emailContainerCloseIcon.src = ASSETS_URL + "/close.png";
	emailContainerCloseIcon.style.height = "10px";
	emailContainerCloseIcon.style.width = "10px";
	emailContainerCloseIcon.style.cursor = "pointer";
	emailContainerCloseIcon.addEventListener("click", () => {
		emailContainer.style.animationName = `fade-out-to-bottom`;
		emailContainer.style.animationDuration = "0.2s";
	});
	emailContainerCloseIconContainer.append(emailContainerCloseIcon);
	emailContainerCloseIcon.style.float = "right";

	emailContainer.addEventListener("animationend", (e) => {
		e.stopPropagation();
		if (e.animationName === "fade-out-to-bottom") {
			emailContainer.style.display = "none";
		}
	});
	emailContainer.append(emailContainerCloseIconContainer);
	emailContainer.style.boxShadow = "0 0 3px rgba(0,0,0,0.5)";
	emailContainer.style.backgroundColor = `${primaryBgColor}`;
	emailContainer.style.color = "white";
	emailContainer.style.fontWeight = "bold";
	emailContainer.style.width = "100%";
	emailContainer.style.marginTop = "10px";
	emailContainer.style.padding = "10px";
	emailContainer.style.borderRadius = "5px";
	emailContainer.style.animationName = `fade-in-from-bottom`;
	emailContainer.style.animationDuration = "0.5s";
	const emailContainerText = document.createElement("p");
	emailContainerText.textContent =
		"May I know your email id ? Incase you get disconnected, our team can reach out to you via email 🙂";
	emailContainer.append(emailContainerText);

	const emailContainerContentHTML = `
    <form class="ad-form-container" style="margin-top: 15px;">
        <input type="email" class="ad-email-input" placeholder="your@gmail.com" style="width: 100%; border-radius: 5px; outline: none; border: none; padding: 12px; font-size: 15px;" />
        <button class="ad-email-button" type="submit" style="width: 100%; padding: 8px; font-size: 15px; border-radius: 5px; margin-top: 5px; border: none; outline: none; cursor: pointer; background-color: white; font-weight: bold;">Confirm Email 🤝</button>
    </form>
    `;
	const emailContainerContent = document.createElement("div");
	emailContainerContent.innerHTML = emailContainerContentHTML;
	emailContainer.append(emailContainerContent);
	const emailForm = emailContainerContent.querySelector(".ad-form-container");
	const emailInput = emailContainerContent.querySelector(".ad-email-input");
	const emailBtn = emailContainerContent.querySelector(".ad-email-button");

	emailForm.addEventListener("submit", (e) => {
		e.stopPropagation();
		e.preventDefault();
		const email = emailInput.value;
		if (!email.includes(".") || !email.includes("@")) return;
		emailBtn.textContent = "Thank you! 🙂";
		window.localStorage.setItem("AD_EMAIL", email);
		setTimeout(() => {
			emailContainer.style.animationName = `fade-out-to-bottom`;
			emailContainer.style.animationDuration = "0.2s";
		}, 1000);
	});

	// chaticon welcome

	const welcomeContainerCloseIconContainer = document.createElement("div");
	const closeIcon = document.createElement("img");
	closeIcon.src = ASSETS_URL + "/close.png";
	closeIcon.style.height = "10px";
	closeIcon.style.width = "10px";
	closeIcon.style.cursor = "pointer";
	closeIcon.addEventListener("click", () => {
		welcomeContainer.style.animationName = `fade-out-to-bottom`;
		welcomeContainer.style.animationDuration = "0.2s";
	});
	welcomeContainerCloseIconContainer.append(closeIcon);
	closeIcon.style.float = "right";

	const welcomeContainer = document.createElement("div");
	welcomeContainer.addEventListener("animationend", (e) => {
		if (e.animationName === "fade-out-to-bottom") {
			welcomeContainer.style.display = "none";
		}
	});
	welcomeContainer.append(welcomeContainerCloseIconContainer);
	welcomeContainer.style.boxShadow = "0 0 3px rgba(0,0,0,0.5)";
	welcomeContainer.style.backgroundColor = `${primaryBgColor}`;
	welcomeContainer.style.color = "white";
	welcomeContainer.style.fontWeight = "bold";
	welcomeContainer.style.width = "220px";
	welcomeContainer.style.borderRadius = "10px";
	if (position === "bottomright") {
		welcomeContainer.style.right = "40px";
		welcomeContainer.style.borderBottomRightRadius = "0";
	} else {
		welcomeContainer.style.left = "40px";
		welcomeContainer.style.borderBottomLeftRadius = "0";
	}
	welcomeContainer.style.bottom = "85px";

	welcomeContainer.style.padding = "8px";
	welcomeContainer.style.zIndex = 9999999;
	welcomeContainer.style.position = "fixed";
	welcomeContainer.style.animationName = `fade-in-from-bottom`;
	welcomeContainer.style.animationDuration = "0.5s";
	const welcomeText = document.createElement("p");
	welcomeText.textContent = "Hey There! 👋 Im here to help you!";
	welcomeContainer.append(welcomeText);
	shadow.appendChild(welcomeContainer);

	// Chatbot icon black

	chatIconCustom.id = "chat-icon";
	chatIconCustom.style.height = isTabletOrBelow ? "63px" : "58px";
	chatIconCustom.style.width = isTabletOrBelow ? "63px" : "58px";
	chatIconCustom.style.borderRadius = "50%";

	chatIconCustom.style.display = "flex";
	// chatIconCustom.style.boxShadow = "0 0 5px lightgray";
	chatIconCustom.style.alignItems = "center";
	chatIconCustom.style.justifyContent = "center";
	chatIconCustom.style.textContent = "chat";
	chatIconCustom.style.border = "white solid 1px";
	chatIconCustom.style.cursor = "pointer";

	chatIconCustom.style.backgroundColor = primaryBgColor;
	chatIconCustom.style.border = "white solid 2px";
	if (position === "bottomright") chatIconCustom.style.right = "20px";
	else chatIconCustom.style.left = "20px";
	chatIconCustom.style.bottom = "20px";
	chatIconCustom.style.zIndex = 9999999;
	chatIconCustom.style.position = "fixed";

	chatIconCustom.style.animationName = `fade-in-from-bottom`;
	chatIconCustom.style.animationDuration = "0.2s";
	// chatIconCustom.style.animationIterationCount = "infinite";
	// chatIconCustom.style.animationDirection = "alternate";
	chatIcon.src = ASSETS_URL + "/" + chatIconName;
	chatIcon.style.height = "33px";
	chatIcon.style.width = "36px";
	chatIconCustom.appendChild(chatIcon);
	shadow.appendChild(chatIconCustom);

	// Chat window
	chatWindow.id = "chat-window";
	chatWindow.style.backgroundColor = "white";

	if (isTabletOrBelow) {
		chatWindow.style.height = "100%";
		chatWindow.style.width = "100%";
		chatWindow.style.position = "fixed";
		chatWindow.style.top = "0";
		chatWindow.style.left = "0";
		chatWindow.style.borderRadius = "0px";
	} else {
		chatWindow.style.border = "solid 0.5px lightgray";
		chatWindow.style.boxShadow = "0 0 5px lightgray";
		chatWindow.style.marginLeft = "20px";
		chatWindow.style.height = "500px";
		chatWindow.style.position = "fixed";
		chatWindow.style.bottom = "85px";
		if (position === "bottomright") chatWindow.style.right = "10px";
		else chatWindow.style.left = "10px";
		chatWindow.style.borderRadius = "5px";
		chatWindow.style.width = "390px";
	}
	chatWindow.style.zIndex = 99999999;
	chatWindow.style.display = "none";
	shadow.appendChild(chatWindow);
	chatWindow.appendChild(chatHeader);

	// message display area
	messageContainer.className = "message-container";
	// messageContainer.style.border = "brown solid 1px";
	messageContainer.style.width = "100%";
	messageContainer.style.height = getMessageContainerHeight(
		isTabletOrBelow,
		quickReplies
	);
	messageContainer.style.padding = "0 10px 0 10px";
	messageContainer.style.borderRadius = "5px";
	messageContainer.style.overflowY = "auto";
	messageContainer.style.display = "flex";
	messageContainer.style.flexDirection = "column";
	chatWindow.appendChild(messageContainer);

	// quickreplies
	quickRepliesContainer.style = `
		display: flex;
		gap: 5px;
		margin: ${isTabletOrBelow ? "7px" : "5px"}; 
		height: ${quickReplies.length > 0} ? 30px : 0;
		width: 100%;
		overflow-x: auto;						
		align-items: center;
	`;

	quickReplies.forEach((qr) => {
		const quickReply = document.createElement("div");
		const text = document.createElement("p");
		text.textContent = qr.keyword; // qr.keyword
		text.style.marginRight = "5px";
		text.style.marginLeft = "5px";
		text.style.fontSize = isTabletOrBelow ? "15px" : "13px";
		quickReply.appendChild(text);
		quickReply.style = `
			cursor: pointer;
			white-space: nowrap;
			border: ${primaryBgColor} solid 2px;
			color: ${primaryBgColor};
			display: flex;
			align-items: center;
			justify-content: center;
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
	messageInput.style.fontSize = isTabletOrBelow ? "17px" : "15px";
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
		shadow.appendChild(style);

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
	sendButton.style.fontWeight = "bold";
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

	sendContainerWrapper.style.height = isTabletOrBelow ? "55px" : "45px";
	sendContainerWrapper.style.padding = "0 5px 0 5px";
	// sendContainerWrapper.style.marginTop = isTabletOrBelow ? "10px" : "0px";

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
	poweredByCompanyName.style.fontSize = "13px";
	poweredByCompanyName.href = "https://www.assistdesk.in";
	poweredByCompanyName.target = "_blank";
	poweredByCompanyName.style.textDecoration = "underline";
	poweredByText.textContent = "Powered By ";
	poweredByText.style.color = "gray";
	poweredByText.style.fontFamily = "sans-serif";
	poweredByText.style.fontSize = "11px";
	poweredByText.style.marginRight = "5px";
	poweredByContainer.appendChild(poweredByText);
	poweredByContainer.appendChild(poweredByCompanyName);
	chatWindow.appendChild(poweredByContainer);

	// Toggle chat window visibility on icon click
	chatIconCustom.addEventListener("click", function () {
		const newDisplayState =
			chatWindow.style.display === "none" ? "block" : "none";
		chatIcon.src =
			newDisplayState === "none"
				? ASSETS_URL + "/" + chatIconName
				: ASSETS_URL + "/close.png";
		if (newDisplayState !== "none") {
			chatWindow.style.display = "block";
			chatWindow.style.animationName = `fade-in-from-bottom`;
			chatWindow.style.animationDuration = "0.2s";
			messageInput.focus();
			// close icon
			chatIcon.style.height = "20px";
			chatIcon.style.width = "20px";
		} else {
			chatWindow.style.animationName = `fade-out-to-bottom`;
			chatWindow.style.animationDuration = "0.2s";
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
				if (messages.length <= 2) {
					context = "";
					messages.slice(-2).forEach((m) => {
						context += `\n ${m.origin}: ${m.message}`;
					});
				} else if (messages.length <= 4) {
					context = "";
					messages.slice(-4).forEach((m) => {
						context += `\n ${m.origin}: ${m.message}`;
					});
				}
				// } else if (messages.length > 5) {
				// 	context = "";
				// 	messages.slice(-6).forEach((m) => {
				// 		context += `\n ${m.origin}: ${m.message}`;
				// 	});
				// }
				messages.push({
					origin: "user",
					message: message,
				});
				displayMessage("user", message);
				messageInput.value = "";
				// session expired in the middle
				let cookieValue = getCookie(cookieName);
				if (!cookieValue || !document.cookie.includes(cookieName)) {
					cookieValue = window.localStorage.getItem("AD_SESSION");
				}
				sendButton.disabled = true;
				messageInput.disabled = true;
				messageContainer.appendChild(messageLoader);
				scrollToBottom();
				quickRepliesContainer.style.pointerEvents = "none";
				const email = window.localStorage.getItem("AD_EMAIL");
				fetch(BASE_URL + "/api/v1/chatbot/message", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						question: message,
						chatbot_id: chatbotId,
						user_id: userId,
						user_session_id: cookieValue,
						info: JSON.stringify({
							channel: getDeviceType(),
							email: email,
						}),
						context: context,
						name: chatbotName,
						chatbot_hash: chatbotHashId,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						let message = data.message.reply;

						if (message.includes("AI Assistant:")) {
							message = message.replace("AI Assistant:", "");
						}

						if (message.includes("bot:")) {
							message = message.replace("bot:", "");
						}

						if (message.includes("Assist Desk:")) {
							message = message.replace("Assist Desk:", "");
						}

						if (message.includes("Reply:")) {
							message = message.replace("Reply:", "");
						}
						messageContainer.removeChild(messageLoader);

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
							"Thank you for your question! I'm constantly learning and expanding my knowledge base. However, it seems like I don't have enough information to provide a specific answer at the moment. Could you please provide more details or ask another question? I'll do my best to assist you."
						);
					})
					.finally(() => {
						sendButton.disabled = false;
						quickRepliesContainer.style.pointerEvents = "auto";
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
	let isNewUser = false;
	if (!document.cookie.includes(cookieName)) {
		isNewUser = true;
	}
	fetch(BASE_URL + `/api/v1/chatbot/widgetstatus`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chatbot_id: chatbotId,
			chatbot_hash: chatbotHashId,
			user_id: userId,
			is_new_user: isNewUser,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			let domains = [];
			let status = "";
			let match = false;
			let position = "bottomright";
			let name = "Customer Support";
			let sessionId = "";

			try {
				domains = data.message.domains;
				status = data.message.status;
				position = data.message.position;
				name = data.message.name;
				chatbotName = data.message.name;
				quickReplies = data.message.quickreplies;
				primaryBgColor = data.message.primarybgcolor;
				sessionId = data.message?.usersessionid || "";

				if (quickReplies[0].keyword == null) {
					quickReplies = [];
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
				// let cookieValue = generateRandomId();

				if (
					!document.cookie.includes(cookieName) ||
					!getCookie(cookieName)
				) {
					let expirationDate = new Date();
					expirationDate.setDate(expirationDate.getDate() + 2);

					// 2 day expiration
					let cookie =
						cookieName +
						"=" +
						sessionId +
						"; expires=" +
						expirationDate.toUTCString() +
						"; path=/";
					document.cookie = cookie;
					window.localStorage.setItem("AD_SESSION", sessionId);
					window.localStorage.removeItem("AD_EMAIL");
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
				const email = window.localStorage.getItem("AD_EMAIL");
				if (!email) insertContent(emailContainer);
			}
		})
		.catch((err) => {
			console.log("ASSIST DESK BOT FAILED TO LOAD, RELOAD", err);
		});
});
