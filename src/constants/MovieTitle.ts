export interface MovieTitle {
  'results': {
    'id': string
    'baseInfo': BaseInfo
    'cast': Cast
    'revenue': Revenue
    'creatorsDirectorsWriters': Creators
  }
}

export interface BaseInfo {
  'ratingsSummary': {
    'aggregateRating': number
    'voteCount': number
    '__typename': string
  }
  'episodes': null | string
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
}

export interface Cast {
  id: string
  cast: {
    edges: SingleCast[]
  }
}

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

export interface Creators {
  id: string
  creators: [
    {
      totalCredits: number
      category: {
        text: string
      }
      credits: [
        {
          name: {
            id: string
            nameText: {
              text: string
            }
          }
        }
      ]
    }
  ]
  directors: [
    {
      totalCredits: number
      category: {
        text: string
      }
      credits: [
        {
          name: {
            id: string
            nameText: {
              text: string
            }
          }
        }
      ]
    }
  ]
  writers: [
    {
      totalCredits: number
      category: {
        text: string
      }
      credits: [
        {
          name: {
            id: string
            nameText: {
              text: string
            }
          }
        }
      ]
    }
  ]
}
