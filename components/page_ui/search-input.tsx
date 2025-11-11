"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Mail, User, FileText } from "lucide-react";
import axios from "axios";
import { DataTable } from "../datatable/data-table";
import { Divider } from "@mantine/core";
import { Separator } from "../ui/separator";
import { useQuery } from "@tanstack/react-query";
import { datatableColumn } from "../datatable/datatableColumn";
import { useMemo } from "react";
import Loader from "./Loader";

function SearchButton() {
  const { toast } = useToast();

  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Search"}
    </Button>
  );
}

export function SearchInput() {
  const [results, setResults] = useState<
    Array<{ id: string; type: string; value: string }>
  >([]);
  const [inputs, setInputs] = useState("");
  const [show, setShow] = useState(false);
  // const [data, setData] = useState([]);
  const { toast } = useToast();

  const {
    data: serverData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["shareholderss", inputs],
    queryFn: async () => {
      try {
        return await fetch(`/api/shareholders-details/${encodeURIComponent(inputs.trim())}`)
          .then((res: any) => res.json())
          .then((data: any) => {
            setShow(true);

            return data?.data?.data ?? [];
          });
      } catch (error) {
        console.log(error);
      }
    },
    enabled: false,
  });

  // const data = useMemo(() => serverData ?? [], [serverData]);

  async function onSubmitSearch(e: any) {
    e.preventDefault();
    const value = inputs.trim();
    if (value.length < 2) {
      setShow(false);
      toast({
        variant: "destructive",
        title: "Enter at least 2 characters",
      });
      return;
    }
    toast({
      variant: "default",
      title: "Searching...",
    });
    return refetch();
  }

  async function handleSearch(formData: FormData) {
    toast({
      variant: "default",
      title: "🤖 🥳Content Displayed !",
    });
    return refetch();
  }
  return (
    <>
      <Card className="w-full max-w-[800px] mx-auto mb-7">
        <CardContent className="pt-6">
          <form onSubmit={onSubmitSearch} className="flex space-x-2">
            <Input
              name="query"
              onChange={(e: any) => setInputs(e.target.value)}
              placeholder="Search fullname, account number..."
              className="flex-grow"
            />
            <SearchButton />
          </form>
        </CardContent>
      </Card>

      {show ? (
        <div className="mt-5 bg-muted w-full p-30 rounded-lg mb-11">
          <DataTable
            columns={datatableColumn}
            data={serverData ?? []}
            loading={isLoading}
          />
        </div>
      ) : (
        <div className="flex justify-center rounded-md pt-1 mt-10">
          <Loader />
        </div>
      )}
    </>
  );
}
