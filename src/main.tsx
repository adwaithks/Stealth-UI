import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
	ChakraProvider,
	extendTheme,
	createStandaloneToast,
} from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { ClerkProvider } from "@clerk/clerk-react";

const theme = extendTheme({
	styles: {
		global: () => ({
			body: {
				bg: "",
			},
		}),
	},
});

const VITE_PUBLISHABLE_KEY_LIVE = import.meta.env.VITE_PUBLISHABLE_KEY_LIVE;
const VITE_PUBLISHABLE_KEY = import.meta.env.VITE_PUBLISHABLE_KEY;
const ENVIRON = import.meta.env.VITE_ENVIRON;

console.log(ENVIRON);

const { ToastContainer } = createStandaloneToast();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ChakraProvider theme={theme}>
		<Provider store={store}>
			<ClerkProvider
				publishableKey={
					ENVIRON == "DEV"
						? VITE_PUBLISHABLE_KEY
						: VITE_PUBLISHABLE_KEY_LIVE
				}
			>
				<App />
				<ToastContainer />
			</ClerkProvider>
		</Provider>
	</ChakraProvider>
);
