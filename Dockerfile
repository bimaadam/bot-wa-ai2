# Gunakan image Node.js terbaru
FROM node:18-slim

# Tambahkan Chrome dependencies untuk puppeteer
RUN apt-get update && apt-get install -y \
  libgobject-2.0-0 \
  libglib2.0-0 \
  libnss3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libxcomposite1 \
  libxrandr2 \
  libgbm1 \
  libasound2 \
  libpangocairo-1.0-0 \
  libxdamage1 \
  libxshmfence1 \
  libxcb-dri3-0 \
  libdbus-glib-1-2 \
  && apt-get clean && rm -rf /var/lib/apt/lists/*


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
