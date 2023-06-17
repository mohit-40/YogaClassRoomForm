const router = require("express").Router();
const db = require("../configs/db");
const completePayment = (detail) => {
  return true;
};
//register user
router.post("/register", async (req, res) => {
  try {
    dob = new Date(req.body.dob);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    console.log(age);

    if (age < 18 || age > 65) {
      res.status(404).json("Can't register due to age");
    } else {
      let paymentStatus = await completePayment();
      if (paymentStatus) {
        db.pool.getConnection(function (err, connection) {
          if (err) {
            throw err;
          }
          console.log("connected to sql server");
          connection.query(
            "INSERT INTO users (fullName,mailId,mobile,dob,batch) VALUES (?,?,?,?,?)",
            [
              req.body.fullName,
              req.body.mailId,
              req.body.mobile,
              new Date(req.body.dob),
              req.body.batch,
            ],
            function (err, result, feild) {
              connection.release();
              if (err) {
                throw err;
              }
              let userId = result.insertId;
              let currDateTime = new Date();
              connection.query(
                "INSERT INTO payments (paymentDate,userId,paymentAmount) VALUES (?,?,?)",
                [currDateTime, userId, 500],
                function (err, result, feild) {
                  // connection.release();
                  if (err) {
                    throw err;
                  }
                  res.status(200).json("User Registered and fees paid.");
                }
              );
            }
          );
        });
      } else {
        res.status(404).json("Payment failed. Can't Register.");
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
router.post("/update", async (req, res) => {
  try {
    console.log("update api called");
    console.log(req.body.mailId, req.body.batch);
    db.pool.getConnection(function (err, connection) {
      if (err) {
        throw err;
      }
      connection.query(
        "UPDATE users SET batch=? WHERE mailId=?",
        [req.body.batch, req.body.mailId],
        function (err, result, feild) {
          connection.release();
          if (err) {
            console.log(err);
            throw err;
          }
          res.status(200).json("User batch updated");
        }
      );
    });
  } catch (error) {
    res.status(400).json(error);
  }
});
router.post("/pay", async (req, res) => {
  try {
    db.pool.getConnection(function (err, connection) {
      if (err) {
        throw err;
      }
      connection.query(
        "SELECT userId FROM users WHERE mailId = ?",
        [req.body.mailId],
        function (err, result, feild) {}
      );
    });

    let paymentStatus = await completePayment();
    if (paymentStatus) {
      db.pool.getConnection(function (err, connection) {
        if (err) {
          throw err;
        }
        connection.query(
          "SELECT userId FROM users WHERE mailId = ?",
          [req.body.mailId],
          function (err, result, feild) {
            console.log("inside pay api");
            connection.release();
            if (err) {
              console.log(err);
              return;
            }
            let results = JSON.parse(JSON.stringify(result));
            let userId = results[0].userId;
            let currDateTime = new Date();
            connection.query(
              "INSERT INTO payments (paymentDate,userId,paymentAmount) VALUES (?,?,?)",
              [currDateTime, userId, 500],
              function (err, result, feild) {
                if (err) {
                  console.log(err);
                  return;
                }
                res.status(200).json("User Registered and fees paid.");
              }
            );
          }
        );
      });
    } else {
      res.status(400).json("Payment failed.");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
