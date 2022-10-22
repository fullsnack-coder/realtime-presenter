export interface Slide {
  id: string
  slideURI: string
}

export interface RoomInfo {
  roomId: string
  slides: Slide[]
}

interface RoomInfoParams {
  roomCode: string
  password?: string
}
const mockSlides: Slide[] = [
  {
    id: 'a',
    slideURI:
      'https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'b',
    slideURI:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'c',
    slideURI:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
  }
]

export const getRoomInfo = async (_: RoomInfoParams): Promise<RoomInfo> => {
  const slides = await Promise.resolve(mockSlides)
  return { roomId: _.roomCode, slides }
}
