import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/contexts/WalletContext";
import { Campaign } from "@/types/campaign";
import { formatSTX, getProgressPercentage } from "@/data/mockData";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign;
}

export default function ContributeModal({ open, onOpenChange, campaign }: Props) {
  const { wallet } = useWallet();
  const [amount, setAmount] = useState("");
  const progress = getProgressPercentage(campaign.raisedAmount, campaign.goalAmount);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Contribute to Campaign</DialogTitle>
          <DialogDescription className="text-muted-foreground">{campaign.title}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">{formatSTX(campaign.raisedAmount)} raised</span>
              <span className="text-muted-foreground">of {formatSTX(campaign.goalAmount)} STX</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full gradient-orange" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Amount (STX)</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-16 bg-secondary border-border text-lg font-mono"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">STX</span>
            </div>
            {wallet.connected && (
              <p className="mt-2 text-xs text-muted-foreground">
                Balance: <span className="font-mono text-foreground">{formatSTX(wallet.balance)} STX</span>
              </p>
            )}
          </div>

          {/* Fee estimate */}
          <div className="rounded-lg bg-secondary p-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Transaction fee</span>
              <span className="font-mono">~0.01 STX</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 border-border" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="flex-1 gradient-orange border-0 text-primary-foreground hover:opacity-90"
              disabled={!amount || Number(amount) <= 0}
            >
              Contribute
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
