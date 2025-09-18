import { getContentfulData } from "@/modules/contentful/queries/getContentfulPageData";
import GenericPage from "@/modules/pages/GenericPage";
import { GenericPageInterface } from "@/modules/types/types";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getContentfulData(params.slug);

  return {
    title: data ? data?.fields?.pageTitle : "",
  };
}

export default async function Page({ params }: GenericPageInterface) {
  const data = await getContentfulData(params.slug);

  if (!data) {
    notFound();
  }

  return <GenericPage data={data} />;
}
