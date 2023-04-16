import { getContentfulData } from "@/modules/contentful/queries/getContentfulPageData";
import GenericPage from "@/modules/pages/GenericPage";
import { GenericPageInterface } from "@/modules/types/types";
import { notFound } from "next/navigation";

export default async function Page({ params }: GenericPageInterface) {
  const data = await getContentfulData(params.slug);

  if (!data) {
    notFound();
  }

  return <GenericPage data={data} />;
}
