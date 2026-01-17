import { useState, useEffect } from "react";
import {
  Download,
  FileText,
  ExternalLink,
  Upload,
  AlertCircle,
} from "lucide-react";
import globalData from "../data/global.json";

export default function CV() {
  const { personal, cv } = globalData;
  const [pdfExists, setPdfExists] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if PDF exists
    fetch(cv.pdfPath, { method: "HEAD" })
      .then((response) => {
        setPdfExists(response.ok);
        setLoading(false);
      })
      .catch(() => {
        setPdfExists(false);
        setLoading(false);
      });
  }, [cv.pdfPath]);

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            My CV
          </h1>
          <p className="text-text-muted dark:text-zinc-400 max-w-xl mx-auto mb-6">
            View or download my curriculum vitae
          </p>

          {pdfExists && (
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={cv.pdfPath}
                download={cv.downloadName}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all hover:scale-105 cursor-pointer"
              >
                <Download size={20} />
                Download PDF
              </a>
              <a
                href={cv.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary dark:bg-zinc-800 text-white font-semibold rounded-xl transition-all hover:scale-105 cursor-pointer"
              >
                <ExternalLink size={20} />
                Open in New Tab
              </a>
            </div>
          )}
        </div>

        {/* PDF Viewer or Placeholder */}
        <div className="max-w-4xl mx-auto animate-fade-in-up delay-200">
          {pdfExists ? (
            <div className="bg-surface dark:bg-zinc-900 rounded-2xl border border-border dark:border-zinc-800 overflow-hidden shadow-xl">
              {/* PDF Header */}
              <div className="flex items-center gap-3 px-6 py-4 bg-zinc-100 dark:bg-zinc-800 border-b border-border dark:border-zinc-700">
                <FileText size={24} className="text-accent" />
                <span className="font-semibold">{personal.name} - CV</span>
              </div>

              {/* PDF Embed with object fallback */}
              <div className="aspect-[8.5/11] w-full bg-white">
                <object
                  data={cv.pdfPath}
                  type="application/pdf"
                  className="w-full h-full"
                  aria-label={`${personal.name} CV`}
                >
                  <iframe
                    src={`${cv.pdfPath}#toolbar=1&navpanes=0`}
                    className="w-full h-full"
                    title={`${personal.name} CV`}
                  />
                </object>
              </div>
            </div>
          ) : (
            /* No PDF Placeholder */
            <div className="bg-surface dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-border dark:border-zinc-700 p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center">
                <Upload size={40} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold font-heading mb-2">
                CV Not Found
              </h3>
              <p className="text-text-muted dark:text-zinc-400 mb-6 max-w-md mx-auto">
                Please copy your CV PDF file to the{" "}
                <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">
                  public/
                </code>{" "}
                folder.
              </p>

              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 text-left max-w-md mx-auto">
                <p className="text-sm font-mono text-text-muted dark:text-zinc-400 mb-2">
                  <span className="text-accent">$</span> cp your-cv.pdf
                  public/cv.pdf
                </p>
                <p className="text-xs text-text-muted dark:text-zinc-500">
                  Then update <code>src/config.json</code> with the correct
                  path.
                </p>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-start gap-3 max-w-md mx-auto">
                <AlertCircle
                  size={20}
                  className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
                />
                <p className="text-sm text-amber-700 dark:text-amber-300 text-left">
                  Make sure the file path in <code>config.json</code> matches
                  the file location in <code>public/</code>
                </p>
              </div>
            </div>
          )}

          {pdfExists && (
            <p className="text-center text-text-muted dark:text-zinc-500 text-sm mt-4">
              If the PDF doesn't display, please{" "}
              <a
                href={cv.pdfPath}
                download={cv.downloadName}
                className="text-accent hover:underline cursor-pointer"
              >
                download it directly
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
