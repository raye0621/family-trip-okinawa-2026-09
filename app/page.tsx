import { trip } from '../data/trip';
import { OfflineReady } from './offline-ready';
import { TripApp } from './trip-app';

export default function Home() {
  return <main><OfflineReady /><TripApp trip={trip} /></main>;
}
