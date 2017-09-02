// $(document).ready(function () {
//   $('#lightSlider').lightSlider({
//     gallery: true,
//     loop: true,
//     slideMargin: 0,
//     onSliderLoad: function(el) {
//       $('#lightSlider li').on('dblclick', onSlideItemClick);
//     }
//   });

//   function onSlideItemClick(event) {
//     var $item = $(event.currentTarget);
//     var title = $item.data('title');
//     var thumb = $item.data('thumb');
//     var position = $item.data('position');
//     var text = $item.data('text');
//     var img = $item.find('img').attr('src');
//     console.log('thumb: ', thumb, ', img: ', img);

//     showImg({
//       title: title,
//       thumbnail: thumb,
//       image: img,
//       position: position,
//       data: text
//     })
//   }
// });

// var showImg = function(image) {
//   bootbox.dialog({
//     title: image.title,
//     message: `
//       <img class="img-responsive" src="${image.image}" />
//       <hr />
//       <div class="form-control"> 
//         <label class="control-label">Position: </label> ${image.position}
//         |
//         <label class="control-label">Data: </label> ${image.data}
//       </div>
//     `
//   })
// }
