# Office-Convert-Api

Convert Word, Excel, PowerPoint, HTML, PDF and Image formats with our powerful file conversion Rest API.

## Current Features

- excel to pdf.

## Usage 

### method

Post

### params

- data: file binary
- format: target file format.  etc: `pdf`

### url

`http://121.36.50.216:5000/convert`

### response

File binary

---

**For Example**

```javascript
var form = new FormData();
form.append('data', file);
form.append('format', 'pdf');

fetch('http://121.36.50.216:5000/convert', {
  method: 'POST',
  body: form
}).then(response => {
  response.blob().then(function(blob) {
    var objectURL = URL.createObjectURL(blob);
    myImage.src = objectURL;
  });
})
```

