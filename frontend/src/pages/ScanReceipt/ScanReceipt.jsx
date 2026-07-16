import { useRef, useState } from "react";
import {
  FileImage,
  ImageIcon,
  ScanLine,
  Trash2,
  Upload,
} from "lucide-react";

function ScanReceipt() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file) {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a JPG, PNG, JPEG, or PDF file.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  }

  function handleFileChange(event) {
    handleFile(event.target.files?.[0]);
  }

  function handleBrowseClick() {
    fileInputRef.current?.click();
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  }

  function handleRemoveFile() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleScan() {
    if (!selectedFile) {
      alert("Please upload a receipt first.");
      return;
    }

    alert("Receipt is ready for AI scanning.");
  }

  return (
    <div className="mx-auto max-w-7xl">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
          Receipt Scanner
        </p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          Scan Grocery Receipt
        </h1>

        <p className="mt-3 max-w-2xl text-gray-500">
          Upload a grocery receipt. ShelfLife AI will detect products and add
          them to your personal inventory after processing.
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2">
        <article
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`rounded-3xl border-2 border-dashed bg-white p-8 shadow-sm transition md:p-10 ${
            isDragging
              ? "border-green-600 bg-green-50"
              : "border-green-200"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-700">
              <Upload size={43} />
            </div>
          </div>

          <h2 className="mt-7 text-center text-2xl font-bold text-gray-900">
            Upload Receipt
          </h2>

          <p className="mt-3 text-center leading-7 text-gray-500">
            Drag and drop your receipt here, or choose a file from your
            computer.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleBrowseClick}
              className="rounded-2xl bg-[#0B6B3A] px-8 py-4 font-bold text-white transition hover:bg-[#075C36]"
            >
              Browse File
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Supported formats: JPG, JPEG, PNG and PDF
          </p>
        </article>

        <article className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
          {!selectedFile ? (
            <div className="flex min-h-[370px] flex-col items-center justify-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <ImageIcon size={43} />
              </div>

              <h2 className="mt-7 text-2xl font-bold text-gray-900">
                Receipt Preview
              </h2>

              <p className="mt-3 text-gray-500">
                Your selected receipt will appear here.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-green-700">
                    File selected
                  </p>

                  <h2 className="mt-1 break-all text-xl font-bold text-gray-900">
                    {selectedFile.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="rounded-xl border border-red-100 p-3 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="mt-6 flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl bg-gray-50 p-4">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Selected grocery receipt"
                    className="max-h-[360px] w-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <FileImage
                      size={60}
                      className="mx-auto text-green-700"
                    />

                    <p className="mt-4 font-semibold text-gray-700">
                      PDF receipt selected
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleScan}
            disabled={!selectedFile}
            className={`mt-7 flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-bold transition ${
              selectedFile
                ? "bg-[#0B6B3A] text-white hover:bg-[#075C36]"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            }`}
          >
            <ScanLine size={22} />
            Scan with AI
          </button>
        </article>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
          OCR Results
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Detected Products
        </h2>

        <div className="mt-8 rounded-3xl border-2 border-dashed border-gray-200 px-6 py-12 text-center">
          <ScanLine size={48} className="mx-auto text-green-600" />

          <h3 className="mt-5 text-xl font-bold text-gray-900">
            No products detected yet
          </h3>

          <p className="mt-3 text-gray-500">
            Upload a receipt and start scanning.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ScanReceipt;