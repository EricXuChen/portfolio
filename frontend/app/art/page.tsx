import { redirect } from "next/navigation";

/* Old address from the first version of the site. */
export default function OldArtPage() {
  redirect("/artwork");
}
