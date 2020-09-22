const firebase = require("firebase");

const upload = (file) => {
  // initialize firebase storage
  const storageRef = firebase.storage().ref();

  // set reference to file name
  const thisRef = storageRef.child(`images/${file.name}`);

  // send life to firebase
  thisRef.put(file).then((snapshot) => {
    alert("File Uploaded");
    console.log("Uploaded file!");
  });
};

// initialise image storage
/*const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: { fileSize: 50000 },
});*/

module.exports = upload;
