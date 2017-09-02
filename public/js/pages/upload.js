Dropzone.options.uploadWidget = {
  paramName: 'file',
  maxFilesize: 20, // MB
  maxFiles: 10,
  //acceptedFiles: 'image/*',
  init: function () {
    this.on('success', function (file, res) {
      console.log(res);

      /* clear old result */
      $(".bbox").remove();
      $(".childimg").remove();

      $("#body img#fullimg").attr("src", res.filename);

      Tesseract.recognize(res.filename)
        .progress(function  (p) { console.log('progress', p)    })
        .then(function (result) {
          console.log('result', result);
          //console.log(JSON.stringify(result));
          let words = result.words;
          let lines = result.lines;

          if(words.length) {
            words.forEach(function (o) {
              var x = o.bbox.x0;
              var y = o.bbox.y0;
              var w = Math.abs(o.bbox.x0 - o.bbox.x1);
              var h = Math.abs(o.bbox.y0 - o.bbox.y1);

              var elm1 = "<div class='bbox bboxred' style='top: " + y + "px; left: " + x + "px; width: " + w + "px; height: " + h + "px;'></div>"
              $("#body").append(elm1);
            });
          }

          lines.forEach(function (o) {
            var w = Math.abs(o.bbox.x0 - o.bbox.x1);
            var h = Math.abs(o.bbox.y0 - o.bbox.y1);

            var x = o.bbox.x0;
            var y = o.bbox.y0;

            var elm1 = "<div class='bbox bboxorange' style='top: " + y + "px; left: " + x + "px; width: " + w + "px; height: " + h + "px;'></div>"
            $("#body").append(elm1);
          });
        });

      res.output.ocr_area.forEach(function (o) {
        //console.log(o);
        var x = o.bbox.x0;
        var y = o.bbox.y0;
        var w = Math.abs(o.bbox.x0 - o.bbox.x1);
        var h = Math.abs(o.bbox.y0 - o.bbox.y1);

        //var elm1 = "<div class='bbox bboxred' style='top: " + y + "px; left: " + x + "px; width: " + w + "px; height: " + h + "px;'></div>"
        //$("#body").append(elm1);
      });

      res.output.ocrx_word.forEach(function (o) {
        //console.log(o);
        var x = o.bbox.x0;
        var y = o.bbox.y0;
        var w = Math.abs(o.bbox.x0 - o.bbox.x1);
        var h = Math.abs(o.bbox.y0 - o.bbox.y1);

        if (o.text.trim().length) {
          var elm = "<div class='bbox bboxblue' style='top: " + y + "px; left: " + x + "px; width: " + w + "px; height: " + h + "px;'></div>"
          $("#body").append(elm);
          //var textElm = "<div class='bbox textElm' style='top: " + (y + h) + "px; left: " + x + "px;'>" + o.text + "</div>";
          //$("#body").append(textElm);
        }
      });
    });
  },
};

