import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Clock, Send, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "A név megadása kötelező.")
    .max(100, "A név maximum 100 karakter lehet."),
  email: z
    .string()
    .trim()
    .min(1, "Az email megadása kötelező.")
    .email("Érvényes email címet adj meg.")
    .max(255, "Az email maximum 255 karakter lehet."),
  phone: z.string().max(20, "Maximum 20 karakter.").optional().or(z.literal("")),
  subject: z.string().min(1, "Válassz egy tárgyat."),
  message: z
    .string()
    .trim()
    .min(1, "Az üzenet megadása kötelező.")
    .max(1000, "Az üzenet maximum 1000 karakter lehet."),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjectOptions = [
  "Általános kérdés",
  "Termék információ",
  "Rendelés státusz",
  "Szállítás",
  "Eredetiség ellenőrzés",
  "Egyéb",
];

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    console.log("Contact form submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Köszönjük! Hamarosan válaszolunk.");
    setTimeout(() => {
      form.reset();
      setIsSuccess(false);
      onOpenChange(false);
    }, 2000);
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      form.reset();
      setIsSuccess(false);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/85 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 w-[95%] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-lg border border-border bg-card p-6 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-300 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-all hover:text-foreground hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card">
            <X className="h-5 w-5" />
            <span className="sr-only">Bezárás</span>
          </DialogPrimitive.Close>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle className="h-16 w-16 text-primary mb-6" />
                <h3 className="font-display text-2xl text-foreground mb-3">
                  Üzenet elküldve!
                </h3>
                <p className="text-muted-foreground">
                  Köszönjük! Hamarosan válaszolunk.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="mb-8">
                  <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-2">
                    Lépj Velünk Kapcsolatba
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Válaszolunk minden kérdésedre 24 órán belül.
                  </p>
                </div>

                {/* Form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground text-sm">
                              Név <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Add meg a neved"
                                className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground text-sm">
                              Email cím <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="pelda@email.hu"
                                className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground text-sm">
                              Telefonszám{" "}
                              <span className="text-muted-foreground text-xs">
                                (opcionális)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+36 XX XXX XXXX"
                                className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground text-sm">
                              Tárgy <span className="text-primary">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-secondary/50 border-border text-foreground focus:border-primary focus:ring-primary/20">
                                  <SelectValue placeholder="Válassz tárgyat..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-card border-border">
                                {subjectOptions.map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground text-sm">
                            Üzenet <span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={5}
                              placeholder="Írd le a kérdésed..."
                              className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-accent font-semibold text-base py-6 rounded-md transition-all hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Küldés...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Üzenet Küldése
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>

                {/* Alternative contact */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-muted-foreground text-sm mb-4">
                    Vagy írj nekünk közvetlenül:
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="mailto:info@scentbox.hu"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      info@scentbox.hu
                    </a>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      Válaszidő: ~24 óra
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};
