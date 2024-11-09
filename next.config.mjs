/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({
            "utf-8-validate" : "commonjs utf-8-validate",
            bufferutil : "commonjs bufferutil"
        })
        return config;
    },
    images:{
        domains: ['lh3.googleusercontent.com', 'adoring-poitras.212-72-171-49.plesk.page'],
    },
};

export default nextConfig;
