export function logEvent(eventName: string, payload: any) {
  if (!eventName) return;
  const body = {
    ...payload,
    eventName,
  };
  console.log(JSON.stringify(body));
}
