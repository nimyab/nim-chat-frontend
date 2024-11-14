export type SendMessageType = {
  text: string;
};

export type SearchChatRequest = {
  topicChatIndex: number;
  yourGenderChatIndex: number;
  partnerGenderChatIndex: number;
  yourAgeChatIndex: number;
  partnerAgeChatIndexes: number[];
};
