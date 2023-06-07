/**
 * 拷贝对象 如果两个对象的key相等将被拷贝对象的key的值赋予原始对象
 * @param reactiveData 原始对象
 * @param setData 被拷贝对象
 */
export const setReactive = (reactiveData: any, setData: any) => {
	Object.keys(reactiveData).forEach((key) => {
		if (Object.hasOwnProperty.call(setData, key)) {
			reactiveData[key] = setData[key]
		}
	})
}

/**
 * 批量给对象添加属性
 * @param reactiveData 原始对象
 * @param addData 被添加的对象
 * @param include 选择添加的key的数组
 */
export const addReactive = (reactiveData: any, addData: any, include?: Array<string>) => {
	Object.keys(addData).forEach((key) => {
		if (include && include.includes(key)) {
			reactiveData[key] = addData[key]
		} else if (!include) {
			reactiveData[key] = addData[key]
		}
	})
}

/**
 * 将传进来的数组中的key 从对象里面筛选出来 组成新的对象
 * @param obj 被筛选的对象
 * @param arr 需要筛选出来的key的数组
 * @returns 筛选后返回的对象
 */
export const getKeysObjec = <T, K extends keyof T>(obj: T, arr: K[]): { [P in K]: T[P] } => {
	const res: any = {}
	arr.forEach((item: K) => {
		res[item] = obj[item]
	})
	return res
}

// 将对象转换 key=value&key2=value2 的格式
export const objToQueryString = (obj: Record<string, any>): string => {
	return Object.entries(obj)
		.map(([key, value]) => `${key}=${value}`)
		.join('&')
}
