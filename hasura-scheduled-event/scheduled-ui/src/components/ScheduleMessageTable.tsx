import { Card, Typography } from "@material-tailwind/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { MdOutlineSchedule, MdCheck } from "react-icons/md";

export type Message = {
  text: string;
  scheduled_at: string;
  status: string;
};

const columnHelper = createColumnHelper<Message>();

const columns = [
  columnHelper.accessor("text", {
    header: "Message",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("scheduled_at", {
    header: "Scheduled At",
    cell: (info) => dayjs(info.getValue()).format("MMM D, YYYY h:mm A"),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    cell: (info) => {
      const status = info.getValue();
      const icon = status === "scheduled" ? <MdOutlineSchedule /> : <MdCheck />;
      return icon;
    },
    footer: (info) => info.column.id,
  }),
];

type ScheduleMessageTableProps = {
  data: Message[];
};

export const ScheduleMessageTable: React.FC<ScheduleMessageTableProps> = ({
  data,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Typography>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => {
            const isLast = index === data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={classes}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};
