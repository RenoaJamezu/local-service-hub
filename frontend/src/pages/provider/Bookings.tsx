import { IoCalendarClearOutline } from "react-icons/io5"

function Bookings() {
  return (
    <main>
      {/* header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <div className="flex gap-3 items-center text-primary mb-3">
            <IoCalendarClearOutline className="text-3xl" />
            <span className="font-medium text-lg">All Bookings</span>
          </div>
          <h1 className="text-3xl font-medium mb-2">Booking History</h1>
          <span className="text-muted-foreground text-xl">View and manage all your booking requests</span>
        </div>
      </div>
    </main>
  )
}

export default Bookings