const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 12);

  const user1 = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@example.com1",
      password: hashedPassword,
      role: 2,
      emailVerified: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "user",
      email: "user@example.com2",
      password: hashedPassword,
      role: 1,
      emailVerified: true,
    },
  });

  const book1 = await prisma.book.create({
    data: {
      title: "Book One",
      author: "Author One",
      publicationDate: new Date("2022-01-01"),
      genres: ["Fiction", "Adventure"],
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "Book Two",
      author: "Author Two",
      publicationDate: new Date("2023-01-01"),
      genres: ["Non-Fiction"],
    },
  });

  console.log({ user1, user2, book1, book2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
