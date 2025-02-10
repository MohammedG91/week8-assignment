import Link from "next/link";

export default function () {
  return (
    <header>
      <h1>Travel reviews</h1>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/posts"}>Destinations</Link>
        <Link href={"/newPosts"}>Add Destination</Link>
      </nav>
    </header>
  );
}
