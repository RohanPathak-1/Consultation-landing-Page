export const DEMO_COMPLETION_KEY = "consultation-demo-completed";

// Keep this explicit so a future production booking flow can disable direct
// success-page previews with NEXT_PUBLIC_LOCAL_DEMO=false.
export const isLocalDemoMode =
  process.env.NEXT_PUBLIC_LOCAL_DEMO?.trim().toLowerCase() !== "false";
