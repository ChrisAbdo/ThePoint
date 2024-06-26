import DisplayPosts from "@/components/profile/display-posts";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth/next";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  const posts = await prisma.point.findMany({
    where: {
      authorId: session?.user?.id,
    },
    include: {
      author: true,
    },
  });
  return (
    <div>
      <h1>Profile</h1>
      <h2>Posts</h2>
      {/* <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
            <h1>{JSON.stringify(post.content)}</h1>
          </li>
        ))}
      </ul> */}
      <DisplayPosts posts={posts} />
    </div>
  );
}
