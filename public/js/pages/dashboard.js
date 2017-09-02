$(document).ready(function() {
  $('#posts').dataTable({
    // ajax: function (data, callback, settings) {
    //   $.ajax({
    //     url: 'http://localhost:8085/api/posts',
    //     type: 'GET',
    //     data: data,
    //     // success:function(data){
    //     //   // callback(data);
    //     //   // Do whatever you want.
    //     //   console.log(data)
    //     //   return data
    //     // }
    //   });
    // },
    ajax: {
      url: 'http://localhost:8085/api/posts',
      type: 'GET',
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
                data = '<a href="' + data + '">' + data + '</a>';
                // data = '<a id="demo" href="#" onclick="myFunction()">Click me</a>'
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
  });
});
