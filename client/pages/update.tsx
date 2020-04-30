import { UpdateForm } from 'components'
import { useRouter } from 'next/router'

const Update = () => {
  const router = useRouter()

  // @ts-ignore
  return <UpdateForm itemId={router.query.id} />
}

export default Update
