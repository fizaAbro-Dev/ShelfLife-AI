import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
  event.preventDefault();

  const savedUser = JSON.parse(
    localStorage.getItem("shelflife_user") || "null"
  );

  if (!savedUser) {
    alert("Account not found. Please create an account first.");
    navigate("/register");
    return;
  }

  const enteredEmail = formData.email.trim().toLowerCase();
  const registeredEmail = savedUser.email.trim().toLowerCase();

  if (
    registeredEmail !== enteredEmail ||
    savedUser.password !== formData.password
  ) {
    alert("Email ya password ghalat hai.");
    return;
  }

  localStorage.setItem("shelflife_token", "temporary_frontend_token");

  // Registered account ka exact name use hoga
  localStorage.setItem("shelflife_user_name", savedUser.name.trim());

  // Dusre user ki purani picture show nahi hogi
  localStorage.removeItem("shelflife_profile_image");

  window.dispatchEvent(new Event("shelflife-profile-updated"));

  navigate("/dashboard");
}
     
     
     return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F8F5] px-5 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-[#075C36] to-[#79B83E] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                🌿
              </div>

              <div>
                <h2 className="text-2xl font-bold">ShelfLife AI</h2>
                <p className="text-sm text-green-100">
                  Scan. Track. Cook. Save.
                </p>
              </div>
            </div>

            <h1 className="mt-20 text-5xl font-bold leading-tight">
              Welcome back to smarter food management.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-green-50">
              Login to manage your inventory, track expiry dates and reduce food
              waste.
            </p>
          </div>

          <p className="text-sm text-green-100">
            Your dashboard data stays connected to your own account.
          </p>
        </div>

        <div className="p-8 sm:p-12">
          <Link
            to="/"
            className="text-sm font-semibold text-green-700 hover:text-green-800"
          >
            ← Back to home
          </Link>

          <div className="mt-10">
            <p className="font-semibold uppercase tracking-[0.2em] text-green-700">
              Account Login
            </p>

            <h1 className="mt-3 text-4xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="mt-3 text-gray-500">
              Enter your registered details to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-9 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 focus-within:border-green-600">
                <Mail size={20} className="text-gray-400" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 focus-within:border-green-600">
                <LockKeyhole size={20} className="text-gray-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-transparent py-4 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="text-gray-400"
                  aria-label="Show or hide password"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#0B6B3A] py-4 font-bold text-white transition hover:bg-[#075C36]"
            >
              Login
            </button>
          </form>

          <p className="mt-7 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-green-700 hover:text-green-800"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;