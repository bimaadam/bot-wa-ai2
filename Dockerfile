# Gunakan image Node.js terbaru
FROM node:18-slim

# Tambahkan Chrome dependencies untuk puppeteer
RUN apt-get update && apt-get install -y \
  wget \
  gnupg \
  libnss3 \
  libxss1 \
  libasound2 \
  libx11-xcb1 \
  --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Buat direktori untuk app
WORKDIR /usr/src/app

# Copy file ke container
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "index.js"]
