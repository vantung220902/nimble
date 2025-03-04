import {
  KeywordType,
  STATUS_CLASS_MAP,
} from '@containers/keyword/view/upload-keywords-container/types';

export const mapKeywordWithStream = (contents: KeywordType[], keywordsStream: string) => {
  const existedKeyword = new Map(contents.map((item) => [item.content.toLowerCase(), item]));

  const streamData = keywordsStream ? JSON.parse(keywordsStream).data : [];
  const updatingKeywords = [...contents, ...streamData];
  updatingKeywords.forEach((item) => {
    const { content, status } = item;

    existedKeyword.set(content.toLowerCase(), {
      ...(existedKeyword.get(content.toLowerCase()) || {}),
      content,
      status,
      id: item.id,
    });
  });

  return Array.from(existedKeyword.values());
};

export const getStatusClass = (status: string, classes: any) => {
  const state = STATUS_CLASS_MAP[status] ?? '';
  return classes[state] as any;
};
