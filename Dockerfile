# Gunakan Node.js base image
FROM node:18-buster

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies (termasuk Chromium buat Puppeteer)
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/* && \
    npm install

# Copy semua file project ke container
COPY . .

# Set environment variable untuk Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Jalankan aplikasi
CMD ["node", "index.js"]
