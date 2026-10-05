import VolunteerOnly from "@/modules/components/VolunteerOnly";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <VolunteerOnly>{children}</VolunteerOnly>;
}