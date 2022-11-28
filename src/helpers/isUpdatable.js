export function isUpdatable(reqKeys, updatableKeys) {
    return reqKeys.every((reqKey) => updatableKeys.includes(reqKey));
}
