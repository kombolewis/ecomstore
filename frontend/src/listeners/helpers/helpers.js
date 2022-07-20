import globals from "framework/globals"

export const formData = (data)  => {
    const item = {}

    for (const row of data) {
        item[row[0]] = row[1]
    }

    const concatData = Array.of(item)
    
    const formData = new FormData();

    for (const key in concatData[0]) {
        formData.append(key,concatData[0][key]);
    }

    return formData
}

export const findFormData = (attributeName = '') => {
    const target = globals.document.forms[0]
    const formData = new FormData(target);

    if (attributeName) {
        let data = [...formData.entries()].filter(arr => {
            return arr.includes(attributeName)
        })
        return data.map(arr => Object.fromEntries([arr]))
    } else {
        return  [...formData.entries()]
    }
}