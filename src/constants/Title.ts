export interface Title {
  'results': {
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
      'endYear': null
      '__typename': 'YearRange'
    }
    'releaseDate': {
      'day': 28
      'month': 10
      'year': 1892
      '__typename': 'ReleaseDate'
    }
  }
}
