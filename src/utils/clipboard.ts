export default async function copy(text: string) {
    if (navigator.clipboard) {
        await navigator.clipboard.writeText(text)
        return true
    } else {
        var input = document.createElement('textarea')
        input.value = text
        document.body.appendChild(input)
        input.select()

        // 复制
        const result = document.execCommand('copy', true)
        document.body.removeChild(input)

        return result
    }
}