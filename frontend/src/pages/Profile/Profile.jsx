import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import {
  Camera,
  Check,
  Edit3,
  ImagePlus,
  Save,
  User,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const DEFAULT_USERNAME = "ShelfLife User";

function createImage(imageSource) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);

    image.src = imageSource;
  });
}

async function getCroppedImage(imageSource, cropPixels) {
  const image = await createImage(imageSource);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas is not supported.");
  }

  const outputSize = 500;

  canvas.width = outputSize;
  canvas.height = outputSize;

  context.drawImage(
    image,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    outputSize,
    outputSize
  );

  return canvas.toDataURL("image/jpeg", 0.9);
}

function Profile() {
  const [savedName, setSavedName] = useState(DEFAULT_USERNAME);
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [isEditingName, setIsEditingName] = useState(false);

  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showCropModal, setShowCropModal] = useState(false);

  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("shelflife_user_name");
    const storedImage = localStorage.getItem("shelflife_profile_image");

    if (storedName) {
      setSavedName(storedName);
      setUsername(storedName);
    }

    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  function showSuccess(message) {
    setSuccessMessage(message);

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  }

  function notifyProfileUpdated() {
    window.dispatchEvent(new Event("shelflife-profile-updated"));
  }

  function handleUsernameSave(event) {
    event.preventDefault();

    const cleanName = username.trim();

    if (!cleanName) {
      alert("Please enter a username.");
      return;
    }

    localStorage.setItem("shelflife_user_name", cleanName);

    setSavedName(cleanName);
    setUsername(cleanName);
    setIsEditingName(false);

    notifyProfileUpdated();
    showSuccess("Username saved successfully.");
  }

  function handleCancelUsername() {
    setUsername(savedName);
    setIsEditingName(false);
  }

  function handleImageSelect(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setShowCropModal(true);
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  }

  function handleCropComplete(_, cropPixels) {
    setCroppedAreaPixels(cropPixels);
  }

  async function handleSavePhoto() {
    if (!selectedImage || !croppedAreaPixels) {
      return;
    }

    try {
      const croppedImage = await getCroppedImage(
        selectedImage,
        croppedAreaPixels
      );

      localStorage.setItem("shelflife_profile_image", croppedImage);

      setProfileImage(croppedImage);
      setShowCropModal(false);
      setSelectedImage("");

      notifyProfileUpdated();
      showSuccess("Profile picture saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to crop the selected image.");
    }
  }

  function closeCropModal() {
    setShowCropModal(false);
    setSelectedImage("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }

  return (
    <>
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
          Profile
        </p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          Manage Your Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Upload your profile picture and update your username.
        </p>
      </header>

      {successMessage && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-700">
          <Check size={21} />

          <p className="font-semibold">{successMessage}</p>
        </div>
      )}

      <section className="mt-8 grid gap-7 xl:grid-cols-[0.85fr_1.5fr]">
        {/* Profile picture card */}

        <article className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-green-100 text-green-700 ring-8 ring-green-50">
            {profileImage ? (
              <img
                src={profileImage}
                alt="User profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <User size={68} />
            )}
          </div>

          <h2 className="mt-7 break-words text-3xl font-bold text-gray-900">
            {savedName}
          </h2>

          <p className="mt-2 text-gray-500">ShelfLife AI User</p>

          <label className="mt-7 flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800">
            <ImagePlus size={20} />
            Upload Profile Picture

            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>

          {profileImage && (
            <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50">
              <Camera size={20} />
              Edit Profile Picture

              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>
          )}
        </article>

        {/* Username card */}

        <article className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Profile Information
          </h2>

          <p className="mt-2 text-gray-500">
            Change the username displayed on your dashboard and profile.
          </p>

          <form onSubmit={handleUsernameSave} className="mt-8">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Username
            </label>

            <div
              className={`flex items-center gap-3 rounded-2xl border px-4 transition ${
                isEditingName
                  ? "border-green-600 bg-white ring-4 ring-green-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <User size={20} className="shrink-0 text-gray-400" />

              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                disabled={!isEditingName}
                placeholder="Enter username"
                className="w-full bg-transparent py-4 outline-none disabled:cursor-not-allowed disabled:text-gray-500"
              />
            </div>

            {!isEditingName ? (
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className="mt-5 flex items-center gap-2 rounded-xl border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
              >
                <Edit3 size={19} />
                Edit Username
              </button>
            ) : (
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCancelUsername}
                  className="flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <X size={19} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                >
                  <Save size={19} />
                  Save Username
                </button>
              </div>
            )}
          </form>
        </article>
      </section>

      {/* Profile picture crop modal */}

      {showCropModal && selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-8">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Profile Picture
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Drag the image and use zoom to adjust the picture.
                </p>
              </div>

              <button
                type="button"
                onClick={closeCropModal}
                className="rounded-xl bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
                aria-label="Close image editor"
              >
                <X size={22} />
              </button>
            </div>

            <div className="relative h-[420px] bg-gray-900">
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4">
                <ZoomOut size={21} className="text-gray-500" />

                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(event) => setZoom(Number(event.target.value))}
                  className="w-full accent-green-700"
                />

                <ZoomIn size={21} className="text-gray-500" />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeCropModal}
                  className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSavePhoto}
                  className="flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                >
                  <Save size={19} />
                  Save Picture
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;