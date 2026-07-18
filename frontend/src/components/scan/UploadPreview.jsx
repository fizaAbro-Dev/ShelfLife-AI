import {
  FileImage,
  ImageIcon,
  ScanLine,
  Trash2,
} from "lucide-react";

function UploadPreview({
  selectedFile,
  previewUrl,
  handleRemoveFile,
  handleScan,
  loading,
}) {
  return (
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
                File Selected
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
                alt="Receipt Preview"
                className="max-h-[360px] w-full object-contain"
              />
            ) : (
              <div className="text-center">
                <FileImage
                  size={60}
                  className="mx-auto text-green-700"
                />

                <p className="mt-4 font-semibold text-gray-700">
                  PDF Receipt Selected
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleScan}
        disabled={!selectedFile || loading}
        className={`mt-7 flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-bold transition ${
          selectedFile
            ? "bg-[#0B6B3A] text-white hover:bg-[#075C36]"
            : "cursor-not-allowed bg-gray-200 text-gray-400"
        }`}
      >
        <ScanLine size={22} />

        {loading ? "Scanning..." : "Scan with AI"}
      </button>
    </article>
  );
}

export default UploadPreview;