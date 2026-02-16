import { CircleHelp, ExternalLink, ShieldCheck, Award, Droplets } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const DecantingPopover = () => (
  <Popover>
    <PopoverTrigger asChild>
      <button className="inline-flex items-center justify-center w-6 h-6 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer">
        <CircleHelp className="w-4 h-4" />
      </button>
    </PopoverTrigger>
    <PopoverContent className="w-80 p-5" side="top">
      <h4 className="font-display font-semibold text-foreground mb-2">Mi az a dekantálás?</h4>
      <p className="text-sm text-muted-foreground mb-3">
        A dekantálás során az eredeti parfümös üvegből prémium porlasztós fiolákba töltjük át az illatot — így Te is kipróbálhatod a világ legjobb parfümjeit, töredék áron.
      </p>
      <ul className="space-y-2 mb-4">
        <li className="flex items-start gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>100% eredeti, bontatlan forrásból</span>
        </li>
        <li className="flex items-start gap-2 text-sm text-muted-foreground">
          <Award className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>Minőségellenőrzött folyamat</span>
        </li>
        <li className="flex items-start gap-2 text-sm text-muted-foreground">
          <Droplets className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>Prémium üveg porlasztós fiolák</span>
        </li>
      </ul>
      <a
        href="/rolunk"
        className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
      >
        Részletes információ
        <ExternalLink className="w-3 h-3" />
      </a>
    </PopoverContent>
  </Popover>
);
