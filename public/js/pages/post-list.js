$(document).ready(function() {
  $("#showPost").click(function(e) {
    // console.log($('input[id=numPost]').val())
    // console.log($('input[name=numPost]').val())
    // console.log($('#numPost').val())
    destroy: true,
    $('#posts').dataTable({
      ajax: {
        url: 'http://localhost:8085/api/posts',
        type: 'POST',
        data: { 
          "pageName": $('#pageName').val() ,
          "numPost": $('#numPost').val()
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
                  // data = '<a id="demo" href="#" onclick="myFunction()">Click me</a>'
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
