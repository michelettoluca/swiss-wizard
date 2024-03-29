export function waitUntilPresent<T>(
    callback: () => T,
    options: { maxRetires?: number; delay?: number } = {}
): Promise<T> {
    const maxRetires = options.maxRetires ?? 10
    const delay = options.delay ?? 10

    let retries = 0

    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            const match = await callback()

            if (match) {
                clearInterval(interval)
                resolve(match)
            }

            if (++retries > maxRetires) {
                reject()
            }
        }, delay)
    })
}
