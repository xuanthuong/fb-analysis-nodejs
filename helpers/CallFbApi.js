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