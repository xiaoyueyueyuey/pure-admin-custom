export interface PostListCommand extends BasePageQuery {
  postCode?: string;
  postName?: string;
  status?: number;
}

export interface PostPageResponse {
  createTime: string;
  postCode: string;
  postId: number;
  postName: string;
  postSort: number;
  remark: string;
  status: number;
  statusStr: string;
}
