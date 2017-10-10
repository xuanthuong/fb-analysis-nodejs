$(document).ready(function() {
  $("#showPostDetail").click(function(e) {
    destroy: true,
    $('#postDetail').dataTable({
      ajax: {
        url: 'http://localhost:8085/api/post/postId',
        type: 'GET',
        data: { 
          "postId": $('#postId').val() ,
        },
        cache: false,
        dataSrc: function (data) {
          return data
        }
      },
      columns: [
        { "data": "Content"}, 
        { 
           "data": "Link",
           "render": function(data, type, row, meta){
              if(type === 'display'){
                  data = '<a href="' + data + '">' + "Go to post" + '</a>';
              }
              return data;
           }
        },
        { 
          "data": "Link",
          "render": function(data, type, row, meta){
            if(type === 'display'){
              temp = data.split('/')
              postId = temp[temp.length - 1]
              result = 'http://localhost:8085/post/' + postId
              data = '<a href="' + result + '">' + "Chi tiết" + '</a>';
            }
            return data;
          }
        },
        { "data": 'NumComment'},
        { "data": 'NumLike'},
        { "data": 'NumShare'},
        { "data": 'Type'},
        { "data": 'AdditionalInfo'},
        { "data": 'CreatedTime'},
        { "data": 'Page'}, 
      ]
    })
    e.preventDefault()
  })
})