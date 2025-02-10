import { db } from "@/util/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewDestinationPage() {
  async function handleSubmit(formValues) {
    "use server";

    const person = formValues.get("person");
    const destination = formValues.get("destination");
    const message = formValues.get("message");

    db.query(
      `INSERT INTO posts (person, destination, message) VALUES ($1, $2, $3)`,
      [person, destination, message]
    );

    revalidatePath("/posts");

    redirect("/posts");
  }

  return (
    <>
      <h1>Add a new destination to the website</h1>
      <form action={handleSubmit}>
        <label htmlFor="person">Your name: </label>
        <input
          type="text"
          name="person"
          id="person"
          placeholder="Write your name here"
          required
        />
        <label htmlFor="destination">Destination: </label>
        <input
          type="text"
          name="destination"
          id="destination"
          placeholder="Write your destination here"
          required
        />
        <label htmlFor="message">Your message: </label>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Write your message here"
          required
        />
        <button type="submit"> Submit new destination </button>
      </form>
    </>
  );
}
