const EVENT_NAME_PREFIX = "open-drawer";

export const eventName = (id: string) => `${EVENT_NAME_PREFIX}-${id}`;

export const openDrawerEvent = (id: string) => new CustomEvent(eventName(id));
