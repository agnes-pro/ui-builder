import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Campaign } from "@/types/campaign";
import { truncateAddress, formatSTX, getDaysLeft, getProgressPercentage } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";

const statusColors: Record<string, string> = {
  active: "bg-success/20 text-success border-success/30",
  funded: "bg-primary/20 text-primary border-primary/30",
  completed: "bg-cyan/20 text-cyan border-cyan/30",
  failed: "bg-destructive/20 text-destructive border-destructive/30",
};

const MotionLink = motion.create(Link);

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const cardVariants = {
  hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const progress = getProgressPercentage(campaign.raisedAmount, campaign.goalAmount);
  const daysLeft = getDaysLeft(campaign.endsAt);

  return (
    <MotionLink
      to={`/campaign/${campaign.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Campaign: ${campaign.title}, ${progress}% funded`}
      variants={cardVariants}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -6,
              scale: 1.02,
              boxShadow: "0 20px 40px -12px hsl(var(--primary) / 0.15)",
            }
      }
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={campaign.imageUrl}
          alt={campaign.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          fallbackClassName="h-full w-full"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`${statusColors[campaign.status]} border text-xs capitalize`}>
            {campaign.status}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {campaign.title}
        </h3>

        <p className="text-sm text-muted-foreground font-mono">
          by {truncateAddress(campaign.creator)}
        </p>

        {/* Progress */}
        <div className="mt-auto space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full gradient-orange transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-foreground">
              {formatSTX(campaign.raisedAmount)} <span className="text-muted-foreground font-normal">STX</span>
            </span>
            <span className="text-muted-foreground">
              of {formatSTX(campaign.goalAmount)} STX
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {campaign.backerCount} backers
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
          </span>
        </div>
      </div>
    </MotionLink>
  );
}
