const test1 = {
    name: '123',
    age: 1,
    role: 'dev',
    arr: [1,'2'],
    arr2: [[1,'2'], {tag: 1}, 1,'2', {ar: ['1']}],
    obj: {
        test: true,
        try: 2,
        ob: {
            age: 1
        }
    }
}

const test2 = {
    name: '123',
    age: 1,
    role: 'dev',
    arr: [1,'2'],
    arr2: [[1,'2'], {tag: 1}, 1,'2', {ar: ['1']}],
    obj: {
        test: true,
        try: 2,
        ob: {
            age: 1
        }
    }
}



export function deepEqual(obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean {

    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

    for (const key in obj1) {

        const isObj = (value: unknown) :boolean => {
            return value !== null && typeof value === 'object'
        }

        if ( (!isObj(obj1[key]) && !isObj(obj2[key])) && obj1[key] !== obj2[key]) {
            return false

        } else if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
            /* если массивы */
            const ar1 = obj1[key] as (string | number | true | object)[]
            const ar2 = obj2[key] as (string | number | true | object)[]

            if (ar1.length !== ar2.length) return false

            let checkObj = false

            for (let i= 0; i < ar1.length ; i++) {
                if ((!isObj(ar1[i]) && !isObj(ar2[i])) && ar1[i] !== ar2[i]) return false
                if (isObj(ar1[i]) && isObj(ar2[i])) {

                    /* если в массиве встречается объект, то результат его сравнения записывается в переменную  */
                    checkObj = deepEqual(ar1[i] as Record<string, unknown>, ar2[i] as Record<string, unknown>)
                    if (!checkObj) return false
                }
            }

        } else if (isObj(obj1[key]) && isObj(obj2[key])){
            /* если объекты */
            return deepEqual(obj1[key] as Record<string, unknown>, obj2[key] as Record<string, unknown>)
        }
    }

    return true
}

console.log(deepEqual(test1, test2))
