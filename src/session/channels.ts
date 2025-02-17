const channels = new Map<string, Set<string>>();

export const addChannelItem = (name: string, sessionID: string) => {
  const has = channels.has(name);
  if (!has) {
    channels.set(name, new Set());
  }
  channels.get(name)?.add(sessionID);
};

export const removeChannelItem = (name: string, sessionID: string) => {
  const sessionSet = channels.get(name);
  if (sessionSet) {
    sessionSet.delete(sessionID);

    if (sessionSet.size === 0) {
      channels.delete(name);
    }
  }
};

export const getChannels = (name: string) => {
  return channels.get(name);
};

export const hasInChannel = (name: string, sessionID: string) => {
  return channels.get(name)?.has(sessionID) ?? false;
};
