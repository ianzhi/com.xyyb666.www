export default async function copy(text: string) {
    var input = document.createElement('textarea')
    input.value = text
    document.body.appendChild(input)
    input.select()

    // 复制
    const result = document.execCommand('copy', true)
    document.body.removeChild(input)

    if (result) {
        return result
    }

    if (!navigator.clipboard) {
        return false
    }

    try {
        await navigator.clipboard.writeText(text)

        return true
    } catch (e) {
        console.error(e)
        return false
    }
}