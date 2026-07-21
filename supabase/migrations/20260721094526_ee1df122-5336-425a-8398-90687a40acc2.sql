DROP POLICY IF EXISTS "Anyone can delete blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can update blog posts" ON public.blog_posts;
-- Keep public SELECT policy for readable blog. Writes only via service_role (edge function/admin), which bypasses RLS.
REVOKE INSERT, UPDATE, DELETE ON public.blog_posts FROM anon, authenticated;