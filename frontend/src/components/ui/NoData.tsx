interface NoDataProps {
  icon: React.ReactNode;
  title: string;
  message: string;
}

export default function NoData({
  icon,
  title,
  message,
}: NoDataProps) {
  return (
    <div className="flex flex-col w-full items-center justify-center mt-10">
      <div className="bg-muted rounded-lg p-5 mb-3 text-3xl text-muted-foreground">
        {icon}
      </div>
      <span className="font-medium text-xl mb-3 w-1/3 text-center">{title}</span>
      <span className="text-muted-foreground mb-5 w-1/3 text-center">{message}</span>
    </div>
  )
}