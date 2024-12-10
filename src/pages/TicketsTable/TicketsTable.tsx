import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { formatDate, formatTime } from "../../utils/dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Toolbar,
} from "@mui/material";
import TicketsRow from "./TicketsRow";

export interface TicketData {
  id: number;
  date: string;
  time: string | null;
  opponent: string;
  price: number;
  promotional_night: boolean;
  promotional_night_details: string;
  for_sale: boolean;
}

const TicketTable = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]); // Track selected ticket Ids
  const [showAvailableOnly, setShowAvailableOnly] = useState(true); // State for filtering

  const fetchTickets = async () => {
    // @ts-ignore: Ignoring type errors temporarily
    const { data, error } = await supabase
      .from("tickets")
      .select(
        "id, date, time, opponent, price, promotional_night, promotional_night_details, for_sale"
      )
      .order("date", { ascending: true });
    if (error) {
      console.error("Error fetching tickets:", error);
    } else {
      setTickets((data as any as TicketData[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSelectTicket = (ticketsId: number) => {
    setSelectedTickets(
      (prev) =>
        prev.includes(ticketsId)
          ? prev.filter((i) => i !== ticketsId) // Remove if already selected
          : [...prev, ticketsId] // Add if not selected
    );
  };

  const generateEmailBody = () => {
    const selected = selectedTickets.map((index) => tickets[index]);
    const emailBody = selected
      .map(
        (ticket) =>
          `Opponent: ${ticket.opponent}\nDate: ${formatDate(
            ticket.date
          )}\nPrice: $${ticket.price}`
      )
      .join("\n\n");
    return encodeURIComponent(emailBody);
  };

  const emailLink = `mailto:dieuhhuynh@gmail.com?subject=Warriors%20Tix%20Request&body=${generateEmailBody()}`;

  const filteredTickets = showAvailableOnly
    ? tickets.filter((ticket) => ticket.for_sale)
    : tickets;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Tickets Prices
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Price is per ticket. I have 3 tickets available at section 109, row 10
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Toolbar style={{ justifyContent: "space-between" }}>
              <Typography variant="h6">Filter Tickets</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowAvailableOnly((prev) => !prev)}
              >
                {showAvailableOnly
                  ? "Show All Tickets"
                  : "Show Available Tickets"}
              </Button>
            </Toolbar>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Opponent</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTickets.map((ticket, index) => (
                  <TicketsRow ticket={ticket} key={index} handleSelectTicket={handleSelectTicket} selectedTickets={selectedTickets}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            href={emailLink}
            disabled={selectedTickets.length === 0} // Disable button if no tickets are selected
            style={{ marginTop: "20px" }}
          >
            Request Selected Tickets
          </Button>
        </>
      )}
    </div>
  );
};

export default TicketTable;
