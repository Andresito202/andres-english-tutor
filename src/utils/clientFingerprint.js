/**
 * clientFingerprint.js
 * Generates and persists a simple anonymous identifier for usage tracking.
 */

export const getClientFingerprint = () => {
  const STORAGE_KEY = 'andres_client_id';
  let clientId = localStorage.getItem(STORAGE_KEY);

  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, clientId);
  }

  return clientId;
};
