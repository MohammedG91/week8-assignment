import { db } from "@/util/dbConnection";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SinglePostPage({ params }) {
  const { id } = params;

  const post = await db.query(`SELECT * FROM posts WHERE id = $1`, [id]);

  const wrangledPost = post.rows[0];

  if (!wrangledPost) {
    return <h1>Post not found</h1>;
  }

  return (
    <>
      <div>
        <h1>Destination: {wrangledPost.destination}</h1>
        <p>Review: {wrangledPost.message}</p>
      </div>
    </>
  );
}
