import Link from "next/link";

export default function () {
  return (
    <header>
      <h1>Travel reviews</h1>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/destination"}>Destinations</Link>
        <Link href={"/addDestination"}>Add Destination</Link>
      </nav>
    </header>
  );
}
