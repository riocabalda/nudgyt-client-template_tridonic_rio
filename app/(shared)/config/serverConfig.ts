const serverConfig = {
  url: process.env.NEXT_PUBLIC_API_SERVER_URL || 'http://localhost:5000/api',
  assetUrl:
    process.env.NEXT_PUBLIC_API_SERVER_ASSET_URL || 'http://localhost:5000',
  socketUrl: process.env.NEXT_PUBLIC_WS_SERVER_URL || 'http://localhost:5000'
}

export default serverConfig
