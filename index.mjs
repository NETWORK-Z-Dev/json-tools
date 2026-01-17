export default class JSONTools {
    checkObjectKeys(obj, path, defaultValue = null) {
        const keys = path.split('.');

        function recursiveCheck(currentObj, keyIndex) {
            const key = keys[keyIndex];

            if (key === '*') {
                for (const k in currentObj) {
                    if (currentObj.hasOwnProperty(k)) {
                        recursiveCheck(currentObj[k], keyIndex + 1);
                    }
                }
            } else {
                if (!(key in currentObj)) {
                    currentObj[key] = (keyIndex === keys.length - 1) ? defaultValue : {};
                }
                if (keyIndex < keys.length - 1) {
                    recursiveCheck(currentObj[key], keyIndex + 1);
                }
            }
        }

        recursiveCheck(obj, 0);
    }
}