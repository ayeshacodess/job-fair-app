export function removeHtmlCharacter(body: string) {
    return (
      body &&
      body
        .replace(/\n(<([^>]+)>)/gi, "")
        .replace(/\r?\n|\r/g, "")
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, "")
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/(<p>|<\/p>)/g, "")
        .replace(/\&amp;/g, '&')
        .replace(/\&gt;/g, '>')
        .replace(/\&lt;/g, '<')
    );
}