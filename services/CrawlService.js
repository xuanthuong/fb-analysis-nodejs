const mongodb = require('mongodb')
var ObjectID = require('mongodb').ObjectID
const request = require('request')
const utils = require('../helpers/utils.js')

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/fanpages'
const MongoClient = mongodb.MongoClient

ACCESS_TOKEN = process.env.ACCESS_TOKEN || "452502528468709|3TGCZK9l7Droo-lUuff8fzPqVik"
API_LINK = process.env.FBAPI_LINK || "https://graph.facebook.com/v2.10/"

const _callFbApi = (url, method) => {
  return new Promise((resolve, reject) => {
    let options = {
        url: url,
        method: method,
    }
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            resolve(body)
        } else {
          console.log(`Error while calling fb api: ${url}: `)
          throw error
        }
    })
  })
}

const _getPosts = (page_name, num_post) => {
  return new Promise((resolve, reject) => {
    let url = API_LINK + page_name + "/posts?limit=" + num_post.toString() + "&access_token=" + ACCESS_TOKEN
    _callFbApi(url, 'GET').then((posts) => {
      resolve(posts)
    })
  })
}

const _get_comments_one_post = (postId, fields) => {
  return new Promise((resolve, reject) => {
    let url = API_LINK + postId + fields + "&access_token=" + ACCESS_TOKEN
    _callFbApi(url, 'GET').then((comments) => {
      resolve(comments)
    })
  })
}

const _setCommentInfo = (comment) => {
  let cmt_info = {
    "Id": comment['id'],
    "Content": comment['message'],
    "Email": utils.getEmail(comment['message']),
    "Phone": utils.getPhoneNumber(comment['message']),
    "NumLike": 12345,
    "NumReply": 12345,
    "NumReact": 12345,
    "CreatedTime": utils.formatDateTime(comment['created_time']),
    "UserName": comment['from']['name'],
    "UID": comment['from']['id'],
    "IsRelatedToPost": "Related",
    "IsNegative": "?",
    "IsNeutral": "?",
    "IsPositive": "Positive",
  }
  return cmt_info
}

const _get_all_comments_of_one_post = (postId) => {
  return new Promise((resolve, reject) => {
    let firstLevel = _get_comments_one_post(postId, "?fields=message,comments.limit(2000).summary(true), \
                                                    shares,from,status_type,created_time")
    let secondLevel = _get_comments_one_post(postId, "?fields=comments{comments}")

    let like_reactions = _get_comments_one_post(postId, "?fields=reactions.limit(2000).type(LIKE).summary(1)")
    let love_reactions = _get_comments_one_post(postId, "?fields=reactions.limit(1000).type(LOVE).summary(1)")
    let sad_reactions = _get_comments_one_post(postId, "?fields=reactions.limit(500).type(SAD).summary(1)")
    let angry_reactions = _get_comments_one_post(postId, "?fields=reactions.limit(500).type(ANGRY).summary(1)")
    
    
    Promise.all([firstLevel, secondLevel, like_reactions, love_reactions, sad_reactions, angry_reactions])
      .then((comments) => {
        firstLevelCmt = JSON.parse(comments[0])
        secondLevelCmt = JSON.parse(comments[1])
        like_reactions = JSON.parse(comments[2])
        love_reactions = JSON.parse(comments[3])
        sad_reactions = JSON.parse(comments[4])
        angry_reactions = JSON.parse(comments[5])

        actual_postId = firstLevelCmt['id']
        let post_info = {
          'Id': actual_postId,
          'Content': firstLevelCmt['message'],
          'Link': "https://facebook.com/" + actual_postId,
          'NumComment': 'comments' in firstLevelCmt ? firstLevelCmt['comments']['summary']['total_count'] : 0,
          'NumShare': 'shares' in firstLevelCmt ? firstLevelCmt['shares']['count'] : 0,
          'NumLike': like_reactions.reactions.summary.total_count,
          'NumLove': love_reactions.reactions.summary.total_count,
          'NumSad': sad_reactions.reactions.summary.total_count,
          'NumAngry': angry_reactions.reactions.summary.total_count,
          'CreatedTime': utils.formatDateTime(firstLevelCmt['created_time'] || ""),
          'AdditionalInfo': "This is about something, for example",
          'Type': firstLevelCmt['status_type'],
          'Page': firstLevelCmt['from']['name'],
      }
      all_comments = []
      if ('comments' in firstLevelCmt) {
        let commentsList = 'data' in firstLevelCmt['comments'] ? firstLevelCmt["comments"]["data"] : []
        commentsList.forEach((cmt) => {
          if (cmt['message']) {
            all_comments.push(_setCommentInfo(cmt))
          }
        }, this)
      }

      if (secondLevelCmt && 'comments' in secondLevelCmt) {
        commentsList = 'data' in secondLevelCmt['comments'] ? secondLevelCmt["comments"]["data"] : []
        if (commentsList.length > 0) {
          commentsList.forEach((cmt) => {
            if ('comments' in cmt) {
              let tmpCommentsList = 'data' in cmt['comments'] ? cmt["comments"]["data"] : []
              tmpCommentsList.forEach((cmt) => {
                if (cmt['message']) {
                  all_comments.push(_setCommentInfo(cmt))
                }
              })
            }
          }, this)
        }
      }
      
      post_info["Comments"] = all_comments
      post_info["NumComment"] = all_comments.length
      resolve(post_info)
    })
  })
}

const _get_comments_of_all_posts = (posts) => {
  return new Promise((resolve, reject) => {
    promises = []
    posts.forEach((post) => {
      promises.push(_get_all_comments_of_one_post(post.id))
    })
    Promise.all(promises).then((results) => {
      resolve(results)
    })
  })
}

const _getPostsInfoFromPage = (page_name, num_post) => {
  return new Promise((resolve, reject) => {
    _getPosts(page_name, num_post).then((posts) => {
      postsJson = JSON.parse(posts)
      postsData = postsJson["data"]
      _get_comments_of_all_posts(postsData).then((listPostsInfo) => {
        resolve(listPostsInfo)
      })
    })
  })
}

const _getCommentsFromPost = (postId) => {
  return new Promise((resolve, reject) => {
    _get_all_comments_of_one_post(postId).then((comments) => {
      resolve(comments)
    })
  })
}

const _getPostsFromDb = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGODB_URL, (err, db) => {
      if (err) {
        console.log(`Error while connecting to db: `, err.message)
        throw err
      } else {
        var collection = db.collection('posts')
        collection.find().toArray((err, result) => {
          if (err) {
            console.log(`Error while query data: `, err.message)
            throw err
          } else {
            resolve(result)
          }
        })
        db.close()
      }
    })
  })
}

module.exports = {
  getPostsFromDb: _getPostsFromDb,
  getPostsInfoFromPage: _getPostsInfoFromPage,
  getCommentsFromPost: _getCommentsFromPost,
}
