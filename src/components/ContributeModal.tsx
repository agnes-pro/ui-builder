import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/contexts/WalletContext";
import { Campaign } from "@/types/campaign";
import { formatSTX, getProgressPercentage } from "@/data/mockData";
import { STX_USD_RATE, getProgressColor } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign;
  onContribute?: (amount: string) => void;
}

export default function ContributeModal({ open, onOpenChange, campaign, onContribute }: Props) {
  const { wallet } = useWallet();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const progress = getProgressPercentage(campaign.raisedAmount, campaign.goalAmount);

  const validate = (): boolean => {
    const num = Number(amount);
    if (!amount || num <= 0) {
      setError("Please enter a valid amount");
      return false;
    }
    if (wallet.connected && num > wallet.balance) {
      setError("Amount exceeds your wallet balance");
      return false;
    }
    setError("");
    return true;
  };

  const handleContribute = () => {
    if (!validate()) return;
    onContribute?.(amount);
    setAmount("");
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) { setError(""); setAmount(""); } }}>
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
              <div className="h-full rounded-full gradient-orange transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="contribute-amount" className="text-sm font-medium text-foreground mb-2 block">Amount (STX)</label>
            <div className="relative">
              <Input
                id="contribute-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(""); }}
                className={`pr-16 bg-secondary border-border text-lg font-mono ${error ? "border-destructive" : ""}`}
                aria-invalid={!!error}
                aria-describedby={error ? "contribute-error" : undefined}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">STX</span>
            </div>
            {error && (
              <p id="contribute-error" className="mt-1 text-xs text-destructive">{error}</p>
            )}
            {wallet.connected && !error && (
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
              className="flex-1 gradient-orange border-0 text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-transform"
              disabled={!wallet.connected}
              onClick={handleContribute}
            >
              {wallet.connected ? "Contribute" : "Connect Wallet First"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
