interface Slide {
  id: string
  slideURI: string
}

export interface RoomInfo {
  slides: Slide[]
}

interface RoomInfoParams {
  roomCode: string
  password?: string
}

export const getRoomInfo = async (_: RoomInfoParams): Promise<RoomInfo> => {
  const slides = await Promise.resolve([])
  return { slides }
}
