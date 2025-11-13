"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { FileText } from "lucide-react";

type Shareholder = {
  id: number;
  names: string;
  accountNumber: string;
  amountPayable: string;
  unitsHeld: string;
  rightDue: string;
};

const DownloadPdf = (id: any) => {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);

  // const modifyPdf = async (
  //   shareholderName: any,
  //   //  accountNumber: string,
  //   price: any,
  //   unit: any,
  //   unitNo: any,
  //   rightNo: any
  // ) => {
  //   //  console.log(id.account);

  //   const existingPdfBytes = await fetch(
  //     "/charms.pdf"
  //   ).then((res) => res.arrayBuffer());

  //   const pdfDoc = await PDFDocument.load(existingPdfBytes);
  //   const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  //   const pages = pdfDoc.getPages();
  //   const firstPage = pages[1];
  //   const Pagefirst = pages[0];

  //   // Get the width and height of the first page
  //   const { width, height } = firstPage.getSize();

  //   Pagefirst.drawText(shareholderName, {
  //     x: 205,
  //     y: 820,
  //     size: 13,
  //     font: helveticaFont,
  //     color: rgb(0, 0, 0),
  //     // rotate: degrees(-45),
  //   });

  //   // Shareholder Name
  //   firstPage.drawText(shareholderName, {
  //     x: 205,
  //     y: height / 2 + 175,
  //     size: 10,
  //     font: helveticaFont,
  //     color: rgb(0, 0, 0),
  //     // rotate: degrees(-45),
  //   });

  //   // AccountNo
  //   firstPage.drawText("AcctNo:  " + price, {
  //     x: 205,
  //     y: height / 2 + 195,
  //     size: 10,
  //     font: helveticaFont,
  //     color: rgb(0, 0, 0),
  //     // rotate: degrees(-45),
  //   });

  //   const formatters = new Intl.NumberFormat("en-US");
  //   const formattedNumberHolding = formatters.format(unitNo);

  //   // Holding / Unit held
  //   firstPage.drawText(formattedNumberHolding, {
  //     x: 205,
  //     y: height / 2 + 160,
  //     size: 10,
  //     font: helveticaFont,
  //     color: rgb(0, 0, 0),
  //     // rotate: degrees(-45),
  //   });

  //   const formatter = new Intl.NumberFormat("en-US");
  //   const formattedNumberUnit = formatter.format(unit);

  //   // Right Held
  //   firstPage.drawText(formattedNumberUnit, {
  //     x: 205,
  //     y: height / 2 + 142,
  //     size: 10,
  //     font: helveticaFont,
  //     color: rgb(0, 0, 0),
  //     // rotate: degrees(-45),
  //   });

  //   const formattedValue = new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "NGN",
  //   }).format(rightNo);
  //   //Amount
  //   firstPage.drawText(formattedValue, {
  //     x: 205,
  //     y: height / 2 + 128,
  //     size: 10,
  //     font: helveticaFont,
  //     color: rgb(0, 0, 0),
  //     // rotate: degrees(-45),
  //   });

  //   const pdfBytes: any = await pdfDoc.save();

  //   const bytes = new Uint8Array(pdfBytes);
  //   const blob = new Blob([bytes], { type: "application/pdf" });
  //   const docUrl: any = URL.createObjectURL(blob);
  //   //  setPdfInfo(docUrl);
  //   // Setting various property values
  //   let alink = document.createElement("a");
  //   alink.href = docUrl;
  //   alink.download = `${id.account}.pdf`;
  //   alink.click();
  // };

  const onsubmit = async (accountno: any) => {
    try {
      setDownloading(true);
      const result: Shareholder = await fetch(
        `/api/fetch-with-account/${accountno}`
      )
        .then((response) => response.json())
        .then((data) => data?.data?.data);

      if (!result || !result.names) {
        toast({
          variant: "destructive",
          title: "No data found for this account",
        });
        return;
      }

      // Load pdf-lib only on demand (client-side)
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

      // Try to load a template from /public (e.g., /presco.pdf). Fallback to blank A4.
      let pdfDoc: any;
      let usedTemplate = false;
      try {
        const tmplResp = await fetch("/new_presco.pdf", { cache: "no-store" });
        if (tmplResp.ok) {
          const tmplBytes = await tmplResp.arrayBuffer();
          pdfDoc = await PDFDocument.load(tmplBytes);
          usedTemplate = true;
        } else {
          pdfDoc = await PDFDocument.create();
        }
      } catch {
        pdfDoc = await PDFDocument.create();
      }

      // Ensure at least one page exists
      let pages = pdfDoc.getPages();
      if (!pages || pages.length === 0) {
        pages = [pdfDoc.addPage([595.28, 841.89])];
      }

      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const formatNumber = (n: any) => {
        try {
          const v = Number(String(n).replace(/[^0-9.-]/g, ""));
          return new Intl.NumberFormat("en-US").format(isNaN(v) ? 0 : v);
        } catch {
          return String(n ?? "-");
        }
      };
      const formatCurrencyNGN = (n: any) => {
        try {
          const v = Number(String(n).replace(/[^0-9.-]/g, ""));
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(isNaN(v) ? 0 : v);
        } catch {
          return String(n ?? "-");
        }
      };

      if (usedTemplate && pages.length >= 2) {
        // Overlay values on the first two pages using previously used coordinates
        const page0 = pages[0];
        const page1 = pages[1];
        const size1 = page1.getSize();

        // Page 1 (index 0): top banner name
        page1.drawText(String(result.names ?? ""), {
          x: 205,
          y: 830,
          size: 13,
          font,
          color: rgb(0, 0, 0),
        });

        // Page 2 (index 1): main fields
        page0.drawText(String(result.names ?? ""), {
          x: 205,
          y: size1.height / 2 + 218,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
        page0.drawText(`AcctNo:  ${result.accountNumber ?? "-"}`, {
          x: 205,
          y: size1.height / 2 + 185,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
        page0.drawText(formatNumber(result.unitsHeld), {
          x: 205,
          y: size1.height / 2 + 170,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
        page0.drawText(formatNumber(result.rightDue), {
          x: 205,
          y: size1.height / 2 + 152,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
        page0.drawText(formatCurrencyNGN(result.amountPayable), {
          x: 205,
          y: size1.height / 2 + 138,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
      } else if (usedTemplate && pages.length >= 1) {
        // Single-page template: place values near top area
        const page = pages[0];
        const { height } = page.getSize();
        const baseY = height - 140; // a bit lower than header area
        page.drawText(String(result.names ?? ""), {
          x: 205,
          y: baseY,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
        page.drawText(`AcctNo:  ${result.accountNumber ?? "-"}`, {
          x: 205,
          y: baseY + 20,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
        page.drawText(formatNumber(result.unitsHeld), {
          x: 205,
          y: baseY - 20,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
        page.drawText(formatNumber(result.rightDue), {
          x: 205,
          y: baseY - 38,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
        page.drawText(formatCurrencyNGN(result.amountPayable), {
          x: 205,
          y: baseY - 52,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
      } else {
        // Simple fallback layout on a blank A4 page
        const page = pages[0];
        const drawText = (
          text: string,
          x: number,
          y: number,
          bold = false,
          size = 12
        ) => {
          page.drawText(String(text ?? ""), {
            x,
            y,
            size,
            font: bold ? fontBold : font,
            color: rgb(0, 0, 0),
          });
        };

        const { height } = page.getSize();
        let y = height - 40;
        drawText("Rights Issue Document", 50, y, true, 16);
        y -= 30;
        drawText("Shareholder Details", 50, y, true, 14);
        y -= 25;
        drawText(`Name: ${result.names}`, 50, y);
        y -= 18;
        drawText(`Account No (RAN): ${result.accountNumber ?? "-"}`, 50, y);
        y -= 18;
        drawText(`Units Held: ${formatNumber(result.unitsHeld)}`, 50, y);
        y -= 18;
        drawText(`Right Due: ${formatNumber(result.rightDue)}`, 50, y);
        y -= 18;
        drawText(
          `Amount Payable: ${formatCurrencyNGN(result.amountPayable)}`,
          50,
          y
        );
        y -= 30;
        drawText("This document was generated electronically.", 50, y);
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${result.accountNumber || accountno}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);

      toast({
        variant: "default",
        title: "Download started",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to generate PDF",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => onsubmit(id.account)}
        className="font-bold"
        variant={"link"}
        disabled={downloading}
      >
        <FileText className="w-36 h-36" />{" "}
        {downloading ? "Preparing..." : "Download"}
      </Button>
    </div>
  );
};

export default DownloadPdf;
