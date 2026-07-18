import { useRef, useState } from "react";
import { ScanLine } from "lucide-react";
import { scanReceipt } from "../../services/ocrService";
import UploadCard from "../../components/scan/UploadCard";
import UploadPreview from "../../components/scan/UploadPreview";
import DetectedProducts from "../../components/scan/DetectedProducts";
import ProductFormCard from "../../components/scan/ProductFormCard";
function ScanReceipt() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
const [loading, setLoading] = useState(false);
const [items, setItems] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);


  function handleFile(file) {
    if (!file) return;

  const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/jfif",
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

 const handleFileChange = (e) => {
  handleFile(e.target.files[0]);
};
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

 const handleScan = async () => {
  if (!selectedFile) {
    alert("Please upload a receipt first.");
    return;
  }

  try {
    setLoading(true);

    const res = await scanReceipt(selectedFile);

    console.log(res);

    setItems(res.items);

    alert("Receipt scanned successfully");

  } catch (err) {
    console.log(err);
    alert("OCR failed");
  } finally {
    setLoading(false);
  }
};

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
       <UploadCard
  fileInputRef={fileInputRef}
  handleFileChange={handleFileChange}
  handleBrowseClick={handleBrowseClick}
  handleDrop={handleDrop}
  isDragging={isDragging}
  setIsDragging={setIsDragging}
/>

       <UploadPreview
  selectedFile={selectedFile}
  previewUrl={previewUrl}
  handleRemoveFile={handleRemoveFile}
  handleScan={handleScan}
  loading={loading}
/>
      </section>

    <DetectedProducts
  items={items}
  setSelectedProduct={setSelectedProduct}
/>

{selectedProduct && (
  <ProductFormCard
    product={selectedProduct}
  />
)}
    </div>
  );
}

export default ScanReceipt;