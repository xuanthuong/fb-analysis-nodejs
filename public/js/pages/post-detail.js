$(document).ready(function() {
  $("#showPostDetail").click(function(e) {
    destroy: true,
    $('#postDetail').dataTable({
      ajax: {
        url: 'http://localhost:8085/api/post',
        type: 'GET',
        data: { 
          "postId": $('#postId').val(),
        },
        cache: false,
        dataSrc: function (data) {
          return data
        }
      },
      columns: [
        { "data": "UserName",
        },
        { "data": "UID",
          "render": function(data, type, row, meta){
            if(type === 'display'){
              result = 'https://facebook.com/' + data
              data = '<a href="' + result + '">' + data + '</a>';
            }
            return data;
          }
        },
        { "data": "Phone"},
        { "data": "Email"},
        { 
          "data": "Content",
        },
        { "data": 'IsPositive'},
        { "data": 'IsNeutral'},
        { "data": 'IsNegative'},
        { "data": 'IsRelatedToPost'},
        { "data": 'CreatedTime'},
      ]
    })
    e.preventDefault()
  })
})