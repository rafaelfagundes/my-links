"use client";
import { Button } from "@/components/ui/button";
import Emoji from "@/components/ui/emoji";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { MainTitle } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Envelope,
  GithubLogo,
  Globe,
  InstagramLogo,
  LinkedinLogo,
  PaperPlaneTilt,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface Link {
  name: string;
  icon: React.ReactNode;
  url?: string;
  action?: () => void;
}

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  function sendEmail() {
    const eEmail = "cmFmYWVsY2ZsQG91dGxvb2suY29t";
    const dEmail = atob(eEmail);
    window.location.href = `mailto:${dEmail}`;
  }

  const links: Link[] = [
    {
      name: "Portfolio",
      icon: <Globe className="w-5 h-5 mr-2" />,
      url: "https://rafaelfagundes.com",
    },
    {
      name: "GitHub",
      icon: <GithubLogo className="w-5 h-5 mr-2" />,
      url: "https://github.com/rafaelfagundes",
    },
    {
      name: "LinkedIn",
      icon: <LinkedinLogo className="w-5 h-5 mr-2" />,
      url: "https://linkedin.com/in/rafaelcfl",
    },
    {
      name: "Instagram",
      icon: <InstagramLogo className="w-5 h-5 mr-2" />,
      url: "https://instagram.com/rafael_fagundes",
    },
    {
      name: "Email",
      icon: <Envelope className="w-5 h-5 mr-2" />,
      action: sendEmail,
    },
    {
      name: "Send me a message",
      icon: <PaperPlaneTilt className="w-5 h-5 mr-2" />,
      action: () => setShowForm(true),
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `New contact form submission:
Name: ${data.name}
Email: ${data.email}
Message: ${data.message}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast("Message sent! 🎉", {
        description: "I'll get back to you as soon as possible.",
      });
      reset();
      setShowForm(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast("Failed to send message", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md backdrop-blur-xl bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="p-8 text-center relative">
          <div className="absolute top-4 right-4 flex gap-2 items-center">
            <ThemeSwitcher></ThemeSwitcher>
          </div>
          <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-inner">
            <Image
              alt="John Farah"
              className="object-cover w-full h-full"
              height="128"
              src="/img/profile.png"
              style={{
                aspectRatio: "128/128",
                objectFit: "cover",
              }}
              width="128"
            />
          </div>
          <MainTitle>Rafael Fagundes</MainTitle>

          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-2 mt-2">
            Full Stack & Mobile Developer
            <br />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Based in Ontario, Canada
            </span>
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Emoji>🇨🇦</Emoji>
          </motion.div>
          <div className="space-y-4 mt-4">
            {links.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.15 }}
              >
                <Button
                  className="w-full text-left justify-start min-h-12 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border-none "
                  asChild
                  variant="secondary"
                  onClick={link.action ? link.action : undefined}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-6"
                  >
                    {link.icon}
                    <span className="font-bold">{link.name}</span>
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md relative"
            >
              <Button
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                variant="ghost"
                onClick={() => setShowForm(false)}
              >
                <XCircle className="w-6 h-6" />
              </Button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Send me a message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    {...register("name")}
                    placeholder="Your Name"
                    className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  {errors.name && (
                    <span className="mt-1 text-sm text-red-600 flex flex-row items-center">
                      <WarningCircle size={16} />
                      <p className="ml-1 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    </span>
                  )}
                </div>
                <div>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Your Email"
                    className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  {errors.email && (
                    <span className="mt-1 text-sm text-red-600 flex flex-row items-center">
                      <WarningCircle size={16} />
                      <p className="ml-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    </span>
                  )}
                </div>
                <div>
                  <Textarea
                    {...register("message")}
                    placeholder="Your Message"
                    className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  {errors.message && (
                    <span className="mt-1 text-sm text-red-600 flex flex-row items-center">
                      <WarningCircle size={16} />
                      <p className="ml-1 text-sm text-red-600">
                        {errors.message.message}
                      </p>
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
