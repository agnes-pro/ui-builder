import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CampaignCard from "@/components/CampaignCard";
import { mockCampaigns } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Grid3X3, List, Plus } from "lucide-react";
import { CampaignStatus } from "@/types/campaign";

export default function Campaigns() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Campaigns</h1>
            <p className="mt-2 text-muted-foreground">Explore and fund projects building on Bitcoin</p>
          </div>
          <Button asChild className="gap-2 gradient-orange border-0 text-primary-foreground hover:opacity-90">
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
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40 bg-secondary border-border">
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
            <SelectTrigger className="w-full md:w-44 bg-secondary border-border">
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
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
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
          <div className={`mt-8 grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filtered.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
