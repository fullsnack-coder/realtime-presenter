import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { RoomInfo, getRoomInfo } from '../services/rooms'

interface UseRoomParams {
  roomCode: string
  roomPassword?: string
}

interface UseRoomResult {
  data?: RoomInfo
  isError: boolean
  isLoading: boolean
}

const useRoom = ({ roomCode, roomPassword, ...rest }: UseRoomParams & UseQueryOptions<RoomInfo>): UseRoomResult => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['room-info', roomCode],
    queryFn: async () => {
      const roomInfo = await getRoomInfo({ roomCode, password: roomPassword })
      return roomInfo
    },
    enabled: false,
    ...rest
  })

  return {
    data,
    isError,
    isLoading
  }
}

export default useRoom
