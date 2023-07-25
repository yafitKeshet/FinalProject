import "./Events.css";
function Events() {
  const events = [
    {
      id: 1,
      title: "Learn Docker",
      date: "September 5, 2023",
      location: "Conference Center",
      description:
        "Join us for a night of celebration and reconnecting with fellow alumni.",
      imageUrl: "./events/geektime.jpeg",
    },
    {
      id: 2,
      title: "Java Events",
      date: "September 5, 2023",
      location: "Conference Center",
      description:
        "Expand your professional network and explore career opportunities.",
      imageUrl: "./events/geektime.jpeg",
    },
    {
      id: 3,
      title: "C++ Events",
      date: "September 5, 2023",
      location: "Conference Center",
      description:
        "Expand your professional network and explore career opportunities.",
      imageUrl: "./events/geektime.jpeg",
    },
    // Add more event objects as needed
  ];

  return (
    <div>
      <h1>Alumni Events</h1>
      <div className="container">
        {events.map((event) => (
          <div key={event.id} className="event-container">
            <h3>{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>
            <img
              src={event.imageUrl}
              alt="Event"
              style={{ maxWidth: "200px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
