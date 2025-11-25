"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TestRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the actual test page
    router.replace("/ikigai-demo");
  }, [router]);

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh",
      fontSize: "18px"
    }}>
      Redirecting to test...
    </div>
  );
}
