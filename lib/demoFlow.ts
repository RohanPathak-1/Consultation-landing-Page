export const DEMO_COMPLETION_KEY = "consultation-demo-completed";

// Direct success-page previews are opt-in. Production visitors should reach
// the confirmation only through the accepted Flodesk submission flow.
export const isLocalDemoMode =
  process.env.NEXT_PUBLIC_LOCAL_DEMO?.trim().toLowerCase() === "true";
