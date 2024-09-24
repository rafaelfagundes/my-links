function Emoji({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xl font-bold text-zinc-900 dark:text-white"
      style={{ fontSize: "2rem" }}
    >
      {children}
    </span>
  );
}

export default Emoji;
