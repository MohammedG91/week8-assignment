import { db } from "@/util/dbConnection";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SinglePostPage({ params }) {
  const { id } = params;

  // Fetch post by id from the posts table
  const post = await db.query(`SELECT * FROM posts WHERE id = $1`, [id]);

  if (post.rows.length === 0) {
    return <h1>Post not found</h1>;
  }

  const wrangledPost = post.rows[0];

  // Handle comment submission
  async function handleSubmit(formValues) {
    "use server";

    const username = formValues.get("username");
    const comment = formValues.get("comment");
    const postId = id;

    // Insert the comment into the comments table
    db.query(`INSERT INTO comments (post_id, comment) VALUES ($1, $2)`, [
      postId,
      comment,
    ]);

    revalidatePath(`/posts/${postId}`);
    redirect(`/posts/${postId}`);
  }

  // Fetch comments related to this post
  const comments = await db.query(`SELECT * FROM comments WHERE post_id = $1`, [
    id,
  ]);

  const wrangledComments = comments.rows;

  return (
    <div>
      <h1>{wrangledPost.destination}</h1>
      <p>{wrangledPost.message}</p>

      <Link href="/posts">Back to Posts</Link>

      <form action={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="comment">Comment</label>
        <textarea id="comment" name="comment" required></textarea>

        <button type="submit">Submit Comment</button>
      </form>

      {wrangledComments.length > 0 ? (
        wrangledComments.map((comment) => (
          <div key={comment.id}>
            <h3>{comment.username}</h3>
            <p>{comment.comment}</p>
          </div>
        ))
      ) : (
        <p>No comments yet on this destination.</p>
      )}
    </div>
  );
}
