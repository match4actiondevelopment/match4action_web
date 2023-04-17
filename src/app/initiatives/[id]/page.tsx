import VolunteerPost from "@/modules/pages/VolunteerPost";

export default function Page({ params }: { params: { id: string } }) {
  return <VolunteerPost params={params} />;
}
