// Info for multiple titles

export interface Titles {
  'page': string
  'next': string
  'entries': number
  'results': [
    {
      'id': string
      'primaryImage': {
        'id': string
        'width': number
        'height': number
        'url': string
        'caption': {
          'plainText': string
          '__typename': string
        }
        '__typename': string
      }
      'titleType': {
        'text': string
        'id': string
        'isSeries': boolean
        'isEpisode': boolean
        '__typename': string
      }
      'titleText': {
        'text': string
        '__typename': string
      }
      'releaseYear': {
        'year': number
        'endYear': number | null
        '__typename': string
      }
      'releaseDate': {
        'day': number | null
        'month': number | null
        'year': number
        '__typename': string
      }
    },

  ]
}
