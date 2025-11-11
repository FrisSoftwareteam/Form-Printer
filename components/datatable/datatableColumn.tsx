"use client";

import { ColumnDef } from "@tanstack/react-table";
//import { Expense } from "./schema";
//import { DataTableColumnHeader } from "./data-table-column-header";
//import { DataTableRowActions } from "./data-table-row-actions";
import {
  // TrendingUp,
  // TrendingDown,
  User,
  // CircleUser,
  // BookOpen,
} from "lucide-react";
// import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./dataHeaderColumn";
// import { DataTableRowActions } from "./datatableRowAction";
import { z } from "zod";
// import { Badge, Group } from "@mantine/core";
import { Badge as Badges } from "@/components/ui/badge";
import { Button } from "../ui/button";
import DownloadPdf from "../page_ui/download-pdf";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";

//import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";

export type User = {
  departmentId: number;
  firstName: string;
};

export type Row = {
  controlno: string;
  nameonthedocument: string;
  sourceofthedocument: string;
  jobtypes: string;
  submittedby: string;
  status: string;
  documentcounts: string;
  createdAt: string;
  userClerkId: string;
  user: User;
  //   collapsibleContent: string;
};

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const expenseSchema = z.object({
  id: z.string(),
  label: z.string(),
  note: z.string(),
  category: z.string(),
  type: z.enum(["income", "expense"]),
  amount: z.number(),
  date: z.string(),
});

export type Expense = z.infer<typeof expenseSchema>;

export const datatableColumn: ColumnDef<Row>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="CN" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="w-[70px] capitalize">
  //       <Badges>{row.getValue("id")}</Badges>
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "names",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shareholders  Name" />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-4">
          <span className="max-w-[700px] truncate font-bold capitalize">
            {row.getValue("names")}
          </span>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const id: any = row.getValue("accountNumber");

      return (
        <div className="flex -ml-4">
          {/* <Button variant={"link"}>Download </Button> */}
          <DownloadPdf account={id} />
        </div>
      );
    },
  },
  //accountNo  address

  {
    accessorKey: "accountNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RAN/Account No" />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-normal">
            {row.getValue("accountNumber")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shareholders  Address" />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      // const maskify = (info: any) => {
      //   return info
      //     .slice(-30, -10)
      //     .replace(/[a-zA-Z]/g, "*")
      //     .concat(info.slice(-4, info.len));
      // };

      const maskify = (name: any) => {
        const mask = "*";
        let maskedName =
          name.substring(0, 20) + mask.repeat(name.length - 1) + name.slice(-1);
        return maskedName;
      };

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-normal ">
            {maskify(row.getValue("address"))}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "emailAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-normal">
            {row.getValue("emailAddress")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "mobile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile" />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-normal">
            {row.getValue("mobile")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "chn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CHN" />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-normal">
            {row.getValue("chn")}
          </span>
        </div>
      );
    },
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return (
  //       <TooltipProvider>
  //         <div className="flex items-center gap-1">
  //           {row?.original.status === "NEW" ? <></> : null}

  //           {row?.original.status === "SCAN-COMPLETED" && <></>}
  //           {row?.original.status === "NEW" && <></>}
  //           {row?.original.status === "TRANSFERED" ? null : <></>}
  //         </div>
  //       </TooltipProvider>
  //     );
  //   },
  // },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
