const OPEN_EVENT_NAME_PREFIX = "open-drawer";
const CLOSE_EVENT_NAME_PREFIX = "close-drawer";

export const openEventName = (id: string) => `${OPEN_EVENT_NAME_PREFIX}-${id}`;
export const openDrawerEvent = (id: string) =>
  new CustomEvent(openEventName(id));

export const closeEventName = (id: string) =>
  `${CLOSE_EVENT_NAME_PREFIX}-${id}`;
export const closeDrawerEvent = (id: string) =>
  new CustomEvent(closeEventName(id));
