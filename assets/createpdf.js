var createpdf = (function () {

  var definition = null
  var name = null
  var pdf = null

  return {
    initialize: function(_definition, _name) {
      definition = JSON.parse(_definition);
      name = _name;
      pdf = pdfMake.createPdf(definition);
    },
    getDocument: function () {
      return pdf;
    },
    print: function() {
      pdf.print()
    },
    open: function() {
      pdf.open()
    },
    save: function() {
      pdf.download(name + '.pdf')
    },
    getDataUrl: function(cb) {
      pdf.getDataUrl(cb);
    },
    getBlob: function(cb) {
      pdf.getBlob(cb);
    },
    getBase64: function(cb) {
      pdf.getBase64(cb);
    },
    getBuffer: function(cb) {
      pdf.getBuffer(cb);
    }
  }
})();
