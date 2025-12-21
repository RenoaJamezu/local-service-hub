import { useBooking } from "../../hooks/useBooking";

interface StatsCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  color: "primary" | "accent" | "destructive" | "muted-foreground";
};

const colorStyles = {
  primary: {
    container: "outline-primary/25 bg-primary/10",
    iconBg: "bg-primary/25 text-primary"
  },
  accent: {
    container: "outline-accent/25 bg-accent/10",
    iconBg: "bg-accent/25 text-accent"
  },
  destructive: {
    container: "outline-destructive/25 bg-destructive/10",
    iconBg: "bg-destructive/25 text-destructive"
  },
  "muted-foreground": {
    container: "outline-muted-foreground/25 bg-muted-foreground/10",
    iconBg: "bg-muted-foreground/25 text-muted-foreground"
  },
};

export default function StatsCard({
  icon,
  count,
  label,
  color
}: StatsCardProps) {
  const styles = colorStyles[color];
  const { loading } = useBooking();

  if (loading) {
    return (
      <div className={`w-full flex items-center gap-3 px-3 py-4 rounded-lg shadow h-20 sm:h-24 ${styles.container} animate-pulse`}></div>
    );
  }

  return (
    <div className={`w-full flex items-center gap-3 px-3 py-4 rounded-lg shadow h-16 sm:h-24 ${styles.container}`}>
      <span className={`text-xl sm:text-4xl rounded-lg p-2 ${styles.iconBg}`}>{icon}</span>
      <div className="flex flex-col">
        <p className="text-md sm:text-xl font-medium">{count}</p>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}