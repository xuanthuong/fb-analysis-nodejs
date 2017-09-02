const users = [
  {username: 'lucduong', email: 'luc@ltv.vn'},
  {username: 'thuong', email: 'thuongtran@dounets.com'}
]

//Ham nay duoc viet trong service
const _fetchUsers = () => {
  return users;
}
const _addUser = (user) => {
  users.push(user)
  return user
}
const _getUser = (req, res) => {
  const usrNm = req.params.username
  let user = undefined
  for (let i = 0; i < users.length; i++){
    if (users[i].username == usrNm){
      user = users[i]
    }
  }
  if (user){
    res.status(200)
      .json(user)
  } else{
    res.status(400)
      .json({
        message: `Could not found the user who has username ${usrNm}`
      })
  }
}
const _getUsers = (req, res) => {
  //Lay duoc tu service
  const sort = req.query.sort
  console.log(`sort -> ${sort}`)
  const model = {
    users: _fetchUsers()
  }
  res.status(200)
  .json(model)
  //res.send("hello api users")
}

const _createUser = (req, res) => {
  //Lay thong tin tu client request
  //nam trong req.body
  //const user = {
    //username: req.body.username,
    //email: req.body.email
  //}
  const user = req.body.user
  res.status(200)
    .json(user)
}

exports.getUsers = _getUsers
exports.createUser = _createUser
exports.getUser = _getUser
