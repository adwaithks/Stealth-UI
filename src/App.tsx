import RouteConfig from "./routes/route.config";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<RouteConfig />
		</QueryClientProvider>
	);
}

export default App;
