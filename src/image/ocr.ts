import axios from 'axios'

const exportKey = async (photo: string, token: string): Promise<string | null> => {
  try {
    const { data } = await axios.get('https://api.ocr.space/parse/imageurl', {
      params: {
        apikey: token,
        url: photo,
        filetype: 'jpg',
        OCREngine: 2,
      },
      timeout: 4000,
    })

    const text: string = data.ParsedResults?.[0]?.ParsedText ?? ''
    return text.replace('\n', '|')
  } catch (error) {
    console.error(error)
  }

  return null
}

export default { exportKey }