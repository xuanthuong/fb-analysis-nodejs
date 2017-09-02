const mongodb = require('mongodb')
var ObjectID = require('mongodb').ObjectID
const request = require('request')

const url = 'mongodb://localhost:27017/fanpages'
const MongoClient = mongodb.MongoClient

ACCESS_TOKEN = "452502528468709|3TGCZK9l7Droo-lUuff8fzPqVik"
API_LINK = "https://graph.facebook.com/v2.10/"

const _getPosts = (page_name, num_post) => {
  return new Promise((resolve, reject) => {
    // Check page_name pattern: is page or a post (status, photo, video) -> handle it
    let url = "https://graph.facebook.com/v2.10/" + 
          page_name + "/posts?limit=" + num_post.toString() + "&access_token=" + ACCESS_TOKEN
    let options = {
        url: url,
        method: 'GET',
    }
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            resolve(body) // -> call get comments
        } else {
          console.log(`Error while getting posts from ${page_name}: `, error.message)
          throw error
        }
    })
  })
}

const _get_comments_one_post = (postId, fields) => {
  return new Promise((resolve, reject) => {
    let url = API_LINK + postId + fields + "&access_token=" + ACCESS_TOKEN
    let options = {
        url: url,
        method: 'GET',
    }
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            resolve(body)
        } else {
          // console.log(`Error while getting comments: `, error.message)
          throw error
        }
    })
  })
}

const _setCommentInfo = (comment) => {
  let cmt_info = {
    "Id": comment['id'],
    "Content": comment['message'],
    "NumLike": 12345,
    "NumReply": 12345,
    "NumReact": 12345,
    "CreatedTime": comment['created_time'],
    "UserName": comment['from']['name'],
    "UID": comment['from']['id'],
    "IsRelatedToPost": "Related",
    "IsPositive": "Positive",
  }
  return cmt_info
}

const _get_all_comments_of_one_post = (post) => {
  return new Promise((resolve, reject) => {
    postId = post["id"]
    let firstLevel = _get_comments_one_post(postId, "?fields=comments.summary(true),likes.summary(true),shares,from,status_type")
    let secondLevel = _get_comments_one_post(postId, "?fields=comments{comments}")
    
    Promise.all([firstLevel, secondLevel]).then((comments) => {
      firstLevelCmt = JSON.parse(comments[0])
      secondLevelCmt = JSON.parse(comments[1])

      postId = firstLevelCmt['id']
      let post_info = {
        'Id': postId,
        'Content': post['message'],
        'Link': "https://facebook.com/" + postId,
        'NumLike': 'likes' in firstLevelCmt ? firstLevelCmt['likes']['summary']['total_count'] : 0,
        'NumComment': 'comments' in firstLevelCmt ? firstLevelCmt['comments']['summary']['total_count'] : 0,
        'NumShare': 'shares' in firstLevelCmt ? firstLevelCmt['shares']['count'] : 0,
        'NumReact': 12345,
        'CreatedTime': post['created_time'] || "",
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
      promises.push(_get_all_comments_of_one_post(post))
    })
    Promise.all(promises).then((results) => {
      resolve(results)
    })
  })
}

const getComments = (page_name, num_post) => {
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

const _getPostsByApi= () => {
  return new Promise((resolve, reject) => {
    // // Set the headers
    // const headers = {
    //     'User-Agent': 'Super Agent/0.0.1',
    //     'Content-Type': 'application/json'
    // }
    // Configure the request
    const options = {
        url: 'http://127.0.0.1:5000/posts/',
        method: 'POST',
        // headers: headers,
    }
    // Start the request
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            resolve(body)
        } else {
          console.log(`Error while call to Flask server: `, error.message)
          throw error
        }
    })
  })
}

const _getPostsFromDb = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
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
  getAllPostsByApi: _getPostsByApi,
  getPosts: _getPosts,
  getComments: getComments,
}


// const addRawLog = (rawlog) => {
//   return new Promise((resolve, reject) => {
//     MongoClient.connect(url, (err, db) => {
//       if (err) {
//           reject(err)
//       } else {
//           var collection = db.collection('blp_raw_log')
//           collection.insert(rawLog, (err, result) => {
//             if (err) {
//               reject(err)
//             } else {
//               resolve(result)
//             }
//           })
//           db.close()    
//       }
//     })
//   })
// }