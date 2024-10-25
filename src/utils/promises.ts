/* eslint-disable @typescript-eslint/no-explicit-any */

type Promises = (string | Promise<string>)[][];

export async function promisesToObject(promises: Promises) {
    const data = await Promise.all(promises.map(p => p[1]));
    const result: any = {};
    promises.forEach((_, index) => {
        result[promises[index][0] as string] = data[index];
    });
    return result;
}