import { Upload } from "lucide-react";

function UploadCard({
  fileInputRef,
  handleFileChange,
  handleBrowseClick,
  handleDrop,
  isDragging,
  setIsDragging,
}) {
  return (
    <article
      onDragOver={(e) => {
        e.preventDefault();
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
        accept=".jpg,.jpeg,.png,.jfif,.pdf"
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
        Drag and drop your receipt here, or choose a file from your computer.
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
        Supported formats: JPG, JPEG, PNG, JFIF and PDF
      </p>
    </article>
  );
}

export default UploadCard;