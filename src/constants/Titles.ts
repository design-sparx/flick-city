// Info for multiple titles
export interface Titles {
  'page': string
  'next': string
  'entries': number
  'results': Title[]
}

export interface Title {
  'id': string
  'position'?: number
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
    '__typename': string
  }
  'releaseDate': {
    'day': number
    'month': number
    'year': number
    '__typename': string
  }
}

export interface BoxOfficeTitles {
  page: number
  next: string
  entries: number
  results: BoxOfficeTitle[]
}

export interface BoxOfficeTitle {
  'id': string
  'ratingsSummary': { 'aggregateRating': number, 'voteCount': number, '__typename': string }
  'episodes': null | number | string
  'primaryImage': {
    'id': string
    'width': number
    'height': number
    'url': string
    'caption': { 'plainText': string, '__typename': string }
    '__typename': string
  }
  'titleType': {
    'text': string
    'id': string
    'isSeries': boolean
    'isEpisode': boolean
    '__typename': string
  }
  'principalCast': [
    {
      'credits': [
        {
          'name': {
            'id': string
            'nameText': { 'text': string, '__typename': string }
            'primaryImage': { 'url': string, 'width': number, 'height': number, '__typename': string }
            '__typename': string
          }
          'attributes': null | string | number
          'characters': [
            { 'name': string, '__typename': string }
          ]
          'episodeCredits': { 'total': number, 'yearRange': null | number, '__typename': string }
          '__typename': string
        }
      ]
    },
  ]
  'creators': []
  'directors': [
    {
      'totalCredits': number
      'category':
      { 'text': string, '__typename': string }
      'credits': [
        {
          'name': {
            'id': string
            'nameText':
            {
              'text': string
              '__typename': string
            }
            '__typename': string
          }
          'attributes': null | string | number
          '__typename': string
        }]
      '__typename': string
    }
  ]
  'writers': [
    {
      'totalCredits': number
      'category': { 'text': string, '__typename': string }
      'credits': [
        {
          'name':
          {
            'id': string
            'nameText':
            { 'text': string, '__typename': string }
            '__typename': string
          }
          'attributes': [
            { 'text': string, '__typename': string }
          ]
          '__typename': string
        },
        {
          'name': { 'id': string, 'nameText': { 'text': string, '__typename': string }, '__typename': string }
          'attributes': [{ 'text': string, '__typename': string }, ]
          '__typename': string
        },
      ]
    }]
  'genres': {
    'genres': [
      { 'text': string, 'id': string, '__typename': string }
    ]
    '__typename': string
  }
  'titleText': { 'text': string, '__typename': string }
  'releaseYear': { 'year': number, 'endYear': null | number, '__typename': string }
  'releaseDate': { 'day': number, 'month': number, 'year': number, '__typename': string }
  'runtime': { 'seconds': number, '__typename': string }
  'series': null | string | number
  'meterRanking': {
    'currentRank': number
    'rankChange': { 'changeDirection': string, 'difference': number, '__typename': string }
    '__typename': string
  }
  'keywords': {
    'total': number
    'edges': [{ 'node': { 'text': string, '__typename': string }, '__typename': string }]
    '__typename': string
  }
  'plot': {
    'plotText': { 'plainText': string, '__typename': string }
    'language': { 'id': string, '__typename': string }
    '__typename': string
  }
  'trailer': string
  'position': number
}
