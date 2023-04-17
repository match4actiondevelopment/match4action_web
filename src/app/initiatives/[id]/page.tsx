import VolunteerPost from "@/modules/pages/VolunteerPost";
import { fetchInitiative } from "@/modules/services";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await fetchInitiative(params.id);

  return {
    title: data ? `Match4purpose - ${data?.initiativeName} Initiative` : "",
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <VolunteerPost params={params} />;
}
