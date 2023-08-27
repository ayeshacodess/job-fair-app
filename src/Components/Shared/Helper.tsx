const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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