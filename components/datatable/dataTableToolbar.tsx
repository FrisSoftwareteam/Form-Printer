"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { incomeType, statuses } from "./data";
//import { DataTableFacetedFilter } from "./data-table-faceted-filter";
// import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
//import { CalendarDatePicker } from "@/components/calendar-date-picker";
import { useState } from "react";
//import { DataTableViewOptions } from "./data-table-view-options";
import {
  DownloadCloud,
  MoveHorizontal,
  PlusCircle,
  RefreshCcw,
  TrashIcon,
} from "lucide-react";
import { CalendarDatePicker } from "./calendar/calenderDatePicker";
// import { DataTableFacetedFilter } from "./datatableFaceted";
// import { DataTableViewOptions } from "./dataTableViewOptions";

//import { useSwitchMode } from "@/zustand/store";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useRouter } from "next/navigation";
//import { UploadButton } from "../admin-page-ui/admin-dialog-upload/admin-dialog-upload";

import { useQuery } from "@tanstack/react-query";
//import { saveAs } from "file-saver";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const [selectChange, setSelectChange] = useState("ALL");

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn("createdAt")?.setFilterValue([from, to]);
  };

  const router = useRouter();

  const handleReload = () => {
    router.refresh();
  };

  //const { isSwitch, switchState } = useSwitchMode();

  // const onChange = async () => {

  //   return data;
  // };

  // const saveFile = () => {
  //   saveAs(
  //     "https://drive.google.com/uc?export=download&id=1q9pXQYts4dSP7Owc2u1755lk6gF46k1O",
  //     "statff_detail.csv"
  //   );
  // };

  return (
    <div>
      {/* <h1 className="sm:hidden mb-8 mx-80 uppercase inline-block align-middle items-center justify-center text-3xl font-bold  bg-gradient-to-r from-blue-900 to-yellow-900  bg-clip-text text-transparent">
        Information Log(s)
      </h1> */}
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-start">
          <Input
            placeholder="Filter by Shareholders name"
            value={(table.getColumn("names")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("names")?.setFilterValue(event.target.value);
            }}
            className="h-9 w-[350px] lg:w-[450px] border-[#A06207] mb-3 sm:mt-2 p-2"
          />
          <div className="text-sm  text-slate-800 ml-1 mb-8 p-2">
            This search allows for second-level filtering based on specified
            search parameters. However, you can only filter by the shareholder's
            name.
          </div>

          <div className="sm:text-sm sm:text-slate-800 sm:ml-1 sm:mb-8  lg:hidden md:hidden sm:flex sm:flex-col p-1">
            Please scroll{" "}
            <span className="font-bold text-red-500">horizontally</span> to view
            the entire table content.{" "}
          </div>
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setSelectChange("");
              table.resetColumnFilters();
            }}
            className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}

        <div className="flex items-center gap-2 p-3">
          {/* <DataTableViewOptions table={table} /> */}
        </div>
        {/* 
      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(e: boolean) => {
            switchState(e);
          }}
          checked={isSwitch}
          id="edit-mode"
        />
        <Label htmlFor="edit-mode">Edit Mode</Label>
      </div> */}
      </div>
    </div>
  );
}
