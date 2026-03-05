import PocketBase from 'pocketbase';

export const pb = new PocketBase(`http://${window.location.hostname}:8090`);
pb.autoCancellation(false);
