const multer = require('multer')
const moment = require('moment')


const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        const date = moment().format('DD-MM-YYYY-HH:mm:ss:_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb )=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}


const limits = {
    fileSize: 1024 * 1024 * 5
}

// app.post('/uploads', function (req, res) {
//     upload(req, res, function (err) {
//       if (err instanceof multer.MulterError) {
//         console.log('Случилась ошибка Multer при загрузке.') 
//       } else {
//         console.log('При загрузке произошла неизвестная ошибка.')
//       }
  
//       console.log('Все прекрасно загрузилось.') 
//     })
// })

module.exports = multer({storage, fileFilter, limits})
    
    
    
