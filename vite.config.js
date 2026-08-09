import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const razorpayKeyId = env.VITE_RAZORPAY_KEY_ID || env.RAZORPAY_KEY_ID || "";

  return {
    define: {
      "import.meta.env.VITE_RAZORPAY_KEY_ID": JSON.stringify(razorpayKeyId),
    },
    plugins: [react()],
    server: {
      host: "0.0.0.0",
    },
  };
});
