const express = require("express");
const router = express.Router();
const VenderData = require("../models/VendorModels");
const path = require("path");
const multer = require("multer");

router.use(express.json());

// multer for files upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

// post
router.post("/createProposals",async (req, res) => {
  try {
    const {
      eventName,
      placeOfEvent,
      proposalType,
      eventType,
      budget,
      fromDate,
      toDate,
      description,
      foodPreferences,
      events,
    } = req.body;
    const images = req.files.map((file) => file.filename);
    const VendorsData = new VenderData({
      eventName,
      images,
      placeOfEvent,
      proposalType,
      eventType,
      budget,
      fromDate,
      toDate,
      description,
      foodPreferences,
      events,
    });

    await VendorsData.save();
    res.status(201).send({ message: "Data submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error occurs" });
  }
});

// get
router.get("/proposalsData", (req, res) => {
  VenderData.find()
    .sort({ createdAt: -1 })
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});


// update proposal
router.put('/update/:id', async (req, res) => {
    try {
        let data = await VenderData.findByIdAndUpdate({ _id: req.params.id }, req.body);
        let newdata = await VenderData.findOne({ _id: req.params.id });
        return res.status(200).json({
            message: "updated successfully",
            newdata
        })
    }
    catch (e) {
        res.status(422).json({
            status: "failure",
            error: e.error
        })
    }
})

// delete proposals
router.delete("/proposalDelete/:id", async (req, res) => {
  try {
    const data = await VenderData.findByIdAndDelete(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get vendor details
router.get("/vendorDetails", (req, res) => {
    VenderDetails.find()
      .then((data) => {
        res.status(201).send({ data });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });


  //get user details
router.get("/userDetails", (req, res) => {
  userDetails
    .find()
    .then((data) => {
      res.status(201).send({ data });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
