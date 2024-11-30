import { useState } from "react";
import {
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import { TicketData } from "./TicketsTable";
import { formatDate, formatTime } from "../../utils/dayjs";

interface TicketsRowProps {
  ticket: TicketData;
  handleSelectTicket: Function;
  selectedTickets: number[];
}

const TicketsRow = ({
  ticket,
  handleSelectTicket,
  selectedTickets,
}: TicketsRowProps) => {
  const [promoTooltipOpen, setPromoTooltipOpen] = useState(false);

  return (
    <TableRow
      sx={{
        backgroundColor: ticket.for_sale ? "white" : "grey.200",
        opacity: ticket.for_sale ? 1 : 0.7,
        "&:hover": {
          backgroundColor: "lightgray", // Add hover effect
        },
        cursor: "pointer",
      }}
      onClick={() => {
        if (ticket.for_sale) {
          handleSelectTicket(ticket.id); // Toggle selection only for available rows
        }
      }}
    >
      <TableCell>
        <Checkbox
          checked={selectedTickets.includes(ticket.id)}
          disabled={!ticket.for_sale}
        />
      </TableCell>
      <TableCell>{formatDate(ticket.date)}</TableCell>
      <TableCell>{ticket.time ? formatTime(ticket.time) : "TBD"}</TableCell>
      <TableCell>{ticket.opponent}</TableCell>
      <TableCell
        sx={{
          color: ticket.for_sale ? "black" : "red",
        }}
      >
        {ticket.for_sale ? `$${ticket.price} / tix` : "Sold"}
        {ticket.promotional_night && (
          <Tooltip
            title={ticket.promotional_night_details}
            enterDelay={0}
            open={promoTooltipOpen}
            onOpen={() => setPromoTooltipOpen(true)}
            onClose={() => setPromoTooltipOpen(false)}
          >
            <IconButton
              aria-label="trash"
              onClick={(e) => {
                e.stopPropagation();
                setPromoTooltipOpen(true);
              }}
            >
              🎁
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TicketsRow;
