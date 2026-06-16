import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page not found | ZeroCard</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to ZeroCard - the crypto card for spending USDT worldwide." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="404 - Page not found | ZeroCard" />
        <meta property="og:description" content="This page doesn't exist on ZeroCard." />
        <meta property="og:url" content={location.pathname} />
      </Helmet>
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
          <p className="mb-4 text-xl text-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </main>
    </>
  );
};

export default NotFound;
