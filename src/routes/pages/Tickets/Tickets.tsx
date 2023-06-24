import { Badge, Box, Divider, Text } from "@chakra-ui/react";
import { useClerk } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTickets } from "../../../store/thunks/tickets.thunk";
import { useAppDispatch } from "../../../store/store";
import {
	getTicketsApiStatusSelector,
	ticketsSelector,
} from "../../../store/selectors/tickets.selector";
import TicketWidget from "./components/TicketWidget";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import TicketSkeleton from "./components/TicketSkeleton";

const Tickets: React.FC = () => {
	const { session } = useClerk();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const tickets = useSelector(ticketsSelector);
	const ticketsApiStatus = useSelector(getTicketsApiStatusSelector);

	useEffect(() => {
		session
			?.getToken({ template: "stealth-token-template" })
			.then((token) => {
				if (!token) {
					navigate("/signin");
					return;
				}
				dispatch(
					getTickets({
						token,
					})
				);
			})
			.catch(() => {
				navigate("/signin");
			});
	}, [dispatch, navigate, session]);

	const isTicketsDedicatedPage = (() => {
		return window.location.pathname.split("/").includes("tickets");
	})();

	return (
		<Box
			sx={{
				mt: 2,
				height: isTicketsDedicatedPage
					? "100%"
					: "calc((100vh - 180px)/2)",
				overflow: "hidden",
			}}
		>
			<Box
				sx={{ cursor: "pointer" }}
				onClick={() => navigate("/tickets", { replace: true })}
			>
				<Text
					sx={{ mb: -0.5, display: "flex", alignItems: "center" }}
					fontSize="3xl"
					fontWeight="bold"
				>
					Tickets{" "}
					{!isTicketsDedicatedPage && (
						<Badge
							sx={{
								ml: 2,
								display: "flex",
								alignItems: "center",
								width: "fit-content",
							}}
						>
							View All
							<ArrowForwardIcon fontSize="sm" />
						</Badge>
					)}
				</Text>
				<Text fontSize="sm" color="gray">
					Tickets raised by your visitors / customers. Get back to
					them quickly to close a potential deal :)
				</Text>
			</Box>
			<Divider sx={{ mb: 5 }} orientation="horizontal" />
			{ticketsApiStatus === "pending" && <TicketSkeleton />}
			<Box sx={{ height: "100%", overflow: "auto" }}>
				{ticketsApiStatus === "fulfilled" && (
					<Box>
						{isTicketsDedicatedPage
							? tickets.map((ticket) => {
									return <TicketWidget ticket={ticket} />;
							  })
							: tickets.slice(0, 5).map((ticket) => {
									return <TicketWidget ticket={ticket} />;
							  })}
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Tickets;
