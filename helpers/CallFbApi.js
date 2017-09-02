const request = require('request')
ACCESS_TOKEN = "452502528468709|3TGCZK9l7Droo-lUuff8fzPqVik"

const _get_posts = (page_name, num_post = 1) => {
  return new Promise((resolve, reject) => {
    results = []
    url = "https://graph.facebook.com/v2.10/" + 
          page_name + "/posts?limit=" + str(num_post) + "&access_token=" + ACCESS_TOKEN
    const options = {
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

const _getPost = () => {
  _get_posts.then((posts) => {
    console.log(posts)
  })
}

const get_comments = (posts) => {
  posts.forEach((post) => {
    url = "https://graph.facebook.com/v2.10/" + post['id'] + 
                      "?fields=shares,likes.summary(true),comments.summary(true)&access_token=" + ACCESS_TOKEN
    const options = {
      url: url,
      method: 'GET',
    }
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
module.exports = {
  getPosts: _getPost
}
//     response = json.loads(response.text)
//     post_info = {}
//     post_info['PostId'] = p['id']
//     post_info['PostContent'] = p['message'] if 'message' in p else ""
//     post_info['NumLike'] = response['likes']['summary']['total_count'] if 'likes' in response else 0
//     post_info['NumComments'] = response['comments']['summary']['total_count'] if 'comments' in response else 0
//     post_info['NumShare'] = response['shares']['count'] if 'shares' in response else 0
//     post_info['NumReact'] = 12345
//     post_info['CreatedTime'] = p['created_time'] if 'created_time' in p else ""
//     post_info['AdditionalInfo'] = "This is about something, for example"
//     post_info['Page'] = page_name

//     comments_list = response['comments']['data'] # array list of json
//     comments = []
//     comments = get_comments(p['id'], comments, 1)
//     # Search for 2nd level comments (comments of comments)
//     all_comments = list(comments))
//   })
// }

// def get_posts(page_name, num_post):
//   results = []
//   # params = {
//   #     "access_token": os.environ["PAGE_ACCESS_TOKEN"]
//   # }
//   # headers = {
//   #     "Content-Type": "application/json"
//   # }
//   # r = requests.get("https://graph.facebook.com/v2.6/", params=params, headers=headers, data=data)
//   r = requests.get("https://graph.facebook.com/v2.10/" + page_name + "/posts?limit=" + str(num_post) + 
//                         "&access_token=" + ACCESS_TOKEN)
//   posts = json.loads(r.text)['data']
//   # Step 1: Get all postId and its contents
//   # print(posts)
//   for p in posts:
//     # Step 2: Get comments
//     response = requests.get("https://graph.facebook.com/v2.10/" + p['id'] + 
//                       "?fields=shares,likes.summary(true),comments.summary(true)&access_token=" + 
//                       ACCESS_TOKEN)
//     response = json.loads(response.text)
//     post_info = {}
//     post_info['PostId'] = p['id']
//     post_info['PostContent'] = p['message'] if 'message' in p else ""
//     post_info['NumLike'] = response['likes']['summary']['total_count'] if 'likes' in response else 0
//     post_info['NumComments'] = response['comments']['summary']['total_count'] if 'comments' in response else 0
//     post_info['NumShare'] = response['shares']['count'] if 'shares' in response else 0
//     post_info['NumReact'] = 12345
//     post_info['CreatedTime'] = p['created_time'] if 'created_time' in p else ""
//     post_info['AdditionalInfo'] = "This is about something, for example"
//     post_info['Page'] = page_name

//     comments_list = response['comments']['data'] # array list of json
//     comments = []
//     comments = get_comments(p['id'], comments, 1)
//     # Search for 2nd level comments (comments of comments)
//     all_comments = list(comments)

//     for comment in comments:
//       temp_comments = []
//       cm_id = list(comment.keys())[0]
//       temp_comments = get_comments(cm_id, temp_comments, 2)
//       if (temp_comments):
//         all_comments.extend(temp_comments)

//     post_info["Comments"] = all_comments
//     post_info["NumComments"] = len(all_comments)
//     # print("All comments:")
//     # print(json.dumps(results, indent=4))
//     results.append(post_info)
//   return results

// def get_comments(object_id, comments, level):
//   if level == 1:
//     response = requests.get("https://graph.facebook.com/v2.10/" + object_id + 
//                         "?fields=shares,likes.summary(true),comments.summary(true)&access_token=" + 
//                         ACCESS_TOKEN)
//   else:
//     response = requests.get("https://graph.facebook.com/v2.10/" + object_id + 
//                         "?fields=likes.summary(true),comments.summary(true)&access_token=" + 
//                         ACCESS_TOKEN)

//   response = json.loads(response.text)
//   comments_list = response['comments']['data'] if 'comments' in response else None # array list of json
  
//   if (comments_list):
//     for cmt in comments_list:
//       cmt_info = {
//         "CommentId": cmt['id'],
//         "CommentContent": cmt['message'],
//         "NumLike": 12345, # response['likes']['summary']['total_count'],
//         "NumReply": 12345, # response['comments']['summary']['total_count'],
//         "NumReact": 12345,
//         "CreatedTime": cmt['created_time'],
//         "IsRelatedToPost": "Related",
//         "IsPositive": "Positive",
//         "UserName": cmt['from']['name'],
//         "UID": cmt['from']['id']
//         }
//       comments.append(cmt_info)
//   return comments