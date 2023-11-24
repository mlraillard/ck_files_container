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
    console.log(`arr: ${JSON.stringify(arr)}`)
    // return "bathroom noise\nkitchen sink"
    if (arr && arr instanceof Array) {
        return arr.join('\n')
    }
    // return arr.join('\n')
}