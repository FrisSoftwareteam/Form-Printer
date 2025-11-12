"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { z } from "zod";
import "./style.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "@/components/page_ui/Loader";
import { toast, useToast } from "@/components/ui/use-toast";

import { Download, RotateCcw, Send } from "lucide-react";
import { Select as Selects } from "@mantine/core";
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  rem,
} from "@mantine/core";

import AsyncSelect from "react-select/async";
import { FooterCentered } from "@/components/page_ui/Footer";
import { SearchInput } from "@/components/page_ui/search-input";

type DataType = {
  id: number;
  shareholderName: string;
  accountNumber: number;
  price: number;
  unit: number;
  unitNo: string;
};

const dataMeta: DataType[] = [
  {
    id: 1,
    shareholderName: "Emmanuel Effiong",
    accountNumber: 909304,
    price: 1000,
    unit: 9000,
    unitNo: "000-0009",
  },

  {
    id: 2,
    shareholderName: "Favour Oke",
    accountNumber: 8001,
    price: 7200,
    unit: 1600,
    unitNo: "000-0002",
  },
];

const FormSchema = z.object({
  accountnumber: z.coerce
    .number({
      invalid_type_error: "Account number is required",
    })
    .gte(1000, "Account number must contain at least four digits."),
});

let data: any = [];

const page = () => {
  const [onchangeValue, setOnChangeValue] = useState("");
  const { toast } = useToast();

  const theme = useMantineTheme();
  const [logoColor, setLogoColor] = useState<string>("#15803d");

  //Hyration..
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) {
  //   return null;
  // }

  useEffect(() => {
    toast({
      variant: "default",
      title: " 🤗 We are back and better !",
    });
  }, []);

  // useEffect(() => {
  //   const img = new window.Image();
  //   img.src = "/presco_logo.png";
  //   img.onload = () => {
  //     try {
  //       const canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");
  //       if (!ctx) return;
  //       const w = 64,
  //         h = 64;
  //       canvas.width = w;
  //       canvas.height = h;
  //       ctx.drawImage(img, 0, 0, w, h);
  //       const { data } = ctx.getImageData(0, 0, w, h);
  //       let r = 0,
  //         g = 0,
  //         b = 0,
  //         count = 0;
  //       for (let i = 0; i < data.length; i += 20) {
  //         const rr = data[i],
  //           gg = data[i + 1],
  //           bb = data[i + 2],
  //           aa = data[i + 3];
  //         if (aa < 10) continue;
  //         if (rr > 240 && gg > 240 && bb > 240) continue;
  //         r += rr;
  //         g += gg;
  //         b += bb;
  //         count++;
  //       }
  //       if (count > 0) {
  //         r = Math.round(r / count);
  //         g = Math.round(g / count);
  //         b = Math.round(b / count);
  //         const toHex = (n: number) => n.toString(16).padStart(2, "0");
  //         setLogoColor(`#${toHex(r)}${toHex(g)}${toHex(b)}`);
  //       }
  //     } catch {}
  //   };
  // }, []);

  return (
    <>
      <div className="w-full pb-10 -mt-24">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between space-x-3 ">
                <Button variant="ghost" className="hover">
                  <Image
                    src={"/logo.png"}
                    width={250}
                    height={250}
                    alt="Logo"
                    className="p-10 drop-shadow"
                  />
                </Button>

                <Image
                  src="/presco_logo.png"
                  alt="Logo"
                  width={150}
                  height={150}
                  className="drop-shadow-lg"
                />
              </div>
            </CardTitle>
          </CardHeader>
          {/* <Separator className="w-[50%] m-auto text-center flex items-center justify-center" /> */}
          <div
            className="flex sm:p-8  justify-center  mx-auto text-6xl font-extrabold leading-normal drop-shadow-md text-[#98C013]"
            // style={{ color: logoColor }}
          >
            PRESCO PLC
          </div>

          <div className="flex sm:p-5 justify-between font-bold font-sans text-2xl mx-auto gap-1">
            <p className="p-3 m-auto">
              RIGHTS ISSUE PARTICIPATION FORM DOWNLOAD
            </p>
            <Download className="h-7 w-7 sm:hidden  font-bold animate-bounce drop-shadow-lg" />
          </div>
          {/*  */}

          <div className="flex justify-center mx-auto to-muted items-left text-lg   px-20 py-1 pt-10">
            Application List Opens
          </div>
          <div className="flex justify-center font-semibold">
            Wednesday, November 12, 2025 , Application List Closes
          </div>
          <div className="flex justify-center font-semibold">
            Tuesday, December 02, 2025, RIGHTS ISSUE OF 1,666,667 ORDINARY
            SHARES
          </div>
          <div className="flex justify-center font-semibold mb-7">
            OF 50 KOBO EACH AT N1,420 PER SHARE
          </div>

          <Separator className="w-[50%] m-auto text-center flex items-center justify-center " />
          <div className=" justify-center px-10 pt-6 ">
            <div>
              <div className="lg:absolute lg:inset-y-0 lg:hidden md:hidden  right-0 flex justify-between w-auto">
                <label htmlFor="currency" className="sr-only">
                  ...
                </label>
                {/* <Selects
                  placeholder="Filter"
                  onChange={(e: any) => setDataValue(e)}
                  className=" rounded-md border-1 min-w-full pr-12 sm:text-sm sm:leading-6"
                  data={[
                    { value: "fullname", label: "Full Name" },
                    { value: "accountno", label: "Account No" },
                  ]}
                /> */}
              </div>
              <div className="">
                <h1 className="flex items-center justify-center  font-bold mb-2 mt-6 text-slate-800">
                  Search either: Full-name, Email, Phone Number, or Account
                  Number(RAN)
                </h1>
              </div>

              <SearchInput />

              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              ></label>
            </div>
          </div>
        </Card>
        <FooterCentered />
      </div>
    </>
  );
};

export default page;
