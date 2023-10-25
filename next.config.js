/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // CDN à rajouter pour les images en https
    images: {
        domains: ["images.unsplash.com", "pexels.com", "lacapsule.academy", "ieminc.org"],
    },

    env: {
        backendserver: "https://neoneydev1-backend.vercel.app",
        //  backendserver: 'http://localhost:3000',
    },
};

module.exports = nextConfig;
