const request = require('request')

ACCESS_TOKEN = process.env.ACCESS_TOKEN || "452502528468709|3TGCZK9l7Droo-lUuff8fzPqVik"
API_LINK = process.env.FBAPI_LINK || "https://graph.facebook.com/v2.10/"

const _get_posts = (page_name, num_post = 1) => {
  return new Promise((resolve, reject) => {
    results = []
    url = API_LINK + page_name + "/posts?limit=" + str(num_post) + "&access_token=" + ACCESS_TOKEN
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
    url = API_LINK + post['id'] + "?fields=shares,likes.summary(true),comments.summary(true)&access_token=" + ACCESS_TOKEN
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