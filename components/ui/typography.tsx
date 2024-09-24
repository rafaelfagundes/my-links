import { Playfair_Display as Serif } from "next/font/google";

const serif = Serif({
  subsets: ["latin"],
  weight: "variable",
  // weight: ["300", "400", "500", "600", "700"],
});

function Headline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-6xl font-bold text-gray-800 dark:text-white tracking-tighter ${className}`}
    >
      {children}
    </span>
  );
}

function MainTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`${serif.className} text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white tracking-tighter ${className}`}
    >
      {children}
    </span>
  );
}

function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`${serif.className} text-2xl sm:text-3xl font-extrabold text-zinc-600 dark:text-zinc-300 tracking-tighter ${className}`}
    >
      {children}
    </h1>
  );
}

function Subtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-base sm:text-lg font-normal text-gray-400 dark:text-gray-450 tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
}

export { Headline, MainTitle, Subtitle, Title };
