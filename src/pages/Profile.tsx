import Layout from "@/components/Layout";
import { useWallet } from "@/contexts/WalletContext";
import { mockCampaigns, mockContributions, truncateAddress, formatSTX } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignCard from "@/components/CampaignCard";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Wallet } from "lucide-react";
import { useState } from "react";
import ConnectWalletModal from "@/components/ConnectWalletModal";

export default function Profile() {
  const { wallet } = useWallet();
  const [connectOpen, setConnectOpen] = useState(false);

  if (!wallet.connected) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
            <Wallet className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold">Connect Your Wallet</h2>
          <p className="mt-2 text-muted-foreground">Connect your wallet to view your profile and campaigns</p>
          <Button onClick={() => setConnectOpen(true)} className="mt-6 gap-2 gradient-orange border-0 text-primary-foreground hover:opacity-90">
            <Wallet className="h-4 w-4" /> Connect Wallet
          </Button>
          <ConnectWalletModal open={connectOpen} onOpenChange={setConnectOpen} />
        </div>
      </Layout>
    );
  }

  const myCampaigns = mockCampaigns.filter((c) => c.creator === wallet.address);
  const myContributions = mockContributions.filter((c) => c.backer === wallet.address);

  return (
    <Layout>
      <div className="container py-12">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-orange text-2xl font-bold text-primary-foreground">
            {wallet.address?.slice(2, 4).toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-display text-2xl font-bold">{truncateAddress(wallet.address!)}</h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <Badge variant="outline" className="border-border font-mono text-xs">Testnet</Badge>
              <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
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
                    <div key={c.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
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
            <div className="py-16 text-center">
              <p className="text-muted-foreground">No activity yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
