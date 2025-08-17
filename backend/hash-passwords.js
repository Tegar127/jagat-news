// backend/hash-passwords.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function hashExistingPasswords() {
  console.log('Memulai proses hashing password...');
  const users = await prisma.user.findMany();

  for (const user of users) {
    // Cek apakah password sepertinya belum di-hash
    // Password hash dari bcrypt biasanya diawali dengan '$2a$', '$2b$', atau '$2y$' dan panjangnya 60 karakter
    if (!user.password.startsWith('$2') || user.password.length !== 60) {
      console.log(`Hashing password untuk pengguna: ${user.email}...`);
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
      console.log(`Password untuk ${user.email} berhasil di-hash.`);
    } else {
      console.log(`Password untuk ${user.email} sudah di-hash, dilewati.`);
    }
  }

  console.log('Proses hashing selesai.');
}

hashExistingPasswords()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });