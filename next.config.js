/** @type {import('next').NextConfig} */
const nextConfig = {
    // compiler: {
    //     styledComponents: true,
    // }
    experimental: {
        appDir: true,
      },
      compiler: {
        styledComponents: true,
      },
}

module.exports = nextConfig
