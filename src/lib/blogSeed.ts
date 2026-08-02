// Provides prefetched blog data to the components during prerender (SSR module
// global) and during client hydration (inlined window globals), so the blog can
// render server-side and hydrate without a mismatch. Falls back to null, in
// which case the components fetch from Supabase as before.

/* eslint-disable @typescript-eslint/no-explicit-any */
let ssrPosts: any[] | null = null;
let ssrPost: any | null = null;

export function __setBlogSeed(posts: any[] | null, post: any | null) {
  ssrPosts = posts;
  ssrPost = post;
}

export function getSeededPosts(): any[] | null {
  if (ssrPosts) return ssrPosts;
  if (typeof window !== "undefined") {
    const w = window as unknown as { __ZC_BLOG_POSTS__?: any[] };
    if (Array.isArray(w.__ZC_BLOG_POSTS__)) return w.__ZC_BLOG_POSTS__;
  }
  return null;
}

export function getSeededPost(slug?: string): any | null {
  if (ssrPost && (!slug || ssrPost.slug === slug)) return ssrPost;
  if (typeof window !== "undefined") {
    const w = window as unknown as { __ZC_POST__?: any };
    if (w.__ZC_POST__ && (!slug || w.__ZC_POST__.slug === slug)) return w.__ZC_POST__;
  }
  return null;
}
