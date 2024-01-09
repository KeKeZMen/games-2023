const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      id: "clpl6gb7e000008l45rq9dsxy",
      email: "root@root",
      name: "root",
      password:
        "fbfb386efea67e816f2dda0a8c94a98eb203757aebb3f55f183755a192d44467",
    },
  });

  console.log(user);
}

main().then(async () => await prisma.$disconnect());
