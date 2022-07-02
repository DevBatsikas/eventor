import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventid } = useParams();

  return <div>EventDetails - ID: {eventid}</div>;
};

export default EventDetails;
