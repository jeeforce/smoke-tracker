import { useState } from "react";
import type { SmokeData } from "../schema/SmokeData.schema";
import { calculatePDFStatistics } from "../utils/pdfStatistics";

type UseGeneratePDFReturn = {
  generatePDF: () => Promise<void>;
  isGenerating: boolean;
  error: string | null;
};

export const useGeneratePDF = (
  data: SmokeData[] = []
): UseGeneratePDFReturn => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePDF = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const statistics = calculatePDFStatistics(data);
      if (!statistics) {
        throw new Error("No data available to generate report");
      }

      // Lazy load the PDF library only when needed
      const [{ pdf }, { PDFReportDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("../components/PDFReportDocument"),
      ]);

      const blob = await pdf(
        <PDFReportDocument statistics={statistics} />
      ).toBlob();

      // Open PDF in new tab for preview
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");

      // Clean up the URL after a delay to ensure browser has loaded it
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate PDF";
      console.error("PDF generation error:", err);
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePDF,
    isGenerating,
    error,
  };
};
