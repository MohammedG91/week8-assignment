import { db } from "@/util/dbConnection";
import Link from "next/link";

export default async function PostsPage({ searchParams }) {
  const query = await searchParams;
  console.log("searchParams", query);

  const posts = await db.query(`SELECT * FROM posts`);
  console.log(posts);

  const wrangledPosts = posts.rows;
  console.log(wrangledPosts);

  return (
    <>
      <h1>A list of all destinations blogged</h1>
      <div>
        {wrangledPosts.map((destination) => (
          <div key={destination.id}>
            <Link href={`/posts/${destination.id}`}>
              <h2>{destination.destination}</h2>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
