import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords match nahi kar rahe.");
      return;
    }

    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    localStorage.setItem("shelflife_user", JSON.stringify(userData));
    localStorage.setItem("shelflife_token", "temporary_frontend_token");

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

            <h1 className="mt-16 text-5xl font-bold leading-tight">
              Start tracking your food the smart way.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-green-50">
              Create your account, scan receipts and receive personalized expiry
              information.
            </p>
          </div>

          <p className="text-sm text-green-100">
            Your statistics will appear after you add real inventory items.
          </p>
        </div>

        <div className="p-8 sm:p-12">
          <Link
            to="/"
            className="text-sm font-semibold text-green-700 hover:text-green-800"
          >
            ← Back to home
          </Link>

          <div className="mt-8">
            <p className="font-semibold uppercase tracking-[0.2em] text-green-700">
              New Account
            </p>

            <h1 className="mt-3 text-4xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="mt-3 text-gray-500">
              Register to start managing your food inventory.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full name
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 focus-within:border-green-600">
                <UserRound size={20} className="text-gray-400" />

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="registerEmail"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 focus-within:border-green-600">
                <Mail size={20} className="text-gray-400" />

                <input
                  id="registerEmail"
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
                htmlFor="registerPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 focus-within:border-green-600">
                <LockKeyhole size={20} className="text-gray-400" />

                <input
                  id="registerPassword"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Confirm password
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 focus-within:border-green-600">
                <LockKeyhole size={20} className="text-gray-400" />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter password again"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#0B6B3A] py-4 font-bold text-white transition hover:bg-[#075C36]"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-green-700 hover:text-green-800"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;