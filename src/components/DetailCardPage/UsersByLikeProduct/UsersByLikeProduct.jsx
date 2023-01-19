import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../helpers/Api'

export function UsersByLikeProduct({ arrayPostsLikes }) {
  const TOKEN = useSelector((store) => store.TOKEN)
  const myGroup = useSelector((store) => store.myUser.group)

  useEffect(() => {
    api.setNewToken(TOKEN)
    api.setNewGroup(myGroup)
  }, [])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['NAMES_LIKE'],
    queryFn: () => api.getUsersById(arrayPostsLikes),
  })

  if (isLoading) return <div>Load</div>
  if (isError) return <div>ошибка авторизации</div>

  return (

    <ul className="dropdown-menu">
      {data.map((post) => (
        <li key={crypto.randomUUID()}><p className="dropdown-item" href="#">{post}</p></li>
      ))}

    </ul>
  )
}
