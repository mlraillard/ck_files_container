import structuredClone from '@ungap/structured-clone';

export function formatLabels(dirsJson, newDir, newLabel) {
    dirsJson.push({value: newDir, label: newLabel})
    return dirsJson.map(item => `|${item.value}|${item.label}|`).join(',');
}

export function removeAndformatLabels(dirsJson, rmvDir) {
    dirsJson = dirsJson.filter( obj => obj.value !== rmvDir);
    return dirsJson.map(item => `|${item.value}|${item.label}|`).join(',');
}

export function formatLabelsFile(dirsJson, dir, label, deleteDir) {
    const labels = deleteDir ?
        removeAndformatLabels(dirsJson, dir) :
        formatLabels(dirsJson, dir, label)

    return `const labels = \"${labels}\"\n\nmodule.exports = labels;\n`;
}

export function formatTextArrayToString(arr) {
    if (arr && Array.isArray(arr)) {
        return arr.join('\n')
    }
}

export function compareChangeBooleanToString(booleanValue, stringValue) {
    let testStr = null // this is a boolean
    let valueChanged = false // this is a boolean
    if (booleanValue === true || booleanValue === false) {
        testStr = ((booleanValue + '').toLowerCase() === "true")
        valueChanged = stringValue === 'true' ? (testStr === false) : (testStr === true)
    }

    return valueChanged
}

export function formatSettingsFile(settingsJson, updateJson) {
    const newSettings = structuredClone(settingsJson)

    for (const [key, value] of Object.entries(updateJson)) {
        newSettings[key] = value
    }
    return newSettings
}
