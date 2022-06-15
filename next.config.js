module.exports = {
  rewrites: async () => {
    return [{ source: "/", destination: "/root" }];
  },
  experimental: {
    nftTracing: true,
  },
};
