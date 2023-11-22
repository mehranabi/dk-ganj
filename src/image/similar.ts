import axios from 'axios'
import { indexOf, min } from 'lodash'

const findTarget = async (photos: string[], target: string, token: string): Promise<string | null> => {
  const records: { _url: string }[] = photos.map((photo) => ({ _url: photo }))

  try {
    const { data } = await axios.post('https://api.ximilar.com/image_matching/v2/rank_images', {
      query_record: {
        _url: target,
      },
      records,
    }, {
      headers: {
        Authorization: `Token ${token}`,
      },
      timeout: 4000,
    })

    if (data.answer_distances && data.answer_records) {
      const index = indexOf(data.answer_distances, min(data.answer_distances))
      return data.answer_records[index]._url
    }
  } catch (error) {
    console.error(error)
  }

  return null
}

export default { findTarget }
