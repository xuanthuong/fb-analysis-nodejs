const moment = require('moment-timezone');
const CrawlService = require('../services/CrawlService')

const _getComments = (req, res) => {
    res.render('posts-list')
}


const _getAllPosts = (req, res) => {
  CrawlService.getPosts('justmenvietnam', 2)
    .then((posts) => {
      // var json = JSON.stringify(eval("(" + posts + ")")) //Does not work
      var json
      try {
        json = JSON.parse(posts)
      } catch (e) {
        console.log("this is not json")
        throw e
      } 
      if (json) {
        console.log(`Data: `, json['data'])
        res.send("OK...")
      } else {
        console.log("No data found")
        res.send("No data found...")
      }
      // res.render('task-list', { logs, })
    })
    .catch((error) => {
      console.log(`Error while calling getPost.........`)
      throw error
    })
}


// const getRawLogView = (req, res) => {
//     Promise.all([RawLogService.getAllRawLog(), RawLogService.countPageAction("Home", 1), 
//                 RawLogService.countPageAction("Home", 24),
//                 RawLogService.countPageAction("Requirement", 1), RawLogService.countPageAction("Requirement", 24)])
//       .then((result) => {
//         const logs = result[0]
//         const count_h_1 = result[1]
//         const count_h_24 = result[2]
//         const count_r_1 = result[3]
//         const count_r_24 = result[4]
//         logs.forEach((log) => {
//           var timestamp = new Date(parseInt(`${log._id}`.substring(0, 8), 16) * 1000)
//           log.newCreatedAt = moment(timestamp).tz('Asia/Ho_Chi_Minh').format('MMM Do, YYYY h:mm:ss a');
//           if (log.PageName && log.PageName.includes("PIM_001"))
//             log.PageName = "Requirement"
//         });
        
//         res.render('dashboard', {
//           logs,
//           count_h_1,
//           count_h_24,
//           count_r_1,
//           count_r_24,
//         });
//       })
//       .catch((error) => {
//         throw error
//       });
// }

module.exports = {
  getAllPosts: _getAllPosts,
  getComments: _getComments,
}