export interface TextComponentProps {
  id: String;
  text: String;
  isDragable: Boolean;
  isReorderable: Boolean;
  createdBy: String;
  workspaceId: String;
}
// export interface AudioComponentProps {
//     id:String
//     text: String;
//     isDragable:Boolean;
//     isReorderable:Boolean;
//     createdBy:String;
//     workspaceId:String;
// }
// export interface ParagraphComponentProps {
//     id:String
//     text: String;
//     isDragable:Boolean;
//     isReorderable:Boolean;
//     createdBy:String;
//     workspaceId:String;
// }
// export interface ParagraphComponentProps {
//     id:String
//     text: String;
//     isDragable:Boolean;
//     isReorderable:Boolean;
//     createdBy:String;
//     workspaceId:String;
// }
export interface ComponentHubProp {
  text: TextComponentProps;
}
