-- Allow German blog posts alongside Russian and English.
ALTER TABLE public.blog_posts
  DROP CONSTRAINT IF EXISTS blog_posts_lang_check;

ALTER TABLE public.blog_posts
  ADD CONSTRAINT blog_posts_lang_check CHECK (lang IN ('ru', 'en', 'de'));
