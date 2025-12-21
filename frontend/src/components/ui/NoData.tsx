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
    <div className="flex flex-col w-full items-center justify-center mt-10 px-4 text-center">
      <div className="bg-muted rounded-lg p-4 sm:p-5 mb-3 text-2xl sm:text-3xl text-muted-foreground">
        {icon}
      </div>
      <p className="font-medium text-lg sm:text-xl mb-2 sm:mb-3 max-w-xl">{title}</p>
      <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-5 max-w-2xl">{message}</p>
    </div>
  )
}