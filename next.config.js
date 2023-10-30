/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // CDN à rajouter pour les images en https
    images: {
        domains: ["images.unsplash.com", "pexels.com", "static.lacapsule.academy", "ieminc.org", "tailwindui.com", "3.bp.blogspot.com", "res.cloudinary.com"],
    },

    env: {
        backendserver: "https://neoneydev1-backend.vercel.app",
        // backendserver: "http://localhost:3000",

    },
};

module.exports = nextConfig;
