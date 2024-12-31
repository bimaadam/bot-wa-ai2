FROM node:18-slim

# Install dependencies termasuk Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    fonts-liberation \
    xdg-utils \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Set Puppeteer untuk skip download Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Copy package.json terlebih dahulu agar cache dimanfaatkan
COPY package.json package-lock.json ./
RUN npm install

# Copy seluruh source code
COPY . .

CMD ["npm", "start"]
