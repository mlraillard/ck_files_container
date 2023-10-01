import { DIRECTORY_FULL_DESC } from './constants'

export function addLabelsToDirsArray(dirArray) {
    let expandedArray = []
    dirArray.forEach(element => {
       expandedArray.push({value: element, label: DIRECTORY_FULL_DESC[element]})
    });
    return expandedArray;
}