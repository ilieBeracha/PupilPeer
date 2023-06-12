export interface VideoRoomsModal {
  id?:number;
  subCategorieName?:string;
  roomId?: number;
  roomName: string;
  hostUserId: number;
  categoryId: number;
  subCategoryId: number;
  startTime?: number;
  maxParticipants: number;
  description: string;
  isTeacher:string,
  cost:number
}
