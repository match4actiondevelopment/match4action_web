import { getContentfulData } from "@/modules/contentful/queries/getContentfulPageData";
import { notFound } from "next/navigation";
import GenericPage from "../modules/pages/GenericPage";

export default async function Page() {
  const data = await getContentfulData("home");

  if (!data) {
    notFound();
  }

  return <GenericPage data={data} />;
}
