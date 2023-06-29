import {
	Badge,
	Box,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { ITicket } from "../../../../types/ticket.type";
import TicketWidget from "./TicketWidget";

const TicketTabs: React.FC<{ tickets: ITicket[] }> = ({ tickets }) => {
	const ticketCounts = useMemo(() => {
		const ticketCount: { [key: string]: number } = {
			open: 0,
			closed: 0,
			pending: 0,
			resolved: 0,
			spam: 0,
		};
		tickets.forEach((t) => {
			ticketCount[t.status] += 1;
		});
		return ticketCount;
	}, [tickets]);

	return (
		<Box>
			<Tabs>
				<TabList
					sx={{
						position: "sticky",
						top: 0,
						zIndex: 30,
						bgColor: "white",
						backdropFilter: "blur(40px)",
					}}
				>
					<Tab>
						Open <Badge ml={2}>{ticketCounts.open}</Badge>
					</Tab>
					<Tab>
						Pending <Badge ml={2}>{ticketCounts.pending}</Badge>
					</Tab>
					<Tab>
						Resolved <Badge ml={2}>{ticketCounts.resolved}</Badge>
					</Tab>
					<Tab>
						Closed <Badge ml={2}>{ticketCounts.closed}</Badge>
					</Tab>
					<Tab>
						Spam <Badge ml={2}>{ticketCounts.spam}</Badge>
					</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<Box>
							{tickets.map((ticket) => {
								if (ticket.status === "open")
									return <TicketWidget ticket={ticket} />;
							})}
						</Box>
					</TabPanel>
					<TabPanel>
						<Box>
							{tickets.map((ticket) => {
								if (ticket.status === "pending")
									return <TicketWidget ticket={ticket} />;
							})}
						</Box>
					</TabPanel>
					<TabPanel>
						<Box>
							{tickets.map((ticket) => {
								if (ticket.status === "resolved")
									return <TicketWidget ticket={ticket} />;
							})}
						</Box>
					</TabPanel>
					<TabPanel>
						<Box>
							{tickets.map((ticket) => {
								if (ticket.status === "closed")
									return <TicketWidget ticket={ticket} />;
							})}
						</Box>
					</TabPanel>
					<TabPanel>
						<Box>
							{tickets.map((ticket) => {
								if (ticket.status === "spam")
									return <TicketWidget ticket={ticket} />;
							})}
						</Box>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};

export default TicketTabs;
