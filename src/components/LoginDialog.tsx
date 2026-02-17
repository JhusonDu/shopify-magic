import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { User } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-2 w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
          >
            <User className="h-5 w-5 text-primary" />
          </motion.div>
          <DialogTitle className="text-xl font-display text-foreground">
            Bejelentkezés
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Jelentkezz be a fiókodba
          </DialogDescription>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4 mt-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">E-mail cím</label>
            <Input
              type="email"
              placeholder="pelda@email.com"
              className="bg-secondary border-border focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Jelszó</label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-secondary border-border focus:border-primary"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            Bejelentkezés
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Még nincs fiókod?{" "}
            <button
              type="button"
              className="text-primary hover:text-accent underline underline-offset-2 transition-colors"
            >
              Regisztráció
            </button>
          </p>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};
