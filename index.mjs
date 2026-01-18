export default class JSONTools {
    static checkObjectKeys(obj, path, defaultValue = null) {
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

    static findInJson(obj, keyToFind, valueToFind, returnPath = false) {
        let result = null;
        let foundPath = "";

        function search(currentObj, currentPath = "") {
            if (typeof currentObj !== "object" || currentObj === null) {
                return;
            }

            for (const key in currentObj) {
                let newPath = currentPath ? `${currentPath}.${key}` : key;

                if (key === keyToFind && currentObj[key] === valueToFind) {
                    if (currentPath.includes("channel")) {
                        result = currentObj;
                        foundPath = currentPath;
                        return;
                    }
                }

                if (typeof currentObj[key] === "object" && currentObj[key] !== null) {
                    search(currentObj[key], newPath);
                    if (result) return;
                }
            }
        }

        search(obj);

        return returnPath ? foundPath : result;
    }
}