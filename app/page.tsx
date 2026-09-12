import { trip } from '../data/trip';
import { InstallPrompt } from './install-prompt';
import { OfflineReady } from './offline-ready';
import { TripApp } from './trip-app';

export default function Home() {
  return <main><OfflineReady /><InstallPrompt /><TripApp trip={trip} /></main>;
}
