# Gunakan Node.js base image
FROM node:18-buster

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies dan Chromium (buat Puppeteer)
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libgbm1 \
    libnspr4 \
    libnss3 \
    lsb-release \
    wget \
    xdg-utils \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/* && \
    npm install

# Copy semua file project ke container
COPY . .

# Set environment variable untuk Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Expose port (Railway secara default baca variabel PORT)
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "index.js"]
