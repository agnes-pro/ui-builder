import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CampaignCard from "@/components/CampaignCard";
import CampaignCardSkeleton from "@/components/skeletons/CampaignCardSkeleton";
import Breadcrumbs from "@/components/Breadcrumbs";
import { mockCampaigns } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Grid3X3, List, Plus, Loader2 } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const ITEMS_PER_PAGE = 6;

export default function Campaigns() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    document.title = "Campaigns | sBTCFund";
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let result = [...mockCampaigns];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }

    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }

    switch (sortBy) {
      case "most-funded":
        result.sort((a, b) => b.raisedAmount - a.raisedAmount);
        break;
      case "ending-soon":
        result.sort((a, b) => a.endsAt.getTime() - b.endsAt.getTime());
        break;
      case "most-backed":
        result.sort((a, b) => b.backerCount - a.backerCount);
        break;
      default:
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return result;
  }, [search, statusFilter, sortBy]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((c) => c + ITEMS_PER_PAGE);
      setLoadingMore(false);
    }, 500);
  };

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, statusFilter, sortBy]);

  return (
    <PageTransition>
    <Layout>
      <div className="container py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Campaigns" }]} />

        {/* Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Campaigns</h1>
            <p className="mt-2 text-muted-foreground">Explore and fund projects building on Bitcoin</p>
          </div>
          <Button asChild className="gap-2 gradient-orange border-0 text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-transform">
            <Link to="/create"><Plus className="h-4 w-4" /> Create Campaign</Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary border-border"
              aria-label="Search campaigns"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40 bg-secondary border-border" aria-label="Filter by status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="funded">Funded</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-44 bg-secondary border-border" aria-label="Sort campaigns">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="most-funded">Most Funded</SelectItem>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
              <SelectItem value="most-backed">Most Backed</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden md:flex gap-1">
            <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("grid")} aria-label="Grid view">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("list")} aria-label="List view">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className={`mt-8 grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <CampaignCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold">No campaigns found</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your filters or create a new campaign</p>
            <Button asChild className="mt-6 gap-2 gradient-orange border-0 text-primary-foreground hover:opacity-90">
              <Link to="/create"><Plus className="h-4 w-4" /> Create Campaign</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className={`mt-8 grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {filtered.slice(0, visibleCount).map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
              {loadingMore && Array.from({ length: 3 }).map((_, i) => (
                <CampaignCardSkeleton key={`loading-${i}`} />
              ))}
            </div>
            {visibleCount < filtered.length && !loadingMore && (
              <div className="mt-10 text-center">
                <Button variant="outline" onClick={handleLoadMore} className="gap-2 border-border">
                  Load More Campaigns
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
    </PageTransition>
  );
}
