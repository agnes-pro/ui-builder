import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useWallet } from "@/contexts/WalletContext";
import { mockCampaigns, mockContributions, mockActivities, truncateAddress, formatSTX } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignCard from "@/components/CampaignCard";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Wallet, Coins, Rocket, CheckCircle, RefreshCw } from "lucide-react";
import ConnectWalletModal from "@/components/ConnectWalletModal";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";

const activityIcons: Record<string, React.ElementType> = {
  created: Rocket,
  contributed: Coins,
  milestone: CheckCircle,
  refund: RefreshCw,
};

export default function Profile() {
  const { wallet } = useWallet();
  const [connectOpen, setConnectOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "My Profile | sBTCFund";
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const copyAddress = async () => {
    if (wallet.address) {
      await navigator.clipboard.writeText(wallet.address);
      toast({ title: "Address copied", description: "Wallet address copied to clipboard" });
    }
  };

  if (!wallet.connected) {
    return (
      <PageTransition>
      <Layout>
        <div className="container py-20 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
            <Wallet className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold">Connect Your Wallet</h2>
          <p className="mt-2 text-muted-foreground">Connect your wallet to view your profile and campaigns</p>
          <Button onClick={() => setConnectOpen(true)} className="mt-6 gap-2 gradient-orange border-0 text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-transform">
            <Wallet className="h-4 w-4" /> Connect Wallet
          </Button>
          <ConnectWalletModal open={connectOpen} onOpenChange={setConnectOpen} />
        </div>
      </Layout>
      </PageTransition>
    );
  }

  if (loading) {
    return (
      <Layout>
        <ProfileSkeleton />
      </Layout>
    );
  }

  const myCampaigns = mockCampaigns.filter((c) => c.creator === wallet.address);
  const myContributions = mockContributions.filter((c) => c.backer === wallet.address);

  return (
    <PageTransition>
    <Layout>
      <div className="container py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My Profile" }]} />

        {/* Profile Header */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-orange text-2xl font-bold text-primary-foreground">
            {wallet.address?.slice(2, 4).toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-display text-2xl font-bold">{truncateAddress(wallet.address!)}</h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <Badge variant="outline" className="border-border font-mono text-xs">Testnet</Badge>
              <button onClick={copyAddress} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-ring rounded" aria-label="Copy wallet address">
                <Copy className="h-3 w-3" /> Copy
              </button>
              <a href="#" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                <ExternalLink className="h-3 w-3" /> Explorer
              </a>
            </div>
            <p className="mt-3 font-mono text-lg font-semibold text-foreground">
              {formatSTX(wallet.balance)} <span className="text-muted-foreground text-sm font-normal">STX</span>
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="campaigns" className="mt-10">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
            <TabsTrigger value="contributions">My Contributions</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="mt-6">
            {myCampaigns.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-muted-foreground">You haven't created any campaigns yet</p>
                <Button asChild className="mt-4 gap-2 gradient-orange border-0 text-primary-foreground hover:opacity-90">
                  <a href="/create">Create Your First Campaign</a>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myCampaigns.map((c) => <CampaignCard key={c.id} campaign={c} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="contributions" className="mt-6">
            {myContributions.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-muted-foreground">You haven't contributed to any campaigns yet</p>
                <Button asChild className="mt-4 gap-2 gradient-orange border-0 text-primary-foreground hover:opacity-90">
                  <a href="/campaigns">Explore Campaigns</a>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {myContributions.map((c) => {
                  const campaign = mockCampaigns.find((camp) => camp.id === c.campaignId);
                  return (
                    <div key={c.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50">
                      <div>
                        <p className="font-semibold text-foreground">{campaign?.title || "Unknown"}</p>
                        <p className="text-xs text-muted-foreground">{c.timestamp.toLocaleDateString()}</p>
                      </div>
                      <span className="font-mono font-semibold text-primary">{formatSTX(c.amount)} STX</span>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <div className="space-y-4">
              {mockActivities.map((activity) => {
                const Icon = activityIcons[activity.type] || Coins;
                return (
                  <div key={activity.id} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50">
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      activity.type === "contributed" ? "bg-primary/10 text-primary" :
                      activity.type === "created" ? "bg-success/10 text-success" :
                      activity.type === "milestone" ? "bg-cyan/10 text-cyan" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.description}</p>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{activity.timestamp.toLocaleDateString()}</span>
                        {activity.amount && (
                          <span className="font-mono text-xs font-semibold text-primary">{formatSTX(activity.amount)} STX</span>
                        )}
                      </div>
                    </div>
                    <a href="#" className="text-xs text-muted-foreground hover:text-primary" aria-label="View on explorer">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
