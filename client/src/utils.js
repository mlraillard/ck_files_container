export function formatLabels(dirsJson, newDir, newLabel) {
    dirsJson.push({value: newDir, label: newLabel})
    return dirsJson.map(item => `|${item.value}|${item.label}|`).join(',');
}

export function formatLabelsFile(dirsJson, newDir, newLabel) {
    const labels = formatLabels(dirsJson, newDir, newLabel)

    return `const labels = \"${labels}\"\n\nmodule.exports = labels;\n`;
}