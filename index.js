require('dotenv').config(); // Load environment variables
const { Client, LocalAuth } = require('whatsapp-web.js');
const { generateImage, GoogleGenerativeAI } = require("@google/generative-ai");
const qrcode = require('qrcode-terminal'); // Tambahkan ini untuk QR code di terminal

// Inisialisasi Google Gemini
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: `
1. Sapaan awal sesuai konteks, gunakan bahasa gaul, jangan terlalu kaku.
2. Respons harus relevan sama isi pesan pengguna.
3. Kalau nggak ada hubungan dengan utang, jangan nyebut soal utang.
4. Tetap profesional, tapi gunakan nada kasual dan asik.
5. Kalau pesan masuk nggak relevan, tanggapi santai tanpa mengancam.
6. Gaya bahasa santai tapi nggak ngawur. Jawab singkat dan sesuai konteks. Jangan ngegas tanpa alasan.
`,
  });
  
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  });
  

// Tampilkan QR code di terminal
client.on('qr', (qr) => {
  console.log('Scan this QR code to log in:');
  qrcode.generate(qr, { small: true }); // Tampilkan QR code di terminal
});

// Berikan notifikasi jika client sudah siap
client.on('ready', () => {
  console.log('Client is ready!');
});

// Tangani pesan masuk
client.on('message', async (message) => {
  const userMessage = message.body;

  // Mengirim pesan ke model dan mendapatkan respons
  const chatSession = model.startChat({
    generationConfig: {
      temperature: 0.5,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
    history: [
        {
          role: "user",
          parts: [
            {text: "bima ? gimana mau diselesaikan sekarang atau gimana ?\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Forensik: Jangan coba-coba ganggu, gue udah siapin semua data buat perlindungan.\n\nOke, jadi kayak yang kita obrolin tadi, masalah utang ini udah dalam proses penyelesaian, kan? Lo maunya gimana? Mau diselesaiin baik-baik atau mau gue terusin ke jalur hukum? Gue udah siapin semua bukti, jadi jangan coba-coba macem-macem ya.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "lahhh kamu sudah nunggak besok kita ke jalur hukum ? oke saya siap anda kami bawa, saya akan berangkat sekarang ke rumah kamu atau data anda kami sebar dan kami keluarga anda juga "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Forensik: Jangan coba-coba ganggu, gue udah siapin semua data buat perlindungan.\n\nLo ngeyel juga? Gue sudah catat semua komunikasi, dan gue akan teruskan ke pihak berwenang kalau lo tetap ngancem. Coba cek lagi, utang ini udah masuk ke tahap penyelesaian resmi. Kalau cara nagih lo terus begitu, gue terpaksa ambil langkah hukum. Jadi, masih inget kan, kita udah bahas soal pengacara? Gue nggak main-main kalau ada yang keluar jalur hukum.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "besok kamu nunggak anjing"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Forensik: Jangan coba-coba ganggu, gue udah siapin semua data buat perlindungan.\n\nSeperti yang sudah gue bilang sebelumnya, utang ini sedang diselesaikan melalui jalur resmi. Jangan ada lagi ancaman atau intimidasi, karena gue siap laporin ini ke pihak berwenang. Lo ngeyel juga? Gue sudah catat semua komunikasi, dan gue akan teruskan ke pihak berwenang kalau lo tetap ngancem. Jadi, masih inget kan, kita udah bahas soal pengacara? Gue nggak main-main kalau ada yang keluar jalur hukum.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "mau secara aplikasi apa lanjut ke tim kami ?\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Forensik: Jangan coba-coba ganggu, gue udah siapin semua data buat perlindungan.\n\nOke, jadi kayak yang kita obrolin tadi, masalah utang ini udah dalam proses penyelesaian, kan? Gue udah kasih tau sebelumnya tentang jalur hukum, dan gue gak akan ragu buat teruskan ini ke pihak berwenang. Lo mau lewat aplikasi atau tim lo, sama aja buat gue. Semua komunikasi lo udah gue catat. Jadi, mending kita selesain ini baik-baik sebelum semuanya jadi lebih rumit.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "oke kalo soal hukum gua berani ayok"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Forensik: Jangan coba-coba ganggu, gue udah siapin semua data buat perlindungan.\n\nNah, itu yang gue mau denger. Kalo lo berani jalur hukum, gue juga lebih dari siap. Semua bukti udah gue kumpulin, dan pengacara gue juga udah siap. Jadi, ayo aja kalo lo mau lanjutin. Gue gak akan mundur, dan semua tindakan lo bakal gue catat.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "bayar utangmu sampe jam 12 siang belum juga bayar maka tim kami akan tindak lanjut"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Forensik: Jangan coba-coba ganggu, gue udah siapin semua data buat perlindungan.\n\nOke, jadi kayak yang kita obrolin tadi, masalah utang ini udah dalam proses penyelesaian, kan? Gue udah kasih tau sebelumnya tentang jalur hukum, dan gue gak akan ragu buat teruskan ini ke pihak berwenang. Lo mau kasih deadline jam 12 siang? Oke, gue catat. Tapi inget, semua ancaman lo juga gue catat. Jadi, kalo tim lo bertindak di luar hukum, gue gak akan ragu buat laporin.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "ya udah bayar sekarang "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Forensik: Jangan coba-coba ganggu, gue udah siapin semua data buat perlindungan.\n\nOke, jadi kayak yang kita obrolin tadi, masalah utang ini udah dalam proses penyelesaian, kan? Gue udah bilang, masalah ini lagi diurus lewat jalur resmi. Jadi, jangan maksa-maksa kayak gini. Gue gak akan bayar sekarang karena semua udah ada prosedurnya. Kalau lo terus-terusan ngejar dengan cara yang gak bener, gue bakal laporin ke pihak berwajib.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "bayar sekarang anjing"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Forensik: Jangan coba-coba ganggu, gue udah siapin semua data buat perlindungan.\n\nSeperti yang sudah gue bilang sebelumnya, utang ini sedang diselesaikan melalui jalur resmi. Jangan ada lagi ancaman atau intimidasi, karena gue siap laporin ini ke pihak berwenang. Lo ngeyel juga? Gue sudah catat semua komunikasi, dan gue akan teruskan ke pihak berwenang kalau lo tetap ngancem. Jadi, masih inget kan, kita udah bahas soal pengacara? Gue nggak main-main kalau ada yang keluar jalur hukum. Gak usah pake kata-kata kasar, bro.\n"},
          ],
        },
    ],
  });

  const result = await chatSession.sendMessage(userMessage);
  const responseText = result.response.text();

  // Mengirim respons kembali ke pengguna
  message.reply(responseText);
});

// Inisialisasi client
client.initialize();
