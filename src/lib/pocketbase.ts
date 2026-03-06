import PocketBase from 'pocketbase';

const getPocketBaseUrl = () => {
  if (import.meta.env.VITE_POCKETBASE_URL) {
    return import.meta.env.VITE_POCKETBASE_URL;
  }
  return `http://${window.location.hostname}:8090`;
};

export const pb = new PocketBase(getPocketBaseUrl());
pb.autoCancellation(false);
