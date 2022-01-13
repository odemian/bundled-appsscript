export const STABLE = "stable";
export const LATEST = "latest";

const ADDON_PROPERTY_NAME = "__addonVersion";

export function goStable() {
    const userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty(ADDON_PROPERTY_NAME, STABLE);
}

export function goLatest() {
    const userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty(ADDON_PROPERTY_NAME, LATEST);
}

export function getUserVersion() {
    return PropertiesService.getUserProperties().getProperty(ADDON_PROPERTY_NAME);
}