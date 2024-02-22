/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
		APP_ID: "330503556658816",
		APP_SECRET: "2c4c3150253b237ab908bfe85d97c5e8",
		MONGO_URI:
			"mongodb+srv://admin:ZIjjWB2ck3TtuwLM@cluster0.mxvf9et.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
		JWT_SECRET: "cvbugnuri0hvurt286356tchneugeugmawialfobfiughcm4"
	}
};

export default nextConfig;
