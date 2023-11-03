/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // CDN à rajouter pour les images en https
    images: {
        domains: [
            "i.ebayimg.com",
            "images.unsplash.com",
            "pexels.com",
            "static.lacapsule.academy",
            "ieminc.org",
            "tailwindui.com",
            "3.bp.blogspot.com",
            "res.cloudinary.com",
            "entreprendre2024cegrandest.fr",
            "www.entrepreneur-liberte.com",
            "www.e-couveuz.fr",
            "upload.wikimedia.org",
            "pole-autoentrepreneur.com",
        ],
    },

    env: {
        // backendserver: "https://neoneydev1-backend.vercel.app",
        backendserver: "http://localhost:3000",
    },
};

module.exports = nextConfig;
