export interface MovieTitle {
  'results': {
    'id': string
    'baseInfo': BaseInfo
    'cast': Cast
    'revenue': Revenue
    'creatorsDirectorsWriters': Creators
  }
}

/**
 * custom title info
 */
export interface BaseInfo {
  'ratingsSummary': {
    'aggregateRating': number
    'voteCount': number
    '__typename': string
  }
  'episodes': null | Episodes
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
  'genres': {
    'genres': [
      {
        'text': string
        'id': string
        '__typename': string
      },
      {
        'text': string
        'id': string
        '__typename': string
      }
    ]
    '__typename': string
  }
  'titleText': {
    'text': string
    '__typename': string
  }
  'releaseYear': {
    'year': number
    'endYear': null | number
    '__typename': string
  }
  'releaseDate': {
    'day': number
    'month': number
    'year': number
    '__typename': string
  }
  'runtime': {
    'seconds': number
    '__typename': string
  }
  'series': null | string
  'meterRanking': {
    currentRank: number
    rankChange: {
      changeDirection: string
      difference: number
      __typename: string
    }
  }
  'plot': {
    'plotText': {
      'plainText': string
      '__typename': string
    }
    'language': {
      'id': string
      '__typename': string
    }
    '__typename': string
  }
  'principalCast': [
    {
      'credits': SingleCredit[]
    },
  ]
  'trailer': string
  'keywords': {
    'total': number
    'edges': [{ 'node': { 'text': string, '__typename': string }, '__typename': string }]
    '__typename': string
  }
}

/**
 * if movie title is a series
 */
export interface Episodes {
  episodes: {
    total: number
  }
  seasons: [{
    number: number
  }]
  topRated: {
    edges: [
      {
        node: {
          ratingSummary: {
            aggregateRating: number
          }
        }
      }
    ]
  }
  totalEpisodes: {
    total: number
  }
  years: [{ year: number }]
}

/**
 * principal cast credits
 */
export interface SingleCredit {
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

/**
 * actors / cast
 */
export interface Cast {
  id: string
  cast: {
    edges: SingleCast[]
  }
}

/**
 * single cast
 */
export interface SingleCast {
  node: {
    name: {
      id: string
      nameText: {
        text: string
      }
      primaryImage: {
        url: string
        width: number
        height: number
      }
    }
    attributes: string | number
    characters: [{
      name: string
    }]
    episodeCredits: {
      total: number
      yearRange: number
    }
  }
}

/**
 * revenue data
 */
export interface Revenue {
  id: string
  productionBudget: {
    budget?: {
      amount: number
      currency: string
    }
  }
  lifetimeGross: {
    total?: {
      amount: number | string
      currency: string
    }
  }
  openingWeekendGross: {
    gross?: {
      total: {
        amount: number | string
        currency: string
      }
    }
    weekendEndDate: string
  }
  worldwideGross: {
    total?: {
      amount: number | string
      currency: string
    }
  }
}

/**
 * creator is a director, producer or writer in this context
 */
export interface Creators {
  id: string
  creators: Creator[]
  directors: Creator[]
  writers: Creator[]
}

/**
 * creator object
 */
export interface Creator {
  totalCredits: number
  category: {
    text: string
  }
  credits: CreatorPerson[]
}

/**
 * creator user
 */
export interface CreatorPerson {
  name: {
    id: string
    nameText: {
      text: string
    }
  }
}
