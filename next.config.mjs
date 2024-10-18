/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // This applies to all routes
          source: '/(.*)',
          headers: [
            {
              key: 'Permissions-Policy',
              value: 'interest-cohort=()', // Disable FLoC or any unnecessary features
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  