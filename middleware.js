// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher([
//   "/dashboard(.*)",
//   "/events(.*)",
//   "/meetings(.*)",
//   "/availability(.*)",
// ]);

// export default clerkMiddleware((auth, req) => {
//   if (!auth().userId && isProtectedRoute(req)) {
//     // Add custom logic to run before redirecting

//     return auth().redirectToSignIn();
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/events(.*)",
  "/meetings(.*)",
  "/availability(.*)",
]);

// Clerk middleware to handle authentication
export default clerkMiddleware(async (auth, req) => {
  const user = await auth(); // Ensure we await the auth() function

  // Check if the user is authenticated and if the route is protected
  if (!user.userId && isProtectedRoute(req)) {
    // Redirect to the sign-in page if the user is not authenticated
    return user.redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};


