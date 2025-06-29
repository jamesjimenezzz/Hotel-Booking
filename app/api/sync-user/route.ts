import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const clerk = await clerkClient();
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    const clerkUser = await clerk.users.getUser(userId);

    user = await prisma.user.create({
      data: {
        id: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.fullName,
        imageUrl: clerkUser.imageUrl,
      },
    });
  }

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
