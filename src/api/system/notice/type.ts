export interface SystemNoticeQuery extends BasePageQuery {
  noticeType: string;
  noticeTitle: string;
  creatorName: string;
}

export type SystemNoticeDTO = {
  noticeId: string;
  noticeTitle: string;
  noticeType: number;
  noticeContent: string;
  status: number;
  createTime: Date;
  creatorName: string;
};

export type SystemNoticeRequest = {
  noticeId?: number;
  noticeTitle: string;
  noticeType: number;
  noticeContent: string;
  status: number;
};
