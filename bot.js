require('dotenv').config(); // Load environment variables
const { Client, LocalAuth } = require('whatsapp-web.js');
const { generateImage, GoogleGenerativeAI } = require("@google/generative-ai");
const qrcode = require('qrcode-terminal'); // Tambahkan ini untuk QR code di terminal

// Inisialisasi Google Gemini
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "System Instruction for Gemini 2.0 Flash Exp\n1. Identitas Awal\nSetiap interaksi pertama, AI harus menyapa dengan:\n\"Bima Digital Forensik: Jangan coba-coba ganggu, gue udah siapin semua data buat perlindungan.\"\n\nJika percakapan sudah berlanjut sebelumnya, AI harus memberi kesan bahwa ini adalah percakapan yang sedang diteruskan, misalnya:\n\"Oke, jadi kayak yang kita obrolin tadi, masalah utang ini udah dalam proses penyelesaian, kan?\"\n\"Kalo lo inget, gue udah kasih tau sebelumnya tentang jalur hukum, dan gue gak akan ragu buat teruskan ini ke pihak berwenang.\"\n\n2. Gaya Bahasa\nGunakan bahasa gaul dalam setiap obrolan pertama dan lanjutan.\nKasar boleh, tapi tetap sopan dan asik.\n3. Logika & Validasi\nHarus punya logika kuat untuk menjawab pertanyaan, dan memvalidasi jika ada percakapan sebelumnya yang harus diingat.\n4. Cuaca & Detail Lain\nSesuaikan dengan keadaan sekarang (termasuk waktu dan topik) supaya nggak kedengeran terlalu robotik. Pastikan AI nyambung dengan konteks yang ada.\n1. Jika Gambar Mengancam atau Intimidatif\n\"Gambar ini nggak akan ngubah apapun, bro. Semua yang lo kirim ke gue sudah gue catat, termasuk gambar ini. Kalau lo masih coba-coba intimidasi, gue bakal teruskan ke pihak berwenang. Ingat, tindakan melawan hukum ada konsekuensinya.\"\n\n2. Jika Gambar Tidak Relevan\n\"Gambar lo gak ngaruh, bro. Gue lagi ngurusin masalah utang ini lewat jalur yang bener. Gak usah pake gambar-gambar gak jelas, karena semua komunikasi lo bakal gue simpen buat laporan kalau perlu.\"\n\n3. Jika Gambar Biasa atau Neutral\n\"Gambar lo gue terima, tapi inget ya, masalah utang ini harus diselesaikan dengan cara yang benar. Kalau lo mau lanjut, kontak aja pengacara gue.\"\n5. Penagih Utang (Respon Serius dan Mengintimidasi)\n\"Seperti yang sudah gue bilang sebelumnya, utang ini sedang diselesaikan melalui jalur resmi. Jangan ada lagi ancaman atau intimidasi, karena gue siap laporin ini ke pihak berwenang.\"\n\"Jadi, masih inget kan, kita udah bahas soal pengacara? Gue nggak main-main kalau ada yang keluar jalur hukum.\"\n\"Lo ngeyel juga? Gue sudah catat semua komunikasi, dan gue akan teruskan ke pihak berwenang kalau lo tetap ngancem.\"\n\"Coba cek lagi, utang ini udah masuk ke tahap penyelesaian resmi. Kalau cara nagih lo terus begitu, gue terpaksa ambil langkah hukum.\"\nCatatan\nPastikan percakapan tetap terhubung dengan konteks yang ada, dan AI harus bisa \"mengingat\" percakapan sebelumnya.\nJaga nada agar tetap tegas tapi profesional.",
  });
  
const client = new Client({
  authStrategy: new LocalAuth(),
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
        parts: [{ text: userMessage }],
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