"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Envelope,
  GithubLogo,
  Globe,
  InstagramLogo,
  LinkedinLogo,
  Moon,
  PaperPlaneTilt,
  Sun,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} });

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const toggleTheme = () => setIsDark(!isDark);

  const links = [
    {
      name: "Portfolio",
      icon: <Globe className="w-5 h-5 mr-2" />,
      url: "https://johnfarah.com",
    },
    {
      name: "GitHub",
      icon: <GithubLogo className="w-5 h-5 mr-2" />,
      url: "https://github.com/johnfarah",
    },
    {
      name: "LinkedIn",
      icon: <LinkedinLogo className="w-5 h-5 mr-2" />,
      url: "https://linkedin.com/in/johnfarah",
    },
    {
      name: "Instagram",
      icon: <InstagramLogo className="w-5 h-5 mr-2" />,
      url: "https://instagram.com/rafael_fagundes",
    },
    {
      name: "Email",
      icon: <Envelope className="w-5 h-5 mr-2" />,
      url: "mailto:john@example.com",
    },
    // {
    //   name: "Mobile App",
    //   icon: <DeviceMobile className="w-5 h-5 mr-2" />,
    //   url: "https://app.johnfarah.com",
    // },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      console.log("Form data submitted:", formData);
      setFormData({ name: "", email: "", message: "" });
      setShowForm(false);
      setFormErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div
        className={`min-h-screen ${
          isDark ? "bg-gray-900" : "bg-gray-100"
        } transition-colors duration-300 flex items-center justify-center p-4`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjEyMTIxIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMzMzMiPjwvcmVjdD4KPC9zdmc+)]"
                : "bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZjNmNGY2Ij48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU3ZWIiPjwvcmVjdD4KPC9zdmc+)]"
            } opacity-5`}
          ></div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-md backdrop-blur-xl ${
            isDark ? "bg-gray-800 bg-opacity-50" : "bg-white bg-opacity-70"
          } rounded-3xl shadow-2xl overflow-hidden border ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="p-8 text-center relative">
            <ThemeToggle />
            <div
              className={`w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-4 ${
                isDark ? "border-gray-600" : "border-gray-300"
              } shadow-inner`}
            >
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
            <h1
              className={`text-3xl font-extrabold ${
                isDark ? "text-gray-100" : "text-gray-900"
              } mb-2 tracking-tight`}
            >
              Rafael Fagundes
            </h1>
            <p
              className={`text-xl ${
                isDark ? "text-gray-300" : "text-gray-600"
              } font-medium mb-6`}
            >
              Full Stack & Mobile Developer
              <br />
              <span
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Based in Ontario, Canada 🇨🇦
              </span>
            </p>
            <div className="space-y-4">
              {links.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    className={`w-full text-left justify-start min-h-12 ${
                      isDark
                        ? "text-gray-200 bg-gray-700 hover:bg-gray-600"
                        : "text-gray-700 bg-gray-200 hover:bg-gray-300"
                    } transition-all duration-300 border-none shadow-md`}
                    asChild
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1 }}
              >
                <Button
                  className={`w-full text-left justify-start min-h-12 ${
                    isDark
                      ? "text-gray-200 bg-gray-700 hover:bg-gray-600"
                      : "text-gray-700 bg-gray-200 hover:bg-gray-300"
                  } transition-all duration-300 border-none shadow-md`}
                  onClick={() => setShowForm(true)}
                >
                  <PaperPlaneTilt className="w-5 h-5 mr-2" />
                  <span className="font-bold">Send me a message</span>
                </Button>
              </motion.div>
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
                className={`${
                  isDark ? "bg-gray-800" : "bg-white"
                } p-8 rounded-3xl shadow-2xl w-full max-w-md relative`}
              >
                <Button
                  className={`absolute top-4 right-4 ${
                    isDark
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  variant="ghost"
                  onClick={() => setShowForm(false)}
                >
                  <X className="w-6 h-6" />
                </Button>
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  } mb-6`}
                >
                  Send me a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                          : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-sm mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                          : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                          : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-red-400 text-sm mt-1">
                        {formErrors.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className={`w-full ${
                      isDark
                        ? "bg-gray-600 hover:bg-gray-500 text-gray-100"
                        : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                    }`}
                  >
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return (
    <Button
      onClick={toggleTheme}
      className={`absolute top-4 right-4 p-2 rounded-full ${
        isDark
          ? "bg-gray-700 text-white hover:bg-gray-600"
          : "bg-gray-200 text-gray-900 hover:bg-gray-300"
      }`}
      size="icon"
      variant="ghost"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
