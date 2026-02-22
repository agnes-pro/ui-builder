import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Search } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const NotFound = () => {
  return (
    <Layout>
      <div className="container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <div className="animate-fade-in-up">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10">
            <span className="font-display text-5xl font-bold text-primary">404</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="gap-2 gradient-orange border-0 text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-transform">
              <Link to="/"><Home className="h-4 w-4" /> Go Home</Link>
            </Button>
            <Button asChild variant="outline" className="gap-2 border-border">
              <Link to="/campaigns"><Search className="h-4 w-4" /> Explore Campaigns</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
