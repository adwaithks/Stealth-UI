import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { ClerkProvider } from "@clerk/clerk-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ChakraProvider>
		<Provider store={store}>
			<ClerkProvider publishableKey="pk_test_c3RlYWR5LXBpcmFuaGEtMzcuY2xlcmsuYWNjb3VudHMuZGV2JA">
				<App />
			</ClerkProvider>
		</Provider>
	</ChakraProvider>
);
